/**
 * Unified Career Data — V2
 * Contains all 6 Tech careers (from techDigitalCareers.ts) + 5 Healthcare + 4 Finance stubs
 */

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
  profileComingSoon?: boolean;
}

// ─── HEALTHCARE CAREERS ───────────────────────────────────────────────────────

const healthcareCareers: Record<string, CareerProfile> = {
  "doctor-mbbs": {
    id: "doctor-mbbs",
    dayInTheLife:
      "Dr. Meera arrives at the hospital at 8 AM for morning rounds, reviewing overnight patient charts. By 9 she's in OPD seeing 20–30 patients, diagnosing conditions, ordering investigations, and adjusting medications. Afternoons involve ward rounds, procedures, and coordination with specialists. Emergency cases can arrive any time, requiring rapid assessment and decisive action. She ends her day with documentation and continuing medical education reading.",
    dayInTheLifeStructured: {
      earlyCareer: [
        {
          time: "8:00 AM",
          title: "Morning ward rounds",
          detail:
            "Review overnight patient charts with the senior resident. Present case summaries to the attending physician. Learn to prioritize critical patients and communicate findings clearly.",
          tools: ["Hospital EMR", "Stethoscope", "Clinical guidelines app"],
        },
        {
          time: "10:00 AM",
          title: "OPD consultations",
          detail:
            "See 15–25 outpatients under supervision. Take history, examine, diagnose, and prescribe. Each case teaches pattern recognition — the core skill of medicine.",
          tools: [
            "Clinical examination kit",
            "Drug reference (MIMS)",
            "Lab results system",
          ],
        },
        {
          time: "1:30 PM",
          title: "Procedures & investigations",
          detail:
            "Assist with minor procedures: IV lines, sutures, blood draws. Learn to interpret X-rays, ECGs, and blood reports. This hands-on work builds clinical confidence faster than any textbook.",
          tools: ["Procedure kit", "Radiology PACS system", "ECG machine"],
        },
        {
          time: "4:00 PM",
          title: "Emergency duty rotation",
          detail:
            "The emergency room teaches rapid assessment. Triage patients by urgency, stabilize critical cases, and call specialists when needed. High pressure, high learning.",
          tools: ["Emergency tray", "Crash cart", "Pulse oximeter"],
        },
        {
          time: "7:00 PM",
          title: "Documentation & CME",
          detail:
            "Complete patient notes and discharge summaries accurately. Read one clinical guideline or case study before sleep. Continuous learning is not optional in medicine — it's professional obligation.",
          tools: ["Hospital software", "UpToDate", "NEJM / Lancet app"],
        },
      ],
      established: [
        {
          time: "8:00 AM",
          title: "Department head rounds",
          detail:
            "Lead the team round: supervise residents, make clinical decisions on complex cases, discuss management plans. You are accountable for outcomes now, not just tasks.",
          tools: ["EMR", "PACS", "MDT platform"],
        },
        {
          time: "10:30 AM",
          title: "Complex OPD / specialty clinic",
          detail:
            "Run your own specialty clinic. See referred complex cases. Make definitive diagnoses, plan long-term management. Your pattern recognition is now encyclopedic.",
          tools: [
            "Ultrasound (if applicable)",
            "Endoscopy suite",
            "Lab integration",
          ],
        },
        {
          time: "1:00 PM",
          title: "Elective procedures / surgery",
          detail:
            "Perform procedures in your specialty: surgeries, interventions, biopsies. Senior-level work is precise, efficient, and often teaches a junior surgeon simultaneously.",
          tools: ["OT suite", "Laparoscope", "Surgical instruments"],
        },
        {
          time: "3:30 PM",
          title: "Academic & research work",
          detail:
            "Review ongoing research protocols, mentor PG students, and contribute to clinical audits. Academic medicine requires teaching and publishing alongside clinical practice.",
          tools: ["SPSS / statistical software", "PubMed", "Research portal"],
        },
        {
          time: "5:30 PM",
          title: "Administration & policy",
          detail:
            "Department meetings, protocol revisions, hospital committee work. Senior doctors shape how medicine is practiced at an institutional level.",
          tools: [
            "Hospital management system",
            "WHO guidelines",
            "NABH standards",
          ],
        },
      ],
    },
    timeTierRoadmap: [
      {
        years: "1 yr",
        label: "Paramedic / Health Worker Certificate",
        qualification:
          "Certificate in Paramedic Sciences or Community Health Worker",
        route:
          "St. John's Ambulance, Red Cross, or State Health Department training centers",
        entryRole:
          "Community Health Worker, Ambulance Technician, Hospital Aide",
        salaryRange: "\u20B91.5L\u20133L/yr",
        cost: "\u20B95K\u201330K",
        ladderNote:
          "This level provides healthcare exposure and income quickly. You can pursue ANM (2-year Auxiliary Nursing and Midwifery) or GNM later as a stepping stone toward nursing or allied health roles.",
      },
      {
        years: "4.5 yrs",
        label: "MBBS Degree",
        qualification: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
        route:
          "Government medical colleges via NEET UG (600+ score) — AIIMS, JIPMER, state colleges",
        entryRole: "Medical Officer, Junior Resident, General Practitioner",
        salaryRange:
          "\u20B96L\u201312L/yr (Govt) | \u20B910L\u201320L (Private)",
        cost: "\u20B950K\u20131.5L/yr (Govt) | \u20B910L\u201325L/yr (Private)",
        ladderNote:
          "MBBS is the foundation. You can practice as a GP immediately after internship, or pursue MD/MS specialization (3 more years via NEET PG). Most doctors earn their highest income 10–15 years into practice.",
      },
      {
        years: "7 yrs",
        label: "MBBS + 1 Year Internship + MD/MS Residency Entry",
        qualification:
          "MBBS + compulsory rotating internship (1 year) + NEET PG preparation",
        route:
          "Post-MBBS: 1-year internship at a teaching hospital, then NEET PG for MD/MS admission",
        entryRole:
          "Junior Resident (Specialization), Medical Officer in Government service",
        salaryRange: "\u20B96L\u201312L/yr during residency",
        cost: "Internship is paid (stipend). NEET PG coaching: \u20B91L\u20133L.",
        ladderNote:
          "NEET PG is highly competitive (1.8 lakh candidates for ~40K seats). MD/MS in a good specialty at a good hospital is the career pivot that determines your long-term earning and practice potential.",
      },
      {
        years: "9 yrs",
        label: "MD / MS Specialist",
        qualification:
          "Doctor of Medicine (MD) or Master of Surgery (MS) — 3-year post-MBBS program",
        route:
          "Post-NEET PG at government / private medical colleges. Top: AIIMS Delhi, PGI Chandigarh, JIPMER",
        entryRole:
          "Specialist (Physician, Surgeon, Pediatrician, Gynaecologist, etc.)",
        salaryRange:
          "\u20B918L\u201335L/yr (Senior Resident, Govt) | \u20B925L\u201360L (Private)",
        cost: "\u20B9Stipend during residency (varies by college)",
        ladderNote:
          "MD/MS opens private practice, hospital employment, and super-specialization pathways. Building a private practice post-residency can eventually generate \u20B91Cr+ annually.",
      },
      {
        years: "12+ yrs",
        label: "Super-Specialist (DM / MCh)",
        qualification:
          "Doctorate of Medicine (DM) or Master of Chirurgiae (MCh) — 3-year super-specialty",
        route:
          "NEET SS examination after MD/MS. Institutions: AIIMS, CMC Vellore, SGPGI Lucknow",
        entryRole: "Consultant Cardiologist, Neuro-Surgeon, Oncologist, etc.",
        salaryRange: "\u20B960L\u20132Cr+/yr at peak practice",
        cost: "Minimal — stipend-based training in most government institutions",
        ladderNote:
          "Super-specialization is the peak of clinical medicine. Fellowship programs in the US (USMLE route) or UK (PLAB) can take Indian doctors into global practice, with salaries of $200K–$500K+.",
      },
    ],
    skillsTechnical: [
      "Clinical examination and diagnosis",
      "Evidence-based medicine (EBM)",
      "ECG, X-ray, CT/MRI interpretation",
      "Basic life support (BLS) and ACLS",
      "EMR / hospital management software",
      "Minor surgical procedures and suturing",
    ],
    skillsSoft: [
      "Empathy and patient communication",
      "Decision-making under pressure",
      "Team coordination (MDT)",
      "Continuous learning mindset",
      "Ethical reasoning",
      "Resilience and emotional regulation",
    ],
    educationRoadmapGrade10:
      "Focus on Biology and Chemistry at the highest level. Choose PCB stream for Grade 11–12 without exception. Start NEET awareness — understand the exam pattern, syllabus, and typical preparation timeline.",
    educationRoadmapUG:
      "MBBS (4.5 years + 1 year internship) via NEET UG. Government colleges require 600–650+ score. Private MBBS ranges from \u20B910L–\u20B925L/year. AIIMS and JIPMER are the pinnacle public institutions.",
    educationRoadmapPG:
      "MD or MS (3 years) via NEET PG. Highest demand specialties: General Surgery, Internal Medicine, Obstetrics, Pediatrics, Radiology, Anesthesia, Orthopedics.",
    educationRoadmapPhD:
      "DM / MCh (3 years) for super-specialization. Research MD/PhD dual tracks at AIIMS for academic medicine careers. Fellowship programs (MRCP, FRCS, USMLE) for global practice.",
    topInstitutesIndia: [
      {
        name: "AIIMS New Delhi",
        locationOrCountry: "Delhi",
        instituteType: "AIIMS",
        note: "India's premier medical institution — highest NEET rank required",
      },
      {
        name: "CMC Vellore",
        locationOrCountry: "Vellore, Tamil Nadu",
        instituteType: "Private (Deemed)",
        note: "Excellence in clinical medicine and mission-driven healthcare",
      },
      {
        name: "AFMC Pune",
        locationOrCountry: "Pune",
        instituteType: "Defence Medical College",
        note: "Free education + service commitment — for students open to defence medical career",
      },
      {
        name: "KEM Hospital, Mumbai",
        locationOrCountry: "Mumbai",
        instituteType: "Government",
        note: "Maharashtra's top government medical college with strong residency training",
      },
      {
        name: "JIPMER Puducherry",
        locationOrCountry: "Puducherry",
        instituteType: "JIPMER",
        note: "Accepts NEET scores, strong research and clinical training environment",
      },
    ],
    topInstitutesGlobal: [
      {
        name: "Harvard Medical School",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "World's #1 medical school — accessible via USMLE pathway for Indian graduates",
      },
      {
        name: "Johns Hopkins School of Medicine",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "Top research hospital — fellowship opportunities for Indian specialists",
      },
      {
        name: "University of Oxford Medical School",
        locationOrCountry: "UK",
        instituteType: "University",
        note: "PLAB exam allows Indian MBBS to pursue UK residency",
      },
      {
        name: "UCSF School of Medicine",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "Strong in research and clinical innovation",
      },
      {
        name: "University of Toronto",
        locationOrCountry: "Canada",
        instituteType: "University",
        note: "Canada has a simpler licensing pathway for Indian MBBS graduates",
      },
    ],
    entranceExams: [
      {
        name: "NEET UG",
        description:
          "National Eligibility cum Entrance Test — single entry for all MBBS/BDS programs in India. 180 questions, 720 marks. Conducted by NTA.",
      },
      {
        name: "NEET PG",
        description:
          "Entrance for MD/MS postgraduate medical programs. Conducted after MBBS + internship completion.",
      },
      {
        name: "USMLE Steps 1, 2, 3",
        description:
          "US Medical Licensing Examination — pathway for Indian MBBS doctors to practice in the United States.",
      },
      {
        name: "PLAB",
        description:
          "Professional and Linguistic Assessments Board — UK pathway for international medical graduates (IMGs).",
      },
    ],
    pros: [
      "Profound social impact — you save lives and alleviate suffering",
      "Extremely high social respect and credibility in India",
      "Job security is absolute — doctors are always needed",
      "Private practice can generate extraordinary income (\u20B91Cr+ annually)",
      "Global mobility — Indian MBBS is respected worldwide with licensing exams",
      "Intellectual richness — medicine is a lifelong learning discipline",
    ],
    cons: [
      "Extremely long training timeline — 9–15 years to full specialist level",
      "NEET is brutally competitive (>19 lakh candidates, limited government seats)",
      "Private MBBS fees are substantial (\u20B950L–\u20B91.5Cr total)",
      "Residency years involve long working hours and moderate pay",
      "Emotional burden of patient deaths and suffering is real",
      "Medico-legal risk is increasing in urban private practice",
    ],
    mythsVsReality: [
      {
        myth: "You need to be from a rich family to become a doctor",
        reality:
          "Government MBBS costs \u20B950K–\u20B91.5L/year. Financial aid, bank loans, and scholarships exist. The real barrier is NEET preparation, not money.",
      },
      {
        myth: "Doctors in India don't earn much",
        reality:
          "General physicians earn \u20B910L–25L/yr. Senior specialists earn \u20B930L–60L+. Established private consultants routinely earn \u20B91Cr–2Cr+ annually.",
      },
      {
        myth: "Medicine is only for science students who love biology",
        reality:
          "Medicine requires analytical reasoning, communication, and empathy as much as biology knowledge. Many outstanding doctors were humanities enthusiasts who chose medicine for its human dimension.",
      },
    ],
    grade910SubjectFocus:
      "Biology (Botany + Zoology), Chemistry (Organic, Inorganic, Physical), Physics. All three must be studied to the highest level — NEET tests Class 11 and 12 PCB equally. Start with NCERT books cover-to-cover.",
  },

  "nurse-bsc": {
    id: "nurse-bsc",
    dayInTheLife:
      "A typical shift for nurse Ananya begins with a patient handover from the outgoing shift — reviewing vital signs, ongoing medications, and care plans. She assesses each patient, administers medications precisely on time, monitors IV lines, and communicates clinical changes to the duty doctor. Patient education is a key part of her role — explaining procedures, medications, and post-discharge care. She documents everything meticulously and ensures the ward runs safely and efficiently.",
    dayInTheLifeStructured: {
      earlyCareer: [
        {
          time: "7:00 AM",
          title: "Morning handover & patient assessment",
          detail:
            "Receive handover from night shift nurses. Review each patient's vitals, medications due, and pending investigations. Assess all patients within 30 minutes of shift start.",
          tools: ["Nursing notes", "Vitals monitor", "Medication chart"],
        },
        {
          time: "9:00 AM",
          title: "Medication administration",
          detail:
            "Administer all scheduled medications accurately — right patient, right drug, right dose, right time. Double-check high-risk medications with a second nurse.",
          tools: ["Medication trolley", "Barcoding system", "Drug reference"],
        },
        {
          time: "11:00 AM",
          title: "Procedures and wound care",
          detail:
            "Dressings, catheter care, IV maintenance, sample collection. Clinical skill and aseptic technique are non-negotiable — infections from poor technique cause patient harm.",
          tools: ["Dressing tray", "Sterile gloves", "Wound assessment tool"],
        },
        {
          time: "2:00 PM",
          title: "Patient education",
          detail:
            "Explain discharge instructions, medication schedules, and wound care to patients and families. Good nurse education reduces readmission rates.",
          tools: ["Education pamphlets", "Discharge checklist"],
        },
        {
          time: "4:00 PM",
          title: "Documentation & handover",
          detail:
            "Complete nursing notes for all patients. Prepare handover summary for next shift — concise, accurate, and prioritized by clinical urgency.",
          tools: ["Hospital EMR", "SBAR communication tool"],
        },
      ],
      established: [
        {
          time: "7:00 AM",
          title: "Ward / unit management",
          detail:
            "As senior nurse or charge nurse, manage ward resources: staffing, equipment, bed allocation. Handle escalations and ensure care quality across the team.",
          tools: ["Ward management system", "Staffing app"],
        },
        {
          time: "9:30 AM",
          title: "Complex case coordination",
          detail:
            "Coordinate multi-disciplinary team for complex patients: doctors, physiotherapists, dietitians, social workers. You orchestrate care, not just execute tasks.",
          tools: ["MDT communication platform", "Care pathways"],
        },
        {
          time: "12:00 PM",
          title: "Quality and infection control",
          detail:
            "Audit hand hygiene compliance, review infection rates, and implement improvement protocols. Senior nurses drive clinical governance at the unit level.",
          tools: ["Audit forms", "Infection surveillance system"],
        },
        {
          time: "3:00 PM",
          title: "Staff supervision & mentoring",
          detail:
            "Guide junior nurses and nursing students. Clinical supervision is both a professional responsibility and a leadership opportunity.",
          tools: ["Supervision checklist", "Competency frameworks"],
        },
        {
          time: "5:00 PM",
          title: "Administrative & policy work",
          detail:
            "Review and update nursing care protocols, contribute to hospital accreditation (NABH), and manage ward documentation systems.",
          tools: ["NABH standards", "Policy portal"],
        },
      ],
    },
    timeTierRoadmap: [
      {
        years: "1.5 yrs",
        label: "ANM Certificate",
        qualification:
          "Auxiliary Nursing and Midwifery (ANM) — 1.5 year program",
        route:
          "Government nursing schools and recognized private institutions. Eligibility: Class 10+2 with 40%.",
        entryRole: "Auxiliary Nurse, Health Worker, Midwife at PHC/Sub-center",
        salaryRange:
          "\u20B91.5L\u20132.5L/yr (Govt) | \u20B91.8L\u20133L (Private)",
        cost: "\u20B95K\u201320K (Govt) | \u20B920K\u201350K (Private)",
        ladderNote:
          "ANM certification qualifies you for government community health roles. You can upgrade to GNM (2 more years) or BSc Nursing later without losing your work experience or income.",
      },
      {
        years: "3 yrs",
        label: "GNM Diploma",
        qualification: "General Nursing and Midwifery (GNM) — 3-year diploma",
        route:
          "Nursing schools attached to hospitals; Indian Nursing Council recognition required.",
        entryRole: "Staff Nurse, OT Nurse, ICU Nurse (entry)",
        salaryRange:
          "\u20B92.5L\u20134L/yr (Govt) | \u20B93L\u20135L (Private Hospital)",
        cost: "\u20B920K\u20131.2L/yr",
        ladderNote:
          "GNM opens doors in most hospitals. BSc lateral entry is possible after GNM: complete BSc in 2 years instead of 4. This doubles earning potential over a 10-year career.",
      },
      {
        years: "4 yrs",
        label: "BSc Nursing Degree",
        qualification:
          "Bachelor of Science in Nursing (BSc Nursing) — 4-year degree",
        route:
          "Top institutions: AIIMS Schools of Nursing, RAK College Mumbai, CMC Vellore, Manipal College of Nursing",
        entryRole:
          "Staff Nurse, ICU Nurse, Scrub Nurse, Community Health Nurse",
        salaryRange: "\u20B93L\u20136L/yr | AIIMS nurses: \u20B96L\u20138L+",
        cost: "\u20B960K\u20132L/yr",
        ladderNote:
          "BSc Nursing enables clinical nurse specialist, nursing educator, and hospital administrator roles. MSc Nursing (2 years) or MHA (Masters in Hospital Administration) are the next ladder steps.",
      },
      {
        years: "6 yrs",
        label: "MSc Nursing / Nurse Practitioner",
        qualification:
          "Master of Science in Nursing with specialization (Critical Care, Pediatrics, Oncology, etc.)",
        route:
          "AIIMS, Manipal, SRM, Amrita University. Entry via nursing entrance exams.",
        entryRole: "Clinical Nurse Specialist, Nurse Educator, Ward Sister",
        salaryRange: "\u20B95L\u20138L/yr",
        cost: "\u20B91L\u20132.5L total",
        ladderNote:
          "MSc Nursing with specialization opens roles in ICU management, nurse education, hospital quality, and international nursing (UK, Australia, Canada, Gulf countries). International nursing offers \u20B915L\u201340L+ annually.",
      },
    ],
    skillsTechnical: [
      "Vital sign assessment",
      "Medication administration and safety",
      "Wound care and aseptic technique",
      "IV cannulation",
      "Patient monitoring and EMR documentation",
      "CPR and Basic Life Support (BLS)",
    ],
    skillsSoft: [
      "Patient empathy and communication",
      "Attention to detail and accuracy",
      "Stress and pressure management",
      "Team coordination",
      "Patient education",
      "Cultural sensitivity",
    ],
    educationRoadmapGrade10:
      "Focus on Biology and Chemistry. Any stream works (PCB preferred), but a minimum of 45-50% aggregate in 12th standard is required for BSc Nursing entry.",
    educationRoadmapUG:
      "BSc Nursing (4 years) or GNM (3 years). Top institutions require strong PCB scores. AIIMS BSc Nursing entrance is competitive.",
    educationRoadmapPG:
      "MSc Nursing (2 years) with specialization in Critical Care, Obstetrics, Pediatrics, or Oncology. Opens clinical specialist and educator roles.",
    educationRoadmapPhD:
      "PhD in Nursing Sciences — primarily academic and research-focused. Opens nursing faculty positions at medical universities.",
    topInstitutesIndia: [
      {
        name: "AIIMS Schools of Nursing",
        locationOrCountry: "Pan-India (AIIMS campuses)",
        instituteType: "Government",
        note: "Highly competitive, top clinical training environment",
      },
      {
        name: "RAK College of Nursing, Mumbai",
        locationOrCountry: "Mumbai",
        instituteType: "Private (Deemed)",
        note: "One of India's oldest and most reputed nursing colleges",
      },
      {
        name: "CMC Vellore — Nursing School",
        locationOrCountry: "Vellore",
        instituteType: "Private",
        note: "Mission-based, excellent clinical training",
      },
      {
        name: "Manipal College of Nursing",
        locationOrCountry: "Manipal",
        instituteType: "Private University",
        note: "Strong international nursing placement track record",
      },
      {
        name: "Amrita College of Nursing",
        locationOrCountry: "Coimbatore",
        instituteType: "Private University",
        note: "Good specialization programs and international exposure",
      },
    ],
    topInstitutesGlobal: [
      {
        name: "University of Edinburgh",
        locationOrCountry: "UK",
        instituteType: "University",
        note: "NMC registration allows Indian nurses to practice in the UK",
      },
      {
        name: "McMaster University",
        locationOrCountry: "Canada",
        instituteType: "University",
        note: "Canada actively recruits Indian nurses — NCLEX-RN pathway",
      },
      {
        name: "Deakin University",
        locationOrCountry: "Australia",
        instituteType: "University",
        note: "Australia has simplified the licensing process for Indian BSc Nurses",
      },
      {
        name: "University of Pennsylvania",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "Top nursing school — NCLEX required for US practice",
      },
    ],
    entranceExams: [
      {
        name: "AIIMS BSc Nursing Entrance",
        description:
          "Competitive exam for BSc Nursing admission at AIIMS campuses. Tests Biology, Physics, Chemistry, and General Aptitude.",
      },
      {
        name: "NCLEX-RN",
        description:
          "US nursing licensing exam — enables practice in the United States after Indian BSc Nursing degree.",
      },
      {
        name: "NMC UK Test of Competence",
        description:
          "UK Nursing and Midwifery Council test for overseas nurses seeking UK registration.",
      },
    ],
    pros: [
      "High job security — nursing shortage is severe globally",
      "International career opportunities with good pay (UK, Australia, Canada, Gulf)",
      "Profound patient impact daily",
      "Diverse specialization options (ICU, OT, Oncology, Pediatrics)",
      "Government nursing positions offer job stability and pensions",
      "Relatively accessible entry pathway compared to medicine",
    ],
    cons: [
      "Physically and emotionally demanding work",
      "Irregular shift work including nights and weekends",
      "Salary in India is lower than international counterparts",
      "Nurse-to-patient ratios in India are often unfavorable",
      "Still undervalued despite critical importance in healthcare",
    ],
    mythsVsReality: [
      {
        myth: "Nursing is only for women",
        reality:
          "Male nurses are actively recruited globally and in India's critical care, OT, and emergency nursing. The gender ratio is changing rapidly.",
      },
      {
        myth: "Nurses just follow doctor's orders",
        reality:
          "Nurses assess, monitor, and flag clinical deterioration — often catching life-threatening changes before the doctor. Clinical nursing judgment saves lives daily.",
      },
      {
        myth: "Nursing doesn't pay well",
        reality:
          "International nursing in the UK, Australia, and Gulf pays \u20B915L\u201340L+ annually. Even in India, experienced ICU nurses at private hospitals earn \u20B96L\u20138L.",
      },
    ],
    grade910SubjectFocus:
      "Biology is essential — human anatomy, physiology, and microbiology form the core of nursing science. Chemistry and Physics are also tested in nursing entrance exams. Focus on Class 11-12 PCB.",
  },

  pharmacist: {
    id: "pharmacist",
    dayInTheLife:
      "Pharmacist Vikram starts by reviewing new prescriptions from the morning ward rounds, checking for drug interactions and appropriate dosing. He counsels patients on medication usage, side effects, and storage. Hospital pharmacists participate in clinical rounds and advise doctors on drug selection. Retail pharmacists manage inventory, serve walk-in customers, and maintain state pharmacy board regulations.",
    dayInTheLifeStructured: {
      earlyCareer: [
        {
          time: "9:00 AM",
          title: "Prescription review and dispensing",
          detail:
            "Verify prescriptions for completeness, appropriate dosing, and potential drug interactions. Dispense medications accurately and counsel patients.",
          tools: [
            "Pharmacy management software",
            "MIMS drug reference",
            "Barcode scanner",
          ],
        },
        {
          time: "11:00 AM",
          title: "Drug information queries",
          detail:
            "Answer drug queries from nurses, doctors, and patients. What is the safe dose? Can this drug be crushed? Is this safe in pregnancy? Drug information is your core expertise.",
          tools: ["Micromedex", "Lexicomp", "UpToDate"],
        },
        {
          time: "2:00 PM",
          title: "Inventory management",
          detail:
            "Monitor stock levels, near-expiry medications, and cold chain storage (vaccines, biologics). Medication stockouts cause patient harm — proactive inventory management is critical.",
          tools: ["ERP system", "Temperature loggers", "Procurement portal"],
        },
        {
          time: "4:00 PM",
          title: "Patient counseling",
          detail:
            "Counsel patients on discharge medications: how to take them, what to avoid (grapefruit with statins!), and when to return if problems arise. Pharmacists are accessible medication experts.",
          tools: [
            "Patient counseling aids",
            "Pill organizers",
            "Language-adapted leaflets",
          ],
        },
      ],
      established: [
        {
          time: "9:00 AM",
          title: "Clinical pharmacy rounds",
          detail:
            "Accompany medical team on ICU/ward rounds. Review patient medication lists for rational prescribing, de-escalation opportunities, and high-alert drug safety.",
          tools: [
            "Clinical pharmacy guidelines",
            "Hospital formulary",
            "Drug reconciliation tool",
          ],
        },
        {
          time: "11:30 AM",
          title: "Antimicrobial stewardship",
          detail:
            "Review antibiotic use patterns. Recommend switching from IV to oral, de-escalating broad-spectrum antibiotics, and stopping unnecessary medications. This directly reduces antimicrobial resistance.",
          tools: ["Antibiogram", "ASP software", "Microbiology reports"],
        },
        {
          time: "2:30 PM",
          title: "Research and regulatory work",
          detail:
            "Conduct drug utilization evaluations, contribute to hospital formulary management, and compile adverse drug reaction reports for the national pharmacovigilance program.",
          tools: ["PvPI portal", "Statistical software", "Research database"],
        },
      ],
    },
    timeTierRoadmap: [
      {
        years: "2 yrs",
        label: "D.Pharm Diploma",
        qualification: "Diploma in Pharmacy (D.Pharm) — 2-year program",
        route:
          "Pharmacy Council of India (PCI) approved institutes. Entry: PCB/PCM in Class 12.",
        entryRole: "Retail Pharmacist, Hospital Pharmacy Assistant",
        salaryRange: "\u20B91.8L\u20133L/yr",
        cost: "\u20B920K\u201370K total",
        ladderNote:
          "D.Pharm allows registration as a pharmacist and independent retail pharmacy operation. You can upgrade to B.Pharm later via lateral entry at most universities.",
      },
      {
        years: "4 yrs",
        label: "B.Pharm Degree",
        qualification: "Bachelor of Pharmacy (B.Pharm) — 4-year degree",
        route: "Top: Jamia Hamdard, JSS Mysore, Manipal, Amrita, NIPER Mohali",
        entryRole:
          "Hospital Pharmacist, Retail Pharmacy Manager, Medical Representative",
        salaryRange:
          "\u20B93L\u20136L/yr (Hospital) | \u20B96L\u201312L (Pharma MR/Sales)",
        cost: "\u20B960K\u20132L/yr",
        ladderNote:
          "B.Pharm opens pharmaceutical industry (MR, QA, regulatory, R&D), hospital pharmacy, and clinical pharmacy tracks. M.Pharm adds specialization and significantly improves career ceiling.",
      },
      {
        years: "6 yrs",
        label: "M.Pharm Specialization",
        qualification:
          "Master of Pharmacy (M.Pharm) — 2 years after B.Pharm. Specializations: Clinical Pharmacy, Pharmaceutics, Pharmacology, Quality Assurance",
        route:
          "GPAT (Graduate Pharmacy Aptitude Test) for admission to top government institutes. NIPER is India's premier pharmacy institute.",
        entryRole:
          "Clinical Pharmacist, Drug Regulatory Affairs, QA Manager, R&D Scientist",
        salaryRange:
          "\u20B95L\u201312L/yr | NIPER graduates: \u20B910L\u201318L",
        cost: "\u20B960K\u20131.5L (Govt NIPER) | \u20B91.5L\u20133L (Private)",
        ladderNote:
          "M.Pharm from NIPER is among the most respected pharmacy qualifications in India — equivalent to an IIT degree in industry perception for pharma R&D and regulatory roles.",
      },
      {
        years: "8+ yrs",
        label: "PhD in Pharmaceutical Sciences",
        qualification:
          "Doctor of Philosophy — Pharmaceutical Chemistry, Pharmacology, or Drug Delivery",
        route:
          "NIPER, CSIR labs, IIT Bombay, University of Mumbai, Jamia Hamdard",
        entryRole:
          "Drug Discovery Scientist, Principal Researcher, University Faculty",
        salaryRange:
          "\u20B98L\u201320L/yr (Industry) | \u20B98L\u201312L (Academia)",
        cost: "Primarily fellowship-funded",
        ladderNote:
          "PhD opens global pharma industry (drug discovery), CSIR research labs, and faculty careers at pharmacy colleges. Global pharma companies hire Indian pharmacy PhDs — especially in biologics and drug formulation.",
      },
    ],
    skillsTechnical: [
      "Pharmacokinetics and pharmacodynamics",
      "Drug interaction analysis",
      "Compounding and dispensing",
      "Pharmaceutical calculations",
      "Regulatory affairs (CDSCO)",
      "GMP / GLP compliance",
    ],
    skillsSoft: [
      "Patient counseling",
      "Attention to detail",
      "Clinical communication",
      "Inventory management",
      "Analytical thinking",
      "Continuing education commitment",
    ],
    educationRoadmapGrade10:
      "PCB or PCM for Class 11-12. Chemistry is the most important subject — organic chemistry particularly is the backbone of pharmaceutical sciences.",
    educationRoadmapUG:
      "B.Pharm (4 years) from PCI-approved institute. D.Pharm (2 years) as a faster entry point to retail/hospital pharmacy.",
    educationRoadmapPG:
      "M.Pharm (2 years) with specialization. GPAT score required for NIPER and government institutions. NIPER Mohali is India's top pharmacy institute.",
    educationRoadmapPhD:
      "PhD in Pharmaceutical Sciences at NIPER, CSIR labs, or top universities. Drug discovery and nanomedicine are high-growth research areas.",
    topInstitutesIndia: [
      {
        name: "NIPER Mohali",
        locationOrCountry: "Mohali, Punjab",
        instituteType: "Government",
        note: "India's premier pharmacy institute — equivalent to an IIT for pharma",
      },
      {
        name: "Jamia Hamdard",
        locationOrCountry: "Delhi",
        instituteType: "Deemed University",
        note: "Top pharmacy school with strong Unani and allopathic pharma programs",
      },
      {
        name: "JSS College of Pharmacy",
        locationOrCountry: "Mysore/Ooty",
        instituteType: "Deemed University",
        note: "Top-ranked for B.Pharm and M.Pharm programs",
      },
      {
        name: "Manipal College of Pharmaceutical Sciences",
        locationOrCountry: "Manipal",
        instituteType: "Private University",
        note: "Strong industry connections and research output",
      },
    ],
    topInstitutesGlobal: [
      {
        name: "University of Michigan College of Pharmacy",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "Top US pharmacy program",
      },
      {
        name: "University College London",
        locationOrCountry: "UK",
        instituteType: "University",
        note: "MPharm and PharmD programs with NHS practice",
      },
    ],
    entranceExams: [
      {
        name: "GPAT",
        description:
          "Graduate Pharmacy Aptitude Test — mandatory for M.Pharm admission at government institutions and NIPER.",
      },
      {
        name: "NIPER JEE",
        description:
          "NIPER's own entrance exam for M.Pharm and MBA (Pharmaceutical Management) programs.",
      },
    ],
    pros: [
      "Essential role in healthcare — medication errors prevented by pharmacists save lives",
      "Diverse career paths: hospital, retail, industry, research, regulatory",
      "Strong job security",
      "International opportunities (UK, USA, Middle East)",
      "Pharmaceutical industry pays well at senior levels",
    ],
    cons: [
      "Lower clinical status compared to doctors",
      "Retail pharmacy can be repetitive",
      "Hours can be long and demanding in hospital settings",
      "India's pharmacist-to-population ratio means some areas are saturated",
    ],
    mythsVsReality: [
      {
        myth: "Pharmacists just dispense drugs",
        reality:
          "Clinical pharmacists on hospital rounds prevent serious drug errors, advise on antibiotic stewardship, and are integral to patient safety systems.",
      },
      {
        myth: "Pharmacy is only for science students who failed NEET",
        reality:
          "Top pharmacy programs at NIPER are as competitive as IIT in their domain. Pharma R&D and regulatory affairs careers pay exceptionally well.",
      },
    ],
    grade910SubjectFocus:
      "Chemistry is foundational — organic chemistry directly maps to pharmaceutical sciences. Biology provides the clinical context. PCB or PCM both work; Chemistry must be at the highest level.",
  },

  physiotherapist: {
    id: "physiotherapist",
    dayInTheLife:
      "Physiotherapist Kavitha works across three clinical areas during her day: morning ICU rounds (helping patients regain breathing capacity post-surgery), afternoon orthopedic rehabilitation (knee replacements, fractures, back pain), and evening sports injury clinic. She assesses movement, designs rehabilitation plans, and uses hands-on techniques (manual therapy, exercise prescription) alongside equipment (ultrasound therapy, TENS) to help patients regain function and return to daily life.",
    dayInTheLifeStructured: {
      earlyCareer: [
        {
          time: "8:30 AM",
          title: "ICU respiratory physiotherapy",
          detail:
            "Clear secretions and improve breathing mechanics for post-operative ICU patients. Chest physiotherapy, breathing exercises, and early mobilization significantly reduce complications.",
          tools: [
            "Incentive spirometer",
            "Manual chest percussion",
            "Positioning aids",
          ],
        },
        {
          time: "10:30 AM",
          title: "Orthopedic rehabilitation",
          detail:
            "Treat patients with joint replacements, fractures, and post-surgical recovery. Design exercise protocols and use manual therapy techniques. Progress must be documented and outcome-measured.",
          tools: ["Goniometer", "Ultrasound therapy unit", "TENS machine"],
        },
        {
          time: "2:00 PM",
          title: "Neurological rehabilitation",
          detail:
            "Work with stroke patients, Parkinson's disease, and spinal cord injury cases. Neural rehabilitation is slow but the functional gains — a patient regaining hand grip or walking again — are extraordinarily rewarding.",
          tools: ["Parallel bars", "Balance board", "Gait retraining aids"],
        },
        {
          time: "4:30 PM",
          title: "Patient education & home program",
          detail:
            "Teach patients home exercise programs. Adherence to home exercises determines outcome as much as clinic sessions. Clear demonstration, written instructions, and follow-up checks matter.",
          tools: ["Exercise prescription app", "Demonstration models"],
        },
      ],
      established: [
        {
          time: "9:00 AM",
          title: "Sports performance clinic",
          detail:
            "Work with professional athletes on injury prevention, biomechanical analysis, and performance optimization. Sports physiotherapy is increasingly specialized and well-compensated.",
          tools: [
            "Force plate",
            "Video analysis software",
            "Functional movement screen",
          ],
        },
        {
          time: "11:30 AM",
          title: "Specialized assessment clinics",
          detail:
            "Chronic pain, postural dysfunction, and complex multi-system cases. Senior physiotherapists run specialist clinics using advanced diagnostic reasoning and manual therapy.",
          tools: [
            "Diagnostic ultrasound",
            "Posture analysis software",
            "Manual therapy tools",
          ],
        },
        {
          time: "3:00 PM",
          title: "Private practice / clinical management",
          detail:
            "Many experienced physiotherapists run their own clinics. Managing staff, patient load, equipment, and clinical quality is as demanding as clinical work itself.",
          tools: [
            "Practice management software",
            "Outcome measures",
            "Billing system",
          ],
        },
      ],
    },
    timeTierRoadmap: [
      {
        years: "4 yrs",
        label: "BPT Degree",
        qualification:
          "Bachelor of Physiotherapy (BPT) — 4.5 years (4 years + 6-month internship)",
        route:
          "State medical university entrance, management quota, or direct admission. AIIMS physiotherapy program is highly competitive.",
        entryRole: "Staff Physiotherapist (Hospital), Clinical Physiotherapist",
        salaryRange: "\u20B93L\u20135L/yr | Private clinics: \u20B94L\u20136L",
        cost: "\u20B960K\u20131.5L/yr (Govt) | \u20B91.5L\u20134L/yr (Private)",
        ladderNote:
          "BPT enables independent clinical practice as a licensed physiotherapist. Private practice is achievable within 3-4 years of experience and can generate \u20B98L\u201318L+ annually with a good patient base.",
      },
      {
        years: "6 yrs",
        label: "MPT Specialization",
        qualification:
          "Master of Physiotherapy (MPT) — 2-year post-graduate specialization. Specializations: Orthopedics, Neurology, Sports, Cardiopulmonary, Pediatrics",
        route:
          "AIIMS, Manipal, Amrita, SRM. Entry via physiotherapy-specific entrance exams.",
        entryRole:
          "Senior Physiotherapist, Sports Physiotherapist, Rehabilitation Specialist",
        salaryRange:
          "\u20B95L\u20139L/yr (Hospital) | \u20B98L\u201315L+ (Sports/Private)",
        cost: "\u20B91L\u20132.5L total",
        ladderNote:
          "Sports physiotherapy specialization is the highest-paying path in India, with IPL teams, national sports federations, and premium fitness centers paying \u20B915L\u201330L+.",
      },
      {
        years: "8+ yrs",
        label: "PhD in Physiotherapy / Research",
        qualification:
          "PhD in Physiotherapy Sciences or Rehabilitation Sciences",
        route: "NIMHANS, AIIMS, Manipal University, JSS University",
        entryRole:
          "Physiotherapy Faculty, Clinical Researcher, Rehabilitation Science Head",
        salaryRange:
          "\u20B98L\u201315L/yr (Academia) | Higher in research roles",
        cost: "Primarily fellowship-funded",
        ladderNote:
          "PhD opens university faculty positions and WHO/international health organization research roles. Physiotherapy research in neural regeneration and biomechanics is a growing global field.",
      },
    ],
    skillsTechnical: [
      "Musculoskeletal assessment and joint mobilization",
      "Exercise prescription and rehabilitation protocols",
      "Electrotherapy (TENS, IFT, Ultrasound)",
      "Neurological assessment (stroke, Parkinson's)",
      "Respiratory physiotherapy techniques",
      "Sports biomechanics analysis",
    ],
    skillsSoft: [
      "Patient motivation and behavioral coaching",
      "Attention to clinical detail",
      "Communication and empathy",
      "Physical fitness and stamina",
      "Continuous skill updating",
      "Clinical reasoning",
    ],
    educationRoadmapGrade10:
      "PCB stream is strongly preferred. Biology (anatomy, physiology) and Physics (mechanics) are directly applied. Choose PCB for Grade 11-12.",
    educationRoadmapUG:
      "BPT (4.5 years including internship) from a recognized physiotherapy college. AIIMS BPT is the top qualification.",
    educationRoadmapPG:
      "MPT (2 years) with specialization in Orthopedics, Neurology, Sports, Cardiopulmonary, or Pediatrics.",
    educationRoadmapPhD:
      "PhD in Rehabilitation Sciences at NIMHANS, AIIMS, or top physiotherapy universities. Opens academic and global research careers.",
    topInstitutesIndia: [
      {
        name: "AIIMS Physiotherapy Program",
        locationOrCountry: "Delhi",
        instituteType: "Government",
        note: "Best clinical training environment in India",
      },
      {
        name: "Manipal College of Allied Health Sciences",
        locationOrCountry: "Manipal",
        instituteType: "Private University",
        note: "Comprehensive program with good placement record",
      },
      {
        name: "Amrita School of Physiotherapy",
        locationOrCountry: "Kochi",
        instituteType: "Private University",
        note: "Strong sports and orthopedic specialization",
      },
      {
        name: "NIMHANS Bangalore",
        locationOrCountry: "Bangalore",
        instituteType: "Government",
        note: "Best neurological physiotherapy training",
      },
    ],
    topInstitutesGlobal: [
      {
        name: "University of Melbourne",
        locationOrCountry: "Australia",
        instituteType: "University",
        note: "Australia actively recruits Indian physiotherapists",
      },
      {
        name: "King's College London",
        locationOrCountry: "UK",
        instituteType: "University",
        note: "Advanced sports and neurological physiotherapy research",
      },
    ],
    entranceExams: [
      {
        name: "State BPT Entrance Exams",
        description:
          "Most states have physiotherapy entrance exams via state medical universities or centralized counseling.",
      },
      {
        name: "AIIMS BPT/Allied Health Entrance",
        description:
          "AIIMS conducts separate entrance for BSc Allied Health Sciences including physiotherapy.",
      },
    ],
    pros: [
      "Highly hands-on and personally rewarding clinical work",
      "Growing demand driven by aging population and sports culture",
      "International career opportunities (UK, Australia, Gulf)",
      "Private practice with excellent income ceiling",
      "Growing specialty areas (Sports, Neuro, Pediatrics)",
    ],
    cons: [
      "Physically demanding work — standing for long hours",
      "Starting salaries in India are modest",
      "Undervalued compared to medicine despite complex clinical work",
      "Continuing education required to stay current",
    ],
    mythsVsReality: [
      {
        myth: "Physiotherapy is just massage",
        reality:
          "Physiotherapy encompasses complex neurological rehabilitation, respiratory care in ICU, sports performance science, and cardiac rehabilitation. It is evidence-based clinical practice.",
      },
      {
        myth: "Physiotherapists don't earn well",
        reality:
          "Sports physiotherapists for IPL teams or premium fitness centers earn \u20B915L\u201330L+. Private practice generates excellent income after 3-5 years of experience.",
      },
    ],
    grade910SubjectFocus:
      "Biology (anatomy, physiology) is foundational. Physics (biomechanics, force, movement) is equally important. PCB stream gives the strongest preparation for BPT entry.",
  },

  "medical-researcher": {
    id: "medical-researcher",
    dayInTheLife:
      "Dr. Anand, a biomedical researcher at CSIR-NCBS, starts his day reviewing the latest papers on his research topic. Laboratory work occupies most of his morning: running PCR assays, analyzing genomic data, and troubleshooting experimental protocols. Afternoons involve lab meetings to review team progress, writing grants and manuscripts, and mentoring PhD students. His work on cancer biomarkers could eventually lead to earlier diagnosis tools — the connection between bench research and patient impact drives his commitment.",
    dayInTheLifeStructured: {
      earlyCareer: [
        {
          time: "9:00 AM",
          title: "Literature review and protocol planning",
          detail:
            "Read recent papers to understand the state of your research area. Plan today's experimental protocol based on what worked and what didn't yesterday.",
          tools: ["PubMed", "Mendeley", "Lab notebook"],
        },
        {
          time: "10:30 AM",
          title: "Laboratory experiments",
          detail:
            "Run assays, culture cells, analyze samples. Lab work requires precision, patience, and systematic thinking. Most experiments don't work the first time — that's normal, not failure.",
          tools: [
            "PCR machine",
            "Microscope",
            "Flow cytometer",
            "Pipettes and reagents",
          ],
        },
        {
          time: "2:00 PM",
          title: "Data analysis",
          detail:
            "Process and analyze experimental data. Statistical analysis, graphing, and interpretation of results. A clean, well-documented dataset is as important as the result itself.",
          tools: ["R / Python", "GraphPad Prism", "ImageJ"],
        },
        {
          time: "4:00 PM",
          title: "Lab meetings and journal clubs",
          detail:
            "Present your weekly progress to the team. Critical discussion of methods and results sharpens scientific thinking. Journal clubs keep the team current with global research.",
          tools: ["PowerPoint", "Lab meeting platform"],
        },
      ],
      established: [
        {
          time: "9:00 AM",
          title: "Grant writing and funding strategy",
          detail:
            "Research funding is the oxygen of a lab. Writing successful grants (DST, DBT, ICMR, NIH) requires compelling scientific narrative and meticulous budgeting.",
          tools: [
            "Grant portals (DST, NIH)",
            "Budget tools",
            "Reference managers",
          ],
        },
        {
          time: "11:30 AM",
          title: "Lab oversight and team management",
          detail:
            "Supervise PhD students and postdocs. Review their data, troubleshoot problems, provide career mentoring. Running a research lab is simultaneously scientific and managerial.",
          tools: ["Lab management software", "Project tracking"],
        },
        {
          time: "2:00 PM",
          title: "Manuscript writing and peer review",
          detail:
            "Write research papers for high-impact journals. Also review papers submitted to journals by other researchers. Scientific communication is as important as discovery.",
          tools: ["LaTeX / Word", "Biorender (figures)", "Endnote"],
        },
        {
          time: "4:30 PM",
          title: "Collaborations and conferences",
          detail:
            "Attend virtual seminars, plan collaborative experiments with other labs, and prepare for international conferences. Your network defines your impact as a researcher.",
          tools: ["Zoom", "Google Scholar", "ResearchGate"],
        },
      ],
    },
    timeTierRoadmap: [
      {
        years: "3 yrs",
        label: "BSc in Life Sciences / Biology",
        qualification:
          "B.Sc Biology, Biochemistry, Microbiology, or Biotechnology",
        route:
          "Any university. Premium: Miranda House (Delhi), Fergusson (Pune), Presidency (Kolkata), Christ University (Bangalore)",
        entryRole:
          "Research Technician, Lab Assistant, Quality Control Analyst",
        salaryRange: "\u20B92L\u20133.5L/yr",
        cost: "\u20B925K\u20131L/yr",
        ladderNote:
          "BSc alone provides entry into technical research support roles. MSc is necessary to lead your own projects. The IISc Research Associate Program accepts BSc students directly.",
      },
      {
        years: "5 yrs",
        label: "MSc in Life Sciences",
        qualification:
          "M.Sc Biology, Biochemistry, Biotechnology, or Biomedical Sciences",
        route:
          "IIT-JAM for IIT MSc, JGEEBILS for NCBS/TIFR, CUET for central universities. IISc is the pinnacle.",
        entryRole: "Research Associate, Junior Scientist, Pharmaceutical R&D",
        salaryRange: "\u20B93L\u20136L/yr | Pharma R&D: \u20B96L\u201310L",
        cost: "\u20B960K\u20131.5L (IISc/TIFR: heavily subsidized)",
        ladderNote:
          "IISc Bangalore and TIFR Mumbai MSc programs are world-class. Their graduates get direct PhD admission to Harvard, MIT, and Stanford. If you get into IISc MSc, take it — it changes your trajectory entirely.",
      },
      {
        years: "8 yrs",
        label: "PhD in Biomedical / Life Sciences",
        qualification:
          "PhD in Molecular Biology, Pharmacology, Genetics, Biomedical Engineering, or related field",
        route:
          "IISc, TIFR, NCBS, CCMB, NII, CSIR labs. Entry via GATE Life Sciences, JGEEBILS, or ICMR fellowship.",
        entryRole:
          "Postdoctoral Researcher, Senior Scientist, Research Scientist (Pharma/Biotech)",
        salaryRange:
          "\u20B96L\u201312L/yr (Academia) | \u20B912L\u201325L (Pharma/Biotech Industry)",
        cost: "PhD is fellowship-funded — CSIR-JRF, DBT-JRF, or ICMR fellowships cover living expenses",
        ladderNote:
          "An Indian PhD from IISc, TIFR, or NCBS opens postdoctoral positions at the world's top research institutions. Many Indian researchers at Harvard, Broad Institute, and Stanford are TIFR/IISc alumni.",
      },
      {
        years: "10+ yrs",
        label: "Post-Doc / Independent Researcher (Faculty)",
        qualification:
          "Postdoctoral Fellowship at top institution, then Independent PI (Principal Investigator) or faculty position",
        route:
          "Postdoc at international university or CSIR/DBT lab, then faculty position at IISc, IIT, AIIMS, TIFR, or pharma R&D lead",
        entryRole: "Assistant Professor / Independent Scientist / R&D Head",
        salaryRange:
          "\u20B912L\u201325L/yr (Faculty) | \u20B920L\u201340L (Industry R&D Head)",
        cost: "Competitive fellowship stipend during postdoc",
        ladderNote:
          "Running your own research lab ('PI') is the pinnacle of academic science. Industrial research leadership at companies like Biocon, Lupin, or Novartis is the alternative track with higher immediate compensation.",
      },
    ],
    skillsTechnical: [
      "Molecular biology techniques (PCR, cloning, Western blot)",
      "Cell culture and animal models",
      "Bioinformatics and genomic data analysis (R, Python)",
      "Statistical analysis and experimental design",
      "Scientific writing and grant applications",
      "Flow cytometry, microscopy, spectroscopy",
    ],
    skillsSoft: [
      "Intellectual curiosity and problem persistence",
      "Scientific communication (oral and written)",
      "Collaborative research mindset",
      "Patience with long-timeline experiments",
      "Mentoring and team leadership",
      "Grant writing and scientific storytelling",
    ],
    educationRoadmapGrade10:
      "PCB stream is essential. Focus equally on Biology and Chemistry — both are foundational. Physics provides the analytical framework. Excellence in all three is the target.",
    educationRoadmapUG:
      "BSc in Biology, Biochemistry, Biotechnology, or Microbiology. IISc BS Research Program and IISER BS-MS programs are exceptional pathways. Entry via KVPY fellowship or CUET.",
    educationRoadmapPG:
      "MSc from IISc, TIFR, or top university via IIT-JAM or JGEEBILS. PhD funding through CSIR-JRF, DBT-JRF, or ICMR fellowships.",
    educationRoadmapPhD:
      "PhD at IISc Bangalore, TIFR Mumbai, NCBS, CCMB Hyderabad, NII Delhi, or any top CSIR/DBT lab. These are globally recognized programs.",
    topInstitutesIndia: [
      {
        name: "IISc Bangalore",
        locationOrCountry: "Bangalore",
        instituteType: "IISc",
        note: "India's best research institution — equivalent to a top global research university",
      },
      {
        name: "TIFR Mumbai",
        locationOrCountry: "Mumbai",
        instituteType: "Government Research",
        note: "TIFR is a world-class basic research institution",
      },
      {
        name: "NCBS Bangalore",
        locationOrCountry: "Bangalore",
        instituteType: "Research Centre",
        note: "TIFR's Centre for Biological Sciences — excellent for molecular and cell biology",
      },
      {
        name: "CCMB Hyderabad",
        locationOrCountry: "Hyderabad",
        instituteType: "CSIR Lab",
        note: "Centre for Cellular and Molecular Biology — strong genomics and evolution research",
      },
      {
        name: "IISER (all 7 campuses)",
        locationOrCountry: "Pan-India",
        instituteType: "National Research Institute",
        note: "Indian Institutes of Science Education and Research — BS-MS integrated programs",
      },
    ],
    topInstitutesGlobal: [
      {
        name: "Harvard Medical School / Broad Institute",
        locationOrCountry: "USA",
        instituteType: "University/Research",
        note: "Many TIFR/IISc graduates do postdocs here",
      },
      {
        name: "MIT",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "Top biomedical engineering and synthetic biology programs",
      },
      {
        name: "Wellcome Sanger Institute",
        locationOrCountry: "UK",
        instituteType: "Research Institute",
        note: "Genomics and precision medicine research center",
      },
      {
        name: "ETH Zurich",
        locationOrCountry: "Switzerland",
        instituteType: "University",
        note: "Europe's top research university for life sciences",
      },
    ],
    entranceExams: [
      {
        name: "IIT-JAM",
        description:
          "Joint Admission Test for MSc — entry for IIT MSc programs in Biological Sciences, Biotechnology, Chemistry, Physics.",
      },
      {
        name: "JGEEBILS",
        description:
          "Joint Graduate Entrance Examination for Biology and Interdisciplinary Life Sciences — entry for NCBS, TIFR, and CCMB PhD programs.",
      },
      {
        name: "CSIR-JRF NET",
        description:
          "Council of Scientific and Industrial Research Junior Research Fellowship — provides PhD funding and eligibility for Lectureship.",
      },
      {
        name: "DBT-JRF / ICMR JRF",
        description:
          "Department of Biotechnology and ICMR Junior Research Fellowships — competitive fellowships funding PhD research.",
      },
      {
        name: "KVPY",
        description:
          "Kishore Vaigyanik Protsahan Yojana scholarship — opens IISc BS Research Program and top BSc admission.",
      },
    ],
    pros: [
      "Profound intellectual satisfaction — you push the boundary of human knowledge",
      "Global career mobility — research talent is valued everywhere",
      "Access to world-class infrastructure (IISc, TIFR)",
      "Strong international collaborations",
      "Fellowship-funded PhD reduces financial burden",
      "Significant positive impact on medicine and human health",
    ],
    cons: [
      "Very long pathway to independence (10+ years)",
      "Competitive for faculty/PI positions",
      "Academic salaries in India are moderate (though improving)",
      "Uncertainty is part of research — not every experiment or grant succeeds",
      "Emotional resilience required for a career with frequent rejection",
    ],
    mythsVsReality: [
      {
        myth: "Research careers don't pay in India",
        reality:
          "CSIR-JRF fellowship is \u20B931,000/month for PhD students. Faculty at IISc earn \u20B918L\u201325L+. Industry R&D heads earn \u20B930L\u201360L+. The field is improving rapidly.",
      },
      {
        myth: "Only exceptional geniuses can do research",
        reality:
          "Research requires sustained curiosity, methodical thinking, and resilience more than innate genius. Many outstanding researchers are people who genuinely loved their question and didn't stop asking.",
      },
    ],
    grade910SubjectFocus:
      "Biology, Chemistry, and Physics — all three at the highest level. KVPY scholarship exam is worth targeting from Grade 11: it tests cross-disciplinary scientific thinking and opens the door to IISc directly.",
  },
};

