// import { Input } from "@/components/ui/input";
// import Logo from "@/components/static/Logo";
import SectionTitle from "@/components/static/SectionTitle";
import SignupForm from "@/components/signup/SignupForm";
import AuthLink from "@/components/static/AuthLink";
import React from "react";
// import { Button } from "@/components/ui/button";

export const metadata = {
  title: "TieBreaker | signup",
  description: "Generated by Next.js",
};

// type Props = {};

const Signup = () => {
  return (
    <div>
      <SectionTitle classname="mt-20  mb-5" text="Sign up, let's eat!" />
      <SignupForm mode="Signup" />
      <AuthLink
        text="Already have an account? "
        href="/Signin"
        signinup="Sign in"
        classname=" mt-8"
      />
    </div>
  );
};

export default Signup;
