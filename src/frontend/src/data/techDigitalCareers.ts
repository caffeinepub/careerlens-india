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

export interface CareerProfile {
  id: string;
  dayInTheLife: string;
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
      "Arjun opens his day reviewing the overnight model performance metrics for a fraud detection system he built. By 9:30 he's cleaning a messy customer dataset — filling missing values and removing duplicates. At 11, he presents last week's churn analysis to the product team, explaining why certain user segments are dropping off. After lunch, he trains a new classification model, comparing accuracy across three algorithms. At 3 PM, a data engineer connects to discuss pipeline improvements. He ends the day writing a notebook documenting his model results so the team can reproduce his work.",
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
      "Kiran's morning starts with reviewing the SIEM dashboard for overnight alerts — she spots an unusual login pattern from a foreign IP and escalates it to the incident response team. By 10 she's on a call reviewing the security architecture for a new payment feature. After lunch, she runs a vulnerability scan on the company's public-facing APIs using Burp Suite and documents the findings. At 3 PM she presents her quarterly penetration test report to the CTO. She closes the day writing a brief for the HR team on a new phishing simulation exercise to run next month.",
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
      "Meera begins her day reviewing the overnight training run of a recommendation model — loss curves look good but there's a bias issue flagged by the fairness monitor. She spends the morning adjusting the training data pipeline and re-queuing the experiment. After lunch, she joins a research reading group where her team discusses a new paper on efficient transformers. At 3 PM she demos a prototype voice assistant feature to the product team. She closes the day pushing a model serving optimization that cuts inference time by 40ms — a big win for the mobile app team.",
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
      "Rahul starts his day reviewing the previous day's product metrics — a new onboarding flow launched last week shows a 12% improvement in activation. He spends the morning in back-to-back user research calls, listening to how small business owners use the invoicing feature. After lunch, he writes a PRD for a new feature. At 3 PM he runs the weekly sprint review, grooming the backlog with his engineering lead. He ends the day presenting a quarterly roadmap to the VP, fielding tough questions on prioritization tradeoffs.",
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
      {
        name: "XAT",
        description: "For XLRI and other top private B-schools",
      },
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
      "Neha checks her campaign dashboards first thing — the Google Ads campaign for a product launch is running at a higher cost-per-click than budgeted. She adjusts the bid strategy and pauses two underperforming ad groups. By 10 she's in a content planning meeting, mapping next month's Instagram calendar. After lunch, she analyzes the email campaign she sent last week — open rate at 32%, above industry average. At 3 PM she presents the monthly growth report to the marketing head, showing a 22% improvement in organic traffic from SEO changes made last quarter.",
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
