export const scoringConfig = {
  stream_weight: 0.3,
  module_weight: 0.3,
  riasec_weight: 0.2,
  slider_weight: 0.2,
};

// stream → compatible career clusters
export const streamCareerAffinity: Record<string, string[]> = {
  "science-pcm": [
    "technology",
    "engineering",
    "finance",
    "science-research",
    "law",
  ],
  "science-pcb": ["healthcare", "science-research", "technology"],
  commerce: [
    "finance",
    "commerce-business",
    "law",
    "technology",
    "management",
    "education",
  ],
  arts: ["design-creative", "media", "education", "law"],
  vocational: ["vocational", "healthcare", "technology", "engineering"],
  undecided: [], // all clusters show
};

// Adjacent clusters (partial score if not in primary)
export const adjacentClusters: Record<string, string[]> = {
  "science-pcm": ["healthcare", "design-creative", "management"],
  "science-pcb": ["engineering", "finance"],
  commerce: ["design-creative", "media", "science-research", "law"],
  arts: ["commerce-business", "healthcare", "management"],
  vocational: ["engineering", "design-creative"],
  undecided: [],
};
