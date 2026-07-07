export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://richardthebruce.com",
  name: "Richard Wayne",
  email: "Richard@richardthebruce.com",
  github: "https://github.com/RichardTheBruce",
  linkedin: "https://www.linkedin.com/in/richard-wayne-nuro",
  x: "", // set to https://x.com/RichardTheBruce once the handle is claimed
  telegram: "", // set to https://t.me/richardthebruce once the channel exists
  discord: "https://discord.gg/PLACEHOLDER", // pending server creation
  calendar: "", // cal.com link when Richard creates it; hide button when empty
};

export type SiteChannel = {
  label: string;
  href: string;
};

function isPlaceholder(href: string) {
  return !href || href.includes("PLACEHOLDER");
}

export function getVisibleChannels(): SiteChannel[] {
  const channels: SiteChannel[] = [
    { label: "GitHub", href: site.github },
    { label: "LinkedIn", href: site.linkedin },
    { label: "X", href: site.x },
    { label: "Telegram", href: site.telegram },
    { label: "Discord", href: site.discord },
  ];
  return channels.filter((channel) => !isPlaceholder(channel.href));
}
