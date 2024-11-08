import React from "react";
import Logo from "../static/Logo";
import PulsingPicture from "./PulsingPicture";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import GetStartedBtn from "./GetStartedBtn";

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <header className=" container mx-auto flex flex-col h-[95vh]  relative gap-3 overflow-hidden items-center py-16 gradient">
        <div className="flex flex-col justify-center items-center">
          <Logo big={true} showText={false} />
          <h1 className=" montserrat text-title">TieBreaker </h1>
        </div>

        <div className=" py-8">
          <PulsingPicture />
        </div>

        <div className="text-center    w-full px-6 ">
          <p className=" montserrat text-lg font-normal text-black">
            Don't know where to eat?
          </p>
          <p className=" montserrat text-xl font-bold text-primary">
            Let Tiebreaker decide.
          </p>
        </div>

        <div className=" w-full px-6 mt-5 ">
          <Input
            type="email"
            placeholder="Enter your email"
            className="border-secondary  mt-4  text-center  py-5"
          />

          <GetStartedBtn />
        </div>
      </header>
    </>
  );
};

export default Header;
