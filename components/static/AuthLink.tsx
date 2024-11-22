import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  text: string;
  href: string;
  signinup: string;
  classname?: string;
};

const AuthLink = (props: Props) => {
  return (
    <div className={`text-center space-y-5   ${props.classname}`}>
      <div className=" relative block">
        <div className="w-full h-px mt-4 bg-gray-300 absolute left-0 -top-1 -z-10 "></div>
        <span className=" bg-background p-3 text-gray-300 ">or</span>
      </div>

      <div className=" text-sm block relative">
        {" "}
        {props.text}{" "}
        <Link
          href={props.href}
          className=" text-primary font-semibold underline"
        >
          {" "}
          {props.signinup} <ArrowRight size={14} className=" inline" />
        </Link>
      </div>
    </div>
  );
};

export default AuthLink;
