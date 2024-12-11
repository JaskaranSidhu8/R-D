"use client";
import React, { useState } from "react";
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

type ConfirmGenerateProps = {
  groupId: number; // Pass groupId to navigate with it
  onConfirm?: () => void; // Optional callback for additional actions
};

const ConfirmGenerate: React.FC<ConfirmGenerateProps> = ({
  groupId,
  onConfirm,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleGenerate = () => {
    setIsOpen(false); // Close the dialog
    if (onConfirm) onConfirm(); // Trigger the optional callback
    router.push(`/Result?groupId=${groupId}`); // Navigate to the Result page with groupId as a query parameter
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button */}
      <AlertDialogTrigger asChild>
        <Button>Generate</Button>
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
