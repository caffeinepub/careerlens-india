export const scoringConfig = {
  stream_weight: 0.55,
  module_weight: 0.15,
  riasec_weight: 0.2,
  slider_weight: 0.1,
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
  commerce: ["finance", "commerce-business", "management", "education"],
  arts: ["design-creative", "media", "education", "law"],
  vocational: ["vocational", "healthcare", "technology", "engineering"],
  undecided: [], // all clusters show
};

// Adjacent clusters (partial score if not in primary)
export const adjacentClusters: Record<string, string[]> = {
  "science-pcm": ["healthcare", "design-creative", "management"],
  "science-pcb": ["engineering", "finance"],
  commerce: ["design-creative", "media", "law"],
  arts: ["commerce-business", "healthcare", "management"],
  vocational: ["engineering", "design-creative"],
  undecided: [],
};
