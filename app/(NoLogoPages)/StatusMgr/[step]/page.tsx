import ReturnButton from "@/components/static/ReturnButton";
import GroupStatus from "@/components/Status/GroupStatus";
import React from "react";

type Props = {
  params: { step: string };
  searchParams: {
    groupId: string;
  };
};

const StatusMgr: React.FC<Props> = ({ params, searchParams }) => {
  const { step } = params;
  const { groupId } = searchParams;

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
