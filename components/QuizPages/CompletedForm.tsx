"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

const CompletedForm = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/StatusMbr/2");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      {/* Check mark circle */}
      <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-6">
        <Check className="w-14 h-14 text-white" />
      </div>

      {/* Completion text */}
      <h2 className="text-xl text-center">
        You have successfully completed the quiz!
      </h2>
    </div>
  );
};

export default CompletedForm;
