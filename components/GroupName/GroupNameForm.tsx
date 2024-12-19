"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/static/SectionTitle";
import * as amplitude from "@amplitude/analytics-node";
import { createGroup } from "@/actions/functions";
import { useRouter } from "next/navigation";
import { useGroup } from "@/context/GroupContext";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const GroupNameForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setGroupId, setGroupCode } = useGroup();

  const handleGroupCreationButtonClick = async () => {
    amplitude.track("Group Create Button Clicked", undefined, {
      device_id: "device",
    });
  };

  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget); // Extract form data
      const data = await createGroup(formData);

      if (data && data[0]) {
        const groupId = data[0].id;
        const groupCode = data[0].group_code || "";
        setGroupId(groupId);
        setGroupCode(groupCode);
        router.push(`/StatusMgr/1?groupId=${groupId}`);
      }
    } catch (error) {
      console.error("Error creating group:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto mt-20"
    >
      <SectionTitle text="let's plan your group event!" classname="mt-14" />

      <div className="mt-1 flex flex-col gap-4">
        <Input
          type="text"
          name="group_name"
          placeholder="Group Name"
          className="bg-white"
          required
        />

        <Input type="date" name="date" required />
        <Select name="time" required>
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

        <Button disabled={isLoading} type="submit" className="mt-5 w-full">
          {isLoading ? "Creating group..." : "Create group"}
        </Button>
      </div>
    </form>
  );
};

export default GroupNameForm;
