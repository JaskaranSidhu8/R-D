import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import PreferencesForm from "../Preferences/PreferenceForm";

// type Props = {};

const Signup2Form = () => {
  return (
    <form className=" space-y-5">
      <Input type="text" placeholder=" Full Name " />{" "}
      <Input type="text" placeholder=" Country " />{" "}
      <Input type="text" placeholder=" City " />
      <PreferencesForm />
      <Button className=" w-full"> Create your account</Button>
    </form>
  );
};

export default Signup2Form;
