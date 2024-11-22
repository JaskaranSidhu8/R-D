"use client";
import React from "react";
import { Input } from "../ui/input";
import Password from "../static/Password";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import PasswordValidator from "../static/PasswordValidator";

type Props = {
  mode: "Signup" | "Signin";
};

const SignupForm: React.FC<Props> = ({ mode }) => {
  const onSubmit = () => {
    if (mode === "Signup") {
      redirect("/Signup/Verify");
    } else {
      redirect("/Home");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Input
        required
        type="email"
        placeholder="Enter your email address"
        name="email"
      />
      {mode === "Signup" ? (
        <PasswordValidator />
      ) : (
        <>
          <Password />
          <div className="text-right mt-2">
            <a
              href="/forgot-password"
              className="text-sm  text-primary hover:underline"
            >
              Forgot your password?
            </a>
          </div>
        </>
      )}

      <Button type="submit">{mode === "Signup" ? "Sign up" : "Sign in"}</Button>
    </form>
  );
};

export default SignupForm;
