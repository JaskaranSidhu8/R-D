"use client";

import React, { useState, useEffect } from "react";
//import StarRating from "/StarRating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as amplitude from "@amplitude/analytics-node";
import {
  updateReviewRating,
  getRestaurantDetails,
  getPendingRatings,
  fetchMyUserId,
  updateReviewExplanation,
} from "@/actions/functions";
import StarRating from "./StarRating";

// interface ReviewFormProps {
//   userId: number; // e.g., user_id: 4
// }

interface RestaurantDetails {
  name: string | null;
  logo: string | null;
  groupName: string | null;
}

const ReviewForm = () => {
  const [visited, setVisited] = useState<boolean | null>(null);
  const [rating, setRating] = useState(0);
  const [reason, setReason] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [restaurant, setRestaurant] = useState<RestaurantDetails | null>(null);
  const [groupUserId, setGroupUserId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shouldShow, setShouldShow] = useState(true);

  const handleGroupReviewButtonClick = async () => {
    // Track the event
    const userID_amplitude = await fetchMyUserId();
    amplitude.track("Group Review Button Clicked", undefined, {
      user_id: String(userID_amplitude),
    });
  };

  useEffect(() => {
    const fetchLatestRestaurant = async () => {
      const userId = await fetchMyUserId();
      const pendingRatings = await getPendingRatings(userId);

      console.log("Starting fetch with userId:", userId); //debug line

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
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setShouldShow(false);
      }, 5000); // 5 seconds

      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [isSubmitted]);

  const handleSubmit = async () => {
    if (!groupUserId) return;

    try {
      let success;

      if (visited) {
        // Case when user visited the restaurant
        success = await updateReviewRating(groupUserId, rating);
      } else {
        // Case when user did NOT visit the restaurant
        success = await updateReviewExplanation(groupUserId, reason);
      }

      if (success) {
        setIsSubmitted(true);
      } else {
        setError("Failed to submit response");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit response",
      );
    }
  };

  if (!restaurant || !shouldShow) return null;

  return (
    <div className="w-full max-w-md rounded-lg border border-primary p-4 mt-8">
      <p className="text-base mb-6">
        {restaurant.groupName}, we hope you had a great meal at{" "}
        {restaurant.name}! Did you visit as planned?
      </p>

      <div className="flex gap-2 mb-4 mt-3">
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
          onClick={() => {
            setVisited(false);
            handleGroupReviewButtonClick();
          }}
        >
          No, we didn&apos;t
        </Button>
      </div>

      {visited === true && !isSubmitted && (
        <div className="space-y-3">
          <p className="text-base">
            Great! We&apos;re glad to hear that you visited. How would you rate
            your experience?
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
    </div>
  );
};

export default ReviewForm;
