// Container Component for fetching and passing badge data
import React, { useEffect, useState } from "react";
import BadgeCarousel from "./BadgesCarousel"; // Import BadgeCarousel
import { getUserBadges } from "@/actions/functions"; // Fetches user badges

type BadgeContainerProps = {
  userId: number;
};

type Badge = {
  id: number;
  name: string;
  description: string;
  colorImageUrl: string; // URL for the colored badge
  bwImageUrl: string; // URL for the black-and-white badge
};

const BadgeContainer = ({ userId }: BadgeContainerProps) => {
  const [achievedBadgeIds, setAchievedBadgeIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievedBadges = async () => {
      setLoading(true);
      setError(null);
      try {
        const { badges, error } = await getUserBadges(userId);
        if (error) {
          setError("Failed to fetch badges.");
          return;
        }
        setAchievedBadgeIds(badges);
      } catch (err) {
        setError("An error occurred while fetching badges.");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievedBadges();
  }, []);

  if (loading) {
    return <div>Loading badges...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <BadgeCarousel achievedBadgeIds={achievedBadgeIds} />;
};

export default BadgeContainer;
