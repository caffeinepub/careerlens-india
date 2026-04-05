import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Bell, Lock, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "../../context/SessionContext";
import { getBridgeSteps } from "../../data/careerBridgeData";
import { careerScoringMap } from "../../data/careerScoringData";
import type { NavState } from "../../types/navigation";

interface ExecutionEngineProps {
  onNavigate: (state: NavState) => void;
}

const STORAGE_KEY = "careerlens_tasks";

function buildWeeklyTasks(
  careerId: string,
  grade: string,
  careerName: string,
): { week: number; title: string; tasks: string[] }[] {
  const bridgeSteps = getBridgeSteps(careerId, grade);
  const isGrade910 = Number.parseInt(grade) <= 10;

  return [
    {
      week: 1,
      title: "Foundation & Research",
      tasks: [
        `Research the top 3 colleges offering ${careerName} programs in India`,
        bridgeSteps[0]?.label ||
          `Identify which stream to choose for ${careerName}`,
        isGrade910
          ? "Talk to a family member or counselor about your career interest"
          : "Create a list of entrance exams required for this career",
      ],
    },
    {
      week: 2,
      title: "Skill Building",
      tasks: [
        bridgeSteps[1]?.label ||
          `Start a free online course related to ${careerName}`,
        "Spend 30 minutes/day this week on the most important subject for this career",
        "Find and follow 2 professionals working in this field on LinkedIn",
      ],
    },
    {
      week: 3,
      title: "Exam & Entry Prep",
      tasks: [
        bridgeSteps[2]?.label ||
          `Research the key entrance exam for ${careerName} entry`,
        "Download the syllabus or exam pattern for your target entrance exam",
        isGrade910
          ? "Identify 1 subject you need to strengthen before Grade 11"
          : "Create a weekly study schedule that allocates time to exam prep",
      ],
    },
    {
      week: 4,
      title: "Action & Outreach",
      tasks: [
        bridgeSteps[3]?.label ||
          `Message a professional in ${careerName} on LinkedIn with one specific question`,
        "Write a 1-paragraph summary of why this career interests you (for future applications)",
        isGrade910
          ? "Join or start a school club related to this career area"
          : "Apply to one relevant free certificate or online program",
      ],
    },
  ];
}

const PREMIUM_FEATURES = [
  {
    icon: <Trophy className="w-5 h-5" />,
    title: "Streak Tracker",
    desc: "Build a 30-day study streak. Track daily consistency and maintain your momentum.",
    color: "oklch(0.58 0.2 30)",
    bg: "oklch(0.97 0.02 30)",
  },
  {
    icon: <AlertCircle className="w-5 h-5" />,
    title: "GPS Career Tracker",
    desc: "Track if you're on-track vs. deviating from your plan. Get re-route suggestions.",
    color: "oklch(0.55 0.18 260)",
    bg: "oklch(0.96 0.02 260)",
  },
  {
    icon: <Bell className="w-5 h-5" />,
    title: "Advanced Nudges",
    desc: "Weekly personalized nudges based on your progress and upcoming milestones.",
    color: "oklch(0.52 0.15 162)",
    bg: "oklch(0.95 0.02 162)",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Parent Report PDF",
    desc: "Printable 1-page summary for your parents or school counselor.",
    color: "oklch(0.58 0.14 55)",
    bg: "oklch(0.97 0.03 55)",
  },
];

export function ExecutionEngine({ onNavigate }: ExecutionEngineProps) {
  const { session } = useSession();
  const { results, studentProfile } = session;

  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>(
    () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
      } catch {
        return {};
      }
    },
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedTasks));
    } catch {
      // ignore
    }
  }, [checkedTasks]);

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

  const topCareer = results.topCareers[0];
  const _careerMeta = topCareer ? careerScoringMap[topCareer.id] : null;
  const weeklyTasks = topCareer
    ? buildWeeklyTasks(topCareer.id, studentProfile.grade, topCareer.name)
    : [];

  const allTasks = weeklyTasks.flatMap((w, wi) =>
    w.tasks.map((_t, ti) => `w${wi}_t${ti}`),
  );
  const completedCount = allTasks.filter((k) => checkedTasks[k]).length;
  const totalTasks = allTasks.length;
  const progressPct =
    totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const toggleTask = (key: string) => {
    setCheckedTasks((prev) => ({ ...prev, [key]: !prev[key] }));
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
            Step 4 of 5 — Execution Engine
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">
            Your 30-Day Action Plan
          </h1>
          <p className="text-white/70 text-sm">
            {topCareer
              ? `Customised for ${topCareer.name} — Grade ${studentProfile.grade}`
              : "Complete the identity engine to get a personalised plan"}
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Progress */}
        {totalTasks > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">
                {completedCount} of {totalTasks} tasks complete
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: "oklch(0.52 0.15 162)" }}
              >
                {progressPct}%
              </span>
            </div>
            <Progress value={progressPct} className="h-2" />
          </motion.div>
        )}

        {/* Weekly Planner */}
        {weeklyTasks.map((week, wi) => (
          <motion.div
            key={week.week}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: wi * 0.05 }}
          >
            <Card className="border shadow-xs">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: "oklch(0.28 0.11 255)" }}
                  >
                    W{week.week}
                  </div>
                  <div>
                    <CardTitle className="text-sm">Week {week.week}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {week.title}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {week.tasks.map((task, ti) => {
                    const key = `w${wi}_t${ti}`;
                    const checked = !!checkedTasks[key];
                    return (
                      <label
                        key={key}
                        htmlFor={`task_${wi}_${ti}`}
                        data-ocid={`execution.task.item.${wi * 3 + ti + 1}`}
                        className="flex items-start gap-2.5 cursor-pointer group"
                      >
                        <Checkbox
                          id={`task_${wi}_${ti}`}
                          data-ocid={`execution.task_checkbox.${wi * 3 + ti + 1}`}
                          checked={checked}
                          onCheckedChange={() => toggleTask(key)}
                          className="mt-0.5 shrink-0"
                        />
                        <span
                          className={`text-sm leading-relaxed transition-colors ${
                            checked
                              ? "line-through text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {task}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Premium gate */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-base font-semibold text-foreground">
              Premium Features
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PREMIUM_FEATURES.map((feat, i) => (
              <Card
                key={feat.title}
                className="border shadow-xs opacity-80"
                style={{ borderLeftWidth: "3px", borderLeftColor: feat.color }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ color: feat.color }}>{feat.icon}</span>
                    <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      {feat.title}
                      <Lock className="w-3 h-3 text-muted-foreground" />
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {feat.desc}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    data-ocid={`execution.premium_notify.button.${i + 1}`}
                    onClick={() =>
                      toast.success("You'll be notified when Premium launches!")
                    }
                    className="w-full h-7 text-xs gap-1.5"
                    style={{ borderColor: feat.color, color: feat.color }}
                  >
                    <Bell className="w-3 h-3" /> Notify me when available
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Button
          data-ocid="execution.go_wow.primary_button"
          size="lg"
          onClick={() => onNavigate({ view: "wow" })}
          className="w-full h-12 text-base font-semibold"
          style={{ background: "oklch(0.58 0.2 30)", color: "white" }}
        >
          See My Career Blueprint
          <Trophy className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </main>
  );
}
