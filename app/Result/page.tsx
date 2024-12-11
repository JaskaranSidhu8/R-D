import Banner from "@/components/Result/Banner";
import RestaurantImagesCarousel from "@/components/Result/RestaurantImagesCarousel";
import ResultInfo from "@/components/Result/ResultInfo";
import React from "react";

type Props = {
  searchParams: {
    groupId: string;
  }; // Explicitly define the type of groupId
};

const page: React.FC<Props> = ({ searchParams }) => {
  const { groupId } = searchParams;
  console.log("Results - Received groupId:", groupId); // debug line
  return (
    <div>
      <Banner />
      <ResultInfo />
    </div>
  );
};

export default page;
