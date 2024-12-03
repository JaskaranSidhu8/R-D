"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GridSelection from "./GridSelection";
import Link from "next/link";
import SectionTitle from "../static/SectionTitle";

const drinkOptions = [
  { name: "Alcoholic Drinks", image: "/alcoholicDrinks.jpg" },
  { name: "Non-Alcoholic Beverages", image: "/nonAlcoholicDrinks.webp" },
];

const DrinksForm = () => {
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
      <SectionTitle text="Fancy a drink with your meal?" />
      <div className="mt-6">
        <GridSelection
          options={drinkOptions}
          selectedItems={selectedItems}
          onSelect={handleSelection}
        />
      </div>

      {selectedItems.length > 0 ? (
        <Link href="/Dessert">
          <Button className="mt-8 mx-4 w-[343px] h-[48px]">Next</Button>
        </Link>
      ) : (
        <Button
          className="mt-8 mx-4 w-[343px] h-[48px]"
          onClick={() => alert("Please select a drink preference!")}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default DrinksForm;
