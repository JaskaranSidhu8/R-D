"use server";
//import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
//import { fetchGroupPreferences, fetchRestaurants } from "@/utils/backendApi";
//import { Database, Tables } from "@/utils/types/supabase";
//import createSupabaseServerClient from "@/lib/supabase/reader";
import supabase from "@/utils/supabaseClient";

/**
 * Fetches all avatars from the `avatars` table.
 * @returns {Promise<{ id: number; url: string }[]>} A promise that resolves to an array of avatar objects.
 * Each object contains:
 *   - `id` (number): The unique ID of the avatar.
 *   - `url` (string): The public URL of the avatar image.
 * @throws {Error} Throws an error if the database query fails.
 */
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

/**
 * Fetches the currently selected avatar URL for a specific user.
 * @param {number} userId - The unique ID of the user whose avatar is being fetched.
 * @returns {Promise<{ avatarUrl: string | null }>} A promise that resolves to an object containing:
 *   - `avatarUrl` (string | null): The public URL of the user's avatar or `null` if no avatar is selected.
 * @throws {Error} Throws an error if the database query fails.
 */
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

/**
 * Updates the user's avatar by first fetching the corresponding avatar ID from the `avatars` table
 * using the provided avatar URL and then updating the `avatar_id` column in the `users` table.
 * @param {number} userId - The unique ID of the user whose avatar is being updated.
 * @param {string} avatarUrl - The public URL of the avatar to set for the user.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 * @throws {Error} Throws an error if the update fails or the avatar URL is invalid.
 */
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

/**
 * Fetches the user's avatar URL. If the user does not have an avatar set,
 * returns the default avatar URL corresponding to `id = 1` in the `avatars` table.
 * @param {number} userId - The unique ID of the user.
 * @returns {Promise<string>} A promise that resolves to the URL of the avatar.
 * @throws {Error} Throws an error if the query or fallback fails.
 */
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

      return avatarData.url;
    } else {
      // Fetch the default avatar URL (id = 1)
      const { data: defaultAvatarData, error: defaultAvatarError } =
        await supabase.from("avatars").select("url").eq("id", 1).single();

      if (defaultAvatarError) {
        console.error("Error fetching default avatar URL:", defaultAvatarError);
        throw new Error("Failed to fetch default avatar URL.");
      }

      return defaultAvatarData.url;
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error; // Re-throw error for further handling
  }
}
