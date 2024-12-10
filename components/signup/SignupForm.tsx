"use client";
import React from "react";
import { Input } from "../ui/input";
import Password from "../static/Password";
import { Button } from "../ui/button";
import { redirect, useRouter } from "next/navigation";
import PasswordValidator from "../static/PasswordValidator";
import {
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
} from "@/actions/auth";
import createSupabaseServerClient from "@/lib/supabase/server";
import { useToast } from "@/hooks/use-toast";

type Props = {
  mode: "Signup" | "Signin";
};

const SignupForm = (props: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = async (e: FormData) => {
    if (props.mode === "Signup") {
      const { success, error } = await signUpWithEmailAndPassword(e);
      if (success) {
        router.push(
          `/Signup/Verify/${encodeURIComponent(e.get("email") as string)}`,
        );
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error,
        });
      }
    } else {
      const { success, error } = await signInWithEmailAndPassword(e);
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
  };
  return (
    <form
      action={(e) => {
        onSubmit(e);
      }}
      className=" space-y-5"
    >
      <Input
        required
        type="email"
        placeholder="Enter your email address"
        name="email"
      />
      {props.mode === "Signup" ? (
        <PasswordValidator name="password" />
      ) : (
        <Password name="password" />
      )}

      <Button type="submit">
        {props.mode === "Signup" ? "Sign up" : "Sign in"}
      </Button>
    </form>
  );
};

export default SignupForm;
