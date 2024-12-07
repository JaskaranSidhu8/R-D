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
    <div>
      <SectionTitle
        text="What type of cuisine are you craving?"
        classname="mt-2 "
      />
      <div className="h-[50vh] mt-6">
        <VerticalCarousel
          options={cuisineOptions}
          selectedItems={selectedItems}
          onSelect={handleSelection}
        />
      </div>
      {selectedItems.length > 0 ? (
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
