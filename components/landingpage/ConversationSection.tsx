import React from "react";
import ChatBubble from "./ChatBubble";

export type ChatBubbleProps = {
  msg: string;
  bgcolour: string;
  direction: string;
  bordercolour: string;
};

// type Props = {};

const Conversation: ChatBubbleProps[] = [
  {
    msg: "Let's go to McDonald's",
    bgcolour: "bg-white",
    bordercolour: "border-t-white",
    direction: "left",
  },
  {
    msg: "I think Burger King is better",
    bgcolour: "bg-red-100",
    direction: "right",
    bordercolour: "border-t-red-100",
  },
  {
    msg: "We ate that last time...",
    bgcolour: "bg-white",
    direction: "left",
    bordercolour: "border-t-white",
  },
  {
    msg: "Guys, I can't eat Gluten",
    bgcolour: "bg-blue-50",
    direction: "left",
    bordercolour: "border-t-blue-50",
  },
  {
    msg: "Where should we go then?",
    bgcolour: "bg-red-100",
    direction: "right",
    bordercolour: "border-t-red-100",
  },
  {
    msg: "I don't know...",
    bgcolour: "bg-blue-50",
    direction: "left",
    bordercolour: "border-t-blue-50",
  },
  {
    msg: "we need to decide guys !",
    bgcolour: "bg-red-100",
    direction: "right",
    bordercolour: "border-t-red-100",
  },
  {
    msg: "it's 23:50 pm and this stupid animation still not working ..",
    bgcolour: "bg-red-100",
    direction: "right",
    bordercolour: "border-t-red-100",
  },
];

const ConversationSection = () => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="w-full space-y-5 px-5">
        {Conversation.map((bubble, index) => (
          <ChatBubble
            key={`chat_bubble_${index}`}
            msg={bubble.msg}
            bgcolour={bubble.bgcolour}
            direction={bubble.direction}
            bordercolour={bubble.bordercolour}
          />
        ))}
      </div>
      <p className="block text-center text-blue-900 italic mt-10">
        ...average group chat without Tiebreaker.
      </p>
    </div>
  );
};

export default ConversationSection;
