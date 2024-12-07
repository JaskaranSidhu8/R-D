import Banner from "@/components/Result/Banner";
import RestaurantImagesCarousel from "@/components/Result/RestaurantImagesCarousel";
import ResultInfo from "@/components/Result/ResultInfo";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Banner />
      <ResultInfo />
    </div>
  );
};

export default page;
