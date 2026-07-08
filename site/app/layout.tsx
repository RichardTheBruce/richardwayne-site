import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PersonJsonLd } from "@/components/person-jsonld";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://richardthebruce.com"),
  title: {
    default:
      "Richard Wayne · Founding Engineer for AI Agents, Cross-Chain, and Full-Stack Builds",
    template: "%s · Richard Wayne",
  },
  description:
    "Founding engineer for hire. I build AI agent systems that execute under proof, cross-chain infrastructure on LayerZero and Circle CCTP, and full-stack products that hold at 100K users. Coding since 14, shipping for 10 years.",
  keywords: [
    "AI agent systems",
    "autonomous agents",
    "founding engineer",
    "cross-chain infrastructure",
    "LayerZero V2",
    "DVN decentralized verifier network",
    "Circle CCTP",
    "blockchain infrastructure",
    "Solidity",
    "TypeScript",
    "full-stack development",
    "Richard Wayne",
    "agentic systems",
    "OFT",
    "ONFT",
    "cross-chain audit",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: "https://richardthebruce.com",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
  openGraph: {
    type: "website",
    url: "https://richardthebruce.com",
    siteName: site.name,
    title: "Richard Wayne · Founding Engineer",
    description:
      "AI agent systems that execute under proof, cross-chain infrastructure on LayerZero and Circle CCTP, full-stack builds that hold at 100K users.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Richard Wayne, Founding Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Richard Wayne · Founding Engineer",
    description:
      "AI agent systems that execute under proof, cross-chain infrastructure on LayerZero and Circle CCTP, full-stack builds that hold at 100K users.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-[var(--bg-0)] text-[var(--text-0)] antialiased">
        <PersonJsonLd />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: site.name,
              url: "https://richardthebruce.com",
              description:
                "Portfolio and professional site for Richard Wayne, founding engineer for AI agent systems, cross-chain infrastructure, and full-stack product builds.",
              author: {
                "@type": "Person",
                name: site.name,
                url: "https://richardthebruce.com",
              },
            }),
          }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
