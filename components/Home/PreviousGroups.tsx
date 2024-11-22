import Link from "next/link";
import React from "react";
import PreviousGroupCarousel from "./PreviousGroupCarousel";

type Props = {};

export type CarouselDataType = {
  groupName: string;
  membersCount: number;
  lastPick: string;
  date: string;
};

const carouselData: CarouselDataType[] = [
  {
    groupName: "SaaS Boys",
    membersCount: 8,
    lastPick: "Dominoes Pizza",
    date: "Oct 24",
  },
  {
    groupName: "Engineers",
    membersCount: 4,
    lastPick: "PepeNero",
    date: "Sep 2",
  },
  {
    groupName: "Family Feast",
    membersCount: 6,
    lastPick: "Olive Garden",
    date: "Sep 2",
  },
  {
    groupName: "Marketing Gurus",
    membersCount: 5,
    lastPick: "The Burger Joint",
    date: "Oct 10",
  },
  {
    groupName: "Design Team",
    membersCount: 3,
    lastPick: "Café de Paris",
    date: "Nov 1",
  },
  {
    groupName: "Product Team",
    membersCount: 7,
    lastPick: "Sushi Express",
    date: "Aug 15",
  },
  {
    groupName: "Developers",
    membersCount: 10,
    lastPick: "Five Guys",
    date: "Jul 28",
  },
  {
    groupName: "Content Creators",
    membersCount: 4,
    lastPick: "Thai Spice",
    date: "Sep 18",
  },
  {
    groupName: "Operations Team",
    membersCount: 9,
    lastPick: "Burger King",
    date: "Oct 5",
  },
  {
    groupName: "HR Department",
    membersCount: 3,
    lastPick: "Panera Bread",
    date: "Nov 9",
  },
];

const PreviousGroups = (props: Props) => {
  return (
    <div className="mt-10">
      <div className=" mb-6 flex flex-row justify-between items-center">
        <h3 className=" montserrat  text-xl">Your previous groups</h3>
        <Link href={"/Home/AllGroups"} className=" text-muted-foreground">
          See all
        </Link>
      </div>
      <PreviousGroupCarousel items={carouselData} />
    </div>
  );
};

export default PreviousGroups;
