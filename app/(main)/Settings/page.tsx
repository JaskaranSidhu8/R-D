import React from 'react';
import {
  User,
  Lock,
  Settings2,
  HelpCircle,
  LogOut
} from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col">
      {/* Profile Section - Horizontally aligned */}
      <div className="text-center flex justify-center items-center gap-6 p-6 mb-8">
        <img
          src="/pfp.jpg"
          alt="User Avatar"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="text-left">
          <h2 className="montserrat text-2xl font-semibold">Hey Jack!</h2>
          <p className="text-sm text-muted-foreground">joined November 2024</p>
        </div>
      </div>

      {/* Navigation Links - Full width on mobile */}
      <div className="flex-1 px-4 space-y-2">
        <a 
          href="/account-details"
          className="flex items-center gap-3 p-4 hover:bg-accent rounded-lg transition-colors"
        >
          <User className="w-5 h-5 text-muted-foreground" />
          <span>Account details</span>
        </a>

        <a 
          href="/change-password"
          className="flex items-center gap-3 p-4 hover:bg-accent rounded-lg transition-colors"
        >
          <Lock className="w-5 h-5 text-muted-foreground" />
          <span>Change password</span>
        </a>

        <a 
          href="/preferences"
          className="flex items-center gap-3 p-4 hover:bg-accent rounded-lg transition-colors"
        >
          <Settings2 className="w-5 h-5 text-muted-foreground" />
          <span>Preferences</span>
        </a>

        <a 
          href="/help-support"
          className="flex items-center gap-3 p-4 hover:bg-accent rounded-lg transition-colors"
        >
          <HelpCircle className="w-5 h-5 text-muted-foreground" />
          <span>Help and support</span>
        </a>

        <a 
          href="/logout"
          className="flex items-center gap-3 p-4 hover:bg-accent rounded-lg transition-colors text-destructive mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </a>
      </div>
    </div>
  );
};

export default ProfilePage;