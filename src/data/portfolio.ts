export const personal = {
  name: "Margareta Lola Lali Lulita",
  title: "Data Analyst • Business Intelligence • System Engineer",
  tagline: "Turning Data Into Better Business Decisions.",
  summary:
    "Data-oriented Informatics Engineering graduate with experience in business intelligence, data analysis, and system implementation. Proven ability to analyze large-scale datasets, validate business metrics, and translate operational needs into data-driven solutions. Strong interest in data analytics, business intelligence, and decision support systems.",
  email: "margaretalolalilulita@gmail.com",
  linkedin: "https://linkedin.com/in/margaretalola",
  github: "https://github.com/margaretalola",
  bio:
    "Informatics Engineering graduate with a strong interest in Data Analytics, Business Intelligence, and Decision Support Systems. Passionate about transforming data into meaningful insights and collaborating with cross-functional teams to solve business problems through technology.",
  available: true,
}

export const quickStats = [
  { label: "Professional Experiences", value: "5" },
  { label: "Professional Certifications", value: "4" },
  { label: "Stakeholders Presented", value: "110+" },
  { label: "Records Analyzed", value: "2,000+" },
  // { label: "GPA", value: "3.89 / 4.00" },
]

export const experience = [
  {
    company: "PT Aplikanusa Lintasarta",
    role: "Operation Support Engineer",
    period: "Feb 2026 – May 2026",

    description:
      "Processed and analyzed national network disruption data, validated KPI and SLA metrics, and supported system implementation initiatives for operational improvement.",

    responsibilities: [
      "Processed and analyzed large-scale national network disruption data to uncover patterns and trends.",
      "Developed a structured data interpretation framework for handling mass and non-mass disruptions.",
      "Validated SLA and KPI performance metrics to ensure operational accuracy.",
      "Supported QA and UAT by validating system outputs against business requirements.",
      "Presented analysis results and system insights to operational teams (110+ member) across regional branches.",
      "Collaborated with cross-functional teams to improve operational workflows.",
      "Contributed to user interface implementation and API integration."
    ],

    technologies: [
      "Data Analysis",
      "QA / UAT",
      "KPI & SLA Validation",
      "React",
      "API Integration"
    ],
  },
  {
    company: "PT Aplikanusa Lintasarta",

    role: "Network Operation Support Intern",

    period: "Nov 2025 – Jan 2026",

    description:
      "Assisted in designing a web-based network disruption handling system and supported operational data preparation.",

    responsibilities: [
      "Assisted in designing a web-based system for network disruption handling.",
      "Performed data validation on network disruption datasets.",
      "Prepared data requirements to support system development.",
      "Collaborated with team members to align system features with operational needs."
    ],

    technologies: [
      "System Development",
      "Data Validation",
      "Requirements Analysis"
    ],
  },
  {
    company: "Laskar AI",

    role: "AI Engineer Cohort",

    period: "Feb 2025 – Jun 2025",

    description:
      "Served as a Data Analyst in a capstone project focused on dental health issue detection.",

    responsibilities: [
      "Conducted exploratory data analysis (EDA).",
      "Performed data preprocessing and feature engineering.",
      "Contributed to machine learning model development and evaluation.",
      "Developed a customer retention prediction model using XGBoost and Logistic Regression.",
      "Built an interactive Streamlit application for model inference."
    ],

    technologies: [
      "Python",
      "XGBoost",
      "Logistic Regression",
      "Streamlit"
    ],
  },
  {
    company: "PT Ivonesia Solusi Data (Ivosights)",

    role: "Business Intelligence Intern",

    period: "Sep 2024 – Dec 2024",

    description:
      "Supported business reporting and strategic decision-making through data analysis and dashboard development.",

    responsibilities: [
      "Analyzed more than 2,000 weekly records.",
      "Conducted market and competitor analysis.",
      "Developed dashboards using Looker and Excel.",
      "Evaluated CRM system requirements.",
      "Automated reporting workflows using Google Apps Script."
    ],

    technologies: [
      "Looker",
      "Excel",
      "Google Apps Script",
      "Google Sheets"
    ],
  },
  {
    company: "High Performance Computing Laboratory",

    role: "Assistant Laboratory (Data Science)",

    period: "Mar 2023 – Jun 2023",

    description:
      "Assisted students during Data Science and High Performance Computing laboratory sessions.",

    responsibilities: [
      "Assisted students during laboratory sessions.",
      "Provided technical guidance and troubleshooting.",
      "Facilitated learning activities related to data processing and computational techniques."
    ],

    technologies: [
      "Python",
      "Data Science",
      "High Performance Computing"
    ],
  },
]

