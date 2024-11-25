import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// type Props = {};

const GroupJoinForm = () => {
  return (
    <form className=" grid grid-cols-3 gap-5">
      <Input className=" rounded-full col-span-2" placeholder="Group Code" />
      <Button
        variant={"outline"}
        className=" border-primary text-primary font-bold"
      >
        Join Group
      </Button>
    </form>
  );
};

export default GroupJoinForm;
