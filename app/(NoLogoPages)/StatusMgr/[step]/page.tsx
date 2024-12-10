import ReturnButton from "@/components/static/ReturnButton";
import SectionTitle from "@/components/static/SectionTitle";
import GroupStatus from "@/components/Status/GroupStatus";
import React from "react";

type Props = {
  params: { step: string };
  searchParams: {
    day: string; //convert them to number later on
    hour: string;
  };
};

const StatusMgr: React.FC<Props> = ({ params, searchParams }) => {
  const { step } = params;
  const { day, hour } = searchParams;
  return (
    <div>
      <ReturnButton />
      <SectionTitle text="SaaS BOYS" />
      <GroupStatus
        state={step === "1" ? "Makeyourchoices" : "Changeyourchoices"}
        generate
      />
    </div>
  );
};

export default StatusMgr;
