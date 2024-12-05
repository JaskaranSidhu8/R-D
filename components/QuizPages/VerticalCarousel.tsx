import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface CarouselOption {
  id: number;
  name: string;
  image: string;
}

interface VerticalCarouselProps {
  options: CarouselOption[];
  selectedItems: number[];
  onSelect: (itemId: number) => void;
}

const VerticalCarousel = ({
  options,
  selectedItems,
  onSelect,
}: VerticalCarouselProps) => {
  return (
    <Carousel
      orientation="vertical"
      opts={{
        axis: "y",
        dragFree: true,
        containScroll: false,
        align: "start",
      }}
      className="w-full relative h-full overflow-hidden "
    >
      <CarouselContent className="grid grid-cols-2 gap-x-6 gap-y-3 px-3">
        {options.map((option) => (
          <CarouselItem key={option.id} className="basis-auto">
            <button
              className={`w-full overflow-hidden relative rounded-2xl transition-all duration-200 ease-in-out
                ${
                  selectedItems.includes(option.id)
                    ? "ring-2 ring-red-500 scale-[0.90] hover:scale-[0.95]"
                    : "scale-100 hover:scale-105"
                }`}
              onClick={() => onSelect(option.id)}
              aria-pressed={selectedItems.includes(option.id)}
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
                    ${selectedItems.includes(option.id) ? "opacity-100" : "opacity-0"}`}
                />
                <div className="absolute bottom-0  p-3">
                  <span className="text-white font-light">{option.name}</span>
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
