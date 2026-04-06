/**
 * Deterministic Fit Score Engine
 * Computes career fit scores from student profile, module scores, RIASEC, and sliders.
 */

import {
  adjacentClusters,
  scoringConfig,
  streamCareerAffinity,
} from "../config/scoringConfig";
import type {
  ModuleScores,
  ScoredCareer,
  SliderValues,
} from "../context/SessionContext";
import { careerScoringData } from "../data/careerScoringData";

export function computeFitScore(
  career: (typeof careerScoringData)[0],
  moduleScores: ModuleScores,
  sliderValues: SliderValues,
  stream: string,
): number {
  // 1. Stream score
  const compatibleClusters = streamCareerAffinity[stream] || [];
  const adjacentClusterList = adjacentClusters[stream] || [];
  let streamScore: number;
  if (stream === "undecided" || compatibleClusters.length === 0) {
    streamScore = 70; // neutral
  } else if (career.compatibleStreams.includes(stream)) {
    streamScore = 100;
  } else if (
    career.adjacentStreams.includes(stream) ||
    compatibleClusters.includes(career.sector) ||
    adjacentClusterList.includes(career.sector)
  ) {
    streamScore = 30; // was 40, now 30 — makes incompatible careers rank lower
  } else {
    streamScore = 0; // was 10, now 0 — hard exclusion for truly incompatible stream/career combinations
  }

  // 2. Module score (average of key modules for this career)
  const scoreMap: Record<string, number> = {
    logical: moduleScores.logical,
    numerical: moduleScores.numerical,
    verbal: moduleScores.verbal,
    scientific: moduleScores.scientific,
    creative: moduleScores.creative,
    leadership: moduleScores.leadership,
  };
  const keyScores = career.keyModules.map((m) => scoreMap[m] || 50);
  const moduleScore =
    keyScores.reduce((s, v) => s + v, 0) / Math.max(keyScores.length, 1);

  // 3. RIASEC score (% overlap between student RIASEC and career RIASEC types)
  const totalRiasec =
    Object.values(moduleScores.riasecCounts).reduce((s, v) => s + v, 0) || 1;
  const alignedRiasec = career.riasecTypes.reduce(
    (s, type) => s + (moduleScores.riasecCounts[type] || 0),
    0,
  );
  const riasecScore = Math.min((alignedRiasec / totalRiasec) * 200, 100); // boost small overlaps

  // Holland code bonus
  const hollandBonus = career.riasecTypes.some((t) =>
    moduleScores.hollandCode.includes(t),
  )
    ? 20
    : 0;
  const riasecFinal = Math.min(riasecScore + hollandBonus, 100);

  // 4. Slider affinity score (cosine-like similarity)
  const affinityKeys = [
    "income",
    "passion",
    "stability",
    "time",
    "risk",
  ] as const;
  const studentVec = affinityKeys.map((k) => sliderValues[k]);
  const careerVec = affinityKeys.map((k) => career.sliderAffinity[k]);
  const diff = affinityKeys.reduce(
    (sum, _k, i) => sum + Math.abs((studentVec[i] - careerVec[i]) / 4),
    0,
  );
  const sliderScore = Math.max(0, 100 - (diff / affinityKeys.length) * 100);

  // Weighted sum
  const raw =
    streamScore * scoringConfig.stream_weight +
    moduleScore * scoringConfig.module_weight +
    riasecFinal * scoringConfig.riasec_weight +
    sliderScore * scoringConfig.slider_weight;

  return Math.round(Math.min(raw, 99)); // cap at 99% (nothing is perfect)
}

export function scoreCareers(
  moduleScores: ModuleScores,
  sliderValues: SliderValues,
  stream: string,
): ScoredCareer[] {
  return careerScoringData
    .map((career) => {
      const fitScore = computeFitScore(
        career,
        moduleScores,
        sliderValues,
        stream,
      );
      const fitBand: "strong" | "good" | "stretch" =
        fitScore >= 75 ? "strong" : fitScore >= 50 ? "good" : "stretch";

      const reasonPhrase = buildReasonPhrase(
        career,
        moduleScores,
        stream,
        fitScore,
      );

      return {
        id: career.id,
        name: career.name,
        sector: career.sectorLabel,
        fitScore,
        fitBand,
        reasonPhrase,
        salaryEntry: career.salaryEntry,
        salaryMid: career.salaryMid,
        salarySenior: career.salarySenior,
        yearsToFirstJob: career.yearsToFirstJob,
        hasFullProfile: career.hasFullProfile,
      } as ScoredCareer;
    })
    .sort((a, b) => b.fitScore - a.fitScore);
}

function buildReasonPhrase(
  career: (typeof careerScoringData)[0],
  scores: ModuleScores,
  stream: string,
  fitScore: number,
): string {
  if (career.compatibleStreams.includes(stream) && fitScore >= 75) {
    return `Your ${stream.replace("-", " ")} background gives you a direct entry path`;
  }
  const topModule = career.keyModules.reduce((best, m) => {
    const scoreMap: Record<string, number> = {
      logical: scores.logical,
      numerical: scores.numerical,
      verbal: scores.verbal,
      scientific: scores.scientific,
      creative: scores.creative,
      leadership: scores.leadership,
    };
    return (scoreMap[m] || 0) > (scoreMap[best] || 0) ? m : best;
  }, career.keyModules[0]);
  const moduleNames: Record<string, string> = {
    logical: "analytical reasoning",
    numerical: "quantitative skills",
    verbal: "communication ability",
    scientific: "scientific aptitude",
    creative: "creative thinking",
    leadership: "leadership traits",
  };
  return `Your ${moduleNames[topModule] || "aptitude"} aligns strongly with this field`;
}

export function computeDISCProfile(
  moduleScores: ModuleScores,
  sliderValues: SliderValues,
): import("../context/SessionContext").DISCProfile {
  const riasecCounts = moduleScores.riasecCounts;
  const totalR = Object.values(riasecCounts).reduce((s, v) => s + v, 0) || 1;
  const getR = (t: string) => ((riasecCounts[t] || 0) / totalR) * 100;

  const D = Math.round(
    moduleScores.leadership * 0.5 + getR("E") * 0.3 + getR("R") * 0.2,
  );
  const I = Math.round(
    moduleScores.verbal * 0.4 + getR("S") * 0.3 + getR("A") * 0.3,
  );
  const S = Math.round(
    moduleScores.gritScore * 0.4 +
      getR("C") * 0.3 +
      (sliderValues.stability / 5) * 30,
  );
  const C = Math.round(
    moduleScores.logical * 0.3 +
      moduleScores.numerical * 0.3 +
      getR("C") * 0.2 +
      getR("I") * 0.2,
  );

  const max = Math.max(D, I, S, C);
  let dominantType: "D" | "I" | "S" | "C" = "D";
  if (I === max) dominantType = "I";
  else if (S === max) dominantType = "S";
  else if (C === max) dominantType = "C";

  const descriptors: Record<string, string> = {
    D: "Results-oriented, decisive, direct — you drive outcomes",
    I: "People-oriented, persuasive, enthusiastic — you energize teams",
    S: "Steady, patient, reliable — you build lasting foundations",
    C: "Analytical, precise, systematic — you ensure quality",
  };

  return { D, I, S, C, dominantType, descriptor: descriptors[dominantType] };
}
