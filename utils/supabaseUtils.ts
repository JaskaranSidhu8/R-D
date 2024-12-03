'use server';
//import { createServerClient } from "@supabase/ssr";
import { supabase } from "./supabaseClient";

export const checkUserCredentials = async (email: string, password: string) => {
  console.log("just before calling the database to sign in");
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (data) {
    const session = await supabase.auth.getSession();
    console.log("Session after login:", session);
  }
  console.log("just after calling the database to sign in");
  return { data, error };
};
