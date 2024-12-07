import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";

type Props = {};

export const RestaurantImagesCarousel = (props: Props) => {
  return (
    <div>
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full "
      >
        <CarouselContent className="gap-3 p-4">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
            <CarouselItem
              className=" basis-1/2 aspect-square overflow-hidden rounded-lg p-0  shadow-md "
              key={`restaurant_image_${i}`}
            >
              <Image
                className=" w-full"
                width={400}
                height={400}
                src={`https://picsum.photos/200/300?random=${i}`}
                alt="restaurant image"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default RestaurantImagesCarousel;
