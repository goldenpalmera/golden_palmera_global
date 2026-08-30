import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goldenpalmeraglobal.com"),

  title: {
    default: "Golden Palmera Global | Agricultural Commodities & Global Trade",
    template: "%s | Golden Palmera Global",
  },
  
  description: "Golden Palmera Global sources, processes and exports quality agricultural commodities from Africa to global markets.",
   keywords: [
    "Golden Palmera Global",
    "agricultural commodities",
    "agricultural export",
    "Africa agricultural exports",
    "palm oil",
    "hibiscus",
    "sesame seed",
    "dried ginger",
    "cashew nuts",
    "shea butter",
    "bitter kola",
  ],
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
