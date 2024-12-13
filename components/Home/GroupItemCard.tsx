"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGroup } from "@/context/GroupContext";
import {
  fetchMyUUID,
  fetchGroupCreatorUUID,
  checkUserReadyStatus,
} from "@/actions/functions";

type Props = {
  item: any;
};

const GroupItemCard = (props: Props) => {
  const { item } = props;
  const router = useRouter();
  const { setGroupCode } = useGroup();
  const [isPressed, setIsPressed] = useState(false);

  const handleCardClick = async () => {
    setIsPressed(true);
    try {
      const userUUID = await fetchMyUUID();
      const groupCreatorUUID = await fetchGroupCreatorUUID(item.groups.id);
      const isReady = await checkUserReadyStatus(item.groups.id);

      const step = isReady ? "2" : "1";

      if (userUUID === groupCreatorUUID) {
        router.push(`/StatusMgr/${step}?groupId=${item.groups.id}`);
      } else {
        router.push(`/StatusMbr/${step}?groupId=${item.groups.id}`);
      }
    } catch (error) {
      console.error("Error during navigation:", error);
    } finally {
      setIsPressed(false); // Reset pressed state
    }
  };
  return (
    <Card
      className={`bg-transparent h-full border-primary shadow-primary border-2 shadow-md 
      active:bg-primary/10 active:scale-95 transition-all duration-200
      ${isPressed ? "bg-primary/10 scale-95" : ""}`}
      onClick={handleCardClick}
    >
      <CardContent className="pt-2 gap-3 h-full flex flex-col justify-center items-start">
        <h4 className="text-sm font-bold"> {item.groups.name} </h4>
        <h5 className="items-center flex flex-row gap-1 text-sm font-bold">
          <Users2Icon /> {item.groups.size}
        </h5>
        <div className="flex flex-col gap-0">
          <p className="text-tiny"> {item.groups.location}</p>
          <span className="text-tiny text-muted-foreground">
            {item.groups.created_at}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupItemCard;
