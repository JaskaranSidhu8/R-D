'use server';
import { NextApiRequest, NextApiResponse } from "next"; // Import types
import { supabase } from "@/utils/supabaseClient"; // Import Supabase client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check that the request method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try {
    console.log("just before calling the database to sign in");

    // Perform the sign-in directly within this API handler
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (data) {
      //const session = await supabase.auth.getSession();
      // Get the current session after successful login
    // Get the current session after successful login
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      console.log("testing local storage");
      //console.log(localStorage.getItem('supabase.auth.token')); // Should not be null
      console.log("Session after login:", data);
    }

    console.log("just after calling the database to sign in");

    if (error) {
      console.error("Error getting session:", error);
      return res.status(500).json({ error: "Failed to retrieve session" });
    }


    /*if (error) {
      console.log("error after calling signInWithPassword");
      return res.status(400).json({ error: "Invalid credentials" });
    }*/

    // Send back the successful response
    console.log("no error calling signInWithPassword");
    return res.status(200).json({
      message: "User authenticated successfully",
      access_token: data?.session?.access_token, // Access token from the session
      refresh_token: data?.session?.refresh_token, // Refresh token from the session
    });

    //return res.status(200).json({ message: "User authenticated successfully", data });
  } catch (err) {
    // Send back a 500 error if something goes wrong
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
