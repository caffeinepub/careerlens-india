import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Flame,
  Lightbulb,
  Printer,
  RotateCcw,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import {
  type AssessmentModule,
  assessmentModules,
} from "../data/assessmentModules";
import {
  type AssessmentQuestion,
  type ModuleId,
  type RiasecType,
  questionsByModule,
} from "../data/assessmentQuestions";
import {
  computeBridgeMatchScore,
  getBridgeSteps,
} from "../data/careerBridgeData";
import {
  dreamCareerGroups,
  dreamCareerNameMap,
} from "../data/dreamCareerOptions";
import { careerProfilesMap } from "../data/techDigitalCareers";
import type { NavState } from "../types/navigation";

interface AssessmentPageProps {
  onNavigate: (state: NavState) => void;
  initialGrade?: string;
  initialStream?: string;
  initialSubjects?: string[];
}

// ─── Types ────────────────────────────────────────────────────────

type Phase = "intro" | "module" | "module-transition" | "results";

type Confidence = "sure" | "not-sure" | "guesswork";

interface Answer {
  questionId: string;
  selectedOptionId: string;
  confidence: Confidence;
}

interface SessionState {
  phase: Phase;
  grade: string;
  stream: string;
  selectedSubjects: string[];
  currentModuleIndex: number;
  currentQuestionIndex: number;
  sessionQuestions: AssessmentQuestion[][];
  answers: Answer[];
  pendingAnswer: string | null;
}

interface ModuleScore {
  moduleId: ModuleId;
  score: number;
  band: "High" | "Medium" | "Low";
  insight: string;
}

interface RiasecCounts {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

interface GritProfile {
  gritScore: number;
  mindsetScore: number;
  dominantValue: string;
  gritLevel: "High" | "Medium" | "Low";
  mindsetType: "Growth" | "Fixed" | "Mixed";
}

interface Results {
  moduleScores: ModuleScore[];
  riasecCounts: RiasecCounts;
  hollandCode: string;
  gritProfile: GritProfile;
  topClusters: string[];
  confidenceDist: { sure: number; notSure: number; guesswork: number };
}

// ─── Helpers ────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildSessionQuestions(): AssessmentQuestion[][] {
  return assessmentModules.map((mod) => {
    const pool = questionsByModule[mod.id];
    if (mod.id === "riasec") {
      // Pick 2 per RIASEC type
      const types: RiasecType[] = ["R", "I", "A", "S", "E", "C"];
      const picked: AssessmentQuestion[] = [];
      for (const t of types) {
        const typeQs = pool.filter((q) => q.riasecType === t);
        picked.push(...shuffle(typeQs).slice(0, 2));
      }
      return shuffle(picked);
    }
    if (mod.id === "grit") {
      return pool; // all 12 shown
    }
    return shuffle(pool).slice(0, mod.showCount);
  });
}

