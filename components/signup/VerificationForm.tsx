// File: components/signup/VerificationForm.tsx
import React, { useState } from "react";
import { useAuth } from "@/app/context/authcontext"; // Use AuthContext for email
import { useRouter } from "next/navigation"; // For routing
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"; // OTP input UI
import { Button } from "../ui/button";

const VerificationForm = () => {
  const { email } = useAuth(); // Fetch email from context
  const [otp, setOtp] = useState<string>(""); // State to store OTP
  const [error, setError] = useState<string>(""); // State for error messages
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const router = useRouter(); // Router instance

  // Handle OTP input changes
  const handleOtpChange = (value: string) => {
    setOtp(value);
    setError(""); // Reset error on input change
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Validate OTP length
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    setIsLoading(true); // Start loading state
    setError(""); // Reset errors

    try {
      // Call API endpoint to verify OTP
      const res = await fetch("/api/verifyOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }), // Send email and OTP
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid verification code.");
      }

      // If successful, redirect to setup page
      router.push("/Signup/Setup");
    } catch (err: any) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 mt-10 items-center justify-center">
      {/* OTP input fields */}
      <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      {/* Display errors */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Submit button */}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify"}
      </Button>
    </form>
  );
};

export default VerificationForm;
