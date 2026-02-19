import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import TabBar from "@/components/navigation/TabBar";
import NavBar from "@/components/navigation/NavBar";

// Fonte global
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "SocialApp",
  description: "A portfolio project developed by Lian Dev",
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased flex justify-center overflow-hidden bg-gray1 h-[100dvh]`}>
        <div className="flex flex-col bg-black grow max-w-md h-full overflow-hidden">
          <TabBar />
            {children}
          <NavBar />
        </div>
      </body>
    </html>
  );
}
