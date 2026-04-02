// ─── Assessment Question Bank ─────────────────────────────────────────────────
// 200 total questions across 8 modules
// Module 1-6: 25 each | Module 7 (RIASEC): 18 | Module 8 (Grit): 12

export type ModuleId =
  | "logical"
  | "numerical"
  | "verbal"
  | "scientific"
  | "creative"
  | "leadership"
  | "riasec"
  | "grit";

export type RiasecType = "R" | "I" | "A" | "S" | "E" | "C";

export interface QuestionOption {
  id: string;
  text: string;
  riasecType?: RiasecType;
  gritDimension?: "grit" | "mindset" | "values";
}

export interface AssessmentQuestion {
  id: string;
  moduleId: ModuleId;
  text: string;
  options: QuestionOption[];
  correctOptionId?: string;
  riasecType?: RiasecType;
  gritDimension?: "grit" | "mindset" | "values";
}

// ─── MODULE 1: LOGICAL & ANALYTICAL (25 questions) ───────────────────────────

const logicalQuestions: AssessmentQuestion[] = [
  {
    id: "log_01",
    moduleId: "logical",
    text: "If all Bloops are Razzles and all Razzles are Lazzles, then all Bloops are:",
    options: [
      { id: "a", text: "Lazzles" },
      { id: "b", text: "Not Lazzles" },
      { id: "c", text: "Sometimes Lazzles" },
      { id: "d", text: "Cannot be determined" },
    ],
    correctOptionId: "a",
  },
  {
    id: "log_02",
    moduleId: "logical",
    text: "What comes next in the series: 2, 6, 12, 20, 30, ?",
    options: [
      { id: "a", text: "40" },
      { id: "b", text: "42" },
      { id: "c", text: "44" },
      { id: "d", text: "36" },
    ],
    correctOptionId: "b",
  },
  {
    id: "log_03",
    moduleId: "logical",
    text: "Find the odd one out: Eagle, Ostrich, Bat, Parrot",
    options: [
      { id: "a", text: "Eagle" },
      { id: "b", text: "Ostrich" },
      { id: "c", text: "Bat" },
      { id: "d", text: "Parrot" },
    ],
    correctOptionId: "c",
  },
  {
    id: "log_04",
    moduleId: "logical",
    text: "Statement: All roses are flowers. Some flowers fade quickly. Conclusion: Some roses fade quickly. Is this conclusion valid?",
    options: [
      { id: "a", text: "Yes, definitely valid" },
      { id: "b", text: "No, not valid" },
      { id: "c", text: "Valid only if more data is given" },
      { id: "d", text: "Cannot say" },
    ],
    correctOptionId: "b",
  },
  {
    id: "log_05",
    moduleId: "logical",
    text: "In a code language, APPLE is written as BQQMF. How would MANGO be written?",
    options: [
      { id: "a", text: "NBNHP" },
      { id: "b", text: "NAOIP" },
      { id: "c", text: "MBNHP" },
      { id: "d", text: "NBNHO" },
    ],
    correctOptionId: "a",
  },
  {
    id: "log_06",
    moduleId: "logical",
    text: "A is the father of B. B is the sister of C. C is the son of D. How is A related to D?",
    options: [
      { id: "a", text: "Father" },
      { id: "b", text: "Grandfather" },
      { id: "c", text: "Father-in-law" },
      { id: "d", text: "Uncle" },
    ],
    correctOptionId: "c",
  },
  {
    id: "log_07",
    moduleId: "logical",
    text: "Walking 3 km north, then 4 km east, then 3 km south — how far are you from the starting point?",
    options: [
      { id: "a", text: "3 km" },
      { id: "b", text: "4 km" },
      { id: "c", text: "5 km" },
      { id: "d", text: "7 km" },
    ],
    correctOptionId: "b",
  },
  {
    id: "log_08",
    moduleId: "logical",
    text: "Doctor : Stethoscope :: Carpenter : ?",
    options: [
      { id: "a", text: "Bricks" },
      { id: "b", text: "Saw" },
      { id: "c", text: "Needle" },
      { id: "d", text: "Paint" },
    ],
    correctOptionId: "b",
  },
  {
    id: "log_09",
    moduleId: "logical",
    text: "6 people are seated in a row. Ankit is 3rd from left. Priya is immediately to his right. How many people are to the right of Priya?",
    options: [
      { id: "a", text: "1" },
      { id: "b", text: "2" },
      { id: "c", text: "3" },
      { id: "d", text: "4" },
    ],
    correctOptionId: "b",
  },
  {
    id: "log_10",
    moduleId: "logical",
    text: "What comes next: Z, X, V, T, R, ?",
    options: [
      { id: "a", text: "P" },
      { id: "b", text: "Q" },
      { id: "c", text: "N" },
      { id: "d", text: "O" },
    ],
    correctOptionId: "a",
  },
  {
    id: "log_11",
    moduleId: "logical",
    text: "All students who study hard pass exams. Rahul did not pass his exam. Therefore:",
    options: [
      { id: "a", text: "Rahul is not a student" },
      { id: "b", text: "Rahul did not study hard" },
      { id: "c", text: "Rahul will pass next time" },
      { id: "d", text: "The exam was too difficult" },
    ],
    correctOptionId: "b",
  },
  {
    id: "log_12",
    moduleId: "logical",
    text: "Find the odd one out: 8, 27, 64, 100, 125",
    options: [
      { id: "a", text: "8" },
      { id: "b", text: "27" },
      { id: "c", text: "100" },
      { id: "d", text: "125" },
    ],
    correctOptionId: "c",
  },
  {
    id: "log_13",
    moduleId: "logical",
    text: "In a certain code, 'sky is blue' is written as '3 1 5' and 'grass is green' is written as '2 1 7'. What is the code for 'is'?",
    options: [
      { id: "a", text: "3" },
      { id: "b", text: "7" },
      { id: "c", text: "1" },
      { id: "d", text: "2" },
    ],
    correctOptionId: "c",
  },
  {
    id: "log_14",
    moduleId: "logical",
    text: "Book : Library :: Painting : ?",
    options: [
      { id: "a", text: "Artist" },
      { id: "b", text: "Canvas" },
      { id: "c", text: "Museum" },
      { id: "d", text: "Gallery" },
    ],
    correctOptionId: "d",
  },
  {
    id: "log_15",
    moduleId: "logical",
    text: "What number should replace the '?' : 1, 4, 9, 16, 25, ?",
    options: [
      { id: "a", text: "30" },
      { id: "b", text: "36" },
      { id: "c", text: "35" },
      { id: "d", text: "49" },
    ],
    correctOptionId: "b",
  },
  {
    id: "log_16",
    moduleId: "logical",
    text: "No fish is a mammal. All whales are mammals. Therefore:",
    options: [
      { id: "a", text: "No whale is a fish" },
      { id: "b", text: "Some fish are whales" },
      { id: "c", text: "Whales cannot swim" },
      { id: "d", text: "Mammals live in water" },
    ],
    correctOptionId: "a",
  },
  {
    id: "log_17",
    moduleId: "logical",
    text: "If FRIEND is coded as HUMJTK, how is CANDLE coded?",
    options: [
      { id: "a", text: "EDRGLH" },
      { id: "b", text: "ECPFNG" },
      { id: "c", text: "EDNGLH" },
      { id: "d", text: "ECRFMH" },
    ],
    correctOptionId: "b",
  },
  {
    id: "log_18",
    moduleId: "logical",
    text: "Three boxes contain 3, 7, and 14 items. If you take 2 from the box of 7 and put 1 in each of the others, how many does the middle box have?",
    options: [
      { id: "a", text: "3" },
      { id: "b", text: "4" },
      { id: "c", text: "5" },
      { id: "d", text: "6" },
    ],
    correctOptionId: "c",
  },
  {
    id: "log_19",
    moduleId: "logical",
    text: "Find the odd one out: Triangle, Square, Cylinder, Rectangle",
    options: [
      { id: "a", text: "Triangle" },
      { id: "b", text: "Square" },
      { id: "c", text: "Cylinder" },
      { id: "d", text: "Rectangle" },
    ],
    correctOptionId: "c",
  },
  {
    id: "log_20",
    moduleId: "logical",
    text: "P is Q's brother. Q is R's sister. R is S's father. How is P related to S?",
    options: [
      { id: "a", text: "Uncle" },
      { id: "b", text: "Father" },
      { id: "c", text: "Brother" },
      { id: "d", text: "Grandfather" },
    ],
    correctOptionId: "a",
  },
  {
    id: "log_21",
    moduleId: "logical",
    text: "If 5 + 3 = 28, 9 + 1 = 810, and 8 + 6 = 214, then 5 + 4 = ?",
    options: [
      { id: "a", text: "19" },
      { id: "b", text: "91" },
      { id: "c", text: "20" },
      { id: "d", text: "19" },
    ],
    correctOptionId: "b",
  },
  {
    id: "log_22",
    moduleId: "logical",
    text: "A clock shows 3:15. What is the angle between the hour and minute hands?",
    options: [
      { id: "a", text: "0°" },
      { id: "b", text: "7.5°" },
      { id: "c", text: "15°" },
      { id: "d", text: "22.5°" },
    ],
    correctOptionId: "b",
  },
  {
    id: "log_23",
    moduleId: "logical",
    text: "Which number is missing? 3, 7, 13, 21, 31, ?",
    options: [
      { id: "a", text: "41" },
      { id: "b", text: "43" },
      { id: "c", text: "45" },
      { id: "d", text: "39" },
    ],
    correctOptionId: "b",
  },
  {
    id: "log_24",
    moduleId: "logical",
    text: "Some managers are leaders. All leaders are visionaries. Which conclusion is definitely true?",
    options: [
      { id: "a", text: "All managers are visionaries" },
      { id: "b", text: "Some managers are visionaries" },
      { id: "c", text: "All visionaries are managers" },
      { id: "d", text: "No manager is a visionary" },
    ],
    correctOptionId: "b",
  },
  {
    id: "log_25",
    moduleId: "logical",
    text: "Mirror Image: If the word STUDENT is reflected in a vertical mirror, which option shows the correct mirror image letter arrangement?",
    options: [
      { id: "a", text: "TNEDUTS" },
      { id: "b", text: "STUDENT" },
      { id: "c", text: "TNEƆUTS" },
      { id: "d", text: "Reversed with flipped letters" },
    ],
    correctOptionId: "d",
  },
];

