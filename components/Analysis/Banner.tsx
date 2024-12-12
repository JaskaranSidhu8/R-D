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
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/5 to-transparent opacity-60"></div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#EE4D2A] via-[#EE4D2A]/2 to-transparent opacity-60"></div>

      <Orbital />
    </div>
  );
};

export default Banner;
