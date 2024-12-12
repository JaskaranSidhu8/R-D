import Link from "next/link";
import React from "react";
import PreviousGroupCarousel from "./PreviousGroupCarousel";
import { fetchUserGroups } from "@/actions/functions";

// type Props = {};

const PreviousGroups = async () => {
  const groups = await fetchUserGroups();

  return (
    <div className="mt-10">
      <div className=" mb-6 flex flex-row justify-between items-center">
        <h3 className=" montserrat  text-xl">Your previous groups</h3>
        <Link href={"/Home/AllGroups"} className=" text-muted-foreground">
          See all
        </Link>
      </div>
      <PreviousGroupCarousel items={groups} />
    </div>
  );
};

export default PreviousGroups;
