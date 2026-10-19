import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { IntroScreen } from "./components/layout/IntroScreen";
import { ScrollChoreography } from "./components/layout/ScrollChoreography";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { profile } from "./data/profile";
import { CONFIG_INIT_SCRIPT, DEFAULT_HTML_ATTRS } from "./lib/config-init";
import { INTRO_INIT_SCRIPT } from "./lib/intro";
import { siteUrl } from "./lib/site";

// Geist + Geist Mono: the type family of Vercel/Next.js. portfolio.config.ts can switch the UI to mono.
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const TITLE = `${profile.name} — ${profile.role}`;
const DESCRIPTION =
  "Backend & DevOps engineer in Barcelona. CI/CD with GitHub Actions, Docker images and self-hosted deployments (Coolify, Pomerium Zero Trust), Linux, and .NET, Python and TypeScript backends.";

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
  themeColor: "#fbfbfa",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-intro is set by INTRO_INIT_SCRIPT before hydration, so React must
    // not warn about the attribute differing from the server markup.
    <html lang="en" suppressHydrationWarning {...DEFAULT_HTML_ATTRS} className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_INIT_SCRIPT }} />
        {/* Re-applies the visitor's saved portfolio.config before first paint */}
        <script dangerouslySetInnerHTML={{ __html: CONFIG_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen antialiased">
        <IntroScreen />
        <ScrollChoreography />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
