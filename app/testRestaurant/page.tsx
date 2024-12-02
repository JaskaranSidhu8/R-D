

import { algorithm } from "@/actions/functions";
import { Database, Tables } from "@/types/supabase";



const BestRestaurantComponent = async () => {
  const group_id = 1; // Assign a static value for testing
  const { bestRestaurant, similarity } = await algorithm(group_id);

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
