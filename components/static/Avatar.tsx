import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  link: string;
  img: string;
};

const Avatar = (props: Props) => {
  const { link, img } = props;
  return (
    <Link
      href={link}
      className=" w-12 h-12 border-2 border-primary aspect-square rounded-full overflow-hidden"
    >
      <Image
        src={img}
        width={200}
        height={200}
        alt="Avatar"
        className="  w-full h-full object-cover"
      />
    </Link>
  );
};

export default Avatar;
