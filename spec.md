# CareerLens India — Module 8: Grit / Mindset / Values

## Current State

AssessmentPage.tsx has a 7-module, 20-question assessment (aptitude, interests, personality/RIASEC). It has these screens:
- `welcome` — grade selection and intro
- `quiz` — question by question flow with pending/answered state, confidence tagging is NOT yet implemented
- `results` — career clusters, top 5 matching careers, dream career gap analysis selector
- `gap` — gap roadmap screen with grade-specific advice

The existing `Scores` type has fields for aptitude, interests, and personality dimensions. RIASEC is embedded within the personality dimension. There are 20 questions total across 3 dimensions.

The bridge (gap analysis) is currently triggered only when the student manually selects a dream career from a dropdown on the results screen — it is NOT shown automatically.

## Requested Changes (Diff)

### Add

1. **Module 8 — Grit/Mindset/Values** as a separate module AFTER the existing 7 modules in the quiz flow:
   - Section A: GRIT (Perseverance + Passion) — 4 questions from Duckworth's Grit Scale
   - Section B: MINDSET (Fixed vs. Growth) — 4 questions from Dweck's Mindset Questionnaire
   - Section C: VALUES (What matters most) — 4 questions from Super's Work Values Inventory
   - Total: 12 questions in the bank, all 12 shown per session (no randomization needed for this module since it is behavioral not aptitude)
   - Each question has 4 answer options (A/B/C/D)
   - Confidence tagging applies: after each answer, show "How confident are you?" → Sure / Not Sure / Guesswork

2. **Confidence tagging** on ALL modules (not just Module 8):
   - After a student selects an answer, show a secondary prompt: "How confident are you in this answer?" with 3 options: Sure | Not Sure | Guesswork
   - Track confidence per question in state
   - Confidence weight in scoring: Sure = 1.0x, Not Sure = 0.75x, Guesswork = 0.5x
   - Show confidence summary in results: "You answered X of Y questions with high confidence"

3. **Grit/Mindset/Values scoring dimensions** added to the Scores type:
   - `grit_perseverance` — measures sustained effort and follow-through
   - `grit_passion` — measures depth/duration of focused interest
   - `mindset_growth` — growth mindset indicator
   - `mindset_fixed` — fixed mindset indicator (inverse)
   - `values_security` — values stability and certainty
   - `values_income` — values financial reward
   - `values_impact` — values social/human impact
   - `values_creativity` — values creative freedom
   - `values_independence` — values autonomy
   - `values_challenge` — values intellectual growth
   - `values_connection` — values human relationships

4. **Grit/Mindset/Values career mapping logic**:
   - Map score profiles to career cluster overlays:
     - High Grit + Growth Mindset + Impact/Challenge values → Medicine, Research, Law, Academia
     - High Grit + Growth Mindset + Income/Status values → Finance, Consulting, Tech Leadership
     - High Grit + Growth Mindset + Creativity/Independence → Entrepreneurship, Design, Media
     - Medium Grit + Growth Mindset + Helping/Connection → Teaching, Social Work, HR
     - Medium Grit + Mixed Mindset + Security → Government, Banking, PSU Engineering
     - Variable Grit + Fixed Mindset + Status → Management (bridge: needs mindset shift)
     - Low Grit + Security → Vocational/ITI tracks

5. **Bridge screen shown immediately after results** (Module 8 integration):
   - After the results screen renders, automatically compute: does the student's Grit/Mindset/Values best-fit cluster DIFFER from their top aptitude/RIASEC cluster?
   - If YES: show a Bridge panel WITHIN the results screen (not a separate screen) that explains:
     - Grit Gap: "Your dream career requires X level of sustained effort. Your grit profile suggests Y. Here's how to build it."
     - Mindset Gap: "This career requires a growth mindset in [area]. Here's what that looks like."
     - Values Alignment: "You value [top values]. Here are roles within [career] that match those values."
   - The bridge panel appears as a highlighted section between the Top 5 Careers and the Dream Career Gap Analysis selector
   - Student can still manually pick a dream career for detailed gap analysis

6. **Module 8 question bank** (12 questions, all shown, with confidence tagging):

   GRIT:
   - G1: Setback response (Give up / Take break / Push through / Ask for help)
   - G2: Duration of sustained interest (months / 1 year / few years / as long as I remember)
   - G3: Task completion under difficulty (Rarely / Sometimes / Mostly / Always true)
   - G4: Response to discovering lack of natural talent (Drop it / Work harder / Find shortcuts / Redefine success)

   MINDSET:
   - M1: Response to poor exam result (Not smart enough / Change approach / Unfair exam / Find natural subject)
   - M2: Reaction when someone outperforms you (Threatened / Curious how / Unaffected / Motivated to beat)
   - M3: Belief about intelligence (Fixed / Can grow / Luck matters / Character matters more)
   - M4: Preferred work type (Already good at / Challenges me / Pays well / Makes a difference)

   VALUES:
   - V1: What career must give you — pick top 2 from: Security, Income, Recognition, Impact, Creativity, Independence, Challenge, Connection
   - V2: Most proud if work does (Solves hard problem / Changes life / Creates beautiful / Builds lasting thing)
   - V3: Ideal workday in 10 years (Alone focused / Leading team / Meeting/helping people / Creating/building)
   - V4: Family expects different career (Follow family / Own path / Compromise / Persuade with evidence)

### Modify

- `AssessmentPage.tsx`: Extend QUESTIONS array with 12 Module 8 questions (dimension: "grit_mindset_values"), extend Scores type, extend scoring computation, add confidence state tracking for all questions, add bridge panel to results screen, show bridge immediately if mismatch detected
- Module progress indicator in quiz header: update to show "Module X of 8" (previously implicit)
- Results screen: add a Module 8 summary card showing Grit level (High/Medium/Low), Mindset type (Growth/Fixed/Mixed), Top 2 Values
- Results screen: add bridge panel between Top 5 Careers and Dream Career selector when mismatch exists

### Remove

- Nothing removed from existing functionality

## Implementation Plan

1. Extend TypeScript types: add `grit_mindset_values` dimension, add 11 new score fields to Scores interface, add confidence tracking types (per-question confidence map)
2. Add 12 Module 8 questions to QUESTIONS array with proper score deltas for each answer mapped to the new dimensions
3. Add confidence state: `confidenceMap: Record<number, 'sure' | 'not_sure' | 'guesswork'>` and `awaitingConfidence: boolean` state
4. Modify quiz UI: after answer selection, show confidence sub-prompt before advancing to next question (all modules)
5. Modify scoring computation: apply confidence weight multipliers when computing scores
6. Add Module 8 scoring logic in computeResults function: derive GritLevel, MindsetType, TopValues
7. Add career mapping logic: given GritLevel + MindsetType + TopValues, compute best-fit cluster from Module 8
8. Add bridge detection logic: compare Module 8 best-fit cluster vs. existing top aptitude/RIASEC cluster
9. Modify results screen: add Module 8 summary card (Grit/Mindset/Values summary), add bridge panel when mismatch detected, add confidence summary stat
10. All existing functionality (dream career selector, gap analysis screen, print/save) remains intact
