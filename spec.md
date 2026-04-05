# CareerLens India V2 — Enhancement Build (Version 9)

## Current State

V2 architecture is live with 5 engines (Identity → Opportunity → Decision → Execution → WOW). The core flow works:
- Identity Engine: MVP Mode (16 Q) + Deep Mode (102 Q), 5 sliders, session context
- Opportunity Engine: 15 careers scored deterministically via scoringConfig.ts
- Decision Engine: ROI timeline, DISC profile, bridge steps, parent view
- Execution Engine: 4-week planner (free), premium gates for streak/GPS
- WOW Screen: 3-path summary, what-if slider, Future Self preview

Current career database: 6 Tech + 5 Healthcare + 4 Finance = 15 careers.
Stream scoring works correctly for Science and Commerce.
Law, Engineering, Design, Arts, Education sectors are NOT in careerScoringData.
Arts stream students see zero matching careers (all 15 careers have low stream compatibility).

## Requested Changes (Diff)

### Add
- 14 new careers in careerScoringData: Law (Lawyer, IAS/IPS, Public Policy), Engineering (Civil, Mechanical, Electrical), Design & Creative (UX Designer, Architect, Graphic Designer), Education & Social (Teacher, EdTech Professional, Social Worker), Management (MBA/Business Manager, HR Professional)
- Full bridge steps (steps910 + steps1112) for all 14 new careers in careerBridgeMap
- Full bridge steps for Healthcare careers currently missing: nurse-bsc, pharmacist, physiotherapist, medical-researcher
- Full bridge steps for Finance careers currently missing: financial-analyst, investment-banker, actuary
- Sector clusters for new sectors: law, engineering, design-creative (already in config), education, management
- Preview insight logic improvement: use actual top module scores from first 3 answered questions
- Edit Profile feedback loop: button in Opportunity Engine header to go back to Identity and recalculate

### Modify
- dreamCareerOptions.ts: align all IDs to match careerScoringData IDs exactly (currently mismatched: 'doctor-mbbs' vs 'doctor-mbbs', 'nurse' vs 'nurse-bsc', etc.); update hasProfile flags to true for all 5 healthcare careers
- scoringConfig.ts streamCareerAffinity: add arts → design-creative, education, law; add engineering sector for science-pcm
- careerScoringData: mark 5 healthcare careers as hasFullProfile: true (they have full profiles in careerData.ts)

### Remove
- Nothing removed

## Implementation Plan

1. **Expand careerScoringData.ts** — Add 14 new career entries covering Law, Engineering, Design, Education, Management sectors with full scoring metadata, stream compatibility, salary ranges, and data sources
2. **Update scoringConfig.ts** — Add streamCareerAffinity entries for arts stream (design-creative, media, education, law) and engineering sector for science-pcm
3. **Expand careerBridgeData.ts** — Add bridge steps for all 7 currently-missing healthcare/finance careers + 14 new careers
4. **Fix dreamCareerOptions.ts** — Align all IDs, update hasProfile flags, add new careers to dropdown groups
5. **Improve IdentityEngine.tsx** — Preview insight after Q3 should read actual scores from first 3 answered questions and give career-type hint
6. **Add feedback loop** — Edit Profile button in OpportunityEngine.tsx navigates back to identity with profile pre-filled
