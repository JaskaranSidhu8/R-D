"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/static/SectionTitle";
import Link from "next/link";

const GroupNameForm = () => {
  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto  mt-20">
      <SectionTitle text="Give your group a name!" classname="mt-8" />

      <div className="mt-4 flex flex-col gap-4">
        <Input type="text" placeholder="Group Name" className="bg-white" />
        <Link href={"/Location"}>
          <Button className="mt-4">Next</Button>
        </Link>
      </div>
    </div>
  );
};

export default GroupNameForm;
