"use server";
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

export async function getRestaurantImages(restaurant_id: number) {
  const supabase = await createSupabaseServerClient();
  const { data: images, error } = await supabase
    .from("restaurants_photos")
    .select("*")
    .eq("restaurant_id", restaurant_id);
  if (error || !images) {
    console.error("Error fetching restaurant details:", error?.message);
  }
  return images;
}
export async function retrieveLogo(restaurant_id: number) {
  const supabase = await createSupabaseServerClient();
  const { data: restaurant, error: restaurantError } = await supabase
    .from("restaurants_logos")
    .select("url2")
    .eq("restaurant_id", restaurant_id)
    .single();

  if (restaurantError || !restaurant) {
    console.error(
      "Error fetching restaurant details:",
      restaurantError?.message,
    );
  }
  return restaurant;
}

export async function updatePickedRestaurant(
  groupId: number,
  restaurantId: number,
) {
  const supabase = await createSupabaseServerClient();

  try {
    // Update the picked_restaurant column in the groups table
    const { data, error } = await supabase
      .from("groups")
      .update({ pickedrestaurant: restaurantId })
      .eq("id", groupId); // Match the row with the provided groupId

    if (error) {
      console.error("Error updating picked_restaurant:", error);
      throw new Error("Failed to update the picked restaurant.");
    }

    console.log("Picked restaurant updated successfully:", data);
    return data; // Optionally return the updated data
  } catch (err) {
    console.error("Error in updatePickedRestaurant function:", err);
    throw err;
  }
}

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
  // const { cuisine_weight, budget_weight, drink_weight, atmosphere_weight } =
  //   await fetchGroupWeightSums(group_id);
  // const cuisineWeight = cuisine_weight! / numUsers;
  // const budgetWeight = budget_weight! / numUsers;
  // const drinkWeight = drink_weight! / numUsers;

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
  const weightsSoft = Array(9).fill(1.0); //this one I can update to be the value from users_weights value:
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
  const weightsCuisine = Array(13).fill(2.0);
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
  const weightsBudget = Array(6).fill(1.5);
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

