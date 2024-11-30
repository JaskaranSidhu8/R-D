"use client";

import React from "react";

interface GridOption {
  name: string;
  image: string;
}

interface GridSelectionProps {
  options: GridOption[];
  selectedItems: number[];
  onSelect: (index: number) => void;
}

const GridSelection = ({
  options,
  selectedItems,
  onSelect,
}: GridSelectionProps) => {
  const getGridLayout = () => {
    switch (options.length) {
      case 1:
        return "grid-cols-1 max-w-md";
      case 2:
        return "grid-cols-2 max-w-2xl";
      case 3:
        return "grid-cols-2 max-w-4xl [&>*:last-child]:col-span-2 [&>*:last-child]:mx-auto [&>*:last-child]:w-1/2";
      case 4:
        return "grid-cols-2 max-w-4xl";
      default:
        return "grid-cols-2 max-w-4xl";
    }
  };

  return (
    <div className={`grid ${getGridLayout()} gap-6 px-4`}>
      {options.map((option, index) => (
        <button
          key={index}
          className={`w-full overflow-hidden relative rounded-2xl transition-all duration-200 ease-in-out
            ${
              selectedItems.includes(index)
                ? "ring-2 ring-red-500 scale-[0.85] hover:scale-[0.90]"
                : "scale-100 hover:scale-105"
            }`}
          onClick={() => onSelect(index)}
          aria-pressed={selectedItems.includes(index)}
        >
          <div className="aspect-square relative">
            <img
              src={option.image}
              alt={option.name}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-red-500/80 to-transparent
                transition-opacity duration-200 ease-in-out
                ${selectedItems.includes(index) ? "opacity-100" : "opacity-0"}`}
            />
            <div className="absolute bottom-0 p-3">
              <span className="text-white font-light">{option.name}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default GridSelection;
