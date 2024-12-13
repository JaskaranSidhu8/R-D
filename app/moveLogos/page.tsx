"use client";
import React, { useState } from "react";
import { moveRestaurantLogos } from "@/actions/functions";

const MigrateLogosPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleMigration = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const result = await moveRestaurantLogos();

      //   if (result.success) {
      //     setMessage(result.message || "Logos migrated successfully.");
      //   } else {
      //     setError(result.error || "An unknown error occurred.");
      //   }
    } catch (err) {
      setError("Failed to migrate logos. Please try again.");
      console.error("Migration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Migrate Logos to Restaurants</h1>
      <button
        onClick={handleMigration}
        disabled={loading}
        className={`px-6 py-3 rounded-lg text-white font-medium ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Migrating..." : "Start Migration"}
      </button>

      {message && (
        <p className="mt-4 text-green-600 font-semibold">{message}</p>
      )}
      {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
    </div>
  );
};

export default MigrateLogosPage;
