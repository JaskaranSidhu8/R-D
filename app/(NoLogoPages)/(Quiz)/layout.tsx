"use client";

import React from "react";
//import { QuizProvider } from "@/context/QuizContext";
import { QuizProvider } from "../../../context/QuizContext";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QuizProvider>{children}</QuizProvider>;
}
