"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useQuiz } from "@/context/QuizContext";
import { markUserReady } from "@/actions/functions";

const CompletedForm = () => {
  const router = useRouter();
  const { groupId } = useQuiz();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.push(`/StatusMgr/2?groupId=${groupId}`);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, [router]);

  useEffect(() => {
    const markReadyAndRedirect = async () => {
      try {
        // Call the server-side function to mark the user as ready
        if (groupId) {
          await markUserReady(groupId);
          console.log("User successfully marked as ready.");
        } else {
          console.warn("Group ID is not available.");
        }
      } catch (error) {
        console.error("Failed to mark user as ready:", error);
      }

      // Redirect to the next page after a delay
      setTimeout(() => {
        router.push(`/StatusMgr/2?groupId=${groupId}`);
      }, 2000);
    };

    markReadyAndRedirect();
  }, [router, groupId]);

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
