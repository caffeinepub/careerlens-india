import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ChevronRight,
  Compass,
  Menu,
  Target,
  TrendingUp,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useSession } from "../context/SessionContext";
import type { NavState } from "../types/navigation";

interface HeaderProps {
  onNavigate: (state: NavState) => void;
  currentView: string;
}

type Engine = {
  id: NavState["view"];
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  color: string;
  requiresProfile: boolean;
};

const engines: Engine[] = [
  {
    id: "identity",
    label: "Identity",
    shortLabel: "1",
    icon: <Target className="w-3.5 h-3.5" />,
    color: "oklch(0.55 0.18 260)",
    requiresProfile: false,
  },
  {
    id: "opportunity",
    label: "Opportunity",
    shortLabel: "2",
    icon: <Compass className="w-3.5 h-3.5" />,
    color: "oklch(0.52 0.15 162)",
    requiresProfile: true,
  },
  {
    id: "decision",
    label: "Decision",
    shortLabel: "3",
    icon: <TrendingUp className="w-3.5 h-3.5" />,
    color: "oklch(0.55 0.12 200)",
    requiresProfile: true,
  },
  {
    id: "execution",
    label: "Execution",
    shortLabel: "4",
    icon: <Zap className="w-3.5 h-3.5" />,
    color: "oklch(0.58 0.14 55)",
    requiresProfile: true,
  },
  {
    id: "wow",
    label: "WOW",
    shortLabel: "5",
    icon: <Trophy className="w-3.5 h-3.5" />,
    color: "oklch(0.58 0.2 30)",
    requiresProfile: true,
  },
];

const engineViews = new Set(engines.map((e) => e.id));

export function Header({ onNavigate, currentView }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { session } = useSession();

  const hasProfile = !!session.studentProfile;
  const hasResults = !!session.results;

  const isEngineView = engineViews.has(currentView as NavState["view"]);

  const handleEngineClick = (engine: Engine) => {
    if (engine.requiresProfile && !hasProfile) {
      onNavigate({ view: "identity" });
    } else if (["execution", "wow"].includes(engine.id) && !hasResults) {
      onNavigate({ view: hasProfile ? "opportunity" : "identity" });
    } else {
      onNavigate({ view: engine.id });
    }
    setMenuOpen(false);
  };

  const getStepState = (
    engine: Engine,
  ): "locked" | "available" | "active" | "completed" => {
    if (currentView === engine.id) return "active";
    if (engine.id === "identity") return hasProfile ? "completed" : "available";
    if (["opportunity", "decision"].includes(engine.id)) {
      if (!hasProfile) return "locked";
      if (hasResults) return "completed";
      return "available";
    }
    if (["execution", "wow"].includes(engine.id)) {
      if (!hasResults) return "locked";
      return "available";
    }
    return "locked";
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <button
            type="button"
            data-ocid="header.link"
            onClick={() => onNavigate({ view: "identity" })}
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.28 0.11 255)" }}
            >
              <Target className="w-4 h-4 text-white" />
            </div>
            <div className="leading-tight">
              <div
                className="text-sm font-bold font-display tracking-tight"
                style={{ color: "oklch(0.28 0.11 255)" }}
              >
                CareerLens
              </div>
              <div className="text-xs text-muted-foreground">India</div>
            </div>
          </button>

          {/* Engine Steps — Desktop */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Engine navigation"
          >
            {engines.map((engine, idx) => {
              const state = getStepState(engine);
              const isLocked = state === "locked";
              const isActive = state === "active";
              const isCompleted = state === "completed";
              return (
                <div key={engine.id} className="flex items-center">
                  <button
                    type="button"
                    data-ocid={`header.${engine.id}.link`}
                    onClick={() => handleEngineClick(engine)}
                    disabled={isLocked}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isActive
                        ? "text-white shadow-sm"
                        : isCompleted
                          ? "text-white opacity-80 hover:opacity-100"
                          : isLocked
                            ? "text-muted-foreground bg-muted cursor-not-allowed"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                    style={
                      isActive || isCompleted
                        ? { background: engine.color }
                        : {}
                    }
                  >
                    {engine.icon}
                    <span>{engine.label}</span>
                    {isCompleted && !isActive && (
                      <span className="w-3.5 h-3.5 rounded-full bg-white/30 flex items-center justify-center text-[9px]">
                        ✓
                      </span>
                    )}
                  </button>
                  {idx < engines.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-muted-foreground mx-0.5 shrink-0" />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Secondary links + mobile menu */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              data-ocid="header.explore.link"
              onClick={() => {
                onNavigate({ view: "explore" });
                setMenuOpen(false);
              }}
              className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground h-8 px-3"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Explore
            </Button>
            <button
              type="button"
              className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-md"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Engine steps — Mobile (visible in header when on engine view) */}
        {isEngineView && (
          <div className="md:hidden flex items-center gap-1 pb-2 overflow-x-auto scrollbar-hide">
            {engines.map((engine, idx) => {
              const state = getStepState(engine);
              const isActive = state === "active";
              const isCompleted = state === "completed";
              const isLocked = state === "locked";
              return (
                <div key={engine.id} className="flex items-center shrink-0">
                  <button
                    type="button"
                    onClick={() => handleEngineClick(engine)}
                    disabled={isLocked}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                      isActive
                        ? "text-white"
                        : isCompleted
                          ? "text-white opacity-75"
                          : isLocked
                            ? "text-muted-foreground bg-muted cursor-not-allowed"
                            : "text-muted-foreground"
                    }`}
                    style={
                      isActive || isCompleted
                        ? { background: engine.color }
                        : {}
                    }
                  >
                    {engine.icon}
                    <span>{engine.label}</span>
                  </button>
                  {idx < engines.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-muted-foreground mx-0.5" />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile nav drawer */}
        {menuOpen && (
          <div className="md:hidden border-t border-border py-3 space-y-1">
            {engines.map((engine) => {
              const state = getStepState(engine);
              const isLocked = state === "locked";
              return (
                <button
                  key={engine.id}
                  type="button"
                  disabled={isLocked}
                  onClick={() => handleEngineClick(engine)}
                  className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isLocked
                      ? "text-muted-foreground cursor-not-allowed"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <span style={!isLocked ? { color: engine.color } : {}}>
                    {engine.icon}
                  </span>
                  {engine.label}
                  {isLocked && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      Complete Identity first
                    </span>
                  )}
                </button>
              );
            })}
            <div className="border-t border-border pt-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  onNavigate({ view: "explore" });
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Explore Careers
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
