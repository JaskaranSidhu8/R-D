"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/static/SectionTitle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import * as amplitude from "@amplitude/analytics-node";
import { Input } from "../ui/input";

const handleGroupCreationButtonClick = () => {
  // Track the event
  amplitude.track("Group Create Button Clicked", undefined, {
    user_id: "user@amplitude.com",
  });
};

const DiningTimeForm = () => {
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Generate hours in 24-hour format
  const isValid = day && time;

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto ">
      <SectionTitle text="Dining time" classname="" />

      <div className="mt-1 flex flex-col gap-4">
        {isValid ? (
          <Link href="/StatusMgr/1">
            <Button
              onClick={() => {
                handleGroupCreationButtonClick();
              }}
            >
              Create group
            </Button>
          </Link>
        ) : (
          <Button
            onClick={() => alert("Please fill in both fields")}
            className="mt-5"
          >
            Create group
          </Button>
        )}
      </div>
    </div>
  );
};

export default DiningTimeForm;
