"use client";

import React from "react";
import AccountForm from "@/components/AccountDetails/AccountForm";

const AccountDetailsPage = () => {
  const handleSubmit = (data: {
    fullName: string;
    country: string;
    city: string;
  }) => {
    console.log("Saving changes:", data);
  };

  const handleEditProfilePicture = () => {
    console.log("Edit profile picture");
  };

  return (
    <AccountForm
      onSubmit={handleSubmit}
      onEditProfilePicture={handleEditProfilePicture}
    />
  );
};

export default AccountDetailsPage;
