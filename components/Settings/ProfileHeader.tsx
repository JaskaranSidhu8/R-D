import React from "react";

interface ProfileHeaderProps {
  name: string;
  joinedDate: string;
}

export const ProfileHeader = ({ name, joinedDate }: ProfileHeaderProps) => {
  return (
    <div className="text-center flex justify-center items-center gap-6 p-6 mb-8">
      <img
        src="/pfp.jpg"
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
