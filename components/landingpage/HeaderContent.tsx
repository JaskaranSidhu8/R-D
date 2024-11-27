import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { validateEmail } from "@/utils/emailUtils";  // Import email validation function
import { checkEmailExists } from "@/utils/supabaseUtils";  // Import supabase query function
import { useRouter } from "next/router";

const HeaderContent = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");  // Reset error if email is updated
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side email validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Check if email exists in the database (Supabase query)
    const { data, error: dbError } = await checkEmailExists(email);

    if (dbError) {
      setError("Error checking email in database.");
      return;
    }

    // Redirect based on email existence
    if (data) {
      // Email exists, redirect to sign-in page with email as query parameter
      router.push(`/Signin?email=${email}`);
    } else {
      // Email doesn't exist, redirect to sign-up page with email as query parameter
      router.push(`/Signup?email=${email}`);
    }
  };

  return (
    <div className="absolute bottom-20 w-full items-center">
      <div className="relative z-10 text-center w-full px-6 mt-10">
        <p className="montserrat text-2xl font-bold text-white">
          Don&apos;t know where to eat?
        </p>
        <p className="montserrat text-2xl font-bold text-primary mt-2">
          Let Tiebreaker decide.
        </p>
      </div>

      <div className="relative z-10 w-full px-6 mt-8 items-center">
        <Input
          type="email"
          placeholder="Enter your email"
          className="border-secondary mt-4 text-center py-6 w-full rounded-full bg-white"
          value={email}
          onChange={handleEmailChange}
        />
        {error && <div className="text-red-500 mt-2">{error}</div>}

        <Button
          onClick={handleSubmit}
          className="w-full mt-5 py-6 rounded-full shadow-lg"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default HeaderContent;
