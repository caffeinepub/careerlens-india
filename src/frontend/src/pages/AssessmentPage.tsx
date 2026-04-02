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
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Brain,
  ChevronRight,
  Code2,
  Flame,
  HelpCircle,
  Lightbulb,
  Megaphone,
  Minus,
  Printer,
  Rocket,
  Save,
  Shield,
  Star,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { NavState } from "../types/navigation";

interface AssessmentPageProps {
  onNavigate: (state: NavState) => void;
}

// ─── Types ───────────────────────────────────────────────────────────────────

type Grade = "9" | "10" | "11" | "12";
type ConfidenceLevel = "sure" | "not_sure" | "guesswork";

interface ScoreDeltas {
  aptitude?: number;
  interest_tech?: number;
  interest_data?: number;
  interest_creative?: number;
  interest_analytical?: number;
  interest_management?: number;
  personality_extrovert?: number;
  personality_introvert?: number;
  personality_ambi?: number;
  personality_leadership?: number;
  personality_detail?: number;
  personality_creative?: number;
  personality_social?: number;
  personality_analytical?: number;
  personality_curious?: number;
  personality_resilient?: number;
  personality_reflective?: number;
  personality_kinesthetic?: number;
  // GMV fields
  grit_perseverance?: number;
  grit_passion?: number;
  mindset_growth?: number;
  mindset_fixed?: number;
  values_security?: number;
  values_income?: number;
  values_impact?: number;
  values_creativity?: number;
  values_independence?: number;
  values_challenge?: number;
  values_connection?: number;
  values_recognition?: number;
}

interface Answer {
  label: string;
  text: string;
  scores: ScoreDeltas;
}

interface Question {
  id: number;
  dimension: "aptitude" | "interests" | "personality" | "grit_mindset_values";
  text: string;
  answers: Answer[];
  skipConfidence?: boolean;
}

interface Scores {
  aptitude: number;
  interest_tech: number;
  interest_data: number;
  interest_creative: number;
  interest_analytical: number;
  interest_management: number;
  personality_extrovert: number;
  personality_introvert: number;
  personality_ambi: number;
  personality_leadership: number;
  personality_detail: number;
  personality_creative: number;
  personality_social: number;
  personality_analytical: number;
  personality_curious: number;
  personality_resilient: number;
  personality_reflective: number;
  personality_kinesthetic: number;
  // GMV fields
  grit_perseverance: number;
  grit_passion: number;
  mindset_growth: number;
  mindset_fixed: number;
  values_security: number;
  values_income: number;
  values_impact: number;
  values_creativity: number;
  values_independence: number;
  values_challenge: number;
  values_connection: number;
  values_recognition: number;
}

interface CareerScore {
  id: string;
  name: string;
  score: number;
  entrySalary: string;
  topSkills: string[];
  icon: React.ReactNode;
}

interface ClusterResult {
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  score: number;
}

type GritLevel = "High" | "Medium" | "Low";
type MindsetType = "Growth" | "Fixed" | "Mixed";

interface GmvProfile {
  gritLevel: GritLevel;
  mindsetType: MindsetType;
  topValues: string[];
  gmvCluster: string;
}

