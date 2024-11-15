import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {};

const Signup2Form = (props: Props) => {
  return (
    <form className=" space-y-5">
      <Input type="text" placeholder=" Full Name " />{" "}
      <Input type="text" placeholder=" Country " />{" "}
      <Input type="text" placeholder=" City " />
      <Button className=" w-full"> Create your account</Button>
    </form>
  );
};

export default Signup2Form;
