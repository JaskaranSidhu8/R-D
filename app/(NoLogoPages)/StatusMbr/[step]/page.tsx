import GroupStatus from "@/components/Status/GroupStatus";
import React from "react";

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
      <GroupStatus
        state={step === "1" ? "Makeyourchoices" : "Changeyourchoices"}
        groupId={Number(groupId)}
      />
    </div>
  );
};

export default page;
