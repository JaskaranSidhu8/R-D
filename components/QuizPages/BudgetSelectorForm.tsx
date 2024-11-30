"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "../ui/slider";
import SectionTitle from "../static/SectionTitle";
import Link from "next/link";

const BudgetSelectorForm = () => {
  const [range, setRange] = useState([20, 40]);

  const handleRangeChange = (values: number[]) => {
    setRange(values);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-6 pt-4">
      <SectionTitle text="What's your budget?" classname="mb-8" />

      <div className="mb-12">
        <Slider
          defaultValue={[20, 40]}
          min={0}
          max={100}
          step={1}
          value={range}
          onValueChange={handleRangeChange}
          className="my-8"
        />

        <div className="flex justify-between mt-4">
          <div>
            <p className="text-sm text-gray-600">From:</p>
            <p className="text-lg font-medium">€ {range[0]}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">To:</p>
            <p className="text-lg font-medium">€ {range[1]}</p>
          </div>
        </div>
      </div>
      <Link href="/StatusMgr">
        <Button>Next</Button>
      </Link>
    </div>
  );
};

export default BudgetSelectorForm;
