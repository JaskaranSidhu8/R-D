import React from "react";
import { Input } from "../ui/input";
import Password from "../static/Password";
import { Button } from "../ui/button";
import { text } from "stream/consumers";

type Props = {
  text: string;
};

const SignupForm = (props: Props) => {
  return (
    <form className=" space-y-5">
      <Input
        type="email"
        placeholder="Enter your email address"
        className=" py-5"
      />
      <Password />

      <Button className={`w-full py-6 rounded-full shadow-lg `}>
        {props.text}
      </Button>
    </form>
  );
};

export default SignupForm;
