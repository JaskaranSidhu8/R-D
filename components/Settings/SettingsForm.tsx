"use client";

import React from "react";
import { ProfileHeader } from "./ProfileHeader";
import { NavigationLink } from "./NavigationLink";
import { User, Lock, Settings2, HelpCircle, LogOut } from "lucide-react";

interface SettingsFormProps {
  name: string;
  joinedDate: string;
}

const SettingsForm = ({ name, joinedDate }: SettingsFormProps) => {
  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-background min-h-screen">
      <ProfileHeader name={name} joinedDate={joinedDate} />

      <div className="flex flex-col flex-1 px-6">
        <NavigationLink
          href="/AccountDetails"
          icon={User as React.ElementType}
          label="Account details"
        />
        <NavigationLink
          href="/NewPassword"
          icon={Lock as React.ElementType}
          label="Change password"
        />
        <NavigationLink
          href="/preferences"
          icon={Settings2 as React.ElementType}
          label="Preferences"
        />
        <NavigationLink
          href="/help-support"
          icon={HelpCircle as React.ElementType}
          label="Help and support"
        />
        <NavigationLink
          href="/logout"
          icon={LogOut as React.ElementType}
          label="Log out"
        />
      </div>
    </div>
  );
};

export default SettingsForm;
