import ReturnButton from "@/components/static/ReturnButton";
import SectionTitle from "@/components/static/SectionTitle";
import GroupStatus from "@/components/Status/GroupStatus";
import React from "react";

type Props = {};

const StatusMgr = (props: Props) => {
  return (
    <div>
      <ReturnButton />
      <SectionTitle text="SaaS BOYS" />
      <GroupStatus />
    </div>
  );
};

export default StatusMgr;
