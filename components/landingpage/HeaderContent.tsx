"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { validateEmail } from "@/utils/emailUtils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AppContext"; // Import the useAuth hook

const HeaderContent = () => {
  const router = useRouter();
  const { setEmail } = useAuth(); // Access setEmail from context to store the email globally
  const [emailLocal, setEmailLocal] = useState(""); // Local state for email input
  const [error, setError] = useState(""); // Error state

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailLocal(e.target.value);
    setError(""); // Reset error message on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the entered email
    if (!validateEmail(emailLocal)) {
      setError("Please enter a valid email address.");
      console.log("Invalid email entered:", emailLocal);
      return;
    }

    console.log("Email entered for check:", emailLocal);

    // Store email in global context using setEmail from the AuthContext
    setEmail(emailLocal);

    try {
      // Check if the email exists in the system (via API call)
      const response = await fetch("/api/checkEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailLocal }),
      });

      const result = await response.json();
      console.log("Email check result:", result);

      // Redirect based on the result of the email check
      if (result.exists) {
        console.log("Email exists, redirecting to Signin");
        router.push("/Signin"); // Redirect to signin page if email exists
      } else {
        console.log("Email does not exist, redirecting to Signup");
        router.push("/Signup"); // Redirect to signup page if email doesn't exist
      }
    } catch (err) {
      console.error("Error while checking email:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="absolute bottom-20 w-full items-center">
      <div className="relative z-10 text-center w-full px-6 mt-10">
        <p className="montserrat text-2xl font-bold text-white">
          Don't know where to eat?
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
          value={emailLocal}
          onChange={handleEmailChange}
        />
        {error && <div className="text-red-500 mt-2">{error}</div>}

        <Button onClick={handleSubmit} className="w-full mt-5 py-6 rounded-full shadow-lg">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default HeaderContent;