export const projectShowcase = [
  {
    id: "credit-score-prediction",
    title: "Credit Score Prediction",
    tagline: "Customer credit score classification with CRISP-DM",
    overview: "Built a classification model to predict customer credit score categories (Poor/Standard/Good) using the CRISP-DM methodology and the Global Finance Dataset from Kaggle.",
    role: "Data Analyst",
    timeline: "Capstone Project",
    problemStatement: "The company needs to understand customer credit profiles and risk from complex financial and payment-behavior data with many missing values.",
    solution: "Applied CRISP-DM: KNN imputation, Winsorize, RobustScaler, and trained several classification models.",
    contribution: "Processed 30,395 rows of data, handled missing values & outliers, and trained and evaluated models through to Streamlit deployment.",
    techStack: ["Python", "pandas", "scikit-learn", "KNN Imputer", "RobustScaler", "Random Forest", "Streamlit"],
    architecture: "Raw CSV → KNN Impute → Winsorize → RobustScaler → LabelEncoder → Random Forest → Streamlit App",
    challenges: "The dataset had many missing values (up to 14.97%) and outliers, as well as noise such as negative values in age.",
    results: {
      accuracy: "79%",
      precision: "79%",
      recall: "79%",
      businessValue: "Random Forest was selected as the best model (79%) for predicting customer credit score categories.",
    },
    screenshots: [],
    github: "https://github.com/margaretalola/credit-score-prediction_finance",
    live: "#",
    lessonsLearned: "RobustScaler is more outlier-resistant than StandardScaler; handling missing values & outliers greatly determines model quality.",
    tags: ["Python", "CRISP-DM", "Random Forest"],
  },
  {
    id: "course-recommendation",
    title: "Course Recommendation (SML)",
    tagline: "Automated preprocessing pipeline for Coursera course recommendation",
    overview: "A machine learning experiment for a Coursera course recommendation system with an automated preprocessing pipeline tracked via MLflow and GitHub Actions.",
    role: "ML Engineer",
    timeline: "ML Experiment",
    problemStatement: "Raw Coursera course data (mixed text & features) needs to be processed before it can be used for recommendation experiments.",
    solution: "Built an automated preprocessing script: deduplication, rating imputation, text cleaning, encoding, and TF-IDF feature extraction.",
    contribution: "Developed an automated preprocessing pipeline with MLflow tracking and CI via GitHub Actions.",
    techStack: ["Python", "pandas", "scikit-learn", "NLTK", "TF-IDF", "MLflow", "GitHub Actions"],
    architecture: "Coursera CSV → Clean Text → LabelEncode → TF-IDF → Preprocessed CSV (MLflow tracked, GitHub Actions CI)",
    challenges: "English text needed to be cleaned of stopwords & lemmatized so TF-IDF features are meaningful.",
    results: {
      accuracy: "—",
      precision: "—",
      recall: "—",
      businessValue: "Produced a ready-to-use preprocessed dataset for course recommendation model experiments.",
    },
    screenshots: [],
    github: "https://github.com/margaretalola/Eksperimen_SML_Margareta-Lola-Lali-Lulita",
    live: "#",
    lessonsLearned: "Experiment tracking with MLflow and CI automation greatly speed up data preprocessing iterations.",
    tags: ["Python", "NLP", "MLflow"],
  },
  {
    id: "employee-attrition",
    title: "Employee Retention — Attrition Prediction",
    tagline: "Predicting employee attrition with Logistic Regression + SMOTE",
    overview: "Built a classification model to predict employee attrition (Logistic Regression + SMOTE, ROC AUC 0.784) along with a Looker Studio dashboard.",
    role: "Data Analyst",
    timeline: "Final Project",
    problemStatement: "The company faces an attrition rate above 10% without understanding the contributing factors.",
    solution: "Trained a classification model with imbalance handling (SMOTE) and presented insights via a dashboard.",
    contribution: "Performed EDA, modeling, evaluation (ROC AUC 0.784), and built the dashboard and retention recommendations.",
    techStack: ["Python", "scikit-learn", "imbalanced-learn", "Logistic Regression", "SMOTE", "Looker Studio", "seaborn"],
    architecture: "HR CSV → Preprocessing → SMOTE → Logistic Regression → ROC AUC 0.784 → Looker Studio Dashboard",
    challenges: "Data was imbalanced (attrition only 12.18%); SMOTE was used to balance the classes.",
    results: {
      accuracy: "—",
      precision: "—",
      recall: "—",
      businessValue: "ROC AUC 0.784; main attrition factors: Monthly Income, Work-Life Balance, Job Satisfaction, Overtime.",
    },
    screenshots: [],
    github: "https://github.com/margaretalola/employee-retention_penerapan-data-science",
    live: "#",
    lessonsLearned: "Imbalance handling with SMOTE improves the model's ability to detect minority cases.",
    tags: ["Python", "Logistic Regression", "SMOTE"],
  },
  {
    id: "sentiment-hybrid",
    title: "Indonesian Sentiment Analysis (Hybrid)",
    tagline: "Oversampling comparison + LSTM/BiLSTM hybrid",
    overview: "A comparative study of oversampling techniques for Indonesian sentiment analysis using a hybrid approach (lexicon + LSTM/BiLSTM).",
    role: "ML Engineer / NLP",
    timeline: "Bootcamp Project",
    problemStatement: "Indonesian sentiment data is imbalanced, affecting deep learning model performance.",
    solution: "Combined a lexicon-based approach with LSTM/BiLSTM and experimented with oversampling techniques.",
    contribution: "Built & evaluated 8 model combinations (LSTM/BiLSTM × SMOTE/ADASYN/Random/Non) plus a Streamlit inference app.",
    techStack: ["Python", "TensorFlow", "Keras", "LSTM", "BiLSTM", "Sastrawi", "NLTK", "imbalanced-learn", "Streamlit"],
    architecture: "Text → Lexicon + Preprocess → Tokenizer → LSTM/BiLSTM → Oversampling Comparison → Streamlit Inference",
    challenges: "Balancing imbalanced data with various resampling methods while maintaining performance.",
    results: {
      accuracy: "96%",
      precision: "94%",
      recall: "94%",
      businessValue: "Best combinations (LSTM/BiLSTM Non-Resampling & Random Oversampling) reached 96% accuracy / 94% F1.",
    },
    screenshots: [],
    github: "https://github.com/margaretalola/inference-oversampling",
    live: "#",
    lessonsLearned: "A hybrid lexicon + deep learning approach yields strong results for Indonesian sentiment.",
    tags: ["Python", "LSTM", "BiLSTM"],
  },
  {
    id: "student-dropout",
    title: "Student Dropout Prediction (Edutech)",
    tagline: "Detecting student dropout risk with XGBoost",
    overview: "A predictive model to detect student dropout risk (32.1%) with XGBoost, a Looker Studio dashboard, and a Streamlit prototype app.",
    role: "Data Analyst / ML Engineer",
    timeline: "Final Project",
    problemStatement: "The educational institution faces a 32.1% dropout rate without early detection.",
    solution: "Built a predictive machine learning model and dashboard to identify at-risk students.",
    contribution: "Data analysis, XGBoost model development, Looker dashboard, and Streamlit prototype deployment.",
    techStack: ["Python", "XGBoost", "scikit-learn", "category_encoders", "Streamlit", "Looker Studio"],
    architecture: "Student CSV → Feature Eng → XGBoost → Risk Prediction → Looker Dashboard + Streamlit",
    challenges: "Integrating academic & financial factors (debtor, scholarship, tuition) into the prediction.",
    results: {
      accuracy: "—",
      precision: "—",
      recall: "—",
      businessValue: "Identifies at-risk students early for proactive intervention.",
    },
    screenshots: [],
    github: "https://github.com/margaretalola/student-dropout",
    live: "#",
    lessonsLearned: "Early ML-based prediction combined with an interactive dashboard greatly helps decision-makers in education.",
    tags: ["Python", "XGBoost", "Edutech"],
  },
  {
    id: "spotify-reviews",
    title: "Sentiment Analysis — Spotify Reviews",
    tagline: "EDA & preprocessing of ~61K Spotify app reviews",
    overview: "Analyzed ~61K Spotify reviews from Google Play Store to examine user satisfaction aspects through EDA & text preprocessing.",
    role: "Data Analyst",
    timeline: "Independent",
    problemStatement: "User reviews are very numerous & unstructured, making satisfaction insights hard to extract.",
    solution: "Performed EDA and text preprocessing (lowercase, remove punctuation & stopwords, lemmatization).",
    contribution: "Explored data structure & cleaned review text for downstream sentiment analysis.",
    techStack: ["Python", "pandas", "NLTK", "EDA", "Text Preprocessing"],
    architecture: "Reviews CSV → EDA → Text Cleaning → Lemmatization → Cleaned Corpus",
    challenges: "Review text contains emojis, slang, and noise that need to be cleaned.",
    results: {
      accuracy: "—",
      precision: "—",
      recall: "—",
      businessValue: "Produced a clean review dataset ready for sentiment modeling.",
    },
    screenshots: [],
    github: "https://github.com/margaretalola/SentimentAnalysis_SpotifyReview/tree/main",
    live: "#",
    lessonsLearned: "Good text preprocessing (stopwords + lemmatization) is a crucial foundation before sentiment analysis.",
    tags: ["Python", "NLTK", "EDA"],
  }
]

