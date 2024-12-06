"use client";
import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { logOut } from "@/actions/auth";
import { redirect } from "next/navigation";

type Props = {};

const LogoutBtn = (props: Props) => {
  const logoutHandler = async () => {
    await logOut().then(() => {
      redirect("/");
    });
  };
  return (
    <form action={logoutHandler}>
      <Button type="submit">
        <LogOut />
      </Button>
    </form>
  );
};

export default LogoutBtn;
