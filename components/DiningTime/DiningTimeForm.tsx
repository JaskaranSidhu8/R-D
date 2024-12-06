"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/static/SectionTitle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { filterRestaurantsByTime } from "@/utils/filterRestaurantsByTime";

const DiningTimeForm = () => {
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [canProceed, setCanProceed] = useState(false);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const weekdayToNumber = (day: string): number => {
    const weekdayMap: { [key: string]: number } = {
      wednesday: 3,
      monday: 1,
      tuesday: 2,
      thursday: 4,
      friday: 5,
      saturday: 6,
      sunday: 7,
    };
    return weekdayMap[day.toLowerCase()];
  };
  // Generate hours in 24-hour format
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  const timeToHour = (time: string): number => {
    return parseInt(time.split(":")[0]);
  };

  const checkRestaurants = async () => {
    try {
      const dayNumber = weekdayToNumber(day);
      const hour = timeToHour(time);
      console.log("Day input:", day);
      console.log("Converted day number:", dayNumber);
      console.log("Time input:", time);
      console.log("Converted hour:", hour);

      const restaurants = await filterRestaurantsByTime(dayNumber, hour, 0);
      console.log("Returned restaurants:", restaurants);

      if (restaurants.length < 10) {
        const proceed = window.confirm(
          `Warning: Only ${restaurants.length} restaurants are available at this time. Would you like to proceed anyway?`,
        );
        setCanProceed(proceed);
      } else {
        setCanProceed(true);
      }
    } catch (error) {
      console.error("Error checking restaurants:", error);
      alert("An error occurred while checking restaurant availability");
      setCanProceed(false);
    }
  };

  const isValid = day && time;

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-20 ">
      <SectionTitle text="Dining time" classname="mt-14" />

      <div className="mt-1 flex flex-col gap-4">
        <Select value={day} onValueChange={setDay}>
          <SelectTrigger
            className={`bg-white ${!day && "[&>span]:text-gray-500"}`}
          >
            <SelectValue placeholder="On which day of the week?" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {daysOfWeek.map((weekDay) => (
                <SelectItem key={weekDay} value={weekDay.toLowerCase()}>
                  {weekDay}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger
            className={`bg-white ${!time && "[&>span]:text-gray-500"}`}
          >
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour}>
                  {hour}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {isValid ? (
          canProceed ? (
            <Link
              href={{
                pathname: "/StatusMgr/1",
                query: {
                  day: weekdayToNumber(day).toString(),
                  hour: timeToHour(time).toString(),
                },
              }}
            >
              <Button className="w-full">Create group</Button>
            </Link>
          ) : (
            <Button onClick={checkRestaurants} className="mt-5">
              Create group
            </Button>
          )
        ) : (
          <Button
            onClick={() => alert("Please fill in both fields")}
            className="mt-5"
          >
            Create group
          </Button>
        )}
      </div>
    </div>
  );
};

export default DiningTimeForm;
