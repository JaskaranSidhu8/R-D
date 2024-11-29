"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SectionTitle from "../static/SectionTitle";
import VerticalCarousel from "./VerticalCarousel";

const CuisineForm = () => {
  const router = useRouter();
  const [selectedCuisines, setSelectedCuisines] = useState<number[]>([]);

  const handleSelection = (cuisineId: number) => {
    setSelectedCuisines((prev: number[]) => {
      //if already selected, it gets deselected
      if (prev.includes(cuisineId)) {
        return prev.filter((id) => id !== cuisineId);
      }
      // cannot be more than three options selected
      if (prev.length < 3) {
        return [...prev, cuisineId];
      }
      return prev;
    });
  };

  const handleNext = () => {
    if (selectedCuisines.length < 1) {
      alert(`Please select at least one cuisine! `);
      return;
    }
    router.push("/QuizQuestionBudget");
  };

  return (
    <div className="flex flex-col max-w-md">
      <SectionTitle text="What type of cuisine are you craving?" />
      <div className="h-[550px] mt-6">
        <VerticalCarousel
          selectedCuisines={selectedCuisines}
          onSelect={handleSelection}
        />
      </div>
      <Button className="mt-3" onClick={handleNext}>
        Next
      </Button>
    </div>
  );
};

export default CuisineForm;
