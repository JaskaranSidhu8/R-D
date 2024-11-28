// File: app/api/verifyOtp/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient"; // Adjust if using Supabase
import { validateOtp } from "@/utils/otpUtils"; // Helper to validate OTP formatting

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    // Check for missing fields
    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required." }, { status: 400 });
    }

    // Validate OTP format (e.g., 6-digit numeric)
    if (!validateOtp(otp)) {
      return NextResponse.json({ error: "Invalid OTP format." }, { status: 400 });
    }

    // Query the database or cache to find the OTP for the email
    const { data, error } = await supabase
      .from("otp_verifications") // Replace with your actual table name
      .select("otp, expires_at")
      .eq("email", email)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "OTP not found for the provided email." }, { status: 404 });
    }

    // Check OTP expiration
    const now = new Date();
    if (new Date(data.expires_at) < now) {
      return NextResponse.json({ error: "OTP has expired." }, { status: 410 });
    }

    // Compare OTPs
    if (data.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP." }, { status: 401 });
    }

    // Success - OTP is valid
    return NextResponse.json({ message: "OTP verified successfully!" });
  } catch (err) {
    console.error("Error in OTP verification:", err);
    return NextResponse.json({ error: "An error occurred during verification." }, { status: 500 });
  }
}
