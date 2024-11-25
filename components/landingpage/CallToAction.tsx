"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Aos from "aos";
import Link from "next/link";

// type Props = {};

const CallToAction = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay="1700"
      className=" space-y-5  mb-10  px-8 "
    >
      <h2 className=" text-center  w-full ">
        {" "}
        And the <b>perfect</b> restaurant is ...
      </h2>
      <Image
        src={"/map.png"}
        width={400}
        height={400}
        alt="map"
        className=" w-full"
      />
      <div>
        <h3 className=" text-title">Subway</h3>
        <h4 className=" text-blue-300">Rector de Somerplein 6</h4>
      </div>
      <Link href="/Signup">
        <Button className=" text-center mt-5">Try Now !</Button>
      </Link>
    </div>
  );
};

export default CallToAction;
