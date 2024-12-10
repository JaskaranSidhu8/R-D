import React from "react";
import Link from "next/link";

interface NavigationLinkProps {
  href?: string;
  icon: React.ElementType;
  label: string;
  destructive?: boolean;
}

export const NavigationLink = ({
  href,
  icon: Icon,
  label,
  destructive,
}: NavigationLinkProps) => {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className={`flex items-center gap-3 p-4 hover:bg-accent rounded-lg transition-colors ${
            destructive ? "text-destructive mt-auto" : ""
          }`}
        >
          <Icon className="w-5 h-5 text-muted-foreground" />
          <span>{label}</span>
        </Link>
      ) : (
        <span
          className={`flex cursor-pointer items-center gap-3 p-4 hover:bg-accent rounded-lg transition-colors ${
            destructive ? "text-destructive mt-auto" : ""
          }`}
        >
          <Icon className="w-5 h-5 text-muted-foreground" />
          <span>{label}</span>
        </span>
      )}
    </>
  );
};
