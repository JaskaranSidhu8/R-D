'use client'
import { useState } from "react";
import React from 'react'
import { Input } from "../ui/input";

type Props = {}

const Password = (props: Props) => {
const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full pr-10"
        />
        <span 
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
    </div>
  )
}

export default Password