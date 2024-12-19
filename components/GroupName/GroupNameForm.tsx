"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/static/SectionTitle";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const GroupNameForm = () => {
  const router = useRouter();
  const { setGroupId, setGroupCode } = useGroup();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [restaurantCount, setRestaurantCount] = useState(0);
  const [formData, setFormData] = useState<FormData | null>(null);

  const hours = Array.from({ length: 16 }, (_, i) => {
    const hour = (i + 8).toString().padStart(2, "0");
    return `${hour}:00`;
  });

  const onSubmit = async (formData: FormData) => {
    const date = formData.get("date") as string | null;
    const time = formData.get("time") as string | null;

    if (!date || !time) {
      alert("Please select a valid date and time.");
      return;
    }

    const getDayOfWeek = (dateString: string): number => {
      const dateObj = new Date(dateString);
      const day = dateObj.getDay();
      return day === 0 ? 6 : day - 1;
    };

    const day = getDayOfWeek(date);
    const hour = parseInt(time.split(":")[0], 10);
    const minute = 0;

    try {
      const restaurants = await filterRestaurantsByTime(day, hour, minute);
      console.log("Filtered restaurants:", restaurants);

      if (!restaurants || restaurants.length === 0) {
        alert(
          "No restaurants are open at the selected time. Please choose a different time.",
        );
        return;
      }

      if (restaurants.length < 10) {
        setRestaurantCount(restaurants.length); // Save restaurant count
        setFormData(formData); // Save formData for later use
        setIsDialogOpen(true); // Open confirmation dialog
        return;
      }

      // Proceed with group creation
      await handleGroupCreation(formData);
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleGroupCreation = async (formData: FormData) => {
    try {
      const data = await createGroup(formData);

      if (data && data[0]) {
        const groupId = data[0].id;
        const groupCode = data[0].group_code || "";
        setGroupCode(groupCode);
        router.push(`/StatusMgr/1?groupId=${groupId}`);
      }
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false); // Close dialog
    setFormData(null); // Reset saved form data
  };

  const handleProceed = async () => {
    if (formData) {
      await handleGroupCreation(formData); // Proceed with saved form data
    }
    setIsDialogOpen(false); // Close dialog
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        onSubmit(formData);
      }}
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
        <Input
          type="date"
          name="date"
          min={new Date().toISOString().split("T")[0]}
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
        <Button type="submit" className="mt-5 w-full">
          Create group
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="w-[380px] rounded-xl bg-white border-primary">
          <div className="flex flex-col items-center justify-center space-y-8">
            <AlertDialogDescription className="text-left text-lg text-black">
              There are only {restaurantCount} restaurants open at this time.
              Are you sure you want to proceed?
            </AlertDialogDescription>
            <AlertDialogFooter className="flex flex-row justify-center items-center space-x-4 w-full">
              <AlertDialogCancel asChild>
                <Button
                  className="border-2 border-primary text-primary w-32 h-12 text-base"
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  className="bg-primary text-white w-32 h-12 text-base"
                  onClick={handleProceed}
                >
                  Proceed
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};

export default GroupNameForm;
