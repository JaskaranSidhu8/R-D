import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface CuisineOption {
  id: number;
  name: string;
  image: string;
}

const cuisineOptions: CuisineOption[] = [
  { id: 1, name: "Mexican", image: "/mexican.jpg" },
  { id: 2, name: "Latin", image: "/latin.jpg" },
  { id: 3, name: "Burger", image: "/burger.jpg" },
  { id: 4, name: "Pizza", image: "/pizza.jpg" },
  { id: 5, name: "Hot Dog", image: "/hotdog.jpg" },
  { id: 6, name: "Pasta", image: "/pasta.jpg" },
];

const VerticalCarousel = () => {
  const [selectedCuisines, setSelectedCuisines] = useState<number[]>([]);

  const handleSelection = (cuisineId: number) => {
    setSelectedCuisines((prev) => {
      //if already selected, it gets deselected
      if (prev.includes(cuisineId)) {
        return prev.filter((id) => id !== cuisineId);
      }
      // cannot be more than three options selected
      if (prev.length < 3) {
        return [...prev, cuisineId];
      }
      return prev;
    });
  };

  return (
    <Carousel
      orientation="vertical"
      opts={{
        axis: "y",
        dragFree: true,
        containScroll: false, //allows free dragging without snapping back
        align: "start",
      }}
      className="w-full relative h-full overflow-hidden px-6"
    >
      <CarouselContent className="grid grid-cols-2 gap-6 px-4">
        {cuisineOptions.map((cuisine) => (
          <CarouselItem key={cuisine.id} className="basis-auto">
            <button
              className={`w-full overflow-hidden relative rounded-2xl transition-all duration-200 ease-in-out
    ${
      selectedCuisines.includes(cuisine.id)
        ? "ring-2 ring-red-500 scale-[0.85] hover:scale-[0.90]" // Scale down when selected, slightly bigger on hover
        : "scale-100 hover:scale-105"
    }`} // Normal state with hover effect
              onClick={() => handleSelection(cuisine.id)}
              aria-pressed={selectedCuisines.includes(cuisine.id)}
            >
              <div className="aspect-square relative">
                <img
                  src={cuisine.image}
                  alt={cuisine.name}
                  className="object-cover w-full h-full"
                />
                {/* Base overlay - always present */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`}
                />
                {/* Red selection overlay - only shows when selected */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-red-500/80 to-transparent
                    transition-opacity duration-200 ease-in-out
                    ${selectedCuisines.includes(cuisine.id) ? "opacity-100" : "opacity-0"}`}
                />
                <div className="absolute bottom-0 w-full p-3">
                  <span className="text-white font-medium text-lg">
                    {cuisine.name}
                  </span>
                </div>
              </div>
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default VerticalCarousel;
