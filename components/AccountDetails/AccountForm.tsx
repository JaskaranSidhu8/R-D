"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import FormField from "./FormField";
import Link from "next/link";

interface FormData {
  fullName: string;
  country: string;
  city: string;
}

interface AccountFormProps {
  defaultValues?: FormData;
}

const DEFAULT_VALUES: FormData = {
  fullName: "Jack Dartic",
  country: "Belgium",
  city: "Leuven",
};

const AccountForm = ({ defaultValues = DEFAULT_VALUES }: AccountFormProps) => {
  const [formData, setFormData] = useState<FormData>(defaultValues);
  const [isModified, setIsModified] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsModified(true); // Mark the form as modified when any input changes
  };

  const handleSubmit = () => {
    console.log("Saving changes:", formData); // Simulated submission logic
    setIsModified(false); // Reset modified state after submission
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto py-4">
      {/* Profile Image Section */}
      <div className="flex justify-center mb-2">
        <div className="relative">
          <img
            src="/pfp.jpg"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border border-gray-200"
          />
          <Link href="/Avatar">
            <button className="absolute bottom-0 right-0 p-1.5 bg-primary hover:bg-primary/90 rounded-full text-white">
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-start mb-8">
        <h2 className="montserrat mt-10 text-2xl">Account Details</h2>
      </div>

      <FormField
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
      />
      <FormField
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleInputChange}
      />
      <FormField
        label="City"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
      />
      <Button
        onClick={handleSubmit} // Logic moved here
        variant={isModified ? "default" : "secondary"}
        disabled={!isModified} // Disable unless the form is modified
        className="mt-8"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default AccountForm;
