"use client"; // Mark this component as a Client Component

import React from "react";
import SignupForm from "@/components/signup/SignupForm";
import SectionTitle from "@/components/static/SectionTitle";
import AuthLink from "@/components/static/AuthLink";

// Removed session handling logic

const Signin = () => {
  return (
    <div>
      <SectionTitle classname="mt-20 mb-5" text="Welcome back!" />
      <SignupForm mode="Signin" />
      <AuthLink
        text="Don't have an account yet?"
        href="/Signup"
        signinup="Signup"
        classname="mt-8"
      />
    </div>
  );
};

export default Signin;
