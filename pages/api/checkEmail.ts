import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" }); // Restrict to POST requests
  }

  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email provided" }); // Validate request body
  }

  try {
    const { data, error } = await supabase
      .from("users") // Replace with your actual table name
      .select("email")
      .eq("email", email)
      .single(); // Check if the email exists in the database

    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Database error occurred" });
    }

    if (data) {
      return res.status(200).json({ exists: true }); // Email exists
    } else {
      return res.status(200).json({ exists: false }); // Email does not exist
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal server error" }); // Handle unexpected errors
  }
}
