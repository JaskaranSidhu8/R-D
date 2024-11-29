import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient"; // Assuming supabase is set up in a lib file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password, firstName, lastName } = req.body;

    // Check if all required fields are present
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    try {
      // Insert the new user data into the database
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            email,
            password, // Ensure you hash the password before storing it, or use a third-party auth provider like Supabase Auth
            first_name: firstName,
            last_name: lastName,
          },
        ]);

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      // Success response
      return res.status(201).json({ message: "Account created successfully!" });
    } catch (error) {
      // Catch unexpected errors
      return res.status(500).json({ error: "An error occurred while creating your account." });
    }
  } else {
    // Handle unsupported HTTP methods
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
