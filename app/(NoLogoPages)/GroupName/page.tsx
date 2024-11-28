"use client"

import React from "react"
import GroupNameForm from "@/components/GroupName/GroupNameForm"
import ReturnButton from "@/components/static/ReturnButton";
import ScreenWrapper from "@/components/static/ScreenWrapper" 

const GroupNamePage = () => { 
  return (
    <div>
      <ReturnButton />
      <ScreenWrapper>
        <GroupNameForm />
      </ScreenWrapper>
    </div>
  );
}

export default GroupNamePage

