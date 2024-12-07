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
    </div>
  );
};

export default Banner;
