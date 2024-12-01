"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/static/SectionTitle";
import Link from "next/link";

const DiningTimeForm = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const isValid = date && time;

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-20 ">
      <SectionTitle text="Dining time" classname="mt-8" />

      <div className="mt-4 flex flex-col gap-4">
        <Input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-white"
        />
        <Input
          type="time"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="bg-white mt-1"
        />
        {isValid ? (
          <Link href="/StatusMgr">
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