// ─── MODULE 2: NUMERICAL & QUANTITATIVE (25 questions) ───────────────────────

const numericalQuestions: AssessmentQuestion[] = [
  {
    id: "num_01",
    moduleId: "numerical",
    text: "A shopkeeper buys an item for ₹400 and sells it for ₹500. What is the profit percentage?",
    options: [
      { id: "a", text: "20%" },
      { id: "b", text: "25%" },
      { id: "c", text: "15%" },
      { id: "d", text: "10%" },
    ],
    correctOptionId: "b",
  },
  {
    id: "num_02",
    moduleId: "numerical",
    text: "If a train travels 360 km in 4 hours, how long will it take to travel 540 km at the same speed?",
    options: [
      { id: "a", text: "5 hours" },
      { id: "b", text: "6 hours" },
      { id: "c", text: "7 hours" },
      { id: "d", text: "4.5 hours" },
    ],
    correctOptionId: "b",
  },
  {
    id: "num_03",
    moduleId: "numerical",
    text: "The average of 5 numbers is 18. If one number is removed, the average becomes 16. What was the removed number?",
    options: [
      { id: "a", text: "22" },
      { id: "b", text: "24" },
      { id: "c", text: "26" },
      { id: "d", text: "28" },
    ],
    correctOptionId: "c",
  },
  {
    id: "num_04",
    moduleId: "numerical",
    text: "Simple interest on ₹5,000 at 8% per annum for 3 years is:",
    options: [
      { id: "a", text: "₹1,000" },
      { id: "b", text: "₹1,200" },
      { id: "c", text: "₹1,400" },
      { id: "d", text: "₹1,600" },
    ],
    correctOptionId: "b",
  },
  {
    id: "num_05",
    moduleId: "numerical",
    text: "In a class of 40 students, 60% passed Maths and 70% passed Science. If 20% failed both, how many passed both subjects?",
    options: [
      { id: "a", text: "10" },
      { id: "b", text: "12" },
      { id: "c", text: "14" },
      { id: "d", text: "16" },
    ],
    correctOptionId: "b",
  },
  {
    id: "num_06",
    moduleId: "numerical",
    text: "The ratio of boys to girls in a school is 4:3. If there are 280 students, how many are girls?",
    options: [
      { id: "a", text: "100" },
      { id: "b", text: "120" },
      { id: "c", text: "140" },
      { id: "d", text: "160" },
    ],
    correctOptionId: "b",
  },
  {
    id: "num_07",
    moduleId: "numerical",
    text: "A pipe fills a tank in 4 hours and another pipe drains it in 6 hours. If both are open, in how many hours will the tank fill?",
    options: [
      { id: "a", text: "10 hours" },
      { id: "b", text: "12 hours" },
      { id: "c", text: "8 hours" },
      { id: "d", text: "14 hours" },
    ],
    correctOptionId: "b",
  },
  {
    id: "num_08",
    moduleId: "numerical",
    text: "The compound interest on ₹10,000 at 10% per annum for 2 years is:",
    options: [
      { id: "a", text: "₹2,000" },
      { id: "b", text: "₹2,100" },
      { id: "c", text: "₹2,200" },
      { id: "d", text: "₹1,900" },
    ],
    correctOptionId: "b",
  },
  {
    id: "num_09",
    moduleId: "numerical",
    text: "If 15 workers can complete a task in 12 days, how many days will 20 workers take?",
    options: [
      { id: "a", text: "7 days" },
      { id: "b", text: "8 days" },
      { id: "c", text: "9 days" },
      { id: "d", text: "10 days" },
    ],
    correctOptionId: "c",
  },
  {
    id: "num_10",
    moduleId: "numerical",
    text: "A table shows monthly sales: Jan=50, Feb=60, Mar=45, Apr=70, May=55. What is the average monthly sales?",
    options: [
      { id: "a", text: "54" },
      { id: "b", text: "56" },
      { id: "c", text: "58" },
      { id: "d", text: "60" },
    ],
    correctOptionId: "b",
  },
  {
    id: "num_11",
    moduleId: "numerical",
    text: "Two numbers are in the ratio 3:5. Their sum is 96. What is the larger number?",
    options: [
      { id: "a", text: "36" },
      { id: "b", text: "48" },
      { id: "c", text: "60" },
      { id: "d", text: "56" },
    ],
    correctOptionId: "c",
  },
  {
    id: "num_12",
    moduleId: "numerical",
    text: "The probability of drawing a red card from a standard deck of 52 cards is:",
    options: [
      { id: "a", text: "1/4" },
      { id: "b", text: "1/2" },
      { id: "c", text: "1/3" },
      { id: "d", text: "3/4" },
    ],
    correctOptionId: "b",
  },
  {
    id: "num_13",
    moduleId: "numerical",
    text: "A 20% discount is given on an item marked ₹1,500. What is the selling price?",
    options: [
      { id: "a", text: "₹1,100" },
      { id: "b", text: "₹1,200" },
      { id: "c", text: "₹1,300" },
      { id: "d", text: "₹1,400" },
    ],
    correctOptionId: "b",
  },
  {
    id: "num_14",
    moduleId: "numerical",
    text: "A car travels at 60 km/h and another at 80 km/h. They start from the same point in opposite directions. After 3 hours, how far apart are they?",
    options: [
      { id: "a", text: "360 km" },
      { id: "b", text: "420 km" },
      { id: "c", text: "480 km" },
      { id: "d", text: "420 km" },
    ],
    correctOptionId: "b",
  },
  {
    id: "num_15",
    moduleId: "numerical",
    text: "In a bar graph, a city's temperature readings are: Mon=28°C, Tue=32°C, Wed=26°C, Thu=30°C, Fri=34°C. On which day was the temperature highest?",
    options: [
      { id: "a", text: "Monday" },
      { id: "b", text: "Tuesday" },
      { id: "c", text: "Thursday" },
      { id: "d", text: "Friday" },
    ],
    correctOptionId: "d",
  },
  {
    id: "num_16",
    moduleId: "numerical",
    text: "The LCM of 12 and 18 is:",
    options: [
      { id: "a", text: "6" },
      { id: "b", text: "24" },
      { id: "c", text: "36" },
      { id: "d", text: "48" },
    ],
    correctOptionId: "c",
  },
  {
    id: "num_17",
    moduleId: "numerical",
    text: "If Meera's salary increases by 15% and then decreases by 10%, what is the net change in her salary?",
    options: [
      { id: "a", text: "+3.5%" },
      { id: "b", text: "-3.5%" },
      { id: "c", text: "+5%" },
      { id: "d", text: "No change" },
    ],
    correctOptionId: "a",
  },
  {
    id: "num_18",
    moduleId: "numerical",
    text: "A pie chart shows: Science 30%, Maths 25%, English 20%, Hindi 15%, Others 10%. If 200 students are in the school, how many study Maths?",
    options: [
      { id: "a", text: "40" },
      { id: "b", text: "50" },
      { id: "c", text: "60" },
      { id: "d", text: "30" },
    ],
    correctOptionId: "b",
  },
  {
    id: "num_19",
    moduleId: "numerical",
    text: "A and B together can finish a work in 8 days. A alone takes 12 days. How many days does B alone take?",
    options: [
      { id: "a", text: "20 days" },
      { id: "b", text: "24 days" },
      { id: "c", text: "28 days" },
      { id: "d", text: "16 days" },
    ],
    correctOptionId: "b",
  },
  {
    id: "num_20",
    moduleId: "numerical",
    text: "The square root of 1764 is:",
    options: [
      { id: "a", text: "38" },
      { id: "b", text: "42" },
      { id: "c", text: "46" },
      { id: "d", text: "44" },
    ],
    correctOptionId: "b",
  },
  {
    id: "num_21",
    moduleId: "numerical",
    text: "If 40% of a number is 120, what is 75% of that number?",
    options: [
      { id: "a", text: "200" },
      { id: "b", text: "225" },
      { id: "c", text: "250" },
      { id: "d", text: "300" },
    ],
    correctOptionId: "b",
  },
  {
    id: "num_22",
    moduleId: "numerical",
    text: "A shopkeeper marks goods 40% above cost price and gives 20% discount. What is the profit %?",
    options: [
      { id: "a", text: "8%" },
      { id: "b", text: "12%" },
      { id: "c", text: "16%" },
      { id: "d", text: "20%" },
    ],
    correctOptionId: "b",
  },
  {
    id: "num_23",
    moduleId: "numerical",
    text: "In a race, A beats B by 20 metres and C by 30 metres. If the race is 200 metres, by how much does B beat C?",
    options: [
      { id: "a", text: "10 metres" },
      { id: "b", text: "11.25 metres" },
      { id: "c", text: "12.5 metres" },
      { id: "d", text: "15 metres" },
    ],
    correctOptionId: "c",
  },
  {
    id: "num_24",
    moduleId: "numerical",
    text: "Divide ₹6,300 in the ratio 2:3:4 between A, B, and C. How much does B get?",
    options: [
      { id: "a", text: "₹1,400" },
      { id: "b", text: "₹1,800" },
      { id: "c", text: "₹2,100" },
      { id: "d", text: "₹2,800" },
    ],
    correctOptionId: "c",
  },
  {
    id: "num_25",
    moduleId: "numerical",
    text: "How many 3-digit numbers are divisible by both 4 and 6?",
    options: [
      { id: "a", text: "50" },
      { id: "b", text: "75" },
      { id: "c", text: "100" },
      { id: "d", text: "150" },
    ],
    correctOptionId: "b",
  },
];

// ─── MODULE 3: VERBAL & COMMUNICATION (25 questions) ─────────────────────────

