import Banner from "@/components/Analysis/Banner";
import PulsingPicture from "@/components/Analysis/PulsingPicture";
import Logo from "@/components/static/Logo";
import Link from "next/link";
import React, { Suspense } from "react";

const Analysis = () => {
  return (
    <div>
      <div className="absolute top-0 left-0 z-50 p-10">
        <Link href="/">
          <Logo showText={false} big={false} />
        </Link>
      </div>
      <Banner />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <p>Loading analysis...</p>
          </div>
        }
      >
        <PulsingPicture />
      </Suspense>
    </div>
  );
};

export default Analysis;
