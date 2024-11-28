"use client";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// Import the email validation function
import { validateEmail } from "@/utils/emailUtils"; // Email validation
import { validatePassword } from "@/utils/passwordUtils"; // Password validation
import { sendVerificationEmail } from "@/utils/supabaseUtils"; // Send verification email
import { checkUserCredentials } from "@/utils/supabaseUtils"; // Check user credentials
import { useRouter } from "next/router"; // For routing
import { useAuth } from "../app/context/authcontext"; // Import the useAuth hook

type Props = {
  mode: "Signup" | "Signin";
  email: string;
};

const SignupForm = (props: Props) => {
  const { setEmail, setPassword } = useAuth(); // Use context to store email and password
  const [email, setEmailState] = useState(props.email || ""); // Email state, pre-filled if provided
  const [password, setPasswordState] = useState(""); // Password state
  const [error, setError] = useState(""); // Error message state
  const [passwordValid, setPasswordValid] = useState(true); // Password validity check
  const [verificationSent, setVerificationSent] = useState(false); // Track if verification code was sent
  const [isLoading, setIsLoading] = useState(false); // Loading indicator
  const [emailValid, setEmailValid] = useState(true); // Email validity check
  const router = useRouter();

  // Check if email is valid
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(e.target.value);
    setEmailValid(validateEmail(e.target.value)); // Validate email
    setError(""); // Reset error message
  };

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState(e.target.value);
    setPasswordValid(validatePassword(e.target.value)); // Validate password
    setError(""); // Reset error message
  };

  // Submit form
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Validate email before submission if it's empty
    if (!email || !emailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordValid) {
      setError("Password does not meet the required criteria.");
      return;
    }

    setIsLoading(true); // Set loading state while processing

    // Store email and password in context
    setEmail(email);
    setPassword(password);

    if (props.mode === "Signup") {
      // Send verification code when signing up
      const { data, error } = await sendVerificationEmail(email);
      if (error) {
        setError("Error sending verification email.");
        setIsLoading(false);
        return;
      }

      setVerificationSent(true); // Show verification sent message
      router.push("/Signup/Verify"); // Redirect to verification page
    } else {
      // Handle Signin: check email and password match
      const { data, error } = await checkUserCredentials(email, password);
      if (error) {
        setError("Wrong password!"); // Display error if login fails
        setIsLoading(false);
        return;
      }

      router.push("/Home"); // Redirect to home after successful login
    }
  };

  useEffect(() => {
    // If arriving from the landing page, the email should already be pre-filled
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