const verbalQuestions: AssessmentQuestion[] = [
  {
    id: "ver_01",
    moduleId: "verbal",
    text: "Choose the synonym of ELOQUENT:",
    options: [
      { id: "a", text: "Fluent" },
      { id: "b", text: "Silent" },
      { id: "c", text: "Confused" },
      { id: "d", text: "Stubborn" },
    ],
    correctOptionId: "a",
  },
  {
    id: "ver_02",
    moduleId: "verbal",
    text: "Choose the antonym of AMBIGUOUS:",
    options: [
      { id: "a", text: "Vague" },
      { id: "b", text: "Obscure" },
      { id: "c", text: "Clear" },
      { id: "d", text: "Doubtful" },
    ],
    correctOptionId: "c",
  },
  {
    id: "ver_03",
    moduleId: "verbal",
    text: "Fill in the blank: The professor was known for his ______ lectures that kept students engaged. (RIVETING / MUNDANE / DULL / MEDIOCRE)",
    options: [
      { id: "a", text: "Mundane" },
      { id: "b", text: "Riveting" },
      { id: "c", text: "Dull" },
      { id: "d", text: "Mediocre" },
    ],
    correctOptionId: "b",
  },
  {
    id: "ver_04",
    moduleId: "verbal",
    text: "Identify the grammatically correct sentence:",
    options: [
      { id: "a", text: "Neither the boys nor the girl were present" },
      { id: "b", text: "The committee have reached their decision" },
      { id: "c", text: "She is one of those students who work hard" },
      { id: "d", text: "Each of the students have passed" },
    ],
    correctOptionId: "c",
  },
  {
    id: "ver_05",
    moduleId: "verbal",
    text: "What does the idiom 'bite the bullet' mean?",
    options: [
      { id: "a", text: "To cause physical harm" },
      { id: "b", text: "To endure a painful situation bravely" },
      { id: "c", text: "To make a hasty decision" },
      { id: "d", text: "To avoid a problem" },
    ],
    correctOptionId: "b",
  },
  {
    id: "ver_06",
    moduleId: "verbal",
    text: "Rearrange the words to form a meaningful sentence: GREAT / SUCCESS / HARD WORK / IS / THE KEY TO",
    options: [
      { id: "a", text: "Success is the great key to hard work" },
      { id: "b", text: "Hard work is the key to great success" },
      { id: "c", text: "The key to great success is hard" },
      { id: "d", text: "Great hard work is the key success" },
    ],
    correctOptionId: "b",
  },
  {
    id: "ver_07",
    moduleId: "verbal",
    text: "Read this passage: 'Climate change is altering the migratory patterns of many bird species. Scientists in the Arctic have observed earlier arrivals and longer stays.' What can be inferred?",
    options: [
      { id: "a", text: "Birds are becoming extinct" },
      { id: "b", text: "Climate change is affecting bird behavior" },
      { id: "c", text: "Scientists prefer cold climates" },
      { id: "d", text: "Arctic winters are longer" },
    ],
    correctOptionId: "b",
  },
  {
    id: "ver_08",
    moduleId: "verbal",
    text: "Choose the word that best completes: Despite his ______ schedule, the CEO made time to mentor young employees.",
    options: [
      { id: "a", text: "Relaxed" },
      { id: "b", text: "Hectic" },
      { id: "c", text: "Pleasant" },
      { id: "d", text: "Simple" },
    ],
    correctOptionId: "b",
  },
  {
    id: "ver_09",
    moduleId: "verbal",
    text: "Pen : Author :: Chisel : ?",
    options: [
      { id: "a", text: "Painter" },
      { id: "b", text: "Sculptor" },
      { id: "c", text: "Architect" },
      { id: "d", text: "Writer" },
    ],
    correctOptionId: "b",
  },
  {
    id: "ver_10",
    moduleId: "verbal",
    text: "Which sentence uses correct punctuation?",
    options: [
      { id: "a", text: "Its a great day, isn't it?" },
      { id: "b", text: "It's a great day isn't it." },
      { id: "c", text: "It's a great day, isn't it?" },
      { id: "d", text: "Its' a great day, isnt it?" },
    ],
    correctOptionId: "c",
  },
  {
    id: "ver_11",
    moduleId: "verbal",
    text: "Choose the synonym of PRAGMATIC:",
    options: [
      { id: "a", text: "Idealistic" },
      { id: "b", text: "Practical" },
      { id: "c", text: "Emotional" },
      { id: "d", text: "Theoretical" },
    ],
    correctOptionId: "b",
  },
  {
    id: "ver_12",
    moduleId: "verbal",
    text: "From the passage: 'Renewable energy includes solar, wind, and hydro power. India has the world's 5th largest wind energy capacity.' The main idea is:",
    options: [
      { id: "a", text: "India is dependent on coal" },
      { id: "b", text: "Wind energy is the best" },
      { id: "c", text: "India is a significant player in renewable energy" },
      { id: "d", text: "Solar power is not available in India" },
    ],
    correctOptionId: "c",
  },
  {
    id: "ver_13",
    moduleId: "verbal",
    text: "Identify the one-word substitute for 'a person who studies the stars and planets':",
    options: [
      { id: "a", text: "Astrologist" },
      { id: "b", text: "Geologist" },
      { id: "c", text: "Astronomer" },
      { id: "d", text: "Physicist" },
    ],
    correctOptionId: "c",
  },
  {
    id: "ver_14",
    moduleId: "verbal",
    text: "What does 'costs an arm and a leg' mean?",
    options: [
      { id: "a", text: "Very cheap" },
      { id: "b", text: "Very expensive" },
      { id: "c", text: "Painful" },
      { id: "d", text: "Physically dangerous" },
    ],
    correctOptionId: "b",
  },
  {
    id: "ver_15",
    moduleId: "verbal",
    text: "Choose the antonym of CONCISE:",
    options: [
      { id: "a", text: "Brief" },
      { id: "b", text: "Precise" },
      { id: "c", text: "Verbose" },
      { id: "d", text: "Compact" },
    ],
    correctOptionId: "c",
  },
  {
    id: "ver_16",
    moduleId: "verbal",
    text: "Select the correctly structured sentence:",
    options: [
      { id: "a", text: "He has been working here since five years" },
      { id: "b", text: "He has been working here for five years" },
      { id: "c", text: "He is working here since five years" },
      { id: "d", text: "He had been working here since five years" },
    ],
    correctOptionId: "b",
  },
  {
    id: "ver_17",
    moduleId: "verbal",
    text: "Choose the word closest in meaning to EPHEMERAL:",
    options: [
      { id: "a", text: "Permanent" },
      { id: "b", text: "Short-lived" },
      { id: "c", text: "Solid" },
      { id: "d", text: "Ancient" },
    ],
    correctOptionId: "b",
  },
  {
    id: "ver_18",
    moduleId: "verbal",
    text: "Fill in: The new policy was met with ______ from the public, as most people strongly opposed it.",
    options: [
      { id: "a", text: "Applause" },
      { id: "b", text: "Enthusiasm" },
      { id: "c", text: "Resistance" },
      { id: "d", text: "Indifference" },
    ],
    correctOptionId: "c",
  },
  {
    id: "ver_19",
    moduleId: "verbal",
    text: "Which of the following is an example of a metaphor?",
    options: [
      { id: "a", text: "The wind howled like a wolf" },
      { id: "b", text: "Life is a journey with many crossroads" },
      { id: "c", text: "The stars winked at the children" },
      { id: "d", text: "She ran as fast as lightning" },
    ],
    correctOptionId: "b",
  },
  {
    id: "ver_20",
    moduleId: "verbal",
    text: "Rearrange: WAS / INVENTED / THE TELEPHONE / BELL / BY / ALEXANDER GRAHAM",
    options: [
      { id: "a", text: "The telephone was invented by Alexander Graham Bell" },
      { id: "b", text: "Alexander Graham Bell invented was the telephone" },
      { id: "c", text: "Was the telephone invented by Bell Alexander Graham" },
      { id: "d", text: "The telephone Bell invented by was Alexander Graham" },
    ],
    correctOptionId: "a",
  },
  {
    id: "ver_21",
    moduleId: "verbal",
    text: "Choose the synonym of DILIGENT:",
    options: [
      { id: "a", text: "Lazy" },
      { id: "b", text: "Hardworking" },
      { id: "c", text: "Careless" },
      { id: "d", text: "Passive" },
    ],
    correctOptionId: "b",
  },
  {
    id: "ver_22",
    moduleId: "verbal",
    text: "What figure of speech is used in: 'The fog comes on little cat feet'?",
    options: [
      { id: "a", text: "Simile" },
      { id: "b", text: "Hyperbole" },
      { id: "c", text: "Personification" },
      { id: "d", text: "Metaphor" },
    ],
    correctOptionId: "d",
  },
  {
    id: "ver_23",
    moduleId: "verbal",
    text: "Choose the correct active voice form of: 'The song was sung beautifully by Lata.'",
    options: [
      { id: "a", text: "Lata sang the song beautifully" },
      { id: "b", text: "Lata has sung the song beautifully" },
      { id: "c", text: "Beautifully was the song sung by Lata" },
      { id: "d", text: "The song sung by Lata was beautiful" },
    ],
    correctOptionId: "a",
  },
  {
    id: "ver_24",
    moduleId: "verbal",
    text: "The word 'Serendipity' means:",
    options: [
      { id: "a", text: "Sadness" },
      { id: "b", text: "Happy accident or fortunate discovery" },
      { id: "c", text: "Planned success" },
      { id: "d", text: "Natural beauty" },
    ],
    correctOptionId: "b",
  },
  {
    id: "ver_25",
    moduleId: "verbal",
    text: "From passage: 'Digital literacy is increasingly important in the modern workforce. Schools that integrate technology in classrooms produce graduates who adapt faster.' The author's view is:",
    options: [
      { id: "a", text: "Technology harms traditional education" },
      { id: "b", text: "Digital skills improve career readiness" },
      { id: "c", text: "Graduates prefer non-tech jobs" },
      { id: "d", text: "Schools should remove technology" },
    ],
    correctOptionId: "b",
  },
];

// ─── MODULE 4: SCIENTIFIC & TECHNICAL (25 questions) ─────────────────────────

