import Image from "next/image";
import React from "react";
import SvgWave from "../landingpage/SvgWave";
import ResultLogo from "./ResultLogo";

const Banner = () => {
  return (
    <div className=" relative h-[50dvh] overflow-hidden ">
      <Image
        className=" w-full h-full object-cover"
        src={"/leuvenmapterrain.png"}
        alt="map"
        width={800}
        height={800}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#EE4D2A] via-[#EE4D2A]/2 to-transparent opacity-70"></div>

      <SvgWave />
      <ResultLogo logo="https://picsum.photos/200/300?random=1" />
    </div>
  );
};

export default Banner;
