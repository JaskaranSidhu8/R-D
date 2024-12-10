"use client";

import React from "react";
import { ProfileHeader } from "./ProfileHeader";
import { NavigationLink } from "./NavigationLink";
import {
  PersonIcon,
  LockClosedIcon,
  GearIcon,
  QuestionMarkIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import LogoutBtn from "../static/LogoutBtn";

interface SettingsFormProps {
  name: string;
  joinedDate: string;
}

const SettingsForm = ({ name, joinedDate }: SettingsFormProps) => {
  return (
    <div className="flex flex-col w-full  mx-auto bg-background min-h-screen justify-center">
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
