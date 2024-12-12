"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  getUserAvatarUrl,
  fetchAllAvatars,
  updateUserAvatar,
} from "@/actions/avatarfunctions"; // Import the necessary backend functions
import { useUser } from "@/context/UserContext";

const AvatarForm = () => {
  const { avatarUrl, refreshUserData } = useUser();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null); // Store the selected avatar URL
  const [isModified, setIsModified] = useState(false); // Track if the avatar selection is modified
  //const [userAvatar, setUserAvatar] = useState<string | null>(null); // Store the current user's avatar URL
  const [avatars, setAvatars] = useState<string[]>([]); // Store the list of avatar URLs

  // // Fetch user avatar and list of avatars when the component mounts
  // useEffect(() => {
  //   const fetchInitialData = async () => {
  //     try {
  //       const avatarUrl = await getUserAvatarUrl(); // Fetch the current user's avatar URL
  //       if (avatarUrl) {
  //         setUserAvatar(avatarUrl); // Set the user's current avatar URL
  //       }

  //       const avatarUrls = await fetchAllAvatars(); // Fetch all avatar URLs from the database
  //       setAvatars(avatarUrls); // Populate the avatars state with fetched URLs
  //     } catch (error) {
  //       console.error("Error fetching initial data:", error);
  //     }
  //   };

  //   fetchInitialData();
  // }, []);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const avatarUrls = await fetchAllAvatars();
        setAvatars(avatarUrls);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };

    fetchAvatars();
  }, []);

  // Handle avatar selection
  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar); // Update the selected avatar
    setIsModified(true); // Enable "Save Changes" button
  };

  // Handle form submission to save the selected avatar
  const handleSubmit = async () => {
    if (!selectedAvatar) return; // Ensure an avatar is selected before proceeding

    try {
      const success = await updateUserAvatar(selectedAvatar); // Call the backend function to update the avatar
      if (success) {
        console.log("Avatar updated successfully");
        await refreshUserData(); // Changed this line
      } else {
        console.error("Failed to update avatar");
      }
      setIsModified(false); // Reset the modified state
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto py-4">
      {/* Profile Image Section */}
      <div className="flex justify-center mb-2">
        <div className="relative bg-primary rounded-full">
          <img
            src={selectedAvatar || avatarUrl} // Dynamically update the profile picture based on selection or fetched data
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border border-gray-200"
          />
        </div>
      </div>

      {/* Section Title */}
      <div className="flex flex-col mt-12 mb-8">
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
            onClick={() => handleAvatarSelect(avatar)} // Handle avatar selection
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
            onClick={handleSubmit} // Trigger save logic
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
          disabled={!isModified} // Disable button when not modified
          className="mt-8"
        >
          Save Changes
        </Button>
      )}
    </div>
  );
};

export default AvatarForm;
