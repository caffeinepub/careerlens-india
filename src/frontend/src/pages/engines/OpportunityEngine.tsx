import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowRight, RefreshCw, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { SourceBadge } from "../../components/SourceBadge";
import { useSession } from "../../context/SessionContext";
import type { ScoredCareer } from "../../context/SessionContext";
import { careerScoringMap } from "../../data/careerScoringData";
import type { NavState } from "../../types/navigation";

interface OpportunityEngineProps {
  onNavigate: (state: NavState) => void;
}

const MARKET_SIGNALS = [
  {
    source: "NASSCOM India Tech Outlook 2025–26",
    stat: "5.4 million",
    desc: "Tech professionals employed in India",
    growth: "+9.5% YoY",
    sector: "Technology",
    color: "oklch(0.55 0.16 265)",
  },
  {
    source: "NMC Healthcare Workforce 2025",
    stat: "1.9 million",
    desc: "Doctors registered with NMC in India",
    growth: "Shortfall of 600K by 2030",
    sector: "Healthcare",
    color: "oklch(0.52 0.15 162)",
  },
  {
    source: "ICAI Member Statistics 2025",
    stat: "3.8 lakh",
    desc: "Chartered Accountants in India",
    growth: "+15,000 new CAs/year",
    sector: "Finance",
    color: "oklch(0.58 0.14 55)",
  },
];

function CircleScore({ score, color }: { score: number; color: string }) {
  const circumference = 2 * Math.PI * 22;
  const dashOffset = circumference - (score / 100) * circumference;
  return (
    <div className="relative w-14 h-14 shrink-0">
      <svg
        className="w-14 h-14 -rotate-90"
        viewBox="0 0 56 56"
        aria-hidden="true"
      >
        <circle
          cx="28"
          cy="28"
          r="22"
          fill="none"
          stroke="oklch(0.92 0.005 240)"
          strokeWidth="4"
        />
        <circle
          cx="28"
          cy="28"
          r="22"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
        {score}%
      </span>
    </div>
  );
}

