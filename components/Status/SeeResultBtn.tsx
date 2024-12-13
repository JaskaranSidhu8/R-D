"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkPickedRestaurant } from "@/actions/functions"; // Adjust the path as needed
import { Button } from "../ui/button";

// Define the Props type for the component
type Props = {
  groupId: number; // Explicitly type groupId as a number
};

const SeeResultBtn: React.FC<Props> = ({ groupId }) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const router = useRouter();

  // Function to check if the button should be enabled
  const enableButtonIfRestaurantPicked = async () => {
    const isPicked = await checkPickedRestaurant(groupId);
    setIsButtonEnabled(isPicked);
  };

  useEffect(() => {
    // Call the function immediately when the component mounts
    enableButtonIfRestaurantPicked();

    // Set up an interval to check every 10 seconds
    const intervalId = setInterval(() => {
      enableButtonIfRestaurantPicked();
    }, 10000); // 10 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [groupId]);

  const handleButtonClick = () => {
    if (isButtonEnabled) {
      router.push(`/Result?groupId=${groupId}`);
    }
  };

  return (
    <div className="text-center mt-4 ">
      <Button
        onClick={handleButtonClick}
        disabled={!isButtonEnabled}
        variant={isButtonEnabled ? "default" : "disabled"} // Dynamically set the variant
      >
        Go to Results
      </Button>
      {!isButtonEnabled && (
        <p className=" text-center text-sm text-black">
          Waiting the manager to generate ...
        </p>
      )}
    </div>
  );
};

export default SeeResultBtn;
