"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
// import { Button } from "../ui/button";

// type Props = {};

const Diagram = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
    rootMargin: "-50px 0px -50px 0px", // Add some buffer to avoid retriggering
  });

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(inView);
  }, [inView]);
  return (
    <div ref={ref} className=" relative  aspect-square  mt-40 w-5/6 mx-auto ">
      <Image
        className={`absolute top-0 left-0 w-full duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        src="/1.png"
        width={400}
        height={400}
        alt="1"
      />
      <Image
        style={{ transitionDelay: "500ms" }}
        className={`absolute top-0 left-0 w-full duration-500  ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        src="/2.png"
        width={400}
        height={400}
        alt="2"
      />
      <Image
        style={{ transitionDelay: "1s" }}
        className={`absolute top-0 left-0 w-full duration-500  ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        src="/3.png"
        width={400}
        height={400}
        alt="3"
      />
    </div>
  );
};

export default Diagram;
