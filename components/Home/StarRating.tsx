import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
}

const StarRating = ({ value, onChange }: StarRatingProps) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          className={`cursor-pointer ${
            index <= value ? "fill-primary text-primary" : "text-gray-300"
          }`}
          onClick={() => onChange?.(index)}
        />
      ))}
    </div>
  );
};

export default StarRating;