export async function fetchUserGroups() {
  // fetches the groups that the loggin in user is a part of
  const supabase = await createSupabaseServerClient();
  const uid = (await supabase.auth.getSession()).data.session?.user.id;

  if (!uid) {
    console.error("User not authenticated");
    return [];
  }

  // 2. Map uid to custom users.id
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("uid", uid)
    .single();

  if (userError || !userData) {
    console.error("Error retrieving user ID:", userError);
    return [];
  }

  const user_idd = userData.id;

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
        size,
        group_code
      )
    `,
    )
    .eq("user_id", user_idd);
  if (error) {
    console.error("Error fetching groups for user:", error);
    return [];
  }

  return data || [];
}

export async function checkCodeAndInsertUser(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const user_uuid =
    (await supabase.auth.getSession()).data.session?.user.id || "";
  const { data: User, error } = await supabase
    .from("users")
    .select("id")
    .eq("uid", user_uuid)
    .single();
  const { data: groupData, error: groupError } = await supabase
    .from("groups")
    .select("id")
    .eq("group_code", formData.get("code") as string)
    .single();

  if (groupError) {
    return { success: false, message: "Group code not found" };
  }

  const groupId = groupData?.id;
  const userId = User?.id;
  incrementGroupJoined(userId!);

  const { data: existingUserData, error: existingUserError } = await supabase
    .from("group_users")
    .select("id")
    .eq("group_id", groupId)
    .eq("user_id", User?.id || "")
    .single();
  console.log("Existing User Data:", existingUserData);
  if (existingUserData) {
    return { success: false, message: "User is already in the group" };
  }

  const { error: insertError } = await supabase.from("group_users").insert({
    group_id: groupId,
    user_id: User?.id || 0,
  });

  if (insertError) {
    return {
      success: false,
      error: insertError.message,
      message: "Failed to add user",
    };
  }

  return { success: true, message: "User added successfully", groupId };
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
//
export async function importUserData(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createSupabaseServerClient();

  const firstName = (formData.get("firstName") as string | null) || "";
  const lastName = (formData.get("lastName") as string | null) || "";
  const country = (formData.get("country") as string | null) || "";
  const city = (formData.get("city") as string | null) || "";
  const preferences_str = (formData.get("preferences") as string | null) || "";

  const session = (await supabase.auth.getSession()).data.session;
  const uid = session?.user?.id;

  if (!uid) {
    console.error("User ID is undefined or user is not authenticated.");
    return { success: false, error: "Authentication required." };
  }

  const hard_constraints = preferences_str.length > 0 ? "1" : "0";

  type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
  const newUser: UserInsert = {
    firstName: firstName || null,
    lastName: lastName || null,
    country: country || null,
    city: city || null,
    uid,
    hard_constraints,
  };

  try {
    // Insert new user
    const { error: insertError } = await supabase.from("users").insert(newUser);
    if (insertError) throw new Error(insertError.message);

    // Fetch user ID
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("id")
      .eq("uid", uid)
      .single();

    if (fetchError || !userData) {
      throw new Error(fetchError?.message || "Failed to fetch user ID.");
    }

    const userId = userData.id;

    // Insert badges
    const badgeRows = [
      { user_id: userId, badge_id: 1, display: false },
      { user_id: userId, badge_id: 2, display: true }, // Badge 2 is displayed
      { user_id: userId, badge_id: 3, display: false },
      { user_id: userId, badge_id: 4, display: false },
      //  { user_id: userId, badge_id: 5, display: false },
    ];

    const { error: badgeError } = await supabase
      .from("user_badges")
      .insert(badgeRows);

    if (badgeError) throw new Error(badgeError.message);

    return { success: true };
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("Error in importUserData:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

// Utility function to handle unknown errors
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
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

  //const badgeUpdate5 = await checkAndUpdateBadge5(uid)

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

type Badge = {
  id: number;
  name: string;
  description: string;
  colorImageUrl: string; // URL for the colored badge
  bwImageUrl: string; // URL for the black-and-white badge
};

export async function getUserBadgesDisplay(): Promise<{
  badges: Badge[];
  error?: string;
}> {
  const supabase = await createSupabaseServerClient();
  const userId = await fetchMyUserId();

  // Query the `user_badges` table and join it with the `badges` table to retrieve detailed badge info
  const { data: badges, error } = await supabase
    .from("user_badges")
    .select(
      `
      badges (
        id,
        name,
        description,
        url_gray,
        url_display
      )
    `,
    )
    .eq("user_id", userId)
    .eq("display", true);

  if (error) {
    console.error("Error fetching badges:", error.message);
    return { badges: [], error: error.message };
  }

  // Map the response to the expected Badge structure
  const formattedBadges = badges.map((badge: any) => ({
    id: badge.badges.id,
    name: badge.badges.name,
    description: badge.badges.description,
    colorImageUrl: badge.badges.url_display,
    bwImageUrl: badge.badges.url_gray,
  }));

  console.log("Badges to be displayed are:", formattedBadges);
  return { badges: formattedBadges, error: undefined };
}

export async function getUserBadgesDisplayGray(): Promise<{
  badges: Badge[];
  error?: string;
}> {
  const supabase = await createSupabaseServerClient();

  const userId = await fetchMyUserId();
  // Query the `user_badges` table and join it with the `badges` table to retrieve detailed badge info
  const { data: badges, error } = await supabase
    .from("user_badges")
    .select(
      `
      badges (
        id,
        name,
        description,
        url_gray,
        url_display
      )
    `,
    )
    .eq("user_id", userId)
    .eq("display", false);

  if (error) {
    console.error("Error fetching badges:", error.message);
    return { badges: [], error: error.message };
  }

  // Map the response to the expected Badge structure
  const formattedBadges = badges.map((badge: any) => ({
    id: badge.badges.id,
    name: badge.badges.name,
    description: badge.badges.description,
    colorImageUrl: badge.badges.url_display,
    bwImageUrl: badge.badges.url_gray,
  }));

  console.log("Badges to be displayed are:", formattedBadges);
  return { badges: formattedBadges, error: undefined };
}

export async function createGroup(formData: FormData) {
  // creating a group, where a group_code gets generated, and other information gets pushed to the db
  const supabase = await createSupabaseServerClient();

  const name = formData.get("group_name") as string | null;
  const date = formData.get("date") as string | null;
  const time = formData.get("time") as string | null;
  // isStringDate which should be in the dining_date column saved and the day extracted as a string from the iso string
  const dining_date = new Date(`${date}T${time}:00`).toISOString();
  const day = new Date(dining_date).toLocaleDateString("en-US", {
    weekday: "long",
  });
  const uid = (await supabase.auth.getSession()).data.session?.user.id;

  if (!uid) {
    throw new Error("User not authenticated.");
  }

  // const { data: recentGroups, error: recentError } = await supabase
  //   .from("groups")
  //   .select("*")
  //   .eq("group_creator", uid)
  //   .gte(
  //     "created_at",
  //     new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  //   );

  // if (recentError) {
  //   console.error("Error fetching recent groups:", recentError);
  //   throw new Error("Internal error. Please try again later.");
  // }

  // if (recentGroups && recentGroups.length > 0) {
  //   throw new Error("You can only create one group every 24 hours.");
  // }

  function generateRandomGroupCode(): string {
    const randomNumber = Math.floor(Math.random() * 1_000_000_000);
    return String(randomNumber).padStart(9, "0");
  }

  let attempts = 0;
  const maxAttempts = 5;
  let lastError: Error | null = null;

  while (attempts < maxAttempts) {
    const group_code = generateRandomGroupCode();

    type GroupInsert = Database["public"]["Tables"]["groups"]["Insert"];
    const newGroup: GroupInsert = {
      name,
      group_creator: uid,
      group_code,
      dining_date,
      day,
    };

    const { data, error } = await supabase
      .from("groups")
      .insert(newGroup)
      .select("*");

    if (error) {
      if (error.code === "23505") {
        // Unique violation error code in Postgres
        attempts++;
        lastError = error;
      } else {
        console.error(error);
        throw new Error("Failed to create group due to an unexpected error.");
      }
    } else {
      // Group created successfully, now retrieve custom user id
      const groupId = data[0].id; // Assuming the groups table has an id field

      // Retrieve custom user id from users table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("uid", uid)
        .single();

      if (userError || !userData) {
        console.error("Error retrieving user ID:", userError);
        throw new Error("Failed to retrieve user data.");
      }

      const userId = userData.id;

      incrementGroupCreated(userId);

      // const diningDate = new Date(dining_date);
      // const createdAt = new Date(); // Current date and time

      // const timeDifferenceInMs = Math.abs(
      //   diningDate.getTime() - createdAt.getTime(),
      // );
      // const timeDifferenceInHours = timeDifferenceInMs / (1000 * 3600);

      // if (timeDifferenceInHours <= 24) {
      //   const { error: badgeUpdateError } = await supabase
      //     .from("user_badges")
      //     .update({ display: true }) // Assuming badge_5 is the correct column for this badge
      //     .eq("id", userId)
      //     .eq("badge_id", 5);

      //   if (badgeUpdateError) {
      //     console.error("Error updating badge 5:", badgeUpdateError.message);
      //     throw new Error("Failed to update badge number 5.");
      //   }
      // }

      // Insert into group_users using custom user id
      const { error: groupUserError } = await supabase
        .from("group_users")
        .insert({
          user_id: userId,
          group_id: groupId,
        });

      if (groupUserError) {
        console.error("Error inserting into group_users:", groupUserError);
        throw new Error("Failed to associate group creator with the group.");
      }

      return data;
    }
  }

  console.error(lastError);
  throw new Error(
    "Failed to create group after multiple attempts at generating a unique group code.",
  );
}

export async function fetchAvatars() {
  try {
    // Query the `avatars` table for all rows with `id` and `url`
    const { data, error } = await supabase.from("avatars").select("id, url");

    // Handle query errors
    if (error) {
      console.error("Error fetching avatars:", error);
      throw new Error("Failed to fetch avatars.");
    }

    // Return the fetched avatar data
    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error; // Re-throw error for further handling
  }
}

export async function fetchUserAvatar(
  userId: number,
): Promise<{ avatarUrl: string | null }> {
  try {
    // Perform a join query to fetch the user's avatar URL
    const { data, error } = await supabase
      .from("users")
      .select(
        `
        avatar_id,
        avatars (url)
      `,
      )
      .eq("id", userId)
      .single(); // Ensure we only fetch one user's data

    // Handle query errors
    if (error) {
      console.error("Error fetching user avatar:", error);
      throw new Error("Failed to fetch user avatar.");
    }

    // Extract the avatar URL if an avatar is selected, otherwise return null
    const avatarUrl = data?.avatars?.url || null;

    // Return the avatar URL
    return { avatarUrl };
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error; // Re-throw error for further handling
  }
}

export async function updateUserAvatar(
  userId: number,
  avatarUrl: string,
): Promise<void> {
  try {
    // Step 1: Fetch the avatar ID from the `avatars` table based on the provided URL
    const { data: avatarData, error: avatarError } = await supabase
      .from("avatars")
      .select("id")
      .eq("url", avatarUrl)
      .single(); // Ensure only one result is fetched

    if (avatarError) {
      console.error("Error fetching avatar ID:", avatarError);
      throw new Error("Failed to find avatar with the specified URL.");
    }

    if (!avatarData?.id) {
      throw new Error("Invalid avatar URL provided.");
    }

    const avatarId = avatarData.id;

    // Step 2: Update the `avatar_id` column in the `users` table for the specified user
    const { error: userError } = await supabase
      .from("users")
      .update({ avatar_id: avatarId })
      .eq("id", userId);

    if (userError) {
      console.error("Error updating user avatar:", userError);
      throw new Error("Failed to update user's avatar.");
    }

    console.log("User avatar updated successfully.");
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error; // Re-throw error for further handling
  }
}

export async function getUserAvatarOrDefault(userId: number): Promise<string> {
  try {
    // Step 1: Get the `avatar_id` for the user
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("avatar_id")
      .eq("id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user's avatar ID:", userError);
      throw new Error("Failed to fetch user's avatar ID.");
    }

    const avatarId = userData?.avatar_id;

    // Step 2: Determine which avatar URL to return
    if (avatarId) {
      // Fetch the URL for the user's selected avatar
      const { data: avatarData, error: avatarError } = await supabase
        .from("avatars")
        .select("url")
        .eq("id", avatarId)
        .single();

      if (avatarError) {
        console.error("Error fetching avatar URL:", avatarError);
        throw new Error("Failed to fetch avatar URL.");
      }

      return avatarData?.url || "";
    } else {
      // Fetch the default avatar URL (id = 1)
      const { data: defaultAvatarData, error: defaultAvatarError } =
        await supabase.from("avatars").select("url").eq("id", 1).single();

      if (defaultAvatarError) {
        console.error("Error fetching default avatar URL:", defaultAvatarError);
        throw new Error("Failed to fetch default avatar URL.");
      }

      return defaultAvatarData?.url || "";
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error; // Re-throw error for further handling
  }
}

export async function markUserReady(groupId: number) {
  const supabase = await createSupabaseServerClient();

  // Retrieve the user ID from the session
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError || !session?.session?.user) {
    console.error(
      "Failed to fetch user ID or user is not authenticated:",
      sessionError,
    );
    throw new Error("User not authenticated");
  }

  const uid = session.session.user.id;
  console.log("UID from session:", uid);

  // Fetch the corresponding user_id from the users table
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id") // Assuming `id` is the user_id column
    .eq("uid", uid) // Match the uid to fetch the user_id
    .single();

  if (userError || !userData) {
    console.error("Error fetching user ID from the users table:", userError);
    throw new Error("Failed to retrieve user data.");
  }

  const userId = userData.id;
  console.log("User ID fetched from database:", userId);

  // Update the isready field to true
  const { error } = await supabase
    .from("group_users")
    .update({ isready: true }) // Set isready to "Ready"
    .eq("user_id", userId)
    .eq("group_id", groupId);

  if (error) {
    console.error("Error updating user status to ready:", error.message);
    throw new Error("Failed to update user status");
  }

  console.log(
    `User ${userId} successfully marked as ready in group ${groupId}`,
  );
}

export async function fetchAccountDetails() {
  const supabase = await createSupabaseServerClient();

  // Retrieve the session and UID
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError || !session?.session?.user) {
    console.error(
      "Failed to fetch user ID or user is not authenticated:",
      sessionError,
    );
    throw new Error("User not authenticated");
  }

  const uid = session.session.user.id;
  console.log("UID from session:", uid);

  // Fetch the corresponding user details from the users table, including created_at
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id, firstName, lastName, country, city, created_at")
    .eq("uid", uid)
    .single();

  if (userError || !userData) {
    console.error(
      "Error fetching user details from the users table:",
      userError,
    );
    throw new Error("Failed to retrieve user details.");
  }

  console.log("User details fetched:", userData);

  // Process the created_at date to extract the month and year
  const createdAt = new Date(userData.created_at);
  const month = createdAt.toLocaleString("en-US", { month: "long" });
  const year = createdAt.getFullYear();

  // Return the user details along with the formatted joined date
  return {
    firstName: userData.firstName,
    lastName: userData.lastName,
    country: userData.country,
    city: userData.city,
    joinedDate: `${month} ${year}`,
  };
}

export async function updateAccountDetails({
  firstName,
  lastName,
  country,
  city,
}: {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
}) {
  const supabase = await createSupabaseServerClient();

  // Retrieve the user ID from the session
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError || !session?.session?.user) {
    console.error(
      "Failed to fetch user ID or user is not authenticated:",
      sessionError,
    );
    throw new Error("User not authenticated");
  }

  const uid = session.session.user.id;

  // Update the user details in the database
  const { error: updateError } = await supabase
    .from("users")
    .update({
      firstName,
      lastName,
      country,
      city,
    })
    .eq("uid", uid);

  if (updateError) {
    console.error("Error updating account details:", updateError.message);
    throw new Error("Failed to update account details");
  }

  return { success: true, message: "Account details updated successfully" };
}

export async function fetchGroupCreatorUUID(groupId: number): Promise<string> {
  const supabase = await createSupabaseServerClient();

  // Fetch the group creator UUID for the given groupId
  const { data: groupData, error: groupError } = await supabase
    .from("groups")
    .select("group_creator") // Fetch the group_creator UUID directly
    .eq("id", groupId)
    .single();

  if (groupError || !groupData?.group_creator) {
    console.error("Error fetching group creator UUID:", groupError);
    throw new Error("Failed to fetch group creator UUID. Group may not exist.");
  }

  const groupCreatorUUID = groupData.group_creator;
  console.log(`Group creator UUID for group ${groupId}:`, groupCreatorUUID);

  return groupCreatorUUID;
}

export async function fetchMyUUID(): Promise<string> {
  const supabase = await createSupabaseServerClient();

  // Retrieve the session to get the logged-in user's UUID
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError || !session?.session?.user) {
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
    .select("id") // Select the `id` column
    .eq("uid", userUUID) // Match the UUID
    .single();

  if (userError || !userData?.id) {
    console.error("Error fetching user ID:", userError);
    throw new Error("User not found.");
  }

  return userData.id; // Return the user ID
}

export async function checkUserReadyStatus(groupId: number) {
  try {
    const supabase = await createSupabaseServerClient();

    const session = await supabase.auth.getSession();
    const uid = session.data.session?.user.id;

    if (!uid) {
      throw new Error("No authenticated user found");
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("uid", uid)
      .single();

    if (userError || !userData) {
      throw new Error("Error getting user data");
    }

    const { data, error } = await supabase
      .from("group_users")
      .select("isready")
      .match({
        group_id: groupId,
        user_id: userData.id,
      })
      .single();

    if (error) {
      throw new Error("Error checking ready status");
    }

    return data?.isready || false;
  } catch (error) {
    console.error("Error in checkUserReadyStatus:", error);
    return false;
  }
}

export async function updateUserPreferences(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createSupabaseServerClient();

  // Retrieve dietary restrictions from formData
  const dietaryRestrictions =
    (formData.get("dietaryRestrictions") as string | null)?.split("-") || [];

  const uid = (await supabase.auth.getSession()).data.session?.user.id as UUID;
  if (!uid) {
    return { success: false, error: "User not authenticated." };
  }

  // Determine hard_constraints value based on dietary restrictions
  const hardConstraints =
    dietaryRestrictions.includes("Vegan") ||
    dietaryRestrictions.includes("Vegetarian")
      ? 1
      : 0;

  // Update the user's hard_constraints in the database
  const { error } = await supabase
    .from("users")
    .update({ hard_constraints: hardConstraints.toString() })
    .eq("uid", uid);

  if (error) {
    console.error("Error updating user preferences:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
export async function fetchUserConstraints(): Promise<string[]> {
  const supabase = await createSupabaseServerClient();

  // Get the current user's ID
  const uid = (await supabase.auth.getSession()).data.session?.user.id;
  if (!uid) {
    throw new Error("User not authenticated");
  }

  // Fetch the user's hard_constraints value
  const { data, error } = await supabase
    .from("users")
    .select("hard_constraints")
    .eq("uid", uid)
    .single();

  if (error) {
    console.error("Error fetching user constraints:", error);
    return [];
  }

  // Convert hard_constraints to dietary restrictions
  if ((data.hard_constraints = "1")) {
    return ["Vegan", "Vegetarian"];
  }

  return [];
}
export async function getDiningTimeDetails(
  groupId: number,
): Promise<{ hour: number; minute: number; day: number } | null> {
  if (!groupId || groupId <= 0) {
    console.error("Invalid group ID provided:", groupId);
    return null;
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("groups")
    .select("dining_date, day")
    .eq("id", groupId)
    .single();

  if (error || !data) {
    console.error("Error fetching dining_date or day:", error);
    return null;
  }

  const { dining_date, day } = data;

  if (!dining_date || !day) {
    console.error("Missing dining_date or day value.");
    return null;
  }

  const [datePart, timePart] = dining_date.split("T");
  if (!timePart) {
    console.error("Invalid dining_date format:", dining_date);
    return null;
  }

  const [hourStr, minuteStr] = timePart.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  if (isNaN(hour) || isNaN(minute)) {
    console.error("Error parsing hour or minute:", { hour, minute });
    return null;
  }

  const dayMap: Record<string, number> = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  };

  const dayNumber = dayMap[day] ?? -1;

  if (dayNumber === -1) {
    console.error("Invalid day string:", day);
    return null;
  }

  console.log("Returning dining time details:", {
    hour,
    minute,
    day: dayNumber,
  });

  return { hour, minute, day: dayNumber };
}
