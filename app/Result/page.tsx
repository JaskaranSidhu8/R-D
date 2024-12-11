import { algorithm, retrieveLogo } from "@/actions/functions";
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
  const now = new Date();
  const restaurant = await algorithm(
    group_Id,
    now.getDay(),
    now.getHours(),
    now.getMinutes(),
  );

  const restaurant_logo = await retrieveLogo(restaurant.bestRestaurant.id);

  console.log("Results - Received groupId:", groupId); // debug line
  return (
    <div>
      <Banner restaurantUrl={restaurant_logo?.url || ""} />
      <ResultInfo
        simularity={restaurant.similarity}
        restaurant={restaurant.bestRestaurant}
      />
    </div>
  );
};

export default page;
