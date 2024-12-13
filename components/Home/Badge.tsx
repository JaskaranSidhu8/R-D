"use client";
import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import {
  getUserBadgesDisplay,
  getUserBadgesDisplayGray,
} from "@/actions/functions";
import SectionTitle from "../static/SectionTitle";

// Define a type for badge details
type Badge = {
  isAchieved: any;
  id: number;
  name: string;
  description: string;
  colorImageUrl: string; // URL for the colored badge
  bwImageUrl: string; // URL for the black-and-white badge
};

type BadgeCarouselProps = {
  userId: number; // Pass the user ID to fetch badges
};

export const BadgeCarousel = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBadges = async () => {
      setLoading(true);
      setError(null);

      try {
        const [achievedBadges, unachievedBadges] = await Promise.all([
          getUserBadgesDisplay(),
          getUserBadgesDisplayGray(),
        ]);

        if (achievedBadges.error || unachievedBadges.error) {
          setError("Failed to fetch badges.");
          return;
        }

        // Merge the lists: Achieved badges first, followed by unachieved badges
        const mergedBadges = [
          ...achievedBadges.badges.map((badge) => ({
            ...badge,
            isAchieved: true,
          })),
          ...unachievedBadges.badges.map((badge) => ({
            ...badge,
            isAchieved: false,
          })),
        ];

        setBadges(mergedBadges);
      } catch (err) {
        console.error("An error occurred while fetching badges:", err);
        setError("An error occurred while fetching badges.");
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  if (loading) {
    return <div>Loading badges...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3 className=" montserrat  text-xl mt-4">Your Badges</h3>
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full"
      >
        <CarouselContent className="gap-3 p-4">
          {badges.map((badge) => (
            <CarouselItem
              className={`flex flex-col items-center basis-1/2  overflow-hidden rounded-lg p-6 shadow-md text-center border-2 border-primary object-contain ${
                badge.isAchieved ? "bg-white" : "bg-gray-100"
              }`}
              key={`badge_${badge.id}`}
            >
              <Image
                className="my-2 object-cover"
                width={170}
                height={170}
                src={badge.isAchieved ? badge.colorImageUrl : badge.bwImageUrl}
                alt={`Badge: ${badge.name}`}
              />
              <p
                className={`text-lg font-bold ${badge.isAchieved ? "" : "text-gray-500"}`}
              >
                {badge.name}
              </p>
              <p
                className={`text-sm ${badge.isAchieved ? "text-gray-600" : "text-gray-400"}`}
              >
                {badge.description}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BadgeCarousel;
