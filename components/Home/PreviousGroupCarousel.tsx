import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import GroupItemCard from "./GroupItemCard";

type Props = {
  items: any[];
};

const PreviousGroupCarousel = async (props: Props) => {
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

//create a form , build in function called action, pass it as formdata
//backkend receives formdata
