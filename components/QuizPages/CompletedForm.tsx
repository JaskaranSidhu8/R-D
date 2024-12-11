"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useQuiz } from "@/context/QuizContext";
import { markUserReady } from "@/actions/functions";
import { fetchGroupCreatorUUID } from "@/actions/functions";
import { fetchMyUUID } from "@/actions/functions";
import createSupabaseServerClient from "@/lib/supabase/reader";

const CompletedForm = () => {
  const router = useRouter();
  const { groupId } = useQuiz();
  console.log("Group ID in completedForm:", groupId);

  // useEffect(() => {
  //   const markReadyAndRedirect = async () => {
  //     try {
  //       // Call the server-side function to mark the user as ready
  //       if (groupId) {
  //         await markUserReady(groupId);
  //         console.log("User successfully marked as ready.");
  //       } else {
  //         console.warn("Group ID is not available.");
  //       }
  //     } catch (error) {
  //       console.error("Failed to mark user as ready:", error);
  //     }

  //     // Redirect to the next page after a delay
  //     setTimeout(() => {
  //       router.push(`/StatusMgr/2?groupId=${groupId}`);
  //     }, 2000);
  //   };

  //   markReadyAndRedirect();
  // }, [router, groupId]);
  useEffect(() => {
    const markReadyAndRedirect = async () => {
      try {
        if (!groupId) {
          console.warn("Group ID is not available.");
          return;
        }

        // Mark the user as ready
        await markUserReady(groupId);
        console.log("User successfully marked as ready.");

        // Retrieve the logged-in user's UUID
        const userUUID = await fetchMyUUID();
        console.log("Logged-in user UUID:", userUUID);

        // Fetch the group creator's UUID
        const groupCreatorUUID = await fetchGroupCreatorUUID(groupId);
        console.log("Group creator UUID:", groupCreatorUUID);

        // Redirect based on whether the logged-in user is the group creator
        if (userUUID === groupCreatorUUID) {
          console.log("Redirecting to /StatusMgr/2...");
          router.push(`/StatusMgr/2?groupId=${groupId}`);
        } else {
          console.log("Redirecting to /StatusMbr/2...");
          router.push(`/StatusMbr/2?groupId=${groupId}`);
        }
      } catch (error) {
        console.error("Error during redirection:", error);
      }
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
