/**
 * Career Pathways Data — Time-to-Career Tiered Roadmaps
 *
 * For each career, shows investment tiers from 1 year to PhD level.
 * Each tier includes qualification, institution type, entry role,
 * salary range, education cost, and a 'ladder note' explaining
 * how to upgrade to the next level without starting over.
 *
 * Data source: India 2025–26 industry estimates (NASSCOM, NMC, ICAI, CoA, NCERT, BCI)
 */

export interface CareerTier {
  years: number; // 1, 2, 3, 4, 5, 6 (6 = PhD/Fellowship level)
  label: string; // e.g. "1 Year", "2 Years", "PhD / Fellowship"
  qualification: string;
  route: string; // institution type
  entryRole: string;
  salaryRange: string; // India 2025–26
  educationCost: string;
  ladderNote: string; // how to upgrade without starting over
}

export interface CareerPathway {
  careerId: string;
  tiers: CareerTier[];
}

export const careerPathwaysMap: Record<string, CareerPathway> = {
  // ─── TECHNOLOGY ────────────────────────────────────────────────────────────────
  "software-engineering": {
    careerId: "software-engineering",
    tiers: [
      {
        years: 1,
        label: "1 Year",
        qualification: "Certificate in Web Development / Programming",
        route: "NIIT, Aptech, or online bootcamp (Scaler, Newton School)",
        entryRole: "Junior Web Developer / Freelancer",
        salaryRange: "₹1.8L–₹3.6L/yr",
        educationCost: "₹30K–₹1.2L total",
        ladderNote:
          "Build a portfolio of 3 live projects and apply for BCA lateral entry or a 2-year advanced diploma — your certificate is recognised as prior learning at many private colleges.",
      },
      {
        years: 2,
        label: "2 Years",
        qualification:
          "Advanced Diploma in Computer Applications (ADCA) / PGDCA",
        route: "State polytechnic, IGNOU, or private computer institutes",
        entryRole: "Junior Software Developer / Technical Support",
        salaryRange: "₹2.4L–₹4.8L/yr",
        educationCost: "₹25K–₹80K total",
        ladderNote:
          "ADCA holders can pursue BCA via lateral entry (2nd year admission) at several state universities. IGNOU offers bridge courses that credit-transfer your diploma into a degree programme.",
      },
      {
        years: 3,
        label: "3 Years",
        qualification: "BCA (Bachelor of Computer Applications)",
        route:
          "Any UGC-approved college; Symbiosis, IGNOU, Amity, or state colleges",
        entryRole: "Software Developer / Associate SDE",
        salaryRange: "₹4L–₹8L/yr",
        educationCost: "₹60K–₹4L total",
        ladderNote:
          "BCA graduates can join MCA (2-year master's) or get certified in AWS / Azure. Some companies count BCA + strong portfolio equivalent to B.Tech for mid-level roles.",
      },
      {
        years: 4,
        label: "4–5 Years",
        qualification: "B.Tech / BE Computer Science or IT",
        route:
          "IIT (JEE), NIT (JEE Main), BITS (BITSAT), VIT, SRM, or any AICTE-approved college",
        entryRole: "SDE-I / Software Engineer (campus hire)",
        salaryRange: "₹6L–₹18L/yr",
        educationCost: "₹3L–₹20L total",
        ladderNote:
          "B.Tech is the gold standard for top product companies. After 2–3 years of work experience, you can apply for M.Tech or MBA at IIMs to move into tech leadership.",
      },
      {
        years: 5,
        label: "6+ Years",
        qualification: "M.Tech / MS in Computer Science",
        route: "IIT M.Tech (GATE), IIITs, or foreign MS programmes",
        entryRole: "Senior SDE / Tech Lead / Research Engineer",
        salaryRange: "₹14L–₹40L/yr",
        educationCost: "₹1L–₹8L (IIT) or ₹40L–₹80L (foreign)",
        ladderNote:
          "M.Tech opens doors to research-track roles in FAANG, ISRO, and academia. GATE score is valid for 3 years — you can work first, then apply.",
      },
      {
        years: 6,
        label: "PhD / Fellowship",
        qualification: "PhD in Computer Science / AI",
        route: "IISc, IIT PhD programme, CMU, Stanford (foreign)",
        entryRole: "Research Scientist / Principal Engineer / Professor",
        salaryRange: "₹20L–₹80L/yr (industry); ₹10L–₹20L (academia)",
        educationCost: "Fully funded at IISc/IIT (stipend ~₹35K/month)",
        ladderNote:
          "IIT/IISc PhD programmes are fully funded and you receive a monthly stipend. Industry PhD hires at Google Research, Microsoft Research India, and Meta AI pay significantly above regular software roles.",
      },
    ],
  },

  "data-science": {
    careerId: "data-science",
    tiers: [
      {
        years: 1,
        label: "1 Year",
        qualification: "Certificate in Data Science / Analytics",
        route:
          "Coursera (IBM/Google certificates), UpGrad, Analytics Vidhya, or NIIT",
        entryRole: "Data Analyst Intern / Junior Analyst",
        salaryRange: "₹2.4L–₹4.2L/yr",
        educationCost: "₹15K–₹80K total",
        ladderNote:
          "Get a strong Kaggle profile with 3 bronze medals and apply to BCA/BSc Data Science programs as lateral entry. Many companies hire on project portfolio strength alone.",
      },
      {
        years: 2,
        label: "2 Years",
        qualification: "PG Diploma in Data Science / Business Analytics",
        route:
          "IIIT Bangalore (BITS), UpGrad PG Diploma, IIM Calcutta certificate",
        entryRole: "Data Analyst / Business Analyst",
        salaryRange: "₹4L–₹8L/yr",
        educationCost: "₹1L–₹3.5L total",
        ladderNote:
          "PG Diploma holders who build a 5-project portfolio and clear AWS ML Speciality or Google Professional Data Engineer can command B.Tech-equivalent salaries within 2 years of first job.",
      },
      {
        years: 3,
        label: "3 Years",
        qualification: "B.Sc Statistics / Mathematics / Computer Science",
        route:
          "Delhi University, Mumbai University, Christ University, or St. Stephen's",
        entryRole: "Data Scientist Trainee / Analyst",
        salaryRange: "₹4.5L–₹9L/yr",
        educationCost: "₹40K–₹3L total",
        ladderNote:
          "B.Sc + strong internship + 2 cloud certifications puts you on par with many B.Tech graduates in data roles. Go for M.Sc Data Science (2 years) for research-track careers.",
      },
      {
        years: 4,
        label: "4–5 Years",
        qualification: "B.Tech CSE / B.Tech with Statistics minor",
        route: "IIT (JEE Advanced), NIT (JEE Main), BITS Pilani (BITSAT)",
        entryRole: "Data Scientist / ML Engineer",
        salaryRange: "₹7L–₹20L/yr",
        educationCost: "₹3L–₹18L total",
        ladderNote:
          "B.Tech graduates who specialise in ML/AI electives and publish on Kaggle / GitHub typically land ₹12–20 LPA on campus. Further study via M.Tech (GATE) is optional.",
      },
      {
        years: 5,
        label: "6+ Years",
        qualification: "M.Sc Data Science / M.Tech AI or MS Statistics",
        route: "IIT, IISc, CMI, ISI Kolkata, or foreign universities",
        entryRole: "Senior Data Scientist / ML Research Engineer",
        salaryRange: "₹12L–₹35L/yr",
        educationCost: "₹1L–₹6L (IIT/ISI) or ₹30L–₹60L (abroad)",
        ladderNote:
          "ISI Kolkata and CMI are world-class in Statistics/CS. GATE + stellar CGPA opens M.Tech at IITs. Published papers significantly boost salary negotiation leverage.",
      },
      {
        years: 6,
        label: "PhD / Fellowship",
        qualification: "PhD in Statistics / ML / Data Science",
        route: "IISc, IIT Bombay, TIFR, CMI, ISI Kolkata, or foreign",
        entryRole: "Research Scientist / Principal Data Scientist",
        salaryRange: "₹18L–₹60L/yr (industry PhD)",
        educationCost: "Fully funded with stipend at IISc/IIT/ISI",
        ladderNote:
          "Research Scientist roles at Google DeepMind India, Amazon Science, and Microsoft Research prefer or require a PhD. Stipend at IISc (~₹35–38K/month) covers living costs in Bangalore.",
      },
    ],
  },

  "ai-ml-engineering": {
    careerId: "ai-ml-engineering",
    tiers: [
      {
        years: 1,
        label: "1 Year",
        qualification: "AI / ML Certificate (Foundational)",
        route: "DeepLearning.AI (Coursera), fast.ai, Google ML Crash Course",
        entryRole: "ML Ops Intern / AI Support Engineer",
        salaryRange: "₹2.4L–₹4.8L/yr",
        educationCost: "₹10K–₹50K total",
        ladderNote:
          "Build 2 end-to-end ML projects with deployments on Hugging Face or AWS. This portfolio is your ticket to data analyst roles where you can grow into AI engineering within 1–2 years.",
      },
      {
        years: 2,
        label: "2 Years",
        qualification: "PG Diploma in AI / ML (Advanced)",
        route:
          "IIT Madras Online BSc (AI electives), UpGrad AI/ML, Simplilearn",
        entryRole: "ML Engineer Trainee / AI Developer",
        salaryRange: "₹4.5L–₹9L/yr",
        educationCost: "₹80K–₹2.5L total",
        ladderNote:
          "IIT Madras Online BSc with AI electives is a nationally recognised qualification and can be completed in 2–4 years while working. It's a strong credential for ML roles.",
      },
      {
        years: 3,
        label: "3 Years",
        qualification: "BSc Computer Science / Mathematics with AI focus",
        route: "IIT Madras Online BSc, or any UGC college with strong CS dept",
        entryRole: "ML Engineer / AI Developer",
        salaryRange: "₹5L–₹12L/yr",
        educationCost: "₹50K–₹3L total",
        ladderNote:
          "BSc + specialised AI/ML certifications (TensorFlow Developer, AWS ML) + strong project portfolio bridges gap to B.Tech level compensation within 2–3 years of experience.",
      },
      {
        years: 4,
        label: "4–5 Years",
        qualification: "B.Tech CSE with AI/ML specialisation",
        route:
          "IIT (JEE Advanced), IIIT Hyderabad (UGEE), BITS Pilani (BITSAT)",
        entryRole: "ML Engineer / AI Engineer (campus hire)",
        salaryRange: "₹8L–₹24L/yr",
        educationCost: "₹3L–₹20L total",
        ladderNote:
          "IIIT Hyderabad's CND programme (dual degree) is India's best undergrad AI programme. IIT Madras + Bombay have strong ML research groups. Internships at Nvidia/Google India decide salary.",
      },
      {
        years: 5,
        label: "6+ Years",
        qualification: "M.Tech AI / M.Tech CSE with AI thesis",
        route: "IIT Bombay, IIT Delhi, IIT Madras, IISc (GATE required)",
        entryRole: "Senior ML Engineer / AI Research Engineer",
        salaryRange: "₹14L–₹45L/yr",
        educationCost: "₹1L–₹5L (GATE fellowship often covers fees)",
        ladderNote:
          "M.Tech from IIT/IISc in AI is extremely valuable. GATE-qualified candidates get a ₹12,400/month stipend. Thesis in generative AI / robotics / computer vision maximises industry placement.",
      },
      {
        years: 6,
        label: "PhD / Fellowship",
        qualification: "PhD in AI / Machine Learning / Robotics",
        route: "IISc (CDS dept), IIT Bombay (KReSIT), IIT Madras, TIFR, CMI",
        entryRole: "Research Scientist / Principal AI Engineer",
        salaryRange: "₹20L–₹80L+ (industry); ₹10L–₹25L (academia)",
        educationCost: "Fully funded + stipend (IISc: ₹35–38K/month)",
        ladderNote:
          "Google DeepMind India, Microsoft Research, Adobe Research, and Amazon Science hire AI PhDs at ₹40–80 LPA. IISc PhDs in AI are globally competitive for postdoc and industry research roles.",
      },
    ],
  },

  cybersecurity: {
    careerId: "cybersecurity",
    tiers: [
      {
        years: 1,
        label: "1 Year",
        qualification: "CompTIA Security+ / Ethical Hacking Certificate",
        route:
          "EC-Council CEH, Simplilearn, or self-study via TryHackMe / Hack The Box",
        entryRole: "Junior Security Analyst / IT Support with Security focus",
        salaryRange: "₹2.4L–₹4.8L/yr",
        educationCost: "₹25K–₹80K total",
        ladderNote:
          "CompTIA Security+ is globally recognised and one of the fastest paths to SOC Analyst roles. After 1 year of experience, pursue CEH or OSCP for a significant salary bump.",
      },
      {
        years: 2,
        label: "2 Years",
        qualification:
          "PG Diploma in Cyber Security / ADCA with security specialisation",
        route: "CDAC, DSCI, NIIT, or IGNTU distance programmes",
        entryRole: "SOC Analyst / Security Tester",
        salaryRange: "₹3.5L–₹7L/yr",
        educationCost: "₹40K–₹1.5L total",
        ladderNote:
          "CDAC PG Diploma in Cyber Security is one of India's most respected credentials. After 2 years in a SOC role, target OSCP or CISSP to move into Penetration Testing.",
      },
      {
        years: 3,
        label: "3 Years",
        qualification: "BCA / BSc Computer Science with networking focus",
        route:
          "Symbiosis, Amity, or any UGC-approved college; complement with CompTIA/EC-Council certs",
        entryRole: "Cybersecurity Analyst / Network Security Engineer",
        salaryRange: "₹4L–₹9L/yr",
        educationCost: "₹60K–₹3.5L total",
        ladderNote:
          "BCA with CCNA + CEH certifications is a strong combination for mid-level security roles. Target B.Tech lateral entry or M.Sc Cyber Security for senior positions.",
      },
      {
        years: 4,
        label: "4–5 Years",
        qualification: "B.Tech CSE / B.Tech Information Security",
        route: "NIT (JEE Main), VIT, Manipal, SRM, or CDAC-affiliated colleges",
        entryRole: "Cybersecurity Engineer / Penetration Tester",
        salaryRange: "₹5L–₹16L/yr",
        educationCost: "₹3L–₹15L total",
        ladderNote:
          "B.Tech graduates with OSCP or CISSP earn 40–60% more than uncertified peers. Top employers include TCS Cyber Security CoE, Deloitte Cyber, and government CERT-In agencies.",
      },
      {
        years: 5,
        label: "6+ Years",
        qualification: "M.Tech Cyber Security / M.Sc Information Security",
        route: "IIT Kanpur (C3i Hub), IIIT Delhi, NIT Trichy, or CDAC",
        entryRole: "Senior Security Engineer / Red Team Lead",
        salaryRange: "₹10L–₹30L/yr",
        educationCost: "₹1L–₹5L total",
        ladderNote:
          "IIT Kanpur's C3i Hub is India's premier cybersecurity research centre. M.Tech graduates go into CERT-In, DRDO, defence cyber roles, and senior consulting positions.",
      },
      {
        years: 6,
        label: "PhD / Fellowship",
        qualification: "PhD in Information Security / Cyber Warfare",
        route: "IIT Kanpur, IIT Delhi, IIIT Hyderabad, or DRDO Fellowship",
        entryRole:
          "Security Researcher / CISO Track / Government Cyber Advisor",
        salaryRange: "₹15L–₹40L/yr (government/defence)",
        educationCost: "Fully funded at IITs; DRDO stipend ~₹40K/month",
        ladderNote:
          "DRDO offers cyber research fellowships with direct absorption into national security infrastructure. IIT Kanpur PhDs regularly advise CERT-In and contribute to national cybersecurity policy.",
      },
    ],
  },

  "product-management": {
    careerId: "product-management",
    tiers: [
      {
        years: 1,
        label: "1 Year",
        qualification: "Product Management Certificate",
        route: "PM School, Exponent, Reforge, or Product Alliance (online)",
        entryRole:
          "Associate Product Manager (APM) — requires prior domain experience",
        salaryRange: "₹5L–₹9L/yr",
        educationCost: "₹30K–₹1.5L total",
        ladderNote:
          "PM certificates alone rarely get you in without 2+ years of software/design/business experience. Use this to pivot from engineering/design roles — it's a career change credential, not an entry-level one.",
      },
      {
        years: 2,
        label: "2 Years",
        qualification: "PG Diploma in Product Management / Digital Business",
        route:
          "IIIT Bangalore + UpGrad PG Diploma, ISB Certificate, IIM Calcutta EPBM",
        entryRole: "Associate Product Manager",
        salaryRange: "₹7L–₹14L/yr",
        educationCost: "₹1.5L–₹4L total",
        ladderNote:
          "ISB's Product Management certificate carries significant weight with Indian product companies. After 2 years as APM, you can apply for IIM/ISB MBA to become a full PM at a Series B+ startup.",
      },
      {
        years: 3,
        label: "3 Years",
        qualification: "BBA / BCom + PM certifications",
        route:
          "Symbiosis BBA, NMIMS BBA, Christ University + PM School / APM Programme",
        entryRole: "APM / Growth Analyst",
        salaryRange: "₹5L–₹10L/yr",
        educationCost: "₹80K–₹5L total",
        ladderNote:
          "BBA + strong internship at a startup + PM portfolio (case studies, product teardowns) is a strong entry path. Transition to full PM after 1–2 years as growth analyst.",
      },
      {
        years: 4,
        label: "4–5 Years",
        qualification: "B.Tech any stream (tech PM track)",
        route: "IIT, NIT, or any top engineering college",
        entryRole: "SDE-to-PM transition / APM at tech companies",
        salaryRange: "₹8L–₹20L/yr",
        educationCost: "₹3L–₹18L total",
        ladderNote:
          "Tech PMs command highest salaries. B.Tech + 2 years SDE experience + MBA MBA or PM certifications is the highest-ROI path. Google, Amazon, Flipkart, and Zepto all have APM programmes for engineers.",
      },
      {
        years: 5,
        label: "6+ Years",
        qualification: "MBA (IIM, ISB, SPJIMR, MDI)",
        route: "IIM A/B/C (CAT), ISB (GMAT), SPJIMR (CAT/GMAT), MDI Gurgaon",
        entryRole: "Product Manager (2–3 years post-MBA)",
        salaryRange: "₹15L–₹40L/yr",
        educationCost: "₹20L–₹36L total",
        ladderNote:
          "IIM MBA is India's most recognised PM credential for non-technical PMs. After 2–3 years post-MBA PM experience, Director of Product roles pay ₹40–80 LPA at unicorns.",
      },
      {
        years: 6,
        label: "PhD / Fellowship",
        qualification:
          "FPM (Fellow Programme in Management) — IIM equivalent of PhD",
        route: "IIM Ahmedabad FPM, IIM Bangalore FPM (fully funded)",
        entryRole: "Product Strategy / Chief Product Officer (very long path)",
        salaryRange: "₹20L–₹60L/yr (10+ years career)",
        educationCost: "Fully funded with ₹35K–₹45K/month stipend",
        ladderNote:
          "FPM from IIM is for those who want to combine research and industry. Very few PMs take this path — it's primarily for those wanting a professor/research track alongside consulting.",
      },
    ],
  },

  "digital-marketing": {
    careerId: "digital-marketing",
    tiers: [
      {
        years: 1,
        label: "1 Year",
        qualification: "Google Digital Marketing & E-commerce Certificate",
        route:
          "Coursera (Google), HubSpot Academy, Meta Blueprint — all free/low cost",
        entryRole: "Digital Marketing Executive / Social Media Manager",
        salaryRange: "₹2.4L–₹4.8L/yr",
        educationCost: "₹5K–₹30K total",
        ladderNote:
          "Google and Meta certificates are recognised by 150,000+ employers. Build a live campaign portfolio (even personal projects) to jump to ₹5–7 LPA within 1 year of work experience.",
      },
      {
        years: 2,
        label: "2 Years",
        qualification: "PG Diploma in Digital Marketing",
        route: "MICA Ahmedabad (online), Digital Vidya, NIIT, Simplilearn",
        entryRole: "Digital Marketing Executive / SEO Analyst",
        salaryRange: "₹3.5L–₹7L/yr",
        educationCost: "₹60K–₹2.5L total",
        ladderNote:
          "MICA's online PG Diploma is India's most recognised marketing certificate. After 2 years, specialise in Performance Marketing or MarTech to earn ₹8–12 LPA.",
      },
      {
        years: 3,
        label: "3 Years",
        qualification: "BBA Marketing / BA Mass Communication",
        route:
          "Symbiosis, NMIMS, IP University, or Amity for BBA; St. Xavier's for BA",
        entryRole: "Marketing Associate / Brand Executive",
        salaryRange: "₹3L–₹7L/yr",
        educationCost: "₹1L–₹5L total",
        ladderNote:
          "BBA Marketing + Google/HubSpot certifications + 1 internship is the standard entry. MBA in Marketing or specialised UpGrad programme opens senior roles within 3–4 years.",
      },
      {
        years: 4,
        label: "4–5 Years",
        qualification: "BBA / B.Com + MBA Marketing (combined)",
        route: "IIM Indore IPM (5-year), Symbiosis IMT (5-year), NMIMS BBA+MBA",
        entryRole: "Marketing Manager / Growth Manager",
        salaryRange: "₹7L–₹18L/yr",
        educationCost: "₹6L–₹22L total",
        ladderNote:
          "IIM Indore's Integrated Program in Management (IPM) is a 5-year BBA+MBA — among the most efficient paths to a marketing management career without a separate CAT prep cycle.",
      },
      {
        years: 5,
        label: "6+ Years",
        qualification: "MBA in Marketing (IIM, MICA, MDI, XLRI)",
        route: "IIM A/B/C (CAT 99+), MICA (MICAT), XLRI (XAT), MDI Gurgaon",
        entryRole: "Senior Marketing Manager / Brand Manager",
        salaryRange: "₹12L–₹35L/yr",
        educationCost: "₹18L–₹36L total",
        ladderNote:
          "MICA (Mudra Institute of Communications) is India's specialist marketing MBA — Procter & Gamble, HUL, and PepsiCo recruit heavily from MICA. IIM MBA opens FMCG and consulting marketing roles.",
      },
      {
        years: 6,
        label: "PhD / Fellowship",
        qualification: "PhD in Marketing / Consumer Behaviour",
        route: "IIM Ahmedabad FPM, IIM Bangalore FPM, or IIT Management PhD",
        entryRole: "Marketing Research Faculty / Chief Marketing Officer track",
        salaryRange: "₹15L–₹40L/yr (CMO track)",
        educationCost: "Fully funded with monthly stipend at IIMs",
        ladderNote:
          "Very few marketing professionals need a PhD. It's primarily for those who want to teach, do consumer research, or contribute to marketing strategy at a think-tank level.",
      },
    ],
  },

  // ─── HEALTHCARE ────────────────────────────────────────────────────────────────
  "doctor-mbbs": {
    careerId: "doctor-mbbs",
    tiers: [
      {
        years: 1,
        label: "1 Year",
        qualification:
          "Paramedic / Emergency Medical Technician (EMT) Certificate",
        route:
          "AIIMS Paramedic course, IGNOU Certificate in Healthcare, or state health dept",
        entryRole: "Paramedic / EMT / Hospital Ward Assistant",
        salaryRange: "₹1.8L–₹3.6L/yr",
        educationCost: "₹15K–₹60K total",
        ladderNote:
          "This is not the MBBS path but an immediate healthcare entry point. After 2–3 years as a paramedic, you can attempt NEET again or pursue BSc Nursing/BSc Allied Health Sciences.",
      },
      {
        years: 2,
        label: "2 Years",
        qualification:
          "BSc Allied Health Sciences (Diploma level) / BSc Medical Lab Technology",
        route:
          "AIIMS BSc courses, state government colleges, Manipal, or Amrita",
        entryRole:
          "Lab Technician / Radiology Technician / Physiotherapy Assistant",
        salaryRange: "₹2.4L–₹5L/yr",
        educationCost: "₹30K–₹1.5L total",
        ladderNote:
          "Allied Health degrees keep your pathway to MBBS open — you can reappear in NEET while working, or upgrade to a BSc Nursing (3-year bridge) at most recognised universities.",
      },
      {
        years: 3,
        label: "3 Years",
        qualification: "BSc Nursing",
        route:
          "AIIMS BSc Nursing, Manipal College of Nursing, Amrita, or state nursing colleges",
        entryRole: "Registered Nurse (Staff Nurse Grade II)",
        salaryRange: "₹3L–₹6L/yr",
        educationCost: "₹60K–₹3L total",
        ladderNote:
          "BSc Nursing is a respected, independent healthcare career. After 3 years of nursing experience, MSc Nursing or a bridge to MBBS preparation remains an option.",
      },
      {
        years: 4,
        label: "4–5 Years",
        qualification: "MBBS",
        route:
          "Government medical college (NEET 600+), private medical college (NEET 450+)",
        entryRole: "MBBS Doctor / Intern / Junior Resident",
        salaryRange: "₹6L–₹12L/yr (post internship)",
        educationCost: "₹5K–₹1.2L/yr (govt) or ₹10L–₹25L/yr (private)",
        ladderNote:
          "MBBS is the core 5.5-year programme (4.5 years + 1 year internship). After MBBS, you can practice as a General Physician or prepare for PG entrance (NEET-PG) for specialisation.",
      },
      {
        years: 5,
        label: "6+ Years",
        qualification: "MD / MS (Post-Graduate Medical Degree)",
        route:
          "NEET-PG — government and private medical colleges; All India Quota",
        entryRole: "Medical Officer / Specialist Consultant",
        salaryRange: "₹10L–₹30L/yr",
        educationCost: "₹50K–₹1L/yr (govt PG) or ₹5L–₹20L/yr (private)",
        ladderNote:
          "Specialisation is almost mandatory for long-term career growth. Top specialisations by demand: Cardiology, Orthopaedics, Neurology, Dermatology, and Radiology. NEET-PG rank decides your branch.",
      },
      {
        years: 6,
        label: "PhD / Fellowship",
        qualification:
          "DM / MCh (Super-specialisation) or PhD Medical Sciences",
        route: "NEET-SS for DM/MCh; ICMR/DBT Fellowship for research",
        entryRole: "Consultant Specialist / Senior Consultant",
        salaryRange: "₹20L–₹1Cr+/yr (senior consultant)",
        educationCost: "₹20K–₹80K/yr (govt super-speciality)",
        ladderNote:
          "DM Cardiology, MCh Neuro-Surgery are among the highest-earning medical qualifications in India. Senior Consultants in corporate hospitals earn ₹50L–₹2Cr+ depending on speciality and reputation.",
      },
    ],
  },

  "nurse-bsc": {
    careerId: "nurse-bsc",
    tiers: [
      {
        years: 1,
        label: "1 Year",
        qualification: "Certificate in Auxiliary Nursing & Midwifery (ANM)",
        route: "Government ANM training centres, state nursing boards",
        entryRole: "Auxiliary Nurse / Community Health Worker",
        salaryRange: "₹1.8L–₹3L/yr",
        educationCost: "Free (government) or ₹15K–₹50K (private)",
        ladderNote:
          "ANM certificate lets you work immediately in PHCs and community health. After 2–3 years of experience, you can apply for lateral entry into GNM (General Nursing & Midwifery) 2nd year.",
      },
      {
        years: 2,
        label: "2 Years",
        qualification: "General Nursing & Midwifery (GNM) Diploma",
        route: "INC-approved schools, state government nursing colleges",
        entryRole: "Staff Nurse / Junior Nurse",
        salaryRange: "₹2.4L–₹4.8L/yr",
        educationCost: "₹20K–₹1.2L total",
        ladderNote:
          "GNM is the minimum qualification for hospital nursing in India. After 2 years of work experience, you can apply for BSc Nursing lateral entry (2-year top-up) at most universities.",
      },
      {
        years: 3,
        label: "3 Years",
        qualification: "BSc Nursing (4-year or 2-year lateral entry)",
        route:
          "AIIMS BSc Nursing, Manipal, Amrita, CMC Vellore, or any INC-approved college",
        entryRole: "Staff Nurse Grade I / Senior Nurse",
        salaryRange: "₹3.5L–₹7L/yr",
        educationCost: "₹60K–₹3L total (govt); ₹3L–₹8L (private)",
        ladderNote:
          "BSc Nursing is the foundation for career advancement. After 5 years of BSc, you can pursue MSc Nursing (2 years) for specialisation, nursing management, or teaching at nursing colleges.",
      },
      {
        years: 4,
        label: "4–5 Years",
        qualification:
          "BSc Nursing + Post-Basic Certificate in speciality area",
        route:
          "AIIMS, Manipal — Critical Care, OT Nursing, Oncology Nursing certificates",
        entryRole: "Speciality Nurse / ICU Nurse / Operation Theatre Nurse",
        salaryRange: "₹4.5L–₹10L/yr",
        educationCost: "₹80K–₹4L total",
        ladderNote:
          "Speciality nursing commands 30–50% premium over general nursing. Critical Care and OT nursing are most in demand. After speciality, MSc Nursing (2 years) is the path to Nursing Officer roles.",
      },
      {
        years: 5,
        label: "6+ Years",
        qualification: "MSc Nursing",
        route:
          "AIIMS MSc Nursing, Manipal MSc, CMC Vellore MSc, or NIMHANS for Psych Nursing",
        entryRole: "Nursing Officer / Head Nurse / Clinical Nursing Educator",
        salaryRange: "₹6L–₹15L/yr",
        educationCost: "₹80K–₹4L total",
        ladderNote:
          "MSc Nursing opens nursing education (college faculty), hospital nursing management, and public health nursing careers. AIIMS MSc Nursing faculty positions pay ₹10–18 LPA.",
      },
      {
        years: 6,
        label: "PhD / Fellowship",
        qualification: "PhD Nursing / MPhil Nursing",
        route:
          "AIIMS PhD Nursing, Manipal, RGUHS, or TISS for nursing policy research",
        entryRole:
          "Nursing Researcher / Nursing College Principal / Policy Advisor",
        salaryRange: "₹10L–₹22L/yr",
        educationCost: "₹1L–₹3L total (government fellowships available)",
        ladderNote:
          "PhD Nursing in India is primarily for faculty/research careers. WHO India and MOHFW recruit nursing PhDs for public health policy roles. ICMR fellowships support nursing PhD research.",
      },
    ],
  },

  pharmacist: {
    careerId: "pharmacist",
    tiers: [
      {
        years: 1,
        label: "1 Year",
        qualification: "D.Pharm (Diploma in Pharmacy)",
        route:
          "PCI-approved pharmacy college, state polytechnic, or private institute",
        entryRole: "Pharmacist (Retail/Community)",
        salaryRange: "₹2L–₹3.6L/yr",
        educationCost: "₹15K–₹80K total",
        ladderNote:
          "D.Pharm (2-year programme but often noted as 1-year equivalent to year of study) is the minimum qualification to practice as a pharmacist in India. After D.Pharm, lateral entry into B.Pharm 2nd year is available at many PCI-approved colleges.",
      },
      {
        years: 2,
        label: "2 Years",
        qualification: "D.Pharm (Diploma in Pharmacy — full 2-year programme)",
        route:
          "Any PCI-approved college, IGNOU D.Pharm, state government pharmacy colleges",
        entryRole: "Registered Pharmacist / Hospital Pharmacist",
        salaryRange: "₹2.4L–₹4.8L/yr",
        educationCost: "₹20K–₹1.2L total",
        ladderNote:
          "D.Pharm + PCI registration allows you to open a licensed medical store. Government hospital pharmacist roles (₹3–5 LPA) are available in state health departments for D.Pharm holders.",
      },
      {
        years: 3,
        label: "3 Years",
        qualification:
          "B.Pharm (Bachelor of Pharmacy) — lateral entry after D.Pharm",
        route:
          "Jamia Hamdard, Amity, Manipal, Panjab University, or state college with lateral entry",
        entryRole: "Pharmacist / Drug Inspector Trainee / QC Analyst",
        salaryRange: "₹3L–₹6L/yr",
        educationCost: "₹50K–₹3L total",
        ladderNote:
          "B.Pharm opens pharmaceutical manufacturing, quality control, medical representative, and regulatory affairs roles. M.Pharm (2 years) is the natural next step for specialisation.",
      },
      {
        years: 4,
        label: "4–5 Years",
        qualification: "B.Pharm (Full 4-year programme)",
        route:
          "NIPER entrance, Jamia Hamdard, Manipal, BITS Pilani (Pharm), BHU",
        entryRole: "Pharmaceutical Sales / QA/QC / Clinical Research Associate",
        salaryRange: "₹3.5L–₹8L/yr",
        educationCost: "₹1L–₹6L total",
        ladderNote:
          "B.Pharm from BITS Pilani or Jamia Hamdard carries premium value. Clinical Research and Pharmacovigilance are fast-growing areas paying ₹6–12 LPA for B.Pharm graduates with CRA certifications.",
      },
      {
        years: 5,
        label: "6+ Years",
        qualification:
          "M.Pharm (Pharmacology, Pharmaceutics, Regulatory Affairs)",
        route:
          "NIPER (National Institute of Pharmaceutical Education and Research), Manipal, Amrita",
        entryRole:
          "Research Pharmacist / Regulatory Affairs Manager / Medical Affairs",
        salaryRange: "₹6L–₹16L/yr",
        educationCost: "₹1L–₹4L (NIPER); ₹3L–₹8L (private)",
        ladderNote:
          "NIPER (7 campuses: Ahmedabad, Raebareli, Lucknow etc.) is the IIT equivalent for pharmacy — M.Pharm from NIPER opens global pharmaceutical companies (Sun Pharma, Cipla, Aurobindo) at ₹10–20 LPA.",
      },
      {
        years: 6,
        label: "PhD / Fellowship",
        qualification: "PhD Pharmacy / PhD Pharmaceutical Sciences",
        route: "NIPER PhD, IIT Bombay (Biosciences), CSIR-CDRI, CDAC Pharma",
        entryRole:
          "Drug Discovery Scientist / Principal Scientist / Regulatory Expert",
        salaryRange: "₹10L–₹30L/yr (industry PhD)",
        educationCost: "Fully funded at NIPER/CSIR (stipend ₹25–35K/month)",
        ladderNote:
          "CSIR-CDRI (Central Drug Research Institute) and CSIR-NCL are leading pharma research institutions. PhDs here publish in Nature and Science and are sought by global pharma companies for drug discovery roles.",
      },
    ],
  },

  // ─── FINANCE & COMMERCE ────────────────────────────────────────────────────────
  "chartered-accountant": {
    careerId: "chartered-accountant",
    tiers: [
      {
        years: 1,
        label: "1 Year",
        qualification:
          "CA Foundation (CPT replaced by Foundation in 2023 curriculum)",
        route: "ICAI — CA Foundation exam after Class 12 (Commerce/Science)",
        entryRole: "Article Assistant / Accounting Intern",
        salaryRange: "₹1.5L–₹3L/yr (stipend during articleship)",
        educationCost: "₹9K–₹15K (ICAI registration + exam fees)",
        ladderNote:
          "CA Foundation clearance lets you start your 3-year articleship (mandatory practical training under a CA firm). You continue studying CA Intermediate and Final while completing articleship.",
      },
      {
        years: 2,
        label: "2 Years",
        qualification: "CA Intermediate (Group I cleared)",
        route:
          "ICAI — appear after 8 months of articleship; self-study or coaching (ICAI Study Material, ICAI classes)",
        entryRole: "Semi-Qualified CA / Senior Article",
        salaryRange: "₹2.4L–₹4.8L/yr (enhanced articleship stipend)",
        educationCost: "₹15K–₹60K (ICAI fees + coaching if any)",
        ladderNote:
          "CA Inter Group I + Group II clearance within 2–3 attempts is achievable. Many students clear Inter while completing their articleship. After both groups, you appear for CA Final.",
      },
      {
        years: 3,
        label: "3 Years",
        qualification:
          "CA Intermediate (Both Groups) + Articleship in progress",
        route:
          "ICAI — 3-year articleship at a CA firm (mandatory); aim for Big 4 article position",
        entryRole: "Senior Article / Audit Associate",
        salaryRange: "₹3.6L–₹6L/yr",
        educationCost: "Negligible (ICAI fees only)",
        ladderNote:
          "Articleship in a Big 4 firm (Deloitte, EY, KPMG, PwC) significantly boosts placement prospects. Network during articleship — CA Final can be cleared in the same year as articleship completion.",
      },
      {
        years: 4,
        label: "4–5 Years",
        qualification: "CA (Chartered Accountant) — Full qualification",
        route: "ICAI CA Final exam after completing 3-year articleship",
        entryRole: "Chartered Accountant / Manager — Audit, Tax, Advisory",
        salaryRange: "₹6L–₹16L/yr (Big 4 campus hire); ₹5L–₹10L (mid-tier)",
        educationCost: "₹40K–₹1L total over 5 years (ICAI only)",
        ladderNote:
          "CA qualification from ICAI is among the most respected in India. Big 4 campus hires earn ₹7–10 LPA; top rankers get ₹12–18 LPA. After 5 years experience, senior manager roles pay ₹18–35 LPA.",
      },
      {
        years: 5,
        label: "6+ Years",
        qualification: "CA + MBA or CFA",
        route:
          "IIM MBA after CA (direct admission possible), CFA Level I/II/III (CFA Institute)",
        entryRole: "Finance Manager / CFO Track / Investment Analyst",
        salaryRange: "₹14L–₹40L/yr",
        educationCost: "₹20L–₹36L (IIM MBA); CFA ₹3L total",
        ladderNote:
          "CA + CFA is considered the gold standard in India for investment banking and portfolio management. IIM MBA after CA dramatically expands your career options into consulting and general management.",
      },
      {
        years: 6,
        label: "PhD / Fellowship",
        qualification: "FCA (Fellow Member of ICAI) + ICAI Research Fellowship",
        route: "FCA after 5 years of CA membership; ICAI Research Committee",
        entryRole:
          "ICAI Committee Member / Corporate CFO / Independent Director",
        salaryRange: "₹30L–₹1Cr+ (senior CFO or Independent Director)",
        educationCost: "Minimal — primarily membership fees",
        ladderNote:
          "FCA is the senior designation of ICAI membership. Independent Directors (CAs on company boards) earn ₹50L–₹2Cr through sitting fees and ESOPs at publicly listed companies.",
      },
    ],
  },

  "financial-analyst": {
    careerId: "financial-analyst",
    tiers: [
      {
        years: 1,
        label: "1 Year",
        qualification: "BSE/NSE NCFM Certificate / NISM Certifications",
        route:
          "NSE Academy, BSE Institute Ltd — online certifications in financial markets",
        entryRole: "Research Assistant / Junior Equity Analyst Intern",
        salaryRange: "₹2.4L–₹4.5L/yr",
        educationCost: "₹5K–₹25K total",
        ladderNote:
          "NISM Series VIII (Equity Derivatives) and Series X (Investment Adviser) are mandatory for SEBI-registered advisers. Add CFA Level I to significantly upgrade your credentials within 1 year.",
      },
      {
        years: 2,
        label: "2 Years",
        qualification: "BBA Finance (first 2 years) / CFA Level I",
        route:
          "Any UGC college for BBA; CFA Institute for CFA (self-study, ~300 hours)",
        entryRole: "Junior Financial Analyst / Accounts Executive",
        salaryRange: "₹3L–₹6L/yr",
        educationCost: "₹60K–₹3L (BBA); CFA Level I ~₹50K",
        ladderNote:
          "CFA Level I pass rate is ~40% globally. After clearing, add Level II and you're competitive for equity research roles at brokerages paying ₹8–15 LPA.",
      },
      {
        years: 3,
        label: "3 Years",
        qualification: "BBA Finance / B.Com (Hons) + CA Inter",
        route:
          "Shri Ram College of Commerce (SRCC), Calcutta University, Christ University",
        entryRole: "Financial Analyst / Accounts Executive",
        salaryRange: "₹4L–₹8L/yr",
        educationCost: "₹40K–₹3L total",
        ladderNote:
          "B.Com (Hons) from SRCC/St. Stephen's is India's most recognised finance degree for investment banking and consulting recruitment. CFA alongside B.Com is a very strong combination.",
      },
      {
        years: 4,
        label: "4–5 Years",
        qualification: "B.Tech / BBA + CFA Levels I and II",
        route:
          "Top engineering or commerce college + CFA Institute (self-study)",
        entryRole: "Equity Research Analyst / Investment Analyst",
        salaryRange: "₹6L–₹14L/yr",
        educationCost: "₹3L–₹18L (college) + ₹1.5L (CFA)",
        ladderNote:
          "CFA Charterholder (all 3 levels) + 4000 hours work experience = globally recognised credential. Chartered CFA earns ₹12–25 LPA in buy-side roles (mutual funds, hedge funds).",
      },
      {
        years: 5,
        label: "6+ Years",
        qualification: "MBA Finance (IIM, SP Jain, XLRI, FMS)",
        route: "IIM A/B/C (CAT), XLRI (XAT), FMS Delhi (CAT), SP Jain (SPJAT)",
        entryRole: "Senior Financial Analyst / Finance Manager",
        salaryRange: "₹12L–₹40L/yr",
        educationCost: "₹18L–₹36L (IIM); ₹10L–₹20L (others)",
        ladderNote:
          "MBA Finance from IIM or XLRI opens investment banking, private equity, and corporate finance roles. After 5–7 years post-MBA, VP Finance or CFO roles at mid-size companies pay ₹30–60 LPA.",
      },
      {
        years: 6,
        label: "PhD / Fellowship",
        qualification: "PhD Finance / FPM (IIM)",
        route: "IIM Ahmedabad FPM, IIM Bangalore FPM, ISB Research Fellowship",
        entryRole: "Finance Professor / Research Analyst / Chief Economist",
        salaryRange: "₹15L–₹40L/yr",
        educationCost: "Fully funded at IIMs with stipend",
        ladderNote:
          "IIM FPM Finance PhD places graduates in finance faculty positions at IIMs/IITs and in economic research units of RBI, SEBI, and IMF. Very niche — only pursue if academia is your goal.",
      },
    ],
  },

  // ─── LAW & GOVERNANCE ─────────────────────────────────────────────────────────
  "lawyer-advocate": {
    careerId: "lawyer-advocate",
    tiers: [
      {
        years: 1,
        label: "1 Year",
        qualification: "Certificate in Legal Studies / Paralegal Certificate",
        route:
          "NALSAR, NLU Delhi, or private law colleges offering certificate courses",
        entryRole: "Legal Assistant / Paralegal / Court Clerk",
        salaryRange: "₹1.8L–₹3.5L/yr",
        educationCost: "₹10K–₹50K total",
        ladderNote:
          "Paralegal work gives you court exposure without a full law degree. After 1 year, many paralegal workers join LLB 3-year programmes to qualify as advocates. Bar Council of India registers only LLB/LLM graduates.",
      },
      {
        years: 2,
        label: "2 Years",
        qualification: "LLB (first 2 years of 3-year programme)",
        route:
          "Any BCI-approved law college; 3-year LLB requires any bachelor's degree first",
        entryRole: "Law Intern / Junior Associate (during course)",
        salaryRange: "₹1.5L–₹3L/yr (stipend during internship)",
        educationCost: "₹20K–₹2L total so far",
        ladderNote:
          "LLB internships at law firms during your course are critical. Top law firms (AZB, Cyril Amarchand, Trilegal) pay intern stipends and prefer candidates who interned with them during LLB.",
      },
      {
        years: 3,
        label: "3 Years",
        qualification: "LLB (3-year degree)",
        route:
          "BCI-approved college + Bar Council enrollment after clearing AIBE",
        entryRole: "Junior Associate / Advocate",
        salaryRange: "₹3L–₹6L/yr (private practice); ₹2.5L–₹5L (law firm)",
        educationCost: "₹30K–₹3L total",
        ladderNote:
          "After LLB + AIBE clearance + Bar Council enrollment, you are a practising Advocate. LLM (2 years) is the next step for specialisation, academia, or UPSC Law Optional.",
      },
      {
        years: 4,
        label: "4–5 Years",
        qualification: "BA LLB / BBA LLB (5-year integrated degree)",
        route: "NLU (CLAT), Symbiosis Law School (SLAT), Jindal Law (JSAT)",
        entryRole: "Junior Associate at top law firm / Corporate Counsel",
        salaryRange: "₹5L–₹15L/yr (NLU campus placement)",
        educationCost: "₹3L–₹16L total (NLU govt) or ₹10L–₹25L (private)",
        ladderNote:
          "CLAT for NLU is India's most competitive law entrance. NALSAR, NLU Delhi, and NUJS Kolkata are the top NLUs. NLU graduates have the highest law firm placements — ₹10–15 LPA for top NLU graduates.",
      },
      {
        years: 5,
        label: "6+ Years",
        qualification: "LLM (Master of Laws)",
        route:
          "NLUs for LLM (entrance), foreign LLM (Harvard, Oxford, UCL), or NLSIU Bangalore",
        entryRole: "Senior Associate / Legal Counsel / Academic Faculty",
        salaryRange: "₹10L–₹35L/yr",
        educationCost: "₹50K–₹2L (India NLU) or ₹40L–₹80L (foreign LLM)",
        ladderNote:
          "Foreign LLM (Harvard, Oxford) dramatically expands global law firm options. India-based LLM from NLUs is essential for academia. After 7–10 years practice, Senior Partner roles pay ₹50L–₹2Cr.",
      },
      {
        years: 6,
        label: "PhD / Fellowship",
        qualification: "PhD Law / SJD (Doctor of Juridical Science)",
        route: "NLU Delhi, NALSAR, IIT Kharagpur Law, or foreign (Harvard SJD)",
        entryRole: "Law Professor / Constitutional Law Expert / Policy Advisor",
        salaryRange: "₹10L–₹25L/yr (academia); unlimited (Senior Counsel)",
        educationCost: "₹50K–₹2L (NLU); fully funded at some institutions",
        ladderNote:
          "Senior Advocates (SAs) designated by High Courts and Supreme Court are among India's highest-earning professionals — ₹1Cr+ per year. PhD is rare in practice but essential for law faculty careers.",
      },
    ],
  },

  "ias-ips-ifs": {
    careerId: "ias-ips-ifs",
    tiers: [
      {
        years: 1,
        label: "1 Year",
        qualification: "State PCS / SSC CGL (entry to government services)",
        route:
          "UPSC SSC CGL or State PSC (UPPSC, MPSC, BPSC, MPPSC) for state-level roles",
        entryRole: "Government Clerk / Assistant / Section Officer (state)",
        salaryRange: "₹3L–₹6L/yr",
        educationCost: "₹5K–₹30K (exam prep)",
        ladderNote:
          "State government jobs provide financial stability while you prepare for IAS/IPS/IFS. Many officers clear UPSC Civil Services after working 2–3 years in state government roles.",
      },
      {
        years: 2,
        label: "2 Years",
        qualification:
          "State PSC Officer (SDM / Deputy Collector level in some states)",
        route:
          "State Public Service Commission (Category A services) — UPPSC, MPSC, BPSC etc.",
        entryRole: "Block Development Officer / Sub-Divisional Magistrate",
        salaryRange: "₹4.5L–₹9L/yr + government perks",
        educationCost: "₹10K–₹60K (coaching/books)",
        ladderNote:
          "State PCS officers can lateral-shift to IAS via promotion after 8–10 years (Select List). Many state officers also continue appearing for UPSC CSE while in service.",
      },
      {
        years: 3,
        label: "3 Years",
        qualification: "UPSC CSE Prelims cleared + Mains preparation",
        route:
          "Self-study / Vajiram & Ravi / Vision IAS / Forum IAS coaching in Delhi",
        entryRole:
          "Still in preparation phase (first 3 years post-graduation typically)",
        salaryRange: "N/A (preparation phase)",
        educationCost: "₹1L–₹3.5L total (coaching + books + test series)",
        ladderNote:
          "The average age of UPSC selection is 26–28. Starting focused preparation from final year of graduation is optimal. Most selected candidates attempt UPSC 2–3 times before clearing.",
      },
      {
        years: 4,
        label: "4–5 Years",
        qualification:
          "Any bachelor's degree (minimum eligibility for UPSC CSE)",
        route:
          "Any 3-year degree — BA, B.Sc, B.Com, B.Tech from any recognised university",
        entryRole: "Preparing for UPSC Civil Services",
        salaryRange: "N/A (preparation)",
        educationCost: "₹30K–₹5L (degree) + prep costs",
        ladderNote:
          "UPSC CSE has no preferred stream — B.Tech graduates, BA graduates, and doctors have all topped the exam. Optional subject choice matters more than your graduation stream.",
      },
      {
        years: 5,
        label: "6+ Years",
        qualification: "IAS / IPS / IFS Officer (cleared UPSC CSE)",
        route:
          "UPSC Civil Services Examination — 3-stage: Prelims, Mains, Interview",
        entryRole: "IAS: SDM / Joint Collector | IPS: DSP | IFS: Vice Consul",
        salaryRange:
          "₹9L–₹15L/yr starting (Pay Matrix Level 10) + accommodation, vehicle, perks",
        educationCost: "₹1L–₹4L total prep + degree costs",
        ladderNote:
          "IAS/IPS is arguably the highest-prestige career in India. Pay in rupees understates real value — government accommodation, vehicle, household staff, and pension are significant. Career apex: Cabinet Secretary / DGP / Foreign Secretary.",
      },
      {
        years: 6,
        label: "PhD / Fellowship",
        qualification: "Mid-career PhD / Chevening / Fulbright Fellowship",
        route:
          "Chevening (UK), Fulbright (USA), DAAD (Germany) — available for serving IAS/IPS officers",
        entryRole: "Joint Secretary / Director General / Policy Advisor",
        salaryRange: "₹12L–₹22L/yr (Joint Secretary level)",
        educationCost: "Fully funded (international fellowships)",
        ladderNote:
          "Many IAS/IPS officers pursue mid-career master's degrees at Oxford, Harvard, or Princeton via government scholarships. This enhances posting prospects to UN, World Bank secondments, and international assignments.",
      },
    ],
  },

  // ─── DESIGN & CREATIVE ─────────────────────────────────────────────────────────
  "ux-ui-designer": {
    careerId: "ux-ui-designer",
    tiers: [
      {
        years: 1,
        label: "1 Year",
        qualification:
          "UX Design Certificate (Google / Meta / Interaction Design Foundation)",
        route:
          "Coursera (Google UX Design Certificate), Interaction Design Foundation, or Designboat",
        entryRole: "UI Designer Intern / Junior Designer",
        salaryRange: "₹2.4L–₹5L/yr",
        educationCost: "₹10K–₹60K total",
        ladderNote:
          "Google UX Design Certificate + a 5-project portfolio on Behance/Dribbble is a genuine path to ₹5–8 LPA roles at startups within 1 year. Figma proficiency is mandatory.",
      },
      {
        years: 2,
        label: "2 Years",
        qualification: "PG Diploma in UX/UI Design",
        route:
          "Springboard UX, DesignBoat, Designerrs Academy, or NID short programmes",
        entryRole: "UX Designer / Product Designer (Trainee)",
        salaryRange: "₹4L–₹8L/yr",
        educationCost: "₹80K–₹2.5L total",
        ladderNote:
          "NID (National Institute of Design) short programmes are industry-recognised. After 2 years of design work, pursue NID or IDC IIT Bombay's PG Design degree for research-level roles.",
      },
      {
        years: 3,
        label: "3 Years",
        qualification:
          "B.Des (Bachelor of Design) — Communication Design / Interaction Design",
        route:
          "NID Ahmedabad (NIDA), MIT Institute of Design, Symbiosis School of Design, NIFT",
        entryRole: "UX Designer / Product Designer",
        salaryRange: "₹4.5L–₹10L/yr",
        educationCost: "₹2L–₹8L total",
        ladderNote:
          "B.Des from NID or Symbiosis School of Design is a strong credential. NIDA (NID entrance) tests drawing, creative thinking, and spatial reasoning — not academic marks. 2 years of practice + NID B.Des = top design firm placements.",
      },
      {
        years: 4,
        label: "4–5 Years",
        qualification:
          "B.Des + specialisation in UX Research or Interaction Design",
        route:
          "NID, IDC IIT Bombay (IDC), MICA Design, or MIT School of Design",
        entryRole: "UX Designer / UX Researcher",
        salaryRange: "₹6L–₹16L/yr",
        educationCost: "₹3L–₹12L total",
        ladderNote:
          "IDC (Industrial Design Centre) at IIT Bombay is India's premiere design school for tech-focused design. Graduates work at Google, Microsoft, Swiggy, and Razorpay. After 3 years, M.Des (2 years) opens senior/lead roles.",
      },
      {
        years: 5,
        label: "6+ Years",
        qualification:
          "M.Des (Master of Design) in Interaction / Communication Design",
        route:
          "NID PG (PGDPD), IDC IIT Bombay M.Des, or foreign (Parsons, RCA)",
        entryRole: "Senior UX Designer / Design Lead / Head of Design",
        salaryRange: "₹12L–₹35L/yr",
        educationCost: "₹1.5L–₹5L (India) or ₹30L–₹60L (abroad)",
        ladderNote:
          "IDC IIT Bombay M.Des and NID PG are fully funded via NID/MCM scholarships. M.Des graduates from IDC typically land at Google, Flipkart, Razorpay at ₹18–35 LPA.",
      },
      {
        years: 6,
        label: "PhD / Fellowship",
        qualification: "PhD Design / Research through Design",
        route:
          "NID PhD, IDC IIT Bombay PhD, or international design research programmes",
        entryRole: "Design Researcher / Design Professor / Innovation Lead",
        salaryRange: "₹12L–₹30L/yr",
        educationCost: "Funded positions available at NID and IIT",
        ladderNote:
          "Very niche — mainly for those who want to teach design or lead innovation labs at companies like IBM Research India or Philips Design India. Design PhD is more about research impact than salary.",
      },
    ],
  },

  // ─── EDUCATION ──────────────────────────────────────────────────────────────────
  "teacher-educator": {
    careerId: "teacher-educator",
    tiers: [
      {
        years: 1,
        label: "1 Year",
        qualification: "D.El.Ed (Diploma in Elementary Education)",
        route:
          "State government DIETs (District Institutes of Education and Training) — free",
        entryRole: "Primary School Teacher (Classes 1–8)",
        salaryRange: "₹2.4L–₹4.5L/yr (government primary school)",
        educationCost:
          "Free at government DIETs; ₹15K–₹50K at private institutes",
        ladderNote:
          "D.El.Ed is the minimum qualification to teach primary school and appear for CTET. After D.El.Ed + CTET clearance, upgrade to B.Ed (2 years) for secondary school teaching eligibility.",
      },
      {
        years: 2,
        label: "2 Years",
        qualification: "B.Ed (Bachelor of Education)",
        route:
          "RIE (Regional Institute of Education — NCERT), state B.Ed colleges, IGNOU B.Ed",
        entryRole: "Secondary / Higher Secondary Teacher (Classes 9–12)",
        salaryRange: "₹3L–₹6L/yr (private school); ₹5L–₹9L (government school)",
        educationCost: "₹15K–₹80K (RIE/IGNOU) or ₹1L–₹3L (private colleges)",
        ladderNote:
          "B.Ed + CTET/TET clearance is mandatory for government school teaching. After 5 years of experience, CBSE/KVS schools offer ₹7–12 LPA + government perks. M.Ed (2 years) opens school principal and teacher-training roles.",
      },
      {
        years: 3,
        label: "3 Years",
        qualification: "BA / B.Sc in Subject + B.Ed (combined approach)",
        route:
          "4-year integrated B.A.B.Ed or B.Sc.B.Ed at RIEs or Central Universities",
        entryRole: "Trained Graduate Teacher (TGT)",
        salaryRange: "₹4L–₹8L/yr",
        educationCost: "₹30K–₹2L total (at RIE NCERT — merit-based admission)",
        ladderNote:
          "RIE NCERT offers 4-year integrated B.Sc.B.Ed — one of India's best teacher education programmes. Graduates are eligible for KVS, NVS, and CBSE-affiliated school positions.",
      },
      {
        years: 4,
        label: "4–5 Years",
        qualification:
          "BA/B.Sc + B.Ed (sequential) OR Integrated 4-year B.El.Ed",
        route:
          "Delhi University B.El.Ed (4-year), RIEs, or any NCTE-approved college",
        entryRole: "PGT / TGT / Primary School Teacher",
        salaryRange: "₹4.5L–₹10L/yr",
        educationCost: "₹40K–₹4L total",
        ladderNote:
          "DU's B.El.Ed is considered India's best elementary teacher education programme. After B.El.Ed, CTET Paper I + II clearance and applying to DU cluster schools or KVS is the standard path.",
      },
      {
        years: 5,
        label: "6+ Years",
        qualification: "M.Ed (Master of Education) or MA Education",
        route: "NCERT/RIE M.Ed, TISS MA Education, Azim Premji University",
        entryRole: "School Principal / Teacher Educator / Education Researcher",
        salaryRange: "₹7L–₹18L/yr",
        educationCost: "₹50K–₹3L total",
        ladderNote:
          "TISS MA Education and Azim Premji University are India's most progressive teacher education institutions. M.Ed from NCERT/RIE opens college lecturer positions (education) and school principal track.",
      },
      {
        years: 6,
        label: "PhD / Fellowship",
        qualification: "PhD Education",
        route: "NCERT, TISS, Azim Premji University, or IIT Education PhD",
        entryRole:
          "Education Researcher / University Professor / Education Policy Advisor",
        salaryRange: "₹8L–₹20L/yr (academia); ₹12L–₹30L (policy/NGO)",
        educationCost:
          "JRF/SRF fellowship covers education (₹25–28K/month stipend)",
        ladderNote:
          "UGC-NET clearance + PhD is the path to college/university lectureships. Azim Premji Foundation and ASER (Annual Status of Education Report) are leading education research employers for PhD holders.",
      },
    ],
  },
};

/**
 * Get the tier label for a given year value from the slider (1-5 scale)
 * Maps: 1→1yr, 2→2yr, 3→3yr, 4→4-5yr, 5→6+yr
 */
export function getTierFromSlider(sliderValue: number): number {
  const mapping: Record<number, number> = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };
  return mapping[sliderValue] ?? 3;
}
