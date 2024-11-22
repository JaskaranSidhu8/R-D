"use client";

import { Pencil } from "lucide-react"; // for the editting icon

interface ProfileImageProps {
    imageUrl: string;
    onEditClick: () => void;
  }
  
  const ProfileImage = ({ imageUrl, onEditClick }: ProfileImageProps) => {
    return (
      <div className="flex justify-center mt-8 mb-6">
        <div className="relative">
          <img
            src={imageUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <button
            className="absolute bottom-0 right-0 p-2 bg-primary hover:bg-primary/90 rounded-full text-white"
            onClick={onEditClick}
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  export default ProfileImage;