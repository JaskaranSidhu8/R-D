import supabase from "./supabaseClient";
import { unstable_noStore as noStore } from "next/cache";
import { Database, Tables } from "./types/supabase";
import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";

//export async function fetchGroupPreferences2(group_id: number) {
//   const preferencesUserMax =  supabase
//    .from('group_users')
//    .select(
//      `
//      id,
//      user_id,
//      group_id,
//      softconstraints,
//      users (
//        hardconstraints
//      )
//    `,
//    )
//    .eq("group_id", group_id);
//    type preferencesUserssss = QueryData<typeof preferencesUserMax>;
//    const { data , error} =  await preferencesUserMax;
//    if (error) throw error;
//    const preferencesUserssss: preferencesUserssss =  data;
//    return preferencesUserMax
//}
//

//export function filterRestaurantsByHardConstraints(groupUsers: preferencesUserssss, restaurants: restaurants[]) {
//  const glutenRequired = groupUsers.some((user) => {
//    if (!user.users || !user.users.hardconstraints) {
//      return false;
//    }
//    return user.users.hardconstraints[0] === "1";
//  });
//  return restaurants.filter((restaurant) => {
//    if (!restaurant.hardconstraints) {
//      console.error(
//        "Undefined or missing hardconstraints for restaurant:",
//        restaurant,
//      );
//      return false;
//    }
//    const isGlutenFree = restaurant.hardconstraints[0] === "1";
//    return !glutenRequired || isGlutenFree;
//  });

//}

export async function fetchGroupPreferences(group_id: number) {
  const { data, error } = await supabase
    .from("group_users")
    .select(
      `
      id,
      user_id,
      group_id,
      soft_constraints,
      cuisine_preferences,
      budget,
      users (
        hard_constraints
      )
    `,
    )
    .eq("group_id", group_id);
  if (error) {
    throw new Error(`Error fetching group users: ${error.message}`);
  }
  return data;
}
export async function checkHardConstraintsGroup(group_id: number) {
  const { data, error } = await supabase
    .from("group_users")
    .select(
      `
      id,
      user_id,
      group_id,
      soft_constraints,
      users (
        hard_constraints
      )
    `,
    )
    .eq("group_id", group_id);
  if (error) {
    throw new Error(`Error fetching group users: ${error.message}`);
  }

  const hasHardConstraints = data.some((user) => {
    const hardConstraints = user.users?.hard_constraints;
    return (
      hardConstraints &&
      Object.values(hardConstraints).some((value) => value === "1")
    );
  });
  //console.log("The hasHardConstraintValueIs:",  hasHardConstraints);
  return hasHardConstraints;
}

{
  /*
export async function fetchRestaurants(hardConst: string) { //will not be used in teh future
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq("hard_constraints", hardConst);
  if (error) {
    throw new Error(`Error fetching restaurants: ${error.message}`);
  }
  return data;
}
*/
}

//export function combinePreferences(groupUsers: prefe  , weights = Array(10).fill(1)) {
//  const numUsers = groupUsers.length;
//  const totalPreferences = Array(10).fill(0);
//  groupUsers.forEach(({ softconstraints }) => {
//    console.log("softconstraints:", softconstraints);
//    const prefs = softconstraints.split("").map(Number);
//    prefs.forEach((pref, index) => {
//      totalPreferences[index] += pref * weights[index];
//    });
//  });
//  return totalPreferences.map((total) => total / numUsers);
//}
//export function cosineSimilarity(vecA: number[], vecB: number[]) {
//  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
//  const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
//  const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
//  return dotProduct / (magA * magB);
//}
