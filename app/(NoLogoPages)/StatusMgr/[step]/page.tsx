"use client";
import ReturnButton from "@/components/static/ReturnButton";
import SectionTitle from "@/components/static/SectionTitle";
import GroupStatus from "@/components/Status/GroupStatus";
import React from "react";
import Link from "next/link";
import { useGroup } from "@/context/GroupContext";

type Props = {
  params: { step: string };
  searchParams: {
    groupId: string;
  };
};

const StatusMgr: React.FC<Props> = ({ params, searchParams }) => {
  const { step } = params;
  const { groupId } = searchParams;
  const { groupId: contextGroupId, groupCode } = useGroup();

  console.log("Search params received in StatusMgr:", searchParams); //debug line
  console.log("StatusMgr - Step:", step); // debug line
  console.log("StatusMgr - Received groupId:", groupId); // debug line
  console.log("StatusMgr - Group Code from context:", groupCode);

  return (
    <div>
      <ReturnButton link="/Home" />
      <GroupStatus
        state={step === "1" ? "Makeyourchoices" : "Changeyourchoices"}
        generate
        groupId={Number(groupId)}
      />
    </div>
  );
};

export default StatusMgr;
