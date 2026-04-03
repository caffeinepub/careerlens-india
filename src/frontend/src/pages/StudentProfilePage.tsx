import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Layers,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { subjectCategories } from "../data/assessmentModules";
import type { NavState } from "../types/navigation";

interface StudentProfilePageProps {
  onNavigate: (state: NavState) => void;
}

const GRADES = [
  { id: "9", label: "Grade 9" },
  { id: "10", label: "Grade 10" },
  { id: "11", label: "Grade 11" },
  { id: "12", label: "Grade 12" },
];

const STREAMS = [
  { id: "pcm", label: "PCM", sublabel: "Physics, Chemistry, Maths" },
  { id: "pcb", label: "PCB", sublabel: "Physics, Chemistry, Biology" },
  {
    id: "pcm-cs",
    label: "PCM + CS",
    sublabel: "Science with Computer Science",
  },
  { id: "commerce", label: "Commerce", sublabel: "Commerce stream" },
  {
    id: "humanities",
    label: "Humanities / Arts",
    sublabel: "Arts & Social Sciences",
  },
  {
    id: "vocational",
    label: "Vocational",
    sublabel: "Skill-based vocational tracks",
  },
  {
    id: "undecided",
    label: "Not decided yet",
    sublabel: "Still exploring options",
  },
];

