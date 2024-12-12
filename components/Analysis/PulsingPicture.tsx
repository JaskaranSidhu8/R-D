"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PulsingPicture: React.FC = () => {
  const [percentage, setPercentage] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams?.get("groupId"); // Retrieve groupId from query parameters

  useEffect(() => {
    if (!groupId) {
      console.error("Group ID is missing from query parameters!");
      return;
    }

    const intervals = [200, 400, 600, 300, 500]; // Slower update intervals in milliseconds
    const increments = [1, 5, 3, 3, 4]; // Smaller increments for slower progress
    let index = 0; // Track which speed/increment to use

    const updatePercentage = () => {
      setPercentage((prev) => {
        if (prev < 100) {
          const increment = increments[index % increments.length]; // Cycle through increments
          index++;
          return Math.min(prev + increment, 100); // Ensure it doesn't exceed 100
        }
        return prev;
      });

      if (percentage < 100) {
        // Set a timeout with the next interval speed
        setTimeout(updatePercentage, intervals[index % intervals.length]);
      }
    };

    updatePercentage();
  }, [groupId]); // Ensure groupId is included in the dependencies

  useEffect(() => {
    if (percentage === 100 && groupId) {
      router.push(`/Result?groupId=${groupId}`);
    }
  }, [percentage, groupId, router]);

  if (!groupId) {
    // Render a fallback if groupId is missing
    return (
      <div className="p-4">
        <p>Error: Group ID is required to proceed.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="relative w-60 h-60 rounded-full flex items-center justify-center">
        <p className="montserrat text-2xl font-medium flex flex-col items-center">
          <span>Analysis</span>
          <span>{percentage}%</span>
        </p>

        <div className="absolute -inset-0 rounded-full border-2 border-primary/60 animate-fade-pulse delay-[0ms]"></div>
        <div className="absolute -inset-1 rounded-full border-2 border-primary/50 animate-fade-pulse delay-[2s]"></div>
        <div className="absolute -inset-2 rounded-full border-2 border-primary/40 animate-fade-pulse delay-[4s]"></div>
        <div className="absolute -inset-3 rounded-full border-2 border-primary/30 animate-fade-pulse delay-[6s]"></div>
      </div>

      <div className="mt-14 text-center">
        <span>Finding the best restaurant for SaaS Boys...</span>
      </div>
    </div>
  );
};

export default PulsingPicture;
