import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  BarChart2,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Code2,
  Globe,
  GraduationCap,
  Heart,
  Lightbulb,
  MapPin,
  MessageSquareQuote,
  Shield,
  TrendingUp,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { PageBreadcrumb } from "../components/Breadcrumb";
import type { DayBlock, TimeTier } from "../data/techDigitalCareers";
import { careerProfilesMap } from "../data/techDigitalCareers";
import { useGetSubtypeDetail } from "../hooks/useQueries";
import type { NavState } from "../types/navigation";

interface SubtypeDetailPageProps {
  subtypeId: string;
  subtypeName: string | undefined;
  typeId: string | undefined;
  typeName: string | undefined;
  categoryId: string | undefined;
  categoryName: string | undefined;
  onNavigate: (state: NavState) => void;
}

function formatLakhs(n: number): string {
  if (n >= 10_00_000) return `₹${(n / 10_00_000).toFixed(1)} Cr`;
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(1)}L`;
  return `₹${(n / 1000).toFixed(0)}K`;
}

function formatWorkers(n: bigint): string {
  const num = Number(n);
  if (num >= 10_000_000) return `${(num / 10_000_000).toFixed(1)} Crore`;
  if (num >= 100_000) return `${(num / 100_000).toFixed(1)} Lakh`;
  return num.toLocaleString("en-IN");
}

// ─── Day in Life: Structured Timeline Component ─────────────────────────────────

function DayTimeline({ blocks }: { blocks: DayBlock[] }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className="absolute left-[5.5rem] top-2 bottom-2 w-0.5"
        style={{ background: "oklch(0.88 0.04 60)" }}
      />
      <div className="space-y-5">
        {blocks.map((block, idx) => (
          <motion.div
            key={`${block.time}-${idx}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.07 }}
            className="flex gap-4"
          >
            {/* Time column */}
            <div
              className="w-16 flex-shrink-0 text-right pt-0.5"
              style={{ color: "oklch(0.55 0.04 60)" }}
            >
              <span className="text-xs font-mono leading-tight">
                {block.time}
              </span>
            </div>
            {/* Dot */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div
                className="w-3 h-3 rounded-full mt-1 z-10 ring-2 ring-white"
                style={{ background: "oklch(0.55 0.12 55)" }}
              />
            </div>
            {/* Content */}
            <div className="flex-1 pb-1">
              <p className="font-semibold text-sm text-foreground leading-snug">
                {block.title}
              </p>
              <p
                className="text-xs leading-relaxed mt-0.5"
                style={{ color: "oklch(0.40 0.04 60)" }}
              >
                {block.detail}
              </p>
              {block.tools && block.tools.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {block.tools.map((tool) => (
                    <span
                      key={tool}
                      className="bg-slate-100 text-slate-500 text-[10px] px-1.5 py-0.5 rounded font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Time-to-Career Tier Component ────────────────────────────────────────────

function TimeTierSection({ tiers }: { tiers: TimeTier[] }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showLadder, setShowLadder] = useState(false);
  const selected = tiers[selectedIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border shadow-card p-6"
    >
      <div className="flex items-center gap-2 mb-1">
        <Clock className="w-5 h-5" style={{ color: "oklch(0.45 0.12 255)" }} />
        <h2 className="font-bold text-foreground text-lg">
          ⏱️ Time-to-Career Pathways
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Choose based on how many years you can invest right now.
      </p>

      {/* Year selector buttons */}
      <div className="flex flex-wrap gap-2 mb-5">
        {tiers.map((tier, idx) => (
          <button
            key={tier.years}
            type="button"
            onClick={() => setSelectedIdx(idx)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold border-2 transition-all ${
              idx === selectedIdx
                ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
            }`}
            data-ocid="subtype.tier.toggle"
          >
            {tier.years}
          </button>
        ))}
      </div>

      {/* Selected tier card */}
      <motion.div
        key={selectedIdx}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border-2 p-5"
        style={{
          borderColor: "oklch(0.78 0.08 255)",
          background: "oklch(0.97 0.015 255)",
        }}
      >
        <div className="mb-3">
          <div
            className="text-base font-bold"
            style={{ color: "oklch(0.30 0.12 255)" }}
          >
            {selected.years} — {selected.label}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
          <div>
            <span className="font-semibold text-foreground">
              Qualification:{" "}
            </span>
            <span className="text-muted-foreground">
              {selected.qualification}
            </span>
          </div>
          <div>
            <span className="font-semibold text-foreground">Route: </span>
            <span className="text-muted-foreground">{selected.route}</span>
          </div>
          <div>
            <span className="font-semibold text-foreground">Entry Role: </span>
            <span className="text-muted-foreground">{selected.entryRole}</span>
          </div>
          <div>
            <span className="font-semibold text-foreground">
              Starting Salary:{" "}
            </span>
            <span className="text-muted-foreground">
              {selected.salaryRange}
            </span>
          </div>
          <div className="sm:col-span-2">
            <span className="font-semibold text-foreground">
              Estimated Cost:{" "}
            </span>
            <span className="text-muted-foreground">{selected.cost}</span>
          </div>
        </div>
        <div
          className="rounded-lg px-4 py-3 text-sm"
          style={{
            background: "oklch(0.94 0.03 145)",
            color: "oklch(0.30 0.10 145)",
          }}
        >
          <span className="font-semibold">💡 Want to go further?</span>{" "}
          {selected.ladderNote}
        </div>
      </motion.div>

      {/* Full ladder toggle */}
      <button
        type="button"
        onClick={() => setShowLadder((v) => !v)}
        className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        data-ocid="subtype.ladder.toggle"
      >
        {showLadder ? (
          <>
            <ChevronUp className="w-4 h-4" /> Hide full ladder
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" /> See full career ladder
          </>
        )}
      </button>

      {showLadder && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3 space-y-2"
        >
          {tiers.map((tier, idx) => (
            <button
              type="button"
              key={tier.years}
              onClick={() => setSelectedIdx(idx)}
              className={`w-full text-left rounded-lg border px-4 py-2.5 cursor-pointer transition-all ${
                idx === selectedIdx
                  ? "border-blue-400 bg-blue-50"
                  : "border-slate-200 bg-slate-50 opacity-60 hover:opacity-80"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm font-semibold ${
                    idx === selectedIdx ? "text-blue-700" : "text-slate-600"
                  }`}
                >
                  {tier.years}
                </span>
                <span className="text-xs text-muted-foreground">
                  {tier.label}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {tier.entryRole} • {tier.salaryRange}
              </div>
            </button>
          ))}
        </motion.div>
      )}

      <p
        className="text-xs mt-5 leading-relaxed"
        style={{
          color: "oklch(0.50 0.04 195)",
          background: "oklch(0.95 0.02 195)",
          borderRadius: "0.5rem",
          padding: "0.625rem 0.75rem",
        }}
      >
        Costs are approximate 2024 estimates. Government college fees are
        subsidized. Scholarships and education loans are available for all tiers
        — don’t let cost alone determine your path.
      </p>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function SubtypeDetailPage({
  subtypeId,
  subtypeName,
  typeId,
  typeName,
  categoryId,
  categoryName,
  onNavigate,
}: SubtypeDetailPageProps) {
  const { data: subtype, isLoading } = useGetSubtypeDetail(subtypeId);
  const richProfile = careerProfilesMap[subtypeId];
  const [gradeView, setGradeView] = useState<"9-10" | "11-12">("11-12");
  const [dayVariant, setDayVariant] = useState<"earlyCareer" | "established">(
    "earlyCareer",
  );

  const breadcrumbItems = [
    ...(categoryId
      ? [
          {
            label: categoryName || "Category",
            navState: { view: "category" as const, categoryId, categoryName },
          },
        ]
      : []),
    ...(typeId
      ? [
          {
            label: typeName || "Type",
            navState: {
              view: "type" as const,
              typeId,
              typeName,
              categoryId,
              categoryName,
            },
          },
        ]
      : []),
    {
      label: subtypeName || "Detail",
      navState: {
        view: "subtype" as const,
        subtypeId,
        subtypeName,
        typeId,
        typeName,
        categoryId,
        categoryName,
      },
    },
  ];

  const handleBack = () => {
    if (typeId) {
      onNavigate({ view: "type", typeId, typeName, categoryId, categoryName });
    } else {
      onNavigate({ view: "home" });
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <div
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
          data-ocid="subtype.loading_state"
        >
          <Skeleton className="h-4 w-64 mb-8" />
          <Skeleton className="h-10 w-96 mb-4" />
          <Skeleton className="h-24 w-full mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {["s1", "s2", "s3", "s4"].map((k) => (
              <Skeleton key={k} className="h-28" />
            ))}
          </div>
          <Skeleton className="h-64" />
        </div>
      </main>
    );
  }

  if (!subtype) {
    return (
      <main className="min-h-screen">
        <div
          className="max-w-5xl mx-auto px-4 py-10"
          data-ocid="subtype.error_state"
        >
          <p className="text-muted-foreground">Career details not found.</p>
          <Button onClick={handleBack} className="mt-4">
            Go Back
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <PageBreadcrumb items={breadcrumbItems} onNavigate={onNavigate} />

        {/* Grade View Toggle — only when rich profile exists */}
        {richProfile && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-3 p-3 rounded-xl border border-border bg-card shadow-xs"
            data-ocid="subtype.grade.toggle"
          >
            <span className="text-sm font-medium text-muted-foreground mr-1">
              Viewing as:
            </span>
            <button
              type="button"
              data-ocid="subtype.grade910.toggle"
              onClick={() => setGradeView("9-10")}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                gradeView === "9-10"
                  ? "text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{
                background:
                  gradeView === "9-10" ? "oklch(0.55 0.12 195)" : "transparent",
              }}
            >
              Grade 9–10
            </button>
            <button
              type="button"
              data-ocid="subtype.grade1112.toggle"
              onClick={() => setGradeView("11-12")}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                gradeView === "11-12"
                  ? "text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{
                background:
                  gradeView === "11-12"
                    ? "oklch(0.30 0.12 255)"
                    : "transparent",
              }}
            >
              Grade 11–12
            </button>
          </motion.div>
        )}

        <div className="mt-6">
          <Button
            data-ocid="subtype.back.button"
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-muted-foreground mb-3"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>

          {/* Header */}
          <div className="flex flex-wrap items-start gap-3 mb-4">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                {categoryName && (
                  <Badge variant="secondary">{categoryName}</Badge>
                )}
                {typeName && <Badge variant="outline">{typeName}</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                {subtype.name}
              </h1>
            </div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl border border-border shadow-card p-6 mb-6"
          >
            <p className="text-muted-foreground leading-relaxed">
              {subtype.description}
            </p>
          </motion.div>

          {/* Day in the Life — rich profile only */}
          {richProfile && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-xl border p-6 mb-6"
              style={{
                background: "oklch(0.98 0.025 60)",
                borderColor: "oklch(0.88 0.04 60)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.55 0.12 55)" }}
                >
                  <MessageSquareQuote className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h2
                    className="font-bold text-lg"
                    style={{ color: "oklch(0.35 0.10 55)" }}
                  >
                    A Day in the Life
                  </h2>
                  {richProfile.dayInTheLifeStructured && (
                    <div className="flex gap-2 mt-1.5">
                      <button
                        type="button"
                        onClick={() => setDayVariant("earlyCareer")}
                        className={`px-3 py-0.5 rounded-full text-xs font-semibold border transition-all ${
                          dayVariant === "earlyCareer"
                            ? "bg-amber-600 border-amber-600 text-white"
                            : "bg-white border-amber-300 text-amber-700 hover:bg-amber-50"
                        }`}
                        data-ocid="subtype.day_early.toggle"
                      >
                        Early Career
                      </button>
                      <button
                        type="button"
                        onClick={() => setDayVariant("established")}
                        className={`px-3 py-0.5 rounded-full text-xs font-semibold border transition-all ${
                          dayVariant === "established"
                            ? "bg-amber-600 border-amber-600 text-white"
                            : "bg-white border-amber-300 text-amber-700 hover:bg-amber-50"
                        }`}
                        data-ocid="subtype.day_established.toggle"
                      >
                        Established
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {richProfile.dayInTheLifeStructured ? (
                <DayTimeline
                  blocks={
                    dayVariant === "earlyCareer"
                      ? richProfile.dayInTheLifeStructured.earlyCareer
                      : richProfile.dayInTheLifeStructured.established
                  }
                />
              ) : (
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.40 0.04 60)" }}
                >
                  {richProfile.dayInTheLife}
                </p>
              )}
            </motion.div>
          )}

          {/* Stat Cards */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
          >
            <div className="bg-card rounded-xl border border-border shadow-card p-4 text-center">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2"
                style={{
                  background: "oklch(0.95 0.03 145)",
                  color: "oklch(0.40 0.13 145)",
                }}
              >
                <Users className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-foreground">
                {subtype.employmentPercentage.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">
                India Workforce
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-card p-4 text-center">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2"
                style={{
                  background: "oklch(0.94 0.025 220)",
                  color: "oklch(0.40 0.10 220)",
                }}
              >
                <BarChart2 className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-foreground">
                {formatWorkers(subtype.totalWorkersEstimate)}
              </div>
              <div className="text-xs text-muted-foreground">Total Workers</div>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-card p-4 text-center">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2"
                style={{
                  background: "oklch(0.96 0.04 55)",
                  color: "oklch(0.44 0.12 55)",
                }}
              >
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-foreground">
                {formatLakhs(subtype.salaryEntryLevel)}
              </div>
              <div className="text-xs text-muted-foreground">
                Entry Salary / yr
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-card p-4 text-center">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2"
                style={{
                  background: "oklch(0.93 0.06 50)",
                  color: "oklch(0.40 0.15 50)",
                }}
              >
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-foreground">
                {formatLakhs(subtype.salarySeniorLevel)}
              </div>
              <div className="text-xs text-muted-foreground">
                Senior Salary / yr
              </div>
            </div>
          </motion.div>

          {/* Grade 9-10 Focus callout */}
          {richProfile && gradeView === "9-10" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl p-5 mb-6 border"
              style={{
                background: "oklch(0.95 0.04 195)",
                borderColor: "oklch(0.75 0.10 195)",
              }}
              data-ocid="subtype.grade910.panel"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.55 0.12 195)" }}
                >
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3
                    className="font-bold text-base mb-1"
                    style={{ color: "oklch(0.25 0.10 195)" }}
                  >
                    What to Focus on RIGHT NOW
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.30 0.08 195)" }}
                  >
                    {richProfile.grade910SubjectFocus}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Value Chain + Activities */}
              <div className="bg-card rounded-xl border border-border shadow-card p-6">
                <h2 className="font-bold text-foreground text-lg mb-3 flex items-center gap-2">
                  <Zap
                    className="w-5 h-5"
                    style={{ color: "oklch(0.55 0.12 195)" }}
                  />
                  Value Chain & Activities
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {subtype.valueChainDescription}
                </p>
                {subtype.typicalActivities.length > 0 && (
                  <>
                    <Separator className="my-3" />
                    <h3 className="text-sm font-semibold text-foreground mb-2">
                      Typical Day-to-Day Activities
                    </h3>
                    <ul className="space-y-2">
                      {subtype.typicalActivities.map((act) => (
                        <li
                          key={act}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ background: "oklch(0.30 0.12 255)" }}
                          />
                          {act}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {/* Skills Required — rich profile only */}
              {richProfile && (
                <div className="bg-card rounded-xl border border-border shadow-card p-6">
                  <h2 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                    <BookOpen
                      className="w-5 h-5"
                      style={{ color: "oklch(0.45 0.12 280)" }}
                    />
                    Skills Required
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Code2
                          className="w-4 h-4"
                          style={{ color: "oklch(0.40 0.12 255)" }}
                        />
                        <span className="text-sm font-semibold text-foreground">
                          Technical Skills
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {richProfile.skillsTechnical.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{
                              background: "oklch(0.94 0.025 255)",
                              color: "oklch(0.30 0.12 255)",
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Heart
                          className="w-4 h-4"
                          style={{ color: "oklch(0.55 0.18 20)" }}
                        />
                        <span className="text-sm font-semibold text-foreground">
                          Soft Skills
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {richProfile.skillsSoft.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{
                              background: "oklch(0.96 0.03 20)",
                              color: "oklch(0.40 0.12 20)",
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Education Roadmap — rich profile only */}
              {richProfile && (
                <div className="bg-card rounded-xl border border-border shadow-card p-6">
                  <h2 className="font-bold text-foreground text-lg mb-5 flex items-center gap-2">
                    <GraduationCap
                      className="w-5 h-5"
                      style={{ color: "oklch(0.45 0.12 145)" }}
                    />
                    Education Roadmap
                  </h2>
                  <div className="space-y-0">
                    {/* Stage 1 — always visible */}
                    <RoadmapStep
                      step={1}
                      label="Grade 10 Onwards — Stream Choice"
                      text={
                        gradeView === "9-10"
                          ? richProfile.grade910SubjectFocus
                          : richProfile.educationRoadmapGrade10
                      }
                      color="oklch(0.55 0.12 195)"
                      isLast={gradeView === "9-10"}
                    />
                    {/* Stages 2-4 hidden in Grade 9-10 view */}
                    {gradeView === "11-12" && (
                      <>
                        <RoadmapStep
                          step={2}
                          label="Undergraduate (UG)"
                          text={richProfile.educationRoadmapUG}
                          color="oklch(0.45 0.12 255)"
                        />
                        <RoadmapStep
                          step={3}
                          label="Postgraduate (PG)"
                          text={richProfile.educationRoadmapPG}
                          color="oklch(0.40 0.12 280)"
                        />
                        <RoadmapStep
                          step={4}
                          label="PhD / Research"
                          text={richProfile.educationRoadmapPhD}
                          color="oklch(0.35 0.10 300)"
                          isLast
                        />
                      </>
                    )}
                    {gradeView === "9-10" && (
                      <div
                        className="ml-6 mt-3 px-4 py-2 rounded-lg text-xs"
                        style={{
                          background: "oklch(0.95 0.025 195)",
                          color: "oklch(0.40 0.08 195)",
                        }}
                      >
                        UG, PG and PhD pathways are shown in Grade 11–12 view —
                        focus on your subjects for now.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Time-to-Career Pathways — rich profile with timeTierRoadmap only */}
              {richProfile?.timeTierRoadmap &&
                richProfile.timeTierRoadmap.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 }}
                  >
                    <TimeTierSection tiers={richProfile.timeTierRoadmap} />
                  </motion.div>
                )}

              {/* Top Institutes — rich profile only */}
              {richProfile && (
                <div className="bg-card rounded-xl border border-border shadow-card p-6">
                  <h2 className="font-bold text-foreground text-lg mb-1 flex items-center gap-2">
                    <GraduationCap
                      className="w-5 h-5"
                      style={{ color: "oklch(0.50 0.12 55)" }}
                    />
                    Top Institutes
                  </h2>
                  {gradeView === "9-10" && (
                    <p className="text-xs text-muted-foreground mb-3">
                      These are the colleges to aim for. Focus on your studies
                      now and revisit this when you're in Grade 11.
                    </p>
                  )}
                  <Tabs defaultValue="india" className="mt-3">
                    <TabsList className="mb-4">
                      <TabsTrigger
                        value="india"
                        data-ocid="subtype.institutes_india.tab"
                      >
                        🇮🇳 India (Top 5)
                      </TabsTrigger>
                      <TabsTrigger
                        value="global"
                        data-ocid="subtype.institutes_global.tab"
                      >
                        🌍 Global (Top 5)
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="india" className="space-y-3">
                      {richProfile.topInstitutesIndia.map((inst, i) => (
                        <InstituteCard
                          key={inst.name}
                          institute={inst}
                          rank={i + 1}
                        />
                      ))}
                    </TabsContent>
                    <TabsContent value="global" className="space-y-3">
                      {richProfile.topInstitutesGlobal.map((inst, i) => (
                        <InstituteCard
                          key={inst.name}
                          institute={inst}
                          rank={i + 1}
                        />
                      ))}
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {/* Myths vs Reality — rich profile only */}
              {richProfile && (
                <div className="bg-card rounded-xl border border-border shadow-card p-6">
                  <h2 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                    <Shield
                      className="w-5 h-5"
                      style={{ color: "oklch(0.45 0.12 280)" }}
                    />
                    Common Myths — Busted
                  </h2>
                  <div className="space-y-4">
                    {richProfile.mythsVsReality.map((item) => (
                      <div
                        key={item.myth}
                        className="rounded-xl border border-border p-4"
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <XCircle
                            className="w-4 h-4 flex-shrink-0 mt-0.5"
                            style={{ color: "oklch(0.55 0.18 25)" }}
                          />
                          <p className="text-sm font-semibold text-foreground line-through opacity-60">
                            {item.myth}
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2
                            className="w-4 h-4 flex-shrink-0 mt-0.5"
                            style={{ color: "oklch(0.50 0.15 145)" }}
                          />
                          <p className="text-sm text-muted-foreground">
                            {item.reality}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Salary Breakdown */}
              <div className="bg-card rounded-xl border border-border shadow-card p-6">
                <h2 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                  <TrendingUp
                    className="w-5 h-5"
                    style={{ color: "oklch(0.45 0.12 145)" }}
                  />
                  Salary Benchmarks
                </h2>
                {gradeView === "9-10" ? (
                  <div
                    className="text-xs leading-relaxed rounded-lg px-4 py-3"
                    style={{
                      background: "oklch(0.95 0.03 195)",
                      color: "oklch(0.35 0.08 195)",
                    }}
                  >
                    Salary data is shown in Grade 11–12 view — focus on
                    discovering what interests you first!
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-4 font-semibold text-muted-foreground">
                            Level
                          </th>
                          <th className="text-left py-2 pr-4 font-semibold text-muted-foreground">
                            Experience
                          </th>
                          <th className="text-right py-2 font-semibold text-muted-foreground">
                            Annual CTC
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="py-3 pr-4">
                            <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                              Entry
                            </Badge>
                          </td>
                          <td className="py-3 pr-4 text-muted-foreground">
                            0–2 years
                          </td>
                          <td className="py-3 text-right font-semibold text-foreground">
                            {formatLakhs(subtype.salaryEntryLevel)}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4">
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
                              Mid
                            </Badge>
                          </td>
                          <td className="py-3 pr-4 text-muted-foreground">
                            3–7 years
                          </td>
                          <td className="py-3 text-right font-semibold text-foreground">
                            {formatLakhs(subtype.salaryMidLevel)}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4">
                            <Badge className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100">
                              Senior
                            </Badge>
                          </td>
                          <td className="py-3 pr-4 text-muted-foreground">
                            8+ years
                          </td>
                          <td className="py-3 text-right font-semibold text-foreground">
                            {formatLakhs(subtype.salarySeniorLevel)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Career Pathway callout */}
              {subtype.roleTypeContext && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl p-6 text-white"
                  style={{ background: "oklch(0.25 0.10 255)" }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "oklch(1 0 0 / 0.15)" }}
                    >
                      <Lightbulb className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">
                        How to Enter This Field
                      </h3>
                      <p className="text-sm text-white/75 leading-relaxed">
                        {subtype.roleTypeContext}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Typical Roles */}
              <div className="bg-card rounded-xl border border-border shadow-card p-6">
                <h2 className="font-bold text-foreground text-base mb-3 flex items-center gap-2">
                  <Briefcase
                    className="w-4 h-4"
                    style={{ color: "oklch(0.30 0.12 255)" }}
                  />
                  Typical Roles
                </h2>
                <div className="flex flex-wrap gap-2">
                  {subtype.typicalRoles.map((role) => (
                    <Badge
                      key={role}
                      variant="secondary"
                      className="text-xs px-2.5 py-1"
                    >
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Pros & Cons — rich profile only */}
              {richProfile && (
                <div className="bg-card rounded-xl border border-border shadow-card p-6">
                  <h2 className="font-bold text-foreground text-base mb-4 flex items-center gap-2">
                    <BarChart2
                      className="w-4 h-4"
                      style={{ color: "oklch(0.45 0.12 145)" }}
                    />
                    Pros &amp; Cons
                  </h2>
                  <div className="space-y-2 mb-4">
                    {richProfile.pros.map((pro) => (
                      <div key={pro} className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: "oklch(0.50 0.15 145)" }}
                        />
                        <span className="text-sm text-foreground">{pro}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-3" />
                  <div className="space-y-2">
                    {richProfile.cons.map((con) => (
                      <div key={con} className="flex items-start gap-2">
                        <XCircle
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: "oklch(0.55 0.18 25)" }}
                        />
                        <span className="text-sm text-muted-foreground">
                          {con}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Entrance Exams — rich profile only, hidden in Grade 9-10 */}
              {richProfile && (
                <div className="bg-card rounded-xl border border-border shadow-card p-6">
                  <h2 className="font-bold text-foreground text-base mb-3 flex items-center gap-2">
                    <BookOpen
                      className="w-4 h-4"
                      style={{ color: "oklch(0.45 0.12 55)" }}
                    />
                    Entrance Exams
                  </h2>
                  {gradeView === "9-10" ? (
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color: "oklch(0.50 0.06 195)",
                        background: "oklch(0.95 0.025 195)",
                        padding: "0.625rem 0.75rem",
                        borderRadius: "0.5rem",
                      }}
                    >
                      Entrance exam details are most useful in Grade 11–12.
                      Focus on your subjects for now.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {richProfile.entranceExams.map((exam) => (
                        <div key={exam.name}>
                          <p className="text-sm font-semibold text-foreground">
                            {exam.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {exam.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Global Context */}
              <div className="bg-card rounded-xl border border-border shadow-card p-6">
                <h2 className="font-bold text-foreground text-base mb-3 flex items-center gap-2">
                  <Globe
                    className="w-4 h-4"
                    style={{ color: "oklch(0.55 0.12 195)" }}
                  />
                  Global Context
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {subtype.globalContext}
                </p>
              </div>

              {/* Explore Related */}
              {typeId && (
                <div
                  className="rounded-xl p-6 text-white"
                  style={{ background: "oklch(0.30 0.10 195)" }}
                >
                  <h3 className="font-semibold mb-2">
                    Explore More in {typeName}
                  </h3>
                  <p className="text-sm text-white/70 mb-4">
                    Discover other career paths in this industry type.
                  </p>
                  <Button
                    data-ocid="subtype.explore_related.button"
                    onClick={() =>
                      onNavigate({
                        view: "type",
                        typeId,
                        typeName,
                        categoryId,
                        categoryName,
                      })
                    }
                    size="sm"
                    className="bg-white font-semibold hover:bg-white/90"
                    style={{ color: "oklch(0.30 0.10 195)" }}
                  >
                    View All Subtypes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

interface RoadmapStepProps {
  step: number;
  label: string;
  text: string;
  color: string;
  isLast?: boolean;
}

function RoadmapStep({ step, label, text, color, isLast }: RoadmapStepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: color }}
        >
          {step}
        </div>
        {!isLast && (
          <div
            className="w-0.5 flex-1 min-h-6 mt-1"
            style={{ background: "oklch(0.88 0.008 60)" }}
          />
        )}
      </div>
      <div className="pb-5 flex-1">
        <p className="text-sm font-semibold text-foreground mb-1">{label}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

interface InstituteCardProps {
  institute: {
    name: string;
    locationOrCountry: string;
    instituteType: string;
    note: string;
  };
  rank: number;
}

function InstituteCard({ institute, rank }: InstituteCardProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{
          background: "oklch(0.25 0.10 255)",
          color: "white",
        }}
      >
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <span className="text-sm font-semibold text-foreground">
            {institute.name}
          </span>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            {institute.instituteType}
          </Badge>
        </div>
        <div className="flex items-center gap-1 mb-1">
          <MapPin className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {institute.locationOrCountry}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{institute.note}</p>
      </div>
    </div>
  );
}
