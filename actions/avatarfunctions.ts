"use server";
import supabase from "@/utils/supabaseClient";
import createSupabaseServerClient from "@/lib/supabase/reader";
//import { constants } from "buffer";

export const getUserAvatarUrl = async (): Promise<string | null> => {
  try {
    // Get the current user's session
    /*
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      console.error("Error fetching session or no active session:", error);
      return null;
    }

    const userId = data.session.user.id;
    */
    const supabase = await createSupabaseServerClient();

    const uid = (await supabase.auth.getSession()).data.session?.user.id;

    if (!uid) {
      throw new Error("User not authenticated.");
    }

    // Fetch user data including avatar_id
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("avatar_id")
      .eq("uid", uid)
      .single();

    if (userError) {
      console.error("Error fetching user data:", userError);
      return null;
    }

    const avatarId = userData?.avatar_id;

    //console.log(avatarId);

    if (!avatarId) {
      console.log("No avatar ID found for the user.");
      return null;
    }

    // Fetch avatar URL based on avatar_id
    const { data: avatarData, error: avatarError } = await supabase
      .from("avatars")
      .select("url")
      .eq("id", avatarId)
      .single();

    if (avatarError) {
      console.error("Error fetching avatar URL:", avatarError);
      return null;
    }

    //console.log(avatarData.url);

    return avatarData?.url || null;
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
};

export const fetchAllAvatars = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase.from("avatars").select("url");

    if (error) {
      console.error("Error fetching avatars:", error);
      return [];
    }

    // Safely filter out any null values and return only valid strings
    return (data || [])
      .map((avatar) => avatar.url)
      .filter((url): url is string => url !== null);
  } catch (err) {
    console.error("Unexpected error fetching avatars:", err);
    return [];
  }
};

export const updateUserAvatar = async (avatarUrl: string): Promise<boolean> => {
  try {
    // Fetch the current session (assuming the user is logged in)
    /*
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error(
        "No active session or error fetching session:",
        sessionError,
      );
      return false;
    }
      */

    //const userId = session.user.id; // Get the user's UID from the session
    const supabase = await createSupabaseServerClient();

    const uid = (await supabase.auth.getSession()).data.session?.user.id;

    if (!uid) {
      throw new Error("User not authenticated.");
    }

    // Get the corresponding avatar ID for the provided URL
    const { data: avatarData, error: avatarError } = await supabase
      .from("avatars")
      .select("id")
      .eq("url", avatarUrl) // Match the URL to find the ID
      .single(); // We expect a single result since the URL should be unique

    if (avatarError || !avatarData) {
      console.error("Error fetching avatar ID for URL:", avatarError);
      return false;
    }

    const avatarId = avatarData.id; // The avatar ID retrieved from the database
    console.log(avatarId);
    // Get the current user's avatar_id from the users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("avatar_id")
      .eq("uid", uid) // Match based on the user ID
      .single();

    if (userError || !userData) {
      console.error("Error fetching user data:", userError);
      return false;
    }

    //const currentAvatarId = userData.avatar_id; // Current avatar ID in the users table

    // Check if the avatar ID has changed
    /*
    if (currentAvatarId === avatarId) {
      console.log("Avatar ID is already up to date.");
      return true; // If the ID is the same, no update is necessary
    }
    */

    // Update the avatar_id in the users table if it differs
    const { data: updateData, error: updateError } = await supabase
      .from("users")
      .update({ avatar_id: avatarId })
      .eq("uid", uid); // Update based on the user ID

    if (updateError) {
      console.error("Error updating avatar ID:", updateError);
      return false;
    }

    console.log("Avatar ID successfully updated.", updateData);
    return true;
  } catch (err) {
    console.error("Unexpected error:", err);
    return false;
  }
};
