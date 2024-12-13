"use server";
import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
import { fetchGroupPreferences, fetchRestaurants } from "@/utils/backendApi";
import { Database, Tables } from "@/utils/types/supabase";
import createSupabaseServerClient from "@/lib/supabase/reader";
import supabase from "@/utils/supabaseClient";

export async function algorithm(group_id: number) {
  const groupOfUsers = await fetchGroupPreferences(group_id);

  const restaurants = await fetchRestaurants();

  const numUsers = groupOfUsers.length;
  const totalPreferences = Array(10).fill(0);
  const weights = Array(10).fill(1);
  groupOfUsers.forEach(({ soft_constraints }) => {
    if (!soft_constraints) {
      // Skip this user if softconstraints doesn't exist
      console.warn("Skipping user with no softconstraints");
      return;
    }
    console.log("softconstraints:", soft_constraints);
    const prefs = soft_constraints.split("").map(Number); // Split and convert to numbers
    prefs.forEach((pref: any, index: number) => {
      totalPreferences[index] += pref * weights[index];
      totalPreferences.map((total) => total / numUsers);
    });
  });
  console.log(
    "Total preferences:",
    totalPreferences.map((total) => total / numUsers),
  );

  // filter hardconstraints:

  // Step 3: Filter restaurants based on hard constraints
  const glutenRequired = groupOfUsers.some((user) => {
    if (!user.users || !user.users.hard_constraints) {
      return false;
    }
    return user.users.hard_constraints[0] === "1"; // Gluten-free required
  });

  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (!restaurant.hard_constraints) {
      console.error(
        "Undefined or missing hardconstraints for restaurant:",
        restaurant,
      );
      return false;
    }
    const isGlutenFree = restaurant.hard_constraints[0] === "1";
    return !glutenRequired || isGlutenFree;
  });

  console.log("Filtered Restaurants:", filteredRestaurants);

  // Step 4: Calculate cosine similarity and find the best restaurant
  let bestRestaurant: Tables<"restaurants"> = filteredRestaurants[0];
  let highestSimilarity = -1;

  filteredRestaurants.forEach((restaurant) => {
    if (!restaurant.soft_constraints) {
      console.warn(
        "Skipping restaurant with no softconstraints:",
        restaurant.name,
      );
      return;
    }

    const restaurantPreferences = restaurant.soft_constraints
      .split("")
      .map(Number);
    const similarity = cosineSimilarity(
      totalPreferences,
      restaurantPreferences,
    );

    if (bestRestaurant === null || similarity > highestSimilarity) {
      highestSimilarity = similarity;
      bestRestaurant = restaurant;
    }
  });

  console.log("Best Restaurant:", bestRestaurant);

  return { bestRestaurant, similarity: highestSimilarity };
}

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magA * magB);
}

export async function fetchUserGroups(user_idd: number) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("group_users")
    .select(
      `
      id,
      user_id,
      group_id,
       groups (
        id,
        created_at,
        name,
        group_creator,
        hard_constraints,
        isdeleted,
        size
      )
    `,
    )
    .eq("user_id", user_idd);
  if (error) {
    throw new Error(`Error fetching groups for user: ${error.message}`);
  }
  return data;
}

export async function checkCodeAndInsertUser(
  groupCode: string,
  userId: number,
) {
  const { data: groupData, error: groupError } = await supabase
    .from("groups")
    .select("id")
    .eq("group_code", groupCode)
    .single();

  if (groupError) {
    return { success: false, message: "Group code not found" };
  }

  const groupId = groupData?.id;

  const { data: existingUserData, error: existingUserError } = await supabase
    .from("group_users")
    .select("id")
    .eq("group_id", groupId)
    .eq("user_id", userId)
    .single();
  console.log("Existing User Data:", existingUserData);
  if (existingUserData) {
    return { success: false, message: "User is already in the group" };
  }

  const { error: insertError } = await supabase.from("group_users").insert({
    group_id: groupId,
    user_id: userId,
  });

  if (insertError) {
    return {
      success: false,
      error: insertError.message,
      message: "Failed to add user",
    };
  }

  return { success: true, message: "User added successfully" };
}

export async function fetchUserStatusInGroup(group_id: number) {
  const { data, error } = await supabase
    .from("group_users")
    .select(
      `
    id,
  user_id,
  group_id,
  isready,
  budget,
  groups (
      id,
      created_at,
      name,
      size
  ),
  users (
      id,
      firstName,
      lastName
  )
  `,
    )
    .eq("group_id", group_id);
  console.log("Existing User Data:", data);
  if (error) {
    throw new Error(`Error fetching groups for user: ${error.message}`);
  }
  return data;
}

