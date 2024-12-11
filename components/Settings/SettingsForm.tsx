"use client";

import React, { useEffect, useState } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { NavigationLink } from "./NavigationLink";
import { fetchAccountDetails } from "@/actions/functions";
import {
  PersonIcon,
  LockClosedIcon,
  GearIcon,
  QuestionMarkIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import LogoutBtn from "../static/LogoutBtn";

const SettingsForm = () => {
  const [name, setName] = useState<string>("User");
  const [joinedDate, setJoinedDate] = useState<string>("");

  useEffect(() => {
    const loadAccountDetails = async () => {
      try {
        const accountDetails = await fetchAccountDetails();
        setName(accountDetails.firstName || "User");
        setJoinedDate(accountDetails.joinedDate || "Unknown Date");
      } catch (error) {
        console.error("Failed to fetch account details:", error);
      }
    };

    loadAccountDetails();
  }, []);

  return (
    <div className="flex flex-col w-full mx-auto bg-background min-h-screen justify-center">
      <ProfileHeader name={name} joinedDate={joinedDate} />

      <div className="flex flex-col flex-1 max-w-md mx-auto w-full ">
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
          href="/help-support"
          icon={QuestionMarkIcon}
          label="Help and support"
        />
        <LogoutBtn />
      </div>
    </div>
  );
};

export default SettingsForm;
