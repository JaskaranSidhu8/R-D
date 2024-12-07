import { checkLogin } from "@/actions/auth";
import CallToAction from "@/components/landingpage/CallToAction";
import ConversationSection from "@/components/landingpage/ConversationSection";
import Diagram from "@/components/landingpage/Diagram";
import Header from "@/components/landingpage/Header";
import { redirect } from "next/navigation";
import React from "react";
const Home: React.FC = async () => {
  const isLogin = await checkLogin();
  if (isLogin) {
    redirect("/Home");
  }
  return (
    <main>
      <Header />
      <ConversationSection />
      <Diagram />
      <CallToAction />
    </main>
  );
};

export default Home;
