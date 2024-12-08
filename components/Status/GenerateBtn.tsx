"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const RefuseButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      {/* Button to trigger the AlertDialog */}
      <Button
        variant={"outline"}
        className="text-primary border-primary shadow-none border-2"
        onClick={openDialog}
      >
        Generate
      </Button>

      {/* Alert Dialog */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className=" h-1/4 w-5/6 rounded-md border-primary border-2">
          <AlertDialogHeader>
            <AlertDialogDescription className=" text-left"></AlertDialogDescription>
            <AlertDialogTitle className=" text-left text-primary">
              Are you sure you want generate?{" "}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row  justify-center items-center space-x-10 flex-auto">
            <AlertDialogAction
              className=" border-2 border-primary outline"
              onClick={() => {
                closeDialog();
                console.log("Refused");
              }}
            >
              Generate
            </AlertDialogAction>
            <AlertDialogCancel
              className=" border-primary text-primary"
              onClick={closeDialog}
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RefuseButton;
