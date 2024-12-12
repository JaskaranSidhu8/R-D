import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";

// Define a type for badge details
type Badge = {
  id: number;
  name: string;
  description: string;
  colorImageUrl: string; // URL for the colored badge
  bwImageUrl: string; // URL for the black-and-white badge
};

type BadgeCarouselProps = {
  achievedBadgeIds: number[]; // IDs of achieved badges
};

export const BadgeCarousel = ({ achievedBadgeIds }: BadgeCarouselProps) => {
  const [currentAchievedIds, setCurrentAchievedIds] = useState<number[]>([]);

  const badges: Badge[] = [
    {
      id: 1,
      name: "Badge 1",
      description: "Description 1",
      colorImageUrl:
        "https://uqcrymzvamkqgrpribjf.supabase.co/storage/v1/object/public/logos/burgerking.png?t=2024-12-07T23%3A50%3A47.798Z",
      bwImageUrl:
        "https://uqcrymzvamkqgrpribjf.supabase.co/storage/v1/object/public/logos/tortilla%20and%20co.png?t=2024-12-08T00%3A10%3A41.053Z",
    },
    {
      id: 2,
      name: "Badge 2",
      description: "Description 2",
      colorImageUrl:
        "https://uqcrymzvamkqgrpribjf.supabase.co/storage/v1/object/public/logos/burgerking.png?t=2024-12-07T23%3A50%3A47.798Z",
      bwImageUrl:
        "https://uqcrymzvamkqgrpribjf.supabase.co/storage/v1/object/public/logos/tortilla%20and%20co.png?t=2024-12-08T00%3A10%3A41.053Z",
    },
    {
      id: 3,
      name: "Badge 3",
      description: "Description 3",
      colorImageUrl:
        "https://uqcrymzvamkqgrpribjf.supabase.co/storage/v1/object/public/logos/burgerking.png?t=2024-12-07T23%3A50%3A47.798Z",
      bwImageUrl:
        "https://uqcrymzvamkqgrpribjf.supabase.co/storage/v1/object/public/logos/tortilla%20and%20co.png?t=2024-12-08T00%3A10%3A41.053Z",
    },
    {
      id: 4,
      name: "Badge 4",
      description: "Description 4",
      colorImageUrl:
        "https://uqcrymzvamkqgrpribjf.supabase.co/storage/v1/object/public/logos/burgerking.png?t=2024-12-07T23%3A50%3A47.798Z",
      bwImageUrl:
        "https://uqcrymzvamkqgrpribjf.supabase.co/storage/v1/object/public/logos/tortilla%20and%20co.png?t=2024-12-08T00%3A10%3A41.053Z",
    },
    {
      id: 5,
      name: "Badge 5",
      description: "Description 5",
      colorImageUrl:
        "https://uqcrymzvamkqgrpribjf.supabase.co/storage/v1/object/public/logos/burgerking.png?t=2024-12-07T23%3A50%3A47.798Z",
      bwImageUrl:
        "https://uqcrymzvamkqgrpribjf.supabase.co/storage/v1/object/public/logos/tortilla%20and%20co.png?t=2024-12-08T00%3A10%3A41.053Z",
    },
  ];

  useEffect(() => {
    // Update the state when achievedBadgeIds changes
    setCurrentAchievedIds(achievedBadgeIds);
  }, [achievedBadgeIds]);

  console.log("achieved badges:", achievedBadgeIds);

  return (
    <div>
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full"
      >
        <CarouselContent className="gap-3 p-4">
          {badges.map((badge) => (
            <CarouselItem
              className="flex flex-col items-center basis-1/2 aspect-square overflow-hidden rounded-lg p-4 shadow-md text-center"
              key={`badge_${badge.id}`}
            >
              <p className="text-lg font-bold">{badge.name}</p>
              <Image
                className="my-2 object-cover"
                width={400}
                height={400}
                src={
                  currentAchievedIds.includes(badge.id)
                    ? badge.colorImageUrl
                    : badge.bwImageUrl
                }
                alt={`Badge: ${badge.name}`}
              />
              <p className="text-sm text-gray-600">{badge.description}</p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BadgeCarousel;
