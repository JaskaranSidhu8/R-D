"use server";

import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
import { checkHardConstraintsGroup, fetchGroupPreferences} from "@/utils/backendApi";
import { Database, Tables } from "@/utils/types/supabase";
import supabase from "@/utils/supabaseClient";
import { filterRestaurantsByHardConstraint } from "@/utils/filterRestaurantsByHardConstraint";

export async function algorithm(group_id: number, filteredRestaurantsByTime: Tables<"restaurants">[]) {  //, filteredRestaurantsByTime: any[] I will need this parameter cuz the algorithm function is called when generate button is pressed by the manager, but the filtration based on time of the restaurants is done when the team was first created by the manager.
  const groupOfUsers = await fetchGroupPreferences(group_id);
  //const restaurants = await fetchRestaurants("true"); //true, meaning that it serves Vegan and Vegetarian FOOD, but we dint need it with the ne
  const hasHardConstraints = await checkHardConstraintsGroup(group_id); //works properly
  const filteredRestaurants = await filterRestaurantsByHardConstraint(filteredRestaurantsByTime, hasHardConstraints); //this function will filter if there is at least a user with hard_constraints set to true, or just return the unfiltered list again. had to write it this way cuz reasons with typescript

  const numUsers = groupOfUsers.length;
  const totalPreferences = Array(10).fill(0);
  const weights = Array(10).fill(1);
  groupOfUsers.forEach(({ soft_constraints }) => {
    if (!soft_constraints) {
      // Skip this user if softconstraints doesn't exist
     // i dont know how to fix this error, but it s not relevant now console.warn("Skipping user with  id number", `${soft_constraints.user_id} ` , " because it has no softconstraints");
     console.warn("Skipping user with no softconstraints");
      return;
    }

    console.log("softconstraints:", soft_constraints);
    const prefs = soft_constraints.split("").map(Number); // Split and convert to numbers
    prefs.forEach((pref, index) => {
      totalPreferences[index] += pref * weights[index];
      totalPreferences.map((total) => total / numUsers);
    });
  });
  console.log(
    "Total preferences:",
    totalPreferences.map((total) => total / numUsers),
  );  ///

  //repete procesul de mai sus de inca 2 ori, pt users cuisineSoftConstraint si userBudgetConstraint

  // filter hardconstraints:

  // Step 3: Filter restaurants based on hard constraints
  /*
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

  */

  // Step 4: Calculate cosine similarity and find the best restaurant
  let bestRestaurant: Tables<"restaurants"> = filteredRestaurants[0];
  let highestSimilarity = -1;

  filteredRestaurants.forEach((restaurant) => {
    if (!restaurant.soft_constraints) { //the soft constraints will always be set, but it is just for the typescript to not give errors
      console.warn(
        "Skipping restaurant with no softconstraints:",
        restaurant.name,
      );
      return;
    } 

    const restaurantPreferences = restaurant.soft_constraints
      .split("")
      .map(Number);
    const softConstraintsSimilarity = cosineSimilarity(
      totalPreferences,
      restaurantPreferences,
    );

    //const similarity = softConstraintsSimilarity * weightSoft + cuisineSimilarity * weightCuisine + budgetSimilarity *weightBudget

    if (bestRestaurant === null || softConstraintsSimilarity > highestSimilarity) { //aici pui similarity , lasa asa ca sa nu ti dea erori momentan
      highestSimilarity = softConstraintsSimilarity;
      bestRestaurant = restaurant;
    }
  });

  console.log("Best Restaurant:", bestRestaurant);

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
