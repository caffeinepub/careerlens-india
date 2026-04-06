import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { ChevronRight, Lightbulb, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "../../context/SessionContext";
import type {
  ModuleScores,
  SliderValues,
  StudentProfile,
} from "../../context/SessionContext";
import {
  assessmentModules,
  subjectCategories,
} from "../../data/assessmentModules";
import { questionBank as assessmentQuestions } from "../../data/assessmentQuestions";
import type { NavState } from "../../types/navigation";
import { computeDISCProfile, scoreCareers } from "../../utils/scoringEngine";

interface IdentityEngineProps {
  onNavigate: (state: NavState) => void;
  /** When true and a profile already exists in session, skip the profile form
   *  and launch directly into the 102-question deep assessment. */
  startDeepMode?: boolean;
}

type Step = "profile" | "quiz" | "sliders" | "deep-assessment";

const GRADE_OPTIONS = ["9", "10", "11", "12"];
const STREAM_OPTIONS = [
  {
    id: "science-pcm",
    label: "Science (PCM)",
    desc: "Physics, Chemistry, Maths",
  },
  {
    id: "science-pcb",
    label: "Science (PCB)",
    desc: "Physics, Chemistry, Biology",
  },
  {
    id: "commerce",
    label: "Commerce",
    desc: "Accountancy, Business, Economics",
  },
  {
    id: "arts",
    label: "Arts & Humanities",
    desc: "History, Geography, Political Science",
  },
  {
    id: "vocational",
    label: "Vocational / ITI",
    desc: "Practical & Skilled Trades",
  },
  { id: "undecided", label: "Not Decided Yet", desc: "I'm still exploring" },
];

const SLIDER_CONFIG = [
  {
    key: "income" as const,
    emoji: "\uD83D\uDCB0",
    label: "Income Priority",
    low: "Basic needs",
    high: "Maximum earnings",
  },
  {
    key: "passion" as const,
    emoji: "\u2764\uFE0F",
    label: "Passion Fit",
    low: "Practical choice",
    high: "Follow my passion",
  },
  {
    key: "stability" as const,
    emoji: "\uD83D\uDEE1\uFE0F",
    label: "Stability",
    low: "OK with risk",
    high: "Need job security",
  },
  {
    key: "time" as const,
    emoji: "\uD83D\uDCC5",
    label: "Time to Invest",
    low: "1\u20132 years max",
    high: "6+ years / PhD",
  },
  {
    key: "risk" as const,
    emoji: "\uD83C\uDFB2",
    label: "Risk Appetite",
    low: "Safe, steady",
    high: "Ambitious, high-stakes",
  },
];

function pickMVPQuestions() {
  const aptitudeModules = [
    "logical",
    "numerical",
    "verbal",
    "scientific",
    "creative",
    "leadership",
  ];
  const picked: typeof assessmentQuestions = [];

  for (const modId of aptitudeModules) {
    const pool = assessmentQuestions.filter((q) => q.moduleId === modId);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    picked.push(...shuffled.slice(0, 2));
  }
  // 2 RIASEC + 2 Grit
  const riasecPool = assessmentQuestions
    .filter((q) => q.moduleId === "riasec")
    .sort(() => Math.random() - 0.5);
  const gritPool = assessmentQuestions
    .filter((q) => q.moduleId === "grit")
    .sort(() => Math.random() - 0.5);
  picked.push(...riasecPool.slice(0, 2));
  picked.push(...gritPool.slice(0, 2));
  return picked;
}

function pickDeepQuestions() {
  const result: typeof assessmentQuestions = [];
  for (const mod of assessmentModules) {
    const pool = assessmentQuestions
      .filter((q) => q.moduleId === mod.id)
      .sort(() => Math.random() - 0.5);
    result.push(...pool.slice(0, mod.showCount));
  }
  return result;
}

const PREVIEW_INSIGHT_Q = 3;

/**
 * Returns a tailored preview insight based on the first 3 answered questions' moduleId.
 */
function getPreviewInsight(
  questions: typeof assessmentQuestions,
  answers: Record<string, string>,
): string {
  const answeredIds = Object.keys(answers);
  const firstThreeIds = answeredIds.slice(0, 3);
  const moduleCounts: Record<string, number> = {};
  for (const id of firstThreeIds) {
    const q = questions.find((q) => q.id === id);
    if (q) {
      moduleCounts[q.moduleId] = (moduleCounts[q.moduleId] || 0) + 1;
    }
  }
  let dominantModule = "";
  let maxCount = 0;
  for (const [mod, count] of Object.entries(moduleCounts)) {
    if (count > maxCount) {
      maxCount = count;
      dominantModule = mod;
    }
  }
  switch (dominantModule) {
    case "logical":
      return "Your first 3 answers show strong analytical reasoning. Careers in Technology, Finance, and Research often suit this pattern.";
    case "numerical":
      return "Strong quantitative thinking detected early. Finance, Data Science, and Engineering careers align well with this aptitude.";
    case "verbal":
      return "Your communication and language aptitude is coming through clearly. Law, Education, and Media careers thrive on this skill.";
    case "scientific":
      return "Scientific curiosity is showing in your answers. Healthcare, Research, and Engineering careers could be strong matches.";
    case "creative":
      return "Creative thinking is a standout early signal. Design, Architecture, Media, and EdTech careers value this highly.";
    case "leadership":
      return "Leadership instincts are apparent from your early answers. Management, IAS, and Entrepreneurship are worth exploring.";
    case "riasec":
      return "Your situational preferences are becoming clear. Keep going to get your Holland Code and career-type match.";
    case "grit":
      return "Your mindset and perseverance indicators are emerging. These shape which career paths you'll thrive in long-term.";
    default:
      return "Early patterns are forming. Keep going for more precise career insights.";
  }
}

export function IdentityEngine({
  onNavigate,
  startDeepMode = false,
}: IdentityEngineProps) {
  const {
    session,
    setStudentProfile,
    setModuleScores,
    setSliderValues,
    setResults,
  } = useSession();

  const [step, setStep] = useState<Step>("profile");
  const [profile, setProfile] = useState<StudentProfile>(
    session.studentProfile || { grade: "", stream: "", selectedSubjects: [] },
  );
  const [sliders, setSliders] = useState<SliderValues>(
    session.sliderValues || {
      income: 3,
      passion: 3,
      stability: 3,
      time: 3,
      risk: 3,
    },
  );

  // Quiz state
  const [questions, setQuestions] = useState<typeof assessmentQuestions>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [confidence, setConfidence] = useState<
    Record<string, "sure" | "unsure" | "guess">
  >({});
  const [currentQ, setCurrentQ] = useState(0);
  const [previewShown, setPreviewShown] = useState(false);
  const [deepMode, setDeepMode] = useState(false);

  const maxSubjects = 8;

  const initQuiz = useCallback(
    (isDeep: boolean, profileOverride?: StudentProfile) => {
      const qs = isDeep ? pickDeepQuestions() : pickMVPQuestions();
      setQuestions(qs);
      setAnswers({});
      setConfidence({});
      setCurrentQ(0);
      setPreviewShown(false);
      setDeepMode(isDeep);
      setStep(isDeep ? "deep-assessment" : "quiz");
      if (profileOverride) {
        setProfile(profileOverride);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [],
  );

  // If startDeepMode=true AND the user already has a saved profile, jump directly
  // into the deep quiz without making them re-fill the profile form.
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally runs once on mount when startDeepMode changes
  useEffect(() => {
    if (
      startDeepMode &&
      session.studentProfile?.grade &&
      session.studentProfile?.stream
    ) {
      initQuiz(true, session.studentProfile);
    }
  }, [startDeepMode]);

  // Preview insight after Q3
  useEffect(() => {
    if (!previewShown && currentQ === PREVIEW_INSIGHT_Q && step === "quiz") {
      setPreviewShown(true);
      const insight = getPreviewInsight(questions, answers);
      toast(
        <div className="flex gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold">Early insight</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {insight} Keep going!
            </p>
          </div>
        </div>,
        { duration: 5000 },
      );
    }
  }, [currentQ, previewShown, step, questions, answers]);

  const currentQuestion = questions[currentQ];

  const computeModuleScores = useCallback(
    (
      qs: typeof assessmentQuestions,
      ans: Record<string, string>,
      conf: Record<string, "sure" | "unsure" | "guess">,
    ): ModuleScores => {
      const aptitudeMods = [
        "logical",
        "numerical",
        "verbal",
        "scientific",
        "creative",
        "leadership",
      ];
      const modScores: Record<string, number> = {};
      const riasecCounts: Record<string, number> = {
        R: 0,
        I: 0,
        A: 0,
        S: 0,
        E: 0,
        C: 0,
      };
      let gritRaw = 0;
      let gritCount = 0;
      let mindsetRaw = 0;
      let mindsetCount = 0;

      for (const mod of aptitudeMods) {
        const modQs = qs.filter((q) => q.moduleId === mod);
        if (!modQs.length) {
          modScores[mod] = 50;
          continue;
        }
        let correct = 0;
        for (const q of modQs) {
          const selected = ans[q.id];
          if (!selected) continue;
          const confW =
            conf[q.id] === "sure" ? 1.0 : conf[q.id] === "unsure" ? 0.7 : 0.4;
          if (q.correctOptionId) {
            if (selected === q.correctOptionId) correct += confW;
          } else {
            correct += confW * 0.75; // preference question, partial credit
          }
        }
        modScores[mod] = Math.round((correct / modQs.length) * 100);
      }

      // RIASEC
      const riasecQs = qs.filter((q) => q.moduleId === "riasec");
      for (const q of riasecQs) {
        const selected = ans[q.id];
        if (!selected) continue;
        const opt = q.options.find((o) => o.id === selected);
        if (opt?.riasecType) {
          const confW =
            conf[q.id] === "sure" ? 1 : conf[q.id] === "unsure" ? 0.7 : 0.4;
          riasecCounts[opt.riasecType] =
            (riasecCounts[opt.riasecType] || 0) + confW;
        }
      }
      const topTwo = Object.entries(riasecCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([k]) => k);
      const hollandCode = topTwo.join("") || "IC";

      // Grit
      const gritQs = qs.filter((q) => q.moduleId === "grit");
      for (const q of gritQs) {
        const selected = ans[q.id];
        if (!selected) continue;
        const opt = q.options.find((o) => o.id === selected);
        const confW =
          conf[q.id] === "sure" ? 1 : conf[q.id] === "unsure" ? 0.7 : 0.4;
        const dim = q.gritDimension || opt?.gritDimension;
        if (dim === "grit") {
          gritRaw += confW;
          gritCount++;
        } else if (dim === "mindset") {
          mindsetRaw += confW;
          mindsetCount++;
        }
      }
      const gritScore =
        gritCount > 0 ? Math.round((gritRaw / gritCount) * 100) : 50;
      const gritLevel: "Low" | "Medium" | "High" =
        gritScore >= 70 ? "High" : gritScore >= 40 ? "Medium" : "Low";
      const mindsetRatio = mindsetCount > 0 ? mindsetRaw / mindsetCount : 0.5;
      const mindsetType: "Fixed" | "Growth" | "Mixed" =
        mindsetRatio >= 0.65
          ? "Growth"
          : mindsetRatio <= 0.35
            ? "Fixed"
            : "Mixed";

      return {
        logical: modScores.logical ?? 50,
        numerical: modScores.numerical ?? 50,
        verbal: modScores.verbal ?? 50,
        scientific: modScores.scientific ?? 50,
        creative: modScores.creative ?? 50,
        leadership: modScores.leadership ?? 50,
        riasecCounts,
        hollandCode,
        gritLevel,
        mindsetType,
        gritScore,
      };
    },
    [],
  );

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleConfidence = (
    questionId: string,
    level: "sure" | "unsure" | "guess",
  ) => {
    setConfidence((prev) => ({ ...prev, [questionId]: level }));
  };

  const handleNextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (deepMode) {
        finishAssessment();
      } else {
        setStep("sliders");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const finishAssessment = useCallback(() => {
    const ms = computeModuleScores(questions, answers, confidence);
    setModuleScores(ms);
    setStudentProfile(profile);

    if (deepMode) {
      setStep("sliders");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [
    questions,
    answers,
    confidence,
    computeModuleScores,
    setModuleScores,
    setStudentProfile,
    profile,
    deepMode,
  ]);

  const handleSliderDone = () => {
    setSliderValues(sliders);
    setStudentProfile(profile);

    let ms = session.moduleScores;
    if (!ms && questions.length > 0) {
      ms = computeModuleScores(questions, answers, confidence);
      setModuleScores(ms);
    } else if (!ms) {
      ms = {
        logical: 50,
        numerical: 50,
        verbal: 50,
        scientific: 50,
        creative: 50,
        leadership: 50,
        riasecCounts: { R: 1, I: 1, A: 1, S: 1, E: 1, C: 1 },
        hollandCode: "IC",
        gritLevel: "Medium",
        mindsetType: "Mixed",
        gritScore: 50,
      };
      setModuleScores(ms);
    }

    const careers = scoreCareers(ms, sliders, profile.stream || "undecided");
    const disc = computeDISCProfile(ms, sliders);
    setResults({
      topCareers: careers,
      discProfile: disc,
      completedMVP: !deepMode,
      completedDeep: deepMode,
    });

    onNavigate({ view: "opportunity" });
  };

  const toggleSubject = (subject: string) => {
    setProfile((prev) => {
      const has = prev.selectedSubjects.includes(subject);
      if (!has && prev.selectedSubjects.length >= maxSubjects) return prev;
      return {
        ...prev,
        selectedSubjects: has
          ? prev.selectedSubjects.filter((s) => s !== subject)
          : [...prev.selectedSubjects, subject],
      };
    });
  };

  const canAdvanceProfile = profile.grade && profile.stream;

  const progressPct =
    questions.length > 0 ? Math.round((currentQ / questions.length) * 100) : 0;

  // \u2500\u2500\u2500 RENDER STEPS \u2500\u2500\u2500

  if (step === "profile") {
    return (
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section
          className="py-12 sm:py-16 px-4"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.17 0.07 255) 0%, oklch(0.24 0.09 255) 100%)",
          }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Badge className="mb-4 text-white border-white/30 bg-white/10">
                Step 1 of 5 \u2014 Identity Engine
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
                Let's build your{" "}
                <em className="font-instrument-italic not-italic">
                  career profile
                </em>
              </h1>
              <p className="text-white/70 text-base sm:text-lg">
                3 minutes to your personalized career blueprint. We'll ask about
                your grade, stream, and what matters to you.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="max-w-2xl mx-auto px-4 py-10 space-y-8">
          {/* Grade */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-base font-semibold text-foreground mb-3">
              Which grade are you in?
            </h2>
            <div className="flex flex-wrap gap-2">
              {GRADE_OPTIONS.map((g) => (
                <button
                  key={g}
                  type="button"
                  data-ocid={`identity.grade_${g}.button`}
                  onClick={() => setProfile((p) => ({ ...p, grade: g }))}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                    profile.grade === g
                      ? "text-white border-transparent shadow-sm"
                      : "text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                  style={
                    profile.grade === g
                      ? {
                          background: "oklch(0.55 0.18 260)",
                          borderColor: "oklch(0.55 0.18 260)",
                        }
                      : {}
                  }
                >
                  Grade {g}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Stream */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="text-base font-semibold text-foreground mb-3">
              Which stream are you in, or planning to choose?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {STREAM_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  data-ocid={`identity.stream_${s.id}.button`}
                  onClick={() => setProfile((p) => ({ ...p, stream: s.id }))}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    profile.stream === s.id
                      ? "border-transparent shadow-sm"
                      : "border-border hover:border-primary/30 hover:bg-secondary/50"
                  }`}
                  style={
                    profile.stream === s.id
                      ? {
                          background: "oklch(0.94 0.02 265)",
                          borderColor: "oklch(0.55 0.18 260)",
                        }
                      : {}
                  }
                >
                  <div className="text-sm font-semibold text-foreground">
                    {s.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {s.desc}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Subjects */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-base font-semibold text-foreground mb-1">
              What subjects do you enjoy or do well in?
            </h2>
            <p className="text-xs text-muted-foreground mb-3">
              Select up to {maxSubjects} subjects. This helps personalise your
              career matches.
            </p>
            <div className="space-y-4">
              {subjectCategories.map((cat) => (
                <div key={cat.category}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    {cat.category}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.subjects.map((subject) => {
                      const selected =
                        profile.selectedSubjects.includes(subject);
                      return (
                        <button
                          key={subject}
                          type="button"
                          data-ocid="identity.subject.toggle"
                          onClick={() => toggleSubject(subject)}
                          disabled={
                            !selected &&
                            profile.selectedSubjects.length >= maxSubjects
                          }
                          className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                            selected
                              ? "text-white border-transparent"
                              : profile.selectedSubjects.length >= maxSubjects
                                ? "text-muted-foreground/50 border-border cursor-not-allowed opacity-50"
                                : "text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                          }`}
                          style={
                            selected
                              ? {
                                  background: "oklch(0.52 0.15 162)",
                                  borderColor: "oklch(0.52 0.15 162)",
                                }
                              : {}
                          }
                        >
                          {subject}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            {profile.selectedSubjects.length > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                {profile.selectedSubjects.length}/{maxSubjects} selected
              </p>
            )}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Button
              data-ocid="identity.start_quiz.primary_button"
              size="lg"
              disabled={!canAdvanceProfile}
              onClick={() => {
                setStudentProfile(profile);
                initQuiz(false);
              }}
              className="w-full text-base font-semibold h-12 gap-2"
              style={{ background: "oklch(0.52 0.15 162)", color: "white" }}
            >
              Start Quick Quiz (12 questions)
              <ChevronRight className="w-4 h-4" />
            </Button>
            <button
              type="button"
              data-ocid="identity.deep_mode.link"
              onClick={() => {
                setStudentProfile(profile);
                initQuiz(true);
              }}
              disabled={!canAdvanceProfile}
              className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground underline-offset-2 hover:underline transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              I want the full deep assessment (102 questions) \u2192
            </button>
          </motion.div>
        </section>
      </main>
    );
  }

  if (step === "quiz" || step === "deep-assessment") {
    if (!currentQuestion) return null;
    const selectedAnswer = answers[currentQuestion.id];
    const selectedConf = confidence[currentQuestion.id];
    const canNext = !!selectedAnswer;

    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">
                {deepMode ? "Deep Assessment" : "Quick Quiz"}
              </span>
              <span className="text-xs text-muted-foreground">
                Q{currentQ + 1} of {questions.length}
              </span>
            </div>
            <Progress value={progressPct} className="h-1.5" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Module indicator */}
              {(() => {
                const mod = assessmentModules.find(
                  (m) => m.id === currentQuestion.moduleId,
                );
                return mod ? (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-base">{mod.emoji}</span>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {mod.title}
                    </span>
                  </div>
                ) : null;
              })()}

              <h2 className="text-lg font-semibold text-foreground mb-5 leading-snug">
                {currentQuestion.text}
              </h2>

              {/* Options */}
              <div className="space-y-2 mb-6" data-ocid="identity.quiz.panel">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    data-ocid={`identity.quiz_option_${opt.id}.button`}
                    onClick={() => handleAnswer(currentQuestion.id, opt.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                      selectedAnswer === opt.id
                        ? "border-transparent text-white"
                        : "border-border hover:border-primary/30 hover:bg-secondary/50 text-foreground"
                    }`}
                    style={
                      selectedAnswer === opt.id
                        ? {
                            background: "oklch(0.28 0.11 255)",
                            borderColor: "oklch(0.28 0.11 255)",
                          }
                        : {}
                    }
                  >
                    <span className="font-medium opacity-60 mr-2">
                      {opt.id.toUpperCase()}.
                    </span>
                    {opt.text}
                  </button>
                ))}
              </div>

              {/* Confidence */}
              {selectedAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <p className="text-xs text-muted-foreground mb-2 font-medium">
                    How confident are you in this answer?
                  </p>
                  <div
                    className="flex gap-2"
                    data-ocid="identity.confidence.toggle"
                  >
                    {(["sure", "unsure", "guess"] as const).map((level) => {
                      const labels = {
                        sure: "Sure",
                        unsure: "Not Sure",
                        guess: "Guesswork",
                      };
                      const colors = {
                        sure: "oklch(0.52 0.15 162)",
                        unsure: "oklch(0.58 0.14 55)",
                        guess: "oklch(0.57 0.22 29)",
                      };
                      const isSelected = selectedConf === level;
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() =>
                            handleConfidence(currentQuestion.id, level)
                          }
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                            isSelected
                              ? "text-white border-transparent"
                              : "text-muted-foreground border-border hover:border-primary/30"
                          }`}
                          style={
                            isSelected ? { background: colors[level] } : {}
                          }
                        >
                          {labels[level]}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              <Button
                data-ocid="identity.next_question.button"
                disabled={!canNext}
                onClick={handleNextQuestion}
                className="w-full h-11 font-semibold"
                style={{
                  background: canNext ? "oklch(0.52 0.15 162)" : "",
                  color: canNext ? "white" : "",
                }}
              >
                {currentQ < questions.length - 1
                  ? "Next Question"
                  : deepMode
                    ? "See My Sliders"
                    : "Set My Priorities"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    );
  }

  if (step === "sliders") {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">
              What matters most to you?
            </h1>
            <p className="text-muted-foreground text-sm mb-8">
              These 5 sliders personalise your career ranking. There are no
              right or wrong answers \u2014 just your priorities.
            </p>

            <div className="space-y-6 mb-10" data-ocid="identity.sliders.panel">
              {SLIDER_CONFIG.map(({ key, emoji, label, low, high }) => (
                <Card key={key} className="border shadow-xs">
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                      <span>{emoji}</span> {label}
                    </CardTitle>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{low}</span>
                      <span>{high}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <Slider
                      data-ocid={`identity.${key}_slider.input`}
                      min={1}
                      max={5}
                      step={1}
                      value={[sliders[key]]}
                      onValueChange={([v]) =>
                        setSliders((prev) => ({ ...prev, [key]: v }))
                      }
                      className="mt-1"
                    />
                    <div className="flex justify-between mt-1">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <span
                          key={v}
                          className={`text-xs ${
                            sliders[key] === v
                              ? "font-bold text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              data-ocid="identity.see_matches.primary_button"
              size="lg"
              onClick={handleSliderDone}
              className="w-full h-12 text-base font-semibold gap-2"
              style={{ background: "oklch(0.52 0.15 162)", color: "white" }}
            >
              See My Career Matches
              <Zap className="w-4 h-4" />
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-4">
              Your results are computed locally \u2014 no data is stored or
              shared.
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  return null;
}
