import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/static/SectionTitle";

const DiningTimePage = () => {
  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col">
      <SectionTitle text="Dining time" classname="mt-8" />

      <div className="flex-1 flex flex-col gap-6 mt-6">
        <div className="space-y-4">
          <Input 
            type="date" 
            placeholder="mm/dd/yyyy"
            className="h-12 rounded-full"
          />
          
          <Input 
            type="time" 
            placeholder="--:-- --"
            className="h-12 rounded-full"
          />
        </div>

        <Button className="w-full">
          Create group
        </Button>
      </div>
    </div>
  );
};

export default DiningTimePage;