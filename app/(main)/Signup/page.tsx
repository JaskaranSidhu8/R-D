"use client"; // Mark this component as a Client Component

import React from "react";
import SignupForm from "@/components/signup/SignupForm";
import SectionTitle from "@/components/static/SectionTitle";
import AuthLink from "@/components/static/AuthLink";

// Removed session handling logic

const Signup = () => {
  return (
    <div>
      <SectionTitle classname="mt-20 mb-5" text="Sign up, Let's eat!" />
      <SignupForm mode="Signup" />
      <AuthLink
        text="Already have an account?"
        href="/Signin"
        signinup="Signin"
        classname="mt-8"
      />
    </div>
  );
};

export default Signup;
