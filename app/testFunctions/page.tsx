"use client";
import React, { useState } from "react";
import { updateUserConstraints } from "@/actions/functions";

export default function UpdateUserConstraintsPage() {
  const [userId, setUserId] = useState<number>(0);
  const [groupId, setGroupId] = useState<number>(0);
  const [softConstraints, setSoftConstraints] = useState<string>("");
  const [cuisineConstraints, setCuisineConstraints] = useState<string>("");
  const [budgetConstraints, setBudgetConstraints] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call your function here
      await updateUserConstraints(
        userId,
        groupId,
        softConstraints,
        cuisineConstraints,
        budgetConstraints,
      );
      setStatus("Update successful!");
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error updating constraints.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Update User Constraints</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">User ID</label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Group ID</label>
          <input
            type="number"
            value={groupId}
            onChange={(e) => setGroupId(Number(e.target.value))}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Soft Constraints</label>
          <input
            type="text"
            value={softConstraints}
            onChange={(e) => setSoftConstraints(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Cuisine Constraints</label>
          <input
            type="text"
            value={cuisineConstraints}
            onChange={(e) => setCuisineConstraints(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Budget Constraints</label>
          <input
            type="text"
            value={budgetConstraints}
            onChange={(e) => setBudgetConstraints(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Constraints
        </button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
