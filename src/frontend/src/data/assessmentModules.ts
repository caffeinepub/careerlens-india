import type { ModuleId } from "./assessmentQuestions";

export interface AssessmentModule {
  id: ModuleId;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  accentColor: string;
  bankSize: number;
  showCount: number;
  scoringType: "aptitude" | "preference" | "riasec" | "grit";
  unlocksFor: string[];
  emoji: string;
}

export const assessmentModules: AssessmentModule[] = [
  {
    id: "logical",
    number: 1,
    title: "Logical & Analytical",
    subtitle: "Reasoning, Patterns & Deduction",
    description:
      "Tests your ability to reason through problems, identify patterns, recognize logical relationships, and draw valid conclusions from given information.",
    color: "bg-blue-50 border-blue-200",
    accentColor: "text-blue-700",
    bankSize: 25,
    showCount: 13,
    scoringType: "aptitude",
    unlocksFor: ["Engineering", "Law", "Research", "Finance", "Data Science"],
    emoji: "🧠",
  },
  {
    id: "numerical",
    number: 2,
    title: "Numerical & Quantitative",
    subtitle: "Numbers, Data & Problem Solving",
    description:
      "Measures your ability to work with numbers, interpret data, apply mathematical concepts, and solve quantitative problems — essential for finance, engineering, and science careers.",
    color: "bg-emerald-50 border-emerald-200",
    accentColor: "text-emerald-700",
    bankSize: 25,
    showCount: 13,
    scoringType: "aptitude",
    unlocksFor: [
      "Finance",
      "Data Science",
      "Economics",
      "Engineering",
      "Research",
    ],
    emoji: "📊",
  },
  {
    id: "verbal",
    number: 3,
    title: "Verbal & Communication",
    subtitle: "Language, Expression & Comprehension",
    description:
      "Assesses vocabulary, grammar, reading comprehension, and communication clarity. Strong verbal skills open doors in law, journalism, management, and HR.",
    color: "bg-purple-50 border-purple-200",
    accentColor: "text-purple-700",
    bankSize: 25,
    showCount: 13,
    scoringType: "aptitude",
    unlocksFor: ["Law", "Journalism", "Management", "HR", "Marketing"],
    emoji: "💬",
  },
  {
    id: "scientific",
    number: 4,
    title: "Scientific & Technical",
    subtitle: "Science Reasoning & Tech Awareness",
    description:
      "Tests understanding of core science concepts (Physics, Chemistry, Biology), scientific method, and technology awareness — the foundation for medicine, research, and engineering.",
    color: "bg-orange-50 border-orange-200",
    accentColor: "text-orange-700",
    bankSize: 25,
    showCount: 13,
    scoringType: "aptitude",
    unlocksFor: [
      "Medicine",
      "Research",
      "Engineering",
      "Biotechnology",
      "Environmental Science",
    ],
    emoji: "🔬",
  },
  {
    id: "creative",
    number: 5,
    title: "Creative & Design",
    subtitle: "Originality, Innovation & Aesthetics",
    description:
      "Explores divergent thinking, design sensibility, creative problem-solving, and aesthetic judgment. Reveals potential in design, arts, marketing, product, and media careers.",
    color: "bg-pink-50 border-pink-200",
    accentColor: "text-pink-700",
    bankSize: 25,
    showCount: 13,
    scoringType: "preference",
    unlocksFor: [
      "Design",
      "Arts",
      "Marketing",
      "Product Management",
      "Media",
      "Architecture",
    ],
    emoji: "🎨",
  },
  {
    id: "leadership",
    number: 6,
    title: "Leadership & Interpersonal",
    subtitle: "People Skills & Team Dynamics",
    description:
      "Scenario-based questions measuring emotional intelligence, conflict resolution, team collaboration, and leadership style — critical for management, entrepreneurship, and social work.",
    color: "bg-yellow-50 border-yellow-200",
    accentColor: "text-yellow-700",
    bankSize: 25,
    showCount: 13,
    scoringType: "preference",
    unlocksFor: [
      "Management",
      "Entrepreneurship",
      "Social Work",
      "HR",
      "Consulting",
    ],
    emoji: "🤝",
  },
  {
    id: "riasec",
    number: 7,
    title: "RIASEC Personality",
    subtitle: "Holland's Career Personality Types",
    description:
      "Situational questions mapping your personality to the 6 Holland types: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional. Your top 2 types form your Holland Code.",
    color: "bg-indigo-50 border-indigo-200",
    accentColor: "text-indigo-700",
    bankSize: 18,
    showCount: 12,
    scoringType: "riasec",
    unlocksFor: ["All career families — personality overlay"],
    emoji: "🌐",
  },
  {
    id: "grit",
    number: 8,
    title: "Grit, Mindset & Values",
    subtitle: "Perseverance, Growth & What Matters",
    description:
      "Measures perseverance (Duckworth Grit Scale), growth vs fixed mindset (Dweck), and core work values (Super's Work Values Inventory). This layer predicts long-term career satisfaction more than aptitude alone.",
    color: "bg-rose-50 border-rose-200",
    accentColor: "text-rose-700",
    bankSize: 12,
    showCount: 12,
    scoringType: "grit",
    unlocksFor: [
      "Career resilience",
      "Long-term satisfaction",
      "Bridge gap analysis",
    ],
    emoji: "🔥",
  },
];

export const subjectCategories = [
  {
    category: "Sciences",
    subjects: [
      "Physics",
      "Chemistry",
      "Biology",
      "Environmental Science",
      "Computer Science",
      "Biotechnology",
    ],
  },
  {
    category: "Mathematics",
    subjects: [
      "Mathematics",
      "Statistics",
      "Additional Mathematics",
      "AP Calculus",
      "AP Statistics",
    ],
  },
  {
    category: "Languages",
    subjects: [
      "English",
      "Hindi",
      "French",
      "German",
      "Spanish",
      "Sanskrit",
      "Tamil",
      "Telugu",
      "Kannada",
      "Malayalam",
      "Bengali",
      "Marathi",
    ],
  },
  {
    category: "Humanities",
    subjects: [
      "History",
      "Geography",
      "Political Science",
      "Economics",
      "Sociology",
      "Psychology",
      "Philosophy",
      "Civics",
    ],
  },
  {
    category: "Commerce",
    subjects: [
      "Accountancy",
      "Business Studies",
      "Entrepreneurship",
      "Banking & Finance (CBSE)",
    ],
  },
  {
    category: "Arts & Vocational",
    subjects: [
      "Fine Arts",
      "Music",
      "Physical Education",
      "Design Technology",
      "Theatre Arts",
      "Dance",
      "Fashion Studies",
    ],
  },
  {
    category: "IB / IGCSE / AP",
    subjects: [
      "Global Perspectives (IGCSE)",
      "Theory of Knowledge (IB)",
      "Environmental Systems (IB/IGCSE)",
      "Business Management (IB)",
      "AP Computer Science",
      "AP Art History",
      "AP Environmental Science",
      "AP Government & Politics",
      "AP Psychology",
    ],
  },
];
