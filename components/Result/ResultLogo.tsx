import Image from "next/image";
import React from "react";
type Props = {
  logo: string;
};

const ResultLogo = (props: Props) => {
  return (
    <div className=" absolute bottom-20 -translate-x-1/2 left-1/2 w-36 h-36  rounded-full overflow-hidden  z-50  border-4 border-primary  drop-shadow-2xl">
      <Image
        className=" w-full h-full"
        src={props.logo}
        width={400}
        height={400}
        alt="Logo Result"
      />
    </div>
  );
};

export default ResultLogo;
