import type { Metadata } from "next";
import { getFooterData } from "@/content/footer/getFooterData";
import { Footer } from "@/components/sharedComponents/Footer";
import { FloatingButtons } from "@/components/sharedComponents/FloatingButtons";
import { getFloatButtonsData } from "@/content/float-button/getFloatButtonsData";
import { 
  Geist, 
  Geist_Mono, 
  DM_Sans, 
  IBM_Plex_Mono, 
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/sharedComponents/Header"
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

// Prevent Font Awesome from adding its CSS automatically
config.autoAddCss=false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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

export default async function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const footerData = await getFooterData();
  const floatButtonData = await getFloatButtonsData();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${playfair.variable} ${dmSans.variable} ${ibmPlexMono.variable} min-h-full flex flex-col`}>
        <Header />
        {children}
        <FloatingButtons settings={floatButtonData} />
        <Footer settings={footerData}  />
      </body>
    </html>
  );
}
