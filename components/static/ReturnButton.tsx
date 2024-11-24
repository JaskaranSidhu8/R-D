import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  link?: string;
};

const ReturnButton = (props: Props) => {
  return (
    <Link href={props.link || "#"}>
      <ChevronLeftIcon />
    </Link>
  );
};

export default ReturnButton;
