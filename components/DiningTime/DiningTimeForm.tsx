"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/static/SectionTitle";
import { useRouter } from "next/navigation";

const DiningTimeForm = () => {
  const router = useRouter(); // Using router for navigation so page doesn't reload
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Check if date and time are filled in
    if (!date || !time) {
      alert("Please fill in both the date and time fields.");
      return; // If fields are empty, stop here
    }

    // Redirect to StatusMgr page if validation passes
    router.push("StatusMgr");
  };

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto px-6">
      <SectionTitle text="Dining time" classname="mt-8" />

      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
        <Input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          type="time"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <Button type="submit">
          Create group
        </Button>
      </form>
    </div>
  );
};

export default DiningTimeForm;
