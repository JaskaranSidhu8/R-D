import { algorithm } from "@/actions/functions";
import React from "react";

const BestRestaurantComponent = async () => {
  const group_id = 3; // Assign a static value for testing
  const day = 4;
  const hour = 18;
  const minute = 0;
  const { bestRestaurant, similarity } = await algorithm(
    group_id,
    day,
    hour,
    minute,
  );

  return (
    <div>
      <h1>Best Restaurant</h1>
      {bestRestaurant ? (
        <div>
          <p>Name: {bestRestaurant.name}</p>
          <p>Similarity Score: {similarity.toFixed(4)}</p>
        </div>
      ) : (
        <p>No suitable restaurant foundd.</p>
      )}
    </div>
  );
};

export default BestRestaurantComponent;
