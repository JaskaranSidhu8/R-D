"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/static/SectionTitle";
import Link from "next/link";

const GroupNameForm = () => {
  const [groupName, setGroupName] = useState(""); // Track the group name input

  const handleNextClick = () => {
    if (!groupName.trim()) {
      alert("Please provide a group name before proceeding.");
    }
  };

  const isValid = groupName.trim().length > 0;

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto  mt-20">
      <SectionTitle text="Give your group a name!" classname="mt-14" />

      <div className=" mt-1 flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Group Name"
          className="bg-white"
          onChange={(e) => setGroupName(e.target.value)}
        />
        {isValid ? (
          <Link href={"/DiningTime"}>
            <Button className="mt-4">Next</Button>
          </Link>
        ) : (
          <Button className="mt-4">Next</Button>
        )}
      </div>
    </div>
  );
};

export default GroupNameForm;
