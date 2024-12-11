import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import { Tables } from "@/utils/types/supabase";

type Props = {
  images: Tables<"restaurants_photos">[];
};
const constructImageUrl = (inputUrl: string) => {
  const match = inputUrl.match(/image_key=!1e10!2s([^&]+)/);
  if (!match || !match[1]) {
    throw new Error("invalid url");
  }
  const imageKey = match[1];
  const newUrl = `https://lh5.googleusercontent.com/p/${imageKey}=w400-h400-k-no`;
  return newUrl;
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
                className=" w-full h-full object-cover"
                width={400}
                height={400}
                src={constructImageUrl(img.photo as string)}
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
