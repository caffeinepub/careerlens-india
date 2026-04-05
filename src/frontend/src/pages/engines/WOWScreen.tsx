import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Printer,
  Share2,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { SourceBadge } from "../../components/SourceBadge";
import { useSession } from "../../context/SessionContext";
import { getBridgeSteps } from "../../data/careerBridgeData";
import { careerScoringMap } from "../../data/careerScoringData";
import type { NavState } from "../../types/navigation";

interface WOWScreenProps {
  onNavigate: (state: NavState) => void;
}

const SHOCKING_INSIGHTS = [
  {
    id: "neet-grade9",
    text: "Students who start NEET prep by Grade 9 are 3x more likely to score 600+ and secure government MBBS seats.",
    icon: "📊",
    sector: "healthcare",
  },
  {
    id: "tech-portfolio",
    text: "Students with a GitHub portfolio of 3+ projects get campus placement offers 4x more often than those without.",
    icon: "💻",
    sector: "technology",
  },
  {
    id: "ca-prep",
    text: "Only 10-15% of CA students clear CA Intermediate on their first attempt. Starting prep in Grade 11 doubles your chances.",
    icon: "📊",
    sector: "finance",
  },
  {
    id: "general",
    text: "Students who research 5+ career options before Grade 11 stream selection report 40% higher career satisfaction at age 25.",
    icon: "✨",
    sector: "all",
  },
];

