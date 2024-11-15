import React from "react";
import Logo from "../static/Logo";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import GetStartedBtn from "./GetStartedBtn";
import HeaderContent from "./HeaderContent";

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <header
        className="relative container mx-auto flex flex-col h-[95vh] w-full gap-3 overflow-hidden items-center py-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/cover.webp')" }}
      >
        <div className="relative z-10 flex flex-col justify-center items-center">
          <Logo big={true} showText={false} />
          <h1 className="montserrat text-4xl text-title text-white ">
            TIEBREAKER
          </h1>
        </div>

        <HeaderContent />
      </header>
    </>
  );
};

export default Header;
