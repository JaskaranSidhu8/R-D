import { NextApiRequest, NextApiResponse } from "next"; // Import types
import { sendVerificationEmail } from "@/utils/supabaseUtils"; // Function to send verification email

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check that the request method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email } = req.body;

  try {
    // Call the Supabase utility function to send a verification email
    const { data, error } = await sendVerificationEmail(email);

    if (error) {
      return res.status(400).json({ error: "Error sending verification email" });
    }

    // Send back the successful response
    return res.status(200).json({ message: "Verification email sent successfully" });
  } catch (err) {
    // Send back a 500 error if something goes wrong
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
