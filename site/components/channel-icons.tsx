import { site } from "@/lib/site";

type IconLink = {
  label: string;
  href: string;
  path: React.ReactNode;
};

const github = (
  <path
    fill="currentColor"
    d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.34 9.34 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
  />
);

const linkedin = (
  <path
    fill="currentColor"
    d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45C23.2 24 24 23.22 24 22.25V1.75C24 .78 23.2 0 22.22 0Z"
  />
);

const email = (
  <path
    fill="currentColor"
    d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2.2.5 7.8 5.2L19.8 6H4.2ZM20 7.7l-7.4 4.95a1 1 0 0 1-1.1 0L4 7.7V18h16V7.7Z"
  />
);

function iconsFor(): IconLink[] {
  const links: IconLink[] = [
    { label: "Email Richard", href: `mailto:${site.email}`, path: email },
    { label: "GitHub", href: site.github, path: github },
    { label: "LinkedIn", href: site.linkedin, path: linkedin },
  ];
  return links;
}

export function ChannelIcons({ className = "" }: { className?: string }) {
  const links = iconsFor();
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {links.map((link) => {
        const external = link.href.startsWith("http");
        return (
          <a
            key={link.label}
            href={link.href}
            aria-label={link.label}
            title={link.label}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer noopener" : undefined}
            className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--text-2)] transition-colors hover:bg-[var(--bg-2)] hover:text-[var(--text-0)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              {link.path}
            </svg>
          </a>
        );
      })}
    </div>
  );
}
