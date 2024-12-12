"use client";

import React, { useEffect, useState } from "react";
import BadgesCarousel from "@/components/Settings/Badges";
import BadgeContainer from "@/components/Settings/Badges";

const BadgesPage = () => {
  const userId = 2;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Badges</h1>
      <BadgesCarousel userId={userId} />
    </div>
  );
};

export default BadgesPage;
