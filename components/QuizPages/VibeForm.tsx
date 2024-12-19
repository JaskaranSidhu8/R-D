"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GridSelection from "./GridSelection";
import Link from "next/link";
import SectionTitle from "../static/SectionTitle";
import { useQuiz } from "@/context/QuizContext";

const vibeOptions = [
  { name: "Feeling casual", image: "/casualAtmosphere.jpg" }, // bit 0
  { name: "Feeling lively and energetic", image: "/energeticAtmosphere.jpg" }, // bit 7
  { name: "Feeling fancy", image: "/feelinFancy.jpg" }, // bit 3
  { name: "Feeling social", image: "/socialVibe.jpg" }, //bit 1
  { name: "Surprise me!", image: "/qdice.jpg" },
];

const VibeForm = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { bitStrings, updateBitStrings } = useQuiz();

  console.log("Current context bitStrings:", bitStrings);
  console.log("Current cuisine_preferences:", bitStrings.cuisine_preferences);
  console.log("Current soft_constraints:", bitStrings.soft_constraints);

  const handleSelection = (index: number) => {
    setSelectedItems((prev) => {
      let newSelection: number[];
      if (prev.includes(index)) {
        newSelection = [];
      } else {
        newSelection = [index];
      }

      // Update the soft_constraints field based on vibe selection
      const softConstraintsArray = bitStrings.soft_constraints.split("");

      // Reset all vibe-related bits first
      [0, 1, 3, 7].forEach((bit) => (softConstraintsArray[bit] = "0"));

      // Switch on the correct bit based on selection
      switch (index) {
        case 0: // Feeling casual
          softConstraintsArray[0] = "1"; // `restaurant.servesBeer`
          break;
        case 1: // Lively and energetic
          softConstraintsArray[7] = "1"; // `restaurant.isGoodForGroups`
          break;
        case 2: // Quiet and relaxing
          softConstraintsArray[3] = "1"; // `restaurant.servesCoffee`
          break;
        case 3: // Feeling fancy
          softConstraintsArray[1] = "1"; // `restaurant.servesWine`
          break;
        default:
          break;
      }

      console.log("Selected vibe:", vibeOptions[index].name);
      console.log("Updated soft_constraints:", softConstraintsArray.join(""));

      // Update the bitStrings in context
      updateBitStrings("soft_constraints", softConstraintsArray.join(""));

      return newSelection;
    });
  };

  return (
    <div>
      <SectionTitle text="Whats your vibe for this meal?" classname="mt-2" />
      <div className="mt-6">
        <GridSelection
          options={vibeOptions}
          selectedItems={selectedItems}
          onSelect={handleSelection}
        />
      </div>

      {selectedItems.length > 0 ? (
        <Link href="/Entertainment">
          <Button className="mt-8 ">Next</Button>
        </Link>
      ) : (
        <Button
          className="mt-8 "
          onClick={() => alert("Please select a vibe!")}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default VibeForm;
