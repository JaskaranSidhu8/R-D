"use client";
import GroupStatus from "@/components/Status/GroupStatus";
import React from "react";
import ReturnButton from "@/components/static/ReturnButton";
import Link from "next/link";
import { useGroup } from "@/context/GroupContext";

type Props = {
  params: { step: string };
  // searchParams: {
  //   groupId: string;
  // };
};

const page = ({ params }: Props) => {
  const { step } = params;
  const { contextGroupId, groupCode } = useGroup();

  return (
    <div>
      <ReturnButton link="/Home" />
      {contextGroupId !== null && (
        <GroupStatus
          state={step === "1" ? "Makeyourchoices" : "Changeyourchoices"}
          groupId={contextGroupId} // Pass only when contextGroupId is not null
        />
      )}
    </div>
  );
};

export default page;
