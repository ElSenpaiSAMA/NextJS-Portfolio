import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { IntroScreen } from "./components/layout/IntroScreen";
import { ScrollChoreography } from "./components/layout/ScrollChoreography";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { StatusBar } from "./components/terminal/StatusBar";
import { profile } from "./data/profile";
import { INTRO_INIT_SCRIPT } from "./lib/intro";
import { siteUrl } from "./lib/site";

// One monospace face for everything: it's a terminal.
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const TITLE = `${profile.name} — ${profile.role}`;
const DESCRIPTION =
  "Software developer in Barcelona focused on backend and DevOps: CI/CD with GitHub Actions, Docker images and self-hosted deployments (Coolify, Pomerium Zero Trust), Linux, and .NET, Python and TypeScript backends.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: TITLE, template: `%s — ${profile.name}` },
  description: DESCRIPTION,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  keywords: ["DevOps", "Platform Engineer", "Backend", "CI/CD", "GitHub Actions", "Docker", "Linux", ".NET", "Barcelona"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060708",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-intro is set by INTRO_INIT_SCRIPT before hydration, so React must
    // not warn about the attribute differing from the server markup.
    <html lang="en" suppressHydrationWarning className={geistMono.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen pb-8 antialiased">
        <IntroScreen />
        <ScrollChoreography />
        <SiteHeader />
        <main id="main" className="pt-11">
          {children}
        </main>
        <SiteFooter />
        <StatusBar />
      </body>
    </html>
  );
}
