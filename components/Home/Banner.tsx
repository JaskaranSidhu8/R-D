import Image from "next/image";
import React from "react";
import Orbital from "./Orbital";
import { Button } from "../ui/button";
import Link from "next/link";

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
      <Link
        href="/GroupName"
        className="absolute bottom-0 w-4/5 left-1/2 -translate-x-1/2 z-50"
      >
        <Button className="w-full shadow-md">Create a group</Button>
      </Link>
    </div>
  );
};

export default Banner;