// ─── Questions Data ───────────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    id: 1,
    dimension: "aptitude",
    text: "If you have 24 apples and need to divide them equally among 6 friends, how many does each person get?",
    answers: [
      { label: "A", text: "4", scores: { aptitude: 2 } },
      { label: "B", text: "5", scores: { aptitude: 0 } },
      { label: "C", text: "6", scores: { aptitude: 0 } },
      { label: "D", text: "I'd use a calculator", scores: { aptitude: 1 } },
    ],
  },
  {
    id: 2,
    dimension: "aptitude",
    text: "Which word is the odd one out: Apple, Mango, Carrot, Banana?",
    answers: [
      {
        label: "A",
        text: "Carrot (it's a vegetable)",
        scores: { aptitude: 2 },
      },
      { label: "B", text: "Mango", scores: { aptitude: 0 } },
      { label: "C", text: "Apple", scores: { aptitude: 0 } },
      { label: "D", text: "Banana", scores: { aptitude: 0 } },
    ],
  },
  {
    id: 3,
    dimension: "aptitude",
    text: "If A > B and B > C, which is definitely true?",
    answers: [
      { label: "A", text: "A > C", scores: { aptitude: 2 } },
      { label: "B", text: "C > A", scores: { aptitude: 0 } },
      { label: "C", text: "B is the largest", scores: { aptitude: 0 } },
      { label: "D", text: "Cannot be determined", scores: { aptitude: 0 } },
    ],
  },
  {
    id: 4,
    dimension: "aptitude",
    text: "What comes next in the sequence: 2, 4, 8, 16, ___?",
    answers: [
      { label: "A", text: "18", scores: { aptitude: 0 } },
      { label: "B", text: "20", scores: { aptitude: 0 } },
      { label: "C", text: "24", scores: { aptitude: 0 } },
      { label: "D", text: "32", scores: { aptitude: 2 } },
    ],
  },
  {
    id: 5,
    dimension: "aptitude",
    text: "If a train travels at 60 km/h, how long does it take to cover 180 km?",
    answers: [
      { label: "A", text: "2 hours", scores: { aptitude: 0 } },
      { label: "B", text: "3 hours", scores: { aptitude: 2 } },
      { label: "C", text: "4 hours", scores: { aptitude: 0 } },
      { label: "D", text: "6 hours", scores: { aptitude: 0 } },
    ],
  },
  {
    id: 6,
    dimension: "aptitude",
    text: "Which shape has exactly 4 equal sides and 4 right angles?",
    answers: [
      { label: "A", text: "Rectangle", scores: { aptitude: 0 } },
      { label: "B", text: "Rhombus", scores: { aptitude: 0 } },
      { label: "C", text: "Square", scores: { aptitude: 2 } },
      { label: "D", text: "Parallelogram", scores: { aptitude: 0 } },
    ],
  },
  {
    id: 7,
    dimension: "aptitude",
    text: "In a class of 40 students, 25% got an A grade. How many students got an A?",
    answers: [
      { label: "A", text: "8", scores: { aptitude: 0 } },
      { label: "B", text: "10", scores: { aptitude: 2 } },
      { label: "C", text: "15", scores: { aptitude: 0 } },
      { label: "D", text: "20", scores: { aptitude: 0 } },
    ],
  },
  {
    id: 8,
    dimension: "interests",
    text: "Which activity sounds most exciting to you?",
    answers: [
      {
        label: "A",
        text: "Building an app or game on a computer",
        scores: { interest_tech: 3 },
      },
      {
        label: "B",
        text: "Analysing trends in a dataset",
        scores: { interest_data: 3 },
      },
      {
        label: "C",
        text: "Designing a campaign to promote something",
        scores: { interest_creative: 3 },
      },
      {
        label: "D",
        text: "Understanding how a system or machine works",
        scores: { interest_analytical: 3 },
      },
    ],
  },
  {
    id: 9,
    dimension: "interests",
    text: "If you could spend a free afternoon doing anything, what would you choose?",
    answers: [
      {
        label: "A",
        text: "Writing a blog post or making a video",
        scores: { interest_creative: 3 },
      },
      {
        label: "B",
        text: "Solving logic puzzles or playing chess",
        scores: { interest_analytical: 3 },
      },
      {
        label: "C",
        text: "Researching a topic you're curious about",
        scores: { interest_data: 3 },
      },
      {
        label: "D",
        text: "Building or fixing something with your hands or code",
        scores: { interest_tech: 3 },
      },
    ],
  },
  {
    id: 10,
    dimension: "interests",
    text: "Which school subject do you enjoy most?",
    answers: [
      {
        label: "A",
        text: "Mathematics",
        scores: { interest_analytical: 2, interest_data: 1 },
      },
      { label: "B", text: "Computer Science", scores: { interest_tech: 3 } },
      {
        label: "C",
        text: "English / Languages",
        scores: { interest_creative: 3 },
      },
      {
        label: "D",
        text: "Science (Biology/Chemistry/Physics)",
        scores: { interest_analytical: 2 },
      },
    ],
  },
  {
    id: 11,
    dimension: "interests",
    text: "What kind of work would you find most satisfying?",
    answers: [
      {
        label: "A",
        text: "Creating content — videos, writing, design",
        scores: { interest_creative: 3 },
      },
      {
        label: "B",
        text: "Solving technical problems in software or systems",
        scores: { interest_tech: 3 },
      },
      {
        label: "C",
        text: "Finding patterns and insights in data",
        scores: { interest_data: 3 },
      },
      {
        label: "D",
        text: "Managing a project and coordinating a team",
        scores: { interest_management: 3 },
      },
    ],
  },
  {
    id: 12,
    dimension: "interests",
    text: "Which of these excites you most about India's future?",
    answers: [
      {
        label: "A",
        text: "India becoming a global technology hub",
        scores: { interest_tech: 3 },
      },
      {
        label: "B",
        text: "Indian companies telling their stories globally",
        scores: { interest_creative: 3 },
      },
      {
        label: "C",
        text: "AI and data transforming Indian healthcare and farming",
        scores: { interest_data: 3 },
      },
      {
        label: "D",
        text: "Indian startups solving problems for a billion people",
        scores: { interest_management: 3 },
      },
    ],
  },
  {
    id: 13,
    dimension: "interests",
    text: "When you use an app like Zomato or Instagram, what do you think about most?",
    answers: [
      {
        label: "A",
        text: "How did they build this technically?",
        scores: { interest_tech: 3 },
      },
      {
        label: "B",
        text: "Why did they design it this way? Who decided what to build?",
        scores: { interest_management: 3 },
      },
      {
        label: "C",
        text: "What data are they collecting and how do they use it?",
        scores: { interest_data: 3 },
      },
      {
        label: "D",
        text: "How do they market it so well to so many people?",
        scores: { interest_creative: 3 },
      },
    ],
  },
  {
    id: 14,
    dimension: "interests",
    text: "Which career sounds most appealing?",
    answers: [
      {
        label: "A",
        text: "Ethical Hacker who finds security vulnerabilities",
        scores: { interest_tech: 3, interest_analytical: 1 },
      },
      {
        label: "B",
        text: "Data Scientist at a healthcare startup",
        scores: { interest_data: 3 },
      },
      {
        label: "C",
        text: "Product Manager at a unicorn startup",
        scores: { interest_management: 3 },
      },
      {
        label: "D",
        text: "Digital Marketing Lead at a D2C brand",
        scores: { interest_creative: 3 },
      },
    ],
  },
  {
    id: 15,
    dimension: "personality",
    text: "When working on a group project, you usually...",
    answers: [
      {
        label: "A",
        text: "Take charge and organize everyone",
        scores: { personality_extrovert: 2, personality_leadership: 2 },
      },
      {
        label: "B",
        text: "Focus on your specific task and do it really well",
        scores: { personality_introvert: 2, personality_detail: 2 },
      },
      {
        label: "C",
        text: "Make sure everyone is heard and the team gets along",
        scores: { personality_social: 2 },
      },
      {
        label: "D",
        text: "Come up with new ideas and approaches",
        scores: { personality_creative: 2 },
      },
    ],
  },
  {
    id: 16,
    dimension: "personality",
    text: "After a long day of socializing, you feel...",
    answers: [
      {
        label: "A",
        text: "Energized — I love being around people",
        scores: { personality_extrovert: 2 },
      },
      {
        label: "B",
        text: "Drained — I need alone time to recharge",
        scores: { personality_introvert: 2 },
      },
      {
        label: "C",
        text: "It depends on the people",
        scores: { personality_ambi: 2 },
      },
      { label: "D", text: "Fine either way", scores: { personality_ambi: 2 } },
    ],
  },
  {
    id: 17,
    dimension: "personality",
    text: "When given a big project, you prefer to...",
    answers: [
      {
        label: "A",
        text: "Plan every step before starting",
        scores: { personality_detail: 2 },
      },
      {
        label: "B",
        text: "Jump in and figure it out as you go",
        scores: { personality_creative: 2 },
      },
      {
        label: "C",
        text: "Research thoroughly before starting",
        scores: { personality_analytical: 2 },
      },
      {
        label: "D",
        text: "Talk to people who've done it before",
        scores: { personality_social: 2 },
      },
    ],
  },
  {
    id: 18,
    dimension: "personality",
    text: "Which describes you better?",
    answers: [
      {
        label: "A",
        text: "I love learning new things every day",
        scores: { personality_curious: 2 },
      },
      {
        label: "B",
        text: "I prefer to master one thing deeply",
        scores: { personality_detail: 2 },
      },
      {
        label: "C",
        text: "I like variety — different tasks each day",
        scores: { personality_creative: 2 },
      },
      {
        label: "D",
        text: "I like clear goals and structured tasks",
        scores: { personality_analytical: 2 },
      },
    ],
  },
  {
    id: 19,
    dimension: "personality",
    text: "When you make a mistake, you usually...",
    answers: [
      {
        label: "A",
        text: "Analyse what went wrong and make sure it doesn't happen again",
        scores: { personality_analytical: 2 },
      },
      {
        label: "B",
        text: "Shrug it off and move on quickly",
        scores: { personality_resilient: 2 },
      },
      {
        label: "C",
        text: "Feel bad but learn from it",
        scores: { personality_reflective: 2 },
      },
      {
        label: "D",
        text: "Ask someone else what they would have done differently",
        scores: { personality_social: 2 },
      },
    ],
  },
  {
    id: 20,
    dimension: "personality",
    text: "Your ideal work environment is...",
    answers: [
      {
        label: "A",
        text: "A busy office with lots of collaboration and energy",
        scores: { personality_extrovert: 2 },
      },
      {
        label: "B",
        text: "Quiet focus time with occasional team check-ins",
        scores: { personality_introvert: 2 },
      },
      {
        label: "C",
        text: "Flexible — sometimes remote, sometimes in the office",
        scores: { personality_ambi: 2 },
      },
      {
        label: "D",
        text: "Outdoors or hands-on, not a desk job",
        scores: { personality_kinesthetic: 2 },
      },
    ],
  },
  // ── Module 8: Grit, Mindset & Values ─────────────────────────────────────
  {
    id: 21,
    dimension: "grit_mindset_values",
    text: "When I face a setback in studies or a project, I usually...",
    answers: [
      {
        label: "A",
        text: "Give up and try something else",
        scores: { grit_perseverance: 0 },
      },
      {
        label: "B",
        text: "Take a break and come back to it",
        scores: { grit_perseverance: 1 },
      },
      {
        label: "C",
        text: "Push through until I find a solution",
        scores: { grit_perseverance: 3 },
      },
      {
        label: "D",
        text: "Ask for help and keep going",
        scores: { grit_perseverance: 2 },
      },
    ],
  },
  {
    id: 22,
    dimension: "grit_mindset_values",
    text: "I have been interested in the same goal, hobby, or passion for...",
    answers: [
      {
        label: "A",
        text: "Less than a few months",
        scores: { grit_passion: 0 },
      },
      { label: "B", text: "About 1 year", scores: { grit_passion: 1 } },
      { label: "C", text: "A few years", scores: { grit_passion: 2 } },
      {
        label: "D",
        text: "As long as I can remember",
        scores: { grit_passion: 3 },
      },
    ],
  },
  {
    id: 23,
    dimension: "grit_mindset_values",
    text: "I finish whatever I begin, even if it gets boring or difficult.",
    answers: [
      {
        label: "A",
        text: "Rarely true of me",
        scores: { grit_perseverance: 0 },
      },
      {
        label: "B",
        text: "Sometimes true of me",
        scores: { grit_perseverance: 1 },
      },
      {
        label: "C",
        text: "Mostly true of me",
        scores: { grit_perseverance: 2 },
      },
      {
        label: "D",
        text: "Always true of me",
        scores: { grit_perseverance: 3 },
      },
    ],
  },
  {
    id: 24,
    dimension: "grit_mindset_values",
    text: "If I discover I'm not naturally talented at something I care about, I would...",
    answers: [
      {
        label: "A",
        text: "Drop it and find something I'm naturally good at",
        scores: { grit_perseverance: 0, mindset_fixed: 2 },
      },
      {
        label: "B",
        text: "Work harder to get better at it",
        scores: { grit_perseverance: 3, mindset_growth: 2 },
      },
      {
        label: "C",
        text: "Look for shortcuts or easier alternatives",
        scores: { grit_perseverance: 1 },
      },
      {
        label: "D",
        text: "Redefine what success looks like in that area",
        scores: { grit_perseverance: 2, mindset_growth: 1 },
      },
    ],
  },
  {
    id: 25,
    dimension: "grit_mindset_values",
    text: "When I get a poor result in an exam, I think...",
    answers: [
      {
        label: "A",
        text: "I'm just not smart enough for this subject",
        scores: { mindset_fixed: 3 },
      },
      {
        label: "B",
        text: "I didn't prepare the right way — I'll change my approach",
        scores: { mindset_growth: 3 },
      },
      { label: "C", text: "The exam was unfair", scores: { mindset_fixed: 1 } },
      {
        label: "D",
        text: "I need to find a subject I'm naturally good at",
        scores: { mindset_fixed: 2 },
      },
    ],
  },
  {
    id: 26,
    dimension: "grit_mindset_values",
    text: "When someone is better than me at something, I feel...",
    answers: [
      {
        label: "A",
        text: "Threatened or discouraged",
        scores: { mindset_fixed: 2 },
      },
      {
        label: "B",
        text: "Curious — I want to know how they got there",
        scores: { mindset_growth: 3 },
      },
      {
        label: "C",
        text: "It doesn't affect me",
        scores: { mindset_growth: 1 },
      },
      {
        label: "D",
        text: "Motivated to outperform them next time",
        scores: { mindset_growth: 2, grit_perseverance: 1 },
      },
    ],
  },
  {
    id: 27,
    dimension: "grit_mindset_values",
    text: "I believe intelligence and talent...",
    answers: [
      {
        label: "A",
        text: "Are fixed — you either have them or you don't",
        scores: { mindset_fixed: 3 },
      },
      {
        label: "B",
        text: "Can grow with effort and the right strategies",
        scores: { mindset_growth: 3 },
      },
      {
        label: "C",
        text: "Matter less than connections and luck",
        scores: { mindset_fixed: 1 },
      },
      {
        label: "D",
        text: "Are important but character matters more",
        scores: { mindset_growth: 2 },
      },
    ],
  },
  {
    id: 28,
    dimension: "grit_mindset_values",
    text: "If I had to choose, I would prefer work that...",
    answers: [
      {
        label: "A",
        text: "I'm already good at and feels comfortable",
        scores: { mindset_fixed: 2, values_security: 1 },
      },
      {
        label: "B",
        text: "Challenges me and helps me grow, even if I struggle",
        scores: { mindset_growth: 3, values_challenge: 2 },
      },
      {
        label: "C",
        text: "Pays well, even if it's not my passion",
        scores: { values_income: 3 },
      },
      {
        label: "D",
        text: "Makes a difference, even if it's hard",
        scores: { values_impact: 3, mindset_growth: 1 },
      },
    ],
  },
  {
    id: 29,
    dimension: "grit_mindset_values",
    text: "The most important thing my future career must give me is... (pick what resonates most)",
    skipConfidence: true,
    answers: [
      {
        label: "A",
        text: "Security and stability",
        scores: { values_security: 3 },
      },
      {
        label: "B",
        text: "High income and financial freedom",
        scores: { values_income: 3 },
      },
      {
        label: "C",
        text: "Recognition and respect",
        scores: { values_recognition: 3 },
      },
      {
        label: "D",
        text: "Making a positive impact on society",
        scores: { values_impact: 3 },
      },
    ],
  },
  {
    id: 30,
    dimension: "grit_mindset_values",
    text: "I would feel most proud if my work...",
    answers: [
      {
        label: "A",
        text: "Solves a hard technical or scientific problem",
        scores: { values_challenge: 3 },
      },
      {
        label: "B",
        text: "Changes someone's life for the better",
        scores: { values_impact: 3, values_connection: 1 },
      },
      {
        label: "C",
        text: "Creates something beautiful or original",
        scores: { values_creativity: 3 },
      },
      {
        label: "D",
        text: "Builds something lasting — a company, system, or institution",
        scores: { values_independence: 2, values_challenge: 1 },
      },
    ],
  },
  {
    id: 31,
    dimension: "grit_mindset_values",
    text: "When I imagine my ideal workday 10 years from now, I am...",
    answers: [
      {
        label: "A",
        text: "Working alone, deeply focused on a complex problem",
        scores: { values_independence: 2, values_challenge: 2 },
      },
      {
        label: "B",
        text: "Leading a team toward a shared goal",
        scores: { values_recognition: 1, values_impact: 1 },
      },
      {
        label: "C",
        text: "Meeting people, helping and advising them",
        scores: { values_connection: 3, values_impact: 1 },
      },
      {
        label: "D",
        text: "Creating, designing, or building something new",
        scores: { values_creativity: 3 },
      },
    ],
  },
  {
    id: 32,
    dimension: "grit_mindset_values",
    text: "If my family expected a different career than what I want, I would...",
    answers: [
      {
        label: "A",
        text: "Follow what they expect — family harmony matters most",
        scores: { values_security: 2, values_connection: 1 },
      },
      {
        label: "B",
        text: "Pursue my own path even if it causes conflict",
        scores: { values_independence: 3 },
      },
      {
        label: "C",
        text: "Find a compromise that partially satisfies both",
        scores: { values_connection: 2 },
      },
      {
        label: "D",
        text: "Take time to persuade them with evidence",
        scores: { mindset_growth: 1, values_independence: 2 },
      },
    ],
  },
];

