import React from 'react';
import {
  User,
  Lock,
  Settings2,
  HelpCircle,
  LogOut
} from "lucide-react";
import { ProfileHeader } from "@/components/Settings/ProfileHeader";
import { NavigationLink } from "@/components/Settings/NavigationLink";

interface ProfilePageProps {
  name: string;
  joinedDate: string;
}

const ProfilePage = ({ name, joinedDate }: ProfilePageProps) => {
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col">
      {/* Profile Section */}
      <ProfileHeader name={name} joinedDate={joinedDate} />

      {/* Navigation Links */}
      <div className="flex-1 px-4 space-y-2">
        <NavigationLink 
          href="/account-details"
          icon={User}
          label="Account details"
        />
        <NavigationLink 
          href="/change-password"
          icon={Lock}
          label="Change password"
        />
        <NavigationLink 
          href="/preferences"
          icon={Settings2}
          label="Preferences"
        />
        <NavigationLink 
          href="/help-support"
          icon={HelpCircle}
          label="Help and support"
        />
        <NavigationLink 
          href="/logout"
          icon={LogOut}
          label="Log out"
          destructive={true}
        />
      </div>
    </div>
  );
};

export default ProfilePage;