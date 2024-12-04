"use client"; // Mark this component as a Client Component (Unchanged)

import SignupForm from "@/components/signup/SignupForm"; // SignupForm import is retained (Unchanged)
import AuthLink from "@/components/static/AuthLink"; // AuthLink import is retained (Unchanged)
import SectionTitle from "@/components/static/SectionTitle"; // SectionTitle import is retained (Unchanged)
import React from "react"; // React import is retained (Unchanged)

// type Props = {}; // This line is unnecessary and removed, as it's not used in the current code (Removed)

const Signin = () => {
  return (
    <div>
      <SectionTitle classname="mt-20 mb-5" text="Welcome back!" /> 
      {/* SectionTitle displays a title for the page */}
      <SignupForm mode="Signin" /> 
      {/* SignupForm is passed "Signin" mode to render the signin form */}
      
      <AuthLink 
        text="Don't have an account yet?" 
        href="/Signup" 
        signinup="Signup" 
        classname="mt-8" 
      />
      {/* AuthLink is used to navigate the user to the Signup page, with a message */}
    </div>
  );
};

export default Signin;
