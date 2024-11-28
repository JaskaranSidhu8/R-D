import React from "react";
import SectionTitle from "@/components/static/SectionTitle";
import DiningTimeForm from "@/components/DiningTime/DiningTimeForm";
import ReturnButton from "@/components/static/ReturnButton";
import ScreenWrapper from "@/components/static/ScreenWrapper";


const DiningTimePage = () => {
  return (
    <div>
      <ReturnButton />
      <ScreenWrapper>
        <DiningTimeForm />
      </ScreenWrapper>
    </div>
  );
};

export default DiningTimePage;