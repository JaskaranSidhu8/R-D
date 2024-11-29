"use client";

import React from "react";
import { Button } from "@/components/ui/button";
//import Router from "next/router";
import SectionTitle from "../static/SectionTitle";
//import ScrollableGrid from "./ScrollableGrid";
import VerticalCarousel from "./VerticalCarousel";

const CuisineForm = () => {
  return (
    <div className="flex flex-col max-w-md">
      <SectionTitle text="What type of cuisine are you craving?" />
      <div className="h-[550px] mt-6">
        <VerticalCarousel />
      </div>
      <Button className="mt-3">Next</Button>
    </div>
  );
};

export default CuisineForm;
