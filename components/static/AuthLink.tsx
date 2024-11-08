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
    <div>
      <div
        className={`w-full h-px mt-4 bg-gray-300 opacity-50 ${props.classname}`}
      ></div>

      <span className=" text-sm">
        {" "}
        {props.text}{" "}
        <Link
          href={props.href}
          className=" text-primary font-semibold underline"
        >
          {" "}
          {props.signinup} <ArrowRight size={14} className=" inline" />
        </Link>
      </span>
    </div>
  );
};

export default AuthLink;