function CareerCard({
  career,
  onViewDecision,
  index,
}: {
  career: ScoredCareer;
  onViewDecision: (id: string) => void;
  index: number;
}) {
  const scoringMeta = careerScoringMap[career.id];
  const bandColors = {
    strong: "oklch(0.52 0.15 162)",
    good: "oklch(0.58 0.14 55)",
    stretch: "oklch(0.57 0.22 29)",
  };
  const bandBg = {
    strong: "oklch(0.95 0.03 162)",
    good: "oklch(0.97 0.04 55)",
    stretch: "oklch(0.97 0.04 29)",
  };
  const bandColor = bandColors[career.fitBand];
  const cardBg = bandBg[career.fitBand];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      data-ocid={`opportunity.career.item.${index + 1}`}
    >
      <Card
        className="border shadow-xs hover:shadow-card-hover transition-all overflow-hidden"
        style={{ borderLeftWidth: "3px", borderLeftColor: bandColor }}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <CircleScore score={career.fitScore} color={bandColor} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <h3 className="text-sm font-semibold text-foreground leading-snug">
                    {career.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 mt-1"
                    style={{ background: cardBg, color: bandColor }}
                  >
                    {career.sector}
                  </Badge>
                </div>
                {career.hasFullProfile === false && (
                  <Badge variant="outline" className="text-[10px] shrink-0">
                    Profile coming soon
                  </Badge>
                )}
              </div>

              <p className="text-xs text-muted-foreground mt-1.5 mb-2">
                {career.reasonPhrase}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Entry salary</p>
                  <p className="text-sm font-bold text-foreground">
                    \u20B9{career.salaryEntry}L\u2013{career.salaryMid}L{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      LPA
                    </span>
                  </p>
                  {scoringMeta && (
                    <SourceBadge
                      source={scoringMeta.dataSource}
                      confidence={scoringMeta.dataConfidence}
                      className="mt-1"
                    />
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    Years to first job
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {career.yearsToFirstJob} yrs
                  </p>
                </div>
              </div>

              <Button
                size="sm"
                data-ocid={`opportunity.career_decision.button.${index + 1}`}
                onClick={() => onViewDecision(career.id)}
                className="mt-3 w-full h-8 text-xs font-semibold gap-1.5"
                style={{ background: "oklch(0.28 0.11 255)", color: "white" }}
              >
                View Decision Plan
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function OpportunityEngine({ onNavigate }: OpportunityEngineProps) {
  const { session } = useSession();
  const { results, studentProfile } = session;

  if (!results || !studentProfile) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h2 className="text-lg font-semibold mb-2">
            Complete the Identity Engine first
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Your profile is needed to compute career matches.
          </p>
          <Button onClick={() => onNavigate({ view: "identity" })}>
            Start Identity Engine
          </Button>
        </div>
      </main>
    );
  }

  const { topCareers } = results;
  const strongMatches = topCareers.filter((c) => c.fitBand === "strong");
  const goodMatches = topCareers.filter((c) => c.fitBand === "good");
  const stretchMatches = topCareers.filter((c) => c.fitBand === "stretch");

  const handleViewDecision = (careerId: string) => {
    onNavigate({ view: "decision", selectedCareer: careerId });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section
        className="py-10 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.17 0.07 255) 0%, oklch(0.24 0.09 255) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <Badge className="mb-3 text-white border-white/30 bg-white/10">
            Step 2 of 5 — Opportunity Engine
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
            Your Career Matches
          </h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-white/10 text-white border-white/20 text-xs">
              Grade {studentProfile.grade}
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 text-xs">
              {studentProfile.stream
                .replace("-", " ")
                .replace("science pcm", "Science PCM")
                .replace("science pcb", "Science PCB")}
            </Badge>
            {!results.completedDeep && (
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30 text-xs">
                MVP Mode
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            data-ocid="opportunity.update_profile.button"
            onClick={() => onNavigate({ view: "identity" })}
            className="bg-white/10 text-white border-white/30 hover:bg-white/20 gap-1.5 text-xs"
          >
            <RefreshCw className="w-3 h-3" />
            Update My Profile
          </Button>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        {/* Enhancement banner */}
        {!results.completedDeep && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-amber-200 bg-amber-50"
          >
            <TrendingUp className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-800">
                Enhance accuracy
              </p>
              <p className="text-xs text-amber-700">
                Take the full 102-question assessment for deeper insights and
                more precise matches.
              </p>
            </div>
            <Button
              size="sm"
              data-ocid="opportunity.deep_assessment.button"
              onClick={() => onNavigate({ view: "identity" })}
              className="shrink-0 text-xs h-7 px-3 bg-amber-600 hover:bg-amber-700 text-white"
            >
              Go Deep
            </Button>
          </motion.div>
        )}

        {/* Strong matches */}
        {strongMatches.length > 0 && (
          <section data-ocid="opportunity.strong_matches.section">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "oklch(0.52 0.15 162)" }}
              />
              <h2 className="text-sm font-semibold text-foreground">
                Strong Match
              </h2>
              <Badge
                className="text-[10px]"
                style={{
                  background: "oklch(0.95 0.03 162)",
                  color: "oklch(0.35 0.12 162)",
                }}
              >
                {strongMatches.length} career
                {strongMatches.length !== 1 ? "s" : ""}
              </Badge>
              <span className="text-xs text-muted-foreground">
                — These careers align closely with your profile
              </span>
            </div>
            <div className="space-y-3">
              {strongMatches.map((c, i) => (
                <CareerCard
                  key={c.id}
                  career={c}
                  onViewDecision={handleViewDecision}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}

        {/* Good matches */}
        {goodMatches.length > 0 && (
          <section data-ocid="opportunity.good_matches.section">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "oklch(0.58 0.14 55)" }}
              />
              <h2 className="text-sm font-semibold text-foreground">
                Good Fit
              </h2>
              <Badge
                className="text-[10px]"
                style={{
                  background: "oklch(0.97 0.04 55)",
                  color: "oklch(0.40 0.12 55)",
                }}
              >
                {goodMatches.length} career{goodMatches.length !== 1 ? "s" : ""}
              </Badge>
              <span className="text-xs text-muted-foreground">
                — Solid options with some gaps to bridge
              </span>
            </div>
            <div className="space-y-3">
              {goodMatches.map((c, i) => (
                <CareerCard
                  key={c.id}
                  career={c}
                  onViewDecision={handleViewDecision}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}

        {/* Stretch goals */}
        {stretchMatches.length > 0 && (
          <section data-ocid="opportunity.stretch_matches.section">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "oklch(0.57 0.22 29)" }}
              />
              <h2 className="text-sm font-semibold text-foreground">
                Stretch Goal
              </h2>
              <Badge
                className="text-[10px]"
                style={{
                  background: "oklch(0.97 0.04 29)",
                  color: "oklch(0.40 0.15 29)",
                }}
              >
                {stretchMatches.length} career
                {stretchMatches.length !== 1 ? "s" : ""}
              </Badge>
              <span className="text-xs text-muted-foreground">
                — Ambitious choices — here’s what it takes
              </span>
            </div>
            <div className="space-y-3">
              {stretchMatches.map((c, i) => (
                <CareerCard
                  key={c.id}
                  career={c}
                  onViewDecision={handleViewDecision}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}

        {/* Market Signals */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-4">
            Market Signals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {MARKET_SIGNALS.map((sig) => (
              <Card key={sig.sector} className="border shadow-xs">
                <CardContent className="p-4">
                  <p
                    className="text-xs font-semibold uppercase tracking-wide mb-2"
                    style={{ color: sig.color }}
                  >
                    {sig.sector}
                  </p>
                  <p className="text-2xl font-display font-bold text-foreground">
                    {sig.stat}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {sig.desc}
                  </p>
                  <p
                    className="text-xs font-semibold mt-1.5"
                    style={{ color: sig.color }}
                  >
                    {sig.growth}
                  </p>
                  <SourceBadge
                    source={sig.source}
                    confidence="High"
                    className="mt-2"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
