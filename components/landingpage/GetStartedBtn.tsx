import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

const GetStartedBtn = (props: Props) => {
  return (
    <div>
      <div className="w-[260vw] -left-[80vw] absolute h-[130vw]  bg-blue-300 rounded-t-full border-4 border-primary border-b-0 -bottom-[345px] z-10"></div>
      <div className="relative z-20 ">
        <Link href="/Signup">
          <Button className="w-full mt-5 py-5">Get Started</Button>
        </Link>
      </div>
    </div>
  );
};

export default GetStartedBtn;
