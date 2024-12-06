import VerificationForm from "@/components/signup/VerificationForm";
import SectionTitle from "@/components/static/SectionTitle";
import React from "react";

type Props = {
  params: {
    email: string;
  };
};

const page = (props: Props) => {
  const { email } = props.params;

  return (
    <div>
      <SectionTitle classname="mt-20  mb-5" text="Verify your email " />
      <p>
        we've sent a one time verification code to your email:{" "}
        <span className=" text-primary">{decodeURIComponent(email)}</span>{" "}
        Please check your email
      </p>
      <VerificationForm email={decodeURIComponent(email)} />
    </div>
  );
};

export default page;
