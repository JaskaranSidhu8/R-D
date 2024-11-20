import Logo from "@/components/static/Logo";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the current pathname
  const shouldHideLogo = typeof window !== 'undefined' && 
    (window.location.pathname === '/DiningTime' || 
     window.location.pathname === '/Settings');

  return (
    <html lang="en">
      <body className="p-10">
        <div className="gradient h-[25vh] absolute top-0 left-0 w-full -z-10"></div>

        {!shouldHideLogo && (
          <Link href="/">
            <Logo showText={false} big={true} />
          </Link>
        )}

        {children}
      </body>
    </html>
  );
}
