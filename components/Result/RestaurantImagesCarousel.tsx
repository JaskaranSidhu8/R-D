import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import { Tables } from "@/utils/types/supabase";

type Props = {
  images: Tables<"restaurants_photos">[];
};
export const RestaurantImagesCarousel = (props: Props) => {
  const { images } = props;
  return (
    <div>
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full "
      >
        <CarouselContent className="gap-3 p-4">
          {images.map((img, index) => (
            <CarouselItem
              className=" basis-1/2 aspect-square overflow-hidden rounded-lg p-0  shadow-md "
              key={`restaurant_image_${index}`}
            >
              <Image
                className=" w-full"
                width={400}
                height={400}
                src={img.photo || ""}
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
