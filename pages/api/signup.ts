import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient"; // Ensure supabase client is correctly imported

type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, password }: SignupPayload = req.body;

  // Validate request payload
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long." });
  }

  try {
    // Step 1: Create the user with email/password and redirect URL for email verification
    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "https://localhost:3000/Home", // Redirect after email verification
      },
    });

    // Handle signup error
    if (signupError) {
      if (signupError.message.includes("already registered")) {
        return res.status(409).json({ message: "Email is already registered." });
      }
      throw signupError;
    }

    // Step 2: Insert the user details into the custom 'test_users' table
    const { error: insertError } = await supabase
      .from('test_users')
      .insert([{ name, email }]); // Insert name and email into 'test_users'

    if (insertError) {
      console.error("Error inserting into test_users table:", insertError.message);
      return res.status(500).json({ message: "Error saving user in database. Please try again." });
    }

    // Step 3: Return success response
    return res.status(200).json({
      message: "Signup successful. Check your email to verify your account.",
    });
  } catch (error: any) {
    console.error("Error in signup handler:", error.message || error);
    return res.status(500).json({ message: "An unexpected error occurred. Please try again." });
  }
}