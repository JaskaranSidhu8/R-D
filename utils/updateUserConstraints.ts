"use server";

import createSupabaseServerClient from "@/lib/supabase/reader";

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