// ─── FINANCE STUBS ─────────────────────────────────────────────────────────────

const financeStubs: Record<string, CareerProfile> = {
  "chartered-accountant": {
    id: "chartered-accountant",
    dayInTheLife:
      "A Chartered Accountant's day varies by specialization — audit, tax advisory, corporate finance, or forensic accounting. Each requires deep analytical precision and client communication.",
    skillsTechnical: [
      "Financial accounting and IFRS",
      "Taxation (Income Tax Act, GST)",
      "Audit and assurance",
      "Financial modeling",
      "Corporate law basics",
    ],
    skillsSoft: [
      "Analytical precision",
      "Client relationship management",
      "Written communication",
      "Ethical judgment",
      "Deadline management",
    ],
    educationRoadmapGrade10:
      "Commerce stream strongly preferred. Accountancy, Business Studies, and Economics are directly tested in CA Foundation.",
    educationRoadmapUG:
      "CA Foundation after 12th (Commerce recommended). Pursue B.Com alongside CA for a degree backup. CA Intermediate requires 8 months of study.",
    educationRoadmapPG:
      "CA Final after 3-year articleship. Total: 5-6 years from Grade 12. CFA (Level 1, 2, 3) can be pursued post-CA for investment finance roles.",
    educationRoadmapPhD:
      "PhD in Finance or Accounting — primarily for academic careers at IIMs and top business schools.",
    topInstitutesIndia: [
      {
        name: "ICAI",
        locationOrCountry: "Pan-India",
        instituteType: "Professional Body",
        note: "The Institute of Chartered Accountants of India — the sole body regulating CA qualification",
      },
      {
        name: "SRCC Delhi",
        locationOrCountry: "Delhi",
        instituteType: "Delhi University",
        note: "Best B.Com college for CA foundation alongside degree",
      },
      {
        name: "St. Xavier's College Mumbai",
        locationOrCountry: "Mumbai",
        instituteType: "Autonomous",
        note: "Strong Commerce program aligned with CA foundation",
      },
    ],
    topInstitutesGlobal: [
      {
        name: "ICAEW UK",
        locationOrCountry: "UK",
        instituteType: "Professional Body",
        note: "Institute of Chartered Accountants in England and Wales — reciprocal recognition with ICAI",
      },
      {
        name: "AICPA USA",
        locationOrCountry: "USA",
        instituteType: "Professional Body",
        note: "CPA qualification for US accounting practice",
      },
    ],
    entranceExams: [
      {
        name: "CA Foundation",
        description:
          "Entry exam for ICAI CA program. 4 papers: Accounting, Business Laws, Quantitative Aptitude, Business Economics.",
      },
      {
        name: "CA Intermediate",
        description:
          "Second stage — 8 papers covering advanced financial accounting, costing, taxation, and audit.",
      },
      {
        name: "CA Final",
        description:
          "Final qualifying exam after 3-year articleship. India's most rigorous professional qualification.",
      },
    ],
    pros: [
      "Highest financial credibility in India — CAs are trusted advisors",
      "Multiple career tracks: Big 4 audit, tax practice, corporate finance, entrepreneurship",
      "Strong government and private sector demand",
      "Partnership track in CA firms leads to significant income",
    ],
    cons: [
      "Long qualification timeline (5-6 years)",
      "Very low first-attempt pass rates (10-15%)",
      "Articleship years can be demanding and low-paid",
      "Repetitive for those who want variety and creativity",
    ],
    mythsVsReality: [
      {
        myth: "CA is only for Commerce students",
        reality:
          "Science and Arts students have taken CA Foundation and cleared it. The exam tests quantitative aptitude and accounting, which can be self-studied from any background.",
      },
    ],
    grade910SubjectFocus:
      "Accountancy and Mathematics are the core subjects. Commerce stream gives the most direct preparation.",
    profileComingSoon: true,
  },

  "financial-analyst": {
    id: "financial-analyst",
    dayInTheLife:
      "Financial analysts build financial models, evaluate investment opportunities, track market data, and produce research reports that guide investment and business decisions.",
    skillsTechnical: [
      "Financial modeling (DCF, comparable companies)",
      "Excel and Power BI",
      "Bloomberg / Reuters terminal",
      "Valuation methods",
      "Accounting and financial statements",
    ],
    skillsSoft: [
      "Quantitative reasoning",
      "Attention to detail",
      "Presentation skills",
      "Time management",
      "Market awareness",
    ],
    educationRoadmapGrade10:
      "PCM or Commerce with Mathematics. Strong foundation in statistics and quantitative reasoning is essential.",
    educationRoadmapUG:
      "B.Com, BBA Finance, or B.Tech followed by MBA Finance. CFA Level 1 can be started after graduation.",
    educationRoadmapPG:
      "MBA Finance from IIM/ISB or CFA charter (3 levels). CFA is globally the most respected qualification for investment analysis.",
    educationRoadmapPhD:
      "PhD in Finance at IIMs — academic research in capital markets, behavioral finance, or asset pricing.",
    topInstitutesIndia: [
      {
        name: "IIM Ahmedabad",
        locationOrCountry: "Ahmedabad",
        instituteType: "IIM",
        note: "Best MBA Finance in India — top for investment banking, private equity",
      },
      {
        name: "IIM Calcutta",
        locationOrCountry: "Kolkata",
        instituteType: "IIM",
        note: "Strong Finance specialization and BFSI placement track",
      },
      {
        name: "NMIMS Mumbai",
        locationOrCountry: "Mumbai",
        instituteType: "Business School",
        note: "Strong Finance MBA with good banking and finance placements",
      },
    ],
    topInstitutesGlobal: [
      {
        name: "Wharton School",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "World's top Finance school — PhD and MBA",
      },
      {
        name: "London School of Economics",
        locationOrCountry: "UK",
        instituteType: "University",
        note: "Strong Finance MSc programs",
      },
    ],
    entranceExams: [
      {
        name: "CAT",
        description:
          "Common Admission Test — entry to IIMs for MBA Finance specialization.",
      },
      {
        name: "CFA Level 1, 2, 3",
        description:
          "Chartered Financial Analyst — global gold standard for investment analysis. 3 exams, typically 3-4 years to complete.",
      },
    ],
    pros: [
      "High earning potential in investment banking and PE",
      "Intellectually stimulating — financial markets are global and dynamic",
      "Strong career progression path",
      "International career mobility",
    ],
    cons: [
      "Long working hours especially in investment banking",
      "Market volatility affects job security in some roles",
      "CFA is demanding and time-consuming",
    ],
    mythsVsReality: [
      {
        myth: "You need to be from IIM to be a successful financial analyst",
        reality:
          "CFA charter holders from any university get hired at top asset management firms based on skill.",
      },
    ],
    grade910SubjectFocus:
      "Mathematics and Economics are foundational. Commerce stream with strong Maths is ideal.",
    profileComingSoon: true,
  },

  "investment-banker": {
    id: "investment-banker",
    dayInTheLife:
      "Investment bankers advise corporations on mergers, acquisitions, IPOs, and capital raising. The work involves financial modeling, deal structuring, client presentations, and intense collaboration under strict deadlines.",
    skillsTechnical: [
      "Financial modeling and valuation",
      "M&A deal structuring",
      "IPO and capital markets process",
      "PowerPoint pitch books",
      "Excel financial models",
    ],
    skillsSoft: [
      "Client management",
      "Persuasion and communication",
      "High-pressure performance",
      "Analytical storytelling",
      "Attention to detail",
    ],
    educationRoadmapGrade10:
      "PCM or Commerce. Quantitative strength is essential — investment banking is numerically demanding.",
    educationRoadmapUG:
      "IIT + IIM (most common Indian path) or B.Com + MBA Finance. Some banks hire CA + MBA combinations.",
    educationRoadmapPG:
      "MBA from IIM A/B/C, ISB, or global (Wharton, Columbia, LBS) is the primary pathway. Summer internship in IB during MBA is critical.",
    educationRoadmapPhD:
      "Rare — PhD in Finance or Economics can lead to research roles at central banks or quant funds.",
    topInstitutesIndia: [
      {
        name: "IIM Ahmedabad",
        locationOrCountry: "Ahmedabad",
        instituteType: "IIM",
        note: "Goldman Sachs, Morgan Stanley, JPMorgan recruit here",
      },
      {
        name: "IIM Bangalore",
        locationOrCountry: "Bangalore",
        instituteType: "IIM",
        note: "Strong I-banking placement track",
      },
      {
        name: "ISB Hyderabad",
        locationOrCountry: "Hyderabad",
        instituteType: "Business School",
        note: "Good for lateral entry into IB after work experience",
      },
    ],
    topInstitutesGlobal: [
      {
        name: "Wharton School",
        locationOrCountry: "USA",
        instituteType: "University",
        note: "Goldman, Morgan Stanley, JPMorgan's top recruiting university",
      },
      {
        name: "London Business School",
        locationOrCountry: "UK",
        instituteType: "University",
        note: "Top for European IB recruitment",
      },
    ],
    entranceExams: [
      {
        name: "CAT",
        description:
          "Common Admission Test for IIM MBA — primary pathway to investment banking in India.",
      },
      {
        name: "GMAT",
        description:
          "Graduate Management Admission Test for international MBA programs.",
      },
    ],
    pros: [
      "Extremely high compensation (\u20B950L\u20132Cr+ at top firms)",
      "Prestigious and globally recognized career",
      "Works on landmark deals affecting industries",
      "Accelerates career path due to intense learning",
    ],
    cons: [
      "80-100 hour work weeks are common — lifestyle trade-off is significant",
      "Extremely competitive entry (IIM + strong academic record required)",
      "High stress and pressure environment",
      "Work-life balance is very poor in first 3-5 years",
    ],
    mythsVsReality: [
      {
        myth: "Investment banking is only for finance experts",
        reality:
          "Many top investment bankers started as engineers or consultants. The skill is financial modeling + communication, not just finance knowledge.",
      },
    ],
    grade910SubjectFocus:
      "Mathematics is non-negotiable. Economics and Business awareness. PCM or Commerce with Maths both work.",
    profileComingSoon: true,
  },

  actuary: {
    id: "actuary",
    dayInTheLife:
      "Actuaries use statistical models to assess financial risk for insurance companies, pension funds, and investment banks. The work is highly technical, with heavy emphasis on probability, statistics, and financial mathematics.",
    skillsTechnical: [
      "Probability and statistics",
      "Financial mathematics",
      "R and Python for actuarial modeling",
      "Excel / VBA",
      "IFRS 17 and solvency frameworks",
    ],
    skillsSoft: [
      "Analytical rigor",
      "Business communication",
      "Problem decomposition",
      "Attention to detail",
      "Continuous learning",
    ],
    educationRoadmapGrade10:
      "PCM stream with strong Mathematics. Statistics as an additional subject (where available) is a major advantage.",
    educationRoadmapUG:
      "B.Sc Statistics, B.Sc Mathematics, or B.Tech with Statistics electives. Some actuarial students study B.Com. Begin ACET (Actuarial Common Entrance Test) after graduation.",
    educationRoadmapPG:
      "Fellowship exams through IAI (Institute of Actuaries of India) — 15 paper-based examinations over 5-7 years while working. Globally: UK Fellowship (IFoA) or US Fellowship (SOA/CAS).",
    educationRoadmapPhD:
      "PhD in Actuarial Science, Statistics, or Financial Mathematics — opens academic research in risk and insurance economics.",
    topInstitutesIndia: [
      {
        name: "IAI (Institute of Actuaries of India)",
        locationOrCountry: "Mumbai",
        instituteType: "Professional Body",
        note: "The sole body offering actuarial qualification in India",
      },
      {
        name: "SRCC Delhi",
        locationOrCountry: "Delhi",
        instituteType: "Delhi University",
        note: "B.Sc Statistics is a strong foundation for actuarial entry",
      },
      {
        name: "IIT Bombay — Statistics Dept.",
        locationOrCountry: "Mumbai",
        instituteType: "IIT",
        note: "BSc / MSc Statistics with strong mathematical foundation",
      },
    ],
    topInstitutesGlobal: [
      {
        name: "Institute and Faculty of Actuaries (IFoA)",
        locationOrCountry: "UK",
        instituteType: "Professional Body",
        note: "UK actuarial fellowship — globally recognized",
      },
      {
        name: "Society of Actuaries (SOA)",
        locationOrCountry: "USA",
        instituteType: "Professional Body",
        note: "US actuarial qualification — opens North American market",
      },
    ],
    entranceExams: [
      {
        name: "ACET",
        description:
          "Actuarial Common Entrance Test — entry to IAI membership and start of fellowship exam pathway.",
      },
      {
        name: "IAI Fellowship Exams",
        description:
          "15 staged examinations covering probability, statistics, finance, and actuarial applications.",
      },
    ],
    pros: [
      "Among the highest-paid quantitative professions globally",
      "Chronic shortage of qualified actuaries in India",
      "Intellectually rigorous and non-repetitive",
      "Strong international career mobility",
      "Work-life balance is significantly better than investment banking",
    ],
    cons: [
      "Very long qualification timeline (7-10 years for fellowship)",
      "Highly technical — not suited for those who don't love mathematics deeply",
      "Small profession — limited in India's context but growing rapidly",
    ],
    mythsVsReality: [
      {
        myth: "Actuary is just an accountant with Maths",
        reality:
          "Actuaries model complex risk systems for insurance, pension, and investment sectors. The role is closer to financial engineering than accounting.",
      },
    ],
    grade910SubjectFocus:
      "Mathematics and Statistics are the core subjects. PCM with Statistics (as an additional subject) is the ideal preparation. Focus on Probability chapters in Grade 10-12 Maths.",
    profileComingSoon: true,
  },
};

// Import and re-export tech careers from the original file
import { careerProfilesMap as techProfiles } from "./techDigitalCareers";

export const allCareerProfiles: Record<string, CareerProfile> = {
  ...techProfiles,
  ...healthcareCareers,
  ...financeStubs,
};

export function getCareerProfile(id: string): CareerProfile | null {
  return allCareerProfiles[id] || null;
}
