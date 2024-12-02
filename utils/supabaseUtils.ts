import { supabase } from "./supabaseClient";

export const checkUserCredentials = async (email: string, password: string) => {
  console.log("just before calling the database to sign in");
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  console.log("just after calling the database to sign in");
  return { data, error };
};
