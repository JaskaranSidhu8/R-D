"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signUpWithEmailAndPassword(data: FormData) {
  const supabase = await createSupabaseServerClient();
  try {
    const result = await supabase.auth.signUp({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });
    if (result) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    return { success: false };
  }
}
export async function verifyEmailUsingOTP(data: FormData) {
  const supabase = await createSupabaseServerClient();
  try {
    const result = await supabase.auth.verifyOtp({
      email: data.get("email") as string,
      token: data.get("code") as string,
      type: "email",
    });
    console.log(result);
  } catch (err) {}
}
export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {}
