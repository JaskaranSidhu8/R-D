"use client";

import React, { useEffect, useState } from "react";
import { getUserAvatarUrl } from "@/actions/avatarfunctions";

interface ProfileHeaderProps {
  name: string;
  joinedDate: string;
}

export const ProfileHeader = ({ name, joinedDate }: ProfileHeaderProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string>("/pfp.jpg");
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const url = await getUserAvatarUrl();
        if (url) {
          setAvatarUrl(url);
        }
      } catch (error) {
        console.error("Error fetching avatar:", error);
        // Keep default avatar if there's an error
      }
    };

    fetchAvatar();
  }, []);

  return (
    <div className="text-center flex justify-center items-center gap-6 p-6 mb-8">
      <img
        src={avatarUrl}
        alt="User Avatar"
        className="w-32 h-32 rounded-full object-cover"
      />
      <div className="text-left">
        <h2 className="montserrat text-2xl">{`Hey ${name}!`}</h2>
        <p className="text-sm text-muted-foreground">{`joined ${joinedDate}`}</p>
      </div>
    </div>
  );
};