// ─── Scoring Helpers ──────────────────────────────────────────────────────────

const EMPTY_SCORES: Scores = {
  aptitude: 0,
  interest_tech: 0,
  interest_data: 0,
  interest_creative: 0,
  interest_analytical: 0,
  interest_management: 0,
  personality_extrovert: 0,
  personality_introvert: 0,
  personality_ambi: 0,
  personality_leadership: 0,
  personality_detail: 0,
  personality_creative: 0,
  personality_social: 0,
  personality_analytical: 0,
  personality_curious: 0,
  personality_resilient: 0,
  personality_reflective: 0,
  personality_kinesthetic: 0,
  grit_perseverance: 0,
  grit_passion: 0,
  mindset_growth: 0,
  mindset_fixed: 0,
  values_security: 0,
  values_income: 0,
  values_impact: 0,
  values_creativity: 0,
  values_independence: 0,
  values_challenge: 0,
  values_connection: 0,
  values_recognition: 0,
};

const CONFIDENCE_WEIGHTS: Record<ConfidenceLevel, number> = {
  sure: 1.0,
  not_sure: 0.75,
  guesswork: 0.5,
};

function computeScores(
  selectedAnswers: Record<number, number>,
  confidenceMap: Record<number, ConfidenceLevel>,
): Scores {
  const scores = { ...EMPTY_SCORES };
  for (const [qIdx, aIdx] of Object.entries(selectedAnswers)) {
    const question = QUESTIONS[Number(qIdx)];
    if (!question) continue;
    const answer = question.answers[aIdx];
    if (!answer) continue;
    const confidence = question.skipConfidence
      ? "sure"
      : (confidenceMap[Number(qIdx)] ?? "sure");
    const weight = CONFIDENCE_WEIGHTS[confidence];
    for (const [key, val] of Object.entries(answer.scores)) {
      (scores as Record<string, number>)[key] =
        ((scores as Record<string, number>)[key] || 0) +
        (val as number) * weight;
    }
  }
  return scores;
}

function computeGmvProfile(scores: Scores): GmvProfile {
  // Grit Level
  const gritTotal = scores.grit_perseverance + scores.grit_passion;
  let gritLevel: GritLevel;
  if (gritTotal >= 9) gritLevel = "High";
  else if (gritTotal >= 5) gritLevel = "Medium";
  else gritLevel = "Low";

  // Mindset Type
  let mindsetType: MindsetType;
  if (scores.mindset_growth > scores.mindset_fixed + 2) mindsetType = "Growth";
  else if (scores.mindset_fixed > scores.mindset_growth + 2)
    mindsetType = "Fixed";
  else mindsetType = "Mixed";

  // Top Values
  const valueMap: [string, number][] = [
    ["Security", scores.values_security],
    ["Income", scores.values_income],
    ["Impact", scores.values_impact],
    ["Creativity", scores.values_creativity],
    ["Independence", scores.values_independence],
    ["Challenge", scores.values_challenge],
    ["Connection", scores.values_connection],
    ["Recognition", scores.values_recognition],
  ];
  const sortedValues = [...valueMap].sort((a, b) => b[1] - a[1]);
  const topValues = sortedValues.slice(0, 2).map(([name]) => name);

  // GMV Cluster
  const topValue1 = topValues[0]?.toLowerCase() ?? "";
  const topValue2 = topValues[1]?.toLowerCase() ?? "";
  const hasValue = (v: string) => topValue1 === v || topValue2 === v;

  let gmvCluster: string;
  if (gritLevel === "High" && mindsetType === "Growth") {
    if (hasValue("impact") || hasValue("challenge")) {
      gmvCluster = "Medicine, Research, Law & Academia";
    } else if (hasValue("income") || hasValue("recognition")) {
      gmvCluster = "Finance, Consulting & Tech Leadership";
    } else if (hasValue("creativity") || hasValue("independence")) {
      gmvCluster = "Entrepreneurship, Design & Media";
    } else {
      gmvCluster = "Management & Business";
    }
  } else if (gritLevel === "Medium" && mindsetType === "Growth") {
    if (hasValue("connection") || hasValue("impact")) {
      gmvCluster = "Teaching, Social Work & HR";
    } else {
      gmvCluster = "Management & Business";
    }
  } else if (
    (gritLevel === "Medium" || gritLevel === "Low") &&
    (mindsetType === "Mixed" || mindsetType === "Fixed") &&
    hasValue("security")
  ) {
    gmvCluster = "Government, Banking & PSU Engineering";
  } else if (gritLevel === "Low") {
    gmvCluster = "Vocational, Skilled Trades & Applied Sciences";
  } else {
    gmvCluster = "Management & Business";
  }

  return { gritLevel, mindsetType, topValues, gmvCluster };
}

