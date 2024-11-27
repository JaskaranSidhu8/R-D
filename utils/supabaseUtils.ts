import { supabase } from "@/utils/supabaseClient"; // Assuming your supabase client is set up correctly

export const checkEmailExists = async (email: string) => {
  const { data, error } = await supabase
    .from("users")  // Replace "users" with your table name
    .select("email")
    .eq("email", email)
    .single();

  return { data, error };
};
