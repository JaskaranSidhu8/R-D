"use client";
//import React from "react";
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import MemberStatus from "./MemberStatus";
import { Link2Icon } from "lucide-react";
import Link from "next/link";
import * as amplitude from "@amplitude/analytics-node";
import { fetchUserStatusInGroup } from "@/actions/functions";
import SectionTitle from "../static/SectionTitle";

type Props = {
  state: "Makeyourchoices" | "Changeyourchoices";
  generate?: boolean;
  groupId: number;
};
export type MemberCardProps = {
  fullname: string;
  email?: string;
  profilePicture?: string;
  readiness: "ready" | "busy";
};

// For Monitoring (Amplitude)
const handleRestaurantGenerationButtonClick = () => {
  // Track the event
  amplitude.track("Restaurant Generated Button Clicked", undefined, {
    user_id: "user@amplitude.com",
  });
};
type Member = {
  id: number;
  user_id: number;
  group_id: number;
  isready: boolean | null;
  budget: string | null;
  groups: {
    id: number;
    created_at: string | null;
    name: string | null;
    size: number | null;
  } | null;
  users: {
    id: number;
    firstName: string | null; // Allow null
    lastName: string | null; // Allow null
    profilePicture?: string | null;
  } | null;
};

const GroupStatus: React.FC<Props> = ({ state, generate, groupId }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  // Fetch members when the component mounts or groupId changes
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersData = await fetchUserStatusInGroup(groupId);
        setMembers(membersData || []);

        // Extract the group name from the first member's group
        if (membersData.length > 0 && membersData[0].groups?.name) {
          setGroupName(membersData[0].groups.name);
        }
      } catch (error) {
        console.error("Failed to fetch group members:", error);
      }
    };

    fetchMembers();
  }, [groupId]); // Dependency array ensures this runs when groupId changes
  return (
    <div>
      {" "}
      {/* <SectionTitle text={groupName || "Loading..."} /> */}
      <div className=" mt-2 items-center space-y-4  ">
        {" "}
        <h1 className="montserrat mt-10 text-3xl mb-2">
          {groupName || "Loading..."}
        </h1>
        <span>It&apos;s time to invite your members </span>
        <Button
          className=" font-bold text-primary shadow-none border-primary border-2 "
          variant={"outline"}
        >
          Copy Link <Link2Icon />
        </Button>
        {/* <Card className=" w-full   h-[417px]  p-3 space-y-3 overflow-y-scroll bg-gray-50 border border-primary  items-center  shadow-md shadow-primary rounded-[20px]">
          {profileCardDummyData.map((item, index) => (
            <MemberStatus member={item} key={`member_status_${index}`} />
          ))}
        </Card> */}
        <Card className="w-full h-[417px] p-3 space-y-3 overflow-y-scroll bg-gray-50 border border-primary items-center shadow-md shadow-primary rounded-[20px]">
          {members.map((member) => (
            <MemberStatus
              key={member.id}
              member={{
                fullname: `${member.users?.firstName || "Unknown"} ${
                  member.users?.lastName || "User"
                }`,
                readiness: member.isready ? "ready" : "busy",
                profilePicture:
                  member.users?.profilePicture || "/avatarpinkwoman.png",
              }}
            />
          ))}
        </Card>
        {state === "Makeyourchoices" && (
          <Link href={`/Cuisine?groupId=${groupId}`} className="mt-4 block">
            <Button
              className="font-bold shadow-none border-primary text-primary"
              variant={"outline"}
            >
              Make your choices
            </Button>
          </Link>
        )}
        {generate && (
          <Button
            className="font-bold"
            onClick={() => {
              handleRestaurantGenerationButtonClick();
            }}
          >
            Generate
          </Button>
        )}
        {state === "Changeyourchoices" && (
          // <Button className="font-bold shadow-none" variant={"link"}>
          //   Change your choices
          // </Button>
          <Link href={`/Cuisine?groupId=${groupId}`} className="mt-4 block">
            <Button className="font-bold shadow-none" variant={"link"}>
              Change your choices
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default GroupStatus;
