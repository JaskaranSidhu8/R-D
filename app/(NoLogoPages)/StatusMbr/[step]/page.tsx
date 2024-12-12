import GroupStatus from "@/components/Status/GroupStatus";
import React from "react";
import ReturnButton from "@/components/static/ReturnButton";
import Link from "next/link";

type Props = {
  params: { step: string };
  searchParams: {
    groupId: string;
  };
};

const page = ({ params, searchParams }: Props) => {
  const { step } = params;
  const { groupId } = searchParams;

  return (
    <div>
      <ReturnButton link="/Home" />
      <GroupStatus
        state={step === "1" ? "Makeyourchoices" : "Changeyourchoices"}
        groupId={Number(groupId)}
      />
    </div>
  );
};

export default page;
