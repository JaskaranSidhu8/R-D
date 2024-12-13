"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { checkAnyMemberReady } from "@/actions/functions";

type ConfirmGenerateProps = {
  groupId: number;
  onConfirm?: () => void;
};

const ConfirmGenerate: React.FC<ConfirmGenerateProps> = ({
  groupId,
  onConfirm,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(false);

  const handleGenerate = () => {
    setIsOpen(false); // Close the dialog
    if (onConfirm) onConfirm(); // Trigger the optional callback
    router.push(`/Analysis?groupId=${groupId}`); // Navigate to the Result page with groupId as a query parameter
  };

  useEffect(() => {
    const checkReadyStatus = async () => {
      const anyMemberReady = await checkAnyMemberReady(groupId);
      setIsEnabled(anyMemberReady);
    };

    checkReadyStatus();
    // Poll every 10 seconds to match your existing polling in GroupStatus
    const intervalId = setInterval(checkReadyStatus, 10000);

    return () => clearInterval(intervalId);
  }, [groupId]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button */}
      <AlertDialogTrigger asChild>
        <Button
          variant={isEnabled ? "default" : "disabled"}
          disabled={!isEnabled}
        >
          Generate
        </Button>
      </AlertDialogTrigger>

      {/* Dialog Content */}
      <AlertDialogContent className="w-[380px] rounded-xl bg-white border-primary">
        <div className="flex flex-col items-center justify-center space-y-8">
          <AlertDialogDescription className="text-left text-lg text-black">
            Are you sure you want generate?
          </AlertDialogDescription>

          <AlertDialogFooter className="flex flex-row justify-center items-center space-x-4 w-full">
            {/* Cancel Button */}
            <AlertDialogCancel asChild>
              <Button
                className="border-2 border-primary text-primary w-32 h-12 text-base"
                variant="outline"
              >
                Cancel
              </Button>
            </AlertDialogCancel>

            {/* Generate Button */}
            <AlertDialogAction asChild>
              <Button
                onClick={handleGenerate}
                className="bg-primary text-white w-32 h-12 text-base"
              >
                Generate
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmGenerate;
