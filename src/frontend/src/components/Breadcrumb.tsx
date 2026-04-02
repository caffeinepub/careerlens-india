import { ChevronRight, Home } from "lucide-react";
import type { NavState } from "../types/navigation";

interface BreadcrumbItem {
  label: string;
  navState: NavState;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (state: NavState) => void;
}

export function PageBreadcrumb({ items, onNavigate }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap"
    >
      <button
        type="button"
        data-ocid="breadcrumb.link"
        onClick={() => onNavigate({ view: "home" })}
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1">
          <ChevronRight className="w-3.5 h-3.5" />
          {item === items[items.length - 1] ? (
            <span className="text-foreground font-medium">{item.label}</span>
          ) : (
            <button
              type="button"
              data-ocid="breadcrumb.link"
              onClick={() => onNavigate(item.navState)}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          )}
        </span>
      ))}
    </nav>
  );
}
