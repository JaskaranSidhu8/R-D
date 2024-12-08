import React from "react";
import Logo from "../static/Logo";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import Link from "next/link";
// import GetStartedBtn from "./GetStartedBtn";
import HeaderContent from "./HeaderContent";
import SvgWave from "./SvgWave";

// type Props = {};

const Header = () => {
  return (
    <>
      <header
        className="relative container mx-auto flex flex-col h-[81vh] w-full gap-3 overflow-hidden items-center py-16  bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: "url('/cover.jpeg')",
          backgroundSize: "160%",
          backgroundPosition: "top center",
        }}
      >
        <div className="relative z-10 flex flex-col justify-center items-center">
          <Logo big={true} showText={false} />
          <h1 className="montserrat text-4xl text-title text-white ">
            TIEBREAKER
          </h1>
        </div>
        <HeaderContent />
        <SvgWave />
      </header>
    </>
  );
};

export default Header;