const scientificQuestions: AssessmentQuestion[] = [
  {
    id: "sci_01",
    moduleId: "scientific",
    text: "Which of the following is NOT a Newton's Law of Motion?",
    options: [
      { id: "a", text: "Every action has an equal and opposite reaction" },
      {
        id: "b",
        text: "Objects in motion stay in motion unless acted upon by a force",
      },
      { id: "c", text: "Energy can be created from nothing" },
      { id: "d", text: "Force equals mass times acceleration" },
    ],
    correctOptionId: "c",
  },
  {
    id: "sci_02",
    moduleId: "scientific",
    text: "Photosynthesis primarily takes place in the:",
    options: [
      { id: "a", text: "Roots" },
      { id: "b", text: "Flowers" },
      { id: "c", text: "Leaves (chloroplasts)" },
      { id: "d", text: "Stem" },
    ],
    correctOptionId: "c",
  },
  {
    id: "sci_03",
    moduleId: "scientific",
    text: "What type of bond is formed when electrons are shared between atoms?",
    options: [
      { id: "a", text: "Ionic bond" },
      { id: "b", text: "Covalent bond" },
      { id: "c", text: "Metallic bond" },
      { id: "d", text: "Hydrogen bond" },
    ],
    correctOptionId: "b",
  },
  {
    id: "sci_04",
    moduleId: "scientific",
    text: "The pH of pure water at 25°C is:",
    options: [
      { id: "a", text: "0" },
      { id: "b", text: "5" },
      { id: "c", text: "7" },
      { id: "d", text: "14" },
    ],
    correctOptionId: "c",
  },
  {
    id: "sci_05",
    moduleId: "scientific",
    text: "Which cell organelle is responsible for producing energy (ATP)?",
    options: [
      { id: "a", text: "Nucleus" },
      { id: "b", text: "Mitochondria" },
      { id: "c", text: "Ribosome" },
      { id: "d", text: "Golgi Apparatus" },
    ],
    correctOptionId: "b",
  },
  {
    id: "sci_06",
    moduleId: "scientific",
    text: "A ball is thrown upward. At the highest point, what is its velocity?",
    options: [
      { id: "a", text: "Maximum" },
      { id: "b", text: "Zero" },
      { id: "c", text: "Equal to initial velocity" },
      { id: "d", text: "Negative" },
    ],
    correctOptionId: "b",
  },
  {
    id: "sci_07",
    moduleId: "scientific",
    text: "Which type of radiation has the highest penetrating power?",
    options: [
      { id: "a", text: "Alpha particles" },
      { id: "b", text: "Beta particles" },
      { id: "c", text: "Gamma rays" },
      { id: "d", text: "X-rays" },
    ],
    correctOptionId: "c",
  },
  {
    id: "sci_08",
    moduleId: "scientific",
    text: "Which gas makes up about 78% of Earth's atmosphere?",
    options: [
      { id: "a", text: "Oxygen" },
      { id: "b", text: "Carbon dioxide" },
      { id: "c", text: "Nitrogen" },
      { id: "d", text: "Argon" },
    ],
    correctOptionId: "c",
  },
  {
    id: "sci_09",
    moduleId: "scientific",
    text: "A scientist conducts an experiment to test a hypothesis. After getting surprising results, the next step in the scientific method is:",
    options: [
      { id: "a", text: "Publish results immediately" },
      { id: "b", text: "Modify the hypothesis and re-test" },
      { id: "c", text: "Ignore the data" },
      { id: "d", text: "Repeat exactly the same experiment" },
    ],
    correctOptionId: "b",
  },
  {
    id: "sci_10",
    moduleId: "scientific",
    text: "DNA stands for:",
    options: [
      { id: "a", text: "Deoxyribonucleic Acid" },
      { id: "b", text: "Dynamic Nucleic Acid" },
      { id: "c", text: "Denatured Nuclear Atom" },
      { id: "d", text: "Dual Nucleic Acid" },
    ],
    correctOptionId: "a",
  },
  {
    id: "sci_11",
    moduleId: "scientific",
    text: "If a wire's length is doubled while its resistance per unit length stays constant, the total resistance:",
    options: [
      { id: "a", text: "Halves" },
      { id: "b", text: "Stays the same" },
      { id: "c", text: "Doubles" },
      { id: "d", text: "Quadruples" },
    ],
    correctOptionId: "c",
  },
  {
    id: "sci_12",
    moduleId: "scientific",
    text: "ISRO's Mars Orbiter Mission (Mangalyaan) was launched in:",
    options: [
      { id: "a", text: "2008" },
      { id: "b", text: "2013" },
      { id: "c", text: "2015" },
      { id: "d", text: "2018" },
    ],
    correctOptionId: "b",
  },
  {
    id: "sci_13",
    moduleId: "scientific",
    text: "Rusting of iron is an example of:",
    options: [
      { id: "a", text: "Physical change" },
      { id: "b", text: "Endothermic reaction" },
      { id: "c", text: "Oxidation reaction" },
      { id: "d", text: "Reduction reaction" },
    ],
    correctOptionId: "c",
  },
  {
    id: "sci_14",
    moduleId: "scientific",
    text: "Human blood type is determined by which blood group system?",
    options: [
      { id: "a", text: "XYZ system" },
      { id: "b", text: "ABO system" },
      { id: "c", text: "Rh only" },
      { id: "d", text: "Genetic code" },
    ],
    correctOptionId: "b",
  },
  {
    id: "sci_15",
    moduleId: "scientific",
    text: "Light travels fastest in:",
    options: [
      { id: "a", text: "Water" },
      { id: "b", text: "Glass" },
      { id: "c", text: "Vacuum" },
      { id: "d", text: "Air" },
    ],
    correctOptionId: "c",
  },
  {
    id: "sci_16",
    moduleId: "scientific",
    text: "Which planet in our solar system has the most moons?",
    options: [
      { id: "a", text: "Jupiter" },
      { id: "b", text: "Saturn" },
      { id: "c", text: "Uranus" },
      { id: "d", text: "Neptune" },
    ],
    correctOptionId: "b",
  },
  {
    id: "sci_17",
    moduleId: "scientific",
    text: "What does a voltmeter measure?",
    options: [
      { id: "a", text: "Current" },
      { id: "b", text: "Resistance" },
      { id: "c", text: "Potential difference" },
      { id: "d", text: "Power" },
    ],
    correctOptionId: "c",
  },
  {
    id: "sci_18",
    moduleId: "scientific",
    text: "In a food chain, organisms that convert solar energy into food are called:",
    options: [
      { id: "a", text: "Consumers" },
      { id: "b", text: "Decomposers" },
      { id: "c", text: "Producers" },
      { id: "d", text: "Predators" },
    ],
    correctOptionId: "c",
  },
  {
    id: "sci_19",
    moduleId: "scientific",
    text: "Which of the following is a correct use of the scientific method?",
    options: [
      { id: "a", text: "Forming a conclusion then finding data to match" },
      {
        id: "b",
        text: "Observing, hypothesizing, testing, and analyzing data",
      },
      { id: "c", text: "Reading books and summarizing" },
      {
        id: "d",
        text: "Repeating experiments until the expected result appears",
      },
    ],
    correctOptionId: "b",
  },
  {
    id: "sci_20",
    moduleId: "scientific",
    text: "Acid rain is primarily caused by:",
    options: [
      { id: "a", text: "Carbon dioxide and methane" },
      { id: "b", text: "Sulfur dioxide and nitrogen oxides" },
      { id: "c", text: "Ozone and hydrogen" },
      { id: "d", text: "Oxygen and water vapor" },
    ],
    correctOptionId: "b",
  },
  {
    id: "sci_21",
    moduleId: "scientific",
    text: "If mixing substance A and B produces heat and a new substance, this reaction is:",
    options: [
      { id: "a", text: "Physical change" },
      { id: "b", text: "Endothermic chemical change" },
      { id: "c", text: "Exothermic chemical change" },
      { id: "d", text: "Nuclear fusion" },
    ],
    correctOptionId: "c",
  },
  {
    id: "sci_22",
    moduleId: "scientific",
    text: "The unit of electric resistance is:",
    options: [
      { id: "a", text: "Volt" },
      { id: "b", text: "Ampere" },
      { id: "c", text: "Ohm" },
      { id: "d", text: "Watt" },
    ],
    correctOptionId: "c",
  },
  {
    id: "sci_23",
    moduleId: "scientific",
    text: "Which natural phenomenon demonstrates refraction of light?",
    options: [
      { id: "a", text: "Shadow formation" },
      { id: "b", text: "Formation of a rainbow" },
      { id: "c", text: "Reflection in a mirror" },
      { id: "d", text: "Aurora borealis" },
    ],
    correctOptionId: "b",
  },
  {
    id: "sci_24",
    moduleId: "scientific",
    text: "Why does ice float on water?",
    options: [
      { id: "a", text: "Ice is lighter than water by weight" },
      { id: "b", text: "Ice is less dense than liquid water" },
      { id: "c", text: "Ice has no surface tension" },
      { id: "d", text: "Water repels frozen surfaces" },
    ],
    correctOptionId: "b",
  },
  {
    id: "sci_25",
    moduleId: "scientific",
    text: "Artificial Intelligence systems primarily learn by:",
    options: [
      { id: "a", text: "Following pre-written rules only" },
      { id: "b", text: "Analyzing patterns from large amounts of data" },
      { id: "c", text: "Being directly told every possible answer" },
      { id: "d", text: "Random guessing and improving over time" },
    ],
    correctOptionId: "b",
  },
];

// ─── MODULE 5: CREATIVE & DESIGN (25 questions) ───────────────────────────────

