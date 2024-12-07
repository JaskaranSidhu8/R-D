import Image from "next/image";
import "./orbital.css";
import React from "react";

const Orbital = () => {
  return (
    <div className=" absolute -bottom-1 left-1/2  -translate-x-1/2">
      <div
        style={{ "--n": 0 } as React.CSSProperties}
        className="  w-24 h-24 rounded-full absolute overflow-hidden bg-white ball origin-center"
      >
        <Image
          className=" w-full h-full object-cover "
          src={"https://picsum.photos/200/300?random=1"}
          alt="logo"
          width={800}
          height={800}
        />{" "}
      </div>
      <div
        style={{ "--n": 1 } as React.CSSProperties}
        className="w-24 h-24 rounded-full absolute overflow-hidden  bg-white border-2 border-primary ball origin-center"
      >
        <Image
          className=" w-full h-full object-cover "
          src={"/bk.png"}
          alt="logo"
          width={800}
          height={800}
        />{" "}
      </div>
      <div
        style={{ "--n": 2 } as React.CSSProperties}
        className=" w-24 h-24 rounded-full absolute overflow-hidden  ball origin-center  bg-white border-2 border-primary "
      >
        {" "}
        <Image
          className=" w-full h-full  object-cover "
          src={"/bk.png"}
          alt="logo"
          width={800}
          height={800}
        />{" "}
      </div>
      <div
        style={{ "--n": 3 } as React.CSSProperties}
        className=" w-24 h-24 rounded-full absolute overflow-hidden ball origin-center bg-white border-2 border-primary "
      >
        <Image
          src={"/McDo.png"}
          alt="logo"
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      <div
        style={{ "--n": 4 } as React.CSSProperties}
        className=" w-24 h-24 rounded-full absolute overflow-hidden bg-white ball origin-center border-2 border-primary"
      >
        <Image
          className=" w-full h-full object-cover "
          src={"https://picsum.photos/200/300?random=2"}
          alt="logo"
          width={800}
          height={800}
        />
      </div>
      <div
        style={{ "--n": 5 } as React.CSSProperties}
        className=" w-24 h-24 rounded-full absolute overflow-hidden  ball origin-center  bg-white border-2 border-primary "
      >
        <Image
          className=" w-full h-full object-cover "
          src={"/MB.png"}
          alt="logo"
          width={800}
          height={800}
        />{" "}
      </div>
      <div
        style={{ "--n": 6 } as React.CSSProperties}
        className=" w-24 h-24 rounded-full absolute overflow-hidden bg-white ball origin-center border-2 border-primary"
      >
        <Image
          className=" w-full h-full object-cover "
          src={"https://picsum.photos/200/300?random=3"}
          alt="logo"
          width={800}
          height={800}
        />
      </div>
      <div
        style={{ "--n": 7 } as React.CSSProperties}
        className=" w-24 h-24 rounded-full absolute overflow-hidden bg-white ball origin-center border-2 border-primary"
      >
        <Image
          className=" w-full h-full object-cover "
          src={"https://picsum.photos/200/300?random=4"}
          alt="logo"
          width={800}
          height={800}
        />
      </div>

      <svg
        width="560"
        height="246"
        viewBox="0 0 560 246"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.0777 122C10.854 151.329 38.4925 179.129 84.0874 200.513C133.916 223.883 203.175 238.5 280 238.5C356.825 238.5 426.084 223.883 475.912 200.513C521.507 179.129 549.146 151.329 553.922 122H560C549.999 190.438 428.461 244.5 280 244.5C131.539 244.5 10.0009 190.438 -0.00012207 122H6.0777Z"
          fill="#F17155"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M553.922 122.5C549.146 93.1713 521.508 65.3712 475.913 43.9869C426.084 20.6171 356.825 6 280 6C203.175 6 133.916 20.6171 84.0876 43.9869C38.4926 65.3712 10.8541 93.1713 6.07779 122.5H4.3161e-08C10.001 54.0617 131.539 0 280 0C428.461 0 549.999 54.0617 560 122.5H553.922Z"
          fill="#F17155"
        />
        <path
          d="M279 245.5C495.766 239.641 558.081 157.034 559.037 125.214L559 123C559.047 123.707 559.06 124.446 559.037 125.214L560 183.25V244.5L279 245.5Z"
          className=" fill-background"
        />
        <path
          d="M281 245.5C64.2344 239.641 1.91946 157.034 0.963257 125.214L1 123C0.95285 123.707 0.940155 124.446 0.963257 125.214L0 183.25V244.5L281 245.5Z"
          className=" fill-background"
        />
      </svg>
    </div>
  );
};

export default Orbital;
