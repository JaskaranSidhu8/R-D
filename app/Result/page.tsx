"use client";
import {
  algorithm,
  getRestaurantById,
  getResultAccess,
  retrieveLogo,
} from "@/actions/functions";
import Banner from "@/components/Result/Banner";
import RestaurantImagesCarousel from "@/components/Result/RestaurantImagesCarousel";
import ResultInfo from "@/components/Result/ResultInfo";
import { useGroup } from "@/context/GroupContext";
import { Tables } from "@/utils/types/supabase";
import React, { useEffect, useState } from "react";

type Props = {};

const page: React.FC<Props> = () => {
  const { contextGroupId, groupCode } = useGroup();

  const [isLoaded, setLoaded] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [pickedRestaurant, setPickedRestaurant] = useState<number>(0);
  const [similarity, setSimilarity] = useState<number>(0);
  const [error, setError] = useState("");
  const [restaurant_logo, setRestaurantLogo] =
    useState<Tables<"restaurants_logos">>();
  const [restaurant, setRestaurant] = useState<Tables<"restaurants">>();

  useEffect(() => {
    const checkAccess = async () => {
      if (contextGroupId) {
        const {
          success,
          pickedRestaurant,
          similarity: SM,
          error: ERR,
        } = await getResultAccess(contextGroupId);
        if (success) {
          setLoaded(true);
          setHasAccess(true);
          setPickedRestaurant(pickedRestaurant || 0);
          setSimilarity(SM || 0);
          const logoData = (await retrieveLogo(
            pickedRestaurant || 0,
          )) as Tables<"restaurants_logos">;
          setRestaurantLogo(logoData);
          const restaurant = (await getRestaurantById(
            pickedRestaurant || 0,
          )) as Tables<"restaurants">;
          setRestaurant(restaurant);
        } else {
          setLoaded(true);
          setError(ERR || "");
        }
      }
      checkAccess();
    };
  }, [contextGroupId]);

  return (
    <div>
      {isLoaded ? (
        hasAccess ? (
          <>
            <Banner restaurantUrl={restaurant_logo?.url || ""} />
            <ResultInfo similarity={similarity} restaurant={restaurant} />
          </>
        ) : (
          <p>{error}</p>
        )
      ) : contextGroupId ? (
        <h5>Loading ...</h5>
      ) : (
        <h5>You don't have a permission to access this page</h5>
      )}
    </div>
  );
};

export default page;
