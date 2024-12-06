"use server";
import {
  checkHardConstraintsGroup,
  fetchGroupPreferences,
} from "@/utils/backendApi";
import { Tables } from "@/utils/types/supabase";
import supabase from "@/utils/supabaseClient";
import { filterRestaurantsByHardConstraint } from "@/utils/filterRestaurantsByHardConstraint";
import { getCuisineSoftConstraint } from "@/utils/fetchRestaurantCuisineSoftConstraints";
import { getBudgetRestaurant } from "@/utils/convertRestaurantBudgetToSoftConstraint";
import { filterRestaurantsByTime } from "@/utils/filterRestaurantsBasedOnTime";

export async function algorithm(
  group_id: number,
  day: number,
  hour: number,
  minute: number,
) {
  const filteredRestaurantsByTime = await filterRestaurantsByTime(
    day,
    hour,
    minute,
  );
  const groupOfUsers = await fetchGroupPreferences(group_id);
  //const restaurants = await fetchRestaurants("true"); //true, meaning that it serves Vegan and Vegetarian FOOD, but we dint need it with the ne
  const hasHardConstraints = await checkHardConstraintsGroup(group_id); //works properly
  const filteredRestaurants = await filterRestaurantsByHardConstraint(
    filteredRestaurantsByTime,
    hasHardConstraints,
  ); //this function will filter if there is at least a user with hard_constraints set to true, or just return the unfiltered list again. had to write it this way cuz reasons with typescript
  //console.log("The number of restaurants after filtration is:", filteredRestaurants.length);
  const numUsers = groupOfUsers.length;
  console.log("Number of users is:", numUsers);
  const softPreferences = Array(9).fill(0);
  const weightsSoft = Array(9).fill(1); //this one I can update to be the value from users_weights value:
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
  const weightsCuisine = Array(13).fill(2);
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

  // Return or log the best restaurant
  return { bestRestaurant, similarity: highestSimilarity };
}

// Cosine similarity function
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magA * magB);
}

export async function fetchUserGroups(user_idd: number) {
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
        location,
        group_creator,
        hard_constraints,
        isdeleted,
        size


      )
     
    `,
    )
    .eq("user_id", user_idd); // Filter by the user_id
  if (error) {
    throw new Error(`Error fetching groups for user: ${error.message}`);
  }
  return data;
}
