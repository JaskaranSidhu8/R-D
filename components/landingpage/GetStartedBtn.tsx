import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  classname?: string;
};

const GetStartedBtn = (props: Props) => {
  return (
    <div>
      <div className="w-[260vw] -left-[80vw] absolute h-[130vw]  bg-gray-50 rounded-t-full border-4 border-primary border-b-0 -bottom-[600px] z-10"></div>
      <div className="relative z-20 "></div>
    </div>
  );
};

export default GetStartedBtn;
