"use client";
import React, { useState } from "react";
import { getDiningTimeDetails } from "@/actions/functions"; // Adjust the import path as needed

const DiningTimeChecker: React.FC = () => {
  const [groupId, setGroupId] = useState<number>(0);
  const [result, setResult] = useState<{
    hour: number;
    minute: number;
    day: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckDiningTime = async () => {
    setError(null); // Clear any previous errors
    setResult(null); // Clear previous results

    if (!groupId) {
      setError("Please enter a valid group ID.");
      return;
    }

    try {
      const data = await getDiningTimeDetails(groupId);
      if (data) {
        setResult(data);
      } else {
        setError("No data found for the provided group ID.");
      }
    } catch (err) {
      setError("An error occurred while fetching dining time details.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-100 rounded-md shadow-md">
      <h1 className="text-xl font-bold text-gray-700 mb-4">
        Dining Time Checker
      </h1>
      <div className="mb-4">
        <label htmlFor="groupId" className="block text-gray-600 mb-1">
          Group ID:
        </label>
        <input
          type="number"
          id="groupId"
          value={groupId}
          onChange={(e) => setGroupId(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter Group ID"
        />
      </div>
      <button
        onClick={handleCheckDiningTime}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Check Dining Time
      </button>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {result && (
        <div className="mt-4 p-4 bg-white rounded-md shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">
            Dining Time Details:
          </h2>
          <p className="text-gray-600">
            <strong>Hour:</strong> {result.hour}
          </p>
          <p className="text-gray-600">
            <strong>Minute:</strong> {result.minute}
          </p>
          <p className="text-gray-600">
            <strong>Day:</strong> {result.day}
          </p>
        </div>
      )}
    </div>
  );
};

export default DiningTimeChecker;
