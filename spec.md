# CareerLens India — Unified Student Profile Entry Point

## Current State

The app has two discovery paths:
1. **Subject Gateway** (`SubjectGatewayPage.tsx`) — asks subjects (10 generic options) then stream, then shows career matches
2. **Assessment** (`AssessmentPage.tsx`) — has its own intro screen → grade-select screen → subject-preference screen → 8 modules → results

Problems:
- Grade is only asked inside Assessment; Subject Gateway never knows the student's grade so grade-specific content can't apply there
- Subjects are asked in both paths separately, using two different lists (Subject Gateway: 10 generic subjects; Assessment: comprehensive board-wise list in `subjectCategories`)
- Stream is only asked in Subject Gateway; Assessment never collects it so stream context is missing from all assessment results and career matching
- If a student goes Assessment path, they fill subjects a second time even if they already used Subject Gateway
- The two paths live on completely separate pages with no shared context

## Requested Changes (Diff)

### Add
- New shared `StudentProfileEntry` component (or a new page/view `student-profile`) that asks 3 questions once:
  1. Which grade are you in? (9 / 10 / 11 / 12)
  2. Which stream are you in, or planning to choose? (PCM / PCB / PCM+CS / Commerce / Humanities/Arts / Vocational / Not decided yet)
  3. What subjects do you enjoy or do well in? (multi-select using the comprehensive `subjectCategories` list from `assessmentModules.ts`)
- Two CTA buttons at the bottom of this shared entry screen:
  - **Find my Career Matches** → navigates to career results view (currently Subject Gateway results, now stream-filtered)
  - **Discover my Fit (Full Assessment)** → starts the 8-module assessment, carrying grade + stream + subjects pre-filled
- `NavState` needs a new view type `"student-profile"` and optional fields: `grade`, `stream`, `selectedSubjects` to pass context between views
- Stream-aware career matching: when stream is known, filter/rank careers by stream relevance before subject scoring. For now with only 6 Tech careers, Commerce/Humanities streams should see a clear "Coming Soon" notice for their stream's careers plus Tech careers marked as partial matches

### Modify
- `AssessmentPage.tsx`: Remove the `"grade-select"` phase and `GradeSelectScreen` component. Remove the `"subject-preference"` phase and `SubjectPreferenceScreen` component. Assessment now starts at a new `"intro"` screen that says "Let's begin" and goes straight to modules, because grade/stream/subjects arrive as props from the shared entry point
- `AssessmentPage.tsx`: Add props `initialGrade`, `initialStream`, `initialSubjects` so the session state is pre-populated before modules begin. The `"intro"` screen should display the student's grade, stream, and selected subjects as a summary before they start
- `SubjectGatewayPage.tsx`: Remove the subject selection step and stream selection step — these now live in the shared entry. This page only renders the **results** view (career match cards). It receives `grade`, `stream`, and `selectedSubjects` as props
- `App.tsx`: Add `"student-profile"` to `ViewType`. The homepage "I know what subjects I like" and "Discover my Fit" buttons both navigate to `{ view: "student-profile" }` instead of their separate pages. App.tsx passes the collected student profile data as props when routing to `SubjectGatewayPage` (career matches) or `AssessmentPage` (full assessment)
- `types/navigation.ts`: Add `"student-profile"` to `ViewType`, add optional `grade?: string`, `stream?: string`, `selectedSubjects?: string[]` to `NavState`
- `HomePage.tsx`: Update the two path cards — both buttons now go to `"student-profile"` view. The description text should reflect that grade/stream/subjects are asked once upfront
- Subject list: Use ONLY the comprehensive `subjectCategories` from `assessmentModules.ts` everywhere. Delete the old `SUBJECTS` array from `SubjectGatewayPage.tsx`. The shared entry renders subjects grouped by category (Sciences, Mathematics, Languages, etc.)
- Stream list: Consolidate to one STREAMS definition (can live in a shared data file or inline in the new entry component): PCM, PCB, PCM+CS, Commerce, Humanities/Arts, Vocational, Not decided yet

### Remove
- `GradeSelectScreen` function from `AssessmentPage.tsx`
- `SubjectPreferenceScreen` function from `AssessmentPage.tsx`
- `SUBJECTS` constant from `SubjectGatewayPage.tsx`
- `STREAMS` constant from `SubjectGatewayPage.tsx` (move to shared location)
- Subject/stream selection UI from `SubjectGatewayPage.tsx` (it only shows results now)
- The `"grade-select"` and `"subject-preference"` phases from `AssessmentPage`'s Phase type

## Implementation Plan

1. **Update `types/navigation.ts`**: Add `"student-profile"` to ViewType; add optional `grade`, `stream`, `selectedSubjects` to NavState

2. **Create `pages/StudentProfilePage.tsx`**: New page component with 3 question sections (grade buttons, stream buttons, subject multi-select using `subjectCategories`). Two CTA buttons: "Find my Career Matches" navigates to `{ view: "subject-gateway", grade, stream, selectedSubjects }` and "Discover my Fit" navigates to `{ view: "assessment", grade, stream, selectedSubjects }`. Requires at least grade selected to enable CTAs; stream and at least 1 subject required for career matches button

3. **Update `SubjectGatewayPage.tsx`**: Accept `grade`, `stream`, `selectedSubjects` as props (from NavState). Remove all subject/stream selection UI. Show results immediately based on passed-in data. Update stream-aware matching: Tech careers shown with relevance labels; Commerce/Humanities streams see a banner explaining Tech careers are shown as a bridge option with "More careers coming soon for your stream"

4. **Update `AssessmentPage.tsx`**: Add props `initialGrade`, `initialStream`, `initialSubjects`. Remove `grade-select` and `subject-preference` phases. Session initializes with pre-filled grade/stream/subjects. Intro screen shows student profile summary (Grade X, Stream, N subjects selected). Goes straight to modules on "Start Assessment" click

5. **Update `App.tsx`**: Add `student-profile` case. Pass NavState grade/stream/selectedSubjects as props to SubjectGatewayPage and AssessmentPage

6. **Update `HomePage.tsx`**: Both path cards navigate to `{ view: "student-profile" }`. Update card descriptions to reflect the unified entry