function computeCareerScores(scores: Scores): CareerScore[] {
  const rawScores: Record<string, number> = {
    "software-engineering": scores.aptitude * 0.4 + scores.interest_tech * 0.6,
    "data-science": scores.aptitude * 0.4 + scores.interest_data * 0.6,
    cybersecurity:
      scores.aptitude * 0.4 +
      scores.interest_tech * 0.3 +
      scores.interest_analytical * 0.3,
    "ai-ml-engineering":
      scores.aptitude * 0.4 +
      scores.interest_tech * 0.3 +
      scores.interest_data * 0.3,
    "product-management":
      scores.aptitude * 0.2 +
      scores.interest_management * 0.6 +
      scores.interest_analytical * 0.2,
    "digital-marketing":
      scores.interest_creative * 0.7 + scores.interest_management * 0.3,
  };

  const maxScore = Math.max(...Object.values(rawScores), 1);

  const careerMeta: Record<
    string,
    {
      name: string;
      entrySalary: string;
      topSkills: string[];
      icon: React.ReactNode;
    }
  > = {
    "software-engineering": {
      name: "Software Engineering",
      entrySalary: "₹4–10L",
      topSkills: ["Data Structures", "Python / Java"],
      icon: <Code2 className="w-5 h-5" />,
    },
    "data-science": {
      name: "Data Science",
      entrySalary: "₹5–12L",
      topSkills: ["Python / SQL", "Statistics"],
      icon: <TrendingUp className="w-5 h-5" />,
    },
    cybersecurity: {
      name: "Cybersecurity",
      entrySalary: "₹4–9L",
      topSkills: ["Networking", "Linux"],
      icon: <Shield className="w-5 h-5" />,
    },
    "ai-ml-engineering": {
      name: "AI / ML Engineering",
      entrySalary: "₹6–15L",
      topSkills: ["Deep Learning", "Python / PyTorch"],
      icon: <Brain className="w-5 h-5" />,
    },
    "product-management": {
      name: "Product Management",
      entrySalary: "₹8–18L",
      topSkills: ["Communication", "Analytics"],
      icon: <Target className="w-5 h-5" />,
    },
    "digital-marketing": {
      name: "Digital Marketing",
      entrySalary: "₹3–7L",
      topSkills: ["Google Ads", "Content Creation"],
      icon: <Megaphone className="w-5 h-5" />,
    },
  };

  return Object.entries(rawScores)
    .map(([id, score]) => ({
      id,
      ...careerMeta[id],
      score: Math.round((score / maxScore) * 100),
    }))
    .sort((a, b) => b.score - a.score);
}

function computeClusters(scores: Scores): ClusterResult[] {
  const clusters: ClusterResult[] = [
    {
      name: "Technology & Engineering",
      icon: <Code2 className="w-6 h-6" />,
      description:
        "Building the digital systems, software, and infrastructure that power modern India.",
      color: "oklch(0.45 0.13 255)",
      score:
        scores.interest_tech * 2 +
        scores.interest_analytical +
        (scores.aptitude >= 8 ? 5 : 0),
    },
    {
      name: "Data & Intelligence",
      icon: <Brain className="w-6 h-6" />,
      description:
        "Finding insights in data and building intelligent systems that learn and adapt.",
      color: "oklch(0.45 0.13 195)",
      score:
        scores.interest_data * 2 +
        scores.interest_analytical +
        (scores.aptitude >= 8 ? 5 : 0),
    },
    {
      name: "Product & Strategy",
      icon: <Target className="w-6 h-6" />,
      description:
        "Shaping products and businesses — deciding what to build, why, and for whom.",
      color: "oklch(0.50 0.12 55)",
      score: scores.interest_management * 2 + scores.interest_analytical,
    },
    {
      name: "Creative & Digital",
      icon: <Megaphone className="w-6 h-6" />,
      description:
        "Crafting stories, content, and campaigns that connect brands with millions of people.",
      color: "oklch(0.55 0.16 30)",
      score: scores.interest_creative * 2 + scores.interest_management,
    },
    {
      name: "Security & Defence",
      icon: <Shield className="w-6 h-6" />,
      description:
        "Protecting digital infrastructure and keeping systems safe from threats.",
      color: "oklch(0.45 0.10 145)",
      score:
        scores.interest_analytical * 2 +
        scores.interest_tech +
        (scores.aptitude >= 8 ? 3 : 0),
    },
  ];

  return clusters.sort((a, b) => b.score - a.score);
}

function getPersonalitySummary(scores: Scores): string {
  const parts: string[] = [];
  if (scores.personality_extrovert > scores.personality_introvert) {
    parts.push("collaborative and outward-facing");
  } else if (scores.personality_introvert > scores.personality_extrovert) {
    parts.push("focused and independent");
  } else {
    parts.push("adaptable — comfortable solo or in teams");
  }
  if (scores.personality_detail > scores.personality_creative) {
    parts.push("detail-oriented");
  } else if (scores.personality_creative > scores.personality_detail) {
    parts.push("ideas-driven");
  }
  if (scores.personality_leadership > 2) {
    parts.push("a natural leader");
  }
  if (scores.personality_curious > 0) {
    parts.push("intellectually curious");
  }
  return `You are ${parts.join(", ")}.`;
}

function getAptitudeLabel(score: number): string {
  if (score >= 12) return "High";
  if (score >= 8) return "Moderate";
  return "Building";
}

function getPrimaryInterest(scores: Scores): string {
  const interests: [string, number][] = [
    ["Technology", scores.interest_tech],
    ["Data & Analytics", scores.interest_data],
    ["Creative & Communication", scores.interest_creative],
    ["Analysis & Problem Solving", scores.interest_analytical],
    ["Leadership & Management", scores.interest_management],
  ];
  interests.sort((a, b) => b[1] - a[1]);
  return interests[0][0];
}

// ─── Gap Logic ────────────────────────────────────────────────────────────────

interface GapItem {
  title: string;
  action: string;
  resource: string;
}

function getGaps(careerId: string, scores: Scores, grade: Grade): GapItem[] {
  const gaps: GapItem[] = [];

  const gradeContext: Record<Grade, string> = {
    "9": "As a Grade 9 student, start small — one habit at a time.",
    "10": "As a Grade 10 student, stream selection is near — let this guide you.",
    "11": "As a Grade 11 student, build one core skill this year.",
    "12": "As a Grade 12 student, build a portfolio now alongside exam prep.",
  };

  const ctx = gradeContext[grade];

  if (careerId === "software-engineering") {
    if (scores.aptitude < 10)
      gaps.push({
        title: "Strengthen Logical Reasoning",
        action: `${ctx} Practice 15 minutes daily on Khan Academy Maths — focus on Algebra and Logic.`,
        resource: "Khan Academy — free logic & maths exercises",
      });
    if (scores.interest_tech < 6)
      gaps.push({
        title: "Build Genuine Coding Interest",
        action:
          "Take CS50 (free Harvard online course) to see if coding genuinely excites you.",
        resource: "cs50.harvard.edu — free, world-class intro to CS",
      });
    gaps.push({
      title: "Build Your First Project",
      action:
        "A simple project on Replit or GitHub shows more than any certificate. Start with a calculator, quiz app, or personal webpage.",
      resource: "replit.com — code in your browser, no setup needed",
    });
  } else if (careerId === "data-science") {
    if (scores.aptitude < 10)
      gaps.push({
        title: "Strengthen Statistics Foundation",
        action: `${ctx} Focus on Probability chapters in your school Maths textbook first.`,
        resource: "Khan Academy Statistics — free probability course",
      });
    if (scores.interest_data < 6)
      gaps.push({
        title: "Explore Data Through Python",
        action:
          "Try Kaggle's free Python course to discover if data exploration excites you.",
        resource: "kaggle.com/learn — free Python for data science",
      });
    gaps.push({
      title: "Start With Excel, Then Python",
      action:
        "Learn Excel (or Google Sheets) first — it builds the same thinking pattern as Python Pandas but with no setup needed.",
      resource: "Google Sheets + Kaggle Pandas course",
    });
  } else if (careerId === "cybersecurity") {
    if (scores.aptitude < 8)
      gaps.push({
        title: "Build Systems Thinking",
        action:
          "TryHackMe's free beginner path teaches how computers and networks work in an interactive, gamified format.",
        resource: "tryhackme.com — free 'Pre-Security' learning path",
      });
    gaps.push({
      title: "Start Your Ethical Hacking Journey",
      action:
        "Create a free TryHackMe account today and complete the 'Pre-Security' path. It takes about 40 hours and is the best foundation available.",
      resource: "tryhackme.com/path/outline/presecurity",
    });
  } else if (careerId === "ai-ml-engineering") {
    if (scores.aptitude < 12)
      gaps.push({
        title: "Master the Maths Foundation",
        action: `${ctx} AI requires strong Maths — focus on Matrices and Calculus when you reach Grade 11-12. These are used directly in every AI algorithm.`,
        resource: "Khan Academy Linear Algebra + 3Blue1Brown on YouTube",
      });
    if (scores.interest_tech < 6 && scores.interest_data < 6)
      gaps.push({
        title: "Explore Both Coding and Data",
        action:
          "AI needs both skills equally. Try Python basics on Kaggle AND build something small on Replit to see which side excites you more.",
        resource: "Kaggle + Replit for free hands-on practice",
      });
    gaps.push({
      title: "Build Your First AI Model (No Code)",
      action:
        "Go to Google's Teachable Machine and train an image classifier in 10 minutes — no coding required. This makes AI real and tangible.",
      resource: "teachablemachine.withgoogle.com — free AI experiments",
    });
  } else if (careerId === "product-management") {
    if (scores.interest_management < 6)
      gaps.push({
        title: "Build Leadership Instinct",
        action:
          "Join student council, Model UN, or organize a school event. PM is about leading without authority — practice this now.",
        resource: "Model UN clubs, school cultural/technical fest organizing",
      });
    gaps.push({
      title: "Develop Product Thinking",
      action:
        "Download your 3 favourite apps and critically write what you would improve and why. Practice this weekly — it is exactly what PMs do in interviews.",
      resource: "Any notes app + frameworks like RICE and Jobs-to-be-Done",
    });
  } else if (careerId === "digital-marketing") {
    if (scores.interest_creative < 6)
      gaps.push({
        title: "Build Creative Output",
        action:
          "Start any form of content: a blog, YouTube channel, or Instagram page on any topic you love. Grow it to 100 followers — this is your first marketing case study.",
        resource: "Canva (free) for design, Google Sites for a free blog",
      });
    gaps.push({
      title: "Get Certified for Free",
      action:
        "The Google Digital Marketing & E-commerce Certificate on Coursera is free to audit and globally recognized. Complete it before college.",
      resource:
        "coursera.org — Google Digital Marketing Certificate (free audit)",
    });
  }

  return gaps;
}

