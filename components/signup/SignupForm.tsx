"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import Password from "../static/Password";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import PasswordValidator from "../static/PasswordValidator";

type Props = {
  mode: "Signup" | "Signin";
  email: string;
};

const SignupForm = (props: Props) => {
  const [email, setEmail] = useState(props.email); // Set email state to props.email initially

  const onSubmit = () => {
    if (props.mode === "Signup") {
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
        value={email}  // Bind the email value to the input field
        onChange={(e) => setEmail(e.target.value)} // Handle change for email
      />
      {props.mode === "Signup" ? <PasswordValidator /> : <Password />}

      <Button type="submit">
        {props.mode === "Signup" ? "Sign up" : "Sign in"}
      </Button>
    </form>
  );
};

export default SignupForm;