export const skills: Record<string, string[]> = {
  "Data Analytics": ["Python", "SQL", "Excel", "Google Sheets", "Looker"],
  "Machine Learning": ["XGBoost", "Logistic Regression", "Feature Engineering", "Data Preprocessing"],
  "System Development": ["QA", "UAT", "API Integration", "Jira"],
  "Programming": ["React", "Flutter"],
  "DevOps & Monitoring": ["Docker", "MLflow", "Prometheus", "Grafana"],
  "Design": ["Figma", "Whimsical"],
}

export const certifications = [
  {
    title: "Associate Data Scientist",
    issuer: "BNSP",
    year: "2025",
    credential: "https://example.com/credential/bnsp-data-scientist",
  },
  {
    title: "Agile Scrum Fundamentals",
    issuer: "Scrum Study",
    year: "2025",
    credential: "https://example.com/credential/agile-scrum",
  },
  {
    title: "Excel Associate",
    issuer: "Microsoft",
    year: "2024",
    credential: "https://example.com/credential/excel-associate",
  },
  {
    title: "Computer Vision for Industrial Inspection",
    issuer: "NVIDIA",
    year: "2025",
    credential: "https://example.com/credential/computer-vision",
  },
  {
    title: "Google UX Design",
    issuer: "Google",
    year: "2023",
    credential: "https://example.com/credential/google-ux",
  }
]

