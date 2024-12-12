"use client";

import React, { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  updateUserPreferences,
  fetchUserConstraints,
} from "@/actions/functions";

type Props = {
  name: string;
};
const PreferencesForm = (props: Props) => {
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>(
    [],
  );
  const [isModified, setIsModified] = useState(false);
  const router = useRouter();
  const [initialRestrictions, setInitialRestrictions] = useState<string[]>([]);

  const restrictions = ["Vegan", "Vegetarian"];

  // Load initial constraints
  useEffect(() => {
    const loadUserConstraints = async () => {
      try {
        const constraints = await fetchUserConstraints();
        setSelectedRestrictions(constraints);
        setInitialRestrictions(constraints);
      } catch (error) {
        console.error("Error loading user constraints:", error);
      }
    };

    loadUserConstraints();
  }, []);

  const handleSelect = (value: string) => {
    if (!selectedRestrictions.includes(value)) {
      setSelectedRestrictions((prev) => [...prev, value]);
      setIsModified(true); // Mark as modified when adding a restriction
    }
  };

  const removeRestriction = (restrictionToRemove: string) => {
    setSelectedRestrictions(
      selectedRestrictions.filter(
        (restriction) => restriction !== restrictionToRemove,
      ),
    );
    setIsModified(true);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.set("dietaryRestrictions", selectedRestrictions.join("-"));

      const result = await updateUserPreferences(formData);

      if (result.success) {
        console.log("Preferences updated successfully!");
        setIsModified(false);
        router.push("/Settings");
      } else {
        console.error("Error updating preferences:", result.error);
      }
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
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
      <Button
        onClick={handleSubmit}
        variant={isModified ? "default" : "secondary"}
        disabled={!isModified}
        className="mt-12"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default PreferencesForm;
