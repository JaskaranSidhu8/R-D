"use client"; // Mark this component as a Client Component

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AppContext"; // Import useAuth from AuthContext

type SignupFormProps = {
  mode: "Signin" | "Signup"; // Mode to decide whether to route to Home or Verify
};

const SignupForm: React.FC<SignupFormProps> = ({ mode }) => {
  const router = useRouter();
  const { email, setEmail } = useAuth(); // Use useAuth to get email and setEmail from context
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added for confirmation
  const [name, setName] = useState(""); // Added for name input
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(""); // Clear error on input change
  };

  // Handle confirm password input change
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setError(""); // Clear error on input change
  };

  // Handle name input change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError(""); // Clear error on input change
  };

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); // Update email in context
    setError(""); // Clear error on input change
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation for signup mode
    if (mode === "Signup") {
      if (!name) {
        setError("Name is required.");
        return;
      }
      if (!password || !confirmPassword) {
        setError("Password and Confirm Password are required.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setLoading(true);

    try {
      let response;

      if (mode === "Signin") {
        // Existing signin logic
        response = await fetch("/api/checkCredentials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
      } else {
        // Modified signup logic
        response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }), // Include name in the request
        });
      }

      const result = await response.json();

      if (response.ok) {
        if (mode === "Signin") {
          router.push("/Home");
        } else {
          // Display success message instead of navigation
          alert("Check your email for a verification link!");
        }
      } else {
        setError(result.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Error during submission:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {mode === "Signup" && (
          <>
            {/* Name Input Field */}
            <div className="input-field">
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="input"
                placeholder="Your Full Name"
              />
            </div>
          </>
        )}

        <div className="input-field">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            value={email || ""} // Autofill email from context
            onChange={handleEmailChange} // Allow user to edit the email
            className="input"
            placeholder="Enter your email"
          />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="input"
          />
        </div>

        {mode === "Signup" && (
          <>
            {/* Confirm Password Input Field */}
            <div className="input-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="input"
              />
            </div>
          </>
        )}

        {error && <div className="error-message">{error}</div>}

        <Button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Processing..." : mode === "Signin" ? "Sign In" : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
