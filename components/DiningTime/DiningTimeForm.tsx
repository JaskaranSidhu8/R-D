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
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  const isValid = day && time;

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-20 ">
      <SectionTitle text="Dining time" classname="mt-14" />

      <div className="mt-1 flex flex-col gap-4">
        <Select value={day} onValueChange={setDay}>
          <SelectTrigger
            className={`bg-white ${!day && "[&>span]:text-gray-500"}`}
          >
            <SelectValue placeholder="On which day of the week?" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {daysOfWeek.map((weekDay) => (
                <SelectItem key={weekDay} value={weekDay.toLowerCase()}>
                  {weekDay}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger
            className={`bg-white ${!time && "[&>span]:text-gray-500"}`}
          >
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour}>
                  {hour}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {isValid ? (
          <Link href="/StatusMgr/1">
            <Button>Create group</Button>
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
