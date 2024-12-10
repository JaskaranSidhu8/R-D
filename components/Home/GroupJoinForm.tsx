"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { checkCodeAndInsertUser } from "@/actions/functions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// type Props = {};

const GroupJoinForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = async (e: FormData) => {
    const { success, message } = await checkCodeAndInsertUser(e);
    if (success) router.push("/StatusMbr/1");
    else {
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
    }
  };
  return (
    <form action={(e) => onSubmit(e)} className=" grid grid-cols-3 gap-5">
      <Input
        name="code"
        required
        className=" rounded-full col-span-2"
        placeholder="Group Code"
      />
      <Button
        type="submit"
        variant={"outline"}
        className=" border-primary text-primary font-bold"
      >
        Join Group
      </Button>
    </form>
  );
};

export default GroupJoinForm;
