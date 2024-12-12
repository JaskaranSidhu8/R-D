"use server";

import createSupabaseServerClient from "@/lib/supabase/reader";

export async function updateUserConstraints(
  //userId: number,
  groupId: number,
  softConstraints: string,
  cuisineConstraints: string,
  budgetConstraints: string,
) {
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

  // Debug logs
  console.log("User ID from session:", userId);
  console.log("Group ID provided:", groupId);
  console.log("Soft Constraints:", softConstraints);
  console.log("Cuisine Preferences:", cuisineConstraints);
  console.log("Budget Constraints:", budgetConstraints);

  //update constraints from the database get the user id from the session
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
