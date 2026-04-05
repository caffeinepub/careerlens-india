// 60+ careers grouped by sector for the Dream Career Bridge dropdown

export interface DreamCareerEntry {
  id: string;
  name: string;
  /** whether a full rich profile exists in careerProfilesMap */
  hasProfile: boolean;
}

export interface DreamCareerGroup {
  sector: string;
  emoji: string;
  careers: DreamCareerEntry[];
}

export const dreamCareerGroups: DreamCareerGroup[] = [
  {
    sector: "Technology & Digital",
    emoji: "💻",
    careers: [
      {
        id: "software-engineering",
        name: "Software Engineer",
        hasProfile: true,
      },
      { id: "data-science", name: "Data Scientist", hasProfile: true },
      { id: "ai-ml-engineering", name: "AI / ML Engineer", hasProfile: true },
      { id: "cybersecurity", name: "Cybersecurity Analyst", hasProfile: true },
      { id: "product-management", name: "Product Manager", hasProfile: true },
      {
        id: "digital-marketing",
        name: "Digital Marketing Specialist",
        hasProfile: true,
      },
      {
        id: "cloud-devops",
        name: "Cloud / DevOps Engineer",
        hasProfile: false,
      },
      { id: "ux-ui-designer", name: "UX / UI Designer", hasProfile: false },
      { id: "blockchain", name: "Blockchain Developer", hasProfile: false },
      { id: "game-development", name: "Game Developer", hasProfile: false },
    ],
  },
  {
    sector: "Healthcare & Medicine",
    emoji: "🏥",
    careers: [
      { id: "doctor-mbbs", name: "Doctor (MBBS / MD)", hasProfile: true },
      { id: "dentist", name: "Dentist (BDS)", hasProfile: false },
      { id: "pharmacist", name: "Pharmacist", hasProfile: true },
      { id: "physiotherapist", name: "Physiotherapist", hasProfile: true },
      { id: "nurse-bsc", name: "Nurse (BSc / GNM)", hasProfile: true },
      {
        id: "medical-researcher",
        name: "Medical Researcher",
        hasProfile: true,
      },
      {
        id: "public-health",
        name: "Public Health Specialist",
        hasProfile: false,
      },
      {
        id: "ayurveda",
        name: "Ayurveda Practitioner (BAMS)",
        hasProfile: false,
      },
    ],
  },
  {
    sector: "Finance & Banking",
    emoji: "💰",
    careers: [
      {
        id: "chartered-accountant",
        name: "Chartered Accountant (CA)",
        hasProfile: true,
      },
      {
        id: "investment-banker",
        name: "Investment Banker",
        hasProfile: true,
      },
      { id: "financial-analyst", name: "Financial Analyst", hasProfile: true },
      { id: "actuary", name: "Actuary", hasProfile: true },
      { id: "cfa", name: "CFA / Portfolio Manager", hasProfile: false },
      {
        id: "banking-officer",
        name: "Bank Officer (PO / SO)",
        hasProfile: false,
      },
      {
        id: "financial-planner",
        name: "Certified Financial Planner",
        hasProfile: false,
      },
    ],
  },
  {
    sector: "Law & Governance",
    emoji: "⚖️",
    careers: [
      {
        id: "lawyer-advocate",
        name: "Advocate / Corporate Lawyer",
        hasProfile: false,
      },
      {
        id: "ias-ips-ifs",
        name: "IAS / IPS / IFS Officer",
        hasProfile: false,
      },
      {
        id: "public-policy-analyst",
        name: "Public Policy Analyst",
        hasProfile: false,
      },
      { id: "judiciary", name: "Judge / Judicial Officer", hasProfile: false },
      { id: "corporate-law", name: "Corporate Lawyer", hasProfile: false },
      {
        id: "human-rights-law",
        name: "Human Rights / NGO Lawyer",
        hasProfile: false,
      },
    ],
  },
  {
    sector: "Engineering & Infrastructure",
    emoji: "🏗️",
    careers: [
      { id: "civil-engineer", name: "Civil Engineer", hasProfile: false },
      {
        id: "mechanical-engineer",
        name: "Mechanical Engineer",
        hasProfile: false,
      },
      {
        id: "electrical-engineer",
        name: "Electrical / Electronics Engineer",
        hasProfile: false,
      },
      {
        id: "aerospace-engineering",
        name: "Aerospace Engineer",
        hasProfile: false,
      },
      {
        id: "chemical-engineering",
        name: "Chemical Engineer",
        hasProfile: false,
      },
      {
        id: "environmental-engineer",
        name: "Environmental Engineer",
        hasProfile: false,
      },
    ],
  },
  {
    sector: "Design & Creative",
    emoji: "🎨",
    careers: [
      {
        id: "graphic-designer",
        name: "Graphic / Visual Designer",
        hasProfile: false,
      },
      { id: "architect", name: "Architect", hasProfile: false },
      { id: "ux-ui-designer", name: "UX / UI Designer", hasProfile: false },
      { id: "fashion-design", name: "Fashion Designer", hasProfile: false },
      { id: "animation-vfx", name: "Animator / VFX Artist", hasProfile: false },
      {
        id: "film-direction",
        name: "Film Director / Cinematographer",
        hasProfile: false,
      },
      { id: "interior-design", name: "Interior Designer", hasProfile: false },
      {
        id: "industrial-design",
        name: "Industrial / Product Designer",
        hasProfile: false,
      },
    ],
  },
  {
    sector: "Media & Journalism",
    emoji: "📰",
    careers: [
      { id: "journalist", name: "Journalist / Reporter", hasProfile: false },
      {
        id: "content-creator",
        name: "Content Creator / YouTuber",
        hasProfile: false,
      },
      {
        id: "public-relations",
        name: "PR / Communications Specialist",
        hasProfile: false,
      },
      { id: "broadcast-media", name: "TV / Radio Anchor", hasProfile: false },
      {
        id: "documentary-filmmaker",
        name: "Documentary Filmmaker",
        hasProfile: false,
      },
    ],
  },
  {
    sector: "Education & Social Impact",
    emoji: "📚",
    careers: [
      { id: "teacher-educator", name: "Teacher / Educator", hasProfile: false },
      {
        id: "edtech-professional",
        name: "EdTech Professional",
        hasProfile: false,
      },
      {
        id: "professor",
        name: "University Professor / Academic",
        hasProfile: false,
      },
      {
        id: "school-counselor",
        name: "School Counselor / Psychologist",
        hasProfile: false,
      },
      {
        id: "ngo-development",
        name: "NGO / Development Sector Professional",
        hasProfile: false,
      },
      { id: "social-worker", name: "Social Worker", hasProfile: false },
    ],
  },
  {
    sector: "Management & Business",
    emoji: "💼",
    careers: [
      {
        id: "mba-business-manager",
        name: "Business Manager (MBA)",
        hasProfile: false,
      },
      { id: "hr-professional", name: "HR Professional", hasProfile: false },
      {
        id: "entrepreneur",
        name: "Entrepreneur / Startup Founder",
        hasProfile: false,
      },
      {
        id: "management-consultant",
        name: "Management Consultant",
        hasProfile: false,
      },
      {
        id: "supply-chain",
        name: "Supply Chain / Logistics Manager",
        hasProfile: false,
      },
      {
        id: "retail-management",
        name: "Retail / Operations Manager",
        hasProfile: false,
      },
      { id: "business-analyst", name: "Business Analyst", hasProfile: false },
    ],
  },
  {
    sector: "Science & Research",
    emoji: "🔬",
    careers: [
      {
        id: "research-scientist",
        name: "Research Scientist",
        hasProfile: false,
      },
      { id: "biotechnology", name: "Biotechnologist", hasProfile: false },
      {
        id: "astrophysics",
        name: "Astrophysicist / Space Scientist",
        hasProfile: false,
      },
      {
        id: "environmental-science",
        name: "Environmental Scientist",
        hasProfile: false,
      },
      {
        id: "psychology-research",
        name: "Psychologist / Behavioral Researcher",
        hasProfile: false,
      },
    ],
  },
  {
    sector: "Vocational & Skilled Trades",
    emoji: "🛠️",
    careers: [
      { id: "electrician-iti", name: "Electrician (ITI)", hasProfile: false },
      { id: "plumber-iti", name: "Plumber / Fitter (ITI)", hasProfile: false },
      {
        id: "automobile-technician",
        name: "Automobile Technician",
        hasProfile: false,
      },
      {
        id: "culinary-arts",
        name: "Chef / Culinary Artist",
        hasProfile: false,
      },
      {
        id: "beauty-cosmetology",
        name: "Beauty & Cosmetology Professional",
        hasProfile: false,
      },
      {
        id: "paramedic",
        name: "Paramedic / Emergency Technician",
        hasProfile: false,
      },
    ],
  },
  {
    sector: "Sports, Wellness & Performing Arts",
    emoji: "🎭",
    careers: [
      {
        id: "professional-athlete",
        name: "Professional Athlete / Coach",
        hasProfile: false,
      },
      {
        id: "yoga-fitness",
        name: "Yoga Instructor / Fitness Trainer",
        hasProfile: false,
      },
      {
        id: "performing-arts",
        name: "Dancer / Musician / Actor",
        hasProfile: false,
      },
      {
        id: "sports-management",
        name: "Sports Manager / Analyst",
        hasProfile: false,
      },
    ],
  },
];

/** Flat map for quick ID → name lookup */
export const dreamCareerNameMap: Record<string, string> = {};
for (const group of dreamCareerGroups) {
  for (const c of group.careers) {
    dreamCareerNameMap[c.id] = c.name;
  }
}

/** Find which group a career ID belongs to */
export function getCareerSector(careerId: string): string {
  for (const group of dreamCareerGroups) {
    if (group.careers.some((c) => c.id === careerId)) return group.sector;
  }
  return "";
}

/** Check if a career has a full built profile */
export function careerHasProfile(careerId: string): boolean {
  for (const group of dreamCareerGroups) {
    const found = group.careers.find((c) => c.id === careerId);
    if (found) return found.hasProfile;
  }
  return false;
}
