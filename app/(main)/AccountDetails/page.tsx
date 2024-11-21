"use client";

import React, { useState } from "react";
import  SectionTitle from "@/components/static/SectionTitle"; 
import { ProfileImage } from "@/components/AccountDetails/ProfileImage";
import { AccountForm } from "@/components/AccountDetails/AccountForm";


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

  const handleEditProfilePicture = () => {
    console.log('Edit profile picture');
  };

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col">
      <ProfileImage
        imageUrl="/pfp.jpg"
        onEditClick={handleEditProfilePicture}
      />
      <SectionTitle text="Account Details" />
      <AccountForm
        formData={formData}
        isModified={isModified}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AccountDetailsPage;