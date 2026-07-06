const rows = [
  { label: "years building", value: "10+" },
  { label: "years in production", value: "7" },
  { label: "raised across 2 projects", value: "$750K" },
  { label: "2019 revenue, sole proprietor", value: "$20M" },
  { label: "chains in production", value: "23", accent: true },
  { label: "commits in 2026", value: "1,700+" },
  { label: "published research", value: "2 papers, SSRN" },
];

export function ProofLedger() {
  return (
    <aside
      aria-label="Production record"
      className="card-surface w-full p-6 font-mono text-[13px] sm:p-7"
    >
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between gap-4 border-b border-[var(--border)] py-3 last:border-b-0"
        >
          <span className="text-[var(--text-2)]">{row.label}</span>
          <span
            className={
              row.accent
                ? "text-[var(--accent)]"
                : "text-[var(--text-0)]"
            }
          >
            {row.value}
          </span>
        </div>
      ))}
      <p className="mt-4 text-[11.5px] leading-relaxed text-[var(--text-2)]">
        Every number verifiable: commit history, contracts on-chain, papers
        public.
      </p>
    </aside>
  );
}
