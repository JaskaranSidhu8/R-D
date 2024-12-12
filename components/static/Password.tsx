"use client";

import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import React from "react";

type Props = {
  name: string;
  showForgotPassword: boolean;
};

export default function Password(props: Props) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          name={props.name}
          id="input-23"
          className="pe-9"
          placeholder="Password"
          type={isVisible ? "text" : "password"}
        />

        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? (
            <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Eye size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>
      <div
        className={`text-right ${!props.showForgotPassword ? "hidden" : ""}`}
      >
        <Link
          href="/NewPassword"
          className="text-sm font-medium text-primary hover:underline"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
