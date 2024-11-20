"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/static/SectionTitle";
import { Pencil } from "lucide-react"; // Import the edit icon

const AccountDetailsPage = () => {
  const initialValues = {
    fullName: "Jack Dartic",
    country: "Belgium",
    city: "Leuven"
  };

  const [formData, setFormData] = useState(initialValues);
  const [isModified, setIsModified] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsModified(true);
  };

  const handleSubmit = () => {
    console.log('Saving changes:', formData);
    setIsModified(false);
  };

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col">
      {/* Profile Image with Edit Button */}
      <div className="flex justify-center mt-8 mb-6">
        <div className="relative">
          <img
            src="/pfp.jpg"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <button
            className="absolute bottom-0 right-0 p-2 bg-primary hover:bg-primary/90 rounded-full text-white"
            onClick={() => console.log('Edit profile picture')}
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      </div>

      <SectionTitle text="Account Details" />

      <div className="flex flex-col gap-6 mt-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">
              Full Name
            </label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="h-12 rounded-full"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">
              Country
            </label>
            <Input
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="h-12 rounded-full"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">
              City
            </label>
            <Input
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="h-12 rounded-full"
            />
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full mt-4"
            variant={isModified ? "default" : "secondary"}
            disabled={!isModified}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsPage;