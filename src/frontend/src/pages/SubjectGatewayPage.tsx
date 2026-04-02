import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { careerProfilesMap } from "../data/techDigitalCareers";
import type { NavState } from "../types/navigation";

interface SubjectGatewayPageProps {
  onNavigate: (state: NavState) => void;
}

const SUBJECTS = [
  { id: "mathematics", label: "Mathematics", icon: "📐" },
  { id: "physics", label: "Physics", icon: "⚛️" },
  { id: "chemistry", label: "Chemistry", icon: "🧪" },
  { id: "biology", label: "Biology / Life Sciences", icon: "🧬" },
  { id: "computer-science", label: "Computer Science / IT", icon: "💻" },
  { id: "commerce", label: "Commerce / Accounts", icon: "📊" },
  { id: "economics", label: "Economics", icon: "📈" },
  { id: "geography", label: "Geography / Environment", icon: "🌍" },
  { id: "arts", label: "Arts / Humanities / Literature", icon: "🎨" },
  { id: "sports", label: "Physical Education / Sports", icon: "⚽" },
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
    id: "undecided",
    label: "Not decided yet",
    sublabel: "Still exploring options",
  },
];

const SUBJECT_TO_CAREERS: Record<string, string[]> = {
  mathematics: [
    "software-engineering",
    "data-science",
    "ai-ml-engineering",
    "cybersecurity",
  ],
  physics: ["software-engineering", "ai-ml-engineering", "cybersecurity"],
  chemistry: [],
  biology: [],
  "computer-science": [
    "software-engineering",
    "data-science",
    "cybersecurity",
    "ai-ml-engineering",
  ],
  commerce: ["digital-marketing", "product-management"],
  economics: ["product-management", "data-science", "digital-marketing"],
  geography: [],
  arts: ["digital-marketing"],
  sports: [],
};

const CAREER_META: Record<
  string,
  {
    name: string;
    salaryRange: string;
    subtypeId: string;
    typeId: string;
    categoryId: string;
    categoryName: string;
  }
> = {
  "software-engineering": {
    name: "Software Engineering",
    salaryRange: "₹5L–₹35L/yr",
    subtypeId: "software-engineering",
    typeId: "tech-digital",
    categoryId: "services",
    categoryName: "Services",
  },
  "data-science": {
    name: "Data Science",
    salaryRange: "₹6L–₹45L/yr",
    subtypeId: "data-science",
    typeId: "tech-digital",
    categoryId: "services",
    categoryName: "Services",
  },
  cybersecurity: {
    name: "Cybersecurity",
    salaryRange: "₹5.5L–₹40L/yr",
    subtypeId: "cybersecurity",
    typeId: "tech-digital",
    categoryId: "services",
    categoryName: "Services",
  },
  "ai-ml-engineering": {
    name: "AI & ML Engineering",
    salaryRange: "₹8L–₹70L/yr",
    subtypeId: "ai-ml-engineering",
    typeId: "tech-digital",
    categoryId: "services",
    categoryName: "Services",
  },
  "product-management": {
    name: "Product Management",
    salaryRange: "₹9L–₹50L/yr",
    subtypeId: "product-management",
    typeId: "tech-digital",
    categoryId: "services",
    categoryName: "Services",
  },
  "digital-marketing": {
    name: "Digital Marketing",
    salaryRange: "₹3.5L–₹25L/yr",
    subtypeId: "digital-marketing",
    typeId: "tech-digital",
    categoryId: "services",
    categoryName: "Services",
  },
};

type MatchLabel = "Strong Match" | "Good Match" | "Explore Anyway";

function getMatchLabel(score: number, maxScore: number): MatchLabel {
  if (maxScore === 0) return "Explore Anyway";
  const ratio = score / maxScore;
  if (ratio >= 0.6) return "Strong Match";
  if (ratio >= 0.3) return "Good Match";
  return "Explore Anyway";
}

const matchLabelStyle: Record<MatchLabel, string> = {
  "Strong Match": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Good Match": "bg-blue-100 text-blue-800 border-blue-200",
  "Explore Anyway": "bg-gray-100 text-gray-600 border-gray-200",
};

