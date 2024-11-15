import SignupForm from "@/components/signup/SignupForm";
import AuthLink from "@/components/static/AuthLink";
import SectionTitle from "@/components/static/SectionTitle";
import React from "react";

type Props = {};

const Signin = (props: Props) => {
  return (
    <div>
      <SectionTitle classname="mt-20  mb-5" text="Sign up, let's eat!" />
      <SignupForm />
      <AuthLink
        text="Don't have an account yet ?"
        href="Signup"
        signinup="Signup"
      />
    </div>
  );
};

export default Signin;