function calculateResults(
  sessionQuestions: AssessmentQuestion[][],
  answers: Answer[],
): Results {
  const answerMap = new Map(answers.map((a) => [a.questionId, a]));

  const moduleScores: ModuleScore[] = [];
  const riasecCounts: RiasecCounts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  let gritTotal = 0;
  let gritCount = 0;
  let mindsetGrowthCount = 0;
  let mindsetTotalCount = 0;
  const valueCounts: Record<string, number> = {};

  assessmentModules.forEach((mod, idx) => {
    const qs = sessionQuestions[idx];
    if (!qs) return;

    if (mod.scoringType === "aptitude") {
      let points = 0;
      let maxPoints = 0;

      for (const q of qs) {
        const ans = answerMap.get(q.id);
        if (!ans) continue;
        const confMultiplier =
          ans.confidence === "sure"
            ? 1
            : ans.confidence === "not-sure"
              ? 0.7
              : 0.4;
        if (q.correctOptionId && ans.selectedOptionId === q.correctOptionId) {
          points += confMultiplier;
        }
        maxPoints += 1;
      }

      const score = maxPoints > 0 ? Math.round((points / maxPoints) * 100) : 50;
      const band: "High" | "Medium" | "Low" =
        score >= 70 ? "High" : score >= 45 ? "Medium" : "Low";
      moduleScores.push({
        moduleId: mod.id,
        score,
        band,
        insight:
          band === "High"
            ? `High engagement in ${mod.title} — aligns with ${mod.unlocksFor[0]} careers`
            : `Good ${mod.title} baseline — growing through practice and projects`,
      });
    } else if (mod.scoringType === "riasec") {
      for (const q of qs) {
        const ans = answerMap.get(q.id);
        if (!ans) continue;
        const selected = q.options.find((o) => o.id === ans.selectedOptionId);
        if (selected?.riasecType) {
          riasecCounts[selected.riasecType] =
            (riasecCounts[selected.riasecType] || 0) + 1;
        }
      }
      moduleScores.push({
        moduleId: mod.id,
        score: 100,
        band: "High",
        insight: "RIASEC personality profile complete — Holland Code generated",
      });
    } else if (mod.scoringType === "grit") {
      for (const q of qs) {
        const ans = answerMap.get(q.id);
        if (!ans) continue;
        const dim = q.gritDimension;
        if (dim === "grit") {
          const scores: Record<string, number> = { a: 1, b: 2, c: 3, d: 4 };
          gritTotal += scores[ans.selectedOptionId] || 1;
          gritCount++;
        } else if (dim === "mindset") {
          mindsetTotalCount++;
          if (ans.selectedOptionId === "b" || ans.selectedOptionId === "d") {
            mindsetGrowthCount++;
          }
        } else if (dim === "values") {
          const valueMap: Record<string, string> = {
            a: "Security & Stability",
            b: "High Income",
            c: "Positive Impact",
            d: "Creative Freedom",
          };
          const v = valueMap[ans.selectedOptionId];
          if (v) valueCounts[v] = (valueCounts[v] || 0) + 1;
        }
      }
      moduleScores.push({
        moduleId: mod.id,
        score: 100,
        band: "High",
        insight: "Grit, Mindset & Values profile complete",
      });
    }
  });

  // Holland Code: top 2 RIASEC types
  const sorted = (Object.entries(riasecCounts) as [RiasecType, number][]).sort(
    (a, b) => b[1] - a[1],
  );
  const hollandCode = sorted
    .slice(0, 2)
    .map((x) => x[0])
    .join("");

  const avgGrit = gritCount > 0 ? gritTotal / gritCount : 2;
  const gritPct =
    mindsetTotalCount > 0 ? mindsetGrowthCount / mindsetTotalCount : 0.5;
  const dominantValue =
    Object.entries(valueCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "Exploration";

  const gritProfile: GritProfile = {
    gritScore: Math.round((avgGrit / 4) * 100),
    mindsetScore: Math.round(gritPct * 100),
    dominantValue,
    gritLevel: avgGrit >= 3 ? "High" : avgGrit >= 2 ? "Medium" : "Low",
    mindsetType: gritPct >= 0.6 ? "Growth" : gritPct >= 0.4 ? "Mixed" : "Fixed",
  };

  // Top career clusters
  const logScore =
    moduleScores.find((m) => m.moduleId === "logical")?.score || 0;
  const numScore =
    moduleScores.find((m) => m.moduleId === "numerical")?.score || 0;
  const sciScore =
    moduleScores.find((m) => m.moduleId === "scientific")?.score || 0;
  const verScore =
    moduleScores.find((m) => m.moduleId === "verbal")?.score || 0;
  const creScore =
    moduleScores.find((m) => m.moduleId === "creative")?.score || 0;
  const leaScore =
    moduleScores.find((m) => m.moduleId === "leadership")?.score || 0;

  const clusterMap: Record<string, number> = {
    "Engineering & Technology": (logScore + numScore + sciScore) / 3,
    "Data Science & Research":
      (logScore + numScore + sciScore) / 3 +
      (hollandCode.includes("I") ? 15 : 0),
    "Design & Creative Arts": creScore + (hollandCode.includes("A") ? 20 : 0),
    "Management & Leadership":
      (leaScore + verScore) / 2 + (hollandCode.includes("E") ? 15 : 0),
    "Law & Journalism": (verScore + logScore) / 2,
    "Healthcare & Medicine": sciScore + (hollandCode.includes("S") ? 10 : 0),
    "Education & Social Work": leaScore + (hollandCode.includes("S") ? 20 : 0),
    "Finance & Economics": numScore + (hollandCode.includes("C") ? 15 : 0),
    Entrepreneurship:
      (creScore + leaScore) / 2 + (hollandCode.includes("E") ? 20 : 0),
  };

  const topClusters = Object.entries(clusterMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((x) => x[0]);

  const confidenceDist = answers.reduce(
    (acc, a) => {
      if (a.confidence === "sure") acc.sure++;
      else if (a.confidence === "not-sure") acc.notSure++;
      else acc.guesswork++;
      return acc;
    },
    { sure: 0, notSure: 0, guesswork: 0 },
  );

  return {
    moduleScores,
    riasecCounts,
    hollandCode,
    gritProfile,
    topClusters,
    confidenceDist,
  };
}

// ─── DISC Derivation ──────────────────────────────────────────────────

function deriveDiscScores(
  results: Results,
): Record<"D" | "I" | "S" | "C", number> {
  const raw = {
    D: Math.round(
      (results.moduleScores.find((m) => m.moduleId === "leadership")?.score ||
        0) *
        0.6 +
        (results.riasecCounts.E || 0) * 5,
    ),
    I: Math.round(
      (results.moduleScores.find((m) => m.moduleId === "verbal")?.score || 0) *
        0.5 +
        ((results.riasecCounts.S || 0) + (results.riasecCounts.A || 0)) * 4,
    ),
    S: Math.round(
      results.gritProfile.gritScore * 0.6 + (results.riasecCounts.S || 0) * 4,
    ),
    C: Math.round(
      (((results.moduleScores.find((m) => m.moduleId === "logical")?.score ||
        0) +
        (results.moduleScores.find((m) => m.moduleId === "numerical")?.score ||
          0)) /
        2) *
        0.7 +
        (results.riasecCounts.C || 0) * 4,
    ),
  };
  const maxVal = Math.max(...Object.values(raw), 1);
  return {
    D: Math.min(Math.round((raw.D / maxVal) * 100), 100),
    I: Math.min(Math.round((raw.I / maxVal) * 100), 100),
    S: Math.min(Math.round((raw.S / maxVal) * 100), 100),
    C: Math.min(Math.round((raw.C / maxVal) * 100), 100),
  };
}

const riasecLabels: Record<RiasecType, string> = {
  R: "Realistic",
  I: "Investigative",
  A: "Artistic",
  S: "Social",
  E: "Enterprising",
  C: "Conventional",
};

// ─── Sub-components ──────────────────────────────────────────────────

function BandBadge({ band }: { band: "High" | "Medium" | "Low" }) {
  const styles = {
    High: "bg-emerald-100 text-emerald-800 border-emerald-300",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Low: "bg-red-100 text-red-800 border-red-300",
  };
  return (
    <span
      className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${styles[band]}`}
    >
      {band}
    </span>
  );
}

function ScoreBar({
  score,
  band,
}: { score: number; band: "High" | "Medium" | "Low" }) {
  const colors = {
    High: "bg-emerald-500",
    Medium: "bg-yellow-500",
    Low: "bg-red-400",
  };
  return (
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div
        className={`${colors[band]} h-2 rounded-full transition-all duration-700`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

// ─── DISC Profile Card ──────────────────────────────────────────────────

function DiscProfileCard({ results }: { results: Results }) {
  const disc = deriveDiscScores(results);
  const maxDim = (Object.entries(disc) as [string, number][]).sort(
    (a, b) => b[1] - a[1],
  )[0][0];

  const discMeta: Record<
    "D" | "I" | "S" | "C",
    { name: string; color: string; bg: string; descriptor: string }
  > = {
    D: {
      name: "Dominance",
      color: "bg-red-500",
      bg: "bg-red-50",
      descriptor:
        "Task-oriented, direct, results-driven — natural leader and problem-solver",
    },
    I: {
      name: "Influence",
      color: "bg-yellow-400",
      bg: "bg-yellow-50",
      descriptor:
        "People-oriented, expressive, enthusiastic — builds rapport and inspires others",
    },
    S: {
      name: "Steadiness",
      color: "bg-emerald-500",
      bg: "bg-emerald-50",
      descriptor:
        "Reliable, calm, supportive — excels in team stability and consistent delivery",
    },
    C: {
      name: "Conscientiousness",
      color: "bg-blue-500",
      bg: "bg-blue-50",
      descriptor:
        "Analytical, detail-oriented, quality-focused — thrives in structured, precise work",
    },
  };

  const balancedDescriptor =
    "Versatile profile — adapts well across different work environments";
  const highDims = (
    Object.entries(disc) as ["D" | "I" | "S" | "C", number][]
  ).filter(([, v]) => v > 60);
  const topDescriptor =
    highDims.length === 0
      ? balancedDescriptor
      : discMeta[maxDim as "D" | "I" | "S" | "C"].descriptor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"
      data-ocid="results.disc.card"
    >
      <h2 className="text-lg font-bold text-slate-900 mb-1">
        🧩 DISC Behavioural Profile
      </h2>
      <p className="text-xs text-slate-500 mb-4">
        Derived from your Verbal, Leadership, RIASEC, and Grit scores. Use
        alongside your full profile for best insight.
      </p>

      <div className="space-y-3">
        {(["D", "I", "S", "C"] as const).map((key) => {
          const meta = discMeta[key];
          const score = disc[key];
          return (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 w-5">{key}</span>
                  <span className="text-sm text-slate-600">{meta.name}</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {score}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div
                  className={`${meta.color} h-2.5 rounded-full transition-all duration-700`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`mt-4 rounded-lg px-4 py-3 text-sm font-medium ${
          discMeta[maxDim as "D" | "I" | "S" | "C"]?.bg || "bg-slate-50"
        } text-slate-700`}
      >
        {topDescriptor}
      </div>

      <p className="text-[10px] text-slate-400 mt-3 leading-relaxed">
        DISC profile is derived from your assessment scores — not a standalone
        assessment. Use alongside your full module scores and RIASEC Holland
        Code for complete career insight.
      </p>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────

export function AssessmentPage({
  onNavigate,
  initialGrade = "",
  initialStream = "",
  initialSubjects = [],
}: AssessmentPageProps) {
  const [session, setSession] = useState<SessionState>({
    phase: "intro",
    grade: initialGrade,
    stream: initialStream,
    selectedSubjects: initialSubjects,
    currentModuleIndex: 0,
    currentQuestionIndex: 0,
    sessionQuestions: [],
    answers: [],
    pendingAnswer: null,
  });

  const [dreamCareer, setDreamCareer] = useState("");
  const [results, setResults] = useState<Results | null>(null);

  const currentModule: AssessmentModule | undefined =
    assessmentModules[session.currentModuleIndex];
  const currentModuleQuestions: AssessmentQuestion[] =
    session.sessionQuestions[session.currentModuleIndex] || [];
  const currentQuestion: AssessmentQuestion | undefined =
    currentModuleQuestions[session.currentQuestionIndex];

  const handleBeginModules = useCallback(() => {
    const sessionQuestions = buildSessionQuestions();
    setSession((prev) => ({
      ...prev,
      phase: "module",
      sessionQuestions,
    }));
  }, []);

  const handleSelectOption = useCallback((optionId: string) => {
    setSession((prev) => ({ ...prev, pendingAnswer: optionId }));
  }, []);

  const handleConfidence = useCallback(
    (confidence: Confidence) => {
      if (!currentQuestion || !session.pendingAnswer) return;

      const newAnswer: Answer = {
        questionId: currentQuestion.id,
        selectedOptionId: session.pendingAnswer,
        confidence,
      };

      const newAnswers = [...session.answers, newAnswer];
      const isLastQuestion =
        session.currentQuestionIndex >= currentModuleQuestions.length - 1;
      const isLastModule =
        session.currentModuleIndex >= assessmentModules.length - 1;

      if (isLastQuestion && isLastModule) {
        const calcResults = calculateResults(
          session.sessionQuestions,
          newAnswers,
        );
        setResults(calcResults);
        setSession((prev) => ({
          ...prev,
          answers: newAnswers,
          pendingAnswer: null,
          phase: "results",
        }));
      } else if (isLastQuestion) {
        setSession((prev) => ({
          ...prev,
          answers: newAnswers,
          pendingAnswer: null,
          phase: "module-transition",
        }));
      } else {
        setSession((prev) => ({
          ...prev,
          answers: newAnswers,
          pendingAnswer: null,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        }));
      }
    },
    [currentQuestion, session, currentModuleQuestions],
  );

  const handleNextModule = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      phase: "module",
      currentModuleIndex: prev.currentModuleIndex + 1,
      currentQuestionIndex: 0,
      pendingAnswer: null,
    }));
  }, []);

  const handleRestart = useCallback(() => {
    setSession({
      phase: "intro",
      grade: "",
      stream: "",
      selectedSubjects: [],
      currentModuleIndex: 0,
      currentQuestionIndex: 0,
      sessionQuestions: [],
      answers: [],
      pendingAnswer: null,
    });
    setResults(null);
    setDreamCareer("");
  }, []);

  const totalAnswered = session.answers.length;
  const totalSessionQuestions = session.sessionQuestions.reduce(
    (s, qs) => s + qs.length,
    0,
  );
  const overallProgress =
    totalSessionQuestions > 0
      ? Math.round((totalAnswered / totalSessionQuestions) * 100)
      : 0;

  // Module transition: partial results
  const answersUpToNow = session.answers;
  const completedModuleIdx = session.currentModuleIndex;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {session.phase === "intro" && (
            <IntroScreen
              key="intro"
              grade={session.grade}
              stream={session.stream}
              selectedSubjects={session.selectedSubjects}
              onStart={handleBeginModules}
              onChangeProfile={() => onNavigate({ view: "student-profile" })}
            />
          )}
          {session.phase === "module" && currentModule && currentQuestion && (
            <QuestionScreen
              key={`q-${currentQuestion.id}`}
              module={currentModule}
              question={currentQuestion}
              questionIndex={session.currentQuestionIndex}
              totalInModule={currentModuleQuestions.length}
              overallProgress={overallProgress}
              totalAnswered={totalAnswered}
              totalQuestions={totalSessionQuestions}
              pendingAnswer={session.pendingAnswer}
              onSelectOption={handleSelectOption}
              onConfidence={handleConfidence}
            />
          )}
          {session.phase === "module-transition" && currentModule && (
            <ModuleTransitionScreen
              key={`trans-${completedModuleIdx}`}
              completedModule={assessmentModules[completedModuleIdx]}
              nextModule={assessmentModules[completedModuleIdx + 1]}
              answers={answersUpToNow}
              sessionQuestions={session.sessionQuestions}
              moduleIndex={completedModuleIdx}
              onContinue={handleNextModule}
            />
          )}
          {session.phase === "results" && results && (
            <ResultsScreen
              key="results"
              results={results}
              grade={session.grade}
              selectedSubjects={session.selectedSubjects}
              dreamCareer={dreamCareer}
              onSetDreamCareer={setDreamCareer}
              onRestart={handleRestart}
              onNavigate={onNavigate}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

// ─── Screen: Intro ──────────────────────────────────────────────────

function IntroScreen({
  grade,
  stream,
  selectedSubjects,
  onStart,
  onChangeProfile,
}: {
  grade: string;
  stream: string;
  selectedSubjects: string[];
  onStart: () => void;
  onChangeProfile: () => void;
}) {
  const streamLabels: Record<string, string> = {
    pcm: "Science (PCM)",
    pcb: "Science (PCB)",
    "pcm-cs": "Science + CS",
    commerce: "Commerce",
    humanities: "Humanities / Arts",
    vocational: "Vocational",
    undecided: "Not decided yet",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-12 space-y-8"
      data-ocid="assessment.section"
    >
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          <Brain className="h-4 w-4" />
          CareerLens India — Career Readiness Assessment
        </div>
        <h1 className="text-4xl font-bold text-slate-900 leading-tight">
          Discover Your
          <span className="block text-blue-600">Career Potential</span>
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto text-lg leading-relaxed">
          A comprehensive 8-module assessment designed for Indian students in
          Grades 9–12. Get your personalized career roadmap based on aptitude,
          personality, and values.
        </p>
      </div>

      {/* Student Profile Summary Card */}
      {(grade || stream || selectedSubjects.length > 0) && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-lg mx-auto text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-blue-800">
              Your Profile
            </span>
            <button
              type="button"
              onClick={onChangeProfile}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
              data-ocid="assessment.link"
            >
              ← Change my profile
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {grade && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                🎓 Grade {grade}
              </span>
            )}
            {stream && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                📚 {streamLabels[stream] || stream}
              </span>
            )}
            {selectedSubjects.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                📌 {selectedSubjects.length} subject
                {selectedSubjects.length > 1 ? "s" : ""} selected
              </span>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        {[
          { emoji: "🧠", label: "8 Modules", sub: "Aptitude + Personality" },
          {
            emoji: "📝",
            label: "103 Questions",
            sub: "From 200-question bank",
          },
          { emoji: "⏱️", label: "~75 minutes", sub: "At your own pace" },
          { emoji: "🎯", label: "Career Match", sub: "India-focused guidance" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm"
          >
            <div className="text-2xl mb-1">{item.emoji}</div>
            <div className="font-semibold text-slate-800 text-sm">
              {item.label}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">{item.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left max-w-lg mx-auto">
        <div className="font-semibold text-amber-800 text-sm mb-2">
          Before you begin:
        </div>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>
            • Answer honestly — there are no right or wrong answers for most
            modules
          </li>
          <li>• After each answer, indicate your confidence level</li>
          <li>• Results are session-only and not stored anywhere</li>
          <li>• You can print or save your results at the end</li>
        </ul>
      </div>

      <Button
        size="lg"
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-semibold rounded-xl shadow-lg"
        onClick={onStart}
        data-ocid="assessment.primary_button"
      >
        Start Assessment
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </motion.div>
  );
}

// ─── Screen: Question ──────────────────────────────────────────────────

function QuestionScreen({
  module,
  question,
  questionIndex,
  totalInModule,
  overallProgress,
  totalAnswered,
  totalQuestions,
  pendingAnswer,
  onSelectOption,
  onConfidence,
}: {
  module: AssessmentModule;
  question: AssessmentQuestion;
  questionIndex: number;
  totalInModule: number;
  overallProgress: number;
  totalAnswered: number;
  totalQuestions: number;
  pendingAnswer: string | null;
  onSelectOption: (id: string) => void;
  onConfidence: (c: Confidence) => void;
}) {
  const moduleProgress = Math.round((questionIndex / totalInModule) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="space-y-5"
      data-ocid="question.section"
    >
      {/* Overall progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Overall Progress</span>
          <span>
            {totalAnswered} of {totalQuestions} questions
          </span>
        </div>
        <Progress value={overallProgress} className="h-1.5" />
      </div>

      {/* Module header */}
      <div className={`rounded-xl border p-4 ${module.color}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{module.emoji}</span>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold uppercase tracking-wide ${module.accentColor}`}
                >
                  Module {module.number} of {assessmentModules.length}
                </span>
                <Badge
                  variant="outline"
                  className={`text-xs ${module.accentColor} border-current`}
                >
                  {module.scoringType === "aptitude"
                    ? "Aptitude"
                    : module.scoringType === "riasec"
                      ? "Personality"
                      : module.scoringType === "grit"
                        ? "Grit & Values"
                        : "Preference"}
                </Badge>
              </div>
              <div className="font-bold text-slate-800 text-sm mt-0.5">
                {module.title}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">
              Q{questionIndex + 1} / {totalInModule}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Progress value={moduleProgress} className="h-1" />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <p className="text-slate-800 font-medium leading-relaxed text-base">
          {question.text}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3" data-ocid="question.panel">
        {question.options.map((opt) => (
          <motion.button
            key={opt.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => !pendingAnswer && onSelectOption(opt.id)}
            disabled={!!pendingAnswer}
            className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
              pendingAnswer === opt.id
                ? "border-blue-600 bg-blue-50 shadow-md"
                : pendingAnswer && pendingAnswer !== opt.id
                  ? "border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed"
                  : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer"
            }`}
            data-ocid="question.toggle"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                  pendingAnswer === opt.id
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 text-slate-500"
                }`}
              >
                {opt.id.toUpperCase()}
              </div>
              <span
                className={`text-sm leading-relaxed ${
                  pendingAnswer === opt.id
                    ? "text-blue-800 font-medium"
                    : "text-slate-700"
                }`}
              >
                {opt.text}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Confidence row — shown after selection */}
      <AnimatePresence>
        {pendingAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-slate-50 border border-slate-200 rounded-xl p-4"
            data-ocid="confidence.panel"
          >
            <p className="text-sm font-semibold text-slate-700 mb-3 text-center">
              How confident are you in this answer?
            </p>
            <div className="flex gap-3 justify-center">
              {[
                {
                  id: "sure" as Confidence,
                  label: "Sure",
                  emoji: "✓",
                  color:
                    "border-emerald-400 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
                },
                {
                  id: "not-sure" as Confidence,
                  label: "Not Sure",
                  emoji: "~",
                  color:
                    "border-yellow-400 bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
                },
                {
                  id: "guesswork" as Confidence,
                  label: "Guesswork",
                  emoji: "?",
                  color:
                    "border-red-300 bg-red-50 text-red-600 hover:bg-red-100",
                },
              ].map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => onConfidence(c.id)}
                  className={`flex-1 rounded-lg border-2 py-2.5 px-2 text-sm font-semibold transition-all ${c.color}`}
                  data-ocid="confidence.toggle"
                >
                  <span className="block text-lg">{c.emoji}</span>
                  {c.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Screen: Module Transition ───────────────────────────────────────────

function ModuleTransitionScreen({
  completedModule,
  nextModule,
  answers,
  sessionQuestions,
  moduleIndex,
  onContinue,
}: {
  completedModule: AssessmentModule;
  nextModule: AssessmentModule;
  answers: Answer[];
  sessionQuestions: AssessmentQuestion[][];
  moduleIndex: number;
  onContinue: () => void;
}) {
  const moduleQs = sessionQuestions[moduleIndex] || [];
  const moduleAnswers = answers.filter((a) =>
    moduleQs.some((q) => q.id === a.questionId),
  );
  const sureCount = moduleAnswers.filter((a) => a.confidence === "sure").length;
  const teaser =
    sureCount >= moduleQs.length * 0.6
      ? `Strong performance — ${Math.round((sureCount / moduleQs.length) * 100)}% answered with confidence`
      : sureCount >= moduleQs.length * 0.3
        ? `Good effort — keep building confidence in ${completedModule.title}`
        : "Module complete — every question adds to your career profile";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="py-12 text-center space-y-6"
      data-ocid="transition.section"
    >
      <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
        <CheckCircle2 className="h-4 w-4" />
        Module {completedModule.number} Complete!
      </div>

      <div>
        <div className="text-5xl mb-3">{completedModule.emoji}</div>
        <h2 className="text-2xl font-bold text-slate-900">
          {completedModule.title}
        </h2>
        <p className="text-slate-500 mt-1">{teaser}</p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600 max-w-sm mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
          This module informs:
        </div>
        <div className="flex flex-wrap gap-1 justify-center">
          {completedModule.unlocksFor.slice(0, 4).map((c) => (
            <span
              key={c}
              className="bg-white border border-slate-200 rounded-full px-2 py-0.5 text-xs"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 max-w-sm mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wide text-blue-500 mb-1">
          Next up: Module {nextModule.number}
        </div>
        <div className="flex items-center gap-2 justify-center">
          <span className="text-3xl">{nextModule.emoji}</span>
          <div className="text-left">
            <div className="font-bold text-slate-800">{nextModule.title}</div>
            <div className="text-xs text-slate-500">{nextModule.subtitle}</div>
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-3">{nextModule.description}</p>
        <div className="mt-2 text-xs text-blue-600 font-medium">
          {nextModule.showCount} questions •{" "}
          {nextModule.scoringType === "aptitude"
            ? "scored"
            : nextModule.scoringType === "riasec"
              ? "personality mapping"
              : "preference-based"}
        </div>
      </div>

      <Button
        size="lg"
        onClick={onContinue}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-semibold shadow-md"
        data-ocid="transition.primary_button"
      >
        Continue to Module {nextModule.number}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
}

// ─── Screen: Results ──────────────────────────────────────────────────

function ResultsScreen({
  results,
  grade,
  selectedSubjects,
  dreamCareer,
  onSetDreamCareer,
  onRestart,
  onNavigate,
}: {
  results: Results;
  grade: string;
  selectedSubjects: string[];
  dreamCareer: string;
  onSetDreamCareer: (c: string) => void;
  onRestart: () => void;
  onNavigate: (s: NavState) => void;
}) {
  const aptitudeScores = results.moduleScores.filter((m) =>
    ["logical", "numerical", "verbal", "scientific"].includes(m.moduleId),
  );
  const highestAptitude = [...aptitudeScores].sort(
    (a, b) => b.score - a.score,
  )[0];
  const total =
    results.confidenceDist.sure +
    results.confidenceDist.notSure +
    results.confidenceDist.guesswork;

  // Dream career bridge using computeBridgeMatchScore
  const dreamCareerName = dreamCareer
    ? dreamCareerNameMap[dreamCareer] || dreamCareer
    : "";
  const dreamProfile = dreamCareer ? careerProfilesMap[dreamCareer] : null;
  const hasProfile = !!dreamProfile;

  const bridgeResult = dreamCareer
    ? computeBridgeMatchScore(
        dreamCareer,
        results.moduleScores,
        results.riasecCounts as unknown as Record<string, number>,
        results.hollandCode,
        results.gritProfile.gritLevel,
        results.gritProfile.mindsetType,
      )
    : null;

  const bridgeSteps = dreamCareer ? getBridgeSteps(dreamCareer, grade) : [];

  const matchLabel = bridgeResult
    ? bridgeResult.score >= 70
      ? "Strong Alignment"
      : bridgeResult.score >= 50
        ? "Good Fit"
        : bridgeResult.score >= 35
          ? "Gap Identified"
          : "Significant Gap"
    : "";

  // Suppress unused import warnings
  void highestAptitude;
  void Flame;
  void Lightbulb;
  void Star;
  void Target;
  void TrendingUp;
  void Users;
  void Zap;
  void BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
      data-ocid="results.section"
    >
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
          <Trophy className="h-4 w-4" />
          Assessment Complete!
        </div>
        <h1 className="text-3xl font-bold text-slate-900">
          Your Career Profile
        </h1>
        <p className="text-slate-500">
          Grade {grade} • Holland Code:{" "}
          <span className="font-bold text-blue-600">
            {results.hollandCode || "IE"}
          </span>
        </p>
      </div>

      {/* Summary card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">
              {results.hollandCode || "IE"}
            </div>
            <div className="text-blue-200 text-xs mt-1">Holland Code</div>
          </div>
          <div>
            <div className="text-3xl font-bold">
              {results.gritProfile.gritLevel}
            </div>
            <div className="text-blue-200 text-xs mt-1">Grit Level</div>
          </div>
          <div>
            <div className="text-3xl font-bold">
              {results.gritProfile.mindsetType}
            </div>
            <div className="text-blue-200 text-xs mt-1">Mindset</div>
          </div>
        </div>
        <Separator className="my-4 bg-white/20" />
        <div className="text-center">
          <div className="text-sm text-blue-200 mb-1">Top Career Clusters</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {results.topClusters.map((c, i) => (
              <span
                key={c}
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  i === 0 ? "bg-white text-blue-700" : "bg-white/20 text-white"
                }`}
              >
                {i === 0 ? "🥇 " : i === 1 ? "🥈 " : "🥉 "}
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Module score grid */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          📊 Module Scores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {results.moduleScores.map((ms) => {
            const mod = assessmentModules.find((m) => m.id === ms.moduleId);
            if (!mod) return null;
            return (
              <div
                key={ms.moduleId}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"
                data-ocid={`results.item.${mod.number}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{mod.emoji}</span>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">
                        {mod.title}
                      </div>
                      <div className="text-xs text-slate-400">
                        {mod.subtitle}
                      </div>
                    </div>
                  </div>
                  <BandBadge band={ms.band} />
                </div>
                {mod.scoringType === "aptitude" && (
                  <>
                    <ScoreBar score={ms.score} band={ms.band} />
                    <div className="text-xs text-slate-400 mt-1">
                      {ms.score}%
                    </div>
                  </>
                )}
                <p className="text-xs text-slate-500 mt-2">{ms.insight}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* DISC Profile Card — inserted after module scores */}
      <DiscProfileCard results={results} />

      {/* RIASEC breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          🌐 RIASEC Personality Profile
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {(Object.entries(results.riasecCounts) as [RiasecType, number][]).map(
            ([type, count]) => (
              <div key={type} className="text-center">
                <div className="text-2xl font-bold text-slate-800">{count}</div>
                <div className="text-xs font-semibold text-slate-600">
                  {type}
                </div>
                <div className="text-xs text-slate-400">
                  {riasecLabels[type]}
                </div>
              </div>
            ),
          )}
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Your Holland Code{" "}
          <strong className="text-blue-600">{results.hollandCode}</strong> means
          you are primarily{" "}
          <strong>
            {riasecLabels[(results.hollandCode[0] as RiasecType) || "I"]}
          </strong>{" "}
          and{" "}
          <strong>
            {riasecLabels[(results.hollandCode[1] as RiasecType) || "E"]}
          </strong>{" "}
          in your approach to work.
        </p>
      </div>

      {/* Confidence distribution */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          💬 Confidence Distribution
        </h2>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            {
              label: "Sure",
              count: results.confidenceDist.sure,
              color: "text-emerald-600",
              bg: "bg-emerald-100",
            },
            {
              label: "Not Sure",
              count: results.confidenceDist.notSure,
              color: "text-yellow-600",
              bg: "bg-yellow-100",
            },
            {
              label: "Guesswork",
              count: results.confidenceDist.guesswork,
              color: "text-red-500",
              bg: "bg-red-100",
            },
          ].map((item) => (
            <div key={item.label} className={`${item.bg} rounded-xl p-4`}>
              <div className={`text-3xl font-bold ${item.color}`}>
                {item.count}
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">
                {item.label}
              </div>
              <div className="text-xs text-slate-400">
                {total > 0 ? Math.round((item.count / total) * 100) : 0}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject match */}
      {selectedSubjects.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            📚 Subject Preference Alignment
          </h2>
          <div className="flex flex-wrap gap-2">
            {selectedSubjects.map((s) => (
              <span
                key={s}
                className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 text-sm"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-3">
            Your subject choices reinforce your top cluster:{" "}
            <strong>{results.topClusters[0]}</strong>.
          </p>
        </div>
      )}

      {/* Grit profile */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          🔥 Grit, Mindset & Values Profile
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-slate-700">Grit Score</span>
              <span className="font-bold text-slate-800">
                {results.gritProfile.gritScore}% —{" "}
                {results.gritProfile.gritLevel}
              </span>
            </div>
            <ScoreBar
              score={results.gritProfile.gritScore}
              band={results.gritProfile.gritLevel}
            />
            <p className="text-xs text-slate-500 mt-1">
              {results.gritProfile.gritLevel === "High"
                ? "You show strong perseverance and sustained passion — a key predictor of long-term career success."
                : results.gritProfile.gritLevel === "Medium"
                  ? "You have a good grit foundation. Building consistency and long-term focus will accelerate career growth."
                  : "Developing grit is a learnable skill. Start with small commitments and build from there."}
            </p>
          </div>
          <Separator />
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-slate-700">Mindset</span>
              <span
                className={`font-bold ${
                  results.gritProfile.mindsetType === "Growth"
                    ? "text-emerald-600"
                    : results.gritProfile.mindsetType === "Mixed"
                      ? "text-yellow-600"
                      : "text-red-500"
                }`}
              >
                {results.gritProfile.mindsetType} Mindset
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {results.gritProfile.mindsetType === "Growth"
                ? "Growth mindset detected — you believe ability develops with effort, which is the single strongest predictor of career adaptability."
                : results.gritProfile.mindsetType === "Mixed"
                  ? "Mixed mindset — you recognize growth is possible but sometimes default to fixed thinking under pressure."
                  : "Fixed mindset patterns detected — shifting to a growth mindset will significantly expand your career possibilities."}
            </p>
          </div>
          <Separator />
          <div>
            <div className="text-sm font-medium text-slate-700 mb-1">
              Dominant Value
            </div>
            <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-lg text-sm font-semibold">
              ✨ {results.gritProfile.dominantValue}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Careers aligned with your core value of{" "}
              <strong>{results.gritProfile.dominantValue}</strong> will give you
              the highest long-term satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* Dream Career Bridge */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-2">
          🌉 Dream Career Bridge
        </h2>
        <p className="text-sm text-slate-500 mb-1">
          Select a career you're drawn to and see how your profile aligns — plus
          the gap steps to get there.
        </p>
        <p className="text-xs text-slate-400 mb-4">
          <span className="font-semibold text-slate-500">✦</span> = Coming soon
          — bridge guidance available for all careers
        </p>

        <Select value={dreamCareer} onValueChange={onSetDreamCareer}>
          <SelectTrigger className="w-full" data-ocid="bridge.select">
            <SelectValue placeholder="Select your dream career..." />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {dreamCareerGroups.map((group) => (
              <SelectGroup key={group.sector}>
                <SelectLabel>
                  {group.emoji} {group.sector}
                </SelectLabel>
                {group.careers.map((career) => (
                  <SelectItem key={career.id} value={career.id}>
                    {career.name}
                    {!career.hasProfile && " ✦"}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>

        {dreamCareer && bridgeResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 space-y-4"
            data-ocid="bridge.panel"
          >
            {/* Match score header */}
            <div
              className={`rounded-xl p-4 ${
                bridgeResult.match
                  ? "bg-emerald-50 border border-emerald-200"
                  : "bg-amber-50 border border-amber-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div
                  className={`font-semibold text-sm ${
                    bridgeResult.match ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  {bridgeResult.match
                    ? `✅ Strong Alignment with ${dreamCareerName}`
                    : `🛤 Gap Identified — ${dreamCareerName} is achievable with focused effort`}
                </div>
                <div
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    bridgeResult.score >= 70
                      ? "bg-emerald-100 text-emerald-700"
                      : bridgeResult.score >= 50
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  Match Score: {bridgeResult.score}% — {matchLabel}
                </div>
              </div>
              <p
                className={`text-xs ${
                  bridgeResult.match ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {bridgeResult.match
                  ? "Your aptitude and personality profile strongly supports this career path."
                  : "Your assessment highlights areas to strengthen. Here are your bridge steps:"}
              </p>
            </div>

            {bridgeResult.gritGap && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-sm">
                <strong className="text-rose-700">🔥 Grit Gap:</strong>{" "}
                <span className="text-rose-600">
                  {dreamCareerName} requires sustained effort over 4–6 years of
                  training. Building grit through small daily habits will be
                  critical.
                </span>
              </div>
            )}

            {bridgeResult.mindsetGap && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-sm">
                <strong className="text-orange-700">
                  🧠 Mindset Shift Needed:
                </strong>{" "}
                <span className="text-orange-600">
                  {dreamCareerName} requires treating failures as data. A growth
                  mindset shift will unlock your potential.
                </span>
              </div>
            )}

            {/* Career-specific bridge steps */}
            {bridgeSteps.length > 0 && (
              <div>
                <div className="text-sm font-semibold text-slate-700 mb-3">
                  📈 Your Bridge Steps (Grade {grade}):
                </div>
                <div className="space-y-3">
                  {bridgeSteps.map((step, i) => (
                    <div
                      key={`${step.label}-${i}`}
                      className="flex gap-3 items-start bg-slate-50 rounded-xl p-3.5 border border-slate-100"
                    >
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-blue-700">
                          {step.label}
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missing profile fallback */}
            {!hasProfile && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
                <p className="text-blue-700 font-medium mb-1">
                  ℹ️ Full profile coming in Phase 2
                </p>
                <p className="text-blue-600 text-xs">
                  Full career profile for {dreamCareerName} is coming in Phase
                  2. Bridge guidance above is based on your assessment results.
                </p>
              </div>
            )}

            {hasProfile ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onNavigate({
                    view: "subtype",
                    subtypeId: dreamCareer,
                    subtypeName: dreamCareerName,
                  })
                }
                className="w-full mt-2"
                data-ocid="bridge.secondary_button"
              >
                Explore {dreamCareerName} Career Profile
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                disabled
                className="w-full mt-2 opacity-50 cursor-not-allowed"
                data-ocid="bridge.secondary_button"
              >
                Profile Coming Soon
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            )}
          </motion.div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pb-8">
        <Button
          variant="outline"
          onClick={() => window.print()}
          className="flex-1"
          data-ocid="results.secondary_button"
        >
          <Printer className="mr-2 h-4 w-4" />
          Print / Save Results
        </Button>
        <Button
          variant="outline"
          onClick={onRestart}
          className="flex-1"
          data-ocid="results.delete_button"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Retake Assessment
        </Button>
        <Button
          onClick={() => onNavigate({ view: "home" })}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          data-ocid="results.primary_button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </motion.div>
  );
}
