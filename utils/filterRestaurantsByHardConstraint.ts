import { Tables } from "./types/supabase";

export async function filterRestaurantsByHardConstraint(restaurants:Tables<"restaurants">[], flag:boolean)
{
    if (flag)
        return restaurants.filter((restaurant) => restaurant.hard_constraints === "true");
    else
        return restaurants;
}