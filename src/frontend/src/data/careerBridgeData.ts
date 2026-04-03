/**
 * Career Bridge Data
 *
 * For each career, defines:
 * - Which assessment modules are most predictive
 * - Career-specific, grade-specific bridge steps (with real exams, skills, timelines)
 * - Grit and mindset requirements
 * - A generic fallback for careers without a built profile
 */

import type { ModuleId } from "./assessmentQuestions";

export interface BridgeStep {
  label: string;
  detail: string;
}

export interface CareerBridgeMeta {
  /** The 3 most predictive modules for this career (used for weighted scoring) */
  keyModules: ModuleId[];
  /** Minimum band required in key modules for a "match" (0-100 score threshold) */
  keyModuleThreshold: number;
  /** RIASEC types that align well with this career */
  alignedRiasec: string[];
  /** Min grit level required */
  minGritLevel: "Low" | "Medium" | "High";
  /** Whether growth mindset is critical */
  needsGrowthMindset: boolean;
  /** 5 concrete grade 9-10 steps */
  steps910: BridgeStep[];
  /** 5 concrete grade 11-12 steps */
  steps1112: BridgeStep[];
}

export const careerBridgeMap: Record<string, CareerBridgeMeta> = {
  "software-engineering": {
    keyModules: ["logical", "numerical", "scientific"],
    keyModuleThreshold: 55,
    alignedRiasec: ["I", "R", "C"],
    minGritLevel: "Medium",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Start Python fundamentals",
        detail:
          "Complete CS50P (free, Harvard) or freeCodeCamp Python course by end of Grade 10. Aim for 2 hours/week.",
      },
      {
        label: "Strengthen Mathematics",
        detail:
          "Focus on Algebra, Coordinate Geometry, and Logic sections in your board syllabus — these directly apply to coding.",
      },
      {
        label: "Build your first project",
        detail:
          "Create a simple calculator or quiz game in Python. Upload it to GitHub to start your portfolio now.",
      },
      {
        label: "Join a coding club or ATL Lab",
        detail:
          "Atal Tinkering Labs are free and available in 10,000+ schools. Coding clubs build problem-solving habit early.",
      },
      {
        label: "Explore PCM stream for Grade 11",
        detail:
          "Physics, Chemistry, Maths with Computer Science as 5th subject is the ideal combination for B.Tech CSE.",
      },
    ],
    steps1112: [
      {
        label: "Crack JEE Main for NIT/IIIT entry",
        detail:
          "Target 95+ percentile in JEE Main for top NITs. Coaching at Allen/Resonance or self-study via PW + NCERT. 2-year prep starting Grade 11.",
      },
      {
        label: "Build a portfolio of 3 projects",
        detail:
          "Build a web app, a data project, and an automation script. Host on GitHub + Vercel. Companies value this over marks in campus hiring.",
      },
      {
        label: "Get certified",
        detail:
          "Complete Harvard CS50x (free) and one of: AWS Cloud Practitioner, Google Associate Developer, or Meta Frontend Developer certificate by Grade 12.",
      },
      {
        label: "Start competitive coding",
        detail:
          "Register on Codeforces / LeetCode. Solve 50 easy problems before college — this prepares you for campus placement DSA rounds.",
      },
      {
        label: "Research college options",
        detail:
          "Shortlist 5 colleges: IIT/NIT (JEE), BITS Pilani (BITSAT), VIT (VITEEE), IIIT Hyderabad (UGEE). Apply to all. Each has a different exam.",
      },
    ],
  },

  "data-science": {
    keyModules: ["numerical", "logical", "scientific"],
    keyModuleThreshold: 55,
    alignedRiasec: ["I", "C", "R"],
    minGritLevel: "Medium",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Master Statistics basics",
        detail:
          "Statistics and Probability chapters in Grade 10 Maths are your core foundation. Study them thoroughly — mean, median, mode, probability trees.",
      },
      {
        label: "Learn Excel / Google Sheets",
        detail:
          "Practice pivot tables, basic charts, and VLOOKUP. These are used daily by data analysts and take only 2 weeks to learn.",
      },
      {
        label: "Try Kaggle Learn",
        detail:
          "Kaggle.com/learn has free Python + Data Analysis courses. Complete the Intro to Python and Intro to Data Analysis tracks (10 hours total).",
      },
      {
        label: "Choose PCM for Grade 11",
        detail:
          "Mathematics is non-negotiable. Statistics as an additional subject (offered in CBSE/ICSE) is a strong advantage.",
      },
      {
        label: "Follow data storytelling",
        detail:
          "Follow @datavizdaily on Instagram or read one Towards Data Science article per week. Build curiosity for real-world data problems.",
      },
    ],
    steps1112: [
      {
        label: "Target JEE / JAM / CUET for entry",
        detail:
          "For B.Tech CSE: JEE Main. For B.Sc Statistics/Maths at central universities: CUET. For IIT MSc Statistics: JAM (after graduation). Plan your route.",
      },
      {
        label: "Build a data portfolio",
        detail:
          "Do 2 Kaggle competitions (even without winning). Document your analysis as a notebook. Share on LinkedIn by Grade 12 end.",
      },
      {
        label: "Learn Python data stack",
        detail:
          "Complete: Pandas (data wrangling), Matplotlib/Seaborn (visualization), Scikit-learn basics (ML intro). All free on Kaggle Learn + YouTube.",
      },
      {
        label: "Consider IIT Madras BS Data Science",
        detail:
          "IIT Madras offers a full B.Sc Data Science online, entry via their own qualifier exam after Grade 12. No JEE required. One of India's best options.",
      },
      {
        label: "Understand the role landscape",
        detail:
          "Research roles: Data Analyst (entry, 3-5 LPA), Data Scientist (mid, 8-15 LPA), ML Engineer (specialized, 15-30 LPA). Know which you're aiming for.",
      },
    ],
  },

  "ai-ml-engineering": {
    keyModules: ["logical", "numerical", "scientific"],
    keyModuleThreshold: 65,
    alignedRiasec: ["I", "R"],
    minGritLevel: "High",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Build strong Maths foundation",
        detail:
          "Class 11-12 Maths (Calculus, Matrices, Probability) is directly used in AI. Prioritize these chapters — they are not optional for this career.",
      },
      {
        label: "Explore AI demos hands-on",
        detail:
          "Try Google Teachable Machine (free) to build an image classifier with zero code. Explore ml5.js and Hugging Face Spaces for interactive ML demos.",
      },
      {
        label: "Follow AI news and research",
        detail:
          "Subscribe to Import AI newsletter (Jack Clark) or The Batch (deeplearning.ai). Understanding the field builds motivation and vocabulary.",
      },
      {
        label: "Choose PCM + CS stream",
        detail:
          "PCM with Computer Science in Grade 11-12 is the clearest path. Computer Science board paper is directly relevant.",
      },
      {
        label: "Start Python early",
        detail:
          "Learn Python basics by Grade 10 end. Target: variables, loops, functions, lists. CS50P (Harvard, free) or NPTEL Python course are ideal starting points.",
      },
    ],
    steps1112: [
      {
        label: "Target IIT / IISc via JEE Advanced",
        detail:
          "IISc Bangalore (via KVPY/JEE), IIT Bombay, IIT Madras, IIT Delhi have the best AI/ML programs. JEE Advanced requires 99+ percentile for CS at top IITs.",
      },
      {
        label: "Complete Andrew Ng's ML Specialization",
        detail:
          "Coursera: Machine Learning Specialization (Andrew Ng) — 3 courses, free to audit. This is the global standard introduction. Complete it in Grade 12.",
      },
      {
        label: "Build a research-ready portfolio",
        detail:
          "Implement 2 papers from Arxiv in PyTorch. A simple CNN image classifier + a text classification model. Document everything on GitHub.",
      },
      {
        label: "Explore IIIT Hyderabad CND / UGEE",
        detail:
          "IIIT Hyderabad's UGEE exam is a strong alternative to JEE for AI/CS. Their AI/ML research programs are among India's best.",
      },
      {
        label: "Apply for research internships",
        detail:
          "IISER Summer Research Fellowship, IIT research projects, and Google's CSRMP are available to Grade 12 students. Apply 6 months in advance.",
      },
    ],
  },

  cybersecurity: {
    keyModules: ["logical", "scientific", "numerical"],
    keyModuleThreshold: 50,
    alignedRiasec: ["I", "R", "C"],
    minGritLevel: "Medium",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Start on TryHackMe",
        detail:
          "TryHackMe.com has beginner 'paths' (Pre-Security, Introduction to Cybersecurity) that gamify learning. Free. Complete the Pre-Security path by Grade 10.",
      },
      {
        label: "Learn basic networking",
        detail:
          "Understand what IP addresses, DNS, HTTP, and firewalls do. Professor Messer's CompTIA Network+ YouTube series is free and excellent.",
      },
      {
        label: "Choose PCM + CS stream",
        detail:
          "Physics, Chemistry, Maths with Computer Science is the ideal combination. Networking knowledge from CS board paper is directly applicable.",
      },
      {
        label: "Understand Linux basics",
        detail:
          "Install Ubuntu in a VirtualBox (free). Learn basic commands: ls, cd, grep, chmod. This is used daily in cybersecurity work.",
      },
      {
        label: "Read about real cybersecurity incidents",
        detail:
          "Follow KrebsOnSecurity.com blog. Understanding real breaches builds analytical thinking and career awareness.",
      },
    ],
    steps1112: [
      {
        label: "Pursue CEH certification track",
        detail:
          "Certified Ethical Hacker (CEH) by EC-Council can be started from Grade 12. Study materials available; exam can be taken at 18. Globally recognized.",
      },
      {
        label: "Target IIT Kanpur / IIIT Hyderabad",
        detail:
          "IIT Kanpur's C3i Hub is India's top cybersecurity research center. IIIT Hyderabad has strong info-sec research. Both require JEE for B.Tech.",
      },
      {
        label: "Complete HackTheBox Starting Point",
        detail:
          "HackTheBox.com has beginner labs for penetration testing. Completing 10 labs demonstrates hands-on skills to any recruiter.",
      },
      {
        label: "Enter bug bounty programs",
        detail:
          "HackerOne and Bugcrowd have beginner-friendly scopes. Finding even 1 bug and disclosing responsibly builds your resume significantly.",
      },
      {
        label: "Explore CDAC PG Diploma post-graduation",
        detail:
          "If top IIT/NIT is not accessible, CDAC's PG Diploma in Cybersecurity is government-run, affordable, and highly respected in the industry.",
      },
    ],
  },

  "product-management": {
    keyModules: ["verbal", "logical", "leadership"],
    keyModuleThreshold: 50,
    alignedRiasec: ["E", "S", "I"],
    minGritLevel: "Medium",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Build communication skills",
        detail:
          "Join your school debate team, Model UN, or student council. PM is fundamentally about persuasion and structured communication.",
      },
      {
        label: "Analyze apps you use daily",
        detail:
          "Pick one app (Swiggy, YouTube, WhatsApp) each month. Write a 1-page teardown: What problem does it solve? What would you improve? This is a PM skill.",
      },
      {
        label: "Read about Indian startups",
        detail:
          "Follow YourStory.com and Inc42 for startup news. Understanding why products succeed or fail is core PM knowledge.",
      },
      {
        label: "Any stream works — choose what you love",
        detail:
          "Unlike engineering, PM has no fixed entry stream. PCM, Commerce, or Humanities all lead here. Choose based on genuine interest.",
      },
      {
        label: "Start a blog or newsletter",
        detail:
          "Document your product observations and ideas. Even 5 posts show a recruiter you think like a PM. Medium.com is free.",
      },
    ],
    steps1112: [
      {
        label: "Target APM programs at top tech companies",
        detail:
          "Google APM, Microsoft APM, Uber APM hire fresh graduates. These are the fastest paths into PM. Apply in final year of graduation.",
      },
      {
        label: "Pursue B.Tech or top-stream UG",
        detail:
          "B.Tech from any decent college + MBA from IIM/ISB is the most common PM route in India. Alternatively, get into Tech directly as a developer and switch.",
      },
      {
        label: "Learn product frameworks",
        detail:
          "Study: JTBD (Jobs to be Done), OKRs, North Star Metric, and the Kano Model. Lenny's Newsletter (free) covers all of these with real examples.",
      },
      {
        label: "Build a product case study portfolio",
        detail:
          "Solve 5 product cases: redesign an existing app, define metrics for a feature, build a PRD. Use Notion to publish them.",
      },
      {
        label: "Target CAT/GMAT for MBA acceleration",
        detail:
          "IIM Ahmedabad, IIM Bangalore, and ISB placements send 20-30% of students into PM roles at top tech companies. CAT prep should start in Grade 11.",
      },
    ],
  },

  "digital-marketing": {
    keyModules: ["verbal", "creative", "leadership"],
    keyModuleThreshold: 45,
    alignedRiasec: ["A", "E", "S"],
    minGritLevel: "Low",
    needsGrowthMindset: false,
    steps910: [
      {
        label: "Start a social media page on any passion",
        detail:
          "Create an Instagram or YouTube channel on any topic you care about. Growing it teaches SEO, content strategy, and analytics faster than any course.",
      },
      {
        label: "Get Google Digital Garage certified",
        detail:
          "Google's Fundamentals of Digital Marketing (free, 40 hours) is globally recognized. Complete it in Grade 9-10. It looks excellent on any application.",
      },
      {
        label: "Learn Canva for content creation",
        detail:
          "Canva is free and used by 90% of digital marketers for design. Master it in 2 weeks. Add it to your skills list.",
      },
      {
        label: "Any stream works",
        detail:
          "Commerce stream gives a business context advantage. But PCM or Humanities work equally well. Focus on English proficiency.",
      },
      {
        label: "Track your own analytics",
        detail:
          "Connect Google Analytics to a free blog (Blogger or WordPress). Understanding what data a website generates is core digital marketing knowledge.",
      },
    ],
    steps1112: [
      {
        label: "Complete MICAT prep for MICA Ahmedabad",
        detail:
          "MICA Ahmedabad is India's best marketing school. Their PGDM-C requires CAT/XAT + MICAT. MICAT tests creativity and analytical ability — start prep in Grade 12.",
      },
      {
        label: "Build a case study of real results",
        detail:
          "Run a small paid campaign (₹500 on Facebook/Instagram Ads) for a local business or cause. Document the results. This is your first real portfolio piece.",
      },
      {
        label: "Get Meta and Google Ads certified",
        detail:
          "Meta Blueprint and Google Ads certifications are free and industry-standard. Complete both before graduation. Employers check for these specifically.",
      },
      {
        label: "Target BBA Marketing or Mass Communication",
        detail:
          "BBA from Symbiosis/Christ University + MBA Marketing from IIM/MICA is the premium route. BA Mass Comm from top colleges also works well.",
      },
      {
        label: "Build an agency or freelance early",
        detail:
          "Offer social media management to 2 local businesses at low cost in Grade 12. Real client work > any certificate for entry-level roles.",
      },
    ],
  },

  // Generic bridge data for careers without full profiles
  "doctor-mbbs": {
    keyModules: ["scientific", "numerical", "logical"],
    keyModuleThreshold: 65,
    alignedRiasec: ["I", "S", "R"],
    minGritLevel: "High",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Focus on Biology and Chemistry deeply",
        detail:
          "NEET tests PCB at Class 11-12 level. Start building strong conceptual clarity in Biology (Botany + Zoology) and Chemistry from Grade 9-10.",
      },
      {
        label: "Choose PCB stream for Grade 11",
        detail:
          "Physics, Chemistry, Biology is the mandatory stream. Do not skip any of the three — NEET tests all equally.",
      },
      {
        label: "Explore medicine through documentaries",
        detail:
          "Watch 'The Resident', read 'Do No Harm' by Henry Marsh. Understanding the reality of the profession early helps commitment.",
      },
      {
        label: "Learn about the NEET examination",
        detail:
          "NEET has 180 questions (45 each in Physics, Chemistry, Botany, Zoology). It is the single entry exam for all MBBS/BDS programs in India.",
      },
      {
        label: "Visit a hospital or clinic for shadow experience",
        detail:
          "Ask a family doctor if you can observe consultations for a day. Real exposure at this stage increases commitment and career clarity.",
      },
    ],
    steps1112: [
      {
        label: "Target NEET UG — 600+ score",
        detail:
          "NEET is conducted annually by NTA. 600+ score gets you government MBBS in most states. 650+ opens AIIMS and top government colleges. 2-year focused prep is minimum.",
      },
      {
        label: "Register with Allen / Aakash / NEET-specific coaching",
        detail:
          "NEET has a specific format. Coaching from Allen, Aakash, or Unacademy NEET programs significantly improves scoring. Hybrid coaching is now more affordable.",
      },
      {
        label: "Study NCERT Biology page by page",
        detail:
          "NEET Biology is 90% NCERT. Read the textbook line by line from Class 11-12. Do not rely on shortcuts. Questions come from exact paragraphs.",
      },
      {
        label: "Explore AIIMS and JIPMER",
        detail:
          "AIIMS Delhi, AIIMS Bhopal, JIPMER Puducherry are India's top medical schools. They now accept NEET scores. Special preparation for their counseling is needed.",
      },
      {
        label: "Understand the full MBBS timeline",
        detail:
          "MBBS = 4.5 years + 1 year internship. MD/MS specialization = 3 more years. Superspecialty (DM/MCh) = 3 more years. Total: 11-15 years to full consultant level.",
      },
    ],
  },

  "chartered-accountant": {
    keyModules: ["numerical", "logical", "verbal"],
    keyModuleThreshold: 55,
    alignedRiasec: ["C", "E", "I"],
    minGritLevel: "High",
    needsGrowthMindset: false,
    steps910: [
      {
        label: "Build strong Maths and Accounts foundation",
        detail:
          "CA Foundation tests Maths, Economics, and Accounts. If Commerce stream is available in school, take it. If not, practice Maths rigorously.",
      },
      {
        label: "Understand what a CA does in practice",
        detail:
          "CA work spans: auditing company books, filing tax returns, advising on mergers, forensic accounting. It is not just 'counting money'.",
      },
      {
        label: "Register for CA Foundation after Grade 10",
        detail:
          "ICAI (Institute of Chartered Accountants of India) allows CA Foundation registration after Class 10 boards. You can appear in exams after Grade 12.",
      },
      {
        label: "Choose Commerce stream in Grade 11",
        detail:
          "Accountancy, Business Studies, Economics, and Mathematics in Class 11-12 are directly relevant to CA Foundation and Intermediate papers.",
      },
      {
        label: "Visit a CA office for a day",
        detail:
          "Shadowing a practicing CA during tax season shows you the real work: client meetings, financial statement analysis, deadline pressure. Invaluable early exposure.",
      },
    ],
    steps1112: [
      {
        label: "Clear CA Foundation exam",
        detail:
          "4 papers: Accounting, Business Laws, Quantitative Aptitude, Business Economics. Pass mark is 40% per paper + 50% aggregate. Appears straightforward but failure rate is high — take mock exams seriously.",
      },
      {
        label: "Register for CA Intermediate simultaneously with graduation",
        detail:
          "Most CA students pursue B.Com alongside CA. This gives a degree backup and exemptions in some CA papers.",
      },
      {
        label: "Start articleship planning early",
        detail:
          "CA Intermediate requires 8 months of study before articleship. Start identifying CA firms for 3-year articleship in your city. Big 4 (Deloitte, PwC, EY, KPMG) offer the best exposure.",
      },
      {
        label: "Target pass rate improvement",
        detail:
          "CA Intermediate has ~10-15% first-attempt pass rates. Use ICAI study material + ICAI mock tests. Do not rely on shortcuts or summary notes alone.",
      },
      {
        label: "Plan for CA Final — 5+ year timeline",
        detail:
          "CA Foundation → Intermediate → Articleship (3 yrs) → CA Final. Total: 5-6 years after Grade 12. Build patience and financial plan accordingly.",
      },
    ],
  },

  "lawyer-advocate": {
    keyModules: ["verbal", "logical", "leadership"],
    keyModuleThreshold: 55,
    alignedRiasec: ["E", "S", "I"],
    minGritLevel: "High",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Build strong reading and reasoning skills",
        detail:
          "Law is fundamentally about reading, interpretation, and argumentation. Read newspapers daily. Practice summarizing complex articles in 3 sentences.",
      },
      {
        label: "Join debate and MUN clubs",
        detail:
          "Model UN and debate competitions simulate courtroom argumentation. Schools with active debate teams produce disproportionate numbers of successful law students.",
      },
      {
        label: "Understand what lawyers actually do",
        detail:
          "Lawyers don't just fight in court. Most work: drafting contracts, advising companies, negotiating settlements, policy writing. Research the different practice areas.",
      },
      {
        label: "Any stream can lead to law",
        detail:
          "CLAT (Common Law Admission Test) accepts students from any stream. However, Humanities (with Political Science, History, Economics) builds contextual knowledge.",
      },
      {
        label: "Read landmark Indian Supreme Court judgments",
        detail:
          "Read the Maneka Gandhi case, Vishaka case, and Kesavananda Bharati case summaries. This builds legal vocabulary and awareness of constitutional law.",
      },
    ],
    steps1112: [
      {
        label: "Target CLAT for NLUs — preparation starts Grade 11",
        detail:
          "CLAT (Common Law Admission Test) is the entry exam for 24 National Law Universities. 150 questions in 2 hours. English, Legal Reasoning, Logical, Maths, GK. 2 years of focused prep required.",
      },
      {
        label: "Target AILET for NLU Delhi",
        detail:
          "NLU Delhi is India's top law school. They have a separate exam (AILET) in addition to CLAT. Securing NLU Delhi or NALSAR opens doors to top law firms and judiciary.",
      },
      {
        label: "Read Constitution of India",
        detail:
          "All law students must know Fundamental Rights, DPSP, Amendment procedures, and key Articles. Read a plain-English commentary (Granville Austin or DD Basu) in Grade 12.",
      },
      {
        label: "Consider BA LLB (5 years) vs LLB (3 years)",
        detail:
          "Integrated BA LLB / BBA LLB (5 years after Grade 12) from NLU is the premium path. LLB (3 years after any graduation) is the alternative. Both lead to the Bar.",
      },
      {
        label: "Explore UPSC (judiciary) vs corporate law vs litigation",
        detail:
          "Three very different career paths: Judicial Services (UPSC + State PCS), Corporate Law (at law firms/companies), Litigation (courts). Each needs a different strategy — decide by Grade 12.",
      },
    ],
  },

  "ias-ips-ifs": {
    keyModules: ["verbal", "logical", "leadership"],
    keyModuleThreshold: 60,
    alignedRiasec: ["E", "S", "C"],
    minGritLevel: "High",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Read newspaper daily without fail",
        detail:
          "UPSC is fundamentally a current affairs and analytical reasoning exam. Reading The Hindu or Indian Express every day starting Grade 9 builds the foundation no coaching can replace.",
      },
      {
        label: "Understand the UPSC structure",
        detail:
          "UPSC CSE has 3 stages: Prelims (objective, 2 papers), Mains (9 written papers), Interview (personality test). Total preparation time: 2-4 years after graduation.",
      },
      {
        label: "Study NCERT books as primary source",
        detail:
          "UPSC Prelims and Mains questions are frequently traced back to NCERT Class 6-12 History, Geography, Polity, Economics textbooks. These are not optional — they are the foundation.",
      },
      {
        label: "Choose Humanities or any stream",
        detail:
          "UPSC accepts any graduation. Humanities (History, Political Science, Geography) gives optional subject advantage. Science students do equally well in the exam.",
      },
      {
        label: "Study about governance and public policy",
        detail:
          "Read about Panchayati Raj, Right to Information, National Education Policy, and India's Five Year Plans. Administrative awareness at this stage is rare and valuable.",
      },
    ],
    steps1112: [
      {
        label: "Graduate in any subject — marks matter minimally",
        detail:
          "UPSC requires only graduation. Focus on graduation that gives you time to prepare for UPSC alongside. Many successful IAS officers had B.Sc or B.Com degrees, not just Humanities.",
      },
      {
        label: "Start Optional Subject selection research",
        detail:
          "UPSC Mains has an optional subject (2 papers, 500 marks). Popular optionals: PSIR, History, Geography, Anthropology, Public Administration. Research which optional has best success rate for your background.",
      },
      {
        label: "Target UPSC Prelims within 2-3 years of graduation",
        detail:
          "Most successful candidates attempt UPSC between ages 22-26. Plan: 2 years systematic study post-graduation before first attempt. 6 attempts allowed (32 years age limit for Gen).",
      },
      {
        label: "Join coaching or build structured self-study plan",
        detail:
          "Vajiram & Ravi, Vision IAS, Forum IAS are leading coaching institutes. Online self-study via InsightsonIndia, ClearIAS is equally effective with discipline.",
      },
      {
        label: "Internalize servant leadership values",
        detail:
          "UPSC interview heavily tests values, integrity, and empathy. Build genuine public service motivation — assessors can distinguish authentic answers from rehearsed ones.",
      },
    ],
  },

  architect: {
    keyModules: ["creative", "scientific", "numerical"],
    keyModuleThreshold: 55,
    alignedRiasec: ["A", "R", "I"],
    minGritLevel: "Medium",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Develop drawing and spatial thinking skills",
        detail:
          "Architecture is equal parts visual art and engineering. Practice freehand sketching daily — 15 minutes of architectural drawings, interior spaces, or still life.",
      },
      {
        label: "Study buildings around you",
        detail:
          "Observe why buildings feel good or bad. Study sunlight, ventilation, material textures. Architecture awareness begins with seeing the built environment differently.",
      },
      {
        label: "Choose PCM stream for Grade 11",
        detail:
          "NATA (National Aptitude Test in Architecture) and JEE Paper 2 both require Mathematics. Physics and Chemistry are also tested. PCM is mandatory.",
      },
      {
        label: "Visit architectural landmarks in your city",
        detail:
          "Visit government buildings, old colonial structures, modern complexes. Sketch what you see. This builds a visual library that is directly useful in design studies.",
      },
      {
        label: "Explore architecture portfolios online",
        detail:
          "Browse ArchDaily.com and Dezeen.com. Follow Indian architects like B.V. Doshi and Charles Correa. Understanding the global design conversation inspires direction.",
      },
    ],
    steps1112: [
      {
        label: "Prepare for NATA — Drawing test is critical",
        detail:
          "NATA (National Aptitude Test in Architecture) has a Drawing section (80 marks) and a PCM-based test. Drawing practice must start 6 months before the exam. CoA-accredited coaching helps.",
      },
      {
        label: "Target JEE Paper 2 (B.Arch) for top NITs/SPA",
        detail:
          "School of Planning and Architecture (SPA) Delhi, SPA Bhopal, NIT Trichy B.Arch require JEE Main Paper 2 + NATA. SPA Delhi is India's top architecture school.",
      },
      {
        label: "Build a portfolio of design work",
        detail:
          "Compile your best drawings, 3D models (SketchUp is free), and any design projects into a PDF portfolio. Most architecture colleges require a portfolio for admission.",
      },
      {
        label: "Learn AutoCAD and SketchUp basics",
        detail:
          "AutoCAD is the industry standard for architectural drawing. SketchUp is free and widely used for 3D modeling. Learning both before college gives a significant head start.",
      },
      {
        label: "Understand the B.Arch + M.Arch pathway",
        detail:
          "B.Arch is 5 years (not 4). Mandatory internship in final year. Council of Architecture (CoA) registration is required to practice independently.",
      },
    ],
  },

  entrepreneur: {
    keyModules: ["leadership", "verbal", "creative"],
    keyModuleThreshold: 45,
    alignedRiasec: ["E", "A", "S"],
    minGritLevel: "High",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Start a micro-business today",
        detail:
          "Sell something: handmade crafts, tutoring, a digital service, plants. The first ₹100 you earn from your own work teaches more than any entrepreneurship course.",
      },
      {
        label: "Study successful Indian startups",
        detail:
          "Read the stories of Zerodha (Nithin Kamath), CRED (Kunal Shah), Mamaearth. Understand: what problem did they solve? How did they grow? Inc42 covers these well.",
      },
      {
        label: "Join your school's entrepreneurship or innovation club",
        detail:
          "ATL (Atal Tinkering Lab), innovation clubs, and school hackathons build prototyping habits, team skills, and problem-framing — the three core startup skills.",
      },
      {
        label: "Read one book about entrepreneurship per quarter",
        detail:
          "Start with: Zero to One (Peter Thiel), The Lean Startup (Eric Ries), Stay Hungry Stay Foolish (Rashmi Bansal — Indian founders). Build your mental models.",
      },
      {
        label: "Learn to code or design minimally",
        detail:
          "Entrepreneurs who can build a prototype have a massive advantage. Even knowing no-code tools (Bubble, Webflow, Glide) lets you test ideas without a co-founder.",
      },
    ],
    steps1112: [
      {
        label: "Enter national startup competitions",
        detail:
          "Smart India Hackathon, National Startup Awards, iCreate Competitions — winning or participating signals credibility to investors and accelerators.",
      },
      {
        label: "Apply for IIT/IIM accelerators after graduation",
        detail:
          "IIT Bombay E-Cell, NSRCEL (IIM Bangalore), T-Hub (Hyderabad), and Nasscom 10,000 Startups are the best Indian early-stage accelerators for student founders.",
      },
      {
        label: "Study business fundamentals",
        detail:
          "Understand: unit economics, customer acquisition cost, lifetime value, gross margin. These concepts determine whether a startup survives. Coursera has free business fundamentals courses.",
      },
      {
        label: "Choose graduation strategically",
        detail:
          "B.Tech + MBA (IIM) is the most credible Indian founder background for investor fundraising. BBA + MBA or B.Tech alone also work. Domain expertise matters as much as pedigree.",
      },
      {
        label: "Build a network of mentors deliberately",
        detail:
          "Identify 5 people whose career you admire. Email them. Attend founder events. Your network will determine your first customers, employees, and investors.",
      },
    ],
  },
};

