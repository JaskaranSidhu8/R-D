import React from "react";
import DiningTimeForm from "@/components/DiningTime/DiningTimeForm";
import ReturnButton from "@/components/static/ReturnButton";
import ScreenWrapper from "@/components/static/ScreenWrapper";

const DiningTimePage = () => {
  return (
    <div>
      <ReturnButton />
      <DiningTimeForm />
    </div>
  );
};

export default DiningTimePage;
