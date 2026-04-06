import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Eye,
  EyeOff,
  Info,
  Printer,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SourceBadge } from "../../components/SourceBadge";
import { useSession } from "../../context/SessionContext";
import {
  computeBridgeMatchScore,
  getBridgeSteps,
} from "../../data/careerBridgeData";
import {
  careerPathwaysMap,
  getTierFromSlider,
} from "../../data/careerPathwaysData";
import { careerScoringMap } from "../../data/careerScoringData";
import type { NavState } from "../../types/navigation";

interface DecisionEngineProps {
  onNavigate: (state: NavState) => void;
  selectedCareer?: string;
}

const DISC_COLORS = {
  D: "oklch(0.57 0.22 29)",
  I: "oklch(0.55 0.18 260)",
  S: "oklch(0.52 0.15 162)",
  C: "oklch(0.58 0.14 55)",
};
const DISC_LABELS = {
  D: "Dominance",
  I: "Influence",
  S: "Steadiness",
  C: "Conscientiousness",
};

const TIER_BUTTONS = [
  { years: 1, label: "1 yr" },
  { years: 2, label: "2 yrs" },
  { years: 3, label: "3 yrs" },
  { years: 4, label: "4\u20135 yrs" },
  { years: 5, label: "6+ yrs" },
  { years: 6, label: "PhD" },
];

