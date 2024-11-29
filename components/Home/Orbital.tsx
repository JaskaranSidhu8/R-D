import Image from "next/image";
import "./orbital.css";
import { Button } from "../ui/button";
type Props = {};

const Orbital = (props: Props) => {
  return (
    <div className=" absolute bottom-0 left-1/2  -translate-x-1/2">
      <div
        style={{ "--n": 0 } as React.CSSProperties}
        className=" w-20 h-20 rounded-full absolute bg-white ball origin-center"
      ></div>
      <div
        style={{ "--n": 1 } as React.CSSProperties}
        className=" w-20 h-20 rounded-full absolute bg-white border-2 border-primary ball origin-center"
      >
        <Image src={"/bk.png"} alt="logo" width={800} height={800} />{" "}
      </div>
      <div
        style={{ "--n": 2 } as React.CSSProperties}
        className=" w-20 h-20 rounded-full absolute  ball origin-center  bg-white border-2 border-primary "
      >
        {" "}
        <Image src={"/bk.png"} alt="logo" width={800} height={800} />{" "}
      </div>
      <div
        style={{ "--n": 3 } as React.CSSProperties}
        className=" w-20 h-20 rounded-full absolute ball origin-center bg-white border-2 border-primary "
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
        className=" w-20 h-20 rounded-full absolute bg-white ball origin-center"
      ></div>
      <div
        style={{ "--n": 5 } as React.CSSProperties}
        className=" w-20 h-20 rounded-full absolute  ball origin-center  bg-white border-2 border-primary "
      >
        <Image src={"/MB.png"} alt="logo" width={800} height={800} />{" "}
      </div>
      <div
        style={{ "--n": 6 } as React.CSSProperties}
        className=" w-20 h-20 rounded-full absolute bg-white ball origin-center"
      ></div>
      <div
        style={{ "--n": 7 } as React.CSSProperties}
        className=" w-20 h-20 rounded-full absolute bg-white ball origin-center"
      ></div>
      <svg
        width="560"
        height="245"
        viewBox="0 0 560 245"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="path"
          d="M557 122.5C557 138.421 549.637 153.825 535.839 168.097C522.027 182.384 501.896 195.387 476.787 206.372C426.579 228.338 357.006 242 280 242C202.994 242 133.421 228.338 83.2126 206.372C58.1037 195.387 37.9726 182.384 24.1606 168.097C10.3626 153.825 3 138.421 3 122.5C3 106.579 10.3626 91.1749 24.1606 76.9027C37.9726 62.616 58.1037 49.613 83.2126 38.6279C133.421 16.6616 202.994 3 280 3C357.006 3 426.579 16.6616 476.787 38.6279C501.896 49.613 522.027 62.616 535.839 76.9027C549.637 91.1749 557 106.579 557 122.5Z"
          stroke="#F17155"
          stroke-width="6"
        />
      </svg>
      <div className=" items-center justify-center mx-auto  w-2/3">
        {" "}
        <Button>Create a group</Button>
      </div>
    </div>
  );
};

export default Orbital;
