// import Foter from "@/components/static/Foter";
import { checkLogin } from "@/actions/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogin = await checkLogin();
  if (!isLogin) {
    redirect("/");
  }
  return (
    <>
      <div className="p-10">
        <div className="gradient h-[25vh] absolute top-0 left-0 w-full -z-10"></div>
        {children}
      </div>
    </>
  );
}
