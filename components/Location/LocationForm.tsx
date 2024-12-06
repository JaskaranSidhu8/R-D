"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/static/SectionTitle";
import Link from "next/link";

const LocationForm = () => {
  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-20">
      <SectionTitle text="Dining Location" classname="mt-8" />

      <div className="mt-4 flex flex-col gap-4">
        <Input type="text" placeholder="Location" className="bg-white" />
        <Link href={"/DiningTime"}>
          <Button className="w-full mt-4">Next</Button>
        </Link>
      </div>
    </div>
  );
};

export default LocationForm;
