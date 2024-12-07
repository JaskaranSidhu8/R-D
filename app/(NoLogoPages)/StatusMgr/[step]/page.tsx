import ReturnButton from "@/components/static/ReturnButton";
import SectionTitle from "@/components/static/SectionTitle";
import GroupStatus from "@/components/Status/GroupStatus";
import React from "react";

type Props = {
  params: { step: string };
};

const StatusMgr: React.FC<Props> = ({ params }) => {
  const { step } = params;
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
