"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GridSelection from "./GridSelection";
import Link from "next/link";
import SectionTitle from "../static/SectionTitle";
import { useQuiz } from "@/context/QuizContext";

const drinkOptions = [
  { name: "Alcoholic Drinks", image: "/alcoholicDrinks.jpg" }, //bits one 1 and 2
  { name: "Non-Alcoholic Beverages", image: "/nonAlcoholicDrinks.webp" }, //no bits affecred
];

const DrinksForm = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { bitStrings, updateBitStrings } = useQuiz();

  console.log("Current context bitStrings:", bitStrings);

  const handleSelection = (index: number) => {
    setSelectedItems((prev) => {
      let newSelection: number[];
      if (prev.includes(index)) {
        newSelection = [];
      } else {
        newSelection = [index];
      }

      // Update the soft_constraints field based on drinks selection
      const softConstraintsArray = bitStrings.soft_constraints.split("");

      // Reset drink-related bits
      [1, 2].forEach((bit) => (softConstraintsArray[bit] = "0"));

      // Switch on the correct bit based on selection
      if (index === 0) {
        softConstraintsArray[1] = "1"; // `restaurant.servesWine`
        softConstraintsArray[2] = "1"; // `restaurant.servesCocktails`
      }
      // Non-Alcoholic Beverages doesn't affect the soft_constraints field.

      console.log("Selected drink option:", drinkOptions[index].name);
      console.log("Updated soft_constraints:", softConstraintsArray.join(""));

      // Update the bitStrings in context
      updateBitStrings("soft_constraints", softConstraintsArray.join(""));

      return newSelection;
    });
  };

  return (
    <div>
      <SectionTitle text="Fancy a drink with your meal?" classname="mt-2" />
      <div className="mt-6">
        <GridSelection
          options={drinkOptions}
          selectedItems={selectedItems}
          onSelect={handleSelection}
        />
      </div>

      {selectedItems.length > 0 ? (
        <Link href="/Dessert">
          <Button className="mt-8 ">Next</Button>
        </Link>
      ) : (
        <Button
          className="mt-8"
          onClick={() => alert("Please select a drink preference!")}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default DrinksForm;
