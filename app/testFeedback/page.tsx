"use client";

import React, { useState } from "react";
import {
  getPendingRatings,
  getRestaurantDetails,
  updateReviewRating,
} from "@/actions/functions";

export default function TestPendingRatingsPage() {
  const [userId, setUserId] = useState<number>(0);
  const [result, setResult] = useState<
    { id: number; name: string; logo: string }[] | null
  >(null);
  const [status, setStatus] = useState<string>("");

  const handleCheckRatings = async () => {
    setStatus("Loading...");
    try {
      const pendingRatings = await getPendingRatings(userId);

      if (pendingRatings && pendingRatings.length > 0) {
        const restaurantDetails = await Promise.all(
          pendingRatings.map(async (id) => {
            const details = await getRestaurantDetails(id);
            return details ? { ...details, id } : null;
          }),
        );

        const filteredResults = restaurantDetails.filter(
          (details) => details !== null,
        ) as { id: number; name: string; logo: string }[];

        setResult(filteredResults);
        setStatus("Found pending ratings!");
      } else {
        setResult(null);
        setStatus(
          "User has rated all restaurants or is not in any relevant group.",
        );
      }
    } catch (error) {
      console.error("Error fetching pending ratings:", error);
      setStatus("An error occurred while fetching data.");
    }
  };

  const handleUpdateRating = async (id: number, rating: number) => {
    if (rating < 1 || rating > 5) {
      alert("Please enter a rating between 1 and 5.");
      return;
    }

    const success = await updateReviewRating(id, rating);
    if (success) {
      alert("Rating updated successfully!");

      // Remove the rated restaurant from the list
      setResult(
        (prevResult) =>
          prevResult?.filter((restaurant) => restaurant.id !== id) || null,
      );
    } else {
      alert("Failed to update the rating. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Pending Ratings</h1>
      <div className="space-y-4">
        <div>
          <label className="block font-medium">User ID</label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <button
          onClick={handleCheckRatings}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Check Pending Ratings
        </button>
        {status && <p className="mt-4">{status}</p>}
        {result && (
          <div className="mt-4">
            <h2 className="font-medium">Pending Ratings:</h2>
            <ul className="list-disc list-inside">
              {result.map((restaurant) => (
                <li key={restaurant.id} className="mb-4">
                  <div className="flex items-center space-x-4 mb-2">
                    <img
                      src={restaurant.logo}
                      alt={restaurant.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span>{restaurant.name}</span>
                  </div>
                  <div>
                    <label className="block font-medium mb-1">
                      Rate this restaurant (1-5):
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      className="border rounded px-2 py-1 w-20 mr-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const rating = parseInt(
                            (e.target as HTMLInputElement).value,
                          );
                          handleUpdateRating(restaurant.id, rating);
                        }
                      }}
                    />
                    <small>Press Enter to submit rating</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
