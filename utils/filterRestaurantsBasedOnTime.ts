import supabase from "@/utils/supabaseClient";
import { Tables } from "@/utils/types/supabase";

export async function filterRestaurantsByTime(
  day: number,
  hour: number,
  minute: number,
) {
  // Step 1: Fetch the IDs of restaurants that are open at the specified time
  const { data: openRestaurants, error: timeError } = await supabase
    .from("restaurants_times")
    .select("restaurant_id")
    .eq("day", day)
    .lte("open_hour", hour)
    .gte("close_hour", hour);
  //.or(
  //    `and(open_hour.lt.${hour},close_hour.gt.${hour}),
  //     and(open_hour.eq.${hour},open_minute.lte.${minute}),
  //     and(close_hour.eq.${hour},close_minute.gte.${minute})`
  //  );

  //    if (userHour>openHour && userHour<closeHour)
  //         return true
  //     else
  //         if (userHour == openHour)
  //             if (userMinute>openMinute)
  //                 return true
  //             else
  //                 return false
  //         else

  if (timeError) {
    throw new Error(`Error fetching open restaurants: ${timeError.message}`);
  }

  if (!openRestaurants || openRestaurants.length === 0) {
    //console.warn("No restaurants are open at the specified time.");
    return [];
  }

  if (openRestaurants.length < 10) {
    //console.warn("Less than 10 restaurants are open at this time.");
  }

  // Step 2: Extract restaurant IDs
  const restaurantIds = openRestaurants.map((entry) => entry.restaurant_id);

  // Step 3: Fetch restaurants from the `restaurants` table using the IDs
  const { data: restaurants, error: restaurantError } = await supabase
    .from("restaurants")
    .select("*")
    .in("id", restaurantIds);

  if (restaurantError) {
    throw new Error(`Error fetching restaurants: ${restaurantError.message}`);
  }

  return restaurants as Tables<"restaurants">[];
}
