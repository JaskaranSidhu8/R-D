import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/static/SectionTitle";

const GroupNamePage = () => {
  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col">
      <SectionTitle text="Give your group a name!" classname="mt-8" />

      <div className="flex-1 flex flex-col mt-6">
        <Input 
          type="text"
          placeholder="Group Name"
          className="h-12 rounded-full"
        />

        <Button className="w-full mt-4"> 
          Next
        </Button>
      </div>
    </div>
  );
};

export default GroupNamePage;