"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import SectionTitle from "@/components/static/SectionTitle"

const GroupNameForm = () => {
  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto px-6">
      <SectionTitle text="Give your group a name!" classname="mt-8" />
      
      <div className="mt-4 flex flex-col gap-4">
        <Input 
          type="text"
          placeholder="Group Name"
        />
        <Button className="w-full mt-4">
          Next
        </Button>
      </div>
    </div>
  )
}

export default GroupNameForm
