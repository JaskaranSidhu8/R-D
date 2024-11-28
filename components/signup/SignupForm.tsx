"use client";

import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { validateEmail } from "@/utils/emailUtils"; // Email validation
import { validatePassword } from "@/utils/passwordUtils"; // Password validation
import { useRouter } from "next/router"; // For routing
import { useAuth } from "../../app/context/authcontext"; // Importing useAuth hook to access the AuthContext

type Props = {
  mode: "Signup" | "Signin";
  email: string;
};

const SignupForm = (props: Props) => {
  // Get setEmail and setPassword from the AuthContext to store email and password temporarily
  const { setEmail, setPassword } = useAuth(); // Access context methods to store email and password

  const [email, setEmailState] = useState(props.email || ""); // Email state, pre-filled if provided
  const [password, setPasswordState] = useState(""); // Password state
  const [error, setError] = useState(""); // Error message state
  const [passwordValid, setPasswordValid] = useState(true); // Password validity check
  const [verificationSent, setVerificationSent] = useState(false); // Track if verification email was sent
  const [isLoading, setIsLoading] = useState(false); // Loading indicator
  const [emailValid, setEmailValid] = useState(true); // Email validity check
  const router = useRouter();

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(e.target.value);
    setEmailValid(validateEmail(e.target.value)); // Validate email
    setError(""); // Reset error message
  };

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState(e.target.value);
    setPasswordValid(validatePassword(e.target.value)); // Validate password
    setError(""); // Reset error message
  };

  // Handle form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !emailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordValid) {
      setError("Password does not meet the required criteria.");
      return;
    }

    setIsLoading(true); // Show loading state while processing

    if (props.mode === "Signup") {
      // Store email and password in AuthContext
      setEmail(email); // Store email temporarily in context
      setPassword(password); // Store password temporarily in context

      // Call API route to send verification email
      try {
        const res = await fetch("/api/sendVerificationEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Error sending verification email");
        }

        setVerificationSent(true); // Show success message
        router.push("/Signup/Verify"); // Redirect to verification page
      } catch (err) {
        setError("Error sending verification email.");
        setIsLoading(false);
      }
    } else {
      // Call API route to check credentials for sign-in
      try {
        const res = await fetch("/api/checkCredentials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Invalid credentials");
        }

        router.push("/Home"); // Redirect to home page on successful login
      } catch (err) {
        setError("Wrong password or email.");
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (props.email) {
      setEmailState(props.email); // Use the email passed from the landing page
    }
  }, [props.email]);

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Email input */}
      <Input
        required
        type="email"
        placeholder="Enter your email address"
        name="email"
        value={email}
        onChange={handleEmailChange} // Handle email input change
      />

      {/* Display email validity error */}
      {!emailValid && <p className="text-red-500">Please enter a valid email address.</p>}

      {/* Password input */}
      <Input
        required
        type="password"
        placeholder="Enter your password"
        name="password"
        value={password}
        onChange={handlePasswordChange} // Handle password input change
      />

      {/* Display password validation error if necessary */}
      {!passwordValid && <p className="text-red-500">Password does not meet the required criteria.</p>}

      {/* Display error message if signup or signin fails */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Submit button */}
      <Button type="submit" disabled={isLoading}>
        {props.mode === "Signup" ? "Sign up" : "Sign in"}
      </Button>

      {/* Inform user that a verification email has been sent */}
      {verificationSent && (
        <p className="text-green-500">A verification code has been sent to your email.</p>
      )}
    </form>
  );
};

export default SignupForm;
