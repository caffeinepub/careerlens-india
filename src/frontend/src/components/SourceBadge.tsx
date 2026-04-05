interface SourceBadgeProps {
  source: string;
  confidence: "High" | "Medium" | "Low";
  className?: string;
}

export function SourceBadge({
  source,
  confidence,
  className = "",
}: SourceBadgeProps) {
  const colors = {
    High: "text-emerald-700 bg-emerald-50 border-emerald-200",
    Medium: "text-amber-700 bg-amber-50 border-amber-200",
    Low: "text-slate-600 bg-slate-50 border-slate-200",
  };
  const dots = {
    High: "bg-emerald-500",
    Medium: "bg-amber-500",
    Low: "bg-slate-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-medium ${colors[confidence]} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[confidence]}`} />
      Source: {source} · {confidence} confidence
    </span>
  );
}
