import GroupStatus from "@/components/Status/GroupStatus";
import React from "react";

type Props = {
  params: { step: string };
};

const page = (props: Props) => {
  const { step } = props.params;
  return (
    <div>
      <GroupStatus
        state={step === "1" ? "Makeyourchoices" : "Changeyourchoices"}
      />
    </div>
  );
};

export default page;
