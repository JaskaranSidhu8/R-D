import Link from "next/link";
import React from "react";

// type Props = {};

const Foter = () => {
  return (
    <footer className=" py-3">
      <div className="container  flex  flex-row  justify-end   px-5 mx-auto text-center text-tiny text-gray-600 space-x-4">
        <Link href="/faq" className="underline">
          FAQ
        </Link>
        <Link href="/terms" className="underline">
          Terms and Service
        </Link>
        <Link href="/help-center" className="underline">
          Help Center
        </Link>
      </div>
    </footer>
  );
};

export default Foter;
