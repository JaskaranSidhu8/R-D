import Banner from "@/components/Analysis/Banner";
import PulsingPicture from "@/components/Analysis/PulsingPicture";
import Logo from "@/components/static/Logo";
import Link from "next/link";
import React from "react";

//type Props = {};

const Analysis = () => {
  return (
    <div>
      <div className=" absolute top-0 left-0 z-50 p-10">
        <Link href="/">
          <Logo showText={false} big={false} />
        </Link>
      </div>
      <Banner />
      <PulsingPicture />
    </div>
  );
};

export default Analysis;
