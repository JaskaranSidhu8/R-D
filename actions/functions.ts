"use server";
import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
import {
  fetchGroupPreferences,
  checkHardConstraintsGroup,
} from "@/utils/backendApi";
import { Database, Tables } from "@/utils/types/supabase";
import createSupabaseServerClient from "@/lib/supabase/reader";
import supabase from "@/utils/supabaseClient";
import { filterRestaurantsByHardConstraint } from "@/utils/filterRestaurantsByHardConstraint";
import { getCuisineSoftConstraint } from "@/utils/fetchRestaurantCuisineSoftConstraints";
import { getBudgetRestaurant } from "@/utils/convertRestaurantBudgetToSoftConstraint";
import { filterRestaurantsByTime } from "@/utils/filterRestaurantsBasedOnTime";
import { UUID } from "crypto";

export async function algorithm(
  group_id: number,
  day: number,
  hour: number,
  minute: number,
) {
  const supabase = await createSupabaseServerClient();
  const filteredRestaurantsByTime = await filterRestaurantsByTime(
    day,
    hour,
    minute,
  );
  const groupOfUsers = await fetchGroupPreferences(group_id);
  const numUsers = groupOfUsers.length;
  const { cuisine_weight, budget_weight, drink_weight, atmosphere_weight } =
    await fetchGroupWeightSums(group_id);
  const cuisineWeight = cuisine_weight! / numUsers;
  const budgetWeight = budget_weight! / numUsers;
  const drinkWeight = drink_weight! / numUsers;

  //console.log("THE group cuisine weihjt is:", cuisineWeight);
  //console.log("THE group budget weihjt is:", budgetWeight);
  //console.log("THE group cuisine weihjt is:", drinkWeight);
  //const atmosphereWeight = atmosphere_weight! /numUsers;
  //const restaurants = await fetchRestaurants("true"); //true, meaning that it serves Vegan and Vegetarian FOOD, but we dint need it with the ne
  const hasHardConstraints = await checkHardConstraintsGroup(group_id); //works properly
  const filteredRestaurants = await filterRestaurantsByHardConstraint(
    filteredRestaurantsByTime,
    hasHardConstraints,
  ); //this function will filter if there is at least a user with hard_constraints set to true, or just return the unfiltered list again. had to write it this way cuz reasons with typescript
  //console.log("The number of restaurants after filtration is:", filteredRestaurants.length);

  console.log("Number of users is:", numUsers);
  const softPreferences = Array(9).fill(0);
  const weightsSoft = Array(9).fill(drinkWeight); //this one I can update to be the value from users_weights value:
  groupOfUsers.forEach(({ soft_constraints }) => {
    if (!soft_constraints) {
      // Skip this user if softconstraints doesn't exist
      //console.warn("Skipping user with  id number", `${user_id} ` , " because it has no softconstraints");
      //console.warn("Skipping user with no softconstraints");
      return;
    }
    console.log("softconstraints:", soft_constraints);
    const prefs = soft_constraints.split("").map(Number); // Split and convert to numbers
    prefs.forEach((pref, index) => {
      softPreferences[index] += pref * weightsSoft[index];
      softPreferences.map((total) => total / numUsers);
    });
  });
  console.log(
    "Soft preferences:",
    softPreferences.map((total) => total / numUsers),
  ); ///

  const cuisinePreferences = Array(13).fill(0);
  const weightsCuisine = Array(13).fill(cuisineWeight);
  groupOfUsers.forEach(({ cuisine_preferences }) => {
    if (!cuisine_preferences) {
      // Skip this user if softconstraints doesn't exist
      // i dont know how to fix this error, but it s not relevant now console.warn("Skipping user with  id number", `${soft_constraints.user_id} ` , " because it has no softconstraints");
      //console.warn("Skipping user with no CuisineSoftConstraints");
      return;
    }

    console.log("Cuisine Soft constraints:", cuisine_preferences);
    const prefs = cuisine_preferences.split("").map(Number); // Split and convert to numbers
    prefs.forEach((pref, index) => {
      cuisinePreferences[index] += pref * weightsCuisine[index];
      cuisinePreferences.map((total) => total / numUsers);
    });
  });
  //console.log(
  //"Cuisie preferences:",
  // cuisinePreferences.map((total) => total / numUsers),
  //);

  const budgetPreferences = Array(6).fill(0);
  const weightsBudget = Array(6).fill(budgetWeight);
  groupOfUsers.forEach(({ budget }) => {
    if (!budget) {
      // Skip this user if softconstraints doesn't exist
      // i dont know how to fix this error, but it s not relevant now console.warn("Skipping user with  id number", `${soft_constraints.user_id} ` , " because it has no softconstraints");
      //console.warn("Skipping user with no BudgetSoftconstraints");
      return;
    }

    console.log("budget Soft Constraints:", budget);
    const prefs = budget.split("").map(Number); // Split and convert to numbers
    prefs.forEach((pref, index) => {
      budgetPreferences[index] += pref * weightsBudget[index];
      budgetPreferences.map((total) => total / numUsers);
    });
  });
  //console.log(
  //"Budget preferences:",
  //budgetPreferences.map((total) => total / numUsers),
  //);

  // Step 3: Calculate cosine similarity and find the best restaurant
  let bestRestaurant: Tables<"restaurants"> = filteredRestaurants[0];
  let highestSimilarity = -1;

  filteredRestaurants.forEach(async (restaurant) => {
    if (!restaurant.soft_constraints) {
      //the soft constraints will always be set, but it is just for the typescript to not give errors
      // console.warn(
      //   "Skipping restaurant with no softconstraints:",
      //   restaurant.name,
      // );
      return;
    }

    const restaurantSoftConstraints = restaurant.soft_constraints
      .split("")
      .map(Number);
    let softConstraintsSimilarity = cosineSimilarity(
      softPreferences,
      restaurantSoftConstraints,
    );

    //console.log("The restaurant with id", restaurant.id, "and name", restaurant.name, "has a SOFT CONSTRAINT SIMILARITY OF:", softConstraintsSimilarity);

    const restaurantCuisineString = getCuisineSoftConstraint(
      restaurant.primary_type!,
    );
    const restaurantCuisineConstraints = restaurantCuisineString!
      .split("")
      .map(Number);

    const CuisineConstraintsSimilarity = cosineSimilarity(
      cuisinePreferences,
      restaurantCuisineConstraints,
    );

    //console.log("The restaurant with id", restaurant.id, "and name", restaurant.name, "has a CUISINE CONSTRAINT SIMILARITY OF:", CuisineConstraintsSimilarity);

    const restaurantBudgetString = getBudgetRestaurant(restaurant.price_level!);
    const restaurantBudgetConstraints = restaurantBudgetString
      .split("")
      .map(Number);

    const budgetConstraintsSimilarity = cosineSimilarity(
      budgetPreferences,
      restaurantBudgetConstraints,
    );

    //console.log("The restaurant with id", restaurant.id, "and name", restaurant.name, "has a BUDGET CONSTRAINT SIMILARITY OF:", budgetConstraintsSimilarity);
    if (Number.isNaN(softConstraintsSimilarity)) {
      console.log("FOR RESTAURANT WITH", restaurant.id, "WE GET A NaN");
      softConstraintsSimilarity = 0;
    }

    const similarity =
      (softConstraintsSimilarity +
        CuisineConstraintsSimilarity +
        budgetConstraintsSimilarity) /
      3;

    //console.log("The restaurant with id", restaurant.id, "and name", restaurant.name, "has a TOTAL SIMILARITY OF:", similarity);

    if (bestRestaurant === null || similarity > highestSimilarity) {
      highestSimilarity = similarity;
      bestRestaurant = restaurant;
    }
  });

  //console.log("Best Restaurant:", bestRestaurant);
  //console.log("Highest Similarity:", highestSimilarity);

  return { bestRestaurant, similarity: highestSimilarity };
}

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magA * magB);
}

