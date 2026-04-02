import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import type { NavState } from "../types/navigation";

interface HeaderProps {
  onNavigate: (state: NavState) => void;
  currentView: string;
}

export function Header({ onNavigate, currentView }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate({ view: "search", searchQuery: searchQuery.trim() });
      setSearchOpen(false);
    }
  };

  const navLinks: { label: string; view: NavState["view"] }[] = [
    { label: "Home", view: "home" },
    { label: "Browse Industries", view: "category" },
    { label: "Subject Gateway", view: "subject-gateway" },
    { label: "Find My Fit", view: "assessment" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            data-ocid="header.link"
            onClick={() => onNavigate({ view: "home" })}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-[oklch(0.30_0.12_255)] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold text-[oklch(0.30_0.12_255)] tracking-tight">
                CareerLens
              </div>
              <div className="text-xs text-muted-foreground">India</div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <button
                key={link.view}
                type="button"
                data-ocid="header.link"
                onClick={() => onNavigate({ view: link.view })}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentView === link.view
                    ? "text-[oklch(0.30_0.12_255)] border-b-2 border-[oklch(0.30_0.12_255)] rounded-none"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                } ${
                  link.view === "assessment"
                    ? currentView === "assessment"
                      ? ""
                      : "text-[oklch(0.45_0.13_195)] hover:text-[oklch(0.45_0.13_195)] hover:bg-[oklch(0.94_0.025_195)]"
                    : ""
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Search */}
          <div className="flex items-center gap-2">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  data-ocid="header.search_input"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search careers..."
                  className="w-40 sm:w-56 h-8 text-sm"
                />
                <Button type="submit" size="sm" className="h-8 px-3">
                  Go
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </form>
            ) : (
              <Button
                data-ocid="header.button"
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(true)}
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
              >
                <Search className="w-4 h-4" />
              </Button>
            )}
            <button
              type="button"
              className="md:hidden p-2 text-muted-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden border-t border-border py-2">
            {navLinks.map((link) => (
              <button
                key={link.view}
                type="button"
                onClick={() => {
                  onNavigate({ view: link.view });
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
