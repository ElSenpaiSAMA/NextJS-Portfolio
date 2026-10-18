import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { IntroScreen } from "./components/layout/IntroScreen";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { profile } from "./data/profile";
import { INTRO_INIT_SCRIPT } from "./lib/intro";
import { siteUrl } from "./lib/site";

// Display: condensed signage face at its display optical size. Body: Instrument Sans.
const shoulders = Big_Shoulders({ variable: "--font-shoulders", subsets: ["latin"], axes: ["opsz"], display: "swap" });
const instrument = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"], display: "swap" });

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
  themeColor: "#160b2e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-intro is set by INTRO_INIT_SCRIPT before hydration, so React must
    // not warn about the attribute differing from the server markup.
    <html lang="en" suppressHydrationWarning className={`${shoulders.variable} ${instrument.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen antialiased">
        <IntroScreen />
        <SmoothScroll />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
