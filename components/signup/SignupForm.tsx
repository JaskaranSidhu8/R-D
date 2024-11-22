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

const SignupForm = (props: Props) => {
  const onSubmit = () => {
    if (props.mode === "Signup") {
      redirect("/Signup/Verify");
    } else {
      redirect("/Home");
    }
  };
  return (
    <form action={onSubmit} className=" space-y-5">
      <Input
        required
        type="email"
        placeholder="Enter your email address"
        name="email"
      />
      {props.mode === "Signup" ? <PasswordValidator /> : <Password />}

      <Button type="submit">
        {props.mode === "Signup" ? "Sign up" : "Sign in"}
      </Button>
    </form>
  );
};

export default SignupForm;
