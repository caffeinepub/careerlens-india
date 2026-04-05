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

  // ─── HEALTHCARE MISSING BRIDGE ENTRIES ────────────────────────────────────────

  "nurse-bsc": {
    keyModules: ["scientific", "verbal", "leadership"],
    keyModuleThreshold: 50,
    alignedRiasec: ["S", "I", "R"],
    minGritLevel: "Medium",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Maintain Biology grades above 60%",
        detail:
          "NEET has a biology section that directly tests PCB concepts. Strong Biology in Grade 9–10 is the foundation for nursing entrance preparation.",
      },
      {
        label: "Volunteer at a clinic, hospital, or health camp",
        detail:
          "Even 4 hours/month builds both exposure and evidence of commitment. Many students discover the reality of healthcare work this way — confirm interest early.",
      },
      {
        label: "Complete a First Aid certificate",
        detail:
          "Red Cross India offers free First Aid certification. It is respected, practical, and shows genuine healthcare intent to admissions committees.",
      },
      {
        label: "Read about nursing roles in India's healthcare system",
        detail:
          "District hospitals, AIIMS, private hospitals, and community health all have different trajectories. Understanding these distinctions helps with career planning.",
      },
      {
        label: "Explore PCB stream for Grade 11",
        detail:
          "BSc Nursing requires PCB, with Biology as the core science. Do not choose PCM if nursing is the goal — stream selection here is career-defining.",
      },
    ],
    steps1112: [
      {
        label: "Target NEET for government BSc Nursing seats",
        detail:
          "NEET score is used by most state government nursing college admissions. Even a moderate NEET score (400+) opens government college seats with subsidized fees.",
      },
      {
        label: "Shortlist top nursing colleges",
        detail:
          "AIIMS BSc Nursing, JIPMER, RAK College of Nursing Delhi, and CMC Vellore have the best placements and NCLEX support for international migration opportunities.",
      },
      {
        label: "Explore IELTS preparation alongside BSc",
        detail:
          "Indian nurses who migrate to the UK, USA, or Australia typically earn 5–8x domestic salary. IELTS preparation in college years opens this option significantly.",
      },
      {
        label: "Develop ICU or Emergency interest early",
        detail:
          "ICU and Emergency specializations command premium salaries and fast career growth in both India and abroad. Express this interest in internships and elective rotations.",
      },
      {
        label: "Research the NCLEX-RN pathway",
        detail:
          "The US nursing licensing exam (NCLEX-RN) opens international doors. Many Indian nursing colleges now prepare students for NCLEX — ask colleges about this directly.",
      },
    ],
  },

  pharmacist: {
    keyModules: ["scientific", "numerical", "logical"],
    keyModuleThreshold: 50,
    alignedRiasec: ["I", "C", "R"],
    minGritLevel: "Medium",
    needsGrowthMindset: false,
    steps910: [
      {
        label: "Build strong Chemistry and Biology fundamentals",
        detail:
          "D.Pharm and B.Pharm entrance exams test PCB concepts directly. Chemistry is the most critical subject — focus on organic chemistry and chemical reactions.",
      },
      {
        label: "Visit a local pharmacy and talk to the pharmacist",
        detail:
          "Understanding the actual work demystifies the career. Ask the pharmacist what they do beyond dispensing — drug counseling, inventory, clinical pharmacy roles are often unknown.",
      },
      {
        label: "Learn about drug regulations in India",
        detail:
          "India's pharmacy sector is shaped by CDSCO and state pharmacy councils. Understanding regulations — what a pharmacist can and cannot do — is core to the career.",
      },
      {
        label: "Explore PCB stream for Grade 11",
        detail:
          "B.Pharm requires PCB, with Chemistry as the most critical subject. Physics and Mathematics are also tested in pharmacy entrance exams.",
      },
      {
        label: "Research D.Pharm vs B.Pharm options",
        detail:
          "D.Pharm (2-year) opens retail pharmacy fast with a lower investment. B.Pharm (4-year) opens industrial, clinical, and research roles with higher long-term earnings.",
      },
    ],
    steps1112: [
      {
        label: "Research state pharmacy entrance exams",
        detail:
          "MHT-CET, WBJEE, AP EAPCET, and KCET all have pharmacy tracks. State government colleges have significantly lower fees than private colleges with similar quality.",
      },
      {
        label: "Target top pharmacy colleges",
        detail:
          "Jamia Hamdard Delhi, BITS Pilani Pharmacy, Bombay College of Pharmacy, and JSS Manipal offer the strongest industrial placements and research opportunities.",
      },
      {
        label: "Consider GPAT preparation from Year 2 of B.Pharm",
        detail:
          "GPAT (Graduate Pharmacy Aptitude Test) opens M.Pharm at NIPER (National Institutes of Pharmaceutical Education and Research) — India's top pharmacy PG programs.",
      },
      {
        label: "Explore pharma industry tracks",
        detail:
          "Regulatory affairs, clinical research, medical writing, and drug discovery each have different salary trajectories. Research these tracks before final year so you can target internships strategically.",
      },
      {
        label: "Pursue clinical research certification alongside B.Pharm",
        detail:
          "ICTRC, CCRPS, or SOCRA certifications are valued by CROs (contract research organizations). These add ₹1–2 LPA to entry-level offers and open global opportunities.",
      },
    ],
  },

  physiotherapist: {
    keyModules: ["scientific", "verbal", "creative"],
    keyModuleThreshold: 50,
    alignedRiasec: ["S", "I", "R"],
    minGritLevel: "Medium",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Focus on Biology and Physics fundamentals",
        detail:
          "Anatomy, physiology, and biomechanics — the core of BPT — are built on these. Strong Biology in Grade 9–10 is essential preparation.",
      },
      {
        label: "Observe or shadow a physiotherapist",
        detail:
          "Sports clinics, hospital rehab departments, and community health centers all have physiotherapists. Even 2 visits give you a realistic view of the daily work.",
      },
      {
        label: "Learn basic anatomy from free resources",
        detail:
          "Khan Academy covers human body systems that are directly tested in BPT entrance exams. Start with musculoskeletal system and nervous system modules.",
      },
      {
        label: "Build physical fitness yourself",
        detail:
          "Physiotherapists who have experienced rehabilitation personally develop stronger empathy and technique. Fitness, sports, or yoga practice is both relevant and beneficial.",
      },
      {
        label: "Explore PCB stream for Grade 11",
        detail:
          "BPT requires PCB with minimum 50% in Biology. Do not choose PCM if physiotherapy is the goal — PCB is mandatory for most BPT programs.",
      },
    ],
    steps1112: [
      {
        label: "Apply to top BPT programs in India",
        detail:
          "SRM University, Manipal University, DY Patil, Jamia Hamdard, and state government medical colleges with physiotherapy departments are the top targets.",
      },
      {
        label: "NEET score opens BPT admission options",
        detail:
          "NEET score is accepted by many BPT programs. Preparing for NEET even if the target is BPT maximizes admission options and keeps MBBS as a backup possibility.",
      },
      {
        label: "Specialize early in your area of interest",
        detail:
          "Sports physiotherapy, neuro rehabilitation, pediatric PT, and cardiac rehab each have different salary ceilings and opportunities. Specialization determines your career trajectory significantly.",
      },
      {
        label: "Get certified in manual therapy or dry needling during BPT",
        detail:
          "These add-on skills command premium rates in private practice and abroad. Many BPT students complete these certifications in final year or immediately after.",
      },
      {
        label: "Research MPT options for PG specialization",
        detail:
          "MPT (Masters in Physiotherapy) with AIPT or IAP registration opens independent practice. Specialization at PG level significantly increases earnings and career scope.",
      },
    ],
  },

  "medical-researcher": {
    keyModules: ["scientific", "logical", "numerical"],
    keyModuleThreshold: 60,
    alignedRiasec: ["I", "R", "C"],
    minGritLevel: "High",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Excel in Biology, Chemistry, and Mathematics",
        detail:
          "Research careers require strong fundamentals across all three science subjects. Each maps to a different research discipline — Biology to life sciences, Chemistry to pharma/biochemistry, Maths to bioinformatics.",
      },
      {
        label: "Participate in science competitions and Olympiads",
        detail:
          "NSEC, NSEB, and INSPIRE awards build research temperament. These are valued by IISc, IISER, and JNU admissions committees and open scholarship opportunities.",
      },
      {
        label: "Read scientific magazines and popular science books",
        detail:
          "'The Double Helix' (Watson), 'The Emperor of All Maladies' (Mukherjee), and 'A Brief History of Time' (Hawking) build scientific thinking and confirm genuine interest in research.",
      },
      {
        label: "Start a home experiment log",
        detail:
          "Document observations, hypotheses, and outcomes — even from simple household experiments. This is the core research skill. The habit of systematic documentation is rare and valuable.",
      },
      {
        label: "Explore PCB or PCM stream based on your research interest",
        detail:
          "Biology research and medicine require PCB. Biotechnology, biochemistry, and computational biology can use either. Choose stream based on whether your interest is life science or physical science.",
      },
    ],
    steps1112: [
      {
        label: "Target KVPY Fellowship for research programs at IISc or IISERs",
        detail:
          "KVPY Fellowship gives direct BS-MS entry to IISc and IISERs — India's top research institutions. This is the single most valuable exam for students committed to research careers.",
      },
      {
        label: "Apply for IISER Aptitude Test or IISc BS program",
        detail:
          "IISER Pune, Kolkata, Mohali, Bhopal, and Thiruvananthapuram are India's best pure science undergraduate programs designed specifically for research careers. IISER BS-MS places graduates in top global PhD programs.",
      },
      {
        label: "Consider BS-MS over MBBS if research is the primary goal",
        detail:
          "BS-MS at IISER places graduates at NIH, MIT, Max Planck, and leading Indian research institutes. MBBS is a clinical career path — research roles exist but are harder to reach from MBBS than from BS-MS.",
      },
      {
        label: "Pursue summer research internships",
        detail:
          "CSIR SRFP and IASc summer research fellowships are available for Grade 12 students. These expose you to real lab work, mentors, and research papers — invaluable for confirming career direction.",
      },
      {
        label: "Build precise scientific writing skills in English",
        detail:
          "Research papers, grant applications, and collaboration require clear scientific writing. Start writing lab reports with precision now — hypothesis, method, result, interpretation format.",
      },
    ],
  },

  // ─── FINANCE MISSING BRIDGE ENTRIES ───────────────────────────────────────────

  "financial-analyst": {
    keyModules: ["numerical", "logical", "verbal"],
    keyModuleThreshold: 55,
    alignedRiasec: ["C", "I", "E"],
    minGritLevel: "Medium",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Build Mathematics, Statistics, and Economics fundamentals",
        detail:
          "Financial analysis is applied quantitative reasoning. Strong marks in these three subjects in Grade 9–10 are the foundation for every financial analyst path.",
      },
      {
        label: "Start reading the business section of newspapers",
        detail:
          "The Hindu Business Line or Economic Times. Understanding terms like GDP, inflation, interest rates, and P/E ratios builds financial literacy that accelerates every finance program.",
      },
      {
        label: "Learn Excel basics",
        detail:
          "Financial analysts spend 40% of their time in spreadsheets. Khan Academy and Microsoft Learn have free Excel courses — pivot tables, VLOOKUP, and basic financial formulas are the priority.",
      },
      {
        label: "Consider Commerce stream for Grade 11",
        detail:
          "Economics, Accountancy, and Business Studies are directly aligned with financial analysis. PCM students can also enter finance but will need to supplement with economics and accounting knowledge.",
      },
      {
        label: "Explore CFA Institute's free financial literacy resources",
        detail:
          "Even in school, understanding financial statements gives you a head start. The CFA Institute has free learning modules at cfainstitute.org — accessible to Grade 10 students.",
      },
    ],
    steps1112: [
      {
        label: "Target top B.Com, BBA Finance, or Economics programs",
        detail:
          "B.Com (Hons) at Delhi University, Symbiosis, Christ University, and Narsee Monjee are the primary undergraduate paths. SRCC Delhi is the top Commerce college in India.",
      },
      {
        label: "Begin CFA Level 1 preparation from final year of graduation",
        detail:
          "The CFA (Chartered Financial Analyst) is the global gold standard for financial analysts. Starting early in final year gives a head start — most analysts clear Level 1 within 2 years of graduation.",
      },
      {
        label: "Complete Bloomberg Market Concepts certification",
        detail:
          "This free, widely recognized certification takes only 8–10 hours and is mentioned positively in most finance interviews. Get it before your final year internship application.",
      },
      {
        label: "Learn Python for Finance",
        detail:
          "Basic pandas and data visualization in Python gives you an edge in quantitative finance roles. This skill gap is significant in India — candidates who have it are preferred by top firms.",
      },
      {
        label: "Intern at a brokerage, AMC, or investment bank early",
        detail:
          "Most analyst jobs are hired through internship-to-full-time conversion. Apply in Year 2–3 of college to mutual fund companies (AMCs), brokerages, or corporate finance teams.",
      },
    ],
  },

  "investment-banker": {
    keyModules: ["numerical", "verbal", "leadership"],
    keyModuleThreshold: 60,
    alignedRiasec: ["E", "C", "I"],
    minGritLevel: "High",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Build exceptional Mathematics and Economics skills",
        detail:
          "Investment banking involves complex financial modeling. Strong Maths and Economics in Grade 9–10 directly feeds into the analytical skills needed in banking interviews.",
      },
      {
        label: "Study real M&A deals and corporate transactions",
        detail:
          "Tata acquiring Jaguar Land Rover, Reliance acquiring Jio platforms, Zomato's IPO. Reading the business rationale behind these builds financial intuition that no textbook can.",
      },
      {
        label: "Consider PCM or Commerce stream",
        detail:
          "Both paths work for investment banking — IITs + MBA is one route; Commerce + CA/MBA is another. PCM gives IIT access; Commerce gives direct finance foundation.",
      },
      {
        label: "Start reading WSJ, Financial Times, or Bloomberg",
        detail:
          "Knowing market terminology — yield curves, deal multiples, EBITDA — from early makes later learning in college significantly faster. Build the vocabulary now.",
      },
      {
        label: "Develop persuasion and public speaking skills",
        detail:
          "Investment banking pitch books require both analytical precision and compelling narrative. Debate, MUN, or extempore speaking practice now directly develops this skill.",
      },
    ],
    steps1112: [
      {
        label: "IIT or top NIT + IIM is the most common Indian IB path",
        detail:
          "Top IIMs place 5–15 students annually in bulge-bracket banks (Goldman Sachs, Morgan Stanley, JPMorgan, Citi). This is the highest-probability route for domestic Indian students.",
      },
      {
        label: "Alternative: SRCC Economics + MBA abroad",
        detail:
          "BSc Economics at SRCC, LSR, or Presidency College followed by MBA at LSE, LBS, or INSEAD is a well-trodden path to global investment banking roles.",
      },
      {
        label: "Complete Investment Banking prep programs",
        detail:
          "Wall Street Prep, Breaking Into Wall Street (BIWS), or AltFinance preparation programs are widely used by aspirants. Technical interviews test DCF, comparable company analysis, and merger modeling.",
      },
      {
        label:
          "Excel in Accounting, Corporate Finance, and Valuation coursework",
        detail:
          "These technical skills are tested in every IB interview. Treat these college courses with the same intensity as competitive exam preparation — they directly determine placement.",
      },
      {
        label: "Network aggressively through college alumni",
        detail:
          "Investment banking placement is relationship-driven. Every senior from your institution in the industry is a door-opener. LinkedIn outreach to alumni with a specific, genuine question has a high response rate.",
      },
    ],
  },

  actuary: {
    keyModules: ["numerical", "logical", "scientific"],
    keyModuleThreshold: 65,
    alignedRiasec: ["I", "C", "R"],
    minGritLevel: "High",
    needsGrowthMindset: false,
    steps910: [
      {
        label:
          "Build the strongest possible Mathematics and Statistics foundation",
        detail:
          "Actuarial exams are mathematics-heavy and passed on quantitative ability alone. If you are not genuinely strong in Maths now, this career requires serious honest self-assessment.",
      },
      {
        label:
          "Excel in PCM — Mathematics at the highest level is non-negotiable",
        detail:
          "Actuarial science is one of the few careers where mathematics ability is a near-complete predictor of success. No workaround exists — mathematical rigor is the job.",
      },
      {
        label: "Familiarize with probability concepts early",
        detail:
          "Probability theory underpins all actuarial science. The Probability and Statistics chapter in Grade 10–11 Maths is directly tested in actuarial exams. Master it thoroughly.",
      },
      {
        label: "Research the Institute of Actuaries of India exam structure",
        detail:
          "There are 9 levels of IAI actuarial exams, typically taking 5–8 years to complete. Understanding the full path before committing helps with realistic planning.",
      },
      {
        label: "Consider Computer Science as 5th subject",
        detail:
          "R and Python skills complement actuarial exams significantly. Many actuarial roles involve data modeling and statistical programming — technical skills add ₹2–4 LPA to entry packages.",
      },
    ],
    steps1112: [
      {
        label: "Clear early IAI actuarial papers while in college",
        detail:
          "Many actuarial students begin CT1/CM1 (now CS1, CM1) papers during undergraduate years. Papers cleared before graduation give significant advantage in the job market — employers value early progress.",
      },
      {
        label: "Target B.Sc Statistics/Mathematics at IIT or top university",
        detail:
          "IIT Kanpur, IIT Bombay Statistics programs or B.Sc Mathematics at SRCC, ISI Kolkata provide the strongest foundation. The actuarial exams are the qualification — the degree builds the foundation.",
      },
      {
        label: "Join IAI Student membership immediately",
        detail:
          "Access to study materials, mock exams, and student communities significantly improves exam success rates. IAI membership is ₹2,000/year — the highest ROI investment in actuarial preparation.",
      },
      {
        label: "Intern at LIC, HDFC Life, ICICI Prudential, or a reinsurer",
        detail:
          "LIC, HDFC Life, Max Life, Munich Re, and Swiss Re are the main actuarial employers in India. Most actuarial hiring happens through internship-to-full-time conversion.",
      },
      {
        label: "Learn Prophet or Moses actuarial modeling software",
        detail:
          "Prophet is the most used actuarial modeling platform in Indian life insurance. Hands-on modeling software experience is valued by all actuarial employers — student versions are available.",
      },
    ],
  },

  // ─── NEW CAREER BRIDGE ENTRIES ─────────────────────────────────────────────────

  "public-policy-analyst": {
    keyModules: ["verbal", "logical", "numerical"],
    keyModuleThreshold: 55,
    alignedRiasec: ["I", "E", "S"],
    minGritLevel: "Medium",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Develop strong analytical thinking and writing",
        detail:
          "Policy work requires building and defending arguments with evidence. Practice writing 200-word opinion pieces on current events — the discipline of structured argumentation is the core skill.",
      },
      {
        label: "Study Economics and Political Science at depth",
        detail:
          "These are the core disciplines of public policy. Read your board textbooks carefully — Economic Survey summaries and NCERT Political Science build the conceptual foundation.",
      },
      {
        label:
          "Follow government budgets, census reports, and scheme announcements",
        detail:
          "Understanding how government decisions are made, evaluated, and debated is foundational to policy work. Read one government report or policy analysis per month.",
      },
      {
        label: "Consider Commerce or Arts stream",
        detail:
          "Economics (Hons) is the most direct undergraduate path to public policy. Both Commerce (with Economics) and Arts (with Political Science) work well — stream determines which subjects you go deep in.",
      },
      {
        label: "Read India's major policy documents",
        detail:
          "National Education Policy 2020, Economic Survey, and India Human Development Reports are written by policy analysts. Reading these shows you the quality of thinking the profession demands.",
      },
    ],
    steps1112: [
      {
        label: "Target BA Economics or Political Science at top colleges",
        detail:
          "BA Economics (Hons) at Delhi University (SRCC, Miranda, LSR), Jadavpur, or Presidency is the standard entry path. These programs build analytical foundations required for policy Masters programs.",
      },
      {
        label: "Apply for Masters in Public Policy at ISB or IIM Bangalore",
        detail:
          "ISB Hyderabad MPP, IIM Bangalore MPPG, and National Law School are India's strongest domestic policy programs. Abroad: LSE, Harvard Kennedy School, SIPA Columbia for internationally oriented roles.",
      },
      {
        label: "Intern at India's top policy think tanks",
        detail:
          "Takshashila Institution, ORF (Observer Research Foundation), and CPR (Centre for Policy Research) are the best India policy think tanks. Internships here are career-defining for policy aspirants.",
      },
      {
        label: "Learn data analysis tools",
        detail:
          "R, STATA, or Python for policy analysis — quantitative evidence is increasingly required for credible policy work. Even basic data literacy differentiates policy candidates significantly.",
      },
      {
        label: "Write regularly and publish",
        detail:
          "Policy briefs, op-eds, and research notes published before graduation strengthen Masters applications significantly. The Wire, The Print, and Economic and Political Weekly (EPW) publish student work.",
      },
    ],
  },

  "civil-engineer": {
    keyModules: ["numerical", "scientific", "logical"],
    keyModuleThreshold: 55,
    alignedRiasec: ["R", "I", "C"],
    minGritLevel: "Medium",
    needsGrowthMindset: false,
    steps910: [
      {
        label:
          "Build rock-solid Physics, Mathematics, and Chemistry foundations",
        detail:
          "Structural mechanics, thermodynamics, and material science are PCM concepts applied directly in civil engineering. Consistent above-average marks in these three are the baseline requirement.",
      },
      {
        label: "Visit a construction site or infrastructure project",
        detail:
          "Civil engineering is physical and visible. Talking to site engineers and watching construction in progress demystifies the career and confirms whether hands-on work appeals to you.",
      },
      {
        label: "Develop spatial reasoning and drawing skills",
        detail:
          "AutoCAD and structural drawing are core tools. School technical drawing or art practice helps develop spatial visualization — the ability to think in 3D from 2D plans.",
      },
      {
        label: "PCM stream for Grade 11 is essential",
        detail:
          "Physics and Mathematics are mandatory for all engineering entrance exams. Chemistry is important for material testing and construction chemistry. Do not choose PCB if civil engineering is the goal.",
      },
      {
        label:
          "Participate in bridge-building or earthquake-resistant structure competitions",
        detail:
          "National engineering competitions for school students exist (e.g. CBSE Science Exhibition, ASCE Student Competitions). These directly develop civil engineering intuition and are excellent portfolio entries.",
      },
    ],
    steps1112: [
      {
        label: "Target JEE Main for NIT or IIIT Civil Engineering",
        detail:
          "NIT Trichy, NIT Warangal, NIT Surathkal, and IIT Roorkee have India's strongest civil engineering departments. JEE Main 95+ percentile targets top NITs — JEE Advanced opens IITs.",
      },
      {
        label: "State engineering exams for state government colleges",
        detail:
          "MHT-CET, AP EAPCET, KCET, and WBJEE cover civil engineering programs at state government colleges — often with lower fees and comparable placements for government sector roles.",
      },
      {
        label: "Build AutoCAD and STAAD Pro skills in college",
        detail:
          "AutoCAD and STAAD Pro are the two most-used structural design tools in India. Free student versions are available. Candidates who know these tools are preferred in campus hiring.",
      },
      {
        label: "Government sector is a major employer for civil engineers",
        detail:
          "CPWD, NHAI, Railways, PWD, and RITES hire thousands annually with job security and benefits. GATE score is required for PSU hiring — prepare for GATE alongside coursework from Year 3.",
      },
      {
        label:
          "IIT Roorkee and IIT Bombay CE have strong research and industry labs",
        detail:
          "Specialized pathways in geotechnical, structural, and water resources engineering are available at these institutes. Research publications and lab experience here significantly strengthen higher education applications abroad.",
      },
    ],
  },

  "mechanical-engineer": {
    keyModules: ["scientific", "numerical", "logical"],
    keyModuleThreshold: 55,
    alignedRiasec: ["R", "I", "C"],
    minGritLevel: "Medium",
    needsGrowthMindset: false,
    steps910: [
      {
        label: "Strengthen Physics and Mathematics — especially mechanics",
        detail:
          "Kinematics, thermodynamics, and Newton's laws of motion are the foundation of mechanical engineering. These chapters in Grade 9–10 Physics map directly to first-year engineering coursework.",
      },
      {
        label: "Learn to sketch and draw technical diagrams",
        detail:
          "Spatial visualization is critical for mechanical design. Practice isometric drawings, free-body diagrams, and orthographic projections — skills tested in engineering entrance exams.",
      },
      {
        label: "Explore a hands-on hobby related to machines",
        detail:
          "Electronics kits, robotics projects, mechanics models, or Arduino builds confirm interest and develop intuition for how systems work. Hands-on experience is the best career-interest test.",
      },
      {
        label: "PCM stream for Grade 11 is mandatory",
        detail:
          "Physics and Mathematics are mandatory for all engineering entrances. Chemistry is also tested. Do not choose PCB or Commerce if mechanical engineering is the goal.",
      },
      {
        label: "Watch manufacturing and engineering process documentaries",
        detail:
          "How It's Made, factory tour videos, and process engineering documentaries build intuition about manufacturing systems. This background knowledge helps enormously in first-year engineering.",
      },
    ],
    steps1112: [
      {
        label: "Target JEE Main/Advanced for IIT or NIT Mechanical Engineering",
        detail:
          "IIT Madras, IIT Bombay, NIT Trichy, and NIT Surathkal are the top ME departments in India. IIT Madras ME is ranked #1 for manufacturing and automotive research.",
      },
      {
        label:
          "Core industries: automotive, aerospace, manufacturing, oil & gas",
        detail:
          "Tata Motors, Mahindra R&D, Maruti Suzuki, HAL, ISRO, DRDO, and ONGC are major mechanical engineering employers. Research which sector appeals most — each has a different culture and growth path.",
      },
      {
        label: "Learn CAD tools: SolidWorks, CATIA, ANSYS FEA",
        detail:
          "Student versions of SolidWorks and ANSYS are free. These tools are expected in campus placements for design and simulation roles. Learn them before final year hiring season.",
      },
      {
        label: "GATE opens PSU jobs with strong government benefits",
        detail:
          "ONGC, BHEL, NTPC, and SAIL hire through GATE. Starting ₹8–12 LPA + government benefits makes this a strong alternative to private sector for students seeking stability.",
      },
      {
        label: "Core + IT is a fast-growing trend",
        detail:
          "Mechanical engineers who learn Python for automation, simulation, or IoT earn 40–60% premium over traditional ME roles. This combination is one of the most valuable in Indian manufacturing right now.",
      },
    ],
  },

  "electrical-engineer": {
    keyModules: ["scientific", "numerical", "logical"],
    keyModuleThreshold: 55,
    alignedRiasec: ["R", "I", "C"],
    minGritLevel: "Medium",
    needsGrowthMindset: false,
    steps910: [
      {
        label:
          "Build strong Physics (electricity and magnetism) and Mathematics",
        detail:
          "These are the exact topics that electrical engineering applies at higher levels. Electromagnetic induction, circuits, and wave optics in Grade 10–11 Physics are directly extended in EE college courses.",
      },
      {
        label: "Start with electronics hobby kits or Arduino",
        detail:
          "Hands-on circuit work — even basic LED circuits, sensors, and microcontroller projects — confirms interest and builds practical skills before formal study begins.",
      },
      {
        label: "PCM stream with Physics as primary focus for Grade 11",
        detail:
          "All engineering entrance exams test Physics heavily. For EE and ECE paths, Physics is more critical than Chemistry. Allocate study time accordingly.",
      },
      {
        label: "Understand the difference between EE and ECE",
        detail:
          "Electrical Engineering focuses on power systems and machines. Electronics/ECE focuses on circuits, signals, and communication. They diverge significantly at college level — research both before choosing a branch.",
      },
      {
        label:
          "Energy sector awareness: India's renewable energy boom needs EE talent",
        detail:
          "India's solar and wind energy capacity is growing at 25% annually. Electrical engineers who understand power electronics, grid systems, and EV technology are in extreme demand through 2030.",
      },
    ],
    steps1112: [
      {
        label: "Target JEE Main for NIT EE or ECE programs",
        detail:
          "IIT Bombay, IIT Delhi, and IIT Kharagpur have India's strongest EE/ECE programs. For NITs, NIT Trichy, NIT Warangal, and NIT Calicut EE/ECE are the top targets.",
      },
      {
        label: "Core sectors: Power, Telecom, Consumer Electronics, Automotive",
        detail:
          "NTPC and PowerGrid for power sector; Airtel and Jio R&D for telecom; Samsung and LG India R&D for consumer electronics. Each sector has a different tech stack and career growth path.",
      },
      {
        label: "GATE score opens NTPC, PowerGrid, and BHEL",
        detail:
          "These PSUs offer ₹9–14 LPA + government benefits and are highly competitive. NTPC hires ~200 EE/ECE engineers annually through GATE. Prepare for GATE from Year 3 of college.",
      },
      {
        label:
          "VLSI and semiconductor skills are among India's most valued right now",
        detail:
          "India's semiconductor policy is creating thousands of VLSI design jobs. Courses in digital design, HDL (VHDL/Verilog), and chip design at NIIT or VLSI Expert are increasingly career-defining.",
      },
      {
        label: "Renewable energy is the fastest-growing EE subfield",
        detail:
          "Rooftop solar, EV powertrains, and battery management systems are high-growth areas for EE graduates. Companies like Ola Electric, Tata Power Solar, and Adani Green are hiring aggressively.",
      },
    ],
  },

  "ux-ui-designer": {
    keyModules: ["creative", "verbal", "logical"],
    keyModuleThreshold: 50,
    alignedRiasec: ["A", "I", "E"],
    minGritLevel: "Low",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Start developing your visual sense today",
        detail:
          "Study logos, app interfaces, and websites around you. Ask 'why does this work or not work?' about every design you encounter. Visual critical thinking is the primary UX skill.",
      },
      {
        label: "Learn Canva first, then move to Figma",
        detail:
          "Canva builds basic design intuition. Figma is the industry standard for UI design and has a free tier for students. Moving from Canva to Figma is the standard beginner progression.",
      },
      {
        label: "Any stream works — Arts has the most direct alignment",
        detail:
          "Arts students have a visual head start. But UX/UI designers come from all streams — technology understanding (PCM) is valuable for product-focused UX roles. Choose stream based on other factors.",
      },
      {
        label: "Practice Typography — it is 40% of UI quality",
        detail:
          "Understanding font pairing, hierarchy, and readability transforms design quality immediately. Google Fonts has a free typography guide. Study it now and apply in all your design work.",
      },
      {
        label: "Create a small personal project for your portfolio",
        detail:
          "Redesign your school's notice board digitally. Create a mock app for a local business. Portfolio building starts in school for UX designers — employers look at work, not just education history.",
      },
    ],
    steps1112: [
      {
        label: "Complete Google UX Design Certificate on Coursera",
        detail:
          "This globally recognized, 6-month certificate is free to audit and teaches the full UX process from research to prototype. It is widely recognized by Indian tech employers as equivalent to course-level UX training.",
      },
      {
        label: "Build a portfolio of 3 case studies — not just screens",
        detail:
          "Research → problem → solution → metrics is the format. Employers evaluate problem framing and user research process, not just visual output. Each case study needs a documented reasoning trail.",
      },
      {
        label: "Target B.Des at NID Ahmedabad or IDC IIT Bombay",
        detail:
          "NID Ahmedabad (entrance: NID DAT) and IDC IIT Bombay (entrance: UCEED) are India's premier design schools. Symbiosis Institute of Design and Pearl Academy are strong alternatives.",
      },
      {
        label: "Learn user research methods",
        detail:
          "Interviews, usability tests, and card sorting are how UX designers generate insights. UX is 60% research, 40% design — candidates who demonstrate research skills are valued significantly more.",
      },
      {
        label: "Internship at a startup is the fastest learning path",
        detail:
          "Startups let junior designers own full features — you get 5x more experience per year than at large companies. Target Series A and Series B startups for internships in Year 2–3 of college.",
      },
    ],
  },

  "graphic-designer": {
    keyModules: ["creative", "verbal", "logical"],
    keyModuleThreshold: 45,
    alignedRiasec: ["A", "I", "E"],
    minGritLevel: "Low",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Start making things immediately",
        detail:
          "Posters, logos, and social media graphics for school events. Graphic design is learned by doing, not studying. The student who has made 50 posters by Grade 10 will outperform anyone who waited.",
      },
      {
        label: "Learn Canva → Photoshop → Illustrator in that order",
        detail:
          "Canva for beginners. Photoshop for photo manipulation and raster work. Illustrator for vector/logo work. Adobe Creative Cloud has discounted student subscriptions.",
      },
      {
        label: "Study design principles: CARP",
        detail:
          "Contrast, Alignment, Repetition, Proximity — these four principles explain 80% of what makes design work. Every design decision you make should be traceable to one of these principles.",
      },
      {
        label: "Any stream works — Arts has the most direct alignment",
        detail:
          "Graphic designers come from all streams. Arts gives a visual head start. But employers evaluate portfolio quality, not stream or marks — your design work matters more than your academic record.",
      },
      {
        label: "Build a social media presence for your work",
        detail:
          "A small but curated Instagram or Behance portfolio is worth more than a degree certificate for initial freelance clients. Start building your public design portfolio now.",
      },
    ],
    steps1112: [
      {
        label:
          "Bachelor's options: BFA, B.Des, or self-taught + portfolio path",
        detail:
          "BFA at Delhi College of Art or Jamia Millia; B.Des at NID or NIFT; B.Voc in Graphic Design at state colleges; or the self-taught + portfolio path (increasingly accepted by digital agencies and startups).",
      },
      {
        label: "Build a Behance portfolio with at least 5 polished projects",
        detail:
          "Most graphic design jobs are portfolio-reviewed before any interview. Your Behance or website is your first impression. Quality over quantity — 5 excellent projects beat 20 mediocre ones.",
      },
      {
        label:
          "Specialize early: branding, motion graphics, illustration, or publishing",
        detail:
          "Generalists earn less and are hired less than focused specialists. Choosing a specialization by final year of college significantly accelerates career progression and freelance income.",
      },
      {
        label: "Freelance while in college",
        detail:
          "Fiverr, Upwork, and direct social media client acquisition. Many graphic designers earn ₹30,000–1,00,000/month freelance by final year of college. Start small — ₹2,000 logo projects teach more than any course.",
      },
      {
        label: "Adobe Certified Professional certification",
        detail:
          "Widely recognized, relatively affordable, and adds credibility to portfolio for clients who need to justify hiring decisions. Complete either Photoshop or Illustrator certification — not both initially.",
      },
    ],
  },

  "teacher-educator": {
    keyModules: ["verbal", "leadership", "creative"],
    keyModuleThreshold: 50,
    alignedRiasec: ["S", "A", "E"],
    minGritLevel: "Medium",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Identify your strongest subject first",
        detail:
          "Good teachers are deep subject experts first. Becoming a great Mathematics, History, or Biology teacher requires genuine mastery of the subject. The teaching skill is built on top of subject expertise.",
      },
      {
        label: "Practice explaining concepts to others",
        detail:
          "Tutor younger siblings or classmates. Volunteer for school peer-teaching programs. If you enjoy making someone understand something difficult, that is the strongest signal that teaching is right for you.",
      },
      {
        label: "Any stream can lead to teaching",
        detail:
          "Subject determines stream: Arts for Humanities teaching, PCB for Science, Commerce for Economics and Business. Choose the stream that aligns with the subject you most want to teach.",
      },
      {
        label: "Read about India's education challenges",
        detail:
          "NEP 2020, foundational literacy gaps, and ASER reports document India's learning crisis. Understanding the context of India's education system gives purpose and direction to a teaching career.",
      },
      {
        label: "Government school teaching offers stability and social impact",
        detail:
          "Central and state government teaching positions offer permanent employment and pension. Private school teaching in metro cities offers higher initial salaries. Both paths are legitimate — choose based on your priorities.",
      },
    ],
    steps1112: [
      {
        label: "B.Ed is the mandatory teaching qualification",
        detail:
          "CTET and state TET are required for government school appointment. Start planning for B.Ed immediately after graduation. Most B.Ed programs are 2 years and require a graduation degree first.",
      },
      {
        label: "Target top B.Ed colleges for quality training",
        detail:
          "Jamia Millia, TISS Mumbai, IGNOU (flexible B.Ed), Amity, and state B.Ed colleges. NCTE-recognized programs are the quality benchmark — verify NCTE recognition before applying.",
      },
      {
        label: "CTET or State TET is the gate for government school teaching",
        detail:
          "Clearing CTET (Central Teacher Eligibility Test) or your state's TET is mandatory for government school appointment. These can be attempted alongside or after B.Ed. Pass rate is 15–25% — prepare seriously.",
      },
      {
        label: "International school pathway for premium salaries",
        detail:
          "IGCSE and IB certified teachers earn ₹6–18 LPA at international schools. Cambridge and IB certification training is available post-B.Ed. International school teaching requires strong English and subject expertise.",
      },
      {
        label: "EdTech is a parallel track for digital educators",
        detail:
          "BYJU's, Unacademy, Vedantu, and Schoolnet hire educators for digital content. ₹4–8 LPA for educators with subject expertise and communication skills. The demand for quality online content creators is growing rapidly.",
      },
    ],
  },

  "edtech-professional": {
    keyModules: ["verbal", "creative", "leadership"],
    keyModuleThreshold: 50,
    alignedRiasec: ["E", "A", "S"],
    minGritLevel: "Medium",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Develop strong communication and presentation skills",
        detail:
          "EdTech professionals are educators who can explain clearly and engagingly. The ability to simplify complex topics is the core skill — practice this in every subject you study.",
      },
      {
        label: "Explore YouTube education channels",
        detail:
          "3Blue1Brown, Kurzgesagt, and Khan Academy. Study how they make complex topics compelling — visual storytelling, pacing, analogies. These techniques are directly applicable to EdTech content creation.",
      },
      {
        label:
          "Any stream works — identify your intersection of subject and technology",
        detail:
          "EdTech roles span pedagogy, product, content, and data. Your strongest subject combined with an interest in technology is the starting point. Both Arts and PCM students thrive in EdTech.",
      },
      {
        label: "Learn basic video editing",
        detail:
          "CapCut or DaVinci Resolve for short explainer videos. EdTech content creation is a growing and well-paying skill set. Starting early with basic video production builds a competitive advantage.",
      },
      {
        label:
          "Identify the intersection of your best subject and technology interest",
        detail:
          "The most valuable EdTech professionals combine deep subject expertise with technology understanding. What subject do you know best? What technology interests you most? That intersection is your starting point.",
      },
    ],
    steps1112: [
      {
        label:
          "Target BBA, B.Tech, or B.Com at institutes with EdTech connections",
        detail:
          "IIT Mumbai and IIT Delhi alumni networks are strong in BYJU's, Unacademy, and upGrad. Strong tech + education combination opens product and engineering roles at India's largest EdTech companies.",
      },
      {
        label: "EdTech roles are diverse — choose your track early",
        detail:
          "Curriculum Designer (subject expertise + instructional design), Product Manager (tech + education), Educator/Tutor (live teaching), Data Analyst (learning outcomes), Sales (school/parent acquisition). Each has a different preparation path.",
      },
      {
        label:
          "Complete Google Teacher Center or Coursera's Learning How to Learn",
        detail:
          "These give foundational frameworks for instructional design — how adults and students actually learn. This knowledge differentiates EdTech educators from those who just record lectures.",
      },
      {
        label:
          "Intern at BYJU's, Unacademy, Vedantu, or smaller EdTech startups",
        detail:
          "The sector is hiring broadly and internships often convert to full-time roles. Smaller EdTech startups give broader exposure — a junior person at a 20-person startup touches more functions than at BYJU's.",
      },
      {
        label:
          "Adaptive learning and AI tutoring skills make EdTech professionals 3-5x more valuable",
        detail:
          "Skills in Python, ML basics, or prompt engineering for AI tutoring systems are increasingly differentiating. The EdTech leaders of 2028–2030 will be the people learning these now.",
      },
    ],
  },

  "mba-business-manager": {
    keyModules: ["leadership", "verbal", "numerical"],
    keyModuleThreshold: 55,
    alignedRiasec: ["E", "S", "C"],
    minGritLevel: "Medium",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Study how businesses work from real examples",
        detail:
          "Read the business section of newspapers, watch Shark Tank India, and follow Indian startup stories on Inc42. Business intuition is built through observation — not just textbooks.",
      },
      {
        label: "Develop leadership skills through school activities",
        detail:
          "Student council, club leadership, and event organization all develop the skills business managers use daily. Leading a school event teaches more about management than any case study.",
      },
      {
        label: "Commerce stream for Grade 11 is the most direct path",
        detail:
          "Economics, Accountancy, and Business Studies directly map to MBA coursework. PCM students can also enter business management but will need to supplement with commerce fundamentals.",
      },
      {
        label: "Learn Excel and basic financial analysis",
        detail:
          "These are used on Day 1 of most MBA programs and in most business roles. Free Excel courses on Coursera or Microsoft Learn cover the essentials in under 10 hours.",
      },
      {
        label: "Study successful Indian businesses and founders",
        detail:
          "Infosys (Narayana Murthy), Reliance (Dhirubhai Ambani), Zomato (Deepinder Goyal). Understanding what decisions shaped these companies builds strategic thinking that MBA programs look for in candidates.",
      },
    ],
    steps1112: [
      {
        label: "B.Com, BBA, or B.Tech — all three work for IIM",
        detail:
          "Work experience of 2–4 years post-graduation before CAT significantly improves IIM admission chances. Most IIM A/B/C students have work experience. Plan undergraduate education with this in mind.",
      },
      {
        label:
          "CAT is the gateway to IIMs — India's most competitive management entrance",
        detail:
          "IIM A/B/C placements average ₹25–35 LPA. CAT 99+ percentile is required for top IIMs. 2–3 years of preparation post-graduation while working is the standard approach.",
      },
      {
        label: "Alternative MBA programs: XLRI, IIFT, ISB, SP Jain, MDI",
        detail:
          "XLRI (via XAT) for HR and Business; IIFT for International Business; ISB Hyderabad for experienced professionals; SP Jain for general management. Each has a different focus and alumni network.",
      },
      {
        label: "One quality internship per college year",
        detail:
          "Management consulting, FMCG, financial services, or startups each develop different business skills. Summer internship in Grade 2–3 of college is the primary placement track at IIM feeder colleges.",
      },
      {
        label: "MBA specialization matters — choose based on strengths",
        detail:
          "Finance, Marketing, Operations, Analytics, and HR each have different salary trajectories and skill requirements. Choose based on your genuine strengths and interests, not just salary tables.",
      },
    ],
  },

  "hr-professional": {
    keyModules: ["verbal", "leadership", "logical"],
    keyModuleThreshold: 50,
    alignedRiasec: ["S", "E", "C"],
    minGritLevel: "Low",
    needsGrowthMindset: true,
    steps910: [
      {
        label: "Build empathy and communication as your primary skills",
        detail:
          "HR is fundamentally about understanding people and solving human problems. Practice active listening — truly hearing what people are saying, not just waiting for your turn to speak.",
      },
      {
        label: "Commerce or Arts stream works well",
        detail:
          "Business Studies, Economics, Psychology, and Sociology all feed into HR competency. Choose the stream that includes the subjects you genuinely find interesting.",
      },
      {
        label: "Participate in school events as an organizer",
        detail:
          "Event management, team coordination, and conflict resolution are HR skills in miniature. Every time you coordinate a team, negotiate between two groups, or solve an interpersonal problem, you are practicing HR.",
      },
      {
        label: "Develop basic labor law awareness",
        detail:
          "Minimum Wages Act, EPF, Shops and Establishment Act — these govern every HR professional's day-to-day work. Basic awareness of these from school gives you a head start in any HR conversation.",
      },
      {
        label: "Follow modern HR thinking",
        detail:
          "Josh Bersin, SHRM India, and People Matters cover people analytics, remote work, and DEI trends. Building professional vocabulary and awareness of HR trends sets you apart from peers entering the field.",
      },
    ],
    steps1112: [
      {
        label: "BBA with HR specialization, BA Psychology, or B.Com",
        detail:
          "All three lead to MBA HR or MHRM (Masters in HRM). Psychology backgrounds are increasingly valued in HR for organizational behavior expertise. Choose based on where you are strongest.",
      },
      {
        label: "Target XLRI MHRM — India's top HR program",
        detail:
          "XLRI Jamshedpur MHRM (via XAT), TISS Mumbai, and SIBM Pune are the top HR programs in India. XLRI MHRM placements average ₹14–18 LPA with the strongest HR alumni network in India.",
      },
      {
        label: "Internship in HR at any company in Year 2",
        detail:
          "Talent acquisition, payroll, or generalist HR roles give breadth across HR functions. Even 2 months of HR internship is valued significantly more than classroom knowledge in HR job applications.",
      },
      {
        label: "Learn HR tools: SAP SuccessFactors, Darwinbox, or Keka",
        detail:
          "These are India's top HRMS platforms. Candidates who know the tools get hired faster and start at higher salaries. Most have free trial versions for practice.",
      },
      {
        label: "People Analytics is the fastest-growing HR specialization",
        detail:
          "Excel, Power BI, or basic Python for HR data analysis earns 40–60% premium over traditional HR roles. HR analytics skills are scarce and in high demand — invest in them now.",
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