export async function fetchUserGroups(user_idd: number) {
  // fetches the groups that the loggin in user is a part of
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

export async function checkCodeAndInsertUser( // checks the inputted group code if it exists, if it exists it checks if the current logged in user is already in the group, if this is not the case the user will be added to the group by adding a row into group_users table
  groupCode: string,
  userId: number,
) {
  const supabase = await createSupabaseServerClient();
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
  // fetch the ready status along with some other information about the group and users within that group
  const supabase = await createSupabaseServerClient();
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
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user_id);
  if (error) {
    throw new Error(`Error fetching user settings for user : ${error.message}`);
  }
  return data;
}

type UserInsert = Database["public"]["Tables"]["users"]["Insert"];

export async function importUserData(
  formData: UserInsert,
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createSupabaseServerClient();
  const { id, ...dataWithoutId } = formData;

  // Insert data into the `users` table
  const { error } = await supabase.from("users").insert(dataWithoutId);

  if (error) {
    console.error("Error inserting user data:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function updateUserConstraints(
  userId: number,
  groupId: number,
  softConstraints: string,
  cuisineConstraints: string,
  budgetConstraints: string,
) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("group_users")
    .update({
      soft_constraints: softConstraints,
      cuisine_preferences: cuisineConstraints,
      budget: budgetConstraints,
    })
    .eq("user_id", userId)
    .eq("group_id", groupId);

  if (error) console.error("Error updating user constraints:", error.message);
}

export async function fetchGroupWeightSums(group_id: number) {
  // Step 1: Fetch user IDs from the group
  const { data: groupData, error: groupError } = await supabase
    .from("group_users")
    .select("user_id")
    .eq("group_id", group_id);

  if (groupError) {
    throw new Error(`Error fetching group users: ${groupError.message}`);
  }

  if (!groupData || groupData.length === 0) {
    throw new Error(`No users found for group_id: ${group_id}`);
  }

  // Extract user IDs
  const userIds = groupData.map((row) => row.user_id);

  // Step 2: Fetch weights for all users in the group
  const { data: weightData, error: weightError } = await supabase
    .from("user_weights")
    .select("cuisine_weight, budget_weight, drink_weight, atmosphere_weight")
    .in("user_id", userIds);

  if (weightError) {
    throw new Error(`Error fetching user weights: ${weightError.message}`);
  }

  if (!weightData || weightData.length === 0) {
    throw new Error(`No weights found for the users in group_id: ${group_id}`);
  }

  // Step 3: Calculate sums
  const sums = weightData.reduce(
    (acc, weights) => {
      acc.cuisine_weight! += weights.cuisine_weight || 0;
      acc.budget_weight! += weights.budget_weight || 0;
      acc.drink_weight! += weights.drink_weight || 0;
      acc.atmosphere_weight! += weights.atmosphere_weight || 0;
      return acc;
    },
    {
      cuisine_weight: 0,
      budget_weight: 0,
      drink_weight: 0,
      atmosphere_weight: 0,
    },
  );

  return sums;
}

export async function updateUserDetails(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createSupabaseServerClient();

  // Extract data from the form
  //const fullName = formData.get("fullName") as string | null;
  const firstName = formData.get("firstName") as string | null;
  const lastName = formData.get("lastName") as string | null;
  const country = formData.get("country") as string | null;
  const city = formData.get("city") as string | null;
  const uid = (await supabase.auth.getSession()).data.session?.user.id as UUID;

  if (!uid) {
    //uid = "cec45498-f601-4ed1-816b-63ea769411ac" as UUID;
    return { success: false, error: "Full Name or user ID is missing." };
  }

  // Split the full name into first name and last name
  console.log("The first name is", firstName);
  console.log("The Last name is:", lastName);
  console.log("Country is", country);
  console.log("City is", city);
  console.log("The uid is:", uid);

  // Update the user in the database
  const { error } = await supabase
    .from("users")
    .update({
      firstName: firstName,
      lastName: lastName,
      country: country,
      city: city,
    })
    .eq("uid", uid); // Use uid as the identifier

  if (error) {
    console.error("Error updating user details:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function getPendingRatings(
  userId: number,
): Promise<number[] | null> {
  const supabase = await createSupabaseServerClient();
  // Step 1: Check if the user is in any group with a picked restaurant
  const { data: groupsData, error: groupsError } = await supabase
    .from("groups")
    .select("id")
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

export async function incrementGroupCreated(
  uid: number,
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createSupabaseServerClient();

  // Get the user ID from the session
  //const uid = (await supabase.auth.getSession()).data.session?.user.id;

  if (!uid) {
    return { success: false, error: "User ID is missing from session." };
  }

  const { data: userValue, error: fetchError } = await supabase
    .from("users")
    .select("groups_created")
    //.eq("uid", uid)
    .eq("id", uid)
    .single();

  if (fetchError || !userValue) {
    console.error("Error fetching user data:", fetchError?.message);
    return { success: false, error: fetchError?.message };
  }

  const currentValue = userValue.groups_created;

  // Step 2: Increment the column value
  const newValue = currentValue + 1;
  // Increment the selected column
  const { error } = await supabase
    .from("users")
    .update({ groups_created: newValue })
    //.eq("uid", uid);
    .eq("id", uid);

  if (error) {
    console.error("Error updating group count:", error.message);
    return { success: false, error: error.message };
  }

  // Get the updated user data
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("groups_created, groups_joined")
    //.eq("uid", uid)
    .eq("id", uid)
    .single();

  if (userError || !userData) {
    console.error("Error fetching user data:", userError?.message);
    return { success: false, error: userError?.message };
  }

  // Check and update badges
  const badgeUpdateResult = await checkAndUpdateBadges(
    uid,
    userData.groups_created,
    userData.groups_joined,
  );

  return badgeUpdateResult;
}

export async function incrementGroupJoined(
  uid: number,
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createSupabaseServerClient();

  // Get the user ID from the session
  //const uid = (await supabase.auth.getSession()).data.session?.user.id;

  if (!uid) {
    return { success: false, error: "User ID is missing from session." };
  }

  const { data: userValue, error: fetchError } = await supabase
    .from("users")
    .select("groups_joined")
    //.eq("uid", uid)
    .eq("id", uid)
    .single();

  if (fetchError || !userValue) {
    console.error("Error fetching user data:", fetchError?.message);
    return { success: false, error: fetchError?.message };
  }

  const currentValue = userValue.groups_joined;

  // Step 2: Increment the column value
  const newValue = currentValue + 1;
  // Increment the selected column
  const { error } = await supabase
    .from("users")
    .update({ groups_joined: newValue })
    //.eq("uid", uid);
    .eq("id", uid);

  if (error) {
    console.error("Error updating group count:", error.message);
    return { success: false, error: error.message };
  }

  // Get the updated user data
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("groups_created, groups_joined")
    //.eq("uid", uid)
    .eq("id", uid)
    .single();

  if (userError || !userData) {
    console.error("Error fetching user data:", userError?.message);
    return { success: false, error: userError?.message };
  }

  // Check and update badges
  const badgeUpdateResult = await checkAndUpdateBadges(
    uid,
    userData.groups_created,
    userData.groups_joined,
  );

  return badgeUpdateResult;
}

export async function checkAndUpdateBadges(
  userId: number, // userId: string
  groupsCreated: number,
  groupsJoined: number,
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createSupabaseServerClient();

  // Define badges and their conditions
  const badgeConditions = [
    { badge_id: 1, condition: groupsCreated + groupsJoined >= 1 }, // "First Timer"
    { badge_id: 3, condition: groupsJoined >= 10 }, // "Social Butterfly"
    { badge_id: 4, condition: groupsCreated >= 5 }, // "Group Leader"
  ];

  console.log("Badge conditions to evaluate:", badgeConditions);

  for (const { badge_id, condition } of badgeConditions) {
    console.log(`Updating badge ${badge_id} with condition:`, condition);

    // Update the `display` field based on the condition
    const { error } = await supabase
      .from("user_badges")
      .update({ display: condition }) // Only update the `display` field
      .eq("user_id", userId) // Match the user ID
      .eq("badge_id", badge_id); // Match the badge ID

    if (error) {
      console.error(`Error updating badge ${badge_id}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  return { success: true };
}

export async function getUserBadges(
  userId: number,
): Promise<{ badges: any[]; error?: string }> {
  const supabase = await createSupabaseServerClient();

  // Uncomment these lines when you can retrieve the uid from the session
  // const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  // const userId = sessionData?.session?.user.id;
  // if (!userId) {
  //   return { badges: [], error: "User ID is missing from session." };
  // }

  // Query the `user_badges` table for badges with `display` set to true
  const { data: badges, error } = await supabase
    .from("user_badges")
    .select("badge_id") // Adjust the columns if you need more data (e.g., badge names or descriptions)
    .eq("user_id", userId)
    .eq("display", true);

  if (error) {
    console.error("Error fetching badges:", error.message);
    return { badges: [], error: error.message };
  }
  console.log("Badges to be displayed are:", badges);
  return { badges, error: undefined };
}
