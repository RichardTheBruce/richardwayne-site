const rows = [
  { label: "chains in production", value: "7", accent: true },
  { label: "launchpad shipped", value: "$300K" },
  { label: "bridge matrix", value: "23 chains" },
  { label: "commits since 2024", value: "2,300+" },
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
