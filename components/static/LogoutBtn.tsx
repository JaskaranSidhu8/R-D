"use client";
import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { logOut } from "@/actions/auth";
import { redirect } from "next/navigation";
import { NavigationLink } from "../Settings/NavigationLink";

const LogoutBtn = () => {
  const logoutHandler = async () => {
    await logOut().then(() => {
      redirect("/");
    });
  };
  return (
    <form action={logoutHandler}>
      <NavigationLink icon={LogOut} label="Log out" />
    </form>
  );
};

export default LogoutBtn;
