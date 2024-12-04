// src/components/SignupForm.tsx
'use client';
import React, { useState, useMemo } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AppContext"; // Import useAuth from AuthContext
import { Check, Eye, EyeOff, X } from "lucide-react"; // For password feedback icons
import { checkPasswordStrength } from "../static/PasswordValidator"; // Import the password validation function

type SignupFormProps = {
  mode: "Signin" | "Signup"; // Mode to decide whether to route to Home or Verify
};

const SignupForm: React.FC<SignupFormProps> = ({ mode }) => {
  const router = useRouter();
  const { email, setEmail } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  // Password strength validation
  const strength = checkPasswordStrength(password);
  const strengthScore = useMemo(() => strength.filter((req) => req.met).length, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        response = await fetch("/api/checkCredentials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
      } else {
        response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
      }

      const result = await response.json();

      if (response.ok) {
        if (mode === "Signin") {
          if (result.access_token) {
            localStorage.setItem("supabase.auth.token", result.access_token);
            localStorage.setItem("user_email", email);
            await router.push("/Home");
          }
        } else {
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
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Your Name"
            />
          </div>
        )}

        <div className="input-field">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="Enter your email"
          />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <Input
            type={isVisible ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute inset-y-0 end-0 flex items-center justify-center"
            aria-label={isVisible ? "Hide password" : "Show password"}
          >
            {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {mode === "Signup" && (
          <div className="input-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
            />
          </div>
        )}

        {/* Password Strength Indicator */}
        <div
          className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuenow={strengthScore}
          aria-valuemin={0}
          aria-valuemax={4}
        >
          <div
            className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
            style={{ width: `${(strengthScore / 4) * 100}%` }}
          ></div>
        </div>

        <p className="mb-2 text-sm">{getStrengthText(strengthScore)}</p>

        <ul className="space-y-1.5">
          {strength.map((req, index) => (
            <li key={index} className="flex items-center gap-2">
              {req.met ? (
                <Check size={16} className="text-emerald-500" />
              ) : (
                <X size={16} className="text-muted-foreground/80" />
              )}
              <span
                className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
              >
                {req.text}
              </span>
            </li>
          ))}
        </ul>

        {error && <div className="error-message">{error}</div>}

        <Button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Processing..." : mode === "Signin" ? "Sign In" : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
