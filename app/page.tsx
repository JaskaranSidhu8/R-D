import CallToAction from "@/components/landingpage/CallToAction";
import ConversationSection from "@/components/landingpage/ConversationSection";
import Diagram from "@/components/landingpage/Diagram";
import Header from "@/components/landingpage/Header";
import React from "react";
const Home: React.FC = () => {
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
