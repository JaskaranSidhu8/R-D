import { checkHardConstraintsGroup } from "@/utils/backendApi";
import { getCuisineSoftConstraint } from "@/utils/fetchRestaurantCuisineSoftConstraints";
import { filterRestaurantsByTime } from "@/utils/filterRestaurantsBasedOnTime";
import { filterRestaurantsByHardConstraint } from "@/utils/filterRestaurantsByHardConstraint";
import React, { useState } from "react";


const RestaurantFilter = () => {
  const [day, setDay] = useState(0); // Day of the week (0 for Sunday, 6 for Saturday)
  const [hour, setHour] = useState(0); // Hour of the day (0-23)
  const [minute, setMinute] = useState(0); // Minute of the hour (0-59)
  const [restaurants, setRestaurants] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFilter = async () => {
    try {
      setError(null); // Clear previous errors
      const filteredRestaurants = await filterRestaurantsByTime(day, hour, minute); //filter by time works
      const hasHardConstraints = await checkHardConstraintsGroup(1);
      const filteredRestaurantsByHardConstraints = await filterRestaurantsByHardConstraint(filteredRestaurants, hasHardConstraints); //filter by hard constraint works
      setRestaurants(filteredRestaurantsByHardConstraints.map(({ id, name }) => ({ id, name })));
      const mata = getCuisineSoftConstraint("asian_restaurant");
      console.log("mata is", mata)
    } catch (err) {
      //setError(err.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Filter Restaurants by Time</h1>
      
      {/* Input fields */}
      <div className="mb-4">
        <label className="block mb-2">
          Day (0-6): 
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            className="border rounded px-2 py-1 ml-2"
            min="0"
            max="6"
          />
        </label>
        <label className="block mb-2">
          Hour (0-23): 
          <input
            type="number"
            value={hour}
            onChange={(e) => setHour(Number(e.target.value))}
            className="border rounded px-2 py-1 ml-2"
            min="0"
            max="23"
          />
        </label>
        <label className="block mb-2">
          Minute (0-59): 
          <input
            type="number"
            value={minute}
            onChange={(e) => setMinute(Number(e.target.value))}
            className="border rounded px-2 py-1 ml-2"
            min="0"
            max="59"
          />
        </label>
      </div>

      {/* Filter button */}
      <button
        onClick={handleFilter}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Filter Restaurants
      </button>

      {/* Error message */}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}

      {/* Results */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Results:</h2>
        {restaurants.length > 0 ? (
          <ul>
            {restaurants.map((restaurant) => (
              <li key={restaurant.id} className="mb-1">
                <span className="font-bold">ID:</span> {restaurant.id}, <span className="font-bold">Name:</span> {restaurant.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No restaurants found for the selected time.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantFilter;
