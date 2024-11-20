"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {};

const Diagram = (props: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
  });

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);
  return (
    <div ref={ref} className=" relative  mt-10 w-5/6 mx-auto ">
      <Image
        style={{ transitionDelay: "1s" }}
        className={`absolute top-0 left-0 w-full duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        src="/1.png"
        width={400}
        height={400}
        alt="1"
      />
      <Image
        style={{ transitionDelay: "2s" }}
        className={`absolute top-0 left-0 w-full duration-1000  ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        src="/2.png"
        width={400}
        height={400}
        alt="2"
      />
      <Image
        style={{ transitionDelay: "3s" }}
        className={`absolute top-0 left-0 w-full duration-1000  ${
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
