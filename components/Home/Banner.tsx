import Image from "next/image";
import React from "react";
import Orbital from "./Orbital";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className=" relative  h-[50dvh] overflow-x-hidden overflow-y-hidden">
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
