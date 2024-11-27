import SignupForm from "@/components/signup/SignupForm"; 
import AuthLink from "@/components/static/AuthLink";
import SectionTitle from "@/components/static/SectionTitle";
import React from "react";
import { useRouter } from "next/router";  // Import Next.js router
const Signin = () => {
  const router = useRouter();
  const { email } = router.query;  // Extract email from query parameters
  // Ensure email is a string before passing it to SignupForm
  const emailString = typeof email === "string" ? email : ""; // Fallback to empty string if it's not a string
  return (
    <div>
      <SectionTitle classname="mt-20 mb-5" text="Welcome back !" />
      <SignupForm mode="Signin" email={emailString} />  {/* Pass email as prop to SignupForm */}
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
