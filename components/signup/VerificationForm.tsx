"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { verifyEmailUsingOTP } from "@/actions/auth";

type Props = {
  email: string;
};

const VerificationForm = (props: Props) => {
  const { email } = props;

  const onSubmit = (e: FormData) => {
    e.append("email", email);
    verifyEmailUsingOTP(e);
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
