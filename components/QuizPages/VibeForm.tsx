"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GridSelection from "./GridSelection";
import Link from "next/link";
import SectionTitle from "../static/SectionTitle";

const atmosphereOptions = [
  { name: "feeling casual", image: "/casualAtmosphere.jpg" },
  { name: "feeling lively and energetic", image: "/energeticAtmosphere.jpg" },
  { name: "feeling fancy", image: "/fancyDiningMood.jpg" },
  { name: "feeling social", image: "/socialVibe.jpg" },
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
      <div className="mt-6">
        <GridSelection
          options={atmosphereOptions}
          selectedItems={selectedItems}
          onSelect={handleSelection}
        />
      </div>

      {selectedItems.length > 0 ? (
        <Link href="/Entertainment">
          <Button className="mt-8 mx-4 w-[343px] h-[48px]">Next</Button>
        </Link>
      ) : (
        <Button
          className="mt-8 mx-4 w-[343px] h-[48px]"
          onClick={() => alert("Please select an atmosphere!")}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default AtmosphereForm;
