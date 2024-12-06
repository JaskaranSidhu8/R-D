"use server";

import readUserSession from "@/lib/actions";
import createSupabaseServerClient from "@/lib/supabase/server";

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
    if (result) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}
export async function signInWithEmailAndPassword(data: FormData) {
  const supabase = await createSupabaseServerClient();
  try {
    const result = await supabase.auth.signInWithPassword({
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

export async function logOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
}

export async function checkLogin() {
  const { data } = await readUserSession();
  console.log("id", data.session?.user.id);
  return data.session ? true : false;
}