export function WOWScreen({ onNavigate }: WOWScreenProps) {
  const { session } = useSession();
  const { results, studentProfile } = session;

  const [whatIfYears, setWhatIfYears] = useState(1);
  const [futureExpanded, setFutureExpanded] = useState(false);
  const [whatIfExpanded, setWhatIfExpanded] = useState(false);

  if (!results || !studentProfile) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h2 className="text-lg font-semibold mb-2">
            Complete the Identity Engine first
          </h2>
          <Button onClick={() => onNavigate({ view: "identity" })}>
            Start Identity Engine
          </Button>
        </div>
      </main>
    );
  }

  const top3 = results.topCareers.slice(0, 3);
  const [path1, _path2, _path3] = top3;

  const getSectorInsight = () => {
    const sector = path1 ? careerScoringMap[path1.id]?.sector : null;
    const match = SHOCKING_INSIGHTS.find((i) => i.sector === sector);
    return match || SHOCKING_INSIGHTS[3];
  };
  const insight = getSectorInsight();

  // What-if simulator
  const baseEntry = path1 ? path1.salaryEntry : 6;
  const whatIfUplift = Math.round(baseEntry * (1 + whatIfYears * 0.25));

  // Future self
  const grade = Number.parseInt(studentProfile.grade);
  const yearsTo25 = Math.max(0, 25 - (grade + 14));
  const yearsTo30 = Math.max(0, 30 - (grade + 14));

  // Bridge steps for top career
  const topBridgeSteps = path1
    ? getBridgeSteps(path1.id, studentProfile.grade)
    : [];
  const top3Tasks = topBridgeSteps.slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "My CareerLens India Blueprint",
          text: `My top career match is ${path1?.name} (${path1?.fitScore}% fit). Built with CareerLens India.`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `My top career match is ${path1?.name} (${path1?.fitScore}% fit). Check out CareerLens India!`,
      );
      toast.success("Blueprint link copied to clipboard!");
    }
  };

  const bandColors = {
    strong: "oklch(0.52 0.15 162)",
    good: "oklch(0.58 0.14 55)",
    stretch: "oklch(0.57 0.22 29)",
  };

  return (
    <main className="min-h-screen bg-background print:bg-white">
      {/* Hero WOW Header */}
      <section
        className="py-12 px-4 print:py-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.17 0.07 255) 0%, oklch(0.24 0.09 255) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 text-white border-white/30 bg-white/10">
            Step 5 of 5 — Your Blueprint
          </Badge>
          <motion.h1
            className="text-3xl sm:text-4xl font-display font-bold text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your Career Blueprint{" "}
            <Sparkles className="w-7 h-7 inline text-amber-400" />
          </motion.h1>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge className="bg-white/10 text-white border-white/20">
              Grade {studentProfile.grade}
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20">
              {studentProfile.stream
                .replace("science-pcm", "Science PCM")
                .replace("science-pcb", "Science PCB")}
            </Badge>
            {path1 && (
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                Top Match: {path1.name}
              </Badge>
            )}
          </div>
          <div className="flex justify-center gap-3 print:hidden">
            <Button
              data-ocid="wow.share.button"
              onClick={handleShare}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 gap-1.5"
              variant="outline"
            >
              <Share2 className="w-4 h-4" /> Share Blueprint
            </Button>
            <Button
              data-ocid="wow.print.button"
              onClick={() => window.print()}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 gap-1.5"
              variant="outline"
            >
              <Printer className="w-4 h-4" /> Print / PDF
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* 3 Career Paths Comparison */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-4">
            Your Top 3 Career Paths
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            data-ocid="wow.career_paths.section"
          >
            {top3.map((career, i) => {
              const meta = careerScoringMap[career.id];
              const isTop = i === 0;
              const color = bandColors[career.fitBand];
              return (
                <motion.div
                  key={career.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  data-ocid={`wow.career_path.item.${i + 1}`}
                >
                  <Card
                    className={`border h-full ${
                      isTop ? "shadow-md" : "shadow-xs"
                    } transition-all`}
                    style={{
                      borderTopWidth: "3px",
                      borderTopColor: color,
                    }}
                  >
                    <CardHeader className="pb-2">
                      {isTop && (
                        <Badge
                          className="w-fit mb-1 text-[10px]"
                          style={{ background: color, color: "white" }}
                        >
                          Best Match
                        </Badge>
                      )}
                      <CardTitle className="text-sm">{career.name}</CardTitle>
                      <p className="text-[10px] text-muted-foreground">
                        {career.sector}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-muted-foreground">
                            Fit:
                          </span>
                          <span className="text-sm font-bold" style={{ color }}>
                            {career.fitScore}%
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Entry salary
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            ₹{career.salaryEntry}L–{career.salaryMid}L
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Years to first job
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            {career.yearsToFirstJob} yrs
                          </p>
                        </div>
                        {meta && (
                          <SourceBadge
                            source={meta.dataSource}
                            confidence={meta.dataConfidence}
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Income Comparison */}
        {top3.length >= 2 && (
          <section>
            <h2 className="text-base font-semibold text-foreground mb-4">
              10-Year Cumulative Income Comparison
            </h2>
            <Card className="border shadow-xs">
              <CardContent className="p-5">
                <div className="space-y-4">
                  {top3.map((career) => {
                    const cumulative10 = Math.round(
                      career.salaryEntry * 2 +
                        career.salaryMid * 3 +
                        career.salaryMid * 1.4 * 3 +
                        career.salarySenior * 0.7 * 2,
                    );
                    const color = bandColors[career.fitBand];
                    const maxCumulative = Math.round(
                      top3[0].salaryEntry * 2 +
                        top3[0].salaryMid * 3 +
                        top3[0].salaryMid * 1.4 * 3 +
                        top3[0].salarySenior * 0.7 * 2,
                    );
                    const barPct = Math.round(
                      (cumulative10 / maxCumulative) * 100,
                    );
                    return (
                      <div key={career.id}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-foreground">
                            {career.name}
                          </span>
                          <span className="text-sm font-bold text-foreground">
                            ₹{cumulative10}L
                          </span>
                        </div>
                        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${barPct}%`, background: color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                {top3.length >= 2 && (
                  <p className="text-xs text-muted-foreground mt-4">
                    Choosing {top3[0].name} over {top3[top3.length - 1].name}{" "}
                    could mean{" "}
                    <strong>
                      ₹
                      {Math.abs(
                        Math.round(
                          (top3[0].salaryEntry -
                            top3[top3.length - 1].salaryEntry) *
                            2 +
                            (top3[0].salaryMid -
                              top3[top3.length - 1].salaryMid) *
                              5,
                        ),
                      )}
                      L more
                    </strong>{" "}
                    over your first 7 working years.
                  </p>
                )}
                <SourceBadge
                  source="Industry estimates, India 2025–26"
                  confidence="Medium"
                  className="mt-2"
                />
              </CardContent>
            </Card>
          </section>
        )}

        {/* 30-Day Plan Summary */}
        {top3Tasks.length > 0 && (
          <section>
            <h2 className="text-base font-semibold text-foreground mb-4">
              Your 30-Day Priority Steps
            </h2>
            <div className="space-y-2.5">
              {top3Tasks.map((step, planIdx) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: planIdx * 0.08 }}
                  data-ocid={`wow.plan_step.item.${planIdx + 1}`}
                  className="flex gap-3 p-3.5 rounded-xl border border-border bg-card"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: "oklch(0.28 0.11 255)" }}
                  >
                    {planIdx + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
                      {step.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Shocking Insight */}
        <motion.section
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 rounded-2xl border-2"
          style={{
            borderColor: "oklch(0.58 0.14 55)",
            background: "oklch(0.97 0.04 55)",
          }}
          data-ocid="wow.insight.card"
        >
          <div className="text-2xl mb-2">{insight.icon}</div>
          <p className="text-base font-bold text-foreground leading-snug">
            {insight.text}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Based on industry data and student outcomes research
          </p>
        </motion.section>

        {/* What-If Simulator */}
        <section>
          <button
            type="button"
            data-ocid="wow.whatif.button"
            onClick={() => setWhatIfExpanded((v) => !v)}
            className="flex items-center gap-2 text-base font-semibold text-foreground hover:text-primary transition-colors"
          >
            {whatIfExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            What-If Simulator
          </button>
          {whatIfExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4"
            >
              <Card className="border shadow-xs">
                <CardContent className="p-5">
                  <p className="text-sm font-medium text-foreground mb-4">
                    What if I invest {whatIfYears} more year
                    {whatIfYears > 1 ? "s" : ""} in education?
                  </p>
                  <Slider
                    min={0}
                    max={5}
                    step={1}
                    value={[whatIfYears]}
                    onValueChange={([v]) => setWhatIfYears(v)}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mb-4">
                    <span>No change</span>
                    <span>+5 years (PhD)</span>
                  </div>
                  <div
                    className="p-3 rounded-lg"
                    style={{ background: "oklch(0.95 0.02 162)" }}
                  >
                    <p className="text-xs text-muted-foreground">
                      Estimated entry salary uplift
                    </p>
                    <p
                      className="text-2xl font-display font-bold"
                      style={{ color: "oklch(0.52 0.15 162)" }}
                    >
                      ₹{whatIfUplift}L/year
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {whatIfYears > 0
                        ? `+${whatIfYears} year${whatIfYears > 1 ? "s" : ""} of qualification typically adds \u20b9${Math.round(baseEntry * 0.25 * whatIfYears)}L to your starting package.`
                        : "Your current projected entry salary with existing qualifications."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </section>

        {/* Future Self */}
        <section>
          <button
            type="button"
            data-ocid="wow.future_self.button"
            onClick={() => setFutureExpanded((v) => !v)}
            className="flex items-center gap-2 text-base font-semibold text-foreground hover:text-primary transition-colors"
          >
            {futureExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            Future Self Preview
          </button>
          {futureExpanded && path1 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 space-y-3"
            >
              {yearsTo25 >= 0 && (
                <Card
                  className="border shadow-xs"
                  style={{
                    borderLeftWidth: "3px",
                    borderLeftColor: "oklch(0.55 0.18 260)",
                  }}
                >
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      At age 25
                    </p>
                    <p className="text-sm text-foreground">
                      Working as a <strong>{path1.name}</strong> at a growing
                      company, earning approximately{" "}
                      <strong>
                        ₹{path1.salaryEntry + 2}L–{path1.salaryMid}L per year
                      </strong>
                      . Building a professional portfolio, mentored by senior
                      colleagues, and starting to specialize in your area of
                      strength.
                    </p>
                  </CardContent>
                </Card>
              )}
              {yearsTo30 >= 0 && (
                <Card
                  className="border shadow-xs"
                  style={{
                    borderLeftWidth: "3px",
                    borderLeftColor: "oklch(0.52 0.15 162)",
                  }}
                >
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      At age 30
                    </p>
                    <p className="text-sm text-foreground">
                      Senior-level <strong>{path1.name}</strong>, leading
                      projects or a small team, earning{" "}
                      <strong>
                        ₹{path1.salaryMid + 5}L–
                        {Math.round(path1.salarySenior * 0.6)}L per year
                      </strong>
                      . Recognized in your field, with options to specialize
                      further, move into management, or explore
                      entrepreneurship.
                    </p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}
        </section>

        {/* Final CTA */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 print:hidden">
          <Button
            data-ocid="wow.restart.button"
            variant="outline"
            className="flex-1 h-11"
            onClick={() => onNavigate({ view: "identity" })}
          >
            Retake Assessment
          </Button>
          <Button
            data-ocid="wow.explore.primary_button"
            className="flex-1 h-11 font-semibold"
            style={{ background: "oklch(0.28 0.11 255)", color: "white" }}
            onClick={() => onNavigate({ view: "explore" })}
          >
            Explore Career Profiles
          </Button>
        </div>
      </div>
    </main>
  );
}
