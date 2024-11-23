"use client";
import Aos from "aos";
import React, { useEffect } from "react";
import "aos/dist/aos.css";
import { ChatBubbleProps } from "./ConversationSection";

const ChatBubble = (convo: ChatBubbleProps) => {
  const { direction, bgcolour, msg, bordercolour } = convo;
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div
      data-aos={`fade-${direction === "left" ? "right" : "left"}`}
      data-aos-offset="130"
      data-aos-easing="ease-in-sine"
      className={`flex ${
        direction === "left" ? "justify-start" : "justify-end"
      } items-start space-x-2`}
    >
      <div
        className={`relative text-gray-800 px-4 py-3 rounded-3xl shadow-lg max-w-sm ${bgcolour}`}
      >
        <p>{msg}</p>
        <div
          className={`absolute -bottom-2 ${
            direction === "left" ? "left-3" : "right-3"
          } w-0 h-0 
          border-l-[12px] border-l-transparent 
          border-r-[12px] border-r-transparent 
          border-t-[12px] ${bordercolour}`}
        ></div>
      </div>
    </div>
  );
};

export default ChatBubble;