export function DecisionEngine({
  onNavigate,
  selectedCareer: initialCareer,
}: DecisionEngineProps) {
  const { session } = useSession();
  const { results, studentProfile, moduleScores, sliderValues } = session;

  const [selectedId, setSelectedId] = useState(
    initialCareer || session.selectedCareer || results?.topCareers[0]?.id || "",
  );
  const [roiExpanded, setRoiExpanded] = useState(false);
  const [parentView, setParentView] = useState(false);

  // Investment Window: default from slider "time" value
  const defaultTierYears = sliderValues
    ? getTierFromSlider(sliderValues.time)
    : 3;
  const [selectedTierYears, setSelectedTierYears] =
    useState<number>(defaultTierYears);

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

  const career = selectedId ? careerScoringMap[selectedId] : null;
  const secondCareer = results.topCareers[1];

  // Bridge
  const bridgeSteps = selectedId
    ? getBridgeSteps(selectedId, studentProfile.grade, studentProfile.stream)
    : [];
  const bridgeScore =
    selectedId && moduleScores
      ? computeBridgeMatchScore(
          selectedId,
          Object.entries(moduleScores)
            .filter(([k]) =>
              [
                "logical",
                "numerical",
                "verbal",
                "scientific",
                "creative",
                "leadership",
              ].includes(k),
            )
            .map(([moduleId, score]) => ({ moduleId, score: score as number })),
          moduleScores.riasecCounts,
          moduleScores.hollandCode,
          moduleScores.gritLevel,
          moduleScores.mindsetType,
        )
      : null;

  // ROI computation (simplified)
  const entryLPA = career?.salaryEntry || 6;
  const midLPA = career?.salaryMid || 15;
  const fiveYearIncome = Math.round(entryLPA * 2 + midLPA * 3);
  const secondFiveYear = secondCareer
    ? Math.round(secondCareer.salaryEntry * 2 + secondCareer.salaryMid * 3)
    : 0;
  const delta = fiveYearIncome - secondFiveYear;

  // Investment Window — find exact tier or nearest available tier
  const pathway = selectedId ? careerPathwaysMap[selectedId] : null;

  const selectedTier = pathway?.tiers.length
    ? (pathway.tiers.find((t) => t.years === selectedTierYears) ??
      pathway.tiers.reduce((best, t) => {
        const bestDiff = Math.abs(best.years - selectedTierYears);
        const tDiff = Math.abs(t.years - selectedTierYears);
        return tDiff < bestDiff ? t : best;
      }, pathway.tiers[0]))
    : undefined;

  // Use selected tier values when available, otherwise fall back to career defaults
  const displayYearsToJob = selectedTier
    ? selectedTier.years
    : career?.yearsToFirstJob || 4;

  // Salary display — never empty
  const displaySalaryRange = selectedTier
    ? selectedTier.salaryRange
    : career
      ? `\u20b9${career.salaryEntry}L\u2013${career.salaryMid}L LPA`
      : "See pathways below";

  // Education loan scenario
  const loanAmount = Math.round(displayYearsToJob * 1.5);
  const emi = Math.round(
    (((loanAmount * 100000 * 0.09) / 12) * (1.09 / 12 + 1) ** 60) /
      ((1.09 / 12 + 1) ** 60 - 1) /
      1000,
  );

  const grade = Number.parseInt(studentProfile.grade);
  const isGrade910 = grade <= 10;

  // Determine which tier button should show as the "from quiz" default
  const quizDefaultTier = defaultTierYears;

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
          {/* Back button */}
          <button
            type="button"
            data-ocid="decision.back.button"
            onClick={() => onNavigate({ view: "opportunity" })}
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs mb-4 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to Career Matches
          </button>

          <Badge className="mb-3 text-white border-white/30 bg-white/10">
            Step 3 of 5 \u2014 Decision Engine
          </Badge>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">
                {parentView
                  ? "Your Child's Career Blueprint"
                  : "Your Decision Plan"}
              </h1>
              <p className="text-white/70 text-sm">
                {parentView
                  ? "ROI-first view for parents and family"
                  : "ROI analysis, investment window, bridge steps, and your DISC profile"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                data-ocid="decision.parent_view.toggle"
                onClick={() => setParentView((v) => !v)}
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 gap-1.5 text-xs"
              >
                {parentView ? (
                  <EyeOff className="w-3 h-3" />
                ) : (
                  <Eye className="w-3 h-3" />
                )}
                {parentView ? "Student View" : "Parent View"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                data-ocid="decision.print.button"
                onClick={() => window.print()}
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 gap-1.5 text-xs"
              >
                <Printer className="w-3 h-3" /> Print
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Career Selector */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-foreground shrink-0">
            Analysing career:
          </span>
          <Select
            value={selectedId}
            onValueChange={(val) => {
              setSelectedId(val);
              // Reset to quiz default tier when switching careers
              setSelectedTierYears(defaultTierYears);
            }}
          >
            <SelectTrigger
              data-ocid="decision.career.select"
              className="w-auto min-w-[200px] h-9"
            >
              <SelectValue placeholder="Select a career" />
            </SelectTrigger>
            <SelectContent>
              {results.topCareers.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name} \u2014 {c.fitScore}% match
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {career && (
          <>
            {/* Parent View: Key facts panel — shown first when in parent mode */}
            {parentView && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                data-ocid="decision.parent_facts.card"
              >
                <Card
                  className="border shadow-xs"
                  style={{ background: "oklch(0.97 0.015 255)" }}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-foreground">
                      Key facts for your family
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <span
                          className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            background: "oklch(0.52 0.15 162)",
                            marginTop: "6px",
                          }}
                        />
                        <span className="text-foreground">
                          Your child can start earning within{" "}
                          <strong>{displayYearsToJob} years</strong> after Grade
                          12
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span
                          className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            background: "oklch(0.52 0.15 162)",
                            marginTop: "6px",
                          }}
                        />
                        <span className="text-foreground">
                          Entry salary range:{" "}
                          <strong>{displaySalaryRange}</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span
                          className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            background: "oklch(0.52 0.15 162)",
                            marginTop: "6px",
                          }}
                        />
                        <span className="text-foreground">
                          Education cost estimate is available in the Investment
                          Window below \u2014 select the years of education your
                          family can support
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* ROI Summary */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border shadow-xs overflow-hidden">
                <CardHeader
                  className="py-4 px-5"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.17 0.07 255) 0%, oklch(0.24 0.09 255) 100%)",
                  }}
                >
                  <CardTitle className="text-white text-base">
                    {parentView
                      ? `Investment Summary for ${career.name}`
                      : `Your ROI \u2014 ${career.name}`}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-4">
                    {/* Stat 1: Years to earn */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        You start earning in
                      </p>
                      <p className="text-2xl font-display font-bold text-foreground">
                        {displayYearsToJob}{" "}
                        <span className="text-base font-normal">yrs</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        after Grade 12
                      </p>
                    </div>
                    {/* Stat 2: Entry Salary Range */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Entry Salary Range
                      </p>
                      <p
                        className="text-xl font-display font-bold"
                        style={{ color: "oklch(0.35 0.12 162)" }}
                      >
                        {displaySalaryRange}
                      </p>
                      <p className="text-xs text-muted-foreground">per year</p>
                    </div>
                    {/* Stat 3: vs 2nd choice delta */}
                    {secondCareer && delta > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {parentView
                            ? "vs. next best option"
                            : "vs. your 2nd choice"}
                        </p>
                        <p
                          className="text-2xl font-display font-bold"
                          style={{ color: "oklch(0.52 0.15 162)" }}
                        >
                          +\u20b9{delta}L
                        </p>
                        <p className="text-xs text-muted-foreground">
                          more over 5 years
                        </p>
                      </div>
                    )}
                  </div>
                  <SourceBadge
                    source={career.dataSource}
                    confidence={career.dataConfidence}
                  />

                  {/* Expand ROI */}
                  <button
                    type="button"
                    data-ocid="decision.roi_expand.button"
                    onClick={() => setRoiExpanded((v) => !v)}
                    className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-primary hover:underline underline-offset-2"
                  >
                    {roiExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                    {roiExpanded ? "Hide" : "See"} full ROI breakdown
                  </button>

                  {roiExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 space-y-4"
                    >
                      {/* 5-year cumulative earnings */}
                      <div
                        className="rounded-lg p-3 border"
                        style={{ background: "oklch(0.97 0.007 255)" }}
                      >
                        <p className="text-xs text-muted-foreground mb-1">
                          {parentView
                            ? "5-year earning potential"
                            : "Earnings in first 5 years"}
                        </p>
                        <p className="text-xl font-display font-bold text-foreground">
                          \u20b9{fiveYearIncome}L
                        </p>
                        <p className="text-xs text-muted-foreground">
                          cumulative estimate
                        </p>
                      </div>

                      {/* Year-by-year table */}
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          Year-by-Year Earnings Estimate
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left py-1.5 pr-3 text-muted-foreground font-medium">
                                  Year
                                </th>
                                <th className="text-left py-1.5 pr-3 text-muted-foreground font-medium">
                                  Role Level
                                </th>
                                <th className="text-right py-1.5 text-muted-foreground font-medium">
                                  Est. LPA
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                {
                                  yr: 1,
                                  role: "Entry / Junior",
                                  lpa: career.salaryEntry,
                                },
                                {
                                  yr: 2,
                                  role: "Entry / Junior",
                                  lpa: Math.round(career.salaryEntry * 1.12),
                                },
                                {
                                  yr: 3,
                                  role: "Mid-level",
                                  lpa: Math.round(career.salaryMid * 0.75),
                                },
                                {
                                  yr: 5,
                                  role: "Mid-level",
                                  lpa: career.salaryMid,
                                },
                                {
                                  yr: 7,
                                  role: "Senior / Lead",
                                  lpa: Math.round(career.salaryMid * 1.5),
                                },
                                {
                                  yr: 10,
                                  role: "Senior / Lead",
                                  lpa: career.salarySenior
                                    ? Math.round(career.salarySenior * 0.7)
                                    : Math.round(career.salaryMid * 2),
                                },
                              ].map((row) => (
                                <tr
                                  key={row.yr}
                                  className="border-b border-border/50"
                                >
                                  <td className="py-1.5 pr-3 text-foreground">
                                    Year {row.yr}
                                  </td>
                                  <td className="py-1.5 pr-3 text-muted-foreground">
                                    {row.role}
                                  </td>
                                  <td className="py-1.5 text-right font-semibold text-foreground">
                                    \u20b9{row.lpa}L
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          Estimates based on industry data. Actual salaries vary
                          by employer, location, and performance.
                        </p>
                      </div>

                      {/* Education loan scenario */}
                      {!isGrade910 && (
                        <Card className="bg-secondary/50 border">
                          <CardContent className="p-3.5">
                            <h4 className="text-xs font-semibold text-foreground mb-2">
                              Education Loan Scenario
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              If you borrow <strong>\u20b9{loanAmount}L</strong>{" "}
                              at <strong>9% p.a.</strong> for 5 years:
                            </p>
                            <p className="text-sm font-semibold text-foreground mt-1.5">
                              EMI \u2248 \u20b9{emi},000/month
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Loan paid off by Year{" "}
                              {Math.ceil(
                                (loanAmount * 100000) / (emi * 1000 * 12),
                              )}{" "}
                              of your career. Education loans are often
                              tax-deductible under Section 80E.
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Investment Window \u2014 Time-to-Career Pathways */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
            >
              <Card className="border shadow-xs overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp
                      className="w-4 h-4"
                      style={{ color: "oklch(0.52 0.15 162)" }}
                    />
                    <CardTitle className="text-base">
                      Investment Window
                    </CardTitle>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    How many years can you invest in education right now?
                  </p>
                  {/* Hint: which tier is pre-selected from the quiz */}
                  <div className="flex items-start gap-1.5 mt-1.5 p-2 rounded-lg bg-secondary/60 border border-border">
                    <Info className="w-3 h-3 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground">
                        {TIER_BUTTONS.find((b) => b.years === quizDefaultTier)
                          ?.label ?? `${quizDefaultTier} yr`}
                      </span>{" "}
                      is pre-selected based on your Time preference from the
                      quiz. Change anytime to compare pathways.
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Tier buttons */}
                  <div
                    className="flex flex-wrap gap-2 mb-4"
                    data-ocid="decision.investment_window.section"
                  >
                    {TIER_BUTTONS.map((btn) => {
                      const isSelected = selectedTierYears === btn.years;
                      const isDefault = btn.years === quizDefaultTier;
                      const hasData = pathway?.tiers.some(
                        (t) => t.years === btn.years,
                      );
                      return (
                        <button
                          key={btn.years}
                          type="button"
                          data-ocid={`decision.tier.button.${btn.years}`}
                          onClick={() => setSelectedTierYears(btn.years)}
                          disabled={!hasData && !pathway}
                          className={[
                            "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all relative",
                            isSelected
                              ? "text-white border-transparent"
                              : hasData
                                ? "bg-background border-border text-foreground hover:border-primary/60"
                                : "bg-muted border-border text-muted-foreground opacity-40 cursor-not-allowed",
                          ].join(" ")}
                          style={
                            isSelected
                              ? { background: "oklch(0.28 0.11 255)" }
                              : isDefault && !isSelected && hasData
                                ? {
                                    borderColor: "oklch(0.52 0.15 162)",
                                    color: "oklch(0.35 0.12 162)",
                                  }
                                : {}
                          }
                        >
                          {btn.label}
                          {isDefault && !isSelected && (
                            <span
                              className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full"
                              style={{ background: "oklch(0.52 0.15 162)" }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Tier detail card */}
                  {selectedTier ? (
                    <motion.div
                      key={`${selectedId}-${selectedTierYears}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-xl border p-4 space-y-3"
                      style={{ background: "oklch(0.97 0.007 255)" }}
                    >
                      <div>
                        <p
                          className="text-lg font-display font-bold"
                          style={{ color: "oklch(0.28 0.11 255)" }}
                        >
                          {selectedTier.qualification}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {selectedTier.route}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                            Entry Role
                          </p>
                          <p className="text-sm font-semibold text-foreground mt-0.5">
                            {selectedTier.entryRole}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                            Salary Range
                          </p>
                          <p
                            className="text-sm font-semibold mt-0.5"
                            style={{ color: "oklch(0.35 0.12 162)" }}
                          >
                            {selectedTier.salaryRange}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                            Education Cost
                          </p>
                          <p className="text-sm font-semibold text-foreground mt-0.5">
                            {selectedTier.educationCost}
                          </p>
                        </div>
                      </div>

                      <SourceBadge
                        source="India industry estimates 2025\u201326"
                        confidence="Medium"
                      />

                      {/* Ladder note */}
                      <div
                        className="rounded-lg p-3 border"
                        style={{
                          background: "oklch(0.96 0.03 162)",
                          borderColor: "oklch(0.85 0.06 162)",
                        }}
                      >
                        <p
                          className="text-[10px] font-bold uppercase tracking-wide mb-1"
                          style={{ color: "oklch(0.35 0.12 162)" }}
                        >
                          \u2191 Want to go further later?
                        </p>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: "oklch(0.30 0.10 162)" }}
                        >
                          {selectedTier.ladderNote}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div
                      className="rounded-xl border border-dashed p-6 text-center"
                      data-ocid="decision.investment_window.empty_state"
                    >
                      <p className="text-sm text-muted-foreground">
                        Detailed pathways coming soon for this career.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Check the bridge steps below for actionable guidance.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Aspiration Bridge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="border shadow-xs">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-base">
                      Your Path to {career.name}
                    </CardTitle>
                    {bridgeScore && (
                      <Badge
                        className="text-xs"
                        style={
                          bridgeScore.score >= 70
                            ? {
                                background: "oklch(0.95 0.03 162)",
                                color: "oklch(0.35 0.12 162)",
                              }
                            : {
                                background: "oklch(0.97 0.04 55)",
                                color: "oklch(0.40 0.12 55)",
                              }
                        }
                      >
                        {bridgeScore.score}% match
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isGrade910
                      ? "Grade 9\u201310 action steps \u2014 building your foundation"
                      : "Grade 11\u201312 action steps \u2014 final sprint to entry"}
                  </p>
                  {parentView && (
                    <p className="text-xs text-muted-foreground mt-1 italic">
                      These are the concrete steps your child needs to take to
                      enter this career successfully.
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <div
                    className="space-y-3"
                    data-ocid="decision.bridge.section"
                  >
                    {bridgeSteps.map((step, stepIdx) => (
                      <div
                        key={step.label}
                        data-ocid={`decision.bridge_step.item.${stepIdx + 1}`}
                        className="flex gap-3"
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                          style={{ background: "oklch(0.28 0.11 255)" }}
                        >
                          {stepIdx + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {step.label}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {bridgeScore?.gritGap && (
                    <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <p className="text-xs font-semibold text-amber-800">
                        Grit gap identified
                      </p>
                      <p className="text-xs text-amber-700 mt-0.5">
                        This career requires sustained effort over many years.
                        Your assessment suggests this may be challenging.
                        Building a consistent daily study habit now is your most
                        important step.
                      </p>
                    </div>
                  )}

                  {bridgeScore?.mindsetGap && (
                    <div className="mt-3 p-3 rounded-lg bg-rose-50 border border-rose-200">
                      <p className="text-xs font-semibold text-rose-800">
                        Mindset bridge needed
                      </p>
                      <p className="text-xs text-rose-700 mt-0.5">
                        This career rewards a growth mindset \u2014 treating
                        setbacks as data, not judgments. Read Carol Dweck's
                        Mindset (free summaries online) before your next exam
                        season.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* DISC Profile */}
            {results.discProfile && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
              >
                <Card className="border shadow-xs">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Your DISC Profile
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Derived from your assessment \u2014{" "}
                      {results.discProfile.descriptor}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2.5">
                      {(["D", "I", "S", "C"] as const).map((key) => {
                        const score = results.discProfile![key];
                        const isDominant =
                          results.discProfile!.dominantType === key;
                        return (
                          <div key={key} className="flex items-center gap-3">
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                              style={{
                                background: DISC_COLORS[key],
                                opacity: isDominant ? 1 : 0.65,
                              }}
                            >
                              {key}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-foreground">
                                  {DISC_LABELS[key]}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {score}%
                                </span>
                              </div>
                              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-700"
                                  style={{
                                    width: `${score}%`,
                                    background: DISC_COLORS[key],
                                  }}
                                />
                              </div>
                            </div>
                            {isDominant && (
                              <Badge
                                className="text-[10px]"
                                style={{
                                  background: DISC_COLORS[key],
                                  color: "white",
                                }}
                              >
                                Primary
                              </Badge>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </>
        )}

        {/* CTA */}
        <div className="flex gap-3 flex-wrap">
          <Button
            data-ocid="decision.go_execution.primary_button"
            onClick={() => onNavigate({ view: "execution" })}
            className="flex-1 h-11 font-semibold"
            style={{ background: "oklch(0.58 0.14 55)", color: "white" }}
          >
            Build My 30-Day Plan
          </Button>
          <Button
            variant="outline"
            data-ocid="decision.go_wow.button"
            onClick={() => onNavigate({ view: "wow" })}
            className="flex-1 h-11 font-semibold"
          >
            See My Blueprint
          </Button>
        </div>
      </div>
    </main>
  );
}
