"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SectionTitle from "../static/SectionTitle";
import VerticalCarousel from "./VerticalCarousel";
import Link from "next/link";

interface CarouselOption {
  id: number;
  name: string;
  image: string;
}

//we need to get these from the database later on
const cuisineOptions: CarouselOption[] = [
  { id: 1, name: "Mexican", image: "/mexican.jpg" },
  { id: 2, name: "Latin", image: "/latin.jpg" },
  { id: 3, name: "Burger", image: "/burger.jpg" },
  { id: 4, name: "Pizza", image: "/pizza.jpg" },
  { id: 5, name: "Hot Dog", image: "/hotdog.jpg" },
  { id: 6, name: "Pasta", image: "/pasta.jpg" },
];

const CuisineForm = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleSelection = (itemId: number) => {
    setSelectedItems((prev: number[]) => {
      //if it is already selected then it becomes deselected
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      }
      //cannot select more than three items at once
      if (prev.length < 3) {
        return [...prev, itemId];
      }
      return prev;
    });
  };

  return (
    <div className="flex flex-col max-w-md">
      <SectionTitle text="What type of cuisine are you craving?" />
      <div className="h-[550px] mt-6">
        <VerticalCarousel
          options={cuisineOptions}
          selectedItems={selectedItems}
          onSelect={handleSelection}
        />
      </div>
      {selectedItems.length > 0 ? (
        <Link href="/Budget">
          <Button className="mt-3 w-full">Next</Button>
        </Link>
      ) : (
        <Button
          className="mt-3 w-full"
          onClick={() => alert("Please select at least one cuisine!")}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default CuisineForm;