export function SubjectGatewayPage({ onNavigate }: SubjectGatewayPageProps) {
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(
    new Set(),
  );
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const toggleSubject = (id: string) => {
    setSelectedSubjects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setShowResults(false);
  };

  const handleReset = () => {
    setSelectedSubjects(new Set());
    setSelectedStream(null);
    setShowResults(false);
  };

  // Score each career using for...of
  const careerScores = Object.keys(CAREER_META).map((careerId) => {
    let score = 0;
    for (const subj of selectedSubjects) {
      if (SUBJECT_TO_CAREERS[subj]?.includes(careerId)) score++;
    }
    return { careerId, score };
  });

  const maxScore = Math.max(...careerScores.map((c) => c.score), 0);
  const sortedCareers = [...careerScores].sort((a, b) => b.score - a.score);
  const hasAnyMatch = maxScore > 0;

  const handleFindCareers = () => {
    setShowResults(true);
    setTimeout(() => {
      document
        .getElementById("results-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleViewProfile = (careerId: string) => {
    const meta = CAREER_META[careerId];
    onNavigate({
      view: "subtype",
      subtypeId: meta.subtypeId,
      subtypeName: meta.name,
      typeId: "tech-digital",
      typeName: "Technology & Digital",
      categoryId: "services",
      categoryName: "Services",
    });
  };

  const getMatchingSkills = (careerId: string): string[] => {
    const profile = careerProfilesMap[careerId];
    if (!profile) return [];
    const allSkills = [...profile.skillsTechnical, ...profile.skillsSoft];
    return allSkills.slice(0, 3);
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav
            className="mb-6 flex items-center gap-2 text-sm"
            aria-label="Breadcrumb"
          >
            <button
              type="button"
              onClick={() => onNavigate({ view: "home" })}
              className="text-white/50 hover:text-white/80 transition-colors"
              data-ocid="subject-gateway.link"
            >
              Home
            </button>
            <span className="text-white/30">/</span>
            <span className="text-white/90 font-medium">Subject Gateway</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white/80 text-xs font-medium mb-5">
              <span>🎯</span>
              <span>Career Discovery Tool</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Find Careers That Match
              <br />
              <span style={{ color: "oklch(0.75 0.12 195)" }}>
                Your Subjects
              </span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl">
              Tell us what you're good at, and we'll show you where it leads —
              with salary data, real roles, and top colleges across India and
              the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Light Content Area */}
      <div className="bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Step 1 — Subject Selection */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
            data-ocid="subject-gateway.section"
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "oklch(0.40 0.14 255)" }}
              >
                1
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                What subjects do you enjoy or do well in?
              </h2>
            </div>
            <p className="text-muted-foreground text-sm ml-10 mb-6">
              Select all that apply — you can choose as many as you like
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {SUBJECTS.map((subject) => {
                const isSelected = selectedSubjects.has(subject.id);
                return (
                  <button
                    type="button"
                    key={subject.id}
                    onClick={() => toggleSubject(subject.id)}
                    data-ocid="subject-gateway.toggle"
                    aria-pressed={isSelected}
                    className={[
                      "relative flex flex-col items-center gap-2 rounded-xl border-2 px-3 py-4 text-sm font-medium transition-all duration-200 cursor-pointer select-none",
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
                    <span className="text-2xl">{subject.icon}</span>
                    <span className="text-center leading-tight">
                      {subject.label}
                    </span>
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white/30 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedSubjects.size > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-sm text-muted-foreground"
              >
                {selectedSubjects.size} subject
                {selectedSubjects.size > 1 ? "s" : ""} selected
              </motion.p>
            )}
          </motion.section>

          {/* Step 2 — Stream Selection */}
          <AnimatePresence>
            {selectedSubjects.size > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-10"
                data-ocid="subject-gateway.panel"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "oklch(0.40 0.14 255)" }}
                  >
                    2
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    Which stream are you in, or planning to choose?
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm ml-10 mb-6">
                  Optional — helps refine your results
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {STREAMS.map((stream) => {
                    const isSelected = selectedStream === stream.id;
                    return (
                      <button
                        type="button"
                        key={stream.id}
                        onClick={() =>
                          setSelectedStream(isSelected ? null : stream.id)
                        }
                        data-ocid="subject-gateway.radio"
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
                            isSelected
                              ? "text-white/70"
                              : "text-muted-foreground",
                          ].join(" ")}
                        >
                          {stream.sublabel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Find My Careers CTA */}
                <div className="mt-8 flex items-center gap-4 flex-wrap">
                  <Button
                    onClick={handleFindCareers}
                    size="lg"
                    className="text-white px-8 shadow-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.40 0.14 255) 0%, oklch(0.50 0.16 220) 100%)",
                    }}
                    data-ocid="subject-gateway.primary_button"
                  >
                    🔍 Find My Careers
                  </Button>
                  {showResults && (
                    <Button
                      variant="ghost"
                      onClick={handleReset}
                      data-ocid="subject-gateway.secondary_button"
                    >
                      ↺ Start Over
                    </Button>
                  )}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Step 3 — Results */}
          <AnimatePresence>
            {showResults && (
              <motion.section
                id="results-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                data-ocid="subject-gateway.section"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "oklch(0.40 0.14 255)" }}
                  >
                    3
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    Your Career Matches
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm ml-10 mb-6">
                  Based on the subjects you selected — sorted by relevance
                </p>

                {/* No-match friendly message */}
                {!hasAnyMatch && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800"
                    data-ocid="subject-gateway.card"
                  >
                    <p className="font-semibold mb-1">
                      💡 Interesting Crossovers Exist!
                    </p>
                    <p>
                      Our Technology & Digital careers may not be your first
                      match, but many paths lead here! Bioinformatics, Health
                      Informatics, and MedTech are where Biology meets
                      technology. Geography & Environmental Science links to
                      GIS, Climate Tech, and Smart City planning. Explore all 6
                      careers below to discover unexpected connections.
                    </p>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {sortedCareers.map(({ careerId, score }, index) => {
                    const meta = CAREER_META[careerId];
                    const matchLabel = getMatchLabel(score, maxScore);
                    const matchingSkills = getMatchingSkills(careerId);

                    return (
                      <motion.div
                        key={careerId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.07 }}
                        data-ocid={`subject-gateway.item.${index + 1}`}
                      >
                        <Card className="h-full flex flex-col border-2 hover:border-primary/30 transition-all duration-200 hover:shadow-md">
                          <CardContent className="flex flex-col gap-3 pt-5 pb-5 flex-1">
                            {/* Match label + industry badge */}
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${matchLabelStyle[matchLabel]}`}
                              >
                                {matchLabel}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                Technology & Digital
                              </Badge>
                            </div>

                            {/* Career name */}
                            <h3 className="text-lg font-bold text-foreground leading-tight">
                              {meta.name}
                            </h3>

                            {/* Salary */}
                            <p
                              className="text-sm font-semibold"
                              style={{ color: "oklch(0.45 0.13 145)" }}
                            >
                              {meta.salaryRange}
                            </p>

                            {/* Matching skills */}
                            <div className="flex flex-wrap gap-1.5">
                              {matchingSkills.map((skill) => (
                                <span
                                  key={skill}
                                  className="text-xs px-2 py-0.5 rounded-full bg-accent/60 text-accent-foreground border border-border"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>

                            {/* Spacer */}
                            <div className="flex-1" />

                            {/* CTA */}
                            <Button
                              size="sm"
                              onClick={() => handleViewProfile(careerId)}
                              className="w-full text-white"
                              style={{
                                background:
                                  "linear-gradient(135deg, oklch(0.40 0.14 255) 0%, oklch(0.50 0.16 220) 100%)",
                              }}
                              data-ocid="subject-gateway.button"
                            >
                              View Full Profile →
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Reset button at bottom */}
                <div className="mt-10 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    data-ocid="subject-gateway.secondary_button"
                  >
                    ↺ Start Over — Try Different Subjects
                  </Button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Empty state — no subjects selected yet */}
          {selectedSubjects.size === 0 && !showResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 rounded-xl border border-dashed border-border p-8 text-center"
              data-ocid="subject-gateway.empty_state"
            >
              <p className="text-4xl mb-3">🎓</p>
              <p className="text-muted-foreground text-sm">
                Select one or more subjects above to discover careers that align
                with your strengths.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
