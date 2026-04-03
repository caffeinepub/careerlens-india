export interface Institute {
  name: string;
  locationOrCountry: string;
  instituteType: string;
  note: string;
}

export interface EntranceExam {
  name: string;
  description: string;
}

export interface MythVsReality {
  myth: string;
  reality: string;
}

export interface DayBlock {
  time: string;
  title: string;
  detail: string;
  tools?: string[];
}

export interface DayInTheLifeStructured {
  earlyCareer: DayBlock[];
  established: DayBlock[];
}

export interface TimeTier {
  years: string;
  label: string;
  qualification: string;
  route: string;
  entryRole: string;
  salaryRange: string;
  cost: string;
  ladderNote: string;
}

export interface CareerProfile {
  id: string;
  dayInTheLife: string;
  dayInTheLifeStructured?: DayInTheLifeStructured;
  timeTierRoadmap?: TimeTier[];
  skillsTechnical: string[];
  skillsSoft: string[];
  educationRoadmapGrade10: string;
  educationRoadmapUG: string;
  educationRoadmapPG: string;
  educationRoadmapPhD: string;
  topInstitutesIndia: Institute[];
  topInstitutesGlobal: Institute[];
  entranceExams: EntranceExam[];
  pros: string[];
  cons: string[];
  mythsVsReality: MythVsReality[];
  grade910SubjectFocus: string;
}