const creativeQuestions: AssessmentQuestion[] = [
  {
    id: "cre_01",
    moduleId: "creative",
    text: "You have a broken umbrella, a rubber band, and a plastic bottle. Which use of these items is most creative?",
    options: [
      { id: "a", text: "Discard them all" },
      { id: "b", text: "Build a small water collection and drainage system" },
      { id: "c", text: "Use the rubber band for bookmarks" },
      { id: "d", text: "Store items in the bottle" },
    ],
    correctOptionId: "b",
  },
  {
    id: "cre_02",
    moduleId: "creative",
    text: "A designer needs to make a poster for a school event with only 2 colors. Which approach shows the best design thinking?",
    options: [
      { id: "a", text: "Pick two random colors" },
      { id: "b", text: "Use colors that contrast and match the event's mood" },
      { id: "c", text: "Avoid color and use only black and white" },
      { id: "d", text: "Use the school's uniform colors regardless of mood" },
    ],
    correctOptionId: "b",
  },
  {
    id: "cre_03",
    moduleId: "creative",
    text: "You are designing a mobile app for elderly users. What is the MOST important design priority?",
    options: [
      { id: "a", text: "Trendy animations and visual effects" },
      { id: "b", text: "Maximum number of features" },
      { id: "c", text: "Large text, high contrast, and simple navigation" },
      { id: "d", text: "Dark mode by default" },
    ],
    correctOptionId: "c",
  },
  {
    id: "cre_04",
    moduleId: "creative",
    text: "How many alternative uses can you think of for a standard brick? Choose the option that shows the most divergent thinking:",
    options: [
      { id: "a", text: "Build a wall" },
      { id: "b", text: "Use as a doorstop" },
      {
        id: "c",
        text: "Build walls, use as a weapon, paint it as art, use as a garden border, grind it to powder for ceramics, use as a weight",
      },
      { id: "d", text: "Throw it or build with it" },
    ],
    correctOptionId: "c",
  },
  {
    id: "cre_05",
    moduleId: "creative",
    text: "A company wants its new logo to convey 'trust and reliability'. Which design choice is most aligned?",
    options: [
      { id: "a", text: "Bright yellow and chaotic shapes" },
      { id: "b", text: "Deep blue with clean, balanced geometry" },
      { id: "c", text: "Red with sharp edges" },
      { id: "d", text: "Many colors with swirling patterns" },
    ],
    correctOptionId: "b",
  },
  {
    id: "cre_06",
    moduleId: "creative",
    text: "If you could redesign your school's library to increase students' interest in reading, what would you prioritize?",
    options: [
      { id: "a", text: "More books on required syllabus" },
      {
        id: "b",
        text: "Comfortable seating, natural light, and themed reading zones",
      },
      { id: "c", text: "Stricter silence rules" },
      { id: "d", text: "Larger study tables" },
    ],
    correctOptionId: "b",
  },
  {
    id: "cre_07",
    moduleId: "creative",
    text: "A photograph has too much empty sky above the subject. The best design fix is:",
    options: [
      { id: "a", text: "Add digital clouds" },
      { id: "b", text: "Crop the image to follow the rule of thirds" },
      { id: "c", text: "Increase brightness" },
      { id: "d", text: "Add a filter" },
    ],
    correctOptionId: "b",
  },
  {
    id: "cre_08",
    moduleId: "creative",
    text: "You need to explain a complex scientific concept to a 10-year-old. The most effective creative approach is:",
    options: [
      { id: "a", text: "Provide the technical definition" },
      {
        id: "b",
        text: "Use visual metaphors, analogies, and hands-on demonstrations",
      },
      { id: "c", text: "Give them a textbook chapter" },
      { id: "d", text: "Quiz them first" },
    ],
    correctOptionId: "b",
  },
  {
    id: "cre_09",
    moduleId: "creative",
    text: "In a design thinking process, 'ideation' means:",
    options: [
      { id: "a", text: "Finalizing one solution" },
      { id: "b", text: "Building the first prototype" },
      {
        id: "c",
        text: "Generating as many ideas as possible without judgment",
      },
      { id: "d", text: "Testing with users" },
    ],
    correctOptionId: "c",
  },
  {
    id: "cre_10",
    moduleId: "creative",
    text: "What visual principle makes text easier to read on a website?",
    options: [
      { id: "a", text: "Using multiple fonts for variety" },
      { id: "b", text: "White space and clear typographic hierarchy" },
      { id: "c", text: "Decorative borders around every element" },
      { id: "d", text: "Using all-caps text" },
    ],
    correctOptionId: "b",
  },
  {
    id: "cre_11",
    moduleId: "creative",
    text: "An artist wants to create tension in a composition. Which technique works best?",
    options: [
      { id: "a", text: "Symmetrical, centered layout" },
      { id: "b", text: "Even distribution of all elements" },
      { id: "c", text: "Diagonal lines and asymmetrical placement" },
      { id: "d", text: "Soft pastel colors only" },
    ],
    correctOptionId: "c",
  },
  {
    id: "cre_12",
    moduleId: "creative",
    text: "Your school's cafeteria needs to reduce food waste. Your most creative solution would be:",
    options: [
      { id: "a", text: "Reduce portion sizes" },
      { id: "b", text: "Close the cafeteria" },
      {
        id: "c",
        text: "A gamified 'clean plate' challenge with prizes, and composting leftovers",
      },
      { id: "d", text: "Put up 'no waste' posters" },
    ],
    correctOptionId: "c",
  },
  {
    id: "cre_13",
    moduleId: "creative",
    text: "A book cover should attract readers in a bookshop within 3 seconds. The most effective approach is:",
    options: [
      { id: "a", text: "List all plot points on the cover" },
      {
        id: "b",
        text: "A strong visual image, minimal text, and bold title typography",
      },
      { id: "c", text: "Author photo as the main element" },
      { id: "d", text: "White background with black text only" },
    ],
    correctOptionId: "b",
  },
  {
    id: "cre_14",
    moduleId: "creative",
    text: "In UX (User Experience) design, the most important step before designing any screen is:",
    options: [
      { id: "a", text: "Choosing color palette" },
      {
        id: "b",
        text: "Understanding user needs through research and empathy",
      },
      { id: "c", text: "Building the final product" },
      { id: "d", text: "Writing code" },
    ],
    correctOptionId: "b",
  },
  {
    id: "cre_15",
    moduleId: "creative",
    text: "A music composer wants to convey sadness. Which combination would be most effective?",
    options: [
      { id: "a", text: "Fast tempo, major key, bright instruments" },
      { id: "b", text: "Slow tempo, minor key, sparse arrangement" },
      { id: "c", text: "Loud percussion and fast drums" },
      { id: "d", text: "Random instrument combinations" },
    ],
    correctOptionId: "b",
  },
  {
    id: "cre_16",
    moduleId: "creative",
    text: "You're creating an infographic to explain India's GDP growth. The most important element is:",
    options: [
      { id: "a", text: "Maximum data points visible at once" },
      {
        id: "b",
        text: "A clear hierarchy that guides the eye from key message to supporting data",
      },
      { id: "c", text: "Using as many charts as possible" },
      { id: "d", text: "Decorative borders and patterns" },
    ],
    correctOptionId: "b",
  },
  {
    id: "cre_17",
    moduleId: "creative",
    text: "What is the most innovative use of a simple paper clip?",
    options: [
      { id: "a", text: "Hold papers together" },
      { id: "b", text: "Use as a page bookmark" },
      {
        id: "c",
        text: "Create jewelry, use as a sim card ejector, create art, use as a lock pick, build mini sculptures",
      },
      { id: "d", text: "Scratch a surface" },
    ],
    correctOptionId: "c",
  },
  {
    id: "cre_18",
    moduleId: "creative",
    text: "Which approach best represents 'design thinking' when solving the problem of students forgetting their homework?",
    options: [
      { id: "a", text: "Increase punishments for forgetting" },
      {
        id: "b",
        text: "Observe why students forget, prototype solutions (reminders, checklists), test and iterate",
      },
      { id: "c", text: "Reduce homework" },
      { id: "d", text: "Give printed planners" },
    ],
    correctOptionId: "b",
  },
  {
    id: "cre_19",
    moduleId: "creative",
    text: "In visual design, 'negative space' refers to:",
    options: [
      { id: "a", text: "Dark colors used in a design" },
      { id: "b", text: "The area around and between subjects" },
      { id: "c", text: "Errors in a design" },
      { id: "d", text: "Black-and-white photography" },
    ],
    correctOptionId: "b",
  },
  {
    id: "cre_20",
    moduleId: "creative",
    text: "A short film needs to convey 'urban loneliness' with no dialogue. The most powerful visual choice is:",
    options: [
      {
        id: "a",
        text: "Crowded street scenes where the protagonist has no eye contact with others",
      },
      { id: "b", text: "An empty countryside" },
      { id: "c", text: "The protagonist sleeping" },
      { id: "d", text: "Close-up of a smartphone screen" },
    ],
    correctOptionId: "a",
  },
  {
    id: "cre_21",
    moduleId: "creative",
    text: "When brainstorming, the rule of 'deferred judgment' means:",
    options: [
      { id: "a", text: "Judge ideas immediately" },
      { id: "b", text: "Only experts can share ideas" },
      {
        id: "c",
        text: "No idea should be criticized during the idea generation phase",
      },
      { id: "d", text: "Defer all decisions to the group leader" },
    ],
    correctOptionId: "c",
  },
  {
    id: "cre_22",
    moduleId: "creative",
    text: "Which of the following shows the highest level of creative problem solving?",
    options: [
      { id: "a", text: "Finding the best known solution to a problem" },
      {
        id: "b",
        text: "Reframing the problem itself and creating a novel solution",
      },
      { id: "c", text: "Following the same approach that worked before" },
      { id: "d", text: "Asking an expert for the answer" },
    ],
    correctOptionId: "b",
  },
  {
    id: "cre_23",
    moduleId: "creative",
    text: "Typography choice in a design should primarily reflect:",
    options: [
      { id: "a", text: "The designer's personal preference" },
      { id: "b", text: "The brand's personality and audience" },
      { id: "c", text: "Whatever is most commonly used" },
      { id: "d", text: "The most decorative font available" },
    ],
    correctOptionId: "b",
  },
  {
    id: "cre_24",
    moduleId: "creative",
    text: "What is a 'prototype' in design thinking?",
    options: [
      { id: "a", text: "The final product" },
      {
        id: "b",
        text: "A quick, low-cost representation of an idea used for testing",
      },
      { id: "c", text: "A marketing plan" },
      { id: "d", text: "A technical specification document" },
    ],
    correctOptionId: "b",
  },
  {
    id: "cre_25",
    moduleId: "creative",
    text: "If you were to redesign the Indian ₹10 banknote for Gen Z, which approach is most innovative?",
    options: [
      { id: "a", text: "Keep it exactly as is" },
      { id: "b", text: "Add more text about history" },
      {
        id: "c",
        text: "Incorporate modern iconography, digital verification elements, and a cleaner layout while honoring cultural identity",
      },
      { id: "d", text: "Use brighter colors only" },
    ],
    correctOptionId: "c",
  },
];

