import { site } from "@/lib/site";

export function ProfessionalServiceJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Richard Wayne, Founding Engineer",
          url: site.url,
          email: site.email,
          founder: {
            "@type": "Person",
            name: site.name,
          },
          serviceType: [
            "AI agent systems",
            "Cross-chain and payments infrastructure",
            "Founding-engineer product builds",
          ],
        }),
      }}
    />
  );
}
