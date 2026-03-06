import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../styles/globals.css';

import TabBar from "@/components/navigation/TabBar";
import NavBar from "@/components/navigation/NavBar";

// Fonte global
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://devsocialapp.vercel.app"),

  title: "SocialApp",
  description: "A rede social do momento | A portfolio project developed by Lian Dev",
  icons: {
    icon: "/favicon.ico",
  },

  keywords: ["rede social", "socialapp", "projeto", "project", "portfolio", "liandev", "desenvolvedor", "developer"],

  openGraph: {
    title: "Social App",
    description: "A rede social do momento - Portifolio project",
    url: "https://devsocialapp.vercel.app",
    siteName: "Social App",
    images: [
      {
        url: '/seo/banner.png',
        width: 1200,
        height: 630,
        alt: 'Rede social'
      }
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Barbearia",
    description: "A rede social do momento - Portifolio project",
    images: ["/seo/banner.png"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
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
