import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { profile } from "./data/profile";
import { siteUrl } from "./lib/site";
import { THEME_INIT_SCRIPT } from "./lib/theme";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
// Headings only, one style. Not preloaded: body text (Inter) is the LCP element,
// so the serif shouldn't compete with it for bandwidth on first load.
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], display: "swap", preload: false });

const TITLE = `${profile.name} — ${profile.role}`;
const DESCRIPTION =
  "Junior Platform / DevOps Engineer in Barcelona. CI/CD with GitHub Actions, automation, containers and observability — with a backend background in .NET, TypeScript and Python.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: TITLE, template: `%s — ${profile.name}` },
  description: DESCRIPTION,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  keywords: ["Platform Engineer", "DevOps", "CI/CD", "GitHub Actions", "Docker", "Barcelona", "Junior"],
  openGraph: {
    type: "profile",
    siteName: profile.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1815" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-theme is set by THEME_INIT_SCRIPT before hydration, so React must
    // not warn about the attribute differing from the server markup.
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${newsreader.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <SiteHeader />
        <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-6">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
