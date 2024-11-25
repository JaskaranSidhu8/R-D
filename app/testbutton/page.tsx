"use client";

import React, { useState } from "react";
import { incrementUserAge } from "../../utils/api";

const TestButtonPage = () => {
  const [userId, setUserId] = useState(1);
  const [updatedAge, setUpdatedAge] = useState(null);

  const handleIncrementAge = async () => {
    const data = await incrementUserAge(userId);
    if (data && data.length > 0) {
      setUpdatedAge(data[0].age); // Set the updated age from returned data
      console.log("Age incremented:", data[0].age);
    } else {
      console.error("Failed to increment age");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Increment User Age</h1>
      <label>
        User ID:
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          style={{ margin: "0 10px" }}
        />
      </label>
      <button
        onClick={handleIncrementAge}
        style={{ padding: "10px", cursor: "pointer" }}
      >
        Increment Age
      </button>
      {updatedAge !== null && <p>Updated Age: {updatedAge}</p>}
    </div>
  );
};

export default TestButtonPage;
