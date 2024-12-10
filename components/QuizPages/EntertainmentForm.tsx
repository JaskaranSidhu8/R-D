"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GridSelection from "./GridSelection";
import Link from "next/link";
import SectionTitle from "../static/SectionTitle";
import { useQuiz } from "@/context/QuizContext";

const entertainmentOptions = [
  { name: "Live Music", image: "/liveMusic.webp" }, //bit 6
  { name: "Good for watching Sports", image: "/liveSports.jpg" }, // bit 8
];

const EntertainmentForm = () => {
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

      // Update the soft_constraints field based on entertainment selection
      const softConstraintsArray = bitStrings.soft_constraints.split("");

      // Reset entertainment-related bits
      [6, 8].forEach((bit) => (softConstraintsArray[bit] = "0"));

      // Switch on the correct bit based on selection
      switch (index) {
        case 0: // Live Music
          softConstraintsArray[6] = "1"; // `restaurant.hasLiveMusic`
          break;
        case 1: // Good for watching Sports
          softConstraintsArray[8] = "1"; // `restaurant.isGoodForWatchingSports`
          break;
        default:
          break;
      }

      console.log("Selected entertainment:", entertainmentOptions[index].name);
      console.log("Updated soft_constraints:", softConstraintsArray.join(""));

      // Update the bitStrings in context
      updateBitStrings("soft_constraints", softConstraintsArray.join(""));

      return newSelection;
    });
  };

  return (
    <div>
      <SectionTitle text="Looking for some entertainment?" classname="mt-2" />
      <div className="mt-6">
        <GridSelection
          options={entertainmentOptions}
          selectedItems={selectedItems}
          onSelect={handleSelection}
        />
      </div>

      {selectedItems.length > 0 ? (
        <Link href="/Drinks">
          <Button className="mt-8 ">Next</Button>
        </Link>
      ) : (
        <Button
          className="mt-8 "
          onClick={() => alert("Please select an entertainment option!")}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default EntertainmentForm;
