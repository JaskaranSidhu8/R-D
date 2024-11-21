import GroupJoinForm from "@/components/Home/GroupJoinForm";
import PreviousGroups from "@/components/Home/PreviousGroups";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <GroupJoinForm />
      <PreviousGroups />
    </div>
  );
};

export default Home;
