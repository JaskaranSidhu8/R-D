import GroupJoinForm from "@/components/Home/GroupJoinForm";
import PreviousGroups from "@/components/Home/PreviousGroups";
import LogoutBtn from "@/components/static/LogoutBtn";
import React from "react";

// type Props = {};

const Home = () => {
  return (
    <div>
      <GroupJoinForm />
      <PreviousGroups />
      <br />
      <br />
      <LogoutBtn />
    </div>
  );
};

export default Home;
