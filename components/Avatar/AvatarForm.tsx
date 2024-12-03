"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const avatars = [
  "/avatarpinkwoman.png",
  "/avatargreywoman.png",
  "/avatarpinkman.png",
  "/avatarasianman.png",
  "/avatarwhiteman.png",
  "/avatarindianwoman.png",
];

const AvatarForm = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [isModified, setIsModified] = useState(false);

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    setIsModified(true); // Enable Save Changes button when an avatar is selected
  };

  const handleSubmit = () => {
    console.log("Saving selected avatar:", selectedAvatar); // Simulate saving
    setIsModified(false); // Reset modified state
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto py-4">
      {/* Profile Image Section */}
      <div className="flex justify-center mb-2">
        <div className="relative bg-primary rounded-full">
          <img
            src={selectedAvatar || "/pfp.jpg"} // Dynamically update PFP
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border border-gray-200"
          />
        </div>
      </div>

      {/* Section Title */}
      <div className="flex flex-col  mt-12 mb-8">
        <h2 className="montserrat text-2xl">Choose your avatar</h2>
      </div>

      {/* Avatar Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`relative w-[100px] h-[100px] rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 ${
              selectedAvatar === avatar
                ? "ring-4 ring-red-800 bg-primary scale-90"
                : "bg-primary hover:scale-105"
            }`}
            onClick={() => handleAvatarSelect(avatar)}
          >
            <img
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Save Changes Button */}
      {isModified ? (
        <Link href="/AccountDetails">
          <Button
            onClick={handleSubmit} // Logic for saving
            variant="default"
            className="mt-8"
          >
            Save Changes
          </Button>
        </Link>
      ) : (
        <Button
          onClick={(e) => e.preventDefault()} // Prevent any action if not modified
          variant="secondary"
          disabled={!isModified} // Disabled when not modified
          className="mt-8"
        >
          Save Changes
        </Button>
      )}
    </div>
  );
};

export default AvatarForm;
