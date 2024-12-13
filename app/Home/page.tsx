import Banner from "@/components/Home/Banner";
import GroupJoinForm from "@/components/Home/GroupJoinForm";
import PreviousGroups from "@/components/Home/PreviousGroups";
import Avatar from "@/components/static/Avatar";
import Logo from "@/components/static/Logo";
import LogoutBtn from "@/components/static/LogoutBtn";
import React from "react";

// type Props = {};

const Home = () => {
  return (
    <div>
      <div className=" absolute top-0 w-full z-50 p-3 flex flex-row justify-between items-center">
        <Logo showText={false} big={false} />
        <Avatar link="/Settings" img="/defaultAvatar.png" />
      </div>
      <Banner />
      <div className=" p-10">
        <GroupJoinForm />
        <PreviousGroups />
      </div>
    </div>
  );
};

export default Home;
