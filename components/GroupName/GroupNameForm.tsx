"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/static/SectionTitle";
import Link from "next/link";
import DiningTimeForm from "../DiningTime/DiningTimeForm";

const GroupNameForm = () => {
  return (
    <div className="flex flex-col  max-w-md mt-20">
      <SectionTitle classname=" mb-5" text="Give your group a name !" />

      <Input type="text" placeholder="Group Name" className="bg-white" />
      <DiningTimeForm />
    </div>
  );
};

export default GroupNameForm;