export function StudentProfilePage({ onNavigate }: StudentProfilePageProps) {
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedStream, setSelectedStream] = useState<string>("");
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(
    new Set(),
  );

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) => {
      const next = new Set(prev);
      if (next.has(subject)) {
        next.delete(subject);
      } else {
        next.add(subject);
      }
      return next;
    });
  };

  const canFindCareers =
    selectedGrade !== "" && selectedStream !== "" && selectedSubjects.size > 0;
  const canStartAssessment = selectedGrade !== "";

  const handleFindCareers = () => {
    onNavigate({
      view: "subject-gateway",
      grade: selectedGrade,
      stream: selectedStream,
      selectedSubjects: Array.from(selectedSubjects),
    });
  };

  const handleStartAssessment = () => {
    onNavigate({
      view: "assessment",
      grade: selectedGrade,
      stream: selectedStream || undefined,
      selectedSubjects:
        selectedSubjects.size > 0 ? Array.from(selectedSubjects) : undefined,
    });
  };

  return (
    <main>
      {/* Dark Hero Banner */}
      <section
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 255) 0%, oklch(0.25 0.10 240) 100%)",
        }}
        className="border-b border-white/10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Back to Home */}
          <nav
            className="mb-6 flex items-center gap-2 text-sm"
            aria-label="Breadcrumb"
          >
            <button
              type="button"
              onClick={() => onNavigate({ view: "home" })}
              className="text-white/50 hover:text-white/80 transition-colors flex items-center gap-1"
              data-ocid="student-profile.link"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </button>
            <span className="text-white/30">/</span>
            <span className="text-white/90 font-medium">Your Profile</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white/80 text-xs font-medium mb-5">
              <span>🎓</span>
              <span>Quick Profile — Takes Less Than a Minute</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Tell Us About{" "}
              <span style={{ color: "oklch(0.75 0.12 195)" }}>Yourself</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl">
              Answer 3 quick questions — just once. We'll use this to match
              careers or guide your full assessment, no repetition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Light Content Area */}
      <div className="bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
          {/* Step 1 — Grade */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            data-ocid="student-profile.section"
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: "oklch(0.40 0.14 255)" }}
              >
                1
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                  <GraduationCap
                    className="w-5 h-5"
                    style={{ color: "oklch(0.40 0.14 255)" }}
                  />
                  Which grade are you in?
                </h2>
                <p className="text-muted-foreground text-sm">
                  Personalises recommendations and content depth
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              {GRADES.map((g) => {
                const isSelected = selectedGrade === g.id;
                return (
                  <button
                    type="button"
                    key={g.id}
                    onClick={() => setSelectedGrade(g.id)}
                    data-ocid="student-profile.toggle"
                    aria-pressed={isSelected}
                    className={[
                      "relative flex flex-col items-center gap-1.5 rounded-xl border-2 px-4 py-5 text-sm font-semibold transition-all duration-200 cursor-pointer",
                      isSelected
                        ? "border-transparent text-white shadow-lg scale-105"
                        : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent/30",
                    ].join(" ")}
                    style={
                      isSelected
                        ? {
                            background:
                              "linear-gradient(135deg, oklch(0.40 0.14 255) 0%, oklch(0.50 0.16 220) 100%)",
                          }
                        : {}
                    }
                  >
                    <span className="text-3xl font-bold">{g.id}</span>
                    <span className="text-xs opacity-80">Grade {g.id}</span>
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white/30 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.section>

          {/* Step 2 — Stream */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            data-ocid="student-profile.panel"
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: "oklch(0.40 0.14 255)" }}
              >
                2
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                  <Layers
                    className="w-5 h-5"
                    style={{ color: "oklch(0.40 0.14 255)" }}
                  />
                  Which stream are you in, or planning to choose?
                </h2>
                <p className="text-muted-foreground text-sm">
                  Required for career matching — skip for assessment only
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-5">
              {STREAMS.map((stream) => {
                const isSelected = selectedStream === stream.id;
                return (
                  <button
                    type="button"
                    key={stream.id}
                    onClick={() =>
                      setSelectedStream(isSelected ? "" : stream.id)
                    }
                    data-ocid="student-profile.radio"
                    aria-pressed={isSelected}
                    className={[
                      "flex flex-col items-start gap-1 rounded-xl border-2 px-4 py-3 text-left transition-all duration-200 cursor-pointer",
                      isSelected
                        ? "border-transparent text-white"
                        : "border-border bg-card text-foreground hover:border-primary/40",
                    ].join(" ")}
                    style={
                      isSelected
                        ? {
                            background:
                              "linear-gradient(135deg, oklch(0.40 0.14 255) 0%, oklch(0.50 0.16 220) 100%)",
                          }
                        : {}
                    }
                  >
                    <span className="font-semibold text-sm">
                      {stream.label}
                    </span>
                    <span
                      className={[
                        "text-xs",
                        isSelected ? "text-white/70" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {stream.sublabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.section>

          {/* Step 3 — Subjects */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            data-ocid="student-profile.section"
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: "oklch(0.40 0.14 255)" }}
              >
                3
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                  <BookOpen
                    className="w-5 h-5"
                    style={{ color: "oklch(0.40 0.14 255)" }}
                  />
                  What subjects do you enjoy or do well in?
                </h2>
                <p className="text-muted-foreground text-sm">
                  Select all that apply — covers CBSE, ICSE, IGCSE, IB, State
                  boards and more
                  {selectedSubjects.size > 0 && (
                    <span
                      className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                      style={{ background: "oklch(0.40 0.14 255)" }}
                    >
                      {selectedSubjects.size} selected
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-6">
              {subjectCategories.map((cat) => (
                <div key={cat.category}>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 px-1">
                    {cat.category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.subjects.map((subject) => {
                      const isSelected = selectedSubjects.has(subject);
                      return (
                        <button
                          type="button"
                          key={subject}
                          onClick={() => toggleSubject(subject)}
                          data-ocid="student-profile.checkbox"
                          aria-pressed={isSelected}
                          className={[
                            "px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-150",
                            isSelected
                              ? "text-white border-transparent shadow-sm"
                              : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-accent/30",
                          ].join(" ")}
                          style={
                            isSelected
                              ? {
                                  background:
                                    "linear-gradient(135deg, oklch(0.40 0.14 255) 0%, oklch(0.50 0.16 220) 100%)",
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
          </motion.section>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="border-t border-border pt-8"
          >
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <h3 className="font-bold text-foreground text-lg">
                Ready? Choose your path:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Find Career Matches */}
                <div
                  className="rounded-xl border-2 p-4 flex flex-col gap-3"
                  style={{
                    borderColor: canFindCareers
                      ? "oklch(0.55 0.14 165)"
                      : undefined,
                  }}
                >
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">
                      🔍 Find my Career Matches
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Get careers matched to your stream and subjects. Quick and
                      instant.
                    </p>
                    {!canFindCareers && (
                      <p
                        className="text-xs mt-1.5 font-medium"
                        style={{ color: "oklch(0.55 0.18 30)" }}
                      >
                        Needs: grade + stream + at least 1 subject
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={handleFindCareers}
                    disabled={!canFindCareers}
                    className="w-full font-semibold text-white"
                    style={{
                      background: canFindCareers
                        ? "oklch(0.55 0.14 165)"
                        : undefined,
                    }}
                    data-ocid="student-profile.primary_button"
                  >
                    Find my Career Matches
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Discover my Fit */}
                <div
                  className="rounded-xl border-2 p-4 flex flex-col gap-3"
                  style={{
                    borderColor: canStartAssessment
                      ? "oklch(0.45 0.18 275)"
                      : undefined,
                  }}
                >
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">
                      🎯 Discover my Fit (Full Assessment)
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      8-module assessment — aptitude, personality, grit. Deep
                      career guidance.
                    </p>
                    {!canStartAssessment && (
                      <p
                        className="text-xs mt-1.5 font-medium"
                        style={{ color: "oklch(0.55 0.18 30)" }}
                      >
                        Needs: grade (minimum)
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={handleStartAssessment}
                    disabled={!canStartAssessment}
                    className="w-full font-semibold text-white"
                    style={{
                      background: canStartAssessment
                        ? "oklch(0.45 0.18 275)"
                        : undefined,
                    }}
                    data-ocid="student-profile.secondary_button"
                  >
                    Discover my Fit
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
