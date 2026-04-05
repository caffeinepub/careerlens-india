import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, ChevronRight, Compass, Search, Target } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Footer } from "../components/Footer";
import {
  dreamCareerGroups,
  dreamCareerNameMap,
} from "../data/dreamCareerOptions";
import type { NavState } from "../types/navigation";

interface ExplorePageProps {
  onNavigate: (state: NavState) => void;
}

const QUICK_SECTORS = [
  {
    id: "technology",
    label: "Technology & Digital",
    emoji: "💻",
    careers: ["Software Engineer", "Data Scientist", "AI/ML Engineer"],
  },
  {
    id: "healthcare",
    label: "Healthcare & Medicine",
    emoji: "🏥",
    careers: ["Doctor (MBBS)", "Nurse (BSc)", "Pharmacist"],
  },
  {
    id: "finance",
    label: "Finance & Banking",
    emoji: "💰",
    careers: ["Chartered Accountant", "Financial Analyst", "Actuary"],
  },
  {
    id: "law",
    label: "Law & Governance",
    emoji: "⚖️",
    careers: ["Lawyer / Advocate", "IAS / IPS / IFS", "Public Policy"],
  },
  {
    id: "engineering",
    label: "Engineering & Sciences",
    emoji: "⚙️",
    careers: ["Civil Engineer", "Mechanical Engineer", "Biomedical Researcher"],
  },
  {
    id: "design",
    label: "Design & Creative Arts",
    emoji: "🎨",
    careers: ["UX Designer", "Architect", "Fashion Designer"],
  },
];

export function ExplorePage({ onNavigate }: ExplorePageProps) {
  const [search, setSearch] = useState("");

  const filteredGroups = search.trim()
    ? dreamCareerGroups
        .map((g) => ({
          ...g,
          careers: g.careers.filter((c) =>
            c.name.toLowerCase().includes(search.toLowerCase()),
          ),
        }))
        .filter((g) => g.careers.length > 0)
    : dreamCareerGroups;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="py-14 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.17 0.07 255) 0%, oklch(0.24 0.09 255) 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
            Explore India’s Career Universe
          </h1>
          <p className="text-white/70 text-base mb-6">
            60+ careers across 12 sectors — deep profiles, salary data, and
            entry pathways.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="explore.search_input"
              placeholder="Search careers e.g. Doctor, CA, Data Scientist..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-11 bg-white/90 border-0 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* Quick Start */}
        {!search && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground">
                Get Started
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card
                className="border shadow-xs hover:shadow-card-hover transition-all cursor-pointer group"
                onClick={() => onNavigate({ view: "identity" })}
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "oklch(0.55 0.18 260)" }}
                  >
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-1">
                      Discover My Fit
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Take a 3-minute quiz to get your personalised career
                      matches, DISC profile, and 30-day plan.
                    </p>
                    <div
                      className="flex items-center gap-1 mt-2 text-xs font-semibold"
                      style={{ color: "oklch(0.55 0.18 260)" }}
                    >
                      Start now <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card
                className="border shadow-xs hover:shadow-card-hover transition-all cursor-pointer group"
                onClick={() => onNavigate({ view: "category" })}
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "oklch(0.52 0.15 162)" }}
                  >
                    <Compass className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground mb-1">
                      Browse Industries
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Explore India’s economic sectors — Primary, Secondary, and
                      Services — and drill into career profiles.
                    </p>
                    <div
                      className="flex items-center gap-1 mt-2 text-xs font-semibold"
                      style={{ color: "oklch(0.52 0.15 162)" }}
                    >
                      Explore <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Quick Sector Cards */}
        {!search && (
          <section>
            <h2 className="text-base font-semibold text-foreground mb-4">
              Career Sectors
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {QUICK_SECTORS.map((sec) => (
                <Card
                  key={sec.id}
                  className="border shadow-xs hover:shadow-card-hover transition-all cursor-pointer group"
                  onClick={() => onNavigate({ view: "identity" })}
                >
                  <CardContent className="p-4">
                    <div className="text-xl mb-2">{sec.emoji}</div>
                    <h3 className="text-xs font-semibold text-foreground mb-1">
                      {sec.label}
                    </h3>
                    <div className="space-y-0.5">
                      {sec.careers.map((c) => (
                        <p
                          key={c}
                          className="text-[10px] text-muted-foreground"
                        >
                          {c}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Career List (Search Results or All) */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-4">
            {search ? `Results for \u201c${search}\u201d` : "All Careers"}
          </h2>
          {filteredGroups.length === 0 ? (
            <div className="text-center py-12" data-ocid="explore.empty_state">
              <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">
                No careers found. Try a different search.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredGroups.map((group) => (
                <div key={group.sector}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base">{group.emoji}</span>
                    <h3 className="text-sm font-semibold text-foreground">
                      {group.sector}
                    </h3>
                    <Badge variant="secondary" className="text-[10px]">
                      {group.careers.length}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.careers.map((career) => (
                      <button
                        key={career.id}
                        type="button"
                        data-ocid="explore.career.button"
                        onClick={() => onNavigate({ view: "identity" })}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          career.hasProfile
                            ? "border-border text-foreground hover:border-primary/40 hover:bg-secondary/50"
                            : "border-border text-muted-foreground hover:bg-secondary/50"
                        }`}
                      >
                        {career.name}
                        {career.hasProfile && (
                          <span className="ml-1 text-emerald-500">•</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
