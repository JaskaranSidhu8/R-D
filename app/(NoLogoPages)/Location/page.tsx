"use client";

import React from "react";
import LocationForm from "@/components/Location/LocationForm";
import ReturnButton from "@/components/static/ReturnButton";
import Link from "next/link";

const Location = () => {
  return (
    <div>
      <ReturnButton />
      <Link href={"/DiningTime"}>
        <LocationForm />
      </Link>
    </div>
  );
};

export default Location;
