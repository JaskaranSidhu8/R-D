"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GridSelection from "./GridSelection";
import Link from "next/link";
import SectionTitle from "../static/SectionTitle";

const atmosphereOptions = [
  { name: "Casual", image: "/casualAtmosphere.jpg" },
  { name: "Livel and energetic", image: "/energeticAtmosphere.jpg" },
  { name: "Fine Dining", image: "/fineDiningAtmopshere.jpg" },
  { name: "Quiet and relaxing", image: "/quietAtmosphere.jpg" },
];

const AtmosphereForm = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleSelection = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems([]);
    } else {
      setSelectedItems([index]);
    }
  };

  return (
    <div>
      <SectionTitle text="Whats your vibe for this meal?" />

      <GridSelection
        options={atmosphereOptions}
        selectedItems={selectedItems}
        onSelect={handleSelection}
      />
      {selectedItems.length > 0 ? (
        <Link href="/Budget">
          <Button className="absolute bottom-4 mx-4 w-[343px] h-[48px]">
            Next
          </Button>
        </Link>
      ) : (
        <Button
          className="absolute bottom-4 mx-4 w-[343px] h-[48px]"
          onClick={() => alert("Please select an atmosphere!")}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default AtmosphereForm;
