// components/Preferences/PreferencesForm.tsx
"use client"

import React, { useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import PreferenceTag from "./PreferenceTag"

const PreferencesForm = () => {
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([])

  const restrictions = [
    "Vegan",
    "Vegetarian", 
    "Halal",
    "Gluten",
    "Peanuts",
    "Lactose",
    "Lupin"
  ]

  const handleSelect = (value: string) => {
    if (!selectedRestrictions.includes(value)) {
      setSelectedRestrictions([...selectedRestrictions, value])
    }
  }

  const removeRestriction = (restrictionToRemove: string) => {
    setSelectedRestrictions(selectedRestrictions.filter(
      restriction => restriction !== restrictionToRemove
    ))
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-6">
      <h2 className="montserrat text-2xl mb-8">Preferences</h2>
      
      <div className="mt-4">
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

      <Button className="mt-20 w-full ">Save Changes</Button>

    </div>
  )
}

export default PreferencesForm