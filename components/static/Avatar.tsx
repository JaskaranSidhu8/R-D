"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getUserAvatarUrl } from "@/actions/avatarfunctions";

type Props = {
  link: string;
  img: string;
};

const Avatar = (props: Props) => {
  const { link, img } = props;
  const [avatarUrl, setAvatarUrl] = useState<string>("transparent.jpg");
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const url = await getUserAvatarUrl();
        if (url) {
          setAvatarUrl(url);
        } else {
          setAvatarUrl("defaultAvatar");
        }
      } catch (error) {
        console.error("Error fetching avatar:", error);
        // Keep default avatar if there's an error
      }
    };

    fetchAvatar();
  }, []);
  return (
    <Link
      href={link}
      className=" w-12 h-12 border-2 border-primary aspect-square rounded-full overflow-hidden"
    >
      <Image
        src={avatarUrl}
        width={200}
        height={200}
        alt="Avatar"
        className="  w-full h-full object-cover"
      />
    </Link>
  );
};

export default Avatar;