export const contact = {
  email: personal.email,
  linkedin: personal.linkedin,
  github: personal.github,
  resumeUrl: "/CV_Margareta_Lola_Lali_Lulita.pdf",
}

// Gamification system
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  category: 'exploration' | 'completion' | 'social' | 'speed';
  unlocked: boolean;
  unlockedAt?: number;
}

export interface GamificationProgress {
  skillPoints: number;
  sectionsCompleted: Record<string, boolean>;
  badges: Record<string, boolean>;
  lastActive: number;
  streak: number;
}

const initialAchievements: Achievement[] = [
  {
    id: 'first_look',
    name: 'First Look',
    description: 'Visited the portfolio homepage',
    icon: '👁️',
    points: 10,
    category: 'exploration',
    unlocked: false,
  },
  {
    id: 'about_section',
    name: 'About Me',
    description: 'Read the about section',
    icon: '📖',
    points: 15,
    category: 'exploration',
    unlocked: false,
  },
  {
    id: 'experience_explorer',
    name: 'Experience Explorer',
    description: 'Browsed through work experience',
    icon: '💼',
    points: 20,
    category: 'exploration',
    unlocked: false,
  },
  {
    id: 'project_scout',
    name: 'Project Scout',
    description: 'Viewed project details',
    icon: '🚀',
    points: 25,
    category: 'exploration',
    unlocked: false,
  },
  {
    id: 'skills_explorer',
    name: 'Skills Explorer',
    description: 'Browsed through all skill categories',
    icon: '🔍',
    points: 20,
    category: 'exploration',
    unlocked: false,
  },
  {
    id: 'certifications_viewer',
    name: 'Certifications Viewer',
    description: 'Viewed certifications',
    icon: '🏅',
    points: 15,
    category: 'exploration',
    unlocked: false,
  },
  {
    id: 'contact_mover',
    name: 'Contact Mover',
    description: 'Reached out via contact',
    icon: '✉️',
    points: 50,
    category: 'completion',
    unlocked: false,
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Completed portfolio in under 30 seconds',
    icon: '⚡',
    points: 100,
    category: 'speed',
    unlocked: false,
  },
  {
    id: 'quick_visitor',
    name: 'Quick Visitor',
    description: 'Completed portfolio in under 60 seconds',
    icon: '💨',
    points: 75,
    category: 'speed',
    unlocked: false,
  },
  {
    id: 'linkedin_share',
    name: 'LinkedIn Share',
    description: 'Shared portfolio on LinkedIn',
    icon: '🔗',
    points: 30,
    category: 'social',
    unlocked: false,
  },
  {
    id: 'github_star',
    name: 'GitHub Star',
    description: 'Starred the repository',
    icon: '⭐',
    points: 40,
    category: 'social',
    unlocked: false,
  },
]

