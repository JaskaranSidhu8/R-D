// "use client";
// import React, { useState } from "react";
// import { updateUserConstraints } from "@/actions/functions";

// export default function UpdateUserConstraintsPage() {
//   const [userId, setUserId] = useState<number>(0);
//   const [groupId, setGroupId] = useState<number>(0);
//   const [softConstraints, setSoftConstraints] = useState<string>("");
//   const [cuisineConstraints, setCuisineConstraints] = useState<string>("");
//   const [budgetConstraints, setBudgetConstraints] = useState<string>("");
//   const [status, setStatus] = useState<string>("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       // Call your function here
//       await updateUserConstraints(
//         userId,
//         groupId,
//         softConstraints,
//         cuisineConstraints,
//         budgetConstraints,
//       );
//       setStatus("Update successful!");
//     } catch (error) {
//       console.error("Error:", error);
//       setStatus("Error updating constraints.");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Test Update User Constraints</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium">User ID</label>
//           <input
//             type="number"
//             value={userId}
//             onChange={(e) => setUserId(Number(e.target.value))}
//             className="border rounded px-2 py-1 w-full"
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Group ID</label>
//           <input
//             type="number"
//             value={groupId}
//             onChange={(e) => setGroupId(Number(e.target.value))}
//             className="border rounded px-2 py-1 w-full"
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Soft Constraints</label>
//           <input
//             type="text"
//             value={softConstraints}
//             onChange={(e) => setSoftConstraints(e.target.value)}
//             className="border rounded px-2 py-1 w-full"
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Cuisine Constraints</label>
//           <input
//             type="text"
//             value={cuisineConstraints}
//             onChange={(e) => setCuisineConstraints(e.target.value)}
//             className="border rounded px-2 py-1 w-full"
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Budget Constraints</label>
//           <input
//             type="text"
//             value={budgetConstraints}
//             onChange={(e) => setBudgetConstraints(e.target.value)}
//             className="border rounded px-2 py-1 w-full"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Update Constraints
//         </button>
//       </form>
//       {status && <p className="mt-4">{status}</p>}
//     </div>
//   );
// }

// "use client";
// import React, { useState } from "react";
// import { updateUserDetails } from "@/actions/functions";

// export default function UpdateUserDetailsPage() {
//   const [fullName, setFullName] = useState<string>("");
//   const [country, setCountry] = useState<string>("");
//   const [city, setCity] = useState<string>("");
//   const [status, setStatus] = useState<string>("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Create FormData for the request
//     const formData = new FormData();
//     formData.append("fullName", fullName);
//     formData.append("country", country);
//     formData.append("city", city);

//     try {
//       // Call the updateUserDetails function
//       const { success, error } = await updateUserDetails(formData);
//       if (success) {
//         setStatus("Update successful!");
//       } else {
//         setStatus(`Error: ${error}`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setStatus("An unexpected error occurred.");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Test Update User Details</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium">Full Name</label>
//           <input
//             type="text"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             className="border rounded px-2 py-1 w-full"
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Country</label>
//           <input
//             type="text"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             className="border rounded px-2 py-1 w-full"
//           />
//         </div>
//         <div>
//           <label className="block font-medium">City</label>
//           <input
//             type="text"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="border rounded px-2 py-1 w-full"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Update Details
//         </button>
//       </form>
//       {status && <p className="mt-4">{status}</p>}
//     </div>
//   );
// }

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
