import React from 'react'

type Props = {}

const PulsingPicture = (props: Props) => {
    return (
      <div className=" relative w-60 h-60 rounded-full  flex items-center justify-center">
      
          <img
            src={'/pulsingpicture.png'}
            alt="Profile Picture"
            className="w-full h-full object-cover rounded-full border-4 border-primary "
          />
     <div className="absolute -inset-0 rounded-full border-2 border-blue-500 animate-fade-pulse delay-[0ms]"></div>
      <div className="absolute -inset-1 rounded-full border-2 border-red-500 animate-fade-pulse delay-[1s]"></div>
      <div className="absolute -inset-2 rounded-full border-2 border-blue-300 animate-fade-pulse delay-[2s]"></div>
      <div className="absolute -inset-3 rounded-full border-2 border-red-300 animate-fade-pulse delay-[3s]"></div>

        
    
        </div>
      );  
    };

export default PulsingPicture