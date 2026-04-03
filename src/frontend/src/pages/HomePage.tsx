import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Layers,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useGetCategories } from "../hooks/useQueries";
import type { NavState } from "../types/navigation";

interface HomePageProps {
  onNavigate: (state: NavState) => void;
}

type SectorKey = "primary" | "secondary" | "services";

const categoryMeta: Record<
  SectorKey,
  {
    icon: React.ReactNode;
    iconBg: string;
    iconText: string;
    badgeBg: string;
    badgeText: string;
    borderAccent: string;
    highlight: string;
  }
> = {
  primary: {
    icon: <Layers className="w-6 h-6" />,
    iconBg: "oklch(0.95 0.03 145)",
    iconText: "oklch(0.45 0.13 145)",
    badgeBg: "oklch(0.95 0.03 145)",
    badgeText: "oklch(0.40 0.13 145)",
    borderAccent: "oklch(0.45 0.13 145)",
    highlight: "Agriculture, Mining, Forestry & Fisheries",
  },
  secondary: {
    icon: <TrendingUp className="w-6 h-6" />,
    iconBg: "oklch(0.94 0.025 220)",
    iconText: "oklch(0.45 0.10 220)",
    badgeBg: "oklch(0.94 0.025 220)",
    badgeText: "oklch(0.40 0.10 220)",
    borderAccent: "oklch(0.45 0.10 220)",
    highlight: "Manufacturing, Construction, Energy & Utilities",
  },
  services: {
    icon: <Briefcase className="w-6 h-6" />,
    iconBg: "oklch(0.96 0.04 55)",
    iconText: "oklch(0.50 0.12 55)",
    badgeBg: "oklch(0.96 0.04 55)",
    badgeText: "oklch(0.44 0.12 55)",
    borderAccent: "oklch(0.50 0.12 55)",
    highlight: "IT, Government, NGOs, Gig Economy & Finance",
  },
};

const stats = [
  { label: "Industries Covered", value: "50+" },
  { label: "Career Roles Mapped", value: "200+" },
  { label: "Sectors", value: "3" },
  { label: "Students Helped", value: "10K+" },
  { label: "Salary Data Points", value: "500+" },
  { label: "Global Contexts", value: "All" },
];

const howItWorks = [
  {
    step: "01",
    title: "Choose a Sector",
    desc: "Start with Primary, Secondary, or Services. Each sector represents a broad slice of India's economy.",
  },
  {
    step: "02",
    title: "Explore Industry Types",
    desc: "Drill into specific industries — like IT, Agriculture, or Government Services — to see what they do.",
  },
  {
    step: "03",
    title: "Discover Career Details",
    desc: "For each sub-industry, see salary bands in ₹, employment share, typical roles, and growth outlook.",
  },
  {
    step: "04",
    title: "Find Your Fit",
    desc: "Take the Career Readiness Assessment to see which career matches your current strengths, and get an actionable gap roadmap for your dream career.",
  },
];

