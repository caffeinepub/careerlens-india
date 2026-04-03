import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";
import { careerProfilesMap } from "../data/techDigitalCareers";
import type { NavState } from "../types/navigation";

interface SubjectGatewayPageProps {
  onNavigate: (state: NavState) => void;
  grade?: string;
  stream?: string;
  selectedSubjects?: string[];
}

const SUBJECT_TO_CAREERS: Record<string, string[]> = {
  // Sciences
  Mathematics: [
    "software-engineering",
    "data-science",
    "ai-ml-engineering",
    "cybersecurity",
  ],
  Physics: ["software-engineering", "ai-ml-engineering", "cybersecurity"],
  Chemistry: [],
  Biology: [],
  "Computer Science": [
    "software-engineering",
    "data-science",
    "cybersecurity",
    "ai-ml-engineering",
  ],
  "Information Technology": [
    "software-engineering",
    "data-science",
    "cybersecurity",
    "ai-ml-engineering",
  ],
  // Maths
  "Applied Mathematics": [
    "data-science",
    "software-engineering",
    "ai-ml-engineering",
  ],
  Statistics: ["data-science", "ai-ml-engineering"],
  // Commerce
  Accountancy: ["product-management"],
  Business: ["product-management", "digital-marketing"],
  "Business Studies": ["product-management", "digital-marketing"],
  Economics: ["product-management", "data-science", "digital-marketing"],
  "Commercial Applications": ["product-management", "digital-marketing"],
  // Languages / Verbal
  English: ["digital-marketing", "product-management"],
  "English Language": ["digital-marketing", "product-management"],
  "English Literature": ["digital-marketing"],
  // Arts subjects
  Arts: ["digital-marketing"],
  Design: ["product-management", "digital-marketing"],
  "Media Studies": ["digital-marketing"],
  // Fallback for common board subjects
  geography: [],
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

const STREAM_LABELS: Record<string, string> = {
  pcm: "Science (PCM)",
  pcb: "Science (PCB)",
  "pcm-cs": "Science + CS",
  commerce: "Commerce",
  humanities: "Humanities / Arts",
  vocational: "Vocational",
  undecided: "Not decided yet",
};

export function SubjectGatewayPage({
  onNavigate,
  grade,
  stream,
  selectedSubjects: initialSubjects = [],
}: SubjectGatewayPageProps) {
  const showSalary = !grade || (grade !== "9" && grade !== "10");
  const isNonTechStream = stream === "commerce" || stream === "humanities";

  const careerScores = useMemo(() => {
    return Object.keys(CAREER_META).map((careerId) => {
      let score = 0;
      for (const subj of initialSubjects) {
        if (SUBJECT_TO_CAREERS[subj]?.includes(careerId)) score++;
      }
      return { careerId, score };
    });
  }, [initialSubjects]);

  const maxScore = Math.max(...careerScores.map((c) => c.score), 0);
  const sortedCareers = useMemo(
    () => [...careerScores].sort((a, b) => b.score - a.score),
    [careerScores],
  );
  const hasAnyMatch = maxScore > 0;

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
              onClick={() => onNavigate({ view: "student-profile" })}
              className="text-white/50 hover:text-white/80 transition-colors flex items-center gap-1"
              data-ocid="subject-gateway.link"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Profile
            </button>
            <span className="text-white/30">/</span>
            <span className="text-white/90 font-medium">Career Matches</span>
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
              Your Career{" "}
              <span style={{ color: "oklch(0.75 0.12 195)" }}>Matches</span>
            </h1>
            {/* Profile summary pill */}
            <div className="flex flex-wrap gap-2 mt-3">
              {grade && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white/90 text-sm">
                  🎓 Grade {grade}
                </span>
              )}
              {stream && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white/90 text-sm">
                  📚 {STREAM_LABELS[stream] || stream}
                </span>
              )}
              {initialSubjects.length > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white/90 text-sm">
                  📌 {initialSubjects.length} subject
                  {initialSubjects.length > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Light Content Area */}
      <div className="bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Stream notice */}
          <AnimatePresence>
            {isNonTechStream && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800"
                data-ocid="subject-gateway.card"
              >
                <p className="font-semibold mb-1">
                  📌 More careers for your stream are coming soon
                </p>
                <p>
                  We’re adding full profiles for Commerce and Humanities careers
                  — CA, Economics, Journalism, Law, Management and more. Showing
                  Technology &amp; Digital careers below as a starting point,
                  where streams like yours can enter through roles like Product
                  Management and Digital Marketing.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "oklch(0.40 0.14 255)" }}
              >
                ✓
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Careers Matched to Your Subjects
              </h2>
            </div>
            <p className="text-muted-foreground text-sm ml-10">
              Sorted by relevance to the {initialSubjects.length} subject
              {initialSubjects.length !== 1 ? "s" : ""} you selected
            </p>
          </div>

          {/* No-match friendly message */}
          {!hasAnyMatch && initialSubjects.length > 0 && (
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
                Our Technology &amp; Digital careers may not be your first
                match, but many paths lead here! Bioinformatics, Health
                Informatics, and MedTech are where Biology meets technology.
                Geography &amp; Environmental Science links to GIS, Climate
                Tech, and Smart City planning. Explore all 6 careers below to
                discover unexpected connections.
              </p>
            </motion.div>
          )}

          {initialSubjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 rounded-xl border border-dashed border-border p-8 text-center"
              data-ocid="subject-gateway.empty_state"
            >
              <p className="text-4xl mb-3">🎓</p>
              <p className="text-muted-foreground text-sm">
                No subjects were selected. Go back and choose your subjects to
                see personalised career matches.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => onNavigate({ view: "student-profile" })}
                data-ocid="subject-gateway.secondary_button"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Update my Profile
              </Button>
            </motion.div>
          )}

          {/* Career Results Grid */}
          {sortedCareers.length > 0 && (
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
                            Technology &amp; Digital
                          </Badge>
                        </div>

                        {/* Career name */}
                        <h3 className="text-lg font-bold text-foreground leading-tight">
                          {meta.name}
                        </h3>

                        {/* Salary — hidden for Grade 9 and 10 */}
                        {showSalary && (
                          <p
                            className="text-sm font-semibold"
                            style={{ color: "oklch(0.45 0.13 145)" }}
                          >
                            {meta.salaryRange}
                          </p>
                        )}

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
          )}

          {/* Change Profile CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => onNavigate({ view: "student-profile" })}
              data-ocid="subject-gateway.secondary_button"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />← Change my Profile
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
