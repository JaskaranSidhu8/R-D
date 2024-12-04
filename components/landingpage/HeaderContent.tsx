"use client"; // Client-side rendering for this component (Added)

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation"; // For routing after form submission (Added)
import { useAuth } from "@/app/context/AppContext"; // For accessing global email context (Added)
import { validateEmail } from "@/utils/emailUtils"; // Email validation utility function (Added)

const HeaderContent = () => {
  const router = useRouter(); // Next.js router for client-side navigation (Added)
  const { setEmail } = useAuth(); // Context hook to set email globally (Added)
  const [emailLocal, setEmailLocal] = useState(""); // Local state to store the entered email (Unchanged)
  const [error, setError] = useState(""); // Error message for invalid email (Unchanged)

  // Handles changes to the email input field (Unchanged)
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailLocal(e.target.value); // Update local email state (Unchanged)
    setError(""); // Reset error message on input change (Unchanged)
  };

  // Handles form submission and validation (Unchanged)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior (Unchanged)

    // Validate the entered email using utility function (Added)
    if (!validateEmail(emailLocal)) {
      setError("Please enter a valid email address."); // Show error if invalid email (Added)
      return;
    }

    setError(""); // Clear any previous error if email is valid (Unchanged)

    setEmail(emailLocal); // Store email globally using context (Added)

    try {
      // Fetch request to the server to check if the email exists (Replaced the function call with fetch) (Added)
      const response = await fetch("/api/checkEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailLocal }),
      });

      const result = await response.json(); // Process the response from the server (Added)

      // Handle the response from the server (Added)
      if (result.exists) {
        console.log("Email exists, redirecting to Signin");
        router.push("/Signin"); // Redirect to Signin page if email exists (Added)
      } else {
        console.log("Email does not exist, redirecting to Signup");
        router.push("/Signup"); // Redirect to Signup page if email doesn't exist (Added)
      }
    } catch (err) {
      console.error("Error while checking email:", err);
      setError("Something went wrong. Please try again later."); // Show error message if API call fails (Added)
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
        {/* Email input field */}
        <Input
          type="email"
          placeholder="Enter your email"
          className="border-secondary mt-4 text-center py-6 w-full rounded-full bg-white"
          value={emailLocal}
          onChange={handleEmailChange} // Handle email input changes (Unchanged)
        />
        {/* Error message if validation fails */}
        {error && <div className="text-red-500 mt-2">{error}</div>}

        {/* Submit button */}
        <Button onClick={handleSubmit} className="w-full mt-5 py-6 rounded-full shadow-lg">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default HeaderContent;
