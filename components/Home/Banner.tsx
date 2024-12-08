import Image from "next/image";
import React from "react";
import Orbital from "./Orbital";
import { Button } from "../ui/button";

const Banner = () => {
  return (
    <div className=" relative  h-[50dvh] overflow-x-hidden ">
      <Image
        className=" w-full h-full object-cover"
        src={"/leuvenmapterrain.png"}
        alt="map"
        width={800}
        height={800}
      />

      <Orbital />
      <Button className="absolute bottom-0 w-4/5 left-1/2  -translate-x-1/2 shadow-md z-50 ">
        Create a group
      </Button>
    </div>
  );
};

export default Banner;
