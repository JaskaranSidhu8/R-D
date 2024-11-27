import { useRouter } from "next/router";
import SectionTitle from "@/components/static/SectionTitle";
import SignupForm from "@/components/signup/SignupForm";
import AuthLink from "@/components/static/AuthLink";
import React from "react";
const Signup = () => {
  const router = useRouter();
  const { email } = router.query;
  // Ensure email is a string before passing it to SignupForm
  const emailString = typeof email === "string" ? email : ""; // Fallback to empty string if it's not a string
  return (
    <div>
      <SectionTitle classname="mt-20 mb-5" text="Sign up, let's eat!" />
      <SignupForm mode="Signup" email={emailString} />
      <AuthLink
        text="Already have an account?"
        href="/Signin"
        signinup="Sign in"
        classname="mt-8"
      />
    </div>
  );
};

export default Signup;
