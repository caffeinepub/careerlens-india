# CareerLens India — Assessment Full Rebuild

## Current State
The AssessmentPage has 4 dimensions: `aptitude`, `interests`, `personality`, `grit_mindset_values`. Questions are 7 + 7 + 6 + 12 = 32 total. Modules 1–7 are collapsed into 3 buckets. No per-module scoring. Students see ~1–4 questions per actual topic, which is insufficient for career guidance.

## Requested Changes (Diff)

### Add
- 8 fully separated modules with distinct IDs, labels, colors, and question banks
- Module 1: Logical & Analytical — 25 questions, 13 shown per session
- Module 2: Numerical & Quantitative — 25 questions, 13 shown per session
- Module 3: Verbal & Communication — 25 questions, 13 shown per session
- Module 4: Scientific & Technical — 25 questions, 13 shown per session
- Module 5: Creative & Design — 25 questions, 13 shown per session
- Module 6: Leadership & Interpersonal — 25 questions, 13 shown per session
- Module 7: RIASEC Situational — 18 questions, 12 shown (2 per RIASEC type)
- Module 8: Grit, Mindset & Values — 12 questions, all 12 shown
- Per-module progress bar ("Module 2 of 8", "Question 4 of 13")
- Subject Preference sub-section before Module 1 (covering CBSE, ICSE, State, IGCSE, IB, American boards)
- Confidence capture per question: Sure / Not Sure / Guesswork
- Scoring: per-module band (High/Medium/Low) + weighted confidence scoring
- Results: 8 module score cards + top career matches + Grit/Mindset/Values profile
- Bridge panel: shown immediately after results, flags gap between best-fit and any stated dream career

### Modify
- Replace all existing question data with new 8-module question banks
- Replace dimension type from 4-value enum to 8-value module enum
- Scoring logic updated to produce per-module percentile scores
- Results page updated to show all 8 module scores

### Remove
- Old `aptitude`, `interests`, `personality` dimension labels
- Old 32-question bank

## Implementation Plan
1. Create `src/frontend/src/data/assessmentQuestions.ts` — full question banks for all 8 modules
2. Create `src/frontend/src/data/assessmentModules.ts` — module metadata (id, title, description, color, questionCount, showCount)
3. Rebuild `AssessmentPage.tsx` — new flow: subject preference → Module 1 → ... → Module 8 → results
4. Scoring: per-module raw score + confidence weighting → band (High/Medium/Low)
5. Results: 8 band cards + career cluster matches + bridge panel
6. Validate and deploy
