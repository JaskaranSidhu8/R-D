"use client";

import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { verifyEmailUsingOTP } from "@/actions/auth";
import { useRouter } from "next/navigation";

type Props = {
  email: string;
};

const VerificationForm = (props: Props) => {
  const { email } = props;
  const router = useRouter();

  const onSubmit = async (e: FormData) => {
    e.append("email", email);
    const { success } = await verifyEmailUsingOTP(e);
    if (success) router.push("/Setup");
  };
  return (
    <form
      action={(e) => onSubmit(e)}
      className=" flex flex-col gap-10 mt-10 items-center justify-center"
    >
      <InputOTP name="code" maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />

        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button> Verify </Button>
    </form>
  );
};

export default VerificationForm;
