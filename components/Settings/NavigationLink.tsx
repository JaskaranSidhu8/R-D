import React from "react";

interface NavigationLinkProps {
  href: string;
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
    <a
      href={href}
      className={`flex items-center gap-3 p-4 hover:bg-accent rounded-lg transition-colors ${
        destructive ? "text-destructive mt-auto" : ""
      }`}
    >
      <Icon className="w-5 h-5 text-muted-foreground" />
      <span>{label}</span>
    </a>
  );
};
