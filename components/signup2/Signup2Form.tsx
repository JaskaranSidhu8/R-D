"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "@/app/context/authcontext"; // Import AuthContext
import { useRouter } from "next/navigation"; // For navigation

const Signup2Form = () => {
  // Local state for first name, last name
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(""); // Error message state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const { email, password } = useAuth(); // Fetch email and password from AuthContext
  const router = useRouter(); // For navigation

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Check that all fields are filled
    if (!firstName || !lastName) {
      setError("First Name and Last Name are required."); // Display error if fields are empty
      return;
    }

    setIsLoading(true); // Set loading state

    try {
      // Call the API to create the user account
      const res = await fetch("/api/createAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Account creation failed.");
      }

      // On success, navigate to the home page
      router.push("/Home");
    } catch (err: unknown) {
      // Check if the error is an instance of the Error class
      if (err instanceof Error) {
        setError(err.message); // Safely access the error message
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* First Name Input */}
      <Input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      {/* Last Name Input */}
      <Input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      {/* Display error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating Account..." : "Create Your Account"}
      </Button>
    </form>
  );
};

export default Signup2Form;
