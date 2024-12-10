import { algorithm, retrieveLogo } from "@/actions/functions";
import Banner from "@/components/Result/Banner";
import RestaurantImagesCarousel from "@/components/Result/RestaurantImagesCarousel";
import ResultInfo from "@/components/Result/ResultInfo";
import React from "react";

const page = async () => {
  const groud_id = 3; // replace the group_id value with the actual id from the context
  const now = new Date();
  const restaurant = await algorithm(
    groud_id,
    now.getDay(),
    now.getHours(),
    now.getMinutes(),
  );

  const restaurant_logo = await retrieveLogo(restaurant.bestRestaurant.id);
  console.log(restaurant_logo);

  console.log("Algorithm Result : ", restaurant);
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
