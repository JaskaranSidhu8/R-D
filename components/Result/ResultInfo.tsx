import React from "react";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  Calendar1Icon,
  CornerUpRight,
  Globe2Icon,
  Phone,
  X,
} from "lucide-react";
import { Carousel, CarouselContent } from "../ui/carousel";
import RestaurantImagesCarousel from "./RestaurantImagesCarousel";

type Props = {};

const ResultInfo = (props: Props) => {
  return (
    <div className=" text-center items-center ">
      {" "}
      <div>
        <h1 className=" montserrat text-2xl">PePeNero</h1>
        <span className=" text-sm">Italian Restaurant</span>
      </div>
      <h2 className=" font-bold text-primary my-4">86% Match</h2>
      <h2>Muntstraat 19, 3000 Leuven</h2>
      <div className="flex flex-col gap-4 mt-8">
        <div className="flex flex-row gap-3">
          <Button
            variant={"outline"}
            className=" text-primary border-primary shadow-none border-2"
          >
            <Globe2Icon /> Website
          </Button>
          <Button
            variant={"outline"}
            className=" text-primary border-primary shadow-none border-2"
          >
            <CornerUpRight /> Directions
          </Button>
        </div>
        <div className="flex flex-row gap-3">
          <Button>
            {" "}
            <Phone /> Call{" "}
          </Button>
          <Button>
            {" "}
            <Calendar1Icon /> Reserve
          </Button>
        </div>

        <div>
          <RestaurantImagesCarousel />
        </div>

        <div className="flex flex-row gap-3">
          <Button
            variant={"outline"}
            className=" text-primary border-primary shadow-none border-2"
          >
            {" "}
            <ArrowLeft /> Back Home{" "}
          </Button>

          <Button
            variant={"outline"}
            className=" text-primary border-primary shadow-none border-2"
          >
            {" "}
            <X className=" text-primary" />
            Refuse
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultInfo;
