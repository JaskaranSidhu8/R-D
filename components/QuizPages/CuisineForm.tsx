"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SectionTitle from "../static/SectionTitle";
import VerticalCarousel from "./VerticalCarousel";
import Link from "next/link";
import { useQuiz } from "@/context/QuizContext";

// Define the interface for the props
// interface CuisineFormProps {
//   bitStrings: {
//     cuisine_preferences: string;
//     soft_constraints: string;
//     budget: string;
//   };
//   setBitStrings: React.Dispatch<
//     React.SetStateAction<{
//       cuisine_preferences: string;
//       soft_constraints: string;
//       budget: string;
//     }>
//   >;
// }

interface CarouselOption {
  id: number;
  name: string;
  image: string;
}

//pictures can be changed later on
const cuisineOptions: CarouselOption[] = [
  { id: 1, name: "Asian", image: "/asian.jpg" },
  { id: 2, name: "American", image: "/american.webp" },
  { id: 3, name: "Italian", image: "/italian.jpg" },
  { id: 4, name: "Mexican_Latin", image: "/mexican.jpg" },
  { id: 5, name: "Indian", image: "/indian.jpg" },
  { id: 6, name: "Mediterranean", image: "/mediterranean.jpg" },
  { id: 7, name: "European", image: "/european.webp" },
  { id: 8, name: "Seafood", image: "/seafood.jpg" },
  { id: 9, name: "Vegan", image: "/vegan.jpg" },
  { id: 10, name: "Dessert", image: "/dessert.jpg" },
  { id: 11, name: "Bar", image: "/bar.jpg" },
  { id: 13, name: "African", image: "/african.jpg" },
];

//the bit representations that will be sent to the database, when more than one is selected an AND operation will be used on them
const CUISINE_BIT_MAPPINGS: Record<number, string> = {
  1: "100000000000000", // Asian
  2: "010000000000000", // American
  3: "001000000000000", // Italian
  4: "000100000000000", // Mexican_Latin
  5: "000010000000000", // Indian
  6: "000001000000000", // Mediterranean
  7: "000000100000000", // European
  8: "000000010000000", // Seafood
  9: "000000001000000", // Vegan
  10: "000000000100000", // Dessert
  11: "000000000010000", // Bar
  12: "000000000001000", // Other
  13: "000000000000100", // African
};

// const CuisineForm: React.FC<CuisineFormProps> = ({
//   bitStrings,
//   setBitStrings,
// }) => {
const CuisineForm = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { bitStrings, updateBitStrings } = useQuiz();

  // Function to combine bit strings using OR operation
  const combineBitStrings = (bitStrings: string[]): string => {
    if (bitStrings.length === 0) return "0000000000000";

    return bitStrings.reduce((result: string, bitString: string): string => {
      return result
        .split("")
        .map((bit: string, index: number): string => {
          return parseInt(bit) || parseInt(bitString[index]) ? "1" : "0";
        })
        .join("");
    });
  };

  const handleSelection = (itemId: number) => {
    setSelectedItems((prev: number[]) => {
      let newSelection: number[];

      //front end logic - handles UI selection
      //if it is already selected then it becomes deselected
      if (prev.includes(itemId)) {
        newSelection = prev.filter((id) => id !== itemId);
      }
      //cannot select more than three items at once
      else if (prev.length < 3) {
        newSelection = [...prev, itemId];
      } else {
        return prev;
      }

      //backend logic - handles bit string creation and storage
      const selectedBitStrings = newSelection.map(
        (id) => CUISINE_BIT_MAPPINGS[id],
      );
      const combinedBitString = combineBitStrings(selectedBitStrings);

      console.log("Selected cuisine IDs:", newSelection);
      console.log("Combined bit string:", combinedBitString);

      // Update bitStrings through context instead of props
      updateBitStrings("cuisine_preferences", combinedBitString); // Changed to double quotes

      return newSelection;
    });
  };

  return (
    <div>
      <SectionTitle
        text="What type of cuisine are you craving?"
        classname="mt-2"
      />
      <div className="h-[50vh] mt-6">
        <VerticalCarousel
          options={cuisineOptions}
          selectedItems={selectedItems}
          onSelect={handleSelection}
        />
      </div>
      {selectedItems.length > 0 ? (
        //no longer using props
        <Link href="/IndoorOutdoor">
          <Button className="mt-6">Next</Button>
        </Link>
      ) : (
        <Button
          className="mt-6"
          onClick={() => alert("Please select at least one cuisine!")}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default CuisineForm;
