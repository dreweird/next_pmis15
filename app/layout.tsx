import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "./auth";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PMIS",
  description: "Perfromance Management Information System - Caraga",
  keywords: "PMIS",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">{children}</div>
        </div>
        <div className="w-full text-center border-t bg-blue-700 text-white p-4 pin-b print:hidden">
          <span className="lg:text-base"> &copy; DA-RFO-XIII 2023 </span>
        </div>
      </body>
     
    </html>
    </SessionProvider>
  );
}
