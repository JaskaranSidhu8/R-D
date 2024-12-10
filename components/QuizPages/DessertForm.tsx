"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GridSelection from "./GridSelection";
import Link from "next/link";
import SectionTitle from "../static/SectionTitle";
import { useQuiz } from "@/context/QuizContext";

const dessertOptions = [
  { name: "Yes please!", image: "/dessert.webp" },
  { name: "No thanks", image: "/goodbye.avif" },
];

const DessertForm = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { bitStrings, updateBitStrings } = useQuiz();

  const handleSelection = (index: number) => {
    setSelectedItems((prev) => {
      let newSelection: number[];
      if (prev.includes(index)) {
        newSelection = [];
      } else {
        newSelection = [index];
      }

      // Update the soft_constraints field based on dessert selection
      const softConstraintsArray = bitStrings.soft_constraints.split("");

      // Reset dessert-related bit
      softConstraintsArray[4] = "0";

      // Switch on the correct bit based on selection
      if (index === 0) {
        softConstraintsArray[4] = "1"; // `restaurant.servesDessert`
      }
      // "No thanks" (index 1) doesn't affect the soft_constraints field.

      console.log("Selected dessert option:", dessertOptions[index].name);
      console.log("Updated soft_constraints:", softConstraintsArray.join(""));

      // Update the bitStrings in context
      updateBitStrings("soft_constraints", softConstraintsArray.join(""));

      return newSelection;
    });
  };

  return (
    <div>
      <SectionTitle text="Got a sweet tooth craving?" classname="mt-2" />
      <div className="mt-6">
        <GridSelection
          options={dessertOptions}
          selectedItems={selectedItems}
          onSelect={handleSelection}
        />
      </div>

      {selectedItems.length > 0 ? (
        <Link href="/Budget">
          <Button className="mt-8 ">Next</Button>
        </Link>
      ) : (
        <Button
          className="mt-8 "
          onClick={() => alert("Please select if you want dessert!")}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default DessertForm;
