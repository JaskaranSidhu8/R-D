import React from "react";

// type Props = {};

const PulsingPicture = () => {
  return (
    <div className=" relative w-60 h-60 rounded-full  flex items-center justify-center">
      <img
        src={"/pulsingpicture.png"}
        alt="Profile Picture"
        className="w-full h-full object-cover rounded-full border-2 border-primary z-10 "
      />

      <div className="absolute -inset-0 rounded-full border-2 border-primary/60 animate-fade-pulse delay-[0ms]"></div>
      <div className="absolute -inset-1 rounded-full border-2 border-primary/50 animate-fade-pulse delay-[2s]"></div>
      <div className="absolute -inset-2 rounded-full border-2 border-primary/40 animate-fade-pulse delay-[4s]"></div>
      <div className="absolute -inset-3 rounded-full border-2 border-primary/30 animate-fade-pulse delay-[6s]"></div>
    </div>
  );
};

export default PulsingPicture;
