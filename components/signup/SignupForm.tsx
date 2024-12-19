"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import Password from "../static/Password";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import PasswordValidator from "../static/PasswordValidator";
import {
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
} from "@/actions/auth";
import { useToast } from "@/hooks/use-toast";

type Props = {
  mode: "Signup" | "Signin";
};

const SignupForm = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget); // Extract form data

      if (props.mode === "Signup") {
        const { success, error } = await signUpWithEmailAndPassword(formData);
        if (success) {
          router.push(
            `/Signup/Verify/${encodeURIComponent(
              formData.get("email") as string,
            )}`,
          );
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: error,
          });
        }
      } else {
        const { success, error } = await signInWithEmailAndPassword(formData);
        if (success) {
          router.push(`/Home`);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: error,
          });
        }
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false); // Reset loading state
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
      {props.mode === "Signup" ? (
        <PasswordValidator name="password" />
      ) : (
        <Password name="password" showForgotPassword={true} />
      )}

      <Button disabled={isLoading} type="submit">
        {isLoading
          ? props.mode === "Signup"
            ? "Signing up..."
            : "Signing in..."
          : props.mode === "Signup"
            ? "Sign up"
            : "Sign in"}
      </Button>
    </form>
  );
};

export default SignupForm;
