"use client";

import React from "react";
import GroupNameForm from "@/components/GroupName/GroupNameForm";
import ReturnButton from "@/components/static/ReturnButton";
//import DiningTimeForm from "@/components/DiningTime/DiningTimeForm";

const GroupName = () => {
  return (
    <div>
      <ReturnButton />
      <GroupNameForm />
    </div>
  );
};

export default GroupName;
