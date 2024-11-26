'use client'
import { useEffect, useState } from 'react';

const TestRestaurantPage = () => {
  const [bestRestaurant, setBestRestaurant] = useState<{ name: string; similarity: string } | null>(null);
  const [allRestaurants, setAllRestaurants] = useState<{ id: number; name: string; similarity: string }[]>([]);
  const groupId = 1;

  useEffect(() => {
    async function fetchBestRestaurant() {
      try {
        console.log(`Fetching for groupId: ${groupId}`);
        const response = await fetch(`/api/findBestRestaurant?groupId=${groupId}`);
        const data = await response.json();

        console.log('API Response:', data);

        setBestRestaurant(data.bestRestaurant);
        setAllRestaurants(data.allRestaurants);
      } catch (err) {
        console.error('Error fetching best restaurant:', err);
      }
    }

    fetchBestRestaurant();
  }, []);

  return (
    <div>
      <h1>Best Restaurant</h1>
      {bestRestaurant ? (
        <div>
          <p><strong>Name:</strong> {bestRestaurant.name}</p>
          <p><strong>Similarity:</strong> {bestRestaurant.similarity}</p>
        </div>
      ) : (
        <p>Loading best restaurant...</p>
      )}

      <h2>All Restaurants with Similarities</h2>
      {allRestaurants.length > 0 ? (
        <ul>
          {allRestaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <p><strong>Name:</strong> {restaurant.name}</p>
              <p><strong>Similarity:</strong> {restaurant.similarity}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading all restaurants...</p>
      )}
    </div>
  );
};

export default TestRestaurantPage;
