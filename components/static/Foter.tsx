import React from "react";

type Props = {};

const Foter = (props: Props) => {
  return (
    <footer>
      <div className="container mx-auto text-center text-sm text-gray-600 space-x-4">
        <a href="/faq" className="hover:underline">
          FAQ
        </a>
        <a href="/terms" className="hover:underline">
          Terms and Service
        </a>
        <a href="/help-center" className="hover:underline">
          Help Center
        </a>
      </div>
    </footer>
  );
};

export default Foter;
