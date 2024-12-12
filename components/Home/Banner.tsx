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
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/5 to-transparent opacity-60"></div>

      <Orbital />
      <Link href={"./GroupName"}>
        <Button className="absolute bottom-0 w-4/5 left-1/2  -translate-x-1/2 shadow-md z-50 ">
          Create a group
        </Button>
      </Link>
    </div>
  );
};

export default Banner;
