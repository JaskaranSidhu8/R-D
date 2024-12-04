import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  console.log(req.body);
  const { email } = req.body;
  console.log(email);

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email provided" });
  }

  try {
    // Query the 'test_users' table for the provided email
    const { data, error } = await supabase 
      .from("test_users")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.error("Error checking email in users table:", error);
      return res.status(500).json({ error: "Database error occurred" });
    }

    if (data) {
      console.log("email found");
      return res.status(200).json({ exists: true }); // Email exists
    } else {
      console.log("email not found");
      return res.status(200).json({ exists: false }); // Email doesn't exist
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}