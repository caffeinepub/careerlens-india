interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, sub, icon }: StatCardProps) {
  return (
    <div className="bg-card rounded-lg p-4 shadow-card border border-border">
      {icon && <div className="text-primary mb-2">{icon}</div>}
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-xs font-medium text-muted-foreground mt-0.5">
        {label}
      </div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </div>
  );
}
