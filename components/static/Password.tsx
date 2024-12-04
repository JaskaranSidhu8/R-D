"use client";

import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import React from "react";

export default function Password() {
  // State to manage visibility of the password
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Toggle function to switch between visible and hidden password
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="space-y-2">
      {/* Password input field */}
      <div className="relative">
        <Input
          id="input-23" // Unique ID for the password input
          className="pe-9" // Padding for the input to make space for the eye icon
          placeholder="Password" // Placeholder text
          type={isVisible ? "text" : "password"} // Conditionally show password text if visible
        />
        {/* Button to toggle password visibility */}
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility} // Toggle visibility when clicked
          aria-label={isVisible ? "Hide password" : "Show password"} // Accessibility label
          aria-pressed={isVisible} // Indicates whether the button is pressed
          aria-controls="password" // ID of the password field for accessibility
        >
          {isVisible ? (
            <EyeOff size={16} strokeWidth={2} aria-hidden="true" /> // Eye off icon for hidden password
          ) : (
            <Eye size={16} strokeWidth={2} aria-hidden="true" /> // Eye icon for visible password
          )}
        </button>
      </div>
    </div>
  );
}
