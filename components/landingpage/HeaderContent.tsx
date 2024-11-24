import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

// type Props = {};

const HeaderContent = () => {
  return (
    <div className="absolute bottom-20 w-full items-center">
      <div className="relative z-10 text-center w-full px-6 mt-10">
        <p className="montserrat text-2xl font-bold  text-white">
          Don't know where to eat?
        </p>
        <p className="montserrat text-2xl font-bold text-primary mt-2">
          Let Tiebreaker decide.
        </p>
      </div>

      <div className="relative z-10  w-full px-6 mt-8 items-center">
        <Input
          type="email"
          placeholder="Enter your email"
          className="border-secondary mt-4 text-center py-6 w-full rounded-full bg-white"
        />

        <Link href="/Signup">
          <Button className="w-full mt-5 py-6 rounded-full  shadow-lg">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderContent;
