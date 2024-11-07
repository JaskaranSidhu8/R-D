import Logo from "@/components/static/Logo"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className='  p-10  '>
      
      <div className=" gradient h-[25vh] absolute top-0 left-0 w-full -z-10" ></div>
         <Logo showText={true} big={false} /> {children}
    </body>
    </html>
  )
}