export const gamification = {
  achievements: initialAchievements,
  getUnlockedAchievements: (): Achievement[] => {
    return initialAchievements.filter(a => a.unlocked);
  },
  calculatePoints: (section: string): number => {
    const pointMap: Record<string, number> = {
      'hero': 10,
      'about': 15,
      'experience': 20,
      'projects': 25,
      'skills': 20,
      'certifications': 15,
      'contact': 50,
    };
    return pointMap[section] || 0;
  },
  checkAchievementUnlock: (achievementId: string, progress: GamificationProgress): GamificationProgress => {
    const achievement = initialAchievements.find(a => a.id === achievementId);
    if (!achievement || progress.badges[achievementId]) return progress;

    let unlocked = false;
    switch (achievementId) {
      case 'first_look':
        unlocked = true;
        break;
      case 'about_section':
        unlocked = progress.sectionsCompleted.about;
        break;
      case 'experience_explorer':
        unlocked = progress.sectionsCompleted.experience;
        break;
      case 'project_scout':
        unlocked = progress.sectionsCompleted.projects;
        break;
      case 'skills_explorer':
        unlocked = progress.sectionsCompleted.skills;
        break;
      case 'certifications_viewer':
        unlocked = progress.sectionsCompleted.certifications;
        break;
      case 'contact_mover':
        unlocked = progress.sectionsCompleted.contact;
        break;
      case 'speed_demon':
        unlocked = progress.streak >= 120;
        break;
      case 'quick_visitor':
        unlocked = progress.streak >= 60;
        break;
      case 'linkedin_share':
        unlocked = progress.badges['linkedin'];
        break;
      case 'github_star':
        unlocked = progress.badges['github'];
        break;
    }

    if (unlocked) {
      return {
        ...progress,
        badges: { ...progress.badges, [achievementId]: true },
        skillPoints: progress.skillPoints + achievement.points,
      };
    }

    return progress;
  },
  getSectionScore: (sectionId: string): { score: number; maxScore: number; percentage: number } => {
    const sectionPoints: Record<string, number> = {
      'hero': 10,
      'about': 20,
      'experience': 25,
      'projects': 40,
      'skills': 30,
      'certifications': 20,
      'contact': 75,
    };
    const maxPoints = sectionPoints[sectionId] || 0;
    const maxTotal = 150;
    return {
      score: maxPoints,
      maxScore: maxTotal,
      percentage: Math.round((maxPoints / maxTotal) * 100),
    };
  },
};

export const gamificationProgress: GamificationProgress = {
  skillPoints: 0,
  sectionsCompleted: {},
  badges: { linkedin: false, github: false },
  lastActive: Date.now(),
  streak: 0,
};