export async function retrieveUserSettings(user_id: number) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user_id);
  if (error) {
    throw new Error(`Error fetching user settings for user : ${error.message}`);
  }
  return data;
}

//
//
// Adelins functions for updating the User Ratings
//
//

export async function getPendingRatings(
  userId: number,
): Promise<number[] | null> {
  const supabase = await createSupabaseServerClient();
  const now = new Date().toISOString();
  // Step 1: Check if the user is in any group with a picked restaurant
  const { data: groupsData, error: groupsError } = await supabase
    .from("groups")
    .select("id")
    .lt("dining_date", now)
    .not("pickedrestaurant", "is", null);

  console.log("first query data:", groupsData);

  if (groupsError || !groupsData || groupsData.length === 0) {
    console.log("All groups have no restaurant generated");
    return null; // No relevant groups found or an error occurred
  }

  // Extract group IDs
  const groupIds = groupsData.map((group) => group.id);

  // Step 2: Find rows in group_users table with review_rating = -1
  const { data: pendingRatingsData, error: pendingRatingsError } =
    await supabase
      .from("group_users")
      .select("id")
      .in("group_id", groupIds)
      .eq("user_id", userId)
      .eq("review_rating", -1);

  if (
    pendingRatingsError ||
    !pendingRatingsData ||
    pendingRatingsData.length === 0
  ) {
    console.log("The user has rated all restaurants.");
    return null; // All restaurants rated or an error occurred
  }

  // Return IDs of rows where review_rating = -1
  return pendingRatingsData.map((row) => row.id);
}

export async function getRestaurantDetails(
  groupUsersId: string,
): Promise<{ name: string | null; logo: string | null } | null> {
  const supabase = await createSupabaseServerClient();

  // Step 1: Fetch the group ID where the user still has pending reviews (-1)
  const { data: groupUser, error: groupUserError } = await supabase
    .from("group_users")
    .select("group_id")
    .eq("id", groupUsersId) // The ID from the previous function
    .single();

  if (groupUserError || !groupUser?.group_id) {
    console.error("Error fetching group ID:", groupUserError?.message);
    return null;
  }

  const groupId = groupUser.group_id;

  // Step 2: Fetch the restaurant ID (pickedRestaurant) for the group
  const { data: group, error: groupError } = await supabase
    .from("groups")
    .select("pickedrestaurant")
    .eq("id", groupId)
    .single();

  if (groupError || !group?.pickedrestaurant) {
    console.error("Error fetching picked restaurant:", groupError?.message);
    return null;
  }

  const restaurantId = group.pickedrestaurant;

  // Step 3: Fetch the restaurant name and logo
  const { data: restaurant, error: restaurantError } = await supabase
    .from("restaurants_logos")
    .select("name, url")
    .eq("restaurant_id", restaurantId)
    .single();

  if (restaurantError || !restaurant) {
    console.error(
      "Error fetching restaurant details:",
      restaurantError?.message,
    );
    return null;
  }

  return {
    name: restaurant.name,
    logo: restaurant.url,
  };
}

export async function updateReviewRating(
  groupUserId: number,
  starRating: number,
): Promise<boolean> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("group_users")
    .update({ review_rating: starRating })
    .eq("id", groupUserId);

  if (error) {
    console.error("Error updating review rating:", error.message);
    return false;
  }

  console.log("Review rating updated successfully:", data);
  return true;
}

export async function updateReviewExplanation(
  groupUserId: number,
  description: string,
): Promise<boolean> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("group_users")
    .update({ review_description: description })
    .eq("id", groupUserId);

  if (error) {
    console.error("Error updating review description:", error.message);
    return false;
  }

  console.log("Review description updated successfully:", data);
  return true;
}

export async function fetchMyUUID(): Promise<string> {
  const supabase = await createSupabaseServerClient();

  // Retrieve the session to get the logged-in user's UUID
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError  !session?.session?.user) {
    console.error(
      "Error fetching session or user not authenticated:",
      sessionError,
    );
    throw new Error("User not authenticated.");
  }

  return session.session.user.id; // Return the UUID
}

export async function fetchMyUserId(): Promise<number> {
  const supabase = await createSupabaseServerClient();

  // Get the logged-in user's UUID
  const userUUID = await fetchMyUUID();

  // Fetch the user ID from the users table
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id") // Select the id column
    .eq("uid", userUUID) // Match the UUID
    .single();

  if (userError  !userData?.id) {
    console.error("Error fetching user ID:", userError);
    throw new Error("User not found.");
  }

  return userData.id; // Return the user ID
}
