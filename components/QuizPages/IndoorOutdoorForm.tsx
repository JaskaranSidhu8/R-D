"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GridSelection from "./GridSelection";
import Link from "next/link";
import SectionTitle from "../static/SectionTitle";
import { useQuiz } from "@/context/QuizContext";

// interface IndoorOutdoorFormProps {
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

const indoorOutdoorOptions = [
  { name: "Rooftop Terrace", image: "/rooftopTerrace.jpg" }, // the index matters dont change for these options
  { name: "Lounge/Bar", image: "/lounge.jpg" },
  { name: "Street Café", image: "/streetCafe.jpg" },
  { name: "Themed Restuarant", image: "/themedRestaurant.jpg" },
  { name: "Indoor", image: "/Indoor.jpeg" },
  { name: "Outdoor", image: "/Outdoor.jpg" },
  { name: "Surprise me!", image: "/qdice.jpg" },
];

// const IndoorOutdoorForm: React.FC<IndoorOutdoorFormProps> = ({
//   bitStrings,
//   setBitStrings,
// }) => {

const IndoorOutdoorForm = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { bitStrings, updateBitStrings } = useQuiz();

  // React.useEffect(() => {
  //   console.log("Received bit strings in IndoorOutdoor:", bitStrings);
  //   console.log("Cuisine preferences:", bitStrings.cuisine_preferences);
  // }, [bitStrings]);
  console.log("Current context bitStrings:", bitStrings);
  console.log("Current cuisine_preferences:", bitStrings.cuisine_preferences);
  console.log("Current soft_constraints:", bitStrings.soft_constraints);
  console.log("Current budget:", bitStrings.budget);

  const handleSelection = (index: number) => {
    setSelectedItems((prev) => {
      let newSelection: number[];
      if (prev.includes(index)) {
        newSelection = [];
      } else {
        newSelection = [index];
      }

      // Update soft_constraints
      const isOutdoorOption = index === 0 || index === 2 || index === 5; // Rooftop or Street Café
      const softConstraintsArray = "000000000".split("");
      softConstraintsArray[5] = isOutdoorOption ? "1" : "0"; // 6th position (index 5) is hasOutdoorSeating

      console.log("Selected setting:", indoorOutdoorOptions[index].name);
      console.log("Is outdoor:", isOutdoorOption);
      console.log("Updated soft_constraints:", softConstraintsArray.join(""));

      // Update the bit string through context
      updateBitStrings("soft_constraints", softConstraintsArray.join(""));

      return newSelection;
    });
  };

  return (
    <div>
      <SectionTitle
        text="Mmm tasty! Where would you like to eat?"
        classname="mt-2"
      />
      <div className="mt-6">
        <GridSelection
          options={indoorOutdoorOptions}
          selectedItems={selectedItems}
          onSelect={handleSelection}
        />
      </div>

      {selectedItems.length > 0 ? (
        <Link href="/Vibe">
          <Button className="mt-8">Next</Button>
        </Link>
      ) : (
        <Button
          className="mt-8 "
          onClick={() => alert("Please select a dining setting!")}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default IndoorOutdoorForm;