// ─── MODULE 6: LEADERSHIP & INTERPERSONAL (25 questions) ──────────────────────

const leadershipQuestions: AssessmentQuestion[] = [
  {
    id: "lea_01",
    moduleId: "leadership",
    text: "In your school project group, one teammate is not contributing. You would:",
    options: [
      { id: "a", text: "Do their work yourself without saying anything" },
      {
        id: "b",
        text: "Privately talk to them, understand their issue, and redistribute tasks",
      },
      { id: "c", text: "Report them to the teacher immediately" },
      { id: "d", text: "Exclude them from the final presentation" },
    ],
    correctOptionId: "b",
  },
  {
    id: "lea_02",
    moduleId: "leadership",
    text: "You are leading a group debate. A teammate makes an incorrect statement. You would:",
    options: [
      { id: "a", text: "Interrupt and correct them publicly" },
      { id: "b", text: "Let the error go to avoid embarrassment" },
      {
        id: "c",
        text: "Gently redirect after they finish: 'We might want to clarify that...' ",
      },
      { id: "d", text: "Ask the teacher to intervene" },
    ],
    correctOptionId: "c",
  },
  {
    id: "lea_03",
    moduleId: "leadership",
    text: "Two friends in your group have a conflict affecting the team. As the informal leader, you would:",
    options: [
      { id: "a", text: "Take sides with whoever you agree with" },
      { id: "b", text: "Ignore it and hope it resolves itself" },
      {
        id: "c",
        text: "Bring them together privately, let both share perspectives, find common ground",
      },
      {
        id: "d",
        text: "Tell everyone about the conflict to get group opinions",
      },
    ],
    correctOptionId: "c",
  },
  {
    id: "lea_04",
    moduleId: "leadership",
    text: "Your team needs to make a decision quickly, but members have different opinions. You would:",
    options: [
      { id: "a", text: "Decide alone to save time" },
      {
        id: "b",
        text: "Ask everyone's opinion quickly, summarize consensus, then make a call",
      },
      { id: "c", text: "Avoid making any decision" },
      { id: "d", text: "Vote and override the minority completely" },
    ],
    correctOptionId: "b",
  },
  {
    id: "lea_05",
    moduleId: "leadership",
    text: "A new student joins your class and looks uncomfortable at lunch. You would:",
    options: [
      { id: "a", text: "Ignore it — they should make their own friends" },
      { id: "b", text: "Stare and point them out to your friends" },
      { id: "c", text: "Invite them to sit with your group" },
      { id: "d", text: "Wait for someone else to approach them" },
    ],
    correctOptionId: "c",
  },
  {
    id: "lea_06",
    moduleId: "leadership",
    text: "You receive critical feedback about your project from a teacher. Your immediate reaction is:",
    options: [
      { id: "a", text: "Get defensive and justify every choice" },
      {
        id: "b",
        text: "Feel upset, but listen carefully to understand the specific points",
      },
      { id: "c", text: "Agree with everything without considering it" },
      { id: "d", text: "Ignore the feedback" },
    ],
    correctOptionId: "b",
  },
  {
    id: "lea_07",
    moduleId: "leadership",
    text: "During a group presentation, a teammate freezes and forgets their lines. As the next speaker, you:",
    options: [
      { id: "a", text: "Wait awkwardly for them to remember" },
      { id: "b", text: "Laugh it off" },
      {
        id: "c",
        text: "Step in naturally: 'Let me continue and Rahul will add to this' ",
      },
      { id: "d", text: "Tell the audience they forgot" },
    ],
    correctOptionId: "c",
  },
  {
    id: "lea_08",
    moduleId: "leadership",
    text: "You notice a classmate being teased about their accent. You:",
    options: [
      { id: "a", text: "Join in if it seems harmless fun" },
      { id: "b", text: "Stay quiet to avoid involvement" },
      { id: "c", text: "Privately check on the classmate after" },
      {
        id: "d",
        text: "Speak up and redirect the conversation, then check in with the classmate",
      },
    ],
    correctOptionId: "d",
  },
  {
    id: "lea_09",
    moduleId: "leadership",
    text: "Your team has lost a competition. The best leader response is:",
    options: [
      { id: "a", text: "Blame the weakest members" },
      {
        id: "b",
        text: "Conduct a calm debrief: what worked, what didn't, how we improve",
      },
      { id: "c", text: "Avoid discussing it" },
      { id: "d", text: "Announce the competition was unfair" },
    ],
    correctOptionId: "b",
  },
  {
    id: "lea_10",
    moduleId: "leadership",
    text: "A team member brings a very different idea that changes the project approach. You:",
    options: [
      { id: "a", text: "Dismiss it to maintain the current plan" },
      {
        id: "b",
        text: "Hear it out, evaluate its merits, and decide as a team",
      },
      { id: "c", text: "Implement it immediately without evaluation" },
      { id: "d", text: "Let others decide without your input" },
    ],
    correctOptionId: "b",
  },
  {
    id: "lea_11",
    moduleId: "leadership",
    text: "You strongly disagree with a decision made by your school's student council. You:",
    options: [
      { id: "a", text: "Openly criticize the council members" },
      { id: "b", text: "Complain to friends" },
      {
        id: "c",
        text: "Present your alternative with evidence at the next council meeting",
      },
      { id: "d", text: "Accept it silently" },
    ],
    correctOptionId: "c",
  },
  {
    id: "lea_12",
    moduleId: "leadership",
    text: "A junior student asks you for advice about subject selection. You:",
    options: [
      {
        id: "a",
        text: "Tell them exactly what to choose based on your experience",
      },
      { id: "b", text: "Refuse since you're not qualified" },
      {
        id: "c",
        text: "Ask them about their interests and strengths, then share information",
      },
      { id: "d", text: "Direct them elsewhere without engaging" },
    ],
    correctOptionId: "c",
  },
  {
    id: "lea_13",
    moduleId: "leadership",
    text: "In a negotiation about dividing tasks fairly, your approach is:",
    options: [
      { id: "a", text: "Demand the tasks you prefer" },
      { id: "b", text: "Accept whatever others don't want" },
      {
        id: "c",
        text: "Propose a skill-based division that plays to each person's strengths",
      },
      { id: "d", text: "Draw lots to avoid any conflict" },
    ],
    correctOptionId: "c",
  },
  {
    id: "lea_14",
    moduleId: "leadership",
    text: "Your group is under deadline pressure and tempers are rising. The most effective response is:",
    options: [
      {
        id: "a",
        text: "Increase urgency by reminding them of the deadline repeatedly",
      },
      {
        id: "b",
        text: "Take a 5-minute break, acknowledge the stress, refocus on priorities",
      },
      { id: "c", text: "Work in complete silence" },
      { id: "d", text: "Assign blame for the delay" },
    ],
    correctOptionId: "b",
  },
  {
    id: "lea_15",
    moduleId: "leadership",
    text: "You are chosen as house captain. Your first priority should be:",
    options: [
      { id: "a", text: "Asserting authority" },
      {
        id: "b",
        text: "Understanding what the house members need and creating a shared goal",
      },
      { id: "c", text: "Planning your own events" },
      { id: "d", text: "Making a strict rules list" },
    ],
    correctOptionId: "b",
  },
  {
    id: "lea_16",
    moduleId: "leadership",
    text: "When giving feedback to a friend about their speech, the most constructive approach is:",
    options: [
      { id: "a", text: "Point out only the negatives so they improve" },
      { id: "b", text: "Say everything was great to keep them motivated" },
      {
        id: "c",
        text: "Share specific strengths, then specific improvements, then end positively",
      },
      { id: "d", text: "Let the teacher give feedback instead" },
    ],
    correctOptionId: "c",
  },
  {
    id: "lea_17",
    moduleId: "leadership",
    text: "You realize mid-project that the initial plan won't work. The best leadership response is:",
    options: [
      { id: "a", text: "Hide the problem and submit whatever exists" },
      { id: "b", text: "Panic and quit" },
      {
        id: "c",
        text: "Acknowledge the issue to the team, pivot the plan, reallocate tasks",
      },
      { id: "d", text: "Blame the original planner" },
    ],
    correctOptionId: "c",
  },
  {
    id: "lea_18",
    moduleId: "leadership",
    text: "Active listening means:",
    options: [
      { id: "a", text: "Nodding while thinking about what you want to say" },
      {
        id: "b",
        text: "Fully focusing, understanding, and responding thoughtfully",
      },
      { id: "c", text: "Finishing the other person's sentences" },
      { id: "d", text: "Taking notes even if you miss the key points" },
    ],
    correctOptionId: "b",
  },
  {
    id: "lea_19",
    moduleId: "leadership",
    text: "A quiet team member always has good ideas but never speaks up in meetings. You:",
    options: [
      { id: "a", text: "Let them remain quiet — that's their choice" },
      { id: "b", text: "Directly ask them to speak more" },
      {
        id: "c",
        text: "Create opportunities: 'Kavya, what's your take on this?' in a low-pressure moment",
      },
      { id: "d", text: "Speak their ideas on their behalf without asking" },
    ],
    correctOptionId: "c",
  },
  {
    id: "lea_20",
    moduleId: "leadership",
    text: "The ability to recognize and manage your own emotions while understanding others' emotions is called:",
    options: [
      { id: "a", text: "Intellectual quotient (IQ)" },
      { id: "b", text: "Emotional intelligence (EQ)" },
      { id: "c", text: "Social media skills" },
      { id: "d", text: "Academic aptitude" },
    ],
    correctOptionId: "b",
  },
  {
    id: "lea_21",
    moduleId: "leadership",
    text: "You are organizing a fundraiser. A team member wants to do it a completely different way than planned. You would:",
    options: [
      { id: "a", text: "Reject the idea outright" },
      { id: "b", text: "Accept it entirely to avoid conflict" },
      {
        id: "c",
        text: "Evaluate both approaches with the team and choose the strongest elements",
      },
      { id: "d", text: "Postpone the fundraiser" },
    ],
    correctOptionId: "c",
  },
  {
    id: "lea_22",
    moduleId: "leadership",
    text: "What is servant leadership?",
    options: [
      { id: "a", text: "A leader who does all the work" },
      {
        id: "b",
        text: "Leading by putting the team's needs and development first",
      },
      { id: "c", text: "A leader who reports to others" },
      { id: "d", text: "Leading only when instructed" },
    ],
    correctOptionId: "b",
  },
  {
    id: "lea_23",
    moduleId: "leadership",
    text: "During a class debate, your opponent makes a strong point you hadn't considered. You:",
    options: [
      { id: "a", text: "Ignore it and repeat your existing points" },
      {
        id: "b",
        text: "Acknowledge the strength of their point, then offer a nuanced counterpoint",
      },
      { id: "c", text: "Change your position completely" },
      { id: "d", text: "Attack their credibility instead" },
    ],
    correctOptionId: "b",
  },
  {
    id: "lea_24",
    moduleId: "leadership",
    text: "Your team disagrees on a critical decision. As leader, you should:",
    options: [
      { id: "a", text: "Decide alone" },
      { id: "b", text: "Avoid making any decision" },
      {
        id: "c",
        text: "Facilitate structured discussion, seek common ground, make an informed call",
      },
      { id: "d", text: "Let the noisiest member decide" },
    ],
    correctOptionId: "c",
  },
  {
    id: "lea_25",
    moduleId: "leadership",
    text: "Empathy in leadership primarily means:",
    options: [
      { id: "a", text: "Agreeing with everyone" },
      {
        id: "b",
        text: "Understanding how others feel and considering it in decisions",
      },
      { id: "c", text: "Being emotionally vulnerable" },
      { id: "d", text: "Prioritizing feelings over results" },
    ],
    correctOptionId: "b",
  },
];

