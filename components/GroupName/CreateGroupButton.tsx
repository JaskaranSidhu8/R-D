"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createGroup } from "@/actions/functions";
import { Button } from "../ui/button";
import { useGroup } from "@/context/GroupContext";
import { filterRestaurantsByTime } from "@/utils/filterRestaurantsBasedOnTime";

const CreateGroupButton = () => {
  const router = useRouter();
  const { setGroupId, setGroupCode } = useGroup();

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [filteredRestaurantCount, setFilteredRestaurantCount] = useState(0);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleFilterRestaurants = async (formData: FormData) => {
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
      setFilteredRestaurantCount(restaurants.length);

      if (restaurants.length < 10) {
        setFormData(formData); // Save formData for later use
        setIsConfirmDialogOpen(true); // Open confirmation dialog
      } else {
        // Proceed with group creation directly if 10 or more restaurants
        await handleGroupCreation(formData);
      }
    } catch (error) {
      console.error("Error filtering restaurants:", error);
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
        setGroupId(groupId);
        router.push(`/StatusMgr/1?groupId=${groupId}`);
      }
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsConfirmDialogOpen(false); // Close the dialog
    setFormData(null); // Reset formData
  };

  const handleProceed = async () => {
    if (formData) {
      await handleGroupCreation(formData); // Proceed with saved formData
    }
    setIsConfirmDialogOpen(false); // Close the dialog
  };

  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault();
          const form = e.currentTarget.closest("form");
          if (form) {
            const formData = new FormData(form);
            handleFilterRestaurants(formData);
          }
        }}
        className="mt-5 w-full"
      >
        Create group
      </Button>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent className="w-[380px] rounded-xl bg-white border-primary">
          <div className="flex flex-col items-center justify-center space-y-8">
            <AlertDialogDescription className="text-left text-lg text-black">
              There are only {filteredRestaurantCount} restaurants open at this
              time. Are you sure you want to proceed?
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
    </>
  );
};

export default CreateGroupButton;