// ─── Career Grit Requirements ─────────────────────────────────────────────────

const CAREER_GRIT_REQUIREMENTS: Record<
  string,
  { gritNeeded: GritLevel; yearsToMastery: string }
> = {
  "software-engineering": { gritNeeded: "Medium", yearsToMastery: "3–4 years" },
  "data-science": { gritNeeded: "Medium", yearsToMastery: "3–5 years" },
  cybersecurity: { gritNeeded: "Medium", yearsToMastery: "3–4 years" },
  "ai-ml-engineering": { gritNeeded: "High", yearsToMastery: "5–7 years" },
  "product-management": { gritNeeded: "Medium", yearsToMastery: "4–6 years" },
  "digital-marketing": { gritNeeded: "Low", yearsToMastery: "1–2 years" },
};

const CAREER_REQUIREMENTS: Record<
  string,
  {
    aptitudeNeeded: string;
    interests: string[];
    personality: string[];
    aptitudeMinScore: number;
  }
> = {
  "software-engineering": {
    aptitudeNeeded: "Moderate to High (score ≥ 10)",
    interests: ["Technology", "Problem Solving"],
    personality: ["Detail-oriented", "Logical", "Patient with debugging"],
    aptitudeMinScore: 10,
  },
  "data-science": {
    aptitudeNeeded: "Moderate to High (score ≥ 10)",
    interests: ["Data & Analytics", "Statistics"],
    personality: ["Curious", "Analytical", "Storytelling mindset"],
    aptitudeMinScore: 10,
  },
  cybersecurity: {
    aptitudeNeeded: "Moderate (score ≥ 8)",
    interests: ["Technology", "Analysis"],
    personality: ["Calm under pressure", "Investigative", "Ethical integrity"],
    aptitudeMinScore: 8,
  },
  "ai-ml-engineering": {
    aptitudeNeeded: "High (score ≥ 12)",
    interests: ["Technology", "Data & Analytics"],
    personality: ["Research-minded", "Experimental", "Intellectually curious"],
    aptitudeMinScore: 12,
  },
  "product-management": {
    aptitudeNeeded: "Moderate (score ≥ 6)",
    interests: ["Leadership & Management", "Analysis"],
    personality: ["Empathetic", "Strategic thinker", "Communicator"],
    aptitudeMinScore: 6,
  },
  "digital-marketing": {
    aptitudeNeeded: "Flexible (any aptitude level)",
    interests: ["Creative & Communication", "Management"],
    personality: ["Creative", "Adaptable", "Data-aware"],
    aptitudeMinScore: 0,
  },
};

const CAREER_NAMES: Record<string, string> = {
  "software-engineering": "Software Engineering",
  "data-science": "Data Science",
  cybersecurity: "Cybersecurity",
  "ai-ml-engineering": "AI / ML Engineering",
  "product-management": "Product Management",
  "digital-marketing": "Digital Marketing",
};

const GRADE_ADVICE: Record<Grade, string> = {
  "9": "You have 3 years before college. Focus on discovering, not deciding. Try as many activities as possible — every club, every project, every subject you explore narrows your uncertainty.",
  "10": "Stream selection is coming. Use this assessment to guide your PCM/PCB/Commerce choice, not to finalize a career. Interests at 15 are pointers, not conclusions.",
  "11": "Build one strong skill this year — coding, analytics, writing, or public speaking. Quality over quantity. One deep skill is worth ten shallow certificates.",
  "12": "Start a portfolio now — GitHub, blog, or Instagram depending on your field. Entrance exams are your main focus, but even 30 minutes a week on your portfolio compounds significantly.",
};

// ─── Dimension labels ──────────────────────────────────────────────────────────

const DIMENSION_LABELS: Record<Question["dimension"], string> = {
  aptitude: "Aptitude",
  interests: "Interests",
  personality: "Personality",
  grit_mindset_values: "Grit · Mindset · Values",
};

