"use server";

import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
import { fetchGroupPreferences, fetchRestaurants } from "@/utils/backendApi";
import { Database, Tables } from "@/utils/types/supabase";
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
    prefs.forEach((pref, index) => {
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
        hardconstraints,
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
