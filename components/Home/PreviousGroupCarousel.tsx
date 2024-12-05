import React from "react";
import { CarouselDataType } from "./PreviousGroups";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import GroupItemCard from "./GroupItemCard";
import { fetchUserGroups } from "@/actions/generateRestaurant";

type Props = {
  items: CarouselDataType[];
};

const PreviousGroupCarousel = async (props: Props) => {
  const user = await fetchUserGroups(1);
  console.log("data", user);
  return (
    <Carousel
      opts={{
        loop: true,
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {props.items.map((item, index) => (
          <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
            {" "}
            <GroupItemCard item={item} />{" "}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PreviousGroupCarousel;
