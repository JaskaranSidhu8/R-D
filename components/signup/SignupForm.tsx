"use client";
import React from "react";
import { Input } from "../ui/input";
import Password from "../static/Password";
import { Button } from "../ui/button";
import { redirect, useRouter } from "next/navigation";
import PasswordValidator from "../static/PasswordValidator";
import { signUpWithEmailAndPassword } from "@/actions/auth";

type Props = {
  mode: "Signup" | "Signin";
};

const SignupForm = (props: Props) => {
  const router = useRouter();
  const onSubmit = async (e: FormData) => {
    if (props.mode === "Signup") {
      const { success } = await signUpWithEmailAndPassword(e);
      if (success) {
        router.push(
          `/Signup/Verify/${encodeURIComponent(e.get("email") as string)}`,
        );
      }
    } else {
      //redirect("/Home");
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