/**
 * Get bridge steps for a career, falling back to generic steps if not defined.
 */
export function getBridgeSteps(
  careerId: string,
  grade: string,
): { label: string; detail: string }[] {
  const meta = careerBridgeMap[careerId];
  const is910 = grade === "9" || grade === "10";

  if (meta) {
    return is910 ? meta.steps910 : meta.steps1112;
  }

  // Generic fallback for careers without specific bridge data
  const careerName = careerId
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  if (is910) {
    return [
      {
        label: "Explore the field through free resources",
        detail: `Research what ${careerName} professionals actually do day-to-day. YouTube career documentaries and LinkedIn profiles of people in this role are the best starting point.`,
      },
      {
        label: "Identify the right school stream",
        detail: `Research which Grade 11-12 stream (PCM / PCB / Commerce / Humanities) opens the most doors for ${careerName}. Wrong stream choice in Grade 11 can delay your path by 2+ years.`,
      },
      {
        label: "Talk to someone in this field",
        detail: `Find 2-3 professionals in ${careerName} on LinkedIn. Send them a short, specific message asking one question about their career path. Most people respond to genuine curiosity from students.`,
      },
      {
        label: "Build one foundational skill",
        detail: `Identify the single most important skill for ${careerName} and spend 30 minutes per day building it. Consistency over 6 months beats intensive short bursts.`,
      },
      {
        label: "Join a related club or activity",
        detail:
          "Almost every career has a related school activity — science club, debate, business quiz, art club, coding club, NCC. Participate actively, not just as a member on paper.",
      },
    ];
  }

  return [
    {
      label: "Research the entry qualification pathway",
      detail: `Identify the exact exam, degree, or certification required to enter ${careerName}. Map out the full timeline: exam preparation → admission → degree → entry role.`,
    },
    {
      label: "Identify the top 3 colleges in India for this path",
      detail: `Find the 3 best Indian institutions for ${careerName}. Understand their admission criteria, cutoffs, and typical career placements. This sets your target.`,
    },
    {
      label: "Build a portfolio or proof of interest",
      detail: `Create evidence of your interest and capability in ${careerName}. This could be a project, certificate, competition result, or internship. Admissions and employers look for demonstrated commitment.`,
    },
    {
      label: "Connect with current students and professionals",
      detail:
        "Find current students in the top programs on LinkedIn or through alumni networks. Their first-hand experience of application and study is more valuable than any guide.",
    },
    {
      label: "Make a decision on your path by Grade 12 end",
      detail:
        "Indecision is the biggest career risk at this stage. By end of Grade 12, you should have: target college, backup college, exam prep plan, and a rough 5-year roadmap. Adjust later as needed.",
    },
  ];
}

