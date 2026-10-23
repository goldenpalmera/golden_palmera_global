import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://goldenpalmeraglobal.com"),
  title: {
    default:
      "Golden Palmera Global | Agricultural Commodities & Global Trade",
    template: "%s | Golden Palmera Global",
  },
  description:
    "Golden Palmera Global sources, processes and exports quality agricultural commodities from Africa to global markets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}