"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GridSelection from "./GridSelection";
import Link from "next/link";
import SectionTitle from "../static/SectionTitle";

const entertainmentOptions = [
  { name: "Live Music", image: "/liveMusic.webp" },
  { name: "Good for watching Sports", image: "/liveSports.jpg" },
];

const EntertainmentForm = () => {
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
