import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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
  metadataBase: new URL(site.url),
  title: {
    default:
      "Richard Wayne · Founding Engineer for AI Agents, Cross-Chain, and Full-Stack Builds",
    template: "%s · Richard Wayne",
  },
  description:
    "Founding engineer for hire. I build AI agent systems that execute under proof, cross-chain infrastructure on LayerZero and Circle CCTP, and full-stack products that hold at 100K users. Coding since 14, shipping for 10 years.",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "Richard Wayne · Founding Engineer",
    description:
      "AI agent systems that execute under proof, cross-chain infrastructure on LayerZero and Circle CCTP, full-stack builds that hold at 100K users.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Richard Wayne · Founding Engineer",
    description:
      "AI agent systems that execute under proof, cross-chain infrastructure on LayerZero and Circle CCTP, full-stack builds that hold at 100K users.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              url: site.url,
              jobTitle: "Founding Engineer",
              image: `${site.url}/richard.jpg`,
              email: site.email,
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Rutgers University",
              },
              sameAs: [site.github, site.linkedin, site.x, site.telegram].filter(
                (url) => url && !url.includes("PLACEHOLDER")
              ),
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
