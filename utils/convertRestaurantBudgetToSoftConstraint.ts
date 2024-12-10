export function getBudgetRestaurant(restaurantBudget: string) {
  const budgetMapping: { [key: string]: string } = {
    UNSPECIFIED: "100000",
    FREE: "010000",
    INEXPENSIVE: "001000",
    MODERATE: "000100",
    EXPENSIVE: "000010",
    VERY_EXPENSIVE: "000001",
  };

  const formattedBudget = budgetMapping[restaurantBudget] || "100000";
  //console.log(`Budget for ${restaurantBudget} is formatted as ${formattedBudget}`);
  return formattedBudget;
}
