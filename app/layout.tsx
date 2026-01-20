import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Fonte global
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "SocialApp",
  description: "A portfolio project developed by Lian Dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
