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
import RefuseButton from "./RefuseButton";
import { Tables } from "@/utils/types/supabase";
import Link from "next/link";
import { getRestaurantImages } from "@/actions/functions";

type Props = {
  restaurant: Tables<"restaurants">;
  simularity: number;
};
const ResultInfo = async (props: Props) => {
  const { restaurant, simularity } = props;
  const images = await getRestaurantImages(restaurant.id);
  return (
    <div className=" text-center items-center p-10 ">
      {" "}
      <div>
        <h1 className=" montserrat text-2xl">{restaurant.name}</h1>
        <span className=" text-sm">{restaurant.primary_type_display_name}</span>
      </div>
      <h2 className=" font-bold text-primary my-4">
        {Math.round(simularity * 100)}% Match
      </h2>
      <h2>{restaurant.formatted_address}</h2>
      <div className="flex flex-col gap-4 mt-8">
        <div className="flex flex-row gap-3">
          <Link
            className=" w-full"
            href={restaurant.website_URI || "#"}
            target="_blank"
          >
            {" "}
            <Button
              variant={"outline"}
              className=" text-primary border-primary shadow-none border-2"
            >
              <Globe2Icon /> Website
            </Button>
          </Link>

          <Link className=" w-full" href={restaurant.google_maps_URI || "#"}>
            <Button
              variant={"outline"}
              className=" text-primary border-primary shadow-none border-2"
            >
              <CornerUpRight /> Directions
            </Button>
          </Link>
        </div>
        <div className="flex flex-row gap-3">
          <Link
            className=" w-full"
            href={
              restaurant.national_phone_number
                ? `tel:${restaurant.national_phone_number}`
                : "#"
            }
          >
            <Button disabled={!restaurant.national_phone_number}>
              <Phone /> Call{" "}
            </Button>
          </Link>
        </div>

        <div>
          <RestaurantImagesCarousel images={images || []} />
        </div>

        <div className="flex gap-3 w-full">
          <Link href={"/Home"} className=" w-full">
            <Button
              variant={"outline"}
              className=" w-full text-primary border-primary shadow-none border-2"
            >
              {" "}
              <ArrowLeft /> Back Home{" "}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultInfo;
