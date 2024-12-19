"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/static/SectionTitle";
import * as amplitude from "@amplitude/analytics-node";
import createSupabaseServerClient from "@/lib/supabase/reader";
import { fetchMyUserId } from "@/actions/functions";

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
import { useRouter } from "next/navigation";
import { useGroup } from "@/context/GroupContext";
import { filterRestaurantsByTime } from "@/utils/filterRestaurantsBasedOnTime";

const GroupNameForm = () => {
  const router = useRouter();
  const { setGroupId, setGroupCode, setGroupName } = useGroup();

  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   // Get the form element, we need this to check validation
  //   const form = e.currentTarget.closest("form");

  //   // If form exists and isn't valid, prevent going to next page and show validation messages
  //   if (form && !form.checkValidity()) {
  //     e.preventDefault();
  //     form.reportValidity();
  //   }
  // };
  // amplitude.init("b770130e4c71a5a4fa0667e2dd19e316", {
  //   serverZone: amplitude.Types.ServerZone.EU,
  // });

  const handleGroupCreationButtonClick = async () => {
    // Track the event
    // const userID_amplitude = await fetchMyUserId();
    // amplitude.track("Group Create Button Clicked", undefined, {
    //   user_id: String(userID_amplitude),
    // });
    amplitude.track("Group Create Button Clicked", undefined, {
      device_id: "device",
    });
  };

  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  // const getDayOfWeek = (dateString) => {
  //   const date = new Date(dateString);
  //   // Adjust JavaScript's 0 (Sunday) to your 7 (Sunday)
  //   return date.getDay() === 0 ? 7 : date.getDay();
  // };

  // the original working one
  // const onSubmit = async (e: FormData) => {
  //   const data = await createGroup(e);
  //   console.log(data);
  //   if (data && data[0]) {
  //     // Check if we have data and the group
  //     const groupId = data[0].id; // Get the group ID from the created group
  //     router.push(`/StatusMgr/1?groupId=${groupId}`); // Add groupId as a URL parameter
  //     const groupCode = data[0].group_code || "";
  //     setGroupCode(groupCode);
  //     console.log(groupId);
  //   }
  // };

  const onSubmit = async (formData: FormData) => {
    const date = formData.get("date") as string | null;
    const time = formData.get("time") as string | null;

    if (!date || !time) {
      alert("Please select a valid date and time.");
      return;
    }

    const getDayOfWeek = (dateString: string): number => {
      const dateObj = new Date(dateString);
      return dateObj.getDay() === 0 ? 7 : dateObj.getDay();
    };

    const day = getDayOfWeek(date);
    const hour = parseInt(time.split(":")[0], 10);
    const minute = 0; // Minutes are always 0

    try {
      const restaurants = await filterRestaurantsByTime(day, hour, minute);
      console.log("Inputs to filterRestaurantsByTime:", { day, hour, minute });
      console.log("Filtered restaurants:", restaurants);

      if (!restaurants || restaurants.length === 0) {
        alert(
          "No restaurants are open at the selected time. Please choose a different time.",
        );
        return;
      }
      if (restaurants.length < 10) {
        alert(
          "Fewer than 10 restaurants are open at this time. Please choose another time for the algorithm to work best.",
        );
        return;
      }

      // If restaurants are valid, proceed with group creation
      const data = await createGroup(formData);

      if (data && data[0]) {
        const groupId = data[0].id; // Get group ID
        const groupCode = data[0].group_code || ""; // Get group code
        setGroupCode(groupCode); // Update group code in context
        router.push(`/StatusMgr/1?groupId=${groupId}`); // Redirect
        console.log("Group created with ID:", groupId);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      action={(e) => onSubmit(e)}
      className="flex flex-col gap-4 max-w-md mx-auto  mt-20"
    >
      <SectionTitle text="let's plan your group event!" classname="mt-14" />

      <div className=" mt-1 flex flex-col gap-4">
        <Input
          type="text"
          name="group_name"
          placeholder="Group Name"
          className="bg-white"
          required
        />
        <Input
          type="date"
          name="date"
          min={new Date().toISOString().split("T")[0]} // Minimum date is today, if we want to test feedback remove this
          required
        />
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
        {/* <Link href="/StatusMgr/1" className="mt-5 w-full">
          <Button className="w-full" onClick={handleClick}>
            Create group
          </Button>
        </Link> */}
        <Button
          onClick={handleGroupCreationButtonClick}
          type="submit"
          className="mt-5 w-full"
        >
          Create group
        </Button>
      </div>
    </form>
  );
};

export default GroupNameForm;
