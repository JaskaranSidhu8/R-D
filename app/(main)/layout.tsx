import { checkLogin } from "@/actions/auth";
import Logo from "@/components/static/Logo";
import Link from "next/link";
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
      <div className="p-10 lg:max-w-sm lg:mx-auto">
        <div className="gradient h-[25vh] absolute top-0 left-0 w-full -z-10"></div>
        <div>
          <Link href="/">
            <Logo showText={false} big={false} />
          </Link>
        </div>
        {children}
      </div>
    </>
  );
}
