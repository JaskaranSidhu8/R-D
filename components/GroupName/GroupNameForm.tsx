"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/static/SectionTitle";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createGroup } from "@/actions/functions";

const GroupNameForm = () => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  const onSubmit = async (e: FormData) => {
    const data = await createGroup(e);
    console.log(data);
  };
  return (
    <form
      action={(e) => onSubmit(e)}
      className="flex flex-col gap-4 max-w-md mx-auto  mt-20"
    >
      <SectionTitle text="Give your group a name!" classname="mt-14" />

      <div className=" mt-1 flex flex-col gap-4">
        <Input
          type="text"
          name="group_name"
          placeholder="Group Name"
          className="bg-white"
        />
        <Input type="date" name="date" />
        <Select name="time">
          <SelectTrigger>
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
        <Button className="mt-5">Create group</Button>
      </div>
    </form>
  );
};

export default GroupNameForm;
