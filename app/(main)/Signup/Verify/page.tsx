import VerificationForm from "@/components/signup/VerificationForm";
import SectionTitle from "@/components/static/SectionTitle";
import React from "react";

// type Props = {};

const page = () => {
  return (
    <div>
      <SectionTitle classname="mt-20  mb-5" text="Verify your email " />
      <VerificationForm />
    </div>
  );
};

export default page;
