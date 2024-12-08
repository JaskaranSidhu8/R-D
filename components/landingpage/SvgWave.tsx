import React from "react";

const SvgWave = () => {
  return (
    <svg
      className=" absolute -bottom-1 left-1/2 -translate-x-1/2 "
      width="581"
      height="150"
      viewBox="0 0 581 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M580 149C580 66.7096 450.163 0 290 0C129.837 0 0 66.7096 0 149H580Z"
        className=" fill-background"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M574.243 149.072H580.243V143.072C580.243 103.181 547.58 66.7693 493.633 40.7434C439.346 14.553 366.139 2.86102e-06 290.122 0C214.104 -2.86102e-06 140.898 14.553 86.6102 40.7434C32.6637 66.7693 1.43051e-05 103.181 1.90735e-06 143.072L0 149.072H6H6.26731C6.08971 147.082 6 145.082 6 143.072C6 67.369 133.206 6 290.122 6C447.038 6 574.243 67.369 574.243 143.072C574.243 145.082 574.154 147.082 573.976 149.072H574.243Z"
        fill="#EE4D2A"
      />
    </svg>
  );
};

export default SvgWave;