const DIMENSION_COLORS: Record<Question["dimension"], string> = {
  aptitude: "oklch(0.45 0.13 255)",
  interests: "oklch(0.45 0.13 195)",
  personality: "oklch(0.50 0.12 55)",
  grit_mindset_values: "oklch(0.50 0.16 45)",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function AssessmentPage({ onNavigate }: AssessmentPageProps) {
  type Screen = "intro" | "quiz" | "results" | "gap";

  const [screen, setScreen] = useState<Screen>("intro");
  const [grade, setGrade] = useState<Grade | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [pendingAnswer, setPendingAnswer] = useState<number | null>(null);
  const [awaitingConfidence, setAwaitingConfidence] = useState(false);
  const [confidenceMap, setConfidenceMap] = useState<
    Record<number, ConfidenceLevel>
  >({});
  const [scores, setScores] = useState<Scores | null>(null);
  const [dreamCareer, setDreamCareer] = useState<string>("");
  const [_showGap, setShowGap] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Before-unload warning on results/gap screens
  useEffect(() => {
    if (screen !== "results" && screen !== "gap") return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [screen]);

  const advanceQuestion = (
    newAnswers: Record<number, number>,
    newConfidenceMap: Record<number, ConfidenceLevel>,
    qIndex: number,
  ) => {
    if (qIndex < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      const computed = computeScores(newAnswers, newConfidenceMap);
      setScores(computed);
      setScreen("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setPendingAnswer(null);
    setAwaitingConfidence(false);
  };

  const handleSelectAnswer = (answerIdx: number) => {
    if (pendingAnswer !== null) return;
    const question = QUESTIONS[currentQ];
    setPendingAnswer(answerIdx);

    if (question?.skipConfidence) {
      // Auto-mark as "sure" and advance after brief highlight
      setTimeout(() => {
        const newAnswers = { ...answers, [currentQ]: answerIdx };
        const newConfMap = {
          ...confidenceMap,
          [currentQ]: "sure" as ConfidenceLevel,
        };
        setAnswers(newAnswers);
        setConfidenceMap(newConfMap);
        advanceQuestion(newAnswers, newConfMap, currentQ);
      }, 350);
    } else {
      // Show confidence selector
      setTimeout(() => {
        setAwaitingConfidence(true);
      }, 200);
    }
  };

  const handleSelectConfidence = (level: ConfidenceLevel) => {
    if (pendingAnswer === null) return;
    const newAnswers = { ...answers, [currentQ]: pendingAnswer };
    const newConfMap = { ...confidenceMap, [currentQ]: level };
    setAnswers(newAnswers);
    setConfidenceMap(newConfMap);
    advanceQuestion(newAnswers, newConfMap, currentQ);
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ((q) => q - 1);
      setPendingAnswer(null);
      setAwaitingConfidence(false);
    }
  };

  const handleStartAssessment = () => {
    if (!grade) return;
    setScreen("quiz");
    setCurrentQ(0);
    setAnswers({});
    setConfidenceMap({});
    setPendingAnswer(null);
    setAwaitingConfidence(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrint = () => window.print();

  const handleAnalyseGap = () => {
    if (!dreamCareer) return;
    setShowGap(true);
    setScreen("gap");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Derived data ────────────────────────────────────────────────────────────
  const careerScores = scores ? computeCareerScores(scores) : [];
  const clusters = scores ? computeClusters(scores) : [];
  const topClusters = clusters.slice(0, 3);
  const topCareers = careerScores.slice(0, 5);
  const aptitudeLabel = scores ? getAptitudeLabel(scores.aptitude) : "";
  const primaryInterest = scores ? getPrimaryInterest(scores) : "";
  const personalitySummary = scores ? getPersonalitySummary(scores) : "";
  const gaps =
    scores && dreamCareer && grade ? getGaps(dreamCareer, scores, grade) : [];
  const requirements = dreamCareer ? CAREER_REQUIREMENTS[dreamCareer] : null;
  const gmvProfile = scores ? computeGmvProfile(scores) : null;

  // Confidence summary
  const totalAnswered = Object.keys(answers).length;
  const highConfCount = Object.values(confidenceMap).filter(
    (c) => c === "sure",
  ).length;

  // ── Render helpers ──────────────────────────────────────────────────────────

  const heroStyle = {
    background:
      "linear-gradient(135deg, oklch(0.18 0.08 255) 0%, oklch(0.25 0.10 240) 100%)",
  };

  // ── Screen: Intro ────────────────────────────────────────────────────────────
  if (screen === "intro") {
    return (
      <main>
        {/* Hero */}
        <section style={heroStyle} className="border-b border-white/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <Badge
                className="mb-5 border border-white/20 text-white/90 hover:bg-white/10"
                style={{ background: "oklch(1 0 0 / 0.10)" }}
              >
                Career Readiness Assessment
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Find Your Career Fit
              </h1>
              <p className="text-xl text-white/70 mb-3">
                32 questions · 15–20 minutes · No data stored
              </p>
              <p className="text-sm text-white/50 max-w-xl mx-auto">
                This is not an IQ test. It is a Career Readiness Check —
                designed to help you discover where your strengths, interests,
                and inner drive naturally lead.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Grade selector + start */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">
                First, tell us your grade
              </h2>
              <p className="text-muted-foreground mb-8">
                We tailor the advice and career guidance to your current year in
                school.
              </p>

              <div className="flex gap-3 justify-center mb-10 flex-wrap">
                {(["9", "10", "11", "12"] as Grade[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    data-ocid={`assessment.grade_${g}.button`}
                    onClick={() => setGrade(g)}
                    className={`w-20 h-20 rounded-xl border-2 text-xl font-bold transition-all duration-200 ${
                      grade === g
                        ? "border-[oklch(0.30_0.12_255)] bg-[oklch(0.30_0.12_255)] text-white shadow-md scale-105"
                        : "border-border bg-card text-foreground hover:border-[oklch(0.30_0.12_255)] hover:scale-102"
                    }`}
                  >
                    {g}
                    <span className="block text-xs font-normal mt-1">
                      Grade
                    </span>
                  </button>
                ))}
              </div>

              {/* What the test covers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                  {
                    icon: <BookOpen className="w-6 h-6" />,
                    label: "7 Aptitude Questions",
                    desc: "Logical, numerical, verbal reasoning",
                    color: DIMENSION_COLORS.aptitude,
                  },
                  {
                    icon: <Rocket className="w-6 h-6" />,
                    label: "7 Interest Questions",
                    desc: "What activities and fields excite you",
                    color: DIMENSION_COLORS.interests,
                  },
                  {
                    icon: <Lightbulb className="w-6 h-6" />,
                    label: "6 Personality Questions",
                    desc: "How you work, learn, and interact",
                    color: DIMENSION_COLORS.personality,
                  },
                  {
                    icon: <Flame className="w-6 h-6" />,
                    label: "12 Grit · Mindset · Values",
                    desc: "What drives you and how you persevere",
                    color: DIMENSION_COLORS.grit_mindset_values,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-card rounded-xl border border-border p-4 text-left"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-white"
                      style={{ background: item.color }}
                    >
                      {item.icon}
                    </div>
                    <p className="font-semibold text-foreground text-sm">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                data-ocid="assessment.start_button"
                size="lg"
                disabled={!grade}
                onClick={handleStartAssessment}
                className="px-10 font-semibold text-base"
                style={{
                  background: grade ? "oklch(0.30 0.12 255)" : undefined,
                  color: grade ? "white" : undefined,
                }}
              >
                Start Assessment <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              {!grade && (
                <p className="text-sm text-muted-foreground mt-3">
                  Select your grade above to continue
                </p>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  // ── Screen: Quiz ─────────────────────────────────────────────────────────────
  if (screen === "quiz") {
    const question = QUESTIONS[currentQ];
    const progress = Math.round((currentQ / QUESTIONS.length) * 100);
    const isModule8 = question?.dimension === "grit_mindset_values";
    const dimensionColor = question
      ? DIMENSION_COLORS[question.dimension]
      : "oklch(0.45 0.13 255)";
    const dimensionLabel = isModule8
      ? "Module 8 — Grit, Mindset & Values"
      : question
        ? DIMENSION_LABELS[question.dimension]
        : "";

    return (
      <main className="min-h-screen">
        {/* Dark top bar with progress */}
        <div style={heroStyle} className="px-4 sm:px-6 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/70 text-sm">
                Question {currentQ + 1} of {QUESTIONS.length}
              </span>
              <Badge
                className="text-white/90 border-white/20"
                style={{ background: dimensionColor }}
              >
                {dimensionLabel}
              </Badge>
            </div>
            <Progress
              value={progress}
              data-ocid="assessment.quiz.loading_state"
              className="h-2 bg-white/20"
            />
          </div>
        </div>

        {/* Question area */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                  style={{ background: dimensionColor }}
                >
                  {currentQ + 1}
                </span>
                <h2 className="text-xl font-bold text-foreground leading-snug">
                  {question?.text}
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {question?.answers.map((answer, idx) => {
                  const isSelected = pendingAnswer === idx;
                  const isPending =
                    pendingAnswer === idx && !awaitingConfidence;
                  const isAnswered =
                    pendingAnswer === idx && awaitingConfidence;
                  return (
                    <button
                      key={answer.label}
                      type="button"
                      data-ocid={`assessment.answer_${answer.label.toLowerCase()}.button`}
                      onClick={() =>
                        !awaitingConfidence && handleSelectAnswer(idx)
                      }
                      disabled={pendingAnswer !== null && !awaitingConfidence}
                      className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-200 flex items-center gap-4 ${
                        isAnswered
                          ? "border-[oklch(0.55_0.12_195)] bg-[oklch(0.55_0.12_195)/0.1]"
                          : isPending
                            ? "border-[oklch(0.30_0.12_255)] bg-[oklch(0.30_0.12_255)] text-white scale-[1.01]"
                            : isSelected
                              ? "border-[oklch(0.55_0.12_195)] bg-[oklch(0.55_0.12_195)/0.08]"
                              : "border-border bg-card hover:border-[oklch(0.30_0.12_255)] hover:bg-[oklch(0.97_0.01_255)]"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                          isPending && !awaitingConfidence
                            ? "bg-white/20 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {answer.label}
                      </span>
                      <span className="text-sm font-medium">{answer.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Confidence Selector */}
              <AnimatePresence>
                {awaitingConfidence && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    className="mt-5 rounded-xl border border-border bg-muted/40 p-4"
                    data-ocid="assessment.confidence.panel"
                  >
                    <p className="text-sm text-muted-foreground mb-3 font-medium">
                      How confident are you in this answer?
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        {
                          level: "sure" as ConfidenceLevel,
                          label: "✓ Sure",
                          desc: "I know this",
                          color: "oklch(0.45 0.13 145)",
                        },
                        {
                          level: "not_sure" as ConfidenceLevel,
                          label: "~ Not Sure",
                          desc: "Best guess",
                          color: "oklch(0.55 0.14 70)",
                        },
                        {
                          level: "guesswork" as ConfidenceLevel,
                          label: "? Guesswork",
                          desc: "Random pick",
                          color: "oklch(0.50 0.08 20)",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.level}
                          type="button"
                          data-ocid={`assessment.confidence_${opt.level}.button`}
                          onClick={() => handleSelectConfidence(opt.level)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-150 hover:scale-105 active:scale-95 border-border bg-card hover:border-current"
                          style={{ color: opt.color }}
                        >
                          <span>{opt.label}</span>
                          <span className="text-xs opacity-60">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Nav */}
              <div className="flex items-center justify-between mt-8">
                <Button
                  data-ocid="assessment.prev.button"
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentQ === 0 || awaitingConfidence}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  {QUESTIONS.length - currentQ - 1} questions remaining
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    );
  }

  // ── Screen: Results ───────────────────────────────────────────────────────────
  if (screen === "results" && scores) {
    return (
      <main ref={printRef}>
        {/* Hero profile card */}
        <section
          style={heroStyle}
          className="border-b border-white/10 print:bg-white print:border-0"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Badge
                className="mb-4 border border-white/20 text-white/90"
                style={{ background: "oklch(1 0 0 / 0.10)" }}
              >
                Your Results — Grade {grade}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                Your Career Readiness Profile
              </h1>
              {/* Confidence summary */}
              <p className="text-white/60 text-sm mb-6">
                {highConfCount} of {totalAnswered} answered with full confidence
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {[
                  {
                    label: "Aptitude Level",
                    value: aptitudeLabel,
                    sub: `${scores.aptitude}/14 score`,
                  },
                  {
                    label: "Primary Interest",
                    value: primaryInterest,
                    sub: "strongest area",
                  },
                  {
                    label: "Your Personality",
                    value:
                      scores.personality_extrovert >
                      scores.personality_introvert
                        ? "Extrovert"
                        : scores.personality_introvert >
                            scores.personality_extrovert
                          ? "Introvert"
                          : "Ambivert",
                    sub: personalitySummary.split(".")[0],
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl p-4 text-center"
                    style={{ background: "oklch(1 0 0 / 0.10)" }}
                  >
                    <p className="text-white/60 text-xs mb-1">{item.label}</p>
                    <p className="text-white font-bold text-lg">{item.value}</p>
                    <p className="text-white/50 text-xs mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Top 3 Career Clusters */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Your Top 3 Career Clusters
            </h2>
            <p className="text-muted-foreground mb-6">
              These are the career fields your aptitude, interests, and
              personality point towards most strongly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {topClusters.map((cluster, i) => (
                <motion.div
                  key={cluster.name}
                  data-ocid={`assessment.cluster.item.${i + 1}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="bg-card rounded-xl border border-border p-5 relative overflow-hidden"
                  style={{ borderLeft: `4px solid ${cluster.color}` }}
                >
                  {i === 0 && (
                    <span
                      className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: cluster.color }}
                    >
                      Best Match
                    </span>
                  )}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-white"
                    style={{ background: cluster.color }}
                  >
                    {cluster.icon}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {cluster.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cluster.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── Module 8 GMV Summary Card ── */}
          {gmvProfile && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              data-ocid="assessment.gmv.panel"
            >
              <div
                className="rounded-2xl border border-border p-6"
                style={{
                  borderLeft: "4px solid oklch(0.50 0.16 45)",
                  background: "oklch(0.98 0.012 45)",
                }}
              >
                <div className="flex items-start gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                    style={{ background: "oklch(0.50 0.16 45)" }}
                  >
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      Your Grit, Mindset &amp; Values Profile
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Module 8 — Inner Drive Assessment
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  {/* Grit Level */}
                  <div className="bg-white rounded-xl border border-border p-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      Grit Level
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold text-white"
                      style={{
                        background:
                          gmvProfile.gritLevel === "High"
                            ? "oklch(0.45 0.13 145)"
                            : gmvProfile.gritLevel === "Medium"
                              ? "oklch(0.65 0.14 70)"
                              : "oklch(0.60 0.04 240)",
                      }}
                    >
                      <Flame className="w-3.5 h-3.5" />
                      {gmvProfile.gritLevel}
                    </span>
                    <p className="text-xs text-muted-foreground mt-2">
                      {gmvProfile.gritLevel === "High"
                        ? "You sustain effort over years"
                        : gmvProfile.gritLevel === "Medium"
                          ? "Growing resilience"
                          : "Building stamina"}
                    </p>
                  </div>

                  {/* Mindset Type */}
                  <div className="bg-white rounded-xl border border-border p-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      Mindset Type
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold text-white"
                      style={{
                        background:
                          gmvProfile.mindsetType === "Growth"
                            ? "oklch(0.45 0.13 145)"
                            : gmvProfile.mindsetType === "Fixed"
                              ? "oklch(0.55 0.16 30)"
                              : "oklch(0.45 0.13 255)",
                      }}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      {gmvProfile.mindsetType}
                    </span>
                    <p className="text-xs text-muted-foreground mt-2">
                      {gmvProfile.mindsetType === "Growth"
                        ? "You embrace challenge & effort"
                        : gmvProfile.mindsetType === "Fixed"
                          ? "Prefer proven strengths"
                          : "Adapts by situation"}
                    </p>
                  </div>

                  {/* Top Values */}
                  <div className="bg-white rounded-xl border border-border p-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      Top Values
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {gmvProfile.topValues.map((v) => (
                        <span
                          key={v}
                          className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
                          style={{ background: "oklch(0.50 0.16 45)" }}
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      What you seek most from work
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      GMV Best-Fit Cluster
                    </p>
                    <p className="font-bold text-foreground">
                      {gmvProfile.gmvCluster}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      Confidence Summary
                    </p>
                    <p className="font-semibold text-foreground text-sm">
                      {highConfCount} of {totalAnswered} answered with full
                      confidence
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* ── Bridge Panel ── */}
          {gmvProfile && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              data-ocid="assessment.bridge.panel"
            >
              <BridgePanel
                topCluster={topClusters[0]}
                topCareer={careerScores[0]}
                gmvProfile={gmvProfile}
              />
            </motion.section>
          )}

          {/* Top 5 Matching Careers */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Your Top 5 Matching Careers
            </h2>
            <p className="text-muted-foreground mb-6">
              Based on your combined aptitude, interests, and personality
              scores.
            </p>
            <div className="flex flex-col gap-4">
              {topCareers.map((career, i) => (
                <motion.div
                  key={career.id}
                  data-ocid={`assessment.career.item.${i + 1}`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="bg-card rounded-xl border border-border p-5"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                      style={{ background: "oklch(0.30 0.12 255)" }}
                    >
                      {career.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-bold text-foreground">
                          {career.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          Entry: {career.entrySalary}
                        </Badge>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "oklch(0.45 0.13 145)" }}
                        >
                          {career.score}% match
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5 mb-3">
                        <div
                          className="h-1.5 rounded-full transition-all duration-700"
                          style={{
                            width: `${career.score}%`,
                            background: "oklch(0.55 0.12 195)",
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {career.topSkills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      data-ocid={`assessment.career.item.${i + 1}.button`}
                      variant="outline"
                      size="sm"
                      className="flex-shrink-0 hidden sm:flex"
                      onClick={() =>
                        onNavigate({ view: "subtype", subtypeId: career.id })
                      }
                    >
                      Full Profile <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Dream Career Gap Analysis */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-card rounded-2xl border border-border p-6"
            data-ocid="assessment.gap.panel"
          >
            <h2 className="text-xl font-bold text-foreground mb-1">
              Want to check if you can pursue your dream career?
            </h2>
            <p className="text-muted-foreground mb-5 text-sm">
              Select any career and we'll show you exactly what gaps you need to
              close — with specific, actionable steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={dreamCareer} onValueChange={setDreamCareer}>
                <SelectTrigger
                  data-ocid="assessment.dream_career.select"
                  className="sm:w-72"
                >
                  <SelectValue placeholder="Choose your dream career..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CAREER_NAMES).map(([id, name]) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                data-ocid="assessment.analyse_gap.button"
                disabled={!dreamCareer}
                onClick={handleAnalyseGap}
                className="font-semibold"
                style={{
                  background: dreamCareer ? "oklch(0.30 0.12 255)" : undefined,
                  color: dreamCareer ? "white" : undefined,
                }}
              >
                Analyse My Gap <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.section>
        </div>

        {/* Save/print banner */}
        <SaveBanner onPrint={handlePrint} />
      </main>
    );
  }

  // ── Screen: Gap Analysis ──────────────────────────────────────────────────────
  if (screen === "gap" && scores && dreamCareer && requirements && grade) {
    return (
      <main ref={printRef}>
        {/* Hero */}
        <section style={heroStyle} className="border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <button
                type="button"
                data-ocid="assessment.back_to_results.button"
                onClick={() => {
                  setScreen("results");
                  setShowGap(false);
                }}
                className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to results
              </button>
              <h1 className="text-3xl font-bold text-white mb-1">
                Gap Analysis
              </h1>
              <p className="text-white/65">
                Your profile vs what {CAREER_NAMES[dreamCareer]} requires
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {/* Split: Your profile vs requirements */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Your Profile */}
            <div
              className="rounded-xl border border-border p-5"
              style={{ borderLeft: "4px solid oklch(0.55 0.12 195)" }}
            >
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ background: "oklch(0.55 0.12 195)" }}
                >
                  You
                </span>
                Your Profile
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-muted-foreground text-xs">
                    Aptitude Level
                  </dt>
                  <dd className="font-semibold text-foreground">
                    {aptitudeLabel} ({scores.aptitude}/14)
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">
                    Top Interest
                  </dt>
                  <dd className="font-semibold text-foreground">
                    {primaryInterest}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">Personality</dt>
                  <dd className="font-semibold text-foreground">
                    {personalitySummary}
                  </dd>
                </div>
              </dl>
            </div>

            {/* What the career requires */}
            <div
              className="rounded-xl border border-border p-5"
              style={{ borderLeft: "4px solid oklch(0.30 0.12 255)" }}
            >
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ background: "oklch(0.30 0.12 255)" }}
                >
                  ★
                </span>
                What {CAREER_NAMES[dreamCareer]} Requires
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-muted-foreground text-xs">
                    Aptitude Needed
                  </dt>
                  <dd className="font-semibold text-foreground">
                    {requirements.aptitudeNeeded}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">
                    Key Interests
                  </dt>
                  <dd className="font-semibold text-foreground">
                    {requirements.interests.join(" + ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">
                    Ideal Personality Traits
                  </dt>
                  <dd className="font-semibold text-foreground">
                    {requirements.personality.join(", ")}
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>

          {/* Gap Roadmap */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-1">
              Your Actionable Gap Roadmap
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              for {CAREER_NAMES[dreamCareer]} — tailored for Grade {grade}
            </p>

            {gaps.length === 0 ? (
              <div
                className="rounded-xl border border-border p-6 text-center"
                data-ocid="assessment.gap.empty_state"
              >
                <p className="text-muted-foreground">
                  Your profile is already well-aligned with this career! Focus
                  on building your portfolio and deepening your skills.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {gaps.map((gap, i) => (
                  <motion.div
                    key={gap.title}
                    data-ocid={`assessment.gap.item.${i + 1}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="bg-card rounded-xl border border-border p-5"
                    style={{
                      borderLeft: "4px solid oklch(0.577 0.245 27.325)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: "oklch(0.577 0.245 27.325)" }}
                      />
                      <div>
                        <h4 className="font-bold text-foreground mb-1">
                          {gap.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                          {gap.action}
                        </p>
                        <p
                          className="text-xs font-medium"
                          style={{ color: "oklch(0.45 0.13 195)" }}
                        >
                          📚 {gap.resource}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Grade-specific advice */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="rounded-xl p-5"
            style={{
              background: "oklch(0.94 0.025 220)",
              borderLeft: "4px solid oklch(0.45 0.10 220)",
            }}
            data-ocid="assessment.grade_advice.panel"
          >
            <h3
              className="font-bold mb-2"
              style={{ color: "oklch(0.30 0.10 220)" }}
            >
              Advice for Grade {grade} Students
            </h3>
            <p className="text-sm" style={{ color: "oklch(0.35 0.08 220)" }}>
              {GRADE_ADVICE[grade]}
            </p>
          </motion.div>
        </div>

        {/* Save/print banner */}
        <SaveBanner onPrint={handlePrint} />
      </main>
    );
  }

  return null;
}

// ─── Bridge Panel Component ───────────────────────────────────────────────────

interface BridgePanelProps {
  topCluster: ClusterResult | undefined;
  topCareer: CareerScore | undefined;
  gmvProfile: GmvProfile;
}

function BridgePanel({ topCluster, topCareer, gmvProfile }: BridgePanelProps) {
  const { gritLevel, mindsetType, topValues, gmvCluster } = gmvProfile;

  // Determine alignment
  const aptitudeClusterName = topCluster?.name ?? "";
  const isAligned =
    gmvCluster
      .toLowerCase()
      .split(" ")
      .some((word) => aptitudeClusterName.toLowerCase().includes(word)) ||
    aptitudeClusterName
      .toLowerCase()
      .split(" ")
      .some((word) => gmvCluster.toLowerCase().includes(word));

  const careerGritReq = topCareer
    ? CAREER_GRIT_REQUIREMENTS[topCareer.id]
    : null;
  const hasGritGap =
    careerGritReq &&
    ((careerGritReq.gritNeeded === "High" && gritLevel !== "High") ||
      (careerGritReq.gritNeeded === "Medium" && gritLevel === "Low"));
  const hasMindsetGap = mindsetType === "Fixed";

  // Values-to-roles bridging
  const valuesRolesMap: Record<string, string[]> = {
    Impact: [
      "EdTech Product Manager",
      "HealthTech Engineer",
      "Social Impact Data Analyst",
    ],
    Creativity: ["UX Designer", "Creative Technologist", "Growth Marketer"],
    Connection: [
      "UX Researcher",
      "Customer Success Lead",
      "Developer Advocate",
    ],
    Challenge: [
      "Security Researcher",
      "ML Engineer",
      "Backend Systems Architect",
    ],
    Income: ["Quant Analyst", "Tech Consultant", "SaaS Sales Engineer"],
    Independence: [
      "Freelance Developer",
      "Indie Hacker",
      "Technical Consultant",
    ],
    Security: [
      "Government Tech Officer",
      "PSU Systems Engineer",
      "IT Compliance Analyst",
    ],
    Recognition: [
      "Startup CTO",
      "Lead Engineer",
      "Public Speaker & Thought Leader",
    ],
  };

  const matchedRoles = topValues
    .flatMap((v) => valuesRolesMap[v] ?? [])
    .slice(0, 3);

  return (
    <div
      className="rounded-2xl border border-amber-200 p-6"
      style={{
        borderLeft: "4px solid oklch(0.72 0.17 65)",
        background: "oklch(0.99 0.008 65)",
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0"
          style={{ background: "oklch(0.72 0.17 65)" }}
        >
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Your Career Alignment Bridge
          </h2>
          <p className="text-sm text-muted-foreground">
            Based on your Grit, Mindset &amp; Values profile
          </p>
        </div>
      </div>

      {/* Two-column compare */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div
          className="rounded-xl border border-border p-4"
          style={{ background: "oklch(0.98 0.015 45)" }}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Your GMV Best Fit
          </p>
          <p className="font-bold text-foreground">{gmvCluster}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {topValues.map((v) => (
              <span
                key={v}
                className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                style={{ background: "oklch(0.65 0.14 65)" }}
              >
                {v}
              </span>
            ))}
          </div>
        </div>
        <div
          className="rounded-xl border border-border p-4"
          style={{ background: "oklch(0.97 0.01 255)" }}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Your Top Aptitude Match
          </p>
          <p className="font-bold text-foreground">{topCluster?.name ?? "—"}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {topCareer?.name} · {topCareer?.score}% match
          </p>
        </div>
      </div>

      {/* Alignment message or gap breakdown */}
      {isAligned ? (
        <div
          className="rounded-xl p-4 flex gap-3 items-start"
          style={{ background: "oklch(0.95 0.04 145)" }}
        >
          <Star
            className="w-5 h-5 flex-shrink-0 mt-0.5"
            style={{ color: "oklch(0.40 0.13 145)" }}
          />
          <div>
            <p
              className="font-bold text-sm"
              style={{ color: "oklch(0.30 0.12 145)" }}
            >
              Great News — You're Well Aligned!
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "oklch(0.35 0.08 145)" }}
            >
              Your aptitude, interests, and inner drive all point in the same
              direction. You're well-positioned for{" "}
              <strong>{topCluster?.name}</strong>.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Grit Gap */}
          {hasGritGap && careerGritReq && (
            <div
              className="rounded-xl border p-4"
              style={{
                borderColor: "oklch(0.65 0.14 70)",
                background: "oklch(0.97 0.015 70)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Flame
                  className="w-4 h-4"
                  style={{ color: "oklch(0.55 0.16 45)" }}
                />
                <h4
                  className="font-bold text-sm"
                  style={{ color: "oklch(0.35 0.12 45)" }}
                >
                  Grit Gap
                </h4>
              </div>
              <p className="text-sm" style={{ color: "oklch(0.40 0.08 55)" }}>
                {topCareer?.name} requires sustained effort over{" "}
                {careerGritReq.yearsToMastery}. Your answers suggest you're
                building stamina. Here's how to grow it: start one 30-day
                challenge in your chosen field, track it daily, and reflect on
                what made you want to stop — that friction is where grit is
                forged.
              </p>
            </div>
          )}

          {/* Mindset Gap */}
          {hasMindsetGap && (
            <div
              className="rounded-xl border p-4"
              style={{
                borderColor: "oklch(0.70 0.14 255)",
                background: "oklch(0.97 0.01 255)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap
                  className="w-4 h-4"
                  style={{ color: "oklch(0.45 0.13 255)" }}
                />
                <h4
                  className="font-bold text-sm"
                  style={{ color: "oklch(0.30 0.12 255)" }}
                >
                  Mindset Gap
                </h4>
              </div>
              <p className="text-sm" style={{ color: "oklch(0.35 0.08 255)" }}>
                {topCareer?.name} rewards treating failure as data. Two mindset
                shifts that matter: <strong>1)</strong> Replace "I'm not good at
                this" with "I haven't learned this yet." <strong>2)</strong>{" "}
                After every setback, ask "What would I do differently next
                time?" rather than "Why did this happen to me?"
              </p>
            </div>
          )}

          {/* Values Alignment — always shown */}
          <div
            className="rounded-xl border p-4"
            style={{
              borderColor: "oklch(0.72 0.17 65)",
              background: "oklch(0.97 0.012 65)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Minus
                className="w-4 h-4"
                style={{ color: "oklch(0.55 0.16 65)" }}
              />
              <h4
                className="font-bold text-sm"
                style={{ color: "oklch(0.35 0.14 65)" }}
              >
                Values Alignment
              </h4>
            </div>
            <p
              className="text-sm mb-3"
              style={{ color: "oklch(0.40 0.08 55)" }}
            >
              You value <strong>{topValues.join(" & ")}</strong>. Here are roles
              within <strong>{topCluster?.name ?? "your top cluster"}</strong>{" "}
              that match:
            </p>
            <div className="flex flex-wrap gap-2">
              {matchedRoles.map((role) => (
                <span
                  key={role}
                  className="text-xs px-3 py-1 rounded-full font-medium text-white"
                  style={{ background: "oklch(0.55 0.16 65)" }}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Save Banner ──────────────────────────────────────────────────────────────

function SaveBanner({ onPrint }: { onPrint: () => void }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 print:hidden"
      data-ocid="assessment.save_banner.panel"
    >
      <div
        style={{ background: "oklch(0.22 0.06 55)" }}
        className="border-t border-white/10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="text-white/80 text-sm">
              ⚠️ Your results are not saved. They will disappear when you close
              this tab.
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              data-ocid="assessment.print_results.button"
              size="sm"
              variant="outline"
              onClick={onPrint}
              className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent gap-2"
            >
              <Printer className="w-4 h-4" /> Print Results
            </Button>
            <Button
              data-ocid="assessment.save_pdf.button"
              size="sm"
              onClick={onPrint}
              className="gap-2"
              style={{ background: "oklch(0.55 0.12 195)", color: "white" }}
            >
              <Save className="w-4 h-4" /> Save as PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
