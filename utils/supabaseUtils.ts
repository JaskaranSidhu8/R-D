//"use client";

import { supabase } from "./supabaseClient";

/*
export const checkEmailExists = async (email: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .maybeSingle();  // Use maybeSingle instead of single to handle 0 rows returned gracefully

  // If an error occurs during the query, return an error message
  if (error) {
    return { exists: false, error: "Error checking email in the database." };  // Handle unexpected errors gracefully
  }

  // Return whether data exists or not
  return { exists: data ? true : false };  // If data is null, it means no record was found
};
*/

export const checkUserCredentials = async (email: string, password: string) => {
  console.log("just before calling the database to sign in");
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  console.log("just after calling the database to sign in");
  return { data, error };
};

export const sendVerificationEmail = async (email: string) => {
  const { data, error } = await supabase.auth.sendVerificationEmail(email); //check supabase auth functions
  return { data, error };
};
