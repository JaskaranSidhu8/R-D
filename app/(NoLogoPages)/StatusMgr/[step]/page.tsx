"use client";
import ReturnButton from "@/components/static/ReturnButton";
import SectionTitle from "@/components/static/SectionTitle";
import GroupStatus from "@/components/Status/GroupStatus";
import React from "react";
import Link from "next/link";
import { useGroup } from "@/context/GroupContext";

type Props = {
  params: { step: string };
  // searchParams: {
  //   groupId: string;
  // };
};

const StatusMgr: React.FC<Props> = ({ params }) => {
  const { step } = params;
  //const { groupId } = searchParams;
  const { contextGroupId, groupCode } = useGroup();

  //console.log("Search params received in StatusMgr:", searchParams); //debug line
  console.log("StatusMgr - Step:", step); // debug line
  //console.log("StatusMgr - Received groupId through paramams:", groupId); // debug line
  console.log("StatusMgr - Context Group ID:", contextGroupId);
  console.log("StatusMgr - Group Code from context:", groupCode);

  return (
    <div>
      <ReturnButton link="/Home" />
      {contextGroupId !== null && (
        <GroupStatus
          state={step === "1" ? "Makeyourchoices" : "Changeyourchoices"}
          generate
          groupId={contextGroupId} // Pass only when it's not null
        />
      )}
    </div>
  );
};

export default StatusMgr;
