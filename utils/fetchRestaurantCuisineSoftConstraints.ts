type CuisineMapping = {
  id: number;
  google_cuisine: string;
  group_id: number;
};

type CuisineGroup = {
  id: number;
  group_name: string;
  cuisine_soft_constraints: string;
};

// Full data for cuisineMappings
const cuisineMappings: CuisineMapping[] = [
  { id: 1, google_cuisine: "asian_restaurant", group_id: 1 },
  { id: 2, google_cuisine: "chinese_restaurant", group_id: 1 },
  { id: 3, google_cuisine: "japanese_restaurant", group_id: 1 },
  { id: 4, google_cuisine: "sushi_restaurant", group_id: 1 },
  { id: 5, google_cuisine: "ramen_restaurant", group_id: 1 },
  { id: 6, google_cuisine: "thai_restaurant", group_id: 1 },
  { id: 7, google_cuisine: "vietnamese_restaurant", group_id: 1 },
  { id: 8, google_cuisine: "korean_restaurant", group_id: 1 },
  { id: 9, google_cuisine: "indonesian_restaurant", group_id: 1 },
  { id: 10, google_cuisine: "american_restaurant", group_id: 2 },
  { id: 11, google_cuisine: "hamburger_restaurant", group_id: 2 },
  { id: 12, google_cuisine: "barbecue_restaurant", group_id: 2 },
  { id: 13, google_cuisine: "brunch_restaurant", group_id: 2 },
  { id: 14, google_cuisine: "diner", group_id: 2 },
  { id: 15, google_cuisine: "fast_food_restaurant", group_id: 2 },
  { id: 16, google_cuisine: "steak_house", group_id: 2 },
  { id: 17, google_cuisine: "italian_restaurant", group_id: 3 },
  { id: 18, google_cuisine: "pizza_restaurant", group_id: 3 },
  { id: 19, google_cuisine: "mexican_restaurant", group_id: 4 },
  { id: 20, google_cuisine: "brazilian_restaurant", group_id: 4 },
  { id: 21, google_cuisine: "buffet_restaurant", group_id: 4 },
  { id: 22, google_cuisine: "spanish_restaurant", group_id: 4 },
  { id: 23, google_cuisine: "indian_restaurant", group_id: 5 },
  { id: 24, google_cuisine: "afghani_restaurant", group_id: 6 },
  { id: 25, google_cuisine: "lebanese_restaurant", group_id: 6 },
  { id: 26, google_cuisine: "turkish_restaurant", group_id: 6 },
  { id: 27, google_cuisine: "mediterranean_restaurant", group_id: 6 },
  { id: 28, google_cuisine: "middle_eastern_restaurant", group_id: 6 },
  { id: 29, google_cuisine: "greek_restaurant", group_id: 6 },
  { id: 30, google_cuisine: "african_restaurant", group_id: 13 },
  { id: 31, google_cuisine: "french_restaurant", group_id: 7 },
  { id: 32, google_cuisine: "seafood_restaurant", group_id: 8 },
  { id: 33, google_cuisine: "vegan_restaurant", group_id: 9 },
  { id: 34, google_cuisine: "vegetarian_restaurant", group_id: 9 },
  { id: 35, google_cuisine: "dessert_restaurant", group_id: 10 },
  { id: 36, google_cuisine: "ice_cream_shop", group_id: 10 },
  { id: 37, google_cuisine: "donut_shop", group_id: 10 },
  { id: 38, google_cuisine: "chocolate_shop", group_id: 10 },
  { id: 39, google_cuisine: "candy_store", group_id: 10 },
  { id: 40, google_cuisine: "dessert_shop", group_id: 10 },
  { id: 41, google_cuisine: "confectionery", group_id: 10 },
  { id: 42, google_cuisine: "chocolate_factory", group_id: 10 },
  { id: 43, google_cuisine: "bar", group_id: 11 },
  { id: 44, google_cuisine: "pub", group_id: 11 },
  { id: 45, google_cuisine: "wine_bar", group_id: 11 },
  { id: 46, google_cuisine: "bar_and_grill", group_id: 11 },
  { id: 47, google_cuisine: "cafe", group_id: 11 },
  { id: 48, google_cuisine: "cafetaria", group_id: 11 },
  { id: 49, google_cuisine: "acai_shop", group_id: 12 },
  { id: 50, google_cuisine: "bagel_shop", group_id: 12 },
  { id: 51, google_cuisine: "bakery", group_id: 12 },
  { id: 52, google_cuisine: "cat_cafe", group_id: 12 },
  { id: 53, google_cuisine: "dog_cafe", group_id: 12 },
  { id: 54, google_cuisine: "tea_house", group_id: 12 },
  { id: 55, google_cuisine: "juice_shop", group_id: 12 },
  { id: 56, google_cuisine: "meal_delivery", group_id: 12 },
  { id: 57, google_cuisine: "meal_takeaway", group_id: 12 },
  { id: 58, google_cuisine: "food_court", group_id: 12 },
  { id: 59, google_cuisine: "restaurant", group_id: 12 },
  { id: 60, google_cuisine: "sandwich_shop", group_id: 12 },
  { id: 61, google_cuisine: "breakfast_restaurant", group_id: 12 },
  { id: 62, google_cuisine: "coffee_shop", group_id: 12 },
  { id: 63, google_cuisine: "deli", group_id: 12 },
  { id: 64, google_cuisine: "fine_dining_restaurant", group_id: 12 },
];

// Full data for cuisineGroups
const cuisineGroups: CuisineGroup[] = [
  { id: 1, group_name: "Asian", cuisine_soft_constraints: "1000000000000" },
  { id: 2, group_name: "American", cuisine_soft_constraints: "0100000000000" },
  { id: 3, group_name: "Italian", cuisine_soft_constraints: "0010000000000" },
  {
    id: 4,
    group_name: "Mexican_Latin",
    cuisine_soft_constraints: "0001000000000",
  },
  { id: 5, group_name: "Indian", cuisine_soft_constraints: "0000100000000" },
  {
    id: 6,
    group_name: "Mediterranean",
    cuisine_soft_constraints: "0000010000000",
  },
  { id: 7, group_name: "European", cuisine_soft_constraints: "0000001000000" },
  { id: 8, group_name: "Seafood", cuisine_soft_constraints: "0000000100000" },
  { id: 9, group_name: "Vegan", cuisine_soft_constraints: "0000000010000" },
  { id: 10, group_name: "Dessert", cuisine_soft_constraints: "0000000001000" },
  { id: 11, group_name: "Bar", cuisine_soft_constraints: "0000000000100" },
  { id: 12, group_name: "Other", cuisine_soft_constraints: "0000000000010" },
  { id: 13, group_name: "African", cuisine_soft_constraints: "0000000000001" },
];

// Function to retrieve cuisine soft constraints
export function getCuisineSoftConstraint(primaryType: string) {
  const mapping = cuisineMappings.find(
    (item) => item.google_cuisine === primaryType,
  );

  if (!mapping) {
    //console.log(`No mapping found for primary_type: ${primaryType}`);
    return null;
  }

  const group = cuisineGroups.find((item) => item.id === mapping.group_id);

  if (!group) {
    //console.log(`No group found for group_id: ${mapping.group_id}`);
    return null;
  }

  // console.log(
  //   `Soft constraint for primary_type ${primaryType}: ${group.cuisine_soft_constraints}`
  // );
  return group.cuisine_soft_constraints;
}