export const careerProfilesMap: Record<string, CareerProfile> = {
  "software-engineering": {
    id: "software-engineering",
    dayInTheLife:
      "Priya starts her day reviewing pull requests from her team at 9 AM, leaving comments on code architecture. By 10, she's in a 30-minute sprint stand-up with her product manager and designer. The rest of the morning is focused coding — she's building a new payment flow feature. After lunch, she debugs a production issue reported by a client, traces it to a database query, and deploys a fix. Late afternoon is a code review session and updating her team's technical documentation. She wraps up at 6:30, pushes her code, and queues tomorrow's tasks.",
    dayInTheLifeStructured: {
      earlyCareer: [
        {
          time: "9:00 AM",
          title: "Morning sync & code review",
          detail:
            "Join daily stand-up (15 min): share what you did yesterday, what you're doing today, any blockers. Then review pull requests assigned to you — read code carefully, leave specific comments.",
          tools: ["Slack", "GitHub / GitLab", "Jira"],
        },
        {
          time: "10:00 AM",
          title: "Deep work: feature development",
          detail:
            "Pick the top ticket from your sprint board. Write code, run unit tests, and refactor. Expect to spend 60-70% of your day here. Interruptions are the enemy — put on headphones.",
          tools: ["VS Code", "Git", "Postman (for API testing)"],
        },
        {
          time: "1:30 PM",
          title: "Debugging a production issue",
          detail:
            "A bug was reported by a user. You search logs, reproduce it locally, trace the root cause (often a database query or race condition), fix it, test the fix, get it reviewed, and deploy — all under pressure.",
          tools: [
            "Datadog / CloudWatch (logs)",
            "Chrome DevTools",
            "SQL client",
          ],
        },
        {
          time: "4:00 PM",
          title: "Sprint planning & documentation",
          detail:
            "Your team estimates upcoming tickets, breaks down a large feature into smaller tasks, and updates technical documentation. As a junior, you're learning to break down problems — this skill grows over time.",
          tools: ["Confluence", "Notion", "Figma (reading designs)"],
        },
        {
          time: "6:00 PM",
          title: "Push, wrap up, plan tomorrow",
          detail:
            "Commit and push your code. Write a brief update in the team channel. Check if you're on-call rotation tonight (every 3-4 weeks). Most days end here — crunch is occasional, not constant.",
          tools: ["GitHub PR", "Slack"],
        },
      ],
      established: [
        {
          time: "9:00 AM",
          title: "Architecture review",
          detail:
            "Senior engineers often start by reviewing system design documents, architecture proposals, or RFC (Request for Comments) documents. You're thinking about scalability, security, and maintainability — not just whether code runs.",
          tools: ["Notion", "Miro (diagramming)", "draw.io"],
        },
        {
          time: "10:30 AM",
          title: "Cross-team technical alignment",
          detail:
            "Meet with product, design, and infrastructure teams on an upcoming major feature. You're the technical voice — flagging risks, estimating complexity, and negotiating scope.",
          tools: ["Google Meet / Zoom", "JIRA", "Figma"],
        },
        {
          time: "1:00 PM",
          title: "Hands-on coding — still happening",
          detail:
            "Even senior engineers write code — typically on the hardest, highest-stakes parts of the system. Performance optimization, security fixes, or the core algorithm of a new product.",
          tools: ["VS Code / IntelliJ", "Profilers", "AWS / GCP Console"],
        },
        {
          time: "3:30 PM",
          title: "Mentoring junior engineers",
          detail:
            "Pair programming sessions, code review feedback, and 1:1 career conversations with 2-3 team members. Your technical knowledge multiplies through your team.",
          tools: ["GitHub", "VS Code Live Share"],
        },
        {
          time: "5:30 PM",
          title: "Incident review & system health",
          detail:
            "Review dashboards for system health. If there was an incident this week, lead the post-mortem: what broke, why, how to prevent recurrence. No blame — only learning.",
          tools: ["Datadog", "PagerDuty", "Confluence"],
        },
      ],
    },
    timeTierRoadmap: [
      {
        years: "1 yr",
        label: "Certificate / Short Program",
        qualification: "Programming Certificate (Python/Web Dev)",
        route: "NIIT, Aptech, or online (freeCodeCamp + portfolio)",
        entryRole: "Junior Programmer, IT Support, Data Entry Automation",
        salaryRange: "₹1.8L–₹3.5L/yr",
        cost: "₹10K–₹80K",
        ladderNote:
          "A strong GitHub portfolio from this year can qualify you for junior roles at startups. Many companies care more about projects than certificates. You can laterally enter a BCA/B.Tech later with work experience.",
      },
      {
        years: "2 yrs",
        label: "Diploma in CS / IT",
        qualification: "Diploma in Computer Science or Information Technology",
        route: "State Polytechnic, DOEACC, or CDAC Post-Diploma",
        entryRole: "Junior Developer, Technical Support Engineer",
        salaryRange: "₹2.5L–₹4.5L/yr",
        cost: "₹30K–₹1.5L",
        ladderNote:
          "Diploma holders can apply for lateral entry into Year 2 of B.Tech at most state and private universities, allowing you to complete a degree in 3 more years instead of 4.",
      },
      {
        years: "3 yrs",
        label: "BCA or B.Sc Computer Science",
        qualification: "BCA (Bachelor of Computer Applications) or B.Sc CS",
        route:
          "Any NAAC-accredited college; distance learning via IGNOU also valid",
        entryRole: "Software Developer, Web Developer, QA Engineer",
        salaryRange: "₹3.5L–₹7L/yr",
        cost: "₹60K–₹3L (total)",
        ladderNote:
          "BCA is accepted by most IT companies for entry-level roles. You can pursue MCA (2 years) later to reach the same level as a B.Tech graduate for senior roles.",
      },
      {
        years: "4 yrs",
        label: "B.Tech / BE in CSE or IT",
        qualification: "B.Tech Computer Science & Engineering (or IT)",
        route:
          "IITs (JEE Advanced), NITs (JEE Main), BITS (BITSAT), Private colleges (VITEEE, SRMJEE)",
        entryRole: "Software Engineer, Full Stack Developer, Data Engineer",
        salaryRange: "₹5L–₹20L/yr (IIT: ₹20L–₹60L+)",
        cost: "₹1.5L–₹15L/yr",
        ladderNote:
          "B.Tech is the benchmark qualification for software engineering. After 2-3 years of work experience, you can pursue M.Tech (GATE) or MBA (CAT) to accelerate to senior/leadership roles.",
      },
      {
        years: "6 yrs",
        label: "B.Tech + M.Tech / PG Diploma",
        qualification:
          "M.Tech Computer Science or PG Diploma in Specialization (AI/Cloud/Cybersecurity)",
        route:
          "IITs/NITs via GATE; CDAC PG Diplomas; Online MS (OMSCS Georgia Tech, IIT Madras)",
        entryRole: "Senior Software Engineer, Specialist / Tech Lead",
        salaryRange: "₹12L–₹35L/yr",
        cost: "₹1L–₹5L for M.Tech (subsidized); OMSCS ~₹1.5L total",
        ladderNote:
          "M.Tech or a strong specialization PG diploma significantly boosts compensation and opens research / specialist roles. Online MS programs from Georgia Tech or IIT Madras are globally recognized at a fraction of on-campus cost.",
      },
      {
        years: "8+ yrs",
        label: "PhD / Research Fellowship",
        qualification:
          "PhD in Computer Science (Algorithms, AI, Systems, Security)",
        route:
          "IISc Bangalore, IITs (via GATE+interview), or abroad (MIT, CMU, Stanford — often fully funded)",
        entryRole:
          "Research Scientist, Principal Engineer, Faculty / Professor",
        salaryRange: "₹20L–₹1Cr+ (Research labs, FAANG Research)",
        cost: "Often fully funded (stipend provided) at top institutions",
        ladderNote:
          "PhD opens doors to research labs (Google DeepMind, Microsoft Research, Meta AI) and tenured academic positions. At IITs and abroad, PhD students often receive a monthly stipend — it is not purely a cost but partially self-sustaining.",
      },
    ],
    skillsTechnical: [
      "Data Structures & Algorithms",
      "Python / Java / JavaScript",
      "Git & Version Control",
      "SQL and NoSQL Databases",
      "REST APIs & System Design",
      "Cloud (AWS/GCP/Azure)",
    ],
    skillsSoft: [
      "Logical Problem Solving",
      "Team Collaboration",
      "Clear Written Communication",
      "Attention to Detail",
      "Time Management",
    ],
    educationRoadmapGrade10:
      "Choose PCM stream (Physics, Chemistry, Mathematics). Start exploring Python basics — free resources on freeCodeCamp or CS50.",
    educationRoadmapUG:
      "B.Tech Computer Science (IITs, NITs, BITS, private colleges) or BCA + MCA. Focus on DSA, OS, DBMS, and Networks.",
    educationRoadmapPG:
      "M.Tech Computer Science or MBA (for product/management roles). IITs and IIITs offer excellent M.Tech programs.",
    educationRoadmapPhD:
      "Research-focused roles at labs (Microsoft Research, Google Brain, IIT research). PhD from IITs, IISc, or abroad (MIT, Stanford, CMU).",
    topInstitutesIndia: [
      {
        name: "IIT Bombay",
        locationOrCountry: "Mumbai",
        instituteType: "IIT",
        note: "Top CSE department, strong placement record",
      },
      {
        name: "IIT Delhi",
        locationOrCountry: "New Delhi",
        instituteType: "IIT",
        note: "Excellent research and industry connections",
      },
      {
        name: "NIT Trichy",
        locationOrCountry: "Tamil Nadu",
        instituteType: "NIT",
        note: "Top NIT for CSE, strong alumni network",
      },
      {
        name: "BITS Pilani",
        locationOrCountry: "Rajasthan",
        instituteType: "Deemed University",
        note: "Practice School program gives real industry exposure",
      },
      {
        name: "VIT Vellore",
        locationOrCountry: "Tamil Nadu",
        instituteType: "Private University",
        note: "Large intake, strong corporate tie-ups",
      },
    ],
    topInstitutesGlobal: [
      {
        name: "MIT",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "#1 CS program globally, research powerhouse",
      },
      {
        name: "Carnegie Mellon University",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "Best software engineering program in the world",
      },
      {
        name: "NUS Singapore",
        locationOrCountry: "Singapore",
        instituteType: "University",
        note: "Top Asia-Pacific option, pathway to Singapore work visa",
      },
      {
        name: "University of Toronto",
        locationOrCountry: "Canada",
        instituteType: "University",
        note: "Strong CS program, Canada PR pathway",
      },
      {
        name: "University of Edinburgh",
        locationOrCountry: "UK",
        instituteType: "University",
        note: "Top UK CS school, 2-year post-study work visa available",
      },
    ],
    entranceExams: [
      {
        name: "JEE Main & Advanced",
        description:
          "Primary entrance for IITs and NITs. Score above 99 percentile for top IITs.",
      },
      {
        name: "BITSAT",
        description:
          "BITS Pilani entrance exam. Tests Physics, Chemistry, Maths and English.",
      },
      {
        name: "VITEEE",
        description:
          "VIT Engineering Entrance Exam. Separate test, not JEE-based.",
      },
    ],
    pros: [
      "Very high demand — India has 1M+ unfilled tech jobs",
      "Remote work opportunities globally",
      "High salary growth — can reach ₹50L+ within 8 years",
    ],
    cons: [
      "Competitive job market — top companies are very selective",
      "Constant skill upgrading required (technology changes fast)",
      "Can be sedentary — long hours at a desk",
    ],
    mythsVsReality: [
      {
        myth: "You need to be a math genius to be a software engineer",
        reality:
          "You need logical thinking, not advanced maths. Most coding uses Class 10-level arithmetic.",
      },
      {
        myth: "Only IIT graduates get top jobs",
        reality:
          "IIT is an advantage, not a requirement. Many top engineers come from tier-2 colleges with strong GitHub portfolios.",
      },
    ],
    grade910SubjectFocus:
      "Focus on Mathematics (especially Algebra and Logic) and Computer Science if offered. Start practicing on platforms like Scratch, Code.org, or Python Turtle. Join your school's coding club or participate in Atal Tinkering Labs.",
  },

  "data-science": {
    id: "data-science",
    dayInTheLife:
      "Arjun opens his day reviewing the overnight model performance metrics for a fraud detection system he built. By 9:30 he's cleaning a messy customer dataset — filling missing values and removing duplicates. At 11, he presents last week's churn analysis to the product team. After lunch, he trains a new classification model, comparing accuracy across three algorithms. At 3 PM, a data engineer connects to discuss pipeline improvements. He ends the day writing a notebook documenting his model results.",
    dayInTheLifeStructured: {
      earlyCareer: [
        {
          time: "9:00 AM",
          title: "Data cleaning & exploration",
          detail:
            "Open the raw dataset you've been assigned. Check for missing values, inconsistent formatting, and outliers. This is 50-70% of a junior data analyst's time — unglamorous but mission-critical.",
          tools: ["Jupyter Notebook", "Pandas", "Excel"],
        },
        {
          time: "11:00 AM",
          title: "Build and run basic analysis",
          detail:
            "Calculate summary statistics, plot distributions, run correlation analysis. Write a short findings summary. You're answering a specific business question: 'Why did sales drop in Q3?'",
          tools: ["Python (Matplotlib / Seaborn)", "Tableau", "SQL"],
        },
        {
          time: "1:30 PM",
          title: "Dashboard update",
          detail:
            "Update the weekly KPI dashboard with the latest data. Add a callout for an anomaly you spotted. Share with the business team via Slack with a 2-line explanation.",
          tools: ["Tableau / Power BI", "Looker", "Notion"],
        },
        {
          time: "3:00 PM",
          title: "First ML experiment",
          detail:
            "Train a simple logistic regression model for customer churn prediction. Evaluate accuracy, precision, recall. Compare against baseline. Document everything in a notebook so the team can reproduce.",
          tools: ["Scikit-learn", "Jupyter", "MLflow (experiment tracking)"],
        },
        {
          time: "5:00 PM",
          title: "Team stand-up & learning",
          detail:
            "Brief daily check-in with the data team. Then spend 30 minutes on a Kaggle competition or reading a new technique. Junior data scientists who invest in learning grow 3x faster.",
          tools: ["Kaggle", "Towards Data Science", "Arxiv (papers)"],
        },
      ],
      established: [
        {
          time: "9:00 AM",
          title: "Model performance review",
          detail:
            "Check automated model monitoring dashboards. Are production models drifting? Is the fraud detection model showing unusual false-positive rates? Investigate anomalies before the business team notices.",
          tools: ["MLflow", "Great Expectations", "Evidently AI"],
        },
        {
          time: "10:30 AM",
          title: "Stakeholder presentation",
          detail:
            "Present last week's churn analysis to the product and marketing team. Translate technical findings into business decisions: 'Customers who don't use Feature X within 14 days churn at 3x rate.'",
          tools: ["Google Slides", "Tableau", "Streamlit (live demo app)"],
        },
        {
          time: "1:00 PM",
          title: "Designing a new model pipeline",
          detail:
            "Work with data engineers to design a real-time recommendation model pipeline. Define data contracts, feature stores, retraining frequency. You're an architect now, not just an analyst.",
          tools: ["Apache Airflow", "Feature Store (Feast)", "AWS SageMaker"],
        },
        {
          time: "3:30 PM",
          title: "Research reading & hypothesis generation",
          detail:
            "Read 1-2 recent papers or technical blog posts. Identify a technique that could improve your current model. Write a 1-page proposal to test it next sprint.",
          tools: ["Arxiv", "Papers With Code", "Google Scholar"],
        },
        {
          time: "5:30 PM",
          title: "Mentoring & documentation",
          detail:
            "Review junior team members' notebooks. Leave specific, constructive feedback. Update the team's model registry and documentation so institutional knowledge doesn't disappear when people leave.",
          tools: ["GitHub", "Confluence", "MLflow Model Registry"],
        },
      ],
    },
    timeTierRoadmap: [
      {
        years: "1 yr",
        label: "Certificate / Short Program",
        qualification: "Data Analytics Certificate",
        route:
          "Google Data Analytics Certificate (Coursera) + Excel + SQL + Tableau",
        entryRole: "Junior Data Analyst, Business Intelligence Analyst",
        salaryRange: "₹2.5L–₹4.5L/yr",
        cost: "₹15K–₹50K",
        ladderNote:
          "Entry-level data analyst roles are increasingly accessible with certificates + a strong portfolio of Kaggle projects. You can pursue B.Sc Data Science (IIT Madras online) alongside work to upgrade qualifications.",
      },
      {
        years: "2 yrs",
        label: "Diploma in Data Science",
        qualification: "PG Diploma in Data Science or Business Analytics",
        route: "CDAC, UpGrad, Great Learning, IIIT Bangalore PG programs",
        entryRole: "Data Analyst, Analytics Associate",
        salaryRange: "₹3.5L–₹7L/yr",
        cost: "₹80K–₹2.5L",
        ladderNote:
          "PG diploma programs with placement support are effective entry points. Choose programs with real project work and an active alumni network. After 2 years of work experience, you can apply for senior analyst / junior data scientist roles.",
      },
      {
        years: "3 yrs",
        label: "B.Sc Statistics / Mathematics / CS",
        qualification: "B.Sc Statistics, Mathematics, or Computer Science",
        route:
          "Any NAAC-A accredited college; IIT Madras BS Data Science (online qualifier)",
        entryRole: "Data Scientist, ML Analyst",
        salaryRange: "₹4L–₹9L/yr",
        cost: "₹60K–₹2.5L/yr",
        ladderNote:
          "B.Sc Statistics or Mathematics combined with self-taught Python / ML skills is a powerful combination. After 1-2 years of experience, you can pursue M.Sc Statistics or Data Science for accelerated growth.",
      },
      {
        years: "4 yrs",
        label: "B.Tech CSE / B.Sc + Online Specialization",
        qualification:
          "B.Tech CSE or B.Sc + Machine Learning Specialization (Coursera/edX)",
        route: "IITs, NITs (JEE), IIT Madras BS Data Science, BITS Pilani",
        entryRole: "Data Scientist, ML Engineer (Junior)",
        salaryRange: "₹7L–₹18L/yr",
        cost: "₹1L–₹12L/yr depending on institution",
        ladderNote:
          "B.Tech CSE is the most direct path to data science at top companies. Strong Python, SQL, and Statistics skills are more important than the degree tier for most mid-market roles.",
      },
      {
        years: "6 yrs",
        label: "Masters in Data Science / Statistics",
        qualification: "M.Tech Data Science or MSc Statistics / Analytics",
        route:
          "IIT Hyderabad, IIT Madras, IIIT Hyderabad, ISI Kolkata, or Online MS (Georgia Tech, IIT Madras)",
        entryRole: "Senior Data Scientist, ML Engineer, Research Scientist",
        salaryRange: "₹14L–₹35L/yr",
        cost: "₹1L–₹6L (M.Tech, subsidized); Online MS ~₹2L total",
        ladderNote:
          "Masters degree significantly improves access to research-oriented roles and senior positions. ISI Kolkata and IGIDR are India's most respected statistics programs for quantitative careers.",
      },
      {
        years: "8+ yrs",
        label: "PhD / Research Fellowship",
        qualification:
          "PhD in Machine Learning, Statistics, or Computational Science",
        route:
          "IISc, IIT Madras, CMU, Stanford, MIT, University of Toronto (often fully funded)",
        entryRole: "Principal Scientist, Research Lead, Faculty",
        salaryRange: "₹25L–₹1Cr+ (top research labs)",
        cost: "Often fully funded with stipend",
        ladderNote:
          "A PhD in ML/Statistics opens doors to top AI research labs globally (Google DeepMind, Microsoft Research, Meta AI). Many PhD graduates return to India at significantly higher compensation than industry peers.",
      },
    ],
    skillsTechnical: [
      "Python (Pandas, NumPy, Scikit-learn)",
      "SQL",
      "Statistics & Probability",
      "Machine Learning fundamentals",
      "Data Visualization (Tableau, Power BI, Matplotlib)",
      "Big Data (Spark, Hadoop basics)",
    ],
    skillsSoft: [
      "Analytical Thinking",
      "Storytelling with Data",
      "Curiosity and Hypothesis Thinking",
      "Business Acumen",
      "Clear Presentation Skills",
    ],
    educationRoadmapGrade10:
      "Choose PCM stream. Focus on Mathematics — especially Statistics and Probability. Start exploring Excel for data analysis.",
    educationRoadmapUG:
      "B.Tech CSE / B.Sc Statistics / B.Sc Mathematics. Take online courses in Python and Machine Learning from Year 2 onwards.",
    educationRoadmapPG:
      "M.Tech Data Science / MSc Statistics / MBA Business Analytics. IIT Hyderabad, IIT Madras, IIIT Hyderabad offer excellent programmes.",
    educationRoadmapPhD:
      "Research in ML/AI/Statistics at IITs, IISc or abroad. CMU, Stanford, MIT, University of Cambridge are leading research institutions.",
    topInstitutesIndia: [
      {
        name: "IISc Bangalore",
        locationOrCountry: "Bangalore",
        instituteType: "Deemed University",
        note: "India's best research institution for data & AI",
      },
      {
        name: "IIT Madras",
        locationOrCountry: "Chennai",
        instituteType: "IIT",
        note: "First Indian university to offer a BS in Data Science (online too)",
      },
      {
        name: "IIIT Hyderabad",
        locationOrCountry: "Hyderabad",
        instituteType: "IIIT",
        note: "Strong ML research, industry-aligned curriculum",
      },
      {
        name: "ISI Kolkata",
        locationOrCountry: "Kolkata",
        instituteType: "Statistical Institute",
        note: "India's premier statistics institution",
      },
      {
        name: "Symbiosis Institute of Technology",
        locationOrCountry: "Pune",
        instituteType: "Private University",
        note: "Strong analytics program, good industry connections",
      },
    ],
    topInstitutesGlobal: [
      {
        name: "Carnegie Mellon University",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "#1 for Machine Learning globally",
      },
      {
        name: "Stanford University",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "Home of Andrew Ng's famous ML courses, top AI research",
      },
      {
        name: "University of Cambridge",
        locationOrCountry: "UK",
        instituteType: "University",
        note: "MPhil in Machine Learning, strong research culture",
      },
      {
        name: "ETH Zurich",
        locationOrCountry: "Switzerland",
        instituteType: "University",
        note: "Top European technical university, strong data science faculty",
      },
      {
        name: "National University of Singapore",
        locationOrCountry: "Singapore",
        instituteType: "University",
        note: "Best in Asia-Pacific for data science",
      },
    ],
    entranceExams: [
      {
        name: "JEE Main & Advanced",
        description:
          "For IIT/NIT admissions. Target CSE or Mathematics & Computing branches.",
      },
      {
        name: "JAM",
        description:
          "Joint Admission Test for MSc at IITs — for Statistics, Mathematics, or Physics graduates.",
      },
      {
        name: "GATE",
        description:
          "Graduate Aptitude Test for M.Tech at IITs/NITs. CS and Statistics papers relevant.",
      },
    ],
    pros: [
      "Highest salary growth of any Indian profession in the last 5 years",
      "Work across any industry — healthcare, finance, e-commerce, government",
      "High creative satisfaction — every dataset is a new puzzle",
    ],
    cons: [
      "Requires continuous learning — tools and techniques evolve rapidly",
      "Entry-level roles can feel like 80% data cleaning, 20% insights",
      "Can be frustrating when business teams don't act on findings",
    ],
    mythsVsReality: [
      {
        myth: "Data Science is only for people with a PhD",
        reality:
          "Most data scientists in India have a bachelor's degree. Strong Python, SQL and Statistics skills matter far more than a PhD.",
      },
      {
        myth: "Data Science will be automated away by AI",
        reality:
          "AI tools help data scientists work faster, but human judgment, business context, and communication are irreplaceable.",
      },
    ],
    grade910SubjectFocus:
      "Strengthen Mathematics — focus on Statistics and Probability chapters. Learn to use spreadsheets (Excel/Google Sheets) for data analysis. Explore free courses on Kaggle Learn for Python basics.",
  },

  cybersecurity: {
    id: "cybersecurity",
    dayInTheLife:
      "Kiran's morning starts with reviewing the SIEM dashboard for overnight alerts — she spots an unusual login pattern from a foreign IP and escalates it to the incident response team. By 10 she's on a call reviewing the security architecture for a new payment feature. After lunch, she runs a vulnerability scan on the company's public-facing APIs using Burp Suite and documents the findings. At 3 PM she presents her quarterly penetration test report to the CTO.",
    dayInTheLifeStructured: {
      earlyCareer: [
        {
          time: "8:30 AM",
          title: "SIEM alert triage",
          detail:
            "Review Security Information and Event Management (SIEM) dashboard. Last night generated 47 alerts — 43 are false positives, 3 need investigation, 1 needs escalation. Learning to separate noise from signal is the core junior analyst skill.",
          tools: ["Splunk / QRadar", "SIEM Dashboard", "Threat Intel feeds"],
        },
        {
          time: "10:00 AM",
          title: "Vulnerability scanning",
          detail:
            "Run automated vulnerability scans on scheduled systems. Review the output — a new CVE (Common Vulnerability) was flagged on the web server. Research its severity, write a remediation ticket, and notify the sysadmin team.",
          tools: ["Nessus / OpenVAS", "CVE Database", "JIRA"],
        },
        {
          time: "1:00 PM",
          title: "Phishing simulation analysis",
          detail:
            "Analyze results of last week's simulated phishing campaign. 12% of employees clicked the link. Prepare a brief report for HR: which departments, what time of day, recommended awareness training topics.",
          tools: ["GoPhish", "Excel / Sheets", "PowerPoint"],
        },
        {
          time: "3:00 PM",
          title: "CTF practice & skill building",
          detail:
            "Junior security analysts are expected to practice. Spend 45 minutes on a TryHackMe or HackTheBox challenge. Learning attack techniques makes you better at defense.",
          tools: ["TryHackMe", "Kali Linux", "Burp Suite"],
        },
        {
          time: "5:00 PM",
          title: "Documentation & shift handover",
          detail:
            "Document all incidents handled today with evidence and actions taken. Brief the night shift (if applicable) on any open investigations. Cybersecurity documentation is a legal requirement at most companies.",
          tools: ["Confluence / Notion", "Incident Ticketing System"],
        },
      ],
      established: [
        {
          time: "9:00 AM",
          title: "Penetration test planning",
          detail:
            "Plan this week's pentest engagement for a client's e-commerce platform. Define scope, attack vectors, rules of engagement. Review their architecture diagram for attack surface analysis.",
          tools: ["Metasploit", "Burp Suite Pro", "Nmap"],
        },
        {
          time: "10:30 AM",
          title: "Security architecture review",
          detail:
            "Review the new payment feature's security design with the engineering team. Flag a misconfigured OAuth flow that could allow token theft. Propose a fix. You're now the expert others bring problems to.",
          tools: ["OWASP Top 10", "Threat Modeling (STRIDE)", "Draw.io"],
        },
        {
          time: "1:00 PM",
          title: "Active penetration testing",
          detail:
            "Execute the pentest scope: network scanning, web app testing, credential attacks. Every finding gets documented with evidence, severity, and remediation. The goal: find vulnerabilities before attackers do.",
          tools: ["Kali Linux", "Metasploit", "Burp Suite", "Wireshark"],
        },
        {
          time: "3:30 PM",
          title: "Incident response (if triggered)",
          detail:
            "A ransomware alert fires in the SIEM. You lead the response: isolate the affected machine, identify the attack vector, begin forensic analysis. Under pressure, clarity of process is everything.",
          tools: ["Volatility (memory forensics)", "Autopsy", "SIEM"],
        },
        {
          time: "5:30 PM",
          title: "Report writing & client briefing",
          detail:
            "Write the pentest executive summary: findings ranked by severity, evidence, business impact, and remediation roadmap. Cybersecurity professionals who communicate clearly earn significantly more than those who can't.",
          tools: ["Notion / Word", "CVSS Scoring", "OWASP Testing Guide"],
        },
      ],
    },
    timeTierRoadmap: [
      {
        years: "1 yr",
        label: "Foundation Certificate",
        qualification: "CompTIA Security+ or Google Cybersecurity Certificate",
        route:
          "CompTIA (self-study), Google Cybersecurity Certificate on Coursera, TryHackMe SOC Level 1 path",
        entryRole: "SOC Analyst Tier 1, IT Security Helpdesk",
        salaryRange: "₹2L–₹4L/yr",
        cost: "₹20K–₹80K (exam fees + prep)",
        ladderNote:
          "CompTIA Security+ is globally recognized and accepted by MNCs for SOC Analyst roles. After 1 year of experience, you can pursue CEH (Certified Ethical Hacker) to move into offensive security.",
      },
      {
        years: "2 yrs",
        label: "Diploma + Professional Certifications",
        qualification: "CDAC PG Diploma in Cybersecurity or NIELIT Level B",
        route: "CDAC centers (Pan-India, government-run), NIELIT courses",
        entryRole: "Security Analyst, Network Security Engineer",
        salaryRange: "₹3.5L–₹6.5L/yr",
        cost: "₹60K–₹1.5L",
        ladderNote:
          "CDAC programs are government-certified, affordable, and respected by PSUs, Banks, and Defence. After completion, CEH or OSCP certification significantly boosts career trajectory.",
      },
      {
        years: "3–4 yrs",
        label: "B.Tech / B.Sc in CS or IT",
        qualification: "B.Tech CSE/IT with cybersecurity electives",
        route:
          "Any NIT, IIIT, or private engineering college with CS/IT program",
        entryRole: "Cybersecurity Engineer, Penetration Tester (Junior)",
        salaryRange: "₹4L–₹10L/yr",
        cost: "₹1L–₹8L/yr",
        ladderNote:
          "A B.Tech with hands-on security skills (TryHackMe, CEH, bug bounty findings) is the benchmark for mid-market cybersecurity roles. After 2-3 years of experience, OSCP (Offensive Security) certification opens elite pentesting roles.",
      },
      {
        years: "6 yrs",
        label: "B.Tech + M.Tech / Specialized MS",
        qualification: "M.Tech Information Security or MS Cybersecurity",
        route:
          "IIT Kanpur (C3i Hub), IIIT Hyderabad, NIT Calicut, or Georgia Tech OMSCS (online)",
        entryRole: "Senior Security Engineer, Security Architect",
        salaryRange: "₹12L–₹28L/yr",
        cost: "₹1L–₹5L (M.Tech); Georgia Tech OMSCS ~₹1.5L total",
        ladderNote:
          "M.Tech in Information Security from IIT Kanpur (home of India's C3i Hub) is the most respected security postgraduate degree in India. Opens government/defence research roles not accessible with just a B.Tech.",
      },
      {
        years: "8+ yrs",
        label: "PhD / Research Fellowship",
        qualification:
          "PhD in Cryptography, Malware Analysis, or Security Systems",
        route: "IIT Kanpur C3i Hub, IISc, Carnegie Mellon CyLab, Purdue CERIAS",
        entryRole:
          "Security Researcher, Principal Architect, Government Advisor",
        salaryRange: "₹20L–₹60L+ (research labs, government advisory)",
        cost: "Typically funded with stipend",
        ladderNote:
          "Security researchers with PhDs from top institutions advise governments, testify in courts on digital evidence, and lead CERT-In (India's national CERT) level positions. This is a high-impact, rare career path.",
      },
    ],
    skillsTechnical: [
      "Networking fundamentals (TCP/IP, DNS, HTTP)",
      "Linux operating systems",
      "Ethical hacking tools (Kali Linux, Metasploit, Burp Suite)",
      "Cloud security (AWS/Azure security services)",
      "Programming (Python, Bash scripting)",
      "Cryptography basics",
    ],
    skillsSoft: [
      "Analytical and investigative mindset",
      "Staying calm under pressure",
      "Ethical integrity",
      "Clear incident reporting and communication",
      "Continuous self-learning habit",
    ],
    educationRoadmapGrade10:
      "Choose PCM or PCM+CS stream. Learn basic networking concepts. Try free platforms like TryHackMe or Cybrary to explore ethical hacking.",
    educationRoadmapUG:
      "B.Tech CSE / IT or B.Sc Computer Science. Pursue certifications (CEH, CompTIA Security+) in parallel.",
    educationRoadmapPG:
      "M.Tech Information Security / Cybersecurity. IIIT Hyderabad, IIT Kanpur, and NIT Calicut have strong programs.",
    educationRoadmapPhD:
      "Research in cryptography, malware analysis, or secure systems at IITs or abroad. Carnegie Mellon CyLab is the world's leading cybersecurity research centre.",
    topInstitutesIndia: [
      {
        name: "IIT Kanpur",
        locationOrCountry: "Kanpur",
        instituteType: "IIT",
        note: "C3i Hub — India's leading cybersecurity research centre",
      },
      {
        name: "IIIT Hyderabad",
        locationOrCountry: "Hyderabad",
        instituteType: "IIIT",
        note: "Strong information security research",
      },
      {
        name: "NIT Calicut",
        locationOrCountry: "Kerala",
        instituteType: "NIT",
        note: "Dedicated cybersecurity specialization",
      },
      {
        name: "CDAC",
        locationOrCountry: "Pan-India",
        instituteType: "Government Institute",
        note: "Post-graduation diplomas in cybersecurity, industry recognized",
      },
      {
        name: "Symbiosis Institute of Computer Studies",
        locationOrCountry: "Pune",
        instituteType: "Private University",
        note: "MBA in IT with cybersecurity track",
      },
    ],
    topInstitutesGlobal: [
      {
        name: "Carnegie Mellon University",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "CyLab — the world's #1 cybersecurity research institution",
      },
      {
        name: "Georgia Tech",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "Strong MS in Cybersecurity, affordable online option available",
      },
      {
        name: "Royal Holloway University of London",
        locationOrCountry: "UK",
        instituteType: "University",
        note: "UK's top cybersecurity programme",
      },
      {
        name: "University of Edinburgh",
        locationOrCountry: "UK",
        instituteType: "University",
        note: "MSc Cybersecurity, NCSC-certified program",
      },
      {
        name: "Nanyang Technological University",
        locationOrCountry: "Singapore",
        instituteType: "University",
        note: "Top Asian cybersecurity program",
      },
    ],
    entranceExams: [
      {
        name: "JEE Main & Advanced",
        description: "For IIT/NIT B.Tech admissions",
      },
      {
        name: "GATE",
        description:
          "For M.Tech admissions at IITs/NITs. CS paper is relevant.",
      },
      {
        name: "CEH Exam",
        description:
          "Certified Ethical Hacker — global professional certification, can be taken at any age",
      },
    ],
    pros: [
      "Critical shortage means almost guaranteed employment",
      "Work is genuinely high-stakes and intellectually challenging",
      "Can work independently as a consultant or bug bounty hunter",
    ],
    cons: [
      "High stress — security breaches happen at 3 AM",
      "Requires constant learning as attack methods evolve daily",
      "Legal boundaries are strict — one mistake can have serious consequences",
    ],
    mythsVsReality: [
      {
        myth: "Hackers are criminals",
        reality:
          "Ethical hackers (penetration testers) are paid by companies to find their vulnerabilities before criminals do. It is a legitimate, in-demand profession.",
      },
      {
        myth: "You need to be a coding genius",
        reality:
          "Many cybersecurity roles focus on analysis, monitoring, and policy — not heavy coding. You need to understand systems, not build them from scratch.",
      },
    ],
    grade910SubjectFocus:
      "Focus on Computer Science and Mathematics. Start exploring networking concepts on YouTube. Create a free account on TryHackMe.com — it gamifies learning ethical hacking and is perfect for beginners.",
  },

  "ai-ml-engineering": {
    id: "ai-ml-engineering",
    dayInTheLife:
      "Meera begins her day reviewing the overnight training run of a recommendation model — loss curves look good but there's a bias issue flagged by the fairness monitor. She spends the morning adjusting the training data pipeline and re-queuing the experiment. After lunch, she joins a research reading group where her team discusses a new paper on efficient transformers. At 3 PM she demos a prototype voice assistant feature to the product team.",
    dayInTheLifeStructured: {
      earlyCareer: [
        {
          time: "9:00 AM",
          title: "Experiment run review",
          detail:
            "An overnight model training job finished. Check loss curves, validation accuracy, and fairness metrics. Identify the 2 hyperparameters that most explain the gap. Plan next experiment configuration.",
          tools: ["MLflow / Weights & Biases", "TensorBoard", "Jupyter"],
        },
        {
          time: "10:30 AM",
          title: "Data pipeline debugging",
          detail:
            "A data preprocessing bug caused 5% of training samples to have incorrect labels. Trace the issue through the pipeline, fix it, document the root cause, retrigger the job. This happens more often than model architecture work.",
          tools: ["Apache Airflow", "Pandas", "Great Expectations"],
        },
        {
          time: "1:00 PM",
          title: "Research paper reading group",
          detail:
            "Your team reads 1 research paper per week together. Today's paper: a new efficient transformer architecture. You present a 5-minute summary: what problem does it solve, what did they prove, can we apply it?",
          tools: ["Arxiv", "Papers With Code", "Google Scholar"],
        },
        {
          time: "2:30 PM",
          title: "Model implementation",
          detail:
            "Implement a simplified version of the paper's technique on your current task. Write clean, documented code. If it improves validation score by 1%+ you'll propose it to the team.",
          tools: ["PyTorch", "HuggingFace Transformers", "GitHub"],
        },
        {
          time: "5:00 PM",
          title: "Infrastructure & deployment",
          detail:
            "Your last model is being containerized for deployment. Work with the MLOps engineer to ensure the model serving API handles latency requirements. This cross-functional work is increasingly part of ML roles.",
          tools: ["Docker", "FastAPI", "AWS SageMaker / GCP Vertex AI"],
        },
      ],
      established: [
        {
          time: "9:00 AM",
          title: "Production model monitoring",
          detail:
            "Review dashboards for 3 production models. One recommendation model's click-through rate dropped 4% overnight. Investigate: is it a data drift, model issue, or product change? Root cause before the product meeting.",
          tools: ["Evidently AI", "Grafana", "CloudWatch"],
        },
        {
          time: "10:30 AM",
          title: "Research direction setting",
          detail:
            "Lead a whiteboard session with your team to evaluate 3 research directions for Q3. What will have the highest product impact? What's technically feasible in 3 months? You're making bets that affect 12+ engineers.",
          tools: ["Miro", "Notion", "Google Docs"],
        },
        {
          time: "1:30 PM",
          title: "Hands-on model architecture work",
          detail:
            "Work on the core architecture of the new LLM fine-tuning pipeline. This is the hardest technical problem in the roadmap — reserved for senior ML engineers who understand both theory and systems.",
          tools: ["PyTorch", "DeepSpeed", "HuggingFace", "CUDA"],
        },
        {
          time: "3:30 PM",
          title: "Cross-functional product alignment",
          detail:
            "Meet with Product and Engineering to align on model integration. Negotiate feasibility: what the model can and cannot do, latency constraints, error tolerance. You're translating ML reality into product decisions.",
          tools: ["JIRA", "Figma (model UI mockups)", "Google Slides"],
        },
        {
          time: "5:00 PM",
          title: "Mentoring & research contribution",
          detail:
            "Review a junior's experiment write-up. Suggest 2 specific improvements. Then spend 30 minutes on an open-source contribution or internal RFC. Senior ML engineers grow by teaching and writing.",
          tools: ["GitHub", "Arxiv (pre-print)", "Confluence"],
        },
      ],
    },
    timeTierRoadmap: [
      {
        years: "1 yr",
        label: "Online Specialization Certificate",
        qualification: "Machine Learning Specialization (Andrew Ng / fast.ai)",
        route:
          "Coursera ML Specialization (free to audit) + Kaggle competitions portfolio",
        entryRole: "Junior ML Analyst, AI Research Intern",
        salaryRange: "₹3L–₹5.5L/yr (internship/junior roles)",
        cost: "₹0–₹30K (free audit + Kaggle is free)",
        ladderNote:
          "A strong Kaggle portfolio (top 20% in 3 competitions) + GitHub projects can open junior ML roles at startups without a degree. You can pursue formal education alongside work.",
      },
      {
        years: "4 yrs",
        label: "B.Tech CSE (core path)",
        qualification:
          "B.Tech Computer Science & Engineering with ML/AI electives",
        route:
          "IITs (JEE Advanced), IISc (KVPY), IIIT Hyderabad (UGEE), NITs (JEE Main)",
        entryRole: "ML Engineer, AI Software Engineer",
        salaryRange: "₹8L–₹25L/yr (IIT: ₹20L–₹80L+)",
        cost: "₹1.5L–₹15L/yr",
        ladderNote:
          "B.Tech CSE from a top institution is the most reliable path into ML engineering. After 2 years of industry experience, apply for MS/MTech to specialize or for top research labs that prefer advanced degrees.",
      },
      {
        years: "6 yrs",
        label: "B.Tech + M.Tech / MS in AI",
        qualification: "M.Tech AI/ML or MS Machine Learning",
        route:
          "IIT Madras, IIT Bombay, IISc, IIIT Hyderabad, Carnegie Mellon MS, Stanford MS, Georgia Tech OMSCS",
        entryRole: "Senior ML Engineer, Research Scientist",
        salaryRange: "₹18L–₹50L/yr",
        cost: "₹1L–₹8L (India); $20K–$80K (abroad, often funded)",
        ladderNote:
          "MS/M.Tech in ML is increasingly required for research scientist roles at top labs. Georgia Tech OMSCS (online, ~₹1.5L total) is the most accessible international option with an IIT-equivalent reputation.",
      },
      {
        years: "8+ yrs",
        label: "PhD in ML / AI",
        qualification:
          "PhD in Machine Learning, Deep Learning, or Computational Neuroscience",
        route:
          "IISc Bangalore, IIT Madras, CMU ML Department, Stanford AI Lab, MIT CSAIL, University of Toronto",
        entryRole: "Research Scientist / Principal Researcher / Faculty",
        salaryRange: "₹25L–₹2Cr+ (top AI labs globally)",
        cost: "Almost always fully funded with monthly stipend",
        ladderNote:
          "PhD from a top lab is the ticket to working on frontier AI (foundation models, reinforcement learning, robotics). Compensation at FAANG Research and top AI labs significantly exceeds industry ML engineering roles.",
      },
    ],
    skillsTechnical: [
      "Python (PyTorch/TensorFlow)",
      "Linear Algebra and Calculus",
      "Deep Learning architectures (CNNs, Transformers, LLMs)",
      "MLOps (model deployment, monitoring)",
      "Cloud ML platforms (AWS SageMaker, GCP Vertex AI)",
      "Research paper reading and implementation",
    ],
    skillsSoft: [
      "Intellectual curiosity and deep research habit",
      "Experimental mindset (hypothesize, test, iterate)",
      "Collaboration with product and engineering teams",
      "Communicating uncertainty and model limitations clearly",
    ],
    educationRoadmapGrade10:
      "Choose PCM stream. Focus on Mathematics — Calculus and Linear Algebra in Grade 11-12 are directly used in AI. Explore interactive AI demos on Teachable Machine or Google's AI Experiments.",
    educationRoadmapUG:
      "B.Tech CSE (IITs, IISc, IIIT Hyderabad are top picks). Take electives in ML, Computer Vision, NLP. Start publishing research or contributing to open-source from Year 3.",
    educationRoadmapPG:
      "M.Tech in AI/ML from IIT Madras, IIT Bombay, IISc, or IIIT Hyderabad. Or MS abroad (CMU, Stanford, MIT, University of Toronto).",
    educationRoadmapPhD:
      "PhD from IISc, IITs, or top global programs (MIT CSAIL, Stanford AI Lab, CMU ML). Research experience is the primary differentiator for top AI labs.",
    topInstitutesIndia: [
      {
        name: "IISc Bangalore",
        locationOrCountry: "Bangalore",
        instituteType: "Deemed University",
        note: "India's premier AI/ML research institution",
      },
      {
        name: "IIT Madras",
        locationOrCountry: "Chennai",
        instituteType: "IIT",
        note: "Robert Bosch Centre for Data Science and AI (RBCDSAI)",
      },
      {
        name: "IIIT Hyderabad",
        locationOrCountry: "Hyderabad",
        instituteType: "IIIT",
        note: "LTRC language tech and AI research, strong PhD program",
      },
      {
        name: "IIT Bombay",
        locationOrCountry: "Mumbai",
        instituteType: "IIT",
        note: "C-MInDS centre for AI, excellent industry placements",
      },
      {
        name: "IIT Delhi",
        locationOrCountry: "New Delhi",
        instituteType: "IIT",
        note: "Yardi School of AI — India's first dedicated AI school",
      },
    ],
    topInstitutesGlobal: [
      {
        name: "Stanford University",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "Stanford AI Lab — birthplace of modern AI research",
      },
      {
        name: "Carnegie Mellon University",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "Machine Learning Department — the world's only standalone ML department",
      },
      {
        name: "MIT",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "CSAIL — pioneering AI and robotics research since the 1950s",
      },
      {
        name: "University of Toronto",
        locationOrCountry: "Canada",
        instituteType: "University",
        note: "Geoffrey Hinton's institution — birthplace of deep learning",
      },
      {
        name: "University of Oxford",
        locationOrCountry: "UK",
        instituteType: "University",
        note: "Future of Humanity Institute, strong ML research group",
      },
    ],
    entranceExams: [
      {
        name: "JEE Main & Advanced",
        description: "Primary route to IITs/NITs for B.Tech CSE",
      },
      {
        name: "GATE",
        description:
          "For M.Tech AI/ML programmes at IITs. CS and Data Science papers are relevant.",
      },
      {
        name: "TOEFL/IELTS + GRE",
        description: "Required for MS/PhD programmes abroad",
      },
    ],
    pros: [
      "Highest compensation in the technology sector globally",
      "Work on problems at the frontier of human knowledge",
      "Applicable in any field — healthcare, climate, education, defence",
    ],
    cons: [
      "Very high entry bar — competition for top roles is global",
      "Research roles can be slow and uncertain — not every project succeeds",
      "Ethical risks — AI systems can cause harm at scale if built irresponsibly",
    ],
    mythsVsReality: [
      {
        myth: "AI will replace all jobs",
        reality:
          "AI replaces specific tasks, not full jobs. Every AI system needs humans to define goals, curate data, and make ethical judgments.",
      },
      {
        myth: "AI/ML is only for PhD holders",
        reality:
          "Many ML engineers in Indian startups have a B.Tech degree. Practical skills and a strong portfolio matter more than a PhD for most industry roles.",
      },
    ],
    grade910SubjectFocus:
      "Focus on Mathematics — particularly Calculus and Matrices (taught in Grade 11-12). Explore Khan Academy's Machine Learning section. Try building a simple image classifier using Google's Teachable Machine — no coding required.",
  },

  "product-management": {
    id: "product-management",
    dayInTheLife:
      "Rahul starts his day reviewing the previous day's product metrics — a new onboarding flow launched last week shows a 12% improvement in activation. He spends the morning in user research calls, listening to how small business owners use the invoicing feature. After lunch, he writes a PRD for a new feature. At 3 PM he runs the weekly sprint review, grooming the backlog with his engineering lead.",
    dayInTheLifeStructured: {
      earlyCareer: [
        {
          time: "9:00 AM",
          title: "Metrics review & anomaly hunting",
          detail:
            "Open the product dashboard. Are DAU, retention, and activation moving as expected? A new feature launched 3 days ago. Does the data show it's working? Spot the anomaly before your PM does.",
          tools: ["Mixpanel / Amplitude", "Metabase", "Google Analytics 4"],
        },
        {
          time: "10:30 AM",
          title: "User research interviews",
          detail:
            "30-minute calls with 3 users who recently churned. You're listening for the 'real reason' — not what they say, but what they're frustrated by. Write a 1-page insight summary. This is PM gold.",
          tools: ["Calendly", "Zoom", "Dovetail (research notes)"],
        },
        {
          time: "1:00 PM",
          title: "PRD drafting",
          detail:
            "Write a Product Requirements Document for a new feature. Define: problem statement, user stories, success metrics, edge cases, and what you're NOT building. Engineers need this to estimate effort accurately.",
          tools: ["Notion", "Confluence", "Figma (wireframes)"],
        },
        {
          time: "3:00 PM",
          title: "Sprint grooming with engineering",
          detail:
            "Review the backlog with the engineering lead. Estimate complexity, prioritize using the ICE framework (Impact × Confidence ÷ Effort), and finalize next sprint's scope. This negotiation is the heart of PM work.",
          tools: ["JIRA", "Linear", "Miro"],
        },
        {
          time: "5:00 PM",
          title: "Competitor analysis",
          detail:
            "Spend 30 minutes testing a competitor's app. Document 3 features they have that we don't. Assess if any address our users' top complaints. Share findings in the team Slack channel.",
          tools: ["Notion", "Loom (screen recording)", "ProductBoard"],
        },
      ],
      established: [
        {
          time: "9:00 AM",
          title: "Quarterly roadmap review",
          detail:
            "Present the Q3 roadmap to the VP and CEO. Justify each bet: what user problem it solves, what revenue impact is expected, and what you're deprioritizing. Be ready for tough questions on tradeoffs.",
          tools: ["Google Slides", "Amplitude (data)", "Productboard"],
        },
        {
          time: "11:00 AM",
          title: "Cross-functional leadership",
          detail:
            "Lead the weekly product sync: Engineering, Design, Marketing, and Customer Success. Align everyone on launch plans, unblock cross-team dependencies, and surface risks early. You own the outcome, not any single function.",
          tools: ["JIRA", "Notion", "Slack Huddles"],
        },
        {
          time: "1:30 PM",
          title: "Strategic customer discovery",
          detail:
            "Interview a key enterprise customer to understand their workflow and pain points. You're not just gathering feedback — you're testing whether there's a ₹10Cr opportunity hiding in their use case.",
          tools: ["Zoom", "Dovetail", "Customer Success platform"],
        },
        {
          time: "3:00 PM",
          title: "A/B test analysis & decision",
          detail:
            "The A/B test on the new checkout flow has enough data. Analyze statistical significance, segment by user type, check for novelty effects. Write a 1-page decision memo: ship it, iterate, or kill it.",
          tools: ["Amplitude", "Statsig", "Google Optimize"],
        },
        {
          time: "5:00 PM",
          title: "Team development & mentoring",
          detail:
            "1:1 with a junior PM on your team. Review their PRD, give structured feedback on how to sharpen the problem statement. Senior PMs who develop others create organizational leverage.",
          tools: ["Notion", "Loom"],
        },
      ],
    },
    timeTierRoadmap: [
      {
        years: "1–2 yrs",
        label: "PM Certification / APM Program",
        qualification:
          "Product Management Certificate (Product School, Pragmatic Institute)",
        route:
          "Product School PM Certificate, Reforge Program, or direct APM (Associate PM) hiring at startups",
        entryRole: "Associate Product Manager (APM), Product Analyst",
        salaryRange: "₹5L–₹10L/yr",
        cost: "₹50K–₹2L (certificate programs)",
        ladderNote:
          "Many startups hire APMs directly from engineering or data backgrounds without an MBA. Building a product portfolio (case studies, product teardowns) and networking on LinkedIn is as effective as formal certification for startup PM roles.",
      },
      {
        years: "3–4 yrs",
        label: "UG Degree + APM Entry",
        qualification: "B.Tech / BBA / BA Economics or any graduation",
        route:
          "Any college + Google APM, Microsoft APM, Uber APM, Flipkart APM programs (applied in final year)",
        entryRole: "Product Manager (Junior), Growth Analyst",
        salaryRange: "₹8L–₹18L/yr (FAANG APMs: ₹25L–₹50L+)",
        cost: "College fees vary",
        ladderNote:
          "FAANG and top tech APM programs are the fastest path. After 3-4 years as PM, you can target MBA programs (IIM, ISB, HBS) to accelerate to CPO / Director level roles.",
      },
      {
        years: "6–7 yrs",
        label: "Graduation + MBA",
        qualification: "MBA from IIM / ISB / top global B-school",
        route: "IIM A/B/C (CAT), ISB (GMAT), HBS/Wharton/INSEAD (GMAT)",
        entryRole: "Senior Product Manager, Group PM",
        salaryRange: "₹20L–₹60L/yr (IIM/ISB placements)",
        cost: "₹20L–₹80L (MBA fees, varies by institution)",
        ladderNote:
          "MBA from IIM/ISB/HBS significantly accelerates the path to Director/VP of Product and CPO. Not required for individual PM contributor roles, but almost essential for executive product leadership at large companies.",
      },
    ],
    skillsTechnical: [
      "Product Metrics and Analytics (Mixpanel, Amplitude)",
      "SQL basics for self-serve data queries",
      "Wireframing tools (Figma, Balsamiq)",
      "Understanding of software development processes (Agile/Scrum)",
      "User Research methods",
      "A/B testing and experimentation",
    ],
    skillsSoft: [
      "Communication and Persuasion",
      "Structured Problem Solving",
      "Empathy for users",
      "Stakeholder Management",
      "Dealing with ambiguity",
      "Prioritization under constraints",
    ],
    educationRoadmapGrade10:
      "Any stream works — PCM, Commerce or Humanities. Focus on communication, reasoning, and understanding people. Participate in debates, Model UN, or entrepreneurship clubs.",
    educationRoadmapUG:
      "B.Tech (most common), B.Com, or BA Economics. Apply for APM programs at top tech companies during final year.",
    educationRoadmapPG:
      "MBA from IIM, ISB, or top global business schools (HBS, Wharton, INSEAD) significantly accelerates the PM career.",
    educationRoadmapPhD:
      "Rare in Product Management. Academic research in HCI or Economics can lead to research PM roles at Google, Meta, or Microsoft Research.",
    topInstitutesIndia: [
      {
        name: "IIM Ahmedabad",
        locationOrCountry: "Ahmedabad",
        instituteType: "IIM",
        note: "MBA — top choice for senior PM and CPO aspirants",
      },
      {
        name: "ISB Hyderabad",
        locationOrCountry: "Hyderabad",
        instituteType: "Business School",
        note: "Strong product and tech MBA track, good for career switchers",
      },
      {
        name: "IIT Bombay",
        locationOrCountry: "Mumbai",
        instituteType: "IIT",
        note: "SJMSOM MBA, strong startup ecosystem and PM placements",
      },
      {
        name: "XLRI Jamshedpur",
        locationOrCountry: "Jamshedpur",
        instituteType: "Business School",
        note: "Strong HR + PM combination",
      },
      {
        name: "SP Jain School of Management",
        locationOrCountry: "Mumbai",
        instituteType: "Business School",
        note: "Good for international PM career tracks",
      },
    ],
    topInstitutesGlobal: [
      {
        name: "Harvard Business School",
        locationOrCountry: "USA",
        instituteType: "Business School",
        note: "MBA — launches careers at top tech companies' PM leadership",
      },
      {
        name: "Stanford GSB",
        locationOrCountry: "USA",
        instituteType: "Business School",
        note: "Silicon Valley network, ideal for startup PM roles",
      },
      {
        name: "Wharton School",
        locationOrCountry: "USA",
        instituteType: "Business School",
        note: "Strong analytics + product combination",
      },
      {
        name: "INSEAD",
        locationOrCountry: "France/Singapore",
        instituteType: "Business School",
        note: "Top European MBA, strong tech and consulting placements",
      },
      {
        name: "London Business School",
        locationOrCountry: "UK",
        instituteType: "Business School",
        note: "Strong European tech PM placement",
      },
    ],
    entranceExams: [
      {
        name: "CAT",
        description:
          "Common Admission Test for IIM MBA programmes. Highly competitive.",
      },
      {
        name: "GMAT",
        description: "For international MBA programmes — HBS, Wharton, INSEAD",
      },
      { name: "XAT", description: "For XLRI and other top private B-schools" },
    ],
    pros: [
      "High compensation without requiring deep technical expertise",
      "Enormous variety — no two days are the same",
      "Direct business impact — your decisions affect millions of users",
    ],
    cons: [
      "High accountability without direct authority",
      "Can be frustrating when engineering priorities conflict with product vision",
      "Role is ambiguous in many companies, especially early-stage startups",
    ],
    mythsVsReality: [
      {
        myth: "Product Managers write the code",
        reality:
          "PMs decide WHAT to build and WHY. Engineers decide HOW. PMs who can code have an advantage in communication, but coding is not the job.",
      },
      {
        myth: "You need an MBA to become a PM",
        reality:
          "The fastest path into PM is from a software engineering or data role. An MBA helps for senior roles but is not required at entry level.",
      },
    ],
    grade910SubjectFocus:
      "Any stream is fine. Focus on developing communication skills and curiosity about technology products. Read case studies about Indian startups. Start a blog analyzing apps you use daily.",
  },

  "digital-marketing": {
    id: "digital-marketing",
    dayInTheLife:
      "Neha checks her campaign dashboards first thing — the Google Ads campaign for a product launch is running at a higher cost-per-click than budgeted. She adjusts the bid strategy and pauses two underperforming ad groups. By 10 she's in a content planning meeting, mapping next month's Instagram calendar. After lunch, she analyzes an email campaign she sent last week — open rate at 32%, above industry average.",
    dayInTheLifeStructured: {
      earlyCareer: [
        {
          time: "9:00 AM",
          title: "Campaign dashboard review",
          detail:
            "Open Google Ads and Meta Ads dashboards. Check yesterday's spend, CPC, CTR, and conversions. The Google campaign CPC jumped 18% overnight — likely a competitor increased bids. Adjust bid strategy and note it in the daily report.",
          tools: ["Google Ads", "Meta Business Suite", "Google Analytics 4"],
        },
        {
          time: "10:30 AM",
          title: "Content planning & creation",
          detail:
            "Plan next month's Instagram and LinkedIn content calendar. Write 5 post captions, design 3 graphics in Canva, and schedule them. Content creation is 40-50% of a junior digital marketer's job.",
          tools: ["Canva", "Buffer / Hootsuite", "Instagram Creator Studio"],
        },
        {
          time: "1:00 PM",
          title: "SEO analysis & optimization",
          detail:
            "Review last week's Google Search Console data. 3 blog posts are ranking on page 2 — update them with better headings, internal links, and a stronger meta description. SEO improvements take 4-6 weeks to show results.",
          tools: [
            "Google Search Console",
            "Ahrefs / SEMrush",
            "WordPress / CMS",
          ],
        },
        {
          time: "3:00 PM",
          title: "Email campaign setup",
          detail:
            "Build this week's newsletter in Mailchimp. Write the subject line (A/B test 2 variants), design the email, set up the automated sequence for new subscribers. Open rate goal: >25%.",
          tools: ["Mailchimp / CleverTap", "Canva", "Litmus (email testing)"],
        },
        {
          time: "5:00 PM",
          title: "Performance reporting",
          detail:
            "Compile the weekly marketing report: all channel metrics, wins, learnings, and next week's priorities. Marketers who explain their data clearly get promoted faster than those who just execute.",
          tools: ["Google Looker Studio", "Sheets / Excel", "Notion"],
        },
      ],
      established: [
        {
          time: "9:00 AM",
          title: "Growth strategy review",
          detail:
            "Review monthly growth metrics across all channels: organic (SEO/content), paid (SEM/social), email, referral. Identify which channel has the best LTV:CAC ratio and propose increasing budget there.",
          tools: ["Amplitude", "Looker Studio", "Tableau"],
        },
        {
          time: "10:30 AM",
          title: "Agency and vendor management",
          detail:
            "Brief the content agency on Q3 campaign direction. Review their creative proposals against brand guidelines. Approve 3, send 2 back for revision. Senior marketers manage vendors, not just execute themselves.",
          tools: ["Notion (briefs)", "Slack", "Asana"],
        },
        {
          time: "1:00 PM",
          title: "Product launch campaign planning",
          detail:
            "Plan the full-funnel campaign for a new product feature launch: awareness (social/PR), consideration (content/retargeting), conversion (email/paid). Define the budget split and success metrics.",
          tools: ["Miro (campaign canvas)", "Google Slides", "HubSpot CRM"],
        },
        {
          time: "3:30 PM",
          title: "A/B test analysis & optimization",
          detail:
            "Two landing page variants have been running for 14 days. Variant B has 23% higher conversion. Analyze why: headline, hero image, or CTA? Roll out the winner, start the next test.",
          tools: ["VWO / Optimizely", "Google Optimize", "Hotjar"],
        },
        {
          time: "5:00 PM",
          title: "Market research & trend spotting",
          detail:
            "Spend 30 minutes reading about emerging platforms (what's growing on LinkedIn vs. Instagram vs. YouTube Shorts), competitor campaign analysis, and industry trend reports. Senior marketers see the next wave before it hits.",
          tools: ["SimilarWeb", "SparkToro", "Think with Google"],
        },
      ],
    },
    timeTierRoadmap: [
      {
        years: "0–6 months",
        label: "Free Certifications + Portfolio",
        qualification: "Google Digital Marketing Certificate + Meta Blueprint",
        route:
          "Google Digital Garage (free, 40 hrs) + Meta Blueprint (free) + start a social media page on any passion",
        entryRole: "Social Media Executive, Digital Marketing Intern",
        salaryRange: "₹1.5L–₹3.5L/yr",
        cost: "₹0 (entirely free)",
        ladderNote:
          "Digital marketing is the most accessible career path — zero financial barrier to entry. Real-world results (growing a page from 0 to 5,000 followers) are more valuable than any certificate. You can grow while earning.",
      },
      {
        years: "1 yr",
        label: "Professional Certificate / Bootcamp",
        qualification:
          "PG Certificate in Digital Marketing (IIDE, Digital Vidya, Simplilearn)",
        route:
          "IIDE Mumbai, Digital Vidya (online), Google + Meta + HubSpot triple certification",
        entryRole: "Digital Marketing Executive, SEO Analyst",
        salaryRange: "₹2.5L–₹5L/yr",
        cost: "₹50K–₹1.5L",
        ladderNote:
          "Certificate programs with placement support are effective for career switchers. Choose programs that require you to run real campaigns with real budgets — not just theory. After 1 year of experience, salary jumps significantly.",
      },
      {
        years: "3 yrs",
        label: "UG Degree in Marketing / Mass Comm",
        qualification: "BBA Marketing, BA Mass Communication, or B.Com",
        route:
          "Christ University, Symbiosis, Manipal, MICA (BBA), Delhi University (BA)",
        entryRole: "Marketing Executive, Brand Manager (Trainee)",
        salaryRange: "₹3L–₹7L/yr",
        cost: "₹1L–₹5L/yr",
        ladderNote:
          "A marketing degree builds strategic and analytical foundation beyond social media. After 2-3 years of work experience, target MBA in Marketing from IIM/MICA/MDI for senior brand management roles.",
      },
      {
        years: "5–6 yrs",
        label: "UG + MBA Marketing",
        qualification: "MBA in Marketing (IIM / MICA / MDI)",
        route:
          "IIM Calcutta / Kozhikode (CAT), MICA Ahmedabad (MICAT+CAT/XAT), MDI Gurgaon (CAT)",
        entryRole: "Brand Manager, Marketing Manager, Growth Lead",
        salaryRange: "₹12L–₹30L/yr",
        cost: "₹15L–₹25L (MBA fees)",
        ladderNote:
          "MBA from MICA Ahmedabad (India's best marketing school) or IIM with marketing specialization opens senior brand management roles at FMCG, tech, and D2C companies. MICAT exam specifically tests creativity — unique to marketing MBAs.",
      },
    ],
    skillsTechnical: [
      "Google Ads and Meta Ads management",
      "SEO (Search Engine Optimization)",
      "Google Analytics 4",
      "Email marketing platforms (Mailchimp, CleverTap)",
      "Content creation (Canva, basic video editing)",
      "CRM tools (HubSpot, Salesforce basics)",
    ],
    skillsSoft: [
      "Creativity and visual storytelling",
      "Data-driven decision making",
      "Written communication",
      "Project Management",
      "Adaptability (platforms change frequently)",
    ],
    educationRoadmapGrade10:
      "Any stream works. Start a blog, YouTube channel, or Instagram page on any topic — growing it teaches more about digital marketing than any course.",
    educationRoadmapUG:
      "BA/BBA in Marketing/Mass Communication, B.Com, or any B.Tech. Complement with Google, Meta, and HubSpot free certifications.",
    educationRoadmapPG:
      "MBA in Marketing from IIMs, MICA Ahmedabad — India's best marketing school — or MDI Gurgaon.",
    educationRoadmapPhD:
      "Research in Consumer Behaviour, Marketing Analytics at IIMs or Wharton, Kellogg, or Harvard Business School abroad.",
    topInstitutesIndia: [
      {
        name: "MICA Ahmedabad",
        locationOrCountry: "Ahmedabad",
        instituteType: "Management Institute",
        note: "India's best marketing institution, strong digital marketing track",
      },
      {
        name: "IIM Calcutta",
        locationOrCountry: "Kolkata",
        instituteType: "IIM",
        note: "MBA with strong marketing specialization",
      },
      {
        name: "Symbiosis Institute of Business Management",
        locationOrCountry: "Pune",
        instituteType: "Business School",
        note: "Marketing MBA with good industry connections",
      },
      {
        name: "Digital Vidya",
        locationOrCountry: "Online / Pan-India",
        instituteType: "Professional Training",
        note: "India's most recognized digital marketing certification",
      },
      {
        name: "IIDE",
        locationOrCountry: "Mumbai",
        instituteType: "Professional Training",
        note: "Post-graduation diploma in digital marketing, placement-focused",
      },
    ],
    topInstitutesGlobal: [
      {
        name: "Kellogg School of Management",
        locationOrCountry: "USA",
        instituteType: "Business School",
        note: "World's top marketing MBA programme",
      },
      {
        name: "London Business School",
        locationOrCountry: "UK",
        instituteType: "Business School",
        note: "Strong European marketing placement",
      },
      {
        name: "Wharton School",
        locationOrCountry: "USA",
        instituteType: "Business School",
        note: "MBA with strong marketing analytics focus",
      },
      {
        name: "University of Amsterdam",
        locationOrCountry: "Netherlands",
        instituteType: "University",
        note: "MSc in Marketing, strong European digital marketing research",
      },
      {
        name: "Coursera Google Digital Marketing Certificate",
        locationOrCountry: "Online",
        instituteType: "Online Certification",
        note: "Free to audit, globally recognized, can be completed in 6 months",
      },
    ],
    entranceExams: [
      {
        name: "CAT",
        description:
          "For IIM MBA programmes including IIM marketing specializations",
      },
      {
        name: "MICAT",
        description:
          "MICA Admission Test — tests creativity and analytical ability",
      },
      {
        name: "XAT",
        description: "For XLRI and SIBM marketing MBA programmes",
      },
    ],
    pros: [
      "Highly accessible — you can start with zero cost using free tools and a smartphone",
      "Creative and analytical in equal measure",
      "Fast career growth — results are measurable, promotions follow performance",
    ],
    cons: [
      "Platform dependency — algorithm changes at Google or Meta can wipe out campaigns overnight",
      "Lower salaries at entry compared to engineering roles",
      "Pressure to show ROI constantly",
    ],
    mythsVsReality: [
      {
        myth: "Digital marketing is just posting on social media",
        reality:
          "Social media management is one small part. The field includes paid advertising, SEO, email marketing, analytics, and growth strategy.",
      },
      {
        myth: "You need a Mass Communication degree",
        reality:
          "Most successful digital marketers are self-taught. Certifications and a portfolio of results matter far more than a degree.",
      },
    ],
    grade910SubjectFocus:
      "Any stream is fine. Develop your English writing skills. Start experimenting with free tools — create a Google My Business listing for a family shop, or start a small blog and track your traffic with Google Analytics.",
  },
};
