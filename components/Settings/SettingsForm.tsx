"use client";

import React, { useEffect, useState } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { fetchAccountDetails } from "@/actions/functions";
import {
  PersonIcon,
  LockClosedIcon,
  GearIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";
import LogoutBtn from "../static/LogoutBtn";

// Import Intercom utilities
import { initIntercom } from "../../utils/intercom";

// Simulate the NavigationLink component
interface NavigationLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  href,
  icon: Icon,
  label,
  onClick,
}) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault(); // Prevent navigation
        if (onClick) onClick(); // Call the onClick handler if provided
      }}
      className="flex items-center py-2 px-4 hover:bg-gray-100 rounded"
    >
      <Icon className="mr-2" />
      <span>{label}</span>
    </a>
  );
};

const SettingsForm = () => {
  const [name, setName] = useState<string>("User");
  const [joinedDate, setJoinedDate] = useState<string>("");

  useEffect(() => {
    const loadAccountDetails = async () => {
      try {
        console.log("Fetching account details...");
        const accountDetails = await fetchAccountDetails();
        setName(accountDetails.firstName || "User");
        setJoinedDate(accountDetails.joinedDate || "Unknown Date");
        console.log("Account details loaded:", accountDetails);
      } catch (error) {
        console.error("Failed to fetch account details:", error);
      }
    };

    loadAccountDetails();
  }, []);

  const handleHelpSupportClick = () => {
    console.log("Help and Support clicked!");
    initIntercom();

    // Check if the Intercom API is available
    if (window.Intercom) {
      console.log("Triggering Intercom popup...");
      window.Intercom("show");
    } else {
      console.error("Intercom is not initialized or unavailable.");
    }
  };

  return (
    <div className="flex flex-col w-full mx-auto bg-background min-h-screen justify-center">
      <ProfileHeader name={name} joinedDate={joinedDate} />

      <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
        <NavigationLink
          href="/AccountDetails"
          icon={PersonIcon}
          label="Account details"
        />
        <NavigationLink
          href="/NewPassword"
          icon={LockClosedIcon}
          label="Change password"
        />
        <NavigationLink
          href="/Preferences"
          icon={GearIcon}
          label="Preferences"
        />
        <NavigationLink
          href="#"
          icon={QuestionMarkIcon}
          label="Help and support"
          onClick={() => {
            handleHelpSupportClick();
          }}
        />
        <LogoutBtn />
      </div>
    </div>
  );
};

export default SettingsForm;
