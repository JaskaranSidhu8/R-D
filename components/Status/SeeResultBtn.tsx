import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkPickedRestaurant } from "@/actions/functions"; // Adjust the path as needed

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

  // Call the function when the component mounts
  useEffect(() => {
    enableButtonIfRestaurantPicked();
  }, [groupId]);

  const handleButtonClick = () => {
    if (isButtonEnabled) {
      router.push(`/Result?groupId=${groupId}`);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleButtonClick}
        disabled={!isButtonEnabled}
        className={`px-4 py-2 rounded-md ${
          isButtonEnabled
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Go to Results
      </button>
      {!isButtonEnabled && (
        <p className="text-sm text-red-500">
          Please select a restaurant first.
        </p>
      )}
    </div>
  );
};

export default SeeResultBtn;
