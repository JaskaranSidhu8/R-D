import { NextApiRequest, NextApiResponse } from "next"; // Import types
import { checkUserCredentials } from "@/utils/supabaseUtils"; // Function to check credentials

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check that the request method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try {
    // Call the Supabase utility function to check credentials
    const { data, error } = await checkUserCredentials(email, password);

    if (error) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Send back the successful response
    return res.status(200).json({ message: "User authenticated successfully", data });
  } catch (err) {
    // Send back a 500 error if something goes wrong
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
