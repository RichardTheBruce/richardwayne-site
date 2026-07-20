// CAL_LINK: Replace "richardwayne" with your real Cal.com username.
// This appears in the hero CTA, the contact page primary button,
// and the services page booking button.
export const CAL_LINK = "richard-wayne-bregek/30min";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://richardthebruce.com",
  name: "Richard Wayne",
  email: "Richard@richardthebruce.com",
  github: "https://github.com/RichardTheBruce",
  linkedin: "https://www.linkedin.com/in/richardthebruce",
  x: "https://x.com/DickTheDev",
  telegram: "", // set to https://t.me/richardthebruce once the channel exists
  discord: "https://discord.gg/PLACEHOLDER", // pending server creation
  calendar: "", // legacy field; booking now uses CAL_LINK above
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
