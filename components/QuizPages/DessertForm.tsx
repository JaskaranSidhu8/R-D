"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GridSelection from "./GridSelection";
import Link from "next/link";
import SectionTitle from "../static/SectionTitle";

const dessertOptions = [
  { name: "Yes please!", image: "/dessert.webp" },
  { name: "No thanks", image: "/goodbye.avif" },
];

const DessertForm = () => {
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