export function HomePage({ onNavigate }: HomePageProps) {
  const { data: categories, isLoading } = useGetCategories();

  const getCategoryMeta = (id: string) => {
    const key = id.toLowerCase() as SectorKey;
    return categoryMeta[key] || categoryMeta.services;
  };

  return (
    <main>
      {/* Hero Section — dark accent zone */}
      <section
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 255) 0%, oklch(0.25 0.10 240) 100%)",
        }}
        className="border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <Badge
                className="mb-5 border border-white/20 text-white/90 hover:bg-white/10"
                style={{ background: "oklch(1 0 0 / 0.10)" }}
              >
                India's Career Discovery Platform
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                Explore India's{" "}
                <span style={{ color: "oklch(0.80 0.10 195)" }}>
                  Career Ecosystem
                </span>
              </h1>
              <p className="text-lg text-white/75 mb-8 leading-relaxed max-w-lg">
                Go beyond job listings. Understand industry value chains,
                activities, salary ranges, and typical roles across every sector
                of the Indian economy.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  data-ocid="hero.primary_button"
                  size="lg"
                  onClick={() => onNavigate({ view: "category" })}
                  className="font-semibold"
                  style={{ background: "oklch(0.55 0.12 195)", color: "white" }}
                >
                  Explore Careers <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  data-ocid="hero.secondary_button"
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate({ view: "student-profile" })}
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
                >
                  Find My Fit
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="hidden lg:block"
            >
              <img
                src="/assets/generated/hero-students.dim_800x500.jpg"
                alt="Indian students exploring career options"
                className="rounded-2xl w-full object-cover shadow-2xl ring-1 ring-white/10"
                style={{ maxHeight: 380 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar — dark accent zone */}
      <section
        style={{ background: "oklch(0.30 0.12 255)" }}
        className="text-white py-6"
        data-ocid="stats.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-white/65 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Ways to Explore */}
      <section className="py-16 bg-muted/40" data-ocid="tracks.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">
              Two Ways to Explore
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Start from your subjects, or take the full assessment — both lead
              to your career match.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject Gateway card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              data-ocid="tracks.subject_gateway.card"
              className="group bg-card rounded-2xl border border-border shadow-sm p-8 flex flex-col hover:shadow-md transition-all duration-200 cursor-pointer"
              style={{ borderTop: "4px solid oklch(0.55 0.14 165)" }}
              onClick={() => onNavigate({ view: "student-profile" })}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: "oklch(0.93 0.05 165)",
                  color: "oklch(0.42 0.14 165)",
                }}
              >
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                I know what subjects I like
              </h3>
              <p className="text-muted-foreground leading-relaxed flex-1 mb-6">
                Tell us your grade, stream, and subjects — we'll instantly match
                you to the right careers.
              </p>
              <Button
                data-ocid="tracks.subject_gateway.button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate({ view: "student-profile" });
                }}
                className="w-full font-semibold group-hover:opacity-90"
                style={{ background: "oklch(0.55 0.14 165)", color: "white" }}
              >
                Go to Subject Gateway <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Assessment card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              data-ocid="tracks.assessment.card"
              className="group bg-card rounded-2xl border border-border shadow-sm p-8 flex flex-col hover:shadow-md transition-all duration-200 cursor-pointer"
              style={{ borderTop: "4px solid oklch(0.45 0.18 275)" }}
              onClick={() => onNavigate({ view: "student-profile" })}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: "oklch(0.93 0.05 275)",
                  color: "oklch(0.40 0.18 275)",
                }}
              >
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                I want to discover my fit
              </h3>
              <p className="text-muted-foreground leading-relaxed flex-1 mb-6">
                Same quick profile, then a full 8-module assessment for deep
                career guidance and gap analysis.
              </p>
              <Button
                data-ocid="tracks.assessment.button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate({ view: "student-profile" });
                }}
                className="w-full font-semibold group-hover:opacity-90"
                style={{ background: "oklch(0.45 0.18 275)", color: "white" }}
              >
                Start Assessment <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16" data-ocid="categories.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">
              Browse by Sector
            </h2>
            <p className="text-muted-foreground mt-2">
              India's economy spans three broad sectors. Start exploring to find
              your career path.
            </p>
          </div>

          {isLoading ? (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              data-ocid="categories.loading_state"
            >
              {["a", "b", "c"].map((k) => (
                <Skeleton key={k} className="h-56 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(categories || []).map((cat, i) => {
                const meta = getCategoryMeta(cat.id);
                return (
                  <motion.div
                    key={cat.id}
                    data-ocid={`categories.item.${i + 1}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-card rounded-xl border border-border shadow-card hover:shadow-md transition-shadow p-6 flex flex-col"
                    style={{ borderLeft: `4px solid ${meta.borderAccent}` }}
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{
                        background: meta.iconBg,
                        color: meta.iconText,
                      }}
                    >
                      {meta.icon}
                    </div>
                    <div className="mb-2">
                      <span
                        className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2"
                        style={{
                          background: meta.badgeBg,
                          color: meta.badgeText,
                        }}
                      >
                        {cat.id.charAt(0).toUpperCase() + cat.id.slice(1)}{" "}
                        Sector
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
                      {cat.description}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4 italic">
                      {meta.highlight}
                    </p>
                    <Button
                      data-ocid={`categories.item.${i + 1}.button`}
                      onClick={() =>
                        onNavigate({
                          view: "category",
                          categoryId: cat.id,
                          categoryName: cat.name,
                        })
                      }
                      className="w-full font-semibold"
                      style={{
                        background: meta.borderAccent,
                        color: "white",
                      }}
                    >
                      Explore {cat.name} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">
              How CareerLens Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4 text-white"
                  style={{ background: "oklch(0.30 0.12 255)" }}
                >
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
