import Banner from "@/components/Home/Banner";
import GroupJoinForm from "@/components/Home/GroupJoinForm";
import PreviousGroups from "@/components/Home/PreviousGroups";
import LogoutBtn from "@/components/static/LogoutBtn";
import React from "react";

// type Props = {};

const Home = () => {
  return (
    <div>
      <Banner />
      <div className=" p-10">
        <GroupJoinForm />
        <PreviousGroups />
      </div>
    </div>
  );
};

export default Home;
