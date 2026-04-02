import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
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
  subjectCategories,
} from "../data/assessmentModules";
import {
  type AssessmentQuestion,
  type ModuleId,
  type RiasecType,
  questionsByModule,
} from "../data/assessmentQuestions";
import { careerProfilesMap } from "../data/techDigitalCareers";
import type { NavState } from "../types/navigation";

interface AssessmentPageProps {
  onNavigate: (state: NavState) => void;
}

// ─── Types ────────────────────────────────────────────────────────

type Phase =
  | "intro"
  | "grade-select"
  | "subject-preference"
  | "module"
  | "module-transition"
  | "results";

type Confidence = "sure" | "not-sure" | "guesswork";

interface Answer {
  questionId: string;
  selectedOptionId: string;
  confidence: Confidence;
}

interface SessionState {
  phase: Phase;
  grade: string;
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
        maxPoints += 3;
        if (ans.selectedOptionId === q.correctOptionId) {
          const conf = ans.confidence;
          if (conf === "sure") points += 3;
          else if (conf === "not-sure") points += 2;
          else points += 1;
        }
      }
      const pct = maxPoints > 0 ? Math.round((points / maxPoints) * 100) : 0;
      const band: ModuleScore["band"] =
        pct >= 70 ? "High" : pct >= 40 ? "Medium" : "Low";
      const insights: Record<ModuleScore["band"], string> = {
        High: `Strong ${mod.title} ability — excellent foundation for technical careers`,
        Medium: `Developing ${mod.title} skills — targeted practice will strengthen this`,
        Low: `${mod.title} needs focused attention — practice with structured resources`,
      };
      moduleScores.push({
        moduleId: mod.id,
        score: pct,
        band,
        insight: insights[band],
      });
    } else if (mod.scoringType === "preference") {
      // Count answered / total as engagement proxy
      const answered = qs.filter((q) => answerMap.has(q.id)).length;
      const pct = qs.length > 0 ? Math.round((answered / qs.length) * 100) : 0;
      const band: ModuleScore["band"] =
        pct >= 80 ? "High" : pct >= 50 ? "Medium" : "Low";
      moduleScores.push({
        moduleId: mod.id,
        score: pct,
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

// ─── Career name map ──────────────────────────────────────────────────

const careerNames: Record<string, string> = {
  "software-engineering": "Software Engineering",
  "data-science": "Data Science",
  cybersecurity: "Cybersecurity",
  "ai-ml-engineering": "AI / ML Engineering",
  "product-management": "Product Management",
  "digital-marketing": "Digital Marketing",
};

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

// ─── Main Component ──────────────────────────────────────────────────

export function AssessmentPage({ onNavigate }: AssessmentPageProps) {
  const [session, setSession] = useState<SessionState>({
    phase: "intro",
    grade: "",
    selectedSubjects: [],
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

  const handleStartAssessment = useCallback((grade: string) => {
    const sessionQuestions = buildSessionQuestions();
    setSession((prev) => ({
      ...prev,
      phase: "subject-preference",
      grade,
      sessionQuestions,
    }));
  }, []);

  const handleSubjectToggle = useCallback((subject: string) => {
    setSession((prev) => ({
      ...prev,
      selectedSubjects: prev.selectedSubjects.includes(subject)
        ? prev.selectedSubjects.filter((s) => s !== subject)
        : [...prev.selectedSubjects, subject],
    }));
  }, []);

  const handleBeginModules = useCallback(() => {
    setSession((prev) => ({ ...prev, phase: "module" }));
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

      const isLastQuestionInModule =
        session.currentQuestionIndex >= currentModuleQuestions.length - 1;
      const isLastModule =
        session.currentModuleIndex >= assessmentModules.length - 1;

      const updatedAnswers = [...session.answers, newAnswer];

      if (isLastQuestionInModule) {
        if (isLastModule) {
          // Compute results
          const computed = calculateResults(
            session.sessionQuestions,
            updatedAnswers,
          );
          setResults(computed);
          setSession((prev) => ({
            ...prev,
            answers: updatedAnswers,
            pendingAnswer: null,
            phase: "results",
          }));
        } else {
          setSession((prev) => ({
            ...prev,
            answers: updatedAnswers,
            pendingAnswer: null,
            phase: "module-transition",
          }));
        }
      } else {
        setSession((prev) => ({
          ...prev,
          answers: updatedAnswers,
          pendingAnswer: null,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        }));
      }
    },
    [
      currentQuestion,
      session.pendingAnswer,
      session.currentQuestionIndex,
      currentModuleQuestions.length,
      session.currentModuleIndex,
      session.answers,
      session.sessionQuestions,
    ],
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
              onStart={() =>
                setSession((p) => ({ ...p, phase: "grade-select" }))
              }
            />
          )}
          {session.phase === "grade-select" && (
            <GradeSelectScreen key="grade" onSelect={handleStartAssessment} />
          )}
          {session.phase === "subject-preference" && (
            <SubjectPreferenceScreen
              key="subjects"
              selectedSubjects={session.selectedSubjects}
              onToggle={handleSubjectToggle}
              onContinue={handleBeginModules}
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

function IntroScreen({ onStart }: { onStart: () => void }) {
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

// ─── Screen: Grade Select ─────────────────────────────────────────────

function GradeSelectScreen({
  onSelect,
}: { onSelect: (grade: string) => void }) {
  const [grade, setGrade] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="max-w-md mx-auto py-16 space-y-8 text-center"
      data-ocid="grade.section"
    >
      <div>
        <div className="text-5xl mb-4">🎓</div>
        <h2 className="text-2xl font-bold text-slate-900">
          Which grade are you in?
        </h2>
        <p className="text-slate-500 mt-2">
          This personalizes recommendations and content depth.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {["9", "10", "11", "12"].map((g) => (
          <button
            type="button"
            key={g}
            onClick={() => setGrade(g)}
            className={`rounded-xl border-2 py-6 text-center font-semibold text-lg transition-all ${
              grade === g
                ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
            }`}
            data-ocid="grade.button"
          >
            Grade {g}
          </button>
        ))}
      </div>

      <Button
        size="lg"
        disabled={!grade}
        onClick={() => grade && onSelect(grade)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
        data-ocid="grade.submit_button"
      >
        Continue
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </motion.div>
  );
}

// ─── Screen: Subject Preference ─────────────────────────────────────────

function SubjectPreferenceScreen({
  selectedSubjects,
  onToggle,
  onContinue,
}: {
  selectedSubjects: string[];
  onToggle: (s: string) => void;
  onContinue: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="space-y-6"
      data-ocid="subjects.section"
    >
      <div className="text-center py-4">
        <div className="text-4xl mb-3">📚</div>
        <h2 className="text-2xl font-bold text-slate-900">
          What subjects do you enjoy?
        </h2>
        <p className="text-slate-500 mt-1 text-sm">
          Select all subjects you enjoy or do well in across any board (CBSE,
          ICSE, IB, IGCSE, etc.)
        </p>
        {selectedSubjects.length > 0 && (
          <div className="mt-2">
            <Badge variant="secondary" className="text-xs">
              {selectedSubjects.length} selected
            </Badge>
          </div>
        )}
      </div>

      <div className="space-y-5">
        {subjectCategories.map((cat) => (
          <div key={cat.category}>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 px-1">
              {cat.category}
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.subjects.map((subject) => (
                <button
                  type="button"
                  key={subject}
                  onClick={() => onToggle(subject)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                    selectedSubjects.includes(subject)
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                  data-ocid="subjects.toggle"
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-4 pt-4">
        <Button
          onClick={onContinue}
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg"
          data-ocid="subjects.primary_button"
        >
          Begin Assessment — Module 1 of 8
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        {selectedSubjects.length === 0 && (
          <p className="text-center text-xs text-slate-400 mt-2">
            You can skip this and proceed
          </p>
        )}
      </div>
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
                className={`text-sm leading-relaxed ${pendingAnswer === opt.id ? "text-blue-800 font-medium" : "text-slate-700"}`}
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

  // Dream career bridge
  const dreamProfile = dreamCareer ? careerProfilesMap[dreamCareer] : null;
  const dreamCareerName = dreamCareer
    ? careerNames[dreamCareer] || dreamCareer
    : "";

  const getBridgeAnalysis = () => {
    if (!dreamCareer) return null;
    const cluster = results.topClusters[0] || "";
    const isDreamInTopCluster =
      ["software-engineering", "data-science", "ai-ml-engineering"].some(
        (k) => k === dreamCareer,
      ) && cluster.includes("Engineering");

    return {
      match: isDreamInTopCluster,
      gritGap: results.gritProfile.gritLevel === "Low",
      mindsetGap: results.gritProfile.mindsetType === "Fixed",
      steps:
        grade === "9" || grade === "10"
          ? [
              `Start exploring ${dreamCareerName} through free online resources and school projects`,
              `Focus on strengthening ${highestAptitude?.moduleId || "your core"} skills this year`,
              "Join a related school club or extracurricular to build real exposure",
            ]
          : [
              `Research the specific entrance exams and qualifying criteria for ${dreamCareerName}`,
              "Build a portfolio or project that demonstrates relevant skills",
              `Connect with professionals in ${dreamCareerName} through LinkedIn or school mentors`,
            ],
    };
  };

  const bridgeAnalysis = getBridgeAnalysis();

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
        <p className="text-sm text-slate-500 mb-4">
          Select a career you're drawn to and see how your profile aligns — plus
          the gap steps to get there.
        </p>
        <Select value={dreamCareer} onValueChange={onSetDreamCareer}>
          <SelectTrigger className="w-full" data-ocid="bridge.select">
            <SelectValue placeholder="Select your dream career..." />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(careerProfilesMap).map((key) => (
              <SelectItem key={key} value={key}>
                {careerNames[key] || key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {bridgeAnalysis && dreamProfile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 space-y-4"
            data-ocid="bridge.panel"
          >
            <div
              className={`rounded-xl p-4 ${
                bridgeAnalysis.match
                  ? "bg-emerald-50 border border-emerald-200"
                  : "bg-amber-50 border border-amber-200"
              }`}
            >
              <div
                className={`font-semibold text-sm ${
                  bridgeAnalysis.match ? "text-emerald-700" : "text-amber-700"
                }`}
              >
                {bridgeAnalysis.match
                  ? `✅ Strong Alignment with ${dreamCareerName}`
                  : `🛥 Gap Identified — ${dreamCareerName} is achievable with focused effort`}
              </div>
              <p
                className={`text-xs mt-1 ${bridgeAnalysis.match ? "text-emerald-600" : "text-amber-600"}`}
              >
                {bridgeAnalysis.match
                  ? "Your aptitude and personality profile strongly supports this career path."
                  : "Your assessment highlights areas to strengthen. Here are your bridge steps:"}
              </p>
            </div>

            {bridgeAnalysis.gritGap && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-sm">
                <strong className="text-rose-700">🔥 Grit Gap:</strong>{" "}
                <span className="text-rose-600">
                  {dreamCareerName} requires sustained effort over 4–6 years of
                  training. Building grit through small daily habits will be
                  critical.
                </span>
              </div>
            )}

            {bridgeAnalysis.mindsetGap && (
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

            <div>
              <div className="text-sm font-semibold text-slate-700 mb-2">
                📈 Your Bridge Steps (Grade {grade}):
              </div>
              <div className="space-y-2">
                {bridgeAnalysis.steps.map((step, i) => (
                  <div
                    key={step.slice(0, 20)}
                    className="flex gap-3 items-start bg-slate-50 rounded-lg p-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

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