// ─── MODULE 7: RIASEC SITUATIONAL (18 questions, 3 per type) ──────────────────

const riasecQuestions: AssessmentQuestion[] = [
  // REALISTIC (R) — 3 questions
  {
    id: "ria_R1",
    moduleId: "riasec",
    riasecType: "R",
    text: "Which Saturday activity would you most enjoy?",
    options: [
      {
        id: "a",
        text: "Building or repairing something at home",
        riasecType: "R",
      },
      { id: "b", text: "Reading about how machines work", riasecType: "I" },
      { id: "c", text: "Painting or making art", riasecType: "A" },
      { id: "d", text: "Organizing a community event", riasecType: "S" },
    ],
  },
  {
    id: "ria_R2",
    moduleId: "riasec",
    riasecType: "R",
    text: "At a school fair, you would most like to volunteer at the:",
    options: [
      { id: "a", text: "Carpentry and craft workshop booth", riasecType: "R" },
      {
        id: "b",
        text: "Science experiment demonstrations booth",
        riasecType: "I",
      },
      { id: "c", text: "Art gallery and performance stage", riasecType: "A" },
      {
        id: "d",
        text: "Counseling and student support booth",
        riasecType: "S",
      },
    ],
  },
  {
    id: "ria_R3",
    moduleId: "riasec",
    riasecType: "R",
    text: "If given free time and equipment, you would most naturally spend it:",
    options: [
      {
        id: "a",
        text: "Fixing or assembling mechanical devices",
        riasecType: "R",
      },
      {
        id: "b",
        text: "Conducting a small science experiment",
        riasecType: "I",
      },
      {
        id: "c",
        text: "Writing a short story or composing music",
        riasecType: "A",
      },
      {
        id: "d",
        text: "Planning and leading a group activity",
        riasecType: "E",
      },
    ],
  },
  // INVESTIGATIVE (I) — 3 questions
  {
    id: "ria_I1",
    moduleId: "riasec",
    riasecType: "I",
    text: "Your ideal school project would involve:",
    options: [
      { id: "a", text: "Building a working model or machine", riasecType: "R" },
      {
        id: "b",
        text: "Researching a complex scientific question",
        riasecType: "I",
      },
      { id: "c", text: "Creating a visual art installation", riasecType: "A" },
      { id: "d", text: "Organizing a social campaign", riasecType: "S" },
    ],
  },
  {
    id: "ria_I2",
    moduleId: "riasec",
    riasecType: "I",
    text: "When you encounter an unexplained phenomenon, you most naturally:",
    options: [
      {
        id: "a",
        text: "Try to physically investigate using tools",
        riasecType: "R",
      },
      {
        id: "b",
        text: "Research deeply until you understand why it happens",
        riasecType: "I",
      },
      {
        id: "c",
        text: "Create an artistic interpretation of it",
        riasecType: "A",
      },
      {
        id: "d",
        text: "Discuss it with friends to gather opinions",
        riasecType: "S",
      },
    ],
  },
  {
    id: "ria_I3",
    moduleId: "riasec",
    riasecType: "I",
    text: "In a group project, you're most comfortable being the person who:",
    options: [
      {
        id: "a",
        text: "Handles equipment and physical construction",
        riasecType: "R",
      },
      { id: "b", text: "Does in-depth research and analysis", riasecType: "I" },
      { id: "c", text: "Designs the visual presentation", riasecType: "A" },
      {
        id: "d",
        text: "Keeps the team motivated and harmonious",
        riasecType: "S",
      },
    ],
  },
  // ARTISTIC (A) — 3 questions
  {
    id: "ria_A1",
    moduleId: "riasec",
    riasecType: "A",
    text: "If you could take one extra class, it would be:",
    options: [
      { id: "a", text: "Electronics or robotics workshop", riasecType: "R" },
      { id: "b", text: "Data science or coding", riasecType: "I" },
      { id: "c", text: "Creative writing or filmmaking", riasecType: "A" },
      { id: "d", text: "Public speaking or counseling", riasecType: "S" },
    ],
  },
  {
    id: "ria_A2",
    moduleId: "riasec",
    riasecType: "A",
    text: "You feel most energized after:",
    options: [
      {
        id: "a",
        text: "Completing a hands-on technical task",
        riasecType: "R",
      },
      {
        id: "b",
        text: "Solving a complex analytical problem",
        riasecType: "I",
      },
      {
        id: "c",
        text: "Creating something original and expressive",
        riasecType: "A",
      },
      {
        id: "d",
        text: "Helping a friend navigate a difficult situation",
        riasecType: "S",
      },
    ],
  },
  {
    id: "ria_A3",
    moduleId: "riasec",
    riasecType: "A",
    text: "The kind of work that excites you the most involves:",
    options: [
      {
        id: "a",
        text: "Working with tools, machines, or the outdoors",
        riasecType: "R",
      },
      { id: "b", text: "Exploring data, ideas, and theories", riasecType: "I" },
      {
        id: "c",
        text: "Expressing ideas through art, writing, or design",
        riasecType: "A",
      },
      { id: "d", text: "Influencing and motivating people", riasecType: "E" },
    ],
  },
  // SOCIAL (S) — 3 questions
  {
    id: "ria_S1",
    moduleId: "riasec",
    riasecType: "S",
    text: "In your ideal job, you would spend most of your time:",
    options: [
      {
        id: "a",
        text: "Working with physical objects or systems",
        riasecType: "R",
      },
      {
        id: "b",
        text: "Investigating and solving intellectual problems",
        riasecType: "I",
      },
      { id: "c", text: "Expressing creative ideas", riasecType: "A" },
      {
        id: "d",
        text: "Teaching, counseling, or helping people",
        riasecType: "S",
      },
    ],
  },
  {
    id: "ria_S2",
    moduleId: "riasec",
    riasecType: "S",
    text: "A friend is struggling academically and emotionally. You typically:",
    options: [
      {
        id: "a",
        text: "Help them build a structured study system",
        riasecType: "C",
      },
      {
        id: "b",
        text: "Research the best strategies and share them",
        riasecType: "I",
      },
      {
        id: "c",
        text: "Make them something creative to cheer them up",
        riasecType: "A",
      },
      {
        id: "d",
        text: "Listen patiently and offer emotional support first",
        riasecType: "S",
      },
    ],
  },
  {
    id: "ria_S3",
    moduleId: "riasec",
    riasecType: "S",
    text: "You find the most meaning when:",
    options: [
      {
        id: "a",
        text: "Completing a physical project successfully",
        riasecType: "R",
      },
      {
        id: "b",
        text: "Discovering something new through research",
        riasecType: "I",
      },
      {
        id: "c",
        text: "Your creative work moves or inspires people",
        riasecType: "A",
      },
      {
        id: "d",
        text: "Making a positive difference in someone's life",
        riasecType: "S",
      },
    ],
  },
  // ENTERPRISING (E) — 3 questions
  {
    id: "ria_E1",
    moduleId: "riasec",
    riasecType: "E",
    text: "Given a school budget to spend for your class, you would:",
    options: [
      {
        id: "a",
        text: "Invest in tools and equipment for workshops",
        riasecType: "R",
      },
      { id: "b", text: "Set up a small research lab", riasecType: "I" },
      { id: "c", text: "Fund creative arts and performances", riasecType: "A" },
      {
        id: "d",
        text: "Launch a school business or social enterprise",
        riasecType: "E",
      },
    ],
  },
  {
    id: "ria_E2",
    moduleId: "riasec",
    riasecType: "E",
    text: "Which description most matches how you see yourself?",
    options: [
      { id: "a", text: "Practical and good with my hands" },
      { id: "b", text: "Analytical and intellectually curious" },
      { id: "c", text: "Creative and good at self-expression" },
      { id: "d", text: "Persuasive and energized by leadership" },
    ],
  },
  {
    id: "ria_E3",
    moduleId: "riasec",
    riasecType: "E",
    text: "You enjoy situations where you can:",
    options: [
      {
        id: "a",
        text: "Work independently with concrete, tangible tasks",
        riasecType: "R",
      },
      {
        id: "b",
        text: "Analyze complex problems without time pressure",
        riasecType: "I",
      },
      {
        id: "c",
        text: "Have freedom to express and experiment",
        riasecType: "A",
      },
      {
        id: "d",
        text: "Pitch ideas, negotiate, and lead initiatives",
        riasecType: "E",
      },
    ],
  },
  // CONVENTIONAL (C) — 3 questions
  {
    id: "ria_C1",
    moduleId: "riasec",
    riasecType: "C",
    text: "When planning for an event, you prefer to:",
    options: [
      {
        id: "a",
        text: "Handle the physical setup and logistics",
        riasecType: "R",
      },
      {
        id: "b",
        text: "Analyze the best approach and create scenarios",
        riasecType: "I",
      },
      { id: "c", text: "Design the invitations and visuals", riasecType: "A" },
      {
        id: "d",
        text: "Manage the budget, checklist, and schedule",
        riasecType: "C",
      },
    ],
  },
  {
    id: "ria_C2",
    moduleId: "riasec",
    riasecType: "C",
    text: "Your preferred work environment would be:",
    options: [
      { id: "a", text: "Outdoors or in a hands-on workshop", riasecType: "R" },
      { id: "b", text: "A research lab or library", riasecType: "I" },
      { id: "c", text: "A creative studio", riasecType: "A" },
      {
        id: "d",
        text: "A well-organized office with clear systems",
        riasecType: "C",
      },
    ],
  },
  {
    id: "ria_C3",
    moduleId: "riasec",
    riasecType: "C",
    text: "You feel most productive when your work involves:",
    options: [
      {
        id: "a",
        text: "Physical activity and real-world problem solving",
        riasecType: "R",
      },
      { id: "b", text: "Deep research and fact-finding", riasecType: "I" },
      { id: "c", text: "Creative expression and originality", riasecType: "A" },
      {
        id: "d",
        text: "Following clear processes and maintaining accuracy",
        riasecType: "C",
      },
    ],
  },
];

