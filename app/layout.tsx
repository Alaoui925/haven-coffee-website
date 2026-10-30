import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/site/cart";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://slowfireroasting.coffee"),
  title: {
    default: "Slowfire Roasting Co. — Coffee roasted the slow way",
    template: "%s — Slowfire Roasting Co.",
  },
  description:
    "A small-batch roastery in Southeast Portland. Fourteen single origins and one house blend, roasted eight kilos at a time on a 1962 Probat — and mailed within 48 hours of first crack.",
  openGraph: {
    type: "website",
    siteName: "Slowfire Roasting Co.",
    locale: "en_US",
    title: "Slowfire Roasting Co. — Coffee roasted the slow way",
    description:
      "Fourteen single origins and one obsessive blend, roasted on a 1962 Probat in SE Portland and mailed within 48 hours of first crack.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 1200,
        alt: "Coffee poured from a gooseneck kettle into a cup on a dark counter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Slowfire Roasting Co. — Coffee roasted the slow way",
    description:
      "A small-batch roastery in Southeast Portland. Roasted Thursdays, shipped Fridays.",
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#171009",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
  // suppressHydrationWarning on <html>: the pre-paint script below adds a
  // `js` class to this element before React hydrates — an intentional mismatch.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${fraunces.variable} ${instrument.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground" suppressHydrationWarning>
        {/* Runs before paint: gates scroll-reveals behind JS availability */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <div className="grain pointer-events-none fixed inset-0 z-30" aria-hidden="true" />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
