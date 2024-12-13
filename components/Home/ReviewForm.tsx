"use client";

import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  updateReviewRating,
  getRestaurantDetails,
  getPendingRatings,
} from "@/actions/functions";

interface ReviewFormProps {
  userId: number; // e.g., user_id: 4
}

interface RestaurantDetails {
  name: string | null; // Updated to match the return type
  logo: string | null; // Updated to match the return type
}

const ReviewForm = ({ userId }: ReviewFormProps) => {
  const [visited, setVisited] = useState<boolean | null>(null);
  const [rating, setRating] = useState(0);
  const [reason, setReason] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [restaurant, setRestaurant] = useState<RestaurantDetails | null>(null);
  const [groupUserId, setGroupUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchLatestRestaurant = async () => {
      console.log("Starting fetch with userId:", userId); //debug line

      const pendingRatings = await getPendingRatings(userId);

      console.log("Pending ratings received:", pendingRatings); //debug line

      if (pendingRatings && pendingRatings.length > 0) {
        // Get the latest pending rating (last in the array)
        const latestGroupUserId = pendingRatings[pendingRatings.length - 1];
        console.log("Latest group user ID:", latestGroupUserId); //debug line
        setGroupUserId(latestGroupUserId);

        // Get restaurant details for this rating
        const details = await getRestaurantDetails(
          latestGroupUserId.toString(),
        );
        console.log("Restaurant details received:", details); //debug
        if (details) {
          setRestaurant(details);
        }
      }
    };

    fetchLatestRestaurant();
  }, [userId]);

  const handleSubmit = async () => {
    if (!groupUserId) return;

    if (visited) {
      const success = await updateReviewRating(groupUserId, rating);
      if (success) {
        setIsSubmitted(true);
      } else {
        alert("Failed to submit rating");
      }
    }
    // we need to handle the "No" case here as well, later on
  };

  return (
    <div className="w-full max-w-md rounded-lg border border-primary p-4">
      {" "}
      {/* Adjusted padding */}
      {restaurant ? (
        <>
          <p className="text-base mb-3">
            {" "}
            SaaS Boys, we hope you had a great meal at {restaurant.name}! Did
            you visit as planned?
          </p>

          <div className="flex gap-2 mb-4">
            {" "}
            <Button
              variant={visited === true ? "default" : "outline"}
              className={`text-sm py-2 ${
                visited === true
                  ? ""
                  : "border-primary text-primary hover:text-primary"
              }`}
              onClick={() => setVisited(true)}
            >
              Yes, we visited!
            </Button>
            <Button
              variant={visited === false ? "default" : "outline"}
              className={`text-sm py-2 ${
                visited === false
                  ? ""
                  : "border-primary text-primary hover:text-primary"
              }`}
              onClick={() => setVisited(false)}
            >
              No, we didn&apos;t
            </Button>
          </div>

          {visited === true && !isSubmitted && (
            <div className="space-y-3">
              {" "}
              <p className="text-base">
                Great! We&apos;re glad to hear that you visited. How would you
                rate your experience?
              </p>
              <div className="flex justify-center">
                <StarRating value={rating} onChange={setRating} />
              </div>
              {rating > 0 && (
                <Button className="w-full text-sm" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </div>
          )}

          {visited === false && !isSubmitted && (
            <div className="space-y-3">
              {" "}
              <p className="text-base">
                We&apos;re sorry to hear that, could you let us know why?
              </p>
              <Input
                placeholder="Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="text-sm"
              />
              <Button
                className="w-full text-sm"
                onClick={handleSubmit}
                disabled={!reason.trim()}
              >
                Submit
              </Button>
            </div>
          )}

          {isSubmitted && (
            <p className="text-base text-center mt-3">
              Thank you for helping us improve Tiebreaker!
            </p>
          )}
        </>
      ) : (
        <p className="text-sm">Loading restaurant details...</p>
      )}
    </div>
  );
};

export default ReviewForm;
