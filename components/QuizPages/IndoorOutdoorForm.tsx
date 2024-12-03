"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GridSelection from "./GridSelection";
import Link from "next/link";
import SectionTitle from "../static/SectionTitle";

const indoorOutdoorOptions = [
  { name: "Rooftop Terrace", image: "/rooftopTerrace.jpg" },
  { name: "Lounge/Bar", image: "/lounge.jpg" },
  { name: "Street Café", image: "/streetCafe.jpg" },
  { name: "Themed Restuarant", image: "/themedRestaurant.jpg" },
];

const IndoorOutdoorForm = () => {
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
      <SectionTitle text="Pick your ideal dining setting" />
      <div className="mt-6">
        <GridSelection
          options={indoorOutdoorOptions}
          selectedItems={selectedItems}
          onSelect={handleSelection}
        />
      </div>

      {selectedItems.length > 0 ? (
        <Link href="/Vibe">
          <Button className="mt-8 mx-4 w-[343px] h-[48px]">Next</Button>
        </Link>
      ) : (
        <Button
          className="mt-8 mx-4 w-[343px] h-[48px]"
          onClick={() => alert("Please select a dining setting!")}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default IndoorOutdoorForm;
