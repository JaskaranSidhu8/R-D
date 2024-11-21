'use client'
import React from "react";

type SectionTitleProps = {
  text: string;
  classname?: string;
};

const SectionTitle = (props: SectionTitleProps) => {
  return (
    <div className={`flex flex-col items-start ${props.classname}`}>
      <h2 className="montserrat mt-10 text-2xl">{props.text}</h2>
      <div className="w-full h-px mt-4 bg-gray-300 opacity-50"></div>
    </div>
  );
};

export default SectionTitle;
