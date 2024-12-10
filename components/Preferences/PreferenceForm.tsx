"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PreferenceTag from "./PreferenceTag";
import SectionTitle from "../static/SectionTitle";

type Props = {
  name: string;
};
const PreferencesForm = (props: Props) => {
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>(
    [],
  );

  const restrictions = ["Vegan", "Vegetarian"];

  const handleSelect = (value: string) => {
    if (!selectedRestrictions.includes(value)) {
      setSelectedRestrictions([...selectedRestrictions, value]);
    }
  };

  const removeRestriction = (restrictionToRemove: string) => {
    setSelectedRestrictions(
      selectedRestrictions.filter(
        (restriction) => restriction !== restrictionToRemove,
      ),
    );
  };

  return (
    <div className="flex flex-col w-full  max-w-md mx-auto">
      <SectionTitle classname="mb-5" text="Preferences" />
      <input
        value={selectedRestrictions.join("-")}
        name={props.name}
        className="hidden"
      />
      <div className="">
        <p className="text-sm mb-2">Dietary Restrictions</p>
        <Select onValueChange={handleSelect}>
          <SelectTrigger className="w-full h-12 rounded-full">
            <SelectValue placeholder="Add Preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {restrictions.map((restriction) => (
                <SelectItem
                  key={restriction}
                  value={restriction}
                  disabled={selectedRestrictions.includes(restriction)}
                >
                  {restriction}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-2 mt-4">
          {selectedRestrictions.map((restriction) => (
            <PreferenceTag
              key={restriction}
              text={restriction}
              onRemove={() => removeRestriction(restriction)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreferencesForm;