/**
 * Compute weighted bridge match score (0–100) for a career against assessment results.
 * Returns match (boolean) and a numeric score.
 */
export function computeBridgeMatchScore(
  careerId: string,
  moduleScores: { moduleId: string; score: number }[],
  riasecCounts: Record<string, number>,
  hollandCode: string,
  gritLevel: "Low" | "Medium" | "High",
  mindsetType: "Growth" | "Fixed" | "Mixed",
): { score: number; match: boolean; gritGap: boolean; mindsetGap: boolean } {
  const meta = careerBridgeMap[careerId];

  if (!meta) {
    // Generic match: check if any key aptitude score is High
    const avgScore =
      moduleScores.reduce((sum, m) => sum + m.score, 0) /
      Math.max(moduleScores.length, 1);
    return {
      score: Math.round(avgScore),
      match: avgScore >= 55,
      gritGap: gritLevel === "Low",
      mindsetGap: mindsetType === "Fixed",
    };
  }

  // Key module average (60% weight)
  const keyScores = meta.keyModules.map(
    (mid) => moduleScores.find((m) => m.moduleId === mid)?.score || 0,
  );
  const keyAvg =
    keyScores.reduce((s, v) => s + v, 0) / Math.max(keyScores.length, 1);

  // RIASEC alignment (25% weight)
  const totalRiasec =
    Object.values(riasecCounts).reduce((s, v) => s + v, 0) || 1;
  const alignedCount = meta.alignedRiasec.reduce(
    (s, type) => s + (riasecCounts[type] || 0),
    0,
  );
  const riasecScore = (alignedCount / totalRiasec) * 100;

  // Holland code bonus (15% weight)
  const hollandBonus = meta.alignedRiasec.some((t) => hollandCode.includes(t))
    ? 100
    : 30;

  const compositeScore = Math.round(
    keyAvg * 0.6 + riasecScore * 0.25 + hollandBonus * 0.15,
  );

  const gritGap =
    (meta.minGritLevel === "High" && gritLevel !== "High") ||
    (meta.minGritLevel === "Medium" && gritLevel === "Low");

  const mindsetGap = meta.needsGrowthMindset && mindsetType === "Fixed";

  return {
    score: Math.min(compositeScore, 100),
    match: compositeScore >= meta.keyModuleThreshold && !mindsetGap,
    gritGap,
    mindsetGap,
  };
}
