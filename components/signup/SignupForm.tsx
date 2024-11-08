import React from "react";
import { Input } from "../ui/input";
import Password from "../static/Password";
import { Button } from "../ui/button";

type Props = {};

const SignupForm = (props: Props) => {
  return (
    <form className=" space-y-5">
      <Input type="email" placeholder="Enter your email address" />
      <Password />

      <Button className=" w-full"> Sign up</Button>
    </form>
  );
};

export default SignupForm;
