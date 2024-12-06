"use client";
import CallToAction from "@/components/landingpage/CallToAction";
import ConversationSection from "@/components/landingpage/ConversationSection";
import Diagram from "@/components/landingpage/Diagram";
import Header from "@/components/landingpage/Header";
import RestaurantFilter from "@/components/landingpage/testFilter";
import React from "react";
const Home: React.FC = () => {
  return (
    <main>
      {
        //<Header /> <ConversationSection /> <Diagram /> <CallToAction />
      }
      <RestaurantFilter />
    </main>
  );
};

export default Home;
