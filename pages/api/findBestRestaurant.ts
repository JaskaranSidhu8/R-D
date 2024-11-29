import {
  fetchGroupPreferences,
  fetchRestaurants,
  combinePreferences,
  filterRestaurantsByHardConstraints,
  cosineSimilarity,
} from "../../utils/backendApi";

export default async function handler(req, res) {
  const { groupId } = req.query;

  try {
    console.log("Import Check: fetchGroupPreferences loaded successfully");

    const groupUsers = await fetchGroupPreferences(groupId);
    const allRestaurants = await fetchRestaurants();

    const combinedPreferences = combinePreferences(groupUsers);
    const filteredRestaurants = filterRestaurantsByHardConstraints(
      groupUsers,
      allRestaurants,
    );

    let bestRestaurant;
    let highestSimilarity = -1;

    console.log("Evaluating Restaurants with Cosine Similarities:");

    // Array to store restaurants with their similarity scores
    const allRestaurantsWithSimilarity = filteredRestaurants.map(
      (restaurant) => {
        const restaurantPreferences = restaurant.softconstraints
          .split("")
          .map(Number);
        const similarity = cosineSimilarity(
          combinedPreferences,
          restaurantPreferences,
        );

        const restaurantWithSimilarity = {
          id: restaurant.id,
          name: restaurant.name,
          similarity: similarity.toFixed(4),
        };

        // Find the best restaurant
        if (similarity > highestSimilarity) {
          highestSimilarity = similarity;
          bestRestaurant = restaurant;
        }

        return restaurantWithSimilarity;
      },
    );

    console.log(
      "All Restaurants with Similarities:",
      allRestaurantsWithSimilarity,
    );
    console.log(
      "Best Restaurant:",
      bestRestaurant
        ? {
            id: bestRestaurant.id,
            name: bestRestaurant.name,
            similarity: highestSimilarity.toFixed(4),
          }
        : "No suitable restaurant found",
    );
    // Return response
    if (bestRestaurant) {
      res.status(200).json({
        bestRestaurant: {
          id: bestRestaurant.id,
          name: bestRestaurant.name,
          similarity: highestSimilarity.toFixed(4),
        },
        allRestaurants: allRestaurantsWithSimilarity,
      });
    } else {
      res.status(200).json({
        bestRestaurant: null,
        allRestaurants: allRestaurantsWithSimilarity,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
