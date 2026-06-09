import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, Dancing_Script } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import ContactDrawer from "./components/ContactDrawer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matias Speroni",
  description: "Backend & Fullstack Developer — .NET, React, Data & AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${fraunces.variable} ${hankenGrotesk.variable} ${dancingScript.variable} antialiased flex flex-col min-h-screen`}>
          <LoadingScreen />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ContactDrawer />
        </body>
      </html>
    </ViewTransitions>
  );
}
