"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { checkCodeAndInsertUser } from "@/actions/functions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useGroup } from "@/context/GroupContext";
// type Props = {};

const GroupJoinForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { setGroupCode } = useGroup();

  const onSubmit = async (e: FormData) => {
    const code = e.get("code") as string;
    const { success, message, groupId } = await checkCodeAndInsertUser(e);
    if (success) {
      setGroupCode(code); // Set the code in context before navigation
      console.log("Setting group code in context:", code);
      router.push(`/StatusMbr/1?groupId=${groupId}`);
    } else {
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
