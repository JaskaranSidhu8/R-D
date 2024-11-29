import supabase from "./supabaseClient";

interface User {
  hardconstraints: string; // Hard constraints from the `users` table
}

interface GroupUser {
  user_id: number;
  softconstraints: string;
  users: User | null; // Single user per group_users row
}

type SupabaseGroupUser = {
  user_id: number;
  softconstraints: string;
  users: { hardconstraints: string } | null; // Single user or null
};


interface Restaurant {
  id: number;
  name: string;
  softconstraints: string;
  hardconstraints: string; // Restaurants can have null for hard constraints
}


export async function fetchGroupPreferences(groupId: number): Promise<GroupUser[]> {
  const { data: groupUsers, error } = await supabase
    .from("group_users")
    .select(`
      user_id,
      softconstraints,
      users (
        hardconstraints
      )
    `)
    .eq("group_id", groupId);

  if (error) {
    throw new Error(`Error fetching group users: ${error.message}`);
  }

  if (!groupUsers) {
    throw new Error("No group users found");
  }

  // Explicitly type the response from Supabase
  const typedGroupUsers = groupUsers as Array<{
    user_id: number;
    softconstraints: string;
    users: { hardconstraints: string } | null;
  }>;

  // Transform the data to match the GroupUser interface
  const transformedGroupUsers: GroupUser[] = typedGroupUsers.map((user) => ({
    user_id: user.user_id,
    softconstraints: user.softconstraints,
    users: user.users
      ? { hardconstraints: user.users.hardconstraints || "" }
      : null, // Handle null user relation
  }));

  return transformedGroupUsers;
}



export function filterRestaurantsByHardConstraints(
  groupUsers: GroupUser[],
  restaurants: Restaurant[]
): Restaurant[] {
  console.log("Filtering restaurants. GroupUsers:", groupUsers);
  console.log("Initial restaurants list:", restaurants);

  const glutenRequired = groupUsers.some((user) => {
    const userHardconstraints = user.users?.hardconstraints || "";
    if (!userHardconstraints) {
      console.error("Undefined or missing hardconstraints for user:", user);
      return false;
    }
    return userHardconstraints[0] === "1";
  });

  console.log("Gluten-free requirement:", glutenRequired);

  return restaurants.filter((restaurant) => {
    if (!restaurant.hardconstraints) {
      console.error("Undefined or missing hardconstraints for restaurant:", restaurant);
      return false;
    }
    const isGlutenFree = restaurant.hardconstraints[0] === "1";
    return !glutenRequired || isGlutenFree;
  });
}

export async function fetchRestaurants(): Promise<Restaurant[]> {
  const { data: restaurants, error } = await supabase
    .from("restaurants")
    .select("id, name, softconstraints, hardconstraints");

  if (error) {
    throw new Error(`Error fetching restaurants: ${error.message}`);
  }

  return restaurants;
}

export function combinePreferences(groupUsers: GroupUser[], weights = Array(10).fill(1)): number[] {
  const numUsers = groupUsers.length;
  const totalPreferences = Array(10).fill(0);

  groupUsers.forEach(({ softconstraints }) => {
    console.log("softconstraints:", softconstraints);
    const prefs = softconstraints.split("").map(Number);
    prefs.forEach((pref, index) => {
      totalPreferences[index] += pref * weights[index];
    });
  });

  return totalPreferences.map((total) => total / numUsers);
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magA * magB);
}
