import { createContext, useContext, useEffect, useState } from "react";

export interface StudentProfile {
  grade: string; // "9"|"10"|"11"|"12"
  stream: string;
  selectedSubjects: string[];
}

export interface ModuleScores {
  logical: number;
  numerical: number;
  verbal: number;
  scientific: number;
  creative: number;
  leadership: number;
  riasecCounts: Record<string, number>;
  hollandCode: string;
  gritLevel: "Low" | "Medium" | "High";
  mindsetType: "Fixed" | "Growth" | "Mixed";
  gritScore: number;
}

export interface SliderValues {
  income: number; // 1-5
  passion: number;
  stability: number;
  time: number; // years willing to invest: 1=short, 5=PhD
  risk: number; // 1=low risk, 5=high risk
}

export interface ScoredCareer {
  id: string;
  name: string;
  sector: string;
  fitScore: number;
  fitBand: "strong" | "good" | "stretch";
  reasonPhrase: string;
  salaryEntry: number;
  salaryMid: number;
  salarySenior: number;
  yearsToFirstJob: number;
  hasFullProfile: boolean;
}

export interface DISCProfile {
  D: number; // 0-100
  I: number;
  S: number;
  C: number;
  dominantType: "D" | "I" | "S" | "C";
  descriptor: string;
}

export interface SessionResults {
  topCareers: ScoredCareer[];
  discProfile: DISCProfile | null;
  completedMVP: boolean;
  completedDeep: boolean;
}

export interface SessionData {
  studentProfile: StudentProfile | null;
  moduleScores: ModuleScores | null;
  sliderValues: SliderValues | null;
  results: SessionResults | null;
  selectedCareer: string | null;
}

const defaultSession: SessionData = {
  studentProfile: null,
  moduleScores: null,
  sliderValues: null,
  results: null,
  selectedCareer: null,
};

interface SessionContextValue {
  session: SessionData;
  setStudentProfile: (p: StudentProfile) => void;
  setModuleScores: (s: ModuleScores) => void;
  setSliderValues: (v: SliderValues) => void;
  setResults: (r: SessionResults) => void;
  setSelectedCareer: (id: string) => void;
  resetSession: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

const STORAGE_KEY = "careerlens_session";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored) as SessionData;
    } catch {
      // ignore
    }
    return defaultSession;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      // ignore
    }
  }, [session]);

  const update = (partial: Partial<SessionData>) =>
    setSession((prev) => ({ ...prev, ...partial }));

  return (
    <SessionContext.Provider
      value={{
        session,
        setStudentProfile: (p) => update({ studentProfile: p }),
        setModuleScores: (s) => update({ moduleScores: s }),
        setSliderValues: (v) => update({ sliderValues: v }),
        setResults: (r) => update({ results: r }),
        setSelectedCareer: (id) => update({ selectedCareer: id }),
        resetSession: () => setSession(defaultSession),
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