// ─── MODULE 8: GRIT, MINDSET & VALUES (12 questions) ─────────────────────────

const gritQuestions: AssessmentQuestion[] = [
  // GRIT (G1-G4) — Duckworth-style
  {
    id: "grit_G1",
    moduleId: "grit",
    gritDimension: "grit",
    text: "When I face a setback in studies or a project, I usually:",
    options: [
      {
        id: "a",
        text: "Give up and try something else",
        gritDimension: "grit",
      },
      {
        id: "b",
        text: "Take a break and come back to it",
        gritDimension: "grit",
      },
      {
        id: "c",
        text: "Push through and find a solution",
        gritDimension: "grit",
      },
      { id: "d", text: "Ask for help and keep going", gritDimension: "grit" },
    ],
    correctOptionId: "c",
  },
  {
    id: "grit_G2",
    moduleId: "grit",
    gritDimension: "grit",
    text: "I have been deeply interested in the same goal, hobby, or passion for:",
    options: [
      { id: "a", text: "Less than a few months", gritDimension: "grit" },
      { id: "b", text: "About 1 year", gritDimension: "grit" },
      { id: "c", text: "A few years", gritDimension: "grit" },
      { id: "d", text: "As long as I can remember", gritDimension: "grit" },
    ],
    correctOptionId: "d",
  },
  {
    id: "grit_G3",
    moduleId: "grit",
    gritDimension: "grit",
    text: "I finish whatever I begin, even if it gets boring or difficult:",
    options: [
      { id: "a", text: "Rarely true of me", gritDimension: "grit" },
      { id: "b", text: "Sometimes true of me", gritDimension: "grit" },
      { id: "c", text: "Mostly true of me", gritDimension: "grit" },
      { id: "d", text: "Always true of me", gritDimension: "grit" },
    ],
    correctOptionId: "d",
  },
  {
    id: "grit_G4",
    moduleId: "grit",
    gritDimension: "grit",
    text: "If I discover I'm not naturally talented at something I care about, I would:",
    options: [
      {
        id: "a",
        text: "Drop it and find something I'm naturally good at",
        gritDimension: "grit",
      },
      {
        id: "b",
        text: "Work harder to get better at it",
        gritDimension: "grit",
      },
      {
        id: "c",
        text: "Look for shortcuts or easier alternatives",
        gritDimension: "grit",
      },
      {
        id: "d",
        text: "Redefine what success looks like in that area",
        gritDimension: "grit",
      },
    ],
    correctOptionId: "b",
  },
  // MINDSET (M1-M4) — Dweck-style
  {
    id: "grit_M1",
    moduleId: "grit",
    gritDimension: "mindset",
    text: "When I get a poor result in an exam, I think:",
    options: [
      {
        id: "a",
        text: "I'm just not smart enough for this subject",
        gritDimension: "mindset",
      },
      {
        id: "b",
        text: "I didn't prepare the right way — I'll change my approach",
        gritDimension: "mindset",
      },
      { id: "c", text: "The exam was unfair", gritDimension: "mindset" },
      {
        id: "d",
        text: "I need to find a subject I'm naturally good at",
        gritDimension: "mindset",
      },
    ],
    correctOptionId: "b",
  },
  {
    id: "grit_M2",
    moduleId: "grit",
    gritDimension: "mindset",
    text: "When someone is significantly better than me at something, I feel:",
    options: [
      { id: "a", text: "Threatened or discouraged", gritDimension: "mindset" },
      {
        id: "b",
        text: "Curious — I want to know how they got there",
        gritDimension: "mindset",
      },
      {
        id: "c",
        text: "It doesn't particularly affect me",
        gritDimension: "mindset",
      },
      {
        id: "d",
        text: "Motivated to work hard and match or surpass them",
        gritDimension: "mindset",
      },
    ],
    correctOptionId: "b",
  },
  {
    id: "grit_M3",
    moduleId: "grit",
    gritDimension: "mindset",
    text: "I believe that intelligence and talent:",
    options: [
      {
        id: "a",
        text: "Are fixed — you either have it or you don't",
        gritDimension: "mindset",
      },
      {
        id: "b",
        text: "Can grow with effort and the right strategies",
        gritDimension: "mindset",
      },
      {
        id: "c",
        text: "Matter less than connections and luck",
        gritDimension: "mindset",
      },
      {
        id: "d",
        text: "Are important but character and habits matter more",
        gritDimension: "mindset",
      },
    ],
    correctOptionId: "b",
  },
  {
    id: "grit_M4",
    moduleId: "grit",
    gritDimension: "mindset",
    text: "If I had to choose, I would prefer work that:",
    options: [
      {
        id: "a",
        text: "I'm already good at and feels comfortable",
        gritDimension: "mindset",
      },
      {
        id: "b",
        text: "Challenges me and helps me grow, even if I struggle",
        gritDimension: "mindset",
      },
      {
        id: "c",
        text: "Pays well, even if it's not my passion",
        gritDimension: "mindset",
      },
      {
        id: "d",
        text: "Makes a difference, even if it's hard and under-recognized",
        gritDimension: "mindset",
      },
    ],
    correctOptionId: "b",
  },
  // VALUES (V1-V4) — Super's Work Values adapted
  {
    id: "grit_V1",
    moduleId: "grit",
    gritDimension: "values",
    text: "The most important thing my future career must give me is (choose closest match):",
    options: [
      {
        id: "a",
        text: "Security, stability, and a reliable income",
        gritDimension: "values",
      },
      {
        id: "b",
        text: "High income, wealth, and financial freedom",
        gritDimension: "values",
      },
      {
        id: "c",
        text: "Making a positive impact on society",
        gritDimension: "values",
      },
      {
        id: "d",
        text: "Creative freedom and intellectual challenge",
        gritDimension: "values",
      },
    ],
  },
  {
    id: "grit_V2",
    moduleId: "grit",
    gritDimension: "values",
    text: "I would feel most proud if my work:",
    options: [
      {
        id: "a",
        text: "Solves a hard technical or scientific problem",
        gritDimension: "values",
      },
      {
        id: "b",
        text: "Changes someone's life for the better",
        gritDimension: "values",
      },
      {
        id: "c",
        text: "Creates something beautiful or original",
        gritDimension: "values",
      },
      {
        id: "d",
        text: "Builds something lasting — a company, institution, or system",
        gritDimension: "values",
      },
    ],
  },
  {
    id: "grit_V3",
    moduleId: "grit",
    gritDimension: "values",
    text: "When I imagine my ideal workday 10 years from now, I am:",
    options: [
      {
        id: "a",
        text: "Working alone, deeply focused on a complex problem",
        gritDimension: "values",
      },
      {
        id: "b",
        text: "Leading a team toward a shared goal",
        gritDimension: "values",
      },
      {
        id: "c",
        text: "Meeting people, helping and advising them",
        gritDimension: "values",
      },
      {
        id: "d",
        text: "Creating, designing, or building something new",
        gritDimension: "values",
      },
    ],
  },
  {
    id: "grit_V4",
    moduleId: "grit",
    gritDimension: "values",
    text: "If family and friends expected one career path but I strongly preferred another, I would:",
    options: [
      {
        id: "a",
        text: "Follow family expectations — harmony matters most",
        gritDimension: "values",
      },
      {
        id: "b",
        text: "Pursue my own path even if it causes temporary conflict",
        gritDimension: "values",
      },
      {
        id: "c",
        text: "Find a compromise that partially satisfies both",
        gritDimension: "values",
      },
      {
        id: "d",
        text: "Take time to research and persuade them with evidence",
        gritDimension: "values",
      },
    ],
  },
];

// ─── Combined Question Bank ───────────────────────────────────────────────────

export const questionBank: AssessmentQuestion[] = [
  ...logicalQuestions,
  ...numericalQuestions,
  ...verbalQuestions,
  ...scientificQuestions,
  ...creativeQuestions,
  ...leadershipQuestions,
  ...riasecQuestions,
  ...gritQuestions,
];

export const questionsByModule: Record<ModuleId, AssessmentQuestion[]> = {
  logical: logicalQuestions,
  numerical: numericalQuestions,
  verbal: verbalQuestions,
  scientific: scientificQuestions,
  creative: creativeQuestions,
  leadership: leadershipQuestions,
  riasec: riasecQuestions,
  grit: gritQuestions,
};
