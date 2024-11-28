import { supabase } from "./utils/supabaseClient";

export const checkEmailExists = async (email: string) => {
  const { data, error } = await supabase
    .from("users") 
    .select("email")
    .eq("email", email)
    .single();

  return { data, error };
};

export const checkUserCredentials = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
};

export const sendVerificationEmail = async (email: string) => {
  const { data, error } = await supabase.auth.sendVerificationEmail(email);
  return { data, error };
};