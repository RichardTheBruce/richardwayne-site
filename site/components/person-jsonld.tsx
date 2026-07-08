export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Richard Wayne",
    url: "https://richardthebruce.com",
    jobTitle: "Cross-chain DVN and on-chain agent engineer",
    sameAs: [
      "https://github.com/RichardTheBruce",
      "https://www.linkedin.com/in/richardthebruce",
      "https://x.com/TheDevRichard",
    ],
    knowsAbout: [
      "LayerZero V2",
      "DVN (decentralized verifier network)",
      "Circle CCTP",
      "OFT",
      "ONFT",
      "cross-chain interoperability",
      "on-chain AI agents",
      "Solana to EVM",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
