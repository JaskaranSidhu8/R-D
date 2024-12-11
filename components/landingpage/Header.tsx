import React from "react";
import Logo from "../static/Logo";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import Link from "next/link";
// import GetStartedBtn from "./GetStartedBtn";
import HeaderContent from "./HeaderContent";
import SvgWave from "./SvgWave";

// check with the guys for the black gradient

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
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/5 to-transparent opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-100"></div>
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
