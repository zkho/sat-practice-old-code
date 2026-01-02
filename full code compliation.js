import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { BookOpen, Brain, Target, Trophy, TrendingUp, CheckCircle, XCircle, Clock, Zap, Star, ChevronRight, BarChart3, Home, User, Award, Lightbulb, ArrowRight, RefreshCw, RotateCcw, GraduationCap, Flame, Sparkles, AlertTriangle } from 'lucide-react';

// Question Banks
const englishQuestions = [
  {
    id: "de55ec71",
    domain: "Standard English Conventions",
    skill: "Boundaries",
    difficulty: "Easy",
    passage: "Generations of mystery and horror ______ have been influenced by the dark, gothic stories of celebrated American author Edgar Allan Poe (1809–1849).",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["writers", "writers,", "writers—", "writers;"],
    correctAnswer: 0,
    explanation: "When a subject ('Generations of mystery and horror writers') is immediately followed by a verb ('have been influenced'), no punctuation is needed between them."
  },
  {
    id: "89fbc3eb",
    domain: "Standard English Conventions",
    skill: "Boundaries",
    difficulty: "Medium",
    passage: "The Mission 66 initiative, which was approved by Congress in 1956, represented a major investment in the infrastructure of overburdened national ______ it prioritized physical improvements to the parks' roads, utilities, employee housing, and visitor facilities while also establishing educational programming for the public.",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["parks and", "parks", "parks;", "parks,"],
    correctAnswer: 2,
    explanation: "A semicolon correctly joins two independent clauses. The first clause ends with 'parks' and the second begins with 'it prioritized.'"
  },
  {
    id: "7f226b4b",
    domain: "Standard English Conventions",
    skill: "Boundaries",
    difficulty: "Medium",
    passage: "In a 2023 study, researchers documented a fascinating behavior in the aquatic plant Elodea densa. When exposed to low levels of light, the plant's ______ the cellular organs that generate energy from light—reshuffled to form a tightly packed, glass-like surface ideal for collecting more light.",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["chloroplasts", "chloroplasts;", "chloroplasts,", "chloroplasts—"],
    correctAnswer: 3,
    explanation: "A dash pairs with the closing dash after 'from light' to set off the supplementary definition of chloroplasts."
  },
  {
    id: "e38b3e4f",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Easy",
    passage: "The radiation that ______ during the decay of radioactive atomic nuclei is known as gamma radiation.",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["occurs", "have occurred", "occur", "are occurring"],
    correctAnswer: 0,
    explanation: "The singular verb 'occurs' agrees with the singular subject 'radiation.'"
  },
  {
    id: "37e5c794",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Hard",
    passage: "Despite being cheap, versatile, and easy to produce, ______ they are made from nonrenewable petroleum, and most do not biodegrade in landfills.",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "there are two problems associated with commercial plastics:",
      "two problems are associated with commercial plastics:",
      "commercial plastics' two associated problems are that",
      "commercial plastics have two associated problems:"
    ],
    correctAnswer: 3,
    explanation: "The modifying phrase 'Despite being cheap, versatile, and easy to produce' must be followed by the noun it modifies—'commercial plastics.'"
  },
  {
    id: "6f08641e",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Medium",
    passage: "On April 5, 1977, Kitty Cone and 150 other disability rights activists entered a San Francisco federal building. After pleading for years—to no effect—for the passage of key antidiscrimination legislation, ______ until their demands were addressed. Finally, on April 28, the legislation was signed.",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "pressure on lawmakers increased when the activists staged a sit-in protest",
      "a sit-in protest staged by the activists increased pressure on lawmakers",
      "lawmakers came under increased pressure when the activists staged a sit-in protest",
      "the activists increased pressure on lawmakers by staging a sit-in protest"
    ],
    correctAnswer: 3,
    explanation: "The modifying phrase 'After pleading for years...' must be followed by the noun it modifies—'the activists.'"
  },
  {
    id: "2c49940e",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Medium",
    passage: "French philosopher René Descartes doubted whether he could prove his own existence. Eventually, he found proof in his famous phrase \"I think, therefore I am.\" The ______ complexity: only those who exist would be able to ponder their existence.",
    question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "phrases' simplicity masks its",
      "phrases simplicity masks their",
      "phrase's simplicity masks their",
      "phrase's simplicity masks its"
    ],
    correctAnswer: 3,
    explanation: "The singular possessive 'phrase's' indicates one phrase, and 'its' agrees with this singular noun."
  },
  {
    id: "gen-trans-01",
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Medium",
    passage: "The Hubble Space Telescope has revolutionized our understanding of the universe since its launch in 1990. ______, its replacement, the James Webb Space Telescope, promises even greater discoveries with its advanced infrared capabilities.",
    question: "Which choice completes the text with the most logical transition?",
    options: ["However", "Furthermore", "Nevertheless", "Consequently"],
    correctAnswer: 1,
    explanation: "'Furthermore' adds information that builds on the previous statement without contradiction."
  },
  {
    id: "gen-trans-02",
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Hard",
    passage: "Many historians argue that the printing press was the most significant invention of the Renaissance. ______, others contend that the compass had a more profound impact by enabling global exploration and trade.",
    question: "Which choice completes the text with the most logical transition?",
    options: ["Similarly", "In addition", "By contrast", "As a result"],
    correctAnswer: 2,
    explanation: "'By contrast' effectively signals that the second group of historians holds an opposing view."
  },
  {
    id: "gen-rhet-01",
    domain: "Expression of Ideas",
    skill: "Rhetorical Synthesis",
    difficulty: "Hard",
    passage: "A student is writing an essay about the decline of bee populations. The student wants to emphasize the economic impact of this decline on agriculture.",
    question: "Which choice most effectively uses data to emphasize the economic impact?",
    options: [
      "Bees are fascinating creatures that have existed for millions of years.",
      "The U.S. Department of Agriculture estimates that bee pollination contributes over $15 billion annually to crop production.",
      "Many flowers depend on bees for pollination.",
      "Scientists are working to understand why bee populations are declining."
    ],
    correctAnswer: 1,
    explanation: "The specific dollar figure directly addresses the economic impact the student wants to emphasize."
  },
  {
    id: "gen-central-01",
    domain: "Information and Ideas",
    skill: "Central Ideas and Purpose",
    difficulty: "Medium",
    passage: "Archaeological evidence suggests that ancient Polynesians were master navigators who traversed thousands of miles of open ocean using only the stars, wave patterns, and bird behavior as guides. Their double-hulled canoes, capable of carrying dozens of people along with supplies and livestock, enabled them to colonize islands scattered across a vast expanse of the Pacific Ocean.",
    question: "Which choice best states the main idea of the text?",
    options: [
      "Ancient Polynesians built canoes that could carry many passengers.",
      "Polynesians used birds to help them navigate.",
      "Ancient Polynesians were skilled navigators who used sophisticated techniques and vessels to explore the Pacific.",
      "The Pacific Ocean contains many scattered islands."
    ],
    correctAnswer: 2,
    explanation: "This choice captures both the navigation skills and the vessels that enabled Pacific exploration."
  },
  {
    id: "gen-infer-01",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficulty: "Hard",
    passage: "In a recent study, researchers found that plants release more volatile organic compounds when neighboring plants are being eaten by herbivores. Other plants in the area then increase their production of defensive chemicals, even before they themselves are attacked.",
    question: "Based on the text, what can most reasonably be inferred about plant communication?",
    options: [
      "Plants can only communicate through their root systems.",
      "Plants may use chemical signals to warn neighboring plants of danger.",
      "Herbivores prefer plants that don't produce defensive chemicals.",
      "All plants produce the same volatile organic compounds."
    ],
    correctAnswer: 1,
    explanation: "The evidence that plants respond to signals from attacked neighbors suggests chemical communication about threats."
  },
  {
    id: "gen-vocab-01",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficulty: "Easy",
    passage: "The committee decided to table the proposal until the next meeting, preferring to gather more data before making a final decision.",
    question: "As used in the text, 'table' most nearly means",
    options: ["display openly", "postpone consideration of", "reject permanently", "present formally"],
    correctAnswer: 1,
    explanation: "In this context, 'table' means to postpone discussion, as indicated by 'until the next meeting.'"
  },
  {
    id: "gen-vocab-02",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficulty: "Medium",
    passage: "The author's mordant wit was evident throughout the essay, as she skewered the pretensions of the social elite with razor-sharp observations that left readers both amused and uncomfortable.",
    question: "As used in the text, 'mordant' most nearly means",
    options: ["gentle", "biting", "elaborate", "inconsistent"],
    correctAnswer: 1,
    explanation: "Context clues like 'skewered,' 'razor-sharp,' and 'uncomfortable' indicate sharp, critical humor."
  }
];

const mathQuestions = [
  {
    id: "1480dd5c",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "Easy",
    passage: "For the linear function f, f(5) = 3 and f(3) = 13.",
    question: "What is the value of f(0)?",
    options: ["28", "23", "18", "8"],
    correctAnswer: 0,
    explanation: "Using the two points (5, 3) and (3, 13), find the slope: m = (13-3)/(3-5) = -5. Then use point-slope form to find f(0) = 28.",
    solution: "Slope m = (13-3)/(3-5) = 10/-2 = -5. Using f(x) = mx + b: 3 = -5(5) + b, so b = 28."
  },
  {
    id: "bd9eb2b5",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "Easy",
    passage: "The function f is defined by f(x) = 7x.",
    question: "For what value of x does f(x) = 21?",
    options: ["3", "7", "14", "28"],
    correctAnswer: 0,
    explanation: "Substituting 21 for f(x): 21 = 7x. Dividing both sides by 7 gives x = 3.",
    solution: "21 = 7x → x = 21/7 = 3"
  },
  {
    id: "f224df07",
    domain: "Algebra",
    skill: "Linear inequalities",
    difficulty: "Medium",
    passage: "A cargo helicopter delivers only 100-pound packages and 120-pound packages. For each delivery trip, the helicopter must carry at least 10 packages, and the total weight of the packages can be at most 1,100 pounds.",
    question: "What is the maximum number of 120-pound packages that the helicopter can carry per trip?",
    options: ["2", "4", "5", "6"],
    correctAnswer: 2,
    explanation: "Let a = 120-lb packages, b = 100-lb packages. To maximize a, minimize b. Setting up constraints and solving: 20a ≤ 100, so a ≤ 5.",
    solution: "120a + 100(10-a) ≤ 1100 → 20a ≤ 100 → a ≤ 5"
  },
  {
    id: "gen-quad-01",
    domain: "Advanced Math",
    skill: "Quadratic equations",
    difficulty: "Medium",
    passage: "",
    question: "If x² - 6x + 8 = 0, what is the sum of the solutions?",
    options: ["6", "8", "-6", "2"],
    correctAnswer: 0,
    explanation: "By Vieta's formulas, the sum of roots = -b/a = 6. Or factor: (x-2)(x-4) = 0, roots are 2 and 4, sum = 6.",
    solution: "x² - 6x + 8 = (x-2)(x-4) = 0 → sum = 2 + 4 = 6"
  },
  {
    id: "gen-quad-02",
    domain: "Advanced Math",
    skill: "Quadratic equations",
    difficulty: "Hard",
    passage: "The function f(x) = x² - 4x + k has exactly one real zero.",
    question: "What is the value of k?",
    options: ["2", "4", "8", "16"],
    correctAnswer: 1,
    explanation: "For exactly one real zero, discriminant = 0: b² - 4ac = 0. So 16 - 4k = 0, giving k = 4.",
    solution: "Discriminant = 16 - 4k = 0 → k = 4"
  },
  {
    id: "gen-quad-03",
    domain: "Advanced Math",
    skill: "Quadratic functions",
    difficulty: "Medium",
    passage: "The graph of y = (x - 3)² - 4 is a parabola in the xy-plane.",
    question: "What is the y-coordinate of the vertex of this parabola?",
    options: ["-4", "-3", "3", "4"],
    correctAnswer: 0,
    explanation: "The vertex form y = (x - h)² + k has vertex at (h, k). Here, vertex is at (3, -4).",
    solution: "Vertex is at (3, -4), so y-coordinate = -4"
  },
  {
    id: "gen-exp-01",
    domain: "Advanced Math",
    skill: "Exponential functions",
    difficulty: "Medium",
    passage: "A bacteria population doubles every 3 hours. Initially there are 500 bacteria.",
    question: "How many bacteria will there be after 9 hours?",
    options: ["1,000", "2,000", "4,000", "8,000"],
    correctAnswer: 2,
    explanation: "After 9 hours = 3 doubling periods. 500 × 2³ = 500 × 8 = 4,000.",
    solution: "9 hours = 3 doublings. 500 × 2³ = 4,000"
  },
  {
    id: "gen-exp-02",
    domain: "Advanced Math",
    skill: "Exponential decay",
    difficulty: "Hard",
    passage: "A car depreciates by 15% each year. The car is worth $20,000 today.",
    question: "Which expression represents the value after t years?",
    options: ["20000(0.15)^t", "20000(0.85)^t", "20000(1.15)^t", "20000 - 0.15t"],
    correctAnswer: 1,
    explanation: "Depreciation by 15% means retaining 85% each year. V = 20000(0.85)^t.",
    solution: "Value = 20000 × (1 - 0.15)^t = 20000(0.85)^t"
  },
  {
    id: "gen-geo-01",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "Medium",
    passage: "A circle has equation (x - 2)² + (y + 3)² = 25.",
    question: "What is the radius of the circle?",
    options: ["5", "25", "√5", "2"],
    correctAnswer: 0,
    explanation: "Standard form (x - h)² + (y - k)² = r² gives radius r. Here, r² = 25, so r = 5.",
    solution: "r² = 25, so r = 5"
  },
  {
    id: "gen-geo-02",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles",
    difficulty: "Easy",
    passage: "In a right triangle, one leg has length 3 and the hypotenuse has length 5.",
    question: "What is the length of the other leg?",
    options: ["2", "4", "6", "8"],
    correctAnswer: 1,
    explanation: "Pythagorean theorem: 3² + b² = 5², so 9 + b² = 25, b² = 16, b = 4.",
    solution: "3² + b² = 5² → b = 4"
  },
  {
    id: "gen-trig-01",
    domain: "Geometry and Trigonometry",
    skill: "Trigonometry",
    difficulty: "Medium",
    passage: "In a right triangle, sin(θ) = 3/5.",
    question: "What is cos(θ)?",
    options: ["3/5", "4/5", "5/4", "5/3"],
    correctAnswer: 1,
    explanation: "Using sin²θ + cos²θ = 1: (3/5)² + cos²θ = 1, so cos²θ = 16/25, cosθ = 4/5.",
    solution: "cos²θ = 1 - 9/25 = 16/25 → cosθ = 4/5"
  },
  {
    id: "gen-stat-01",
    domain: "Problem Solving and Data Analysis",
    skill: "Statistics",
    difficulty: "Easy",
    passage: "A data set contains: 12, 15, 18, 21, 24.",
    question: "What is the mean of this data set?",
    options: ["15", "18", "21", "90"],
    correctAnswer: 1,
    explanation: "Mean = sum/count = (12 + 15 + 18 + 21 + 24)/5 = 90/5 = 18.",
    solution: "Mean = 90/5 = 18"
  },
  {
    id: "gen-stat-02",
    domain: "Problem Solving and Data Analysis",
    skill: "Statistics",
    difficulty: "Medium",
    passage: "In a survey of 200 students, 45% prefer online learning, 35% prefer in-person.",
    question: "How many students have no preference?",
    options: ["20", "40", "70", "90"],
    correctAnswer: 1,
    explanation: "No preference = 100% - 45% - 35% = 20%. Number = 0.20 × 200 = 40.",
    solution: "20% × 200 = 40 students"
  },
  {
    id: "gen-prob-01",
    domain: "Problem Solving and Data Analysis",
    skill: "Probability",
    difficulty: "Medium",
    passage: "A bag contains 4 red, 3 blue, and 5 green marbles.",
    question: "If one marble is drawn, what is P(blue)?",
    options: ["1/4", "1/3", "3/12", "5/12"],
    correctAnswer: 0,
    explanation: "Total = 12 marbles. P(blue) = 3/12 = 1/4.",
    solution: "P(blue) = 3/12 = 1/4"
  },
  {
    id: "gen-ratio-01",
    domain: "Problem Solving and Data Analysis",
    skill: "Ratios and proportions",
    difficulty: "Easy",
    passage: "A recipe needs 2 cups flour for every 3 cups sugar.",
    question: "With 8 cups flour, how many cups sugar?",
    options: ["6", "10", "12", "16"],
    correctAnswer: 2,
    explanation: "2/3 = 8/x → 2x = 24 → x = 12 cups sugar.",
    solution: "2/3 = 8/x → x = 12"
  },
  {
    id: "gen-percent-01",
    domain: "Problem Solving and Data Analysis",
    skill: "Percentages",
    difficulty: "Medium",
    passage: "A $150 item has 20% off, then 8% tax on discounted price.",
    question: "What is the final price?",
    options: ["$120.00", "$126.00", "$129.60", "$136.80"],
    correctAnswer: 2,
    explanation: "Discounted = $150 × 0.80 = $120. Tax = $120 × 0.08 = $9.60. Final = $129.60.",
    solution: "$150 × 0.80 = $120, then × 1.08 = $129.60"
  }
];

const colors = {
  primary: '#1a1a2e',
  secondary: '#16213e',
  accent: '#e94560',
  accentLight: '#ff6b6b',
  success: '#10b981',
  warning: '#f59e0b',
  info: '#3b82f6',
  text: '#f0f0f0',
  textMuted: '#94a3b8',
  cardBg: 'rgba(30, 41, 59, 0.8)',
};

const CHART_COLORS = ['#e94560', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function SATPerformanceSystem() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeSection, setActiveSection] = useState('english');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    totalAttempted: 0,
    correct: 0,
    byDomain: {},
    byDifficulty: { Easy: { correct: 0, total: 0 }, Medium: { correct: 0, total: 0 }, Hard: { correct: 0, total: 0 } },
    history: [],
    streak: 0,
    maxStreak: 0
  });
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [studyPlan, setStudyPlan] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const questions = activeSection === 'english' ? englishQuestions : mathQuestions;

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const generateStudyPlan = useCallback(() => {
    const weakAreas = [];
    Object.entries(sessionStats.byDomain).forEach(([domain, stats]) => {
      const accuracy = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
      if (accuracy < 70) {
        weakAreas.push({ domain, accuracy, priority: accuracy < 50 ? 'high' : 'medium' });
      }
    });
    setStudyPlan({
      weakAreas: weakAreas.sort((a, b) => a.accuracy - b.accuracy),
      recommendedPractice: weakAreas.length > 0 ? weakAreas[0].domain : 'Continue practicing!',
      estimatedImprovement: Math.min(50 + weakAreas.length * 20, 150)
    });
  }, [sessionStats]);

  const checkAnswer = () => {
    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;

    setSessionStats(prev => {
      const newStats = { ...prev };
      newStats.totalAttempted++;
      if (isCorrect) {
        newStats.correct++;
        newStats.streak++;
        newStats.maxStreak = Math.max(newStats.maxStreak, newStats.streak);
      } else {
        newStats.streak = 0;
      }

      const domain = question.domain;
      if (!newStats.byDomain[domain]) newStats.byDomain[domain] = { correct: 0, total: 0 };
      newStats.byDomain[domain].total++;
      if (isCorrect) newStats.byDomain[domain].correct++;

      newStats.byDifficulty[question.difficulty].total++;
      if (isCorrect) newStats.byDifficulty[question.difficulty].correct++;

      newStats.history.push({
        questionId: question.id,
        section: activeSection,
        domain: question.domain,
        difficulty: question.difficulty,
        isCorrect,
        timestamp: Date.now()
      });

      return newStats;
    });

    setShowExplanation(true);
    setIsTimerRunning(false);

    if (isCorrect && sessionStats.streak >= 4) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion(prev => (prev + 1) % questions.length);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsTimerRunning(true);
    setTimer(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const accuracy = sessionStats.totalAttempted > 0 
    ? Math.round((sessionStats.correct / sessionStats.totalAttempted) * 100) : 0;

  const projectedScore = useMemo(() => 400 + Math.round((accuracy / 100) * 400), [accuracy]);

  const performanceData = useMemo(() => {
    const last10 = sessionStats.history.slice(-10);
    return last10.map((item, index) => ({
      attempt: index + 1,
      cumulative: last10.slice(0, index + 1).filter(i => i.isCorrect).length
    }));
  }, [sessionStats.history]);

  const domainData = useMemo(() => {
    return Object.entries(sessionStats.byDomain).map(([name, stats]) => ({
      name: name.split(' ')[0],
      accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
    }));
  }, [sessionStats.byDomain]);

  const difficultyPieData = useMemo(() => {
    return Object.entries(sessionStats.byDifficulty)
      .filter(([_, stats]) => stats.total > 0)
      .map(([name, stats]) => ({
        name,
        value: stats.total,
        accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
      }));
  }, [sessionStats.byDifficulty]);

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, #0f172a 100%)`,
      fontFamily: "'Inter', system-ui, sans-serif",
      color: colors.text,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        
        @keyframes confetti {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .nav-item:hover { background: rgba(233, 69, 96, 0.1); transform: translateX(4px); }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        .btn-primary:hover { transform: scale(1.02); box-shadow: 0 10px 30px ${colors.accent}40; }
        .option-btn:hover { border-color: ${colors.accent}; background: rgba(233, 69, 96, 0.1); }
        .stat-card { animation: slideIn 0.5s ease-out forwards; }
        .streak-badge { animation: pulse 2s infinite; }
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${colors.secondary}; }
        ::-webkit-scrollbar-thumb { background: ${colors.accent}; border-radius: 4px; }
      `}</style>

      {/* Background decorations */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', width: '600px', height: '600px', borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.accent}15 0%, transparent 70%)`,
          top: '-200px', right: '-200px'
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.info}10 0%, transparent 70%)`,
          bottom: '-100px', left: '-100px'
        }} />
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 1000 }}>
          {[...Array(50)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute', width: '10px', height: '10px',
              background: CHART_COLORS[i % CHART_COLORS.length],
              borderRadius: i % 2 === 0 ? '50%' : '0',
              left: `${Math.random() * 100}%`,
              animation: `confetti ${2 + Math.random()}s ease-out forwards`,
              animationDelay: `${Math.random() * 0.5}s`
            }} />
          ))}
        </div>
      )}

      {/* Navigation */}
      <nav style={{
        position: 'fixed', left: 0, top: 0, bottom: 0, width: '260px',
        background: 'rgba(22, 33, 62, 0.95)', backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.05)', padding: '24px', zIndex: 100,
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px',
          padding: '12px', background: `linear-gradient(135deg, ${colors.accent}20, transparent)`, borderRadius: '16px'
        }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 20px ${colors.accent}40`
          }}>
            <GraduationCap size={28} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>SAT Prep</h1>
            <p style={{ fontSize: '12px', color: colors.textMuted, margin: 0 }}>Performance System</p>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          {[
            { id: 'dashboard', icon: Home, label: 'Dashboard' },
            { id: 'practice', icon: BookOpen, label: 'Practice' },
            { id: 'analytics', icon: BarChart3, label: 'Analytics' },
            { id: 'studyplan', icon: Target, label: 'Study Plan' },
          ].map((item) => (
            <button key={item.id} className="nav-item" onClick={() => setCurrentView(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px 16px', marginBottom: '8px',
                background: currentView === item.id ? `linear-gradient(90deg, ${colors.accent}30, transparent)` : 'transparent',
                border: 'none', borderRadius: '12px',
                color: currentView === item.id ? colors.accent : colors.textMuted,
                fontSize: '15px', fontWeight: currentView === item.id ? 600 : 400,
                cursor: 'pointer', transition: 'all 0.2s ease',
                borderLeft: currentView === item.id ? `3px solid ${colors.accent}` : '3px solid transparent'
              }}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </div>

        <div style={{
          padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px',
              background: `linear-gradient(135deg, ${colors.info}, ${colors.accent})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <User size={20} color="white" />
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>Student</p>
              <p style={{ fontSize: '12px', color: colors.textMuted, margin: 0 }}>Level {Math.floor(sessionStats.totalAttempted / 5) + 1}</p>
            </div>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${(sessionStats.totalAttempted % 5) * 20}%`,
              background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentLight})`,
              borderRadius: '3px', transition: 'width 0.5s ease'
            }} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ marginLeft: '260px', padding: '32px 40px', position: 'relative', zIndex: 1 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h2 style={{
              fontSize: '32px', fontWeight: 800, margin: 0,
              background: `linear-gradient(90deg, ${colors.text}, ${colors.textMuted})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              {currentView === 'dashboard' && 'Welcome Back!'}
              {currentView === 'practice' && 'Practice Mode'}
              {currentView === 'analytics' && 'Performance Analytics'}
              {currentView === 'studyplan' && 'Your Study Plan'}
            </h2>
            <p style={{ color: colors.textMuted, marginTop: '4px' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          {sessionStats.streak >= 3 && (
            <div className="streak-badge" style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
              background: `linear-gradient(135deg, ${colors.warning}20, ${colors.accent}20)`,
              borderRadius: '50px', border: `2px solid ${colors.warning}50`
            }}>
              <Flame size={24} color={colors.warning} />
              <span style={{ fontWeight: 700, fontSize: '18px' }}>{sessionStats.streak}</span>
              <span style={{ color: colors.textMuted }}>streak!</span>
            </div>
          )}
        </header>

        {/* Dashboard */}
        {currentView === 'dashboard' && (
          <div style={{ animation: 'slideIn 0.5s ease-out' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
              {[
                { icon: Target, label: 'Questions', value: sessionStats.totalAttempted, color: colors.accent },
                { icon: CheckCircle, label: 'Accuracy', value: `${accuracy}%`, color: colors.success },
                { icon: TrendingUp, label: 'Projected', value: projectedScore, color: colors.info },
                { icon: Zap, label: 'Best Streak', value: sessionStats.maxStreak, color: colors.warning }
              ].map((stat, index) => (
                <div key={stat.label} className="stat-card card-hover" style={{
                  background: colors.cardBg, borderRadius: '20px', padding: '24px',
                  border: '1px solid rgba(255,255,255,0.05)', animationDelay: `${index * 0.1}s`
                }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px', background: `${stat.color}20`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
                  }}>
                    <stat.icon size={24} color={stat.color} />
                  </div>
                  <p style={{ color: colors.textMuted, fontSize: '14px', marginBottom: '4px' }}>{stat.label}</p>
                  <p style={{ fontSize: '32px', fontWeight: 800, margin: 0 }}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '32px' }}>
              <div className="card-hover" style={{
                background: `linear-gradient(135deg, ${colors.accent}90, ${colors.accentLight}90)`,
                borderRadius: '24px', padding: '32px', cursor: 'pointer', position: 'relative', overflow: 'hidden'
              }} onClick={() => setCurrentView('practice')}>
                <div style={{
                  position: 'absolute', right: '-40px', bottom: '-40px', width: '200px', height: '200px',
                  borderRadius: '50%', background: 'rgba(255,255,255,0.1)'
                }} />
                <BookOpen size={40} style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Start Practice</h3>
                <p style={{ opacity: 0.8, marginBottom: '20px' }}>Continue your SAT preparation with adaptive questions</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
                  Begin Session <ArrowRight size={18} />
                </div>
              </div>

              <div style={{
                background: colors.cardBg, borderRadius: '24px', padding: '32px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Choose Section</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['english', 'math'].map((section) => (
                    <button key={section}
                      onClick={() => { setActiveSection(section); setCurrentQuestion(0); }}
                      style={{
                        flex: 1, padding: '20px',
                        background: activeSection === section ? `linear-gradient(135deg, ${colors.accent}30, ${colors.info}20)` : 'rgba(255,255,255,0.03)',
                        border: activeSection === section ? `2px solid ${colors.accent}` : '2px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px', color: colors.text, cursor: 'pointer', transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '10px',
                        background: section === 'english' ? `${colors.info}30` : `${colors.success}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px'
                      }}>
                        {section === 'english' ? <BookOpen size={20} color={colors.info} /> : <Brain size={20} color={colors.success} />}
                      </div>
                      <p style={{ fontWeight: 600, textTransform: 'capitalize', margin: 0 }}>{section}</p>
                      <p style={{ fontSize: '12px', color: colors.textMuted, marginTop: '4px' }}>
                        {section === 'english' ? `${englishQuestions.length} questions` : `${mathQuestions.length} questions`}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              background: colors.cardBg, borderRadius: '24px', padding: '32px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Recent Performance</h3>
                <p style={{ color: colors.textMuted, fontSize: '14px' }}>Last 10 questions</p>
              </div>
              {performanceData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="attempt" stroke={colors.textMuted} />
                    <YAxis stroke={colors.textMuted} />
                    <Tooltip contentStyle={{ background: colors.secondary, border: 'none', borderRadius: '8px', color: colors.text }} />
                    <Line type="monotone" dataKey="cumulative" stroke={colors.accent} strokeWidth={3} dot={{ fill: colors.accent, strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textMuted }}>
                  <p>Complete some questions to see your performance chart!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Practice */}
        {currentView === 'practice' && (
          <div style={{ animation: 'slideIn 0.5s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['english', 'math'].map((section) => (
                  <button key={section}
                    onClick={() => { setActiveSection(section); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); }}
                    style={{
                      padding: '10px 24px',
                      background: activeSection === section ? colors.accent : 'rgba(255,255,255,0.05)',
                      border: 'none', borderRadius: '50px', color: colors.text,
                      fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s ease'
                    }}
                  >
                    {section}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px',
                  background: 'rgba(255,255,255,0.05)', borderRadius: '50px'
                }}>
                  <Clock size={18} color={colors.textMuted} />
                  <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 600 }}>{formatTime(timer)}</span>
                </div>
                <div style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', fontSize: '14px' }}>
                  Question <span style={{ color: colors.accent, fontWeight: 700 }}>{currentQuestion + 1}</span> of {questions.length}
                </div>
              </div>
            </div>

            <div style={{
              background: colors.cardBg, borderRadius: '24px', padding: '40px',
              border: '1px solid rgba(255,255,255,0.05)', marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <span style={{
                  padding: '6px 14px', background: `${colors.info}20`, color: colors.info,
                  borderRadius: '50px', fontSize: '12px', fontWeight: 600
                }}>
                  {questions[currentQuestion].domain}
                </span>
                <span style={{
                  padding: '6px 14px',
                  background: questions[currentQuestion].difficulty === 'Easy' ? `${colors.success}20` :
                             questions[currentQuestion].difficulty === 'Medium' ? `${colors.warning}20` : `${colors.accent}20`,
                  color: questions[currentQuestion].difficulty === 'Easy' ? colors.success :
                         questions[currentQuestion].difficulty === 'Medium' ? colors.warning : colors.accent,
                  borderRadius: '50px', fontSize: '12px', fontWeight: 600
                }}>
                  {questions[currentQuestion].difficulty}
                </span>
                <span style={{
                  padding: '6px 14px', background: 'rgba(255,255,255,0.05)',
                  borderRadius: '50px', fontSize: '12px', color: colors.textMuted
                }}>
                  {questions[currentQuestion].skill}
                </span>
              </div>

              {questions[currentQuestion].passage && (
                <div style={{
                  padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px',
                  marginBottom: '24px', borderLeft: `4px solid ${colors.accent}`, lineHeight: 1.8
                }}>
                  <p style={{ margin: 0, fontSize: '16px' }}>{questions[currentQuestion].passage}</p>
                </div>
              )}

              <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '32px', lineHeight: 1.6 }}>
                {questions[currentQuestion].question}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
                {questions[currentQuestion].options.map((option, index) => {
                  const letter = ['A', 'B', 'C', 'D'][index];
                  const isSelected = selectedAnswer === index;
                  const isCorrect = showExplanation && index === questions[currentQuestion].correctAnswer;
                  const isWrong = showExplanation && isSelected && index !== questions[currentQuestion].correctAnswer;

                  return (
                    <button key={index} className="option-btn"
                      onClick={() => !showExplanation && setSelectedAnswer(index)}
                      disabled={showExplanation}
                      style={{
                        padding: '20px 24px',
                        background: isCorrect ? `${colors.success}20` : isWrong ? `${colors.accent}20` : isSelected ? `${colors.info}20` : 'rgba(255,255,255,0.03)',
                        border: `2px solid ${isCorrect ? colors.success : isWrong ? colors.accent : isSelected ? colors.info : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '16px', color: colors.text, textAlign: 'left',
                        cursor: showExplanation ? 'default' : 'pointer', transition: 'all 0.2s ease',
                        display: 'flex', alignItems: 'center', gap: '16px'
                      }}
                    >
                      <span style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        background: isCorrect ? colors.success : isWrong ? colors.accent : isSelected ? colors.info : 'rgba(255,255,255,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: '14px', flexShrink: 0
                      }}>
                        {isCorrect ? <CheckCircle size={18} /> : isWrong ? <XCircle size={18} /> : letter}
                      </span>
                      <span style={{ fontSize: '15px', lineHeight: 1.5 }}>{option}</span>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div style={{
                  padding: '24px', background: `${colors.info}10`, borderRadius: '16px',
                  border: `1px solid ${colors.info}30`, marginBottom: '24px', animation: 'slideIn 0.3s ease-out'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Lightbulb size={20} color={colors.warning} />
                    <h4 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Explanation</h4>
                  </div>
                  <p style={{ margin: 0, lineHeight: 1.7, color: colors.textMuted }}>
                    {questions[currentQuestion].explanation}
                  </p>
                  {questions[currentQuestion].solution && (
                    <div style={{
                      marginTop: '16px', padding: '16px', background: 'rgba(0,0,0,0.2)',
                      borderRadius: '8px', fontFamily: "'Space Mono', monospace", fontSize: '14px'
                    }}>
                      {questions[currentQuestion].solution}
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', gap: '16px' }}>
                {!showExplanation ? (
                  <button className="btn-primary" onClick={checkAnswer} disabled={selectedAnswer === null}
                    style={{
                      flex: 1, padding: '18px 32px',
                      background: selectedAnswer !== null ? `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})` : 'rgba(255,255,255,0.1)',
                      border: 'none', borderRadius: '14px', color: colors.text, fontSize: '16px', fontWeight: 600,
                      cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed', transition: 'all 0.2s ease',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}
                  >
                    Check Answer <ChevronRight size={20} />
                  </button>
                ) : (
                  <button className="btn-primary" onClick={nextQuestion}
                    style={{
                      flex: 1, padding: '18px 32px',
                      background: `linear-gradient(135deg, ${colors.success}, ${colors.info})`,
                      border: 'none', borderRadius: '14px', color: colors.text, fontSize: '16px', fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.2s ease',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}
                  >
                    Next Question <ArrowRight size={20} />
                  </button>
                )}
                <button onClick={() => { setSelectedAnswer(null); setShowExplanation(false); setTimer(0); }}
                  style={{
                    padding: '18px 24px', background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px',
                    color: colors.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                  }}
                >
                  <RotateCcw size={18} /> Reset
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {[
                { label: 'Attempted', value: sessionStats.totalAttempted, icon: Target },
                { label: 'Correct', value: sessionStats.correct, icon: CheckCircle },
                { label: 'Accuracy', value: `${accuracy}%`, icon: TrendingUp },
                { label: 'Streak', value: sessionStats.streak, icon: Flame }
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: colors.cardBg, borderRadius: '16px', padding: '20px',
                  border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '16px'
                }}>
                  <stat.icon size={24} color={colors.accent} />
                  <div>
                    <p style={{ color: colors.textMuted, fontSize: '12px', marginBottom: '2px' }}>{stat.label}</p>
                    <p style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics */}
        {currentView === 'analytics' && (
          <div style={{ animation: 'slideIn 0.5s ease-out' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
              <div style={{
                background: `linear-gradient(135deg, ${colors.success}20, ${colors.info}10)`,
                borderRadius: '20px', padding: '28px', border: `1px solid ${colors.success}30`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Award size={24} color={colors.success} />
                  <span style={{ color: colors.textMuted }}>Overall Score</span>
                </div>
                <p style={{ fontSize: '48px', fontWeight: 800, margin: 0 }}>{accuracy}%</p>
                <p style={{ color: colors.textMuted, fontSize: '14px', marginTop: '8px' }}>
                  {sessionStats.correct} of {sessionStats.totalAttempted} correct
                </p>
              </div>

              <div style={{
                background: `linear-gradient(135deg, ${colors.info}20, ${colors.accent}10)`,
                borderRadius: '20px', padding: '28px', border: `1px solid ${colors.info}30`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <TrendingUp size={24} color={colors.info} />
                  <span style={{ color: colors.textMuted }}>Projected SAT</span>
                </div>
                <p style={{ fontSize: '48px', fontWeight: 800, margin: 0 }}>{projectedScore}</p>
                <p style={{ color: colors.textMuted, fontSize: '14px', marginTop: '8px' }}>Based on performance</p>
              </div>

              <div style={{
                background: `linear-gradient(135deg, ${colors.warning}20, ${colors.accent}10)`,
                borderRadius: '20px', padding: '28px', border: `1px solid ${colors.warning}30`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Flame size={24} color={colors.warning} />
                  <span style={{ color: colors.textMuted }}>Best Streak</span>
                </div>
                <p style={{ fontSize: '48px', fontWeight: 800, margin: 0 }}>{sessionStats.maxStreak}</p>
                <p style={{ color: colors.textMuted, fontSize: '14px', marginTop: '8px' }}>Consecutive correct</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '32px' }}>
              <div style={{
                background: colors.cardBg, borderRadius: '24px', padding: '28px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Performance by Domain</h3>
                {domainData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={domainData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} stroke={colors.textMuted} />
                      <YAxis type="category" dataKey="name" stroke={colors.textMuted} width={100} />
                      <Tooltip contentStyle={{ background: colors.secondary, border: 'none', borderRadius: '8px', color: colors.text }} />
                      <Bar dataKey="accuracy" fill={colors.accent} radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textMuted }}>
                    Complete questions to see domain analysis
                  </div>
                )}
              </div>

              <div style={{
                background: colors.cardBg, borderRadius: '24px', padding: '28px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Questions by Difficulty</h3>
                {difficultyPieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={difficultyPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                        {difficultyPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.name === 'Easy' ? colors.success : entry.name === 'Medium' ? colors.warning : colors.accent} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: colors.secondary, border: 'none', borderRadius: '8px', color: colors.text }} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textMuted }}>
                    Complete questions to see breakdown
                  </div>
                )}
              </div>
            </div>

            <div style={{
              background: colors.cardBg, borderRadius: '24px', padding: '28px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Detailed Breakdown</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {Object.entries(sessionStats.byDifficulty).map(([difficulty, stats]) => {
                  const acc = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                  return (
                    <div key={difficulty} style={{
                      padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{
                          padding: '4px 12px',
                          background: difficulty === 'Easy' ? `${colors.success}20` : difficulty === 'Medium' ? `${colors.warning}20` : `${colors.accent}20`,
                          color: difficulty === 'Easy' ? colors.success : difficulty === 'Medium' ? colors.warning : colors.accent,
                          borderRadius: '50px', fontSize: '12px', fontWeight: 600
                        }}>
                          {difficulty}
                        </span>
                        <span style={{ fontSize: '24px', fontWeight: 700 }}>{acc}%</span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', width: `${acc}%`,
                          background: difficulty === 'Easy' ? colors.success : difficulty === 'Medium' ? colors.warning : colors.accent,
                          borderRadius: '3px', transition: 'width 0.5s ease'
                        }} />
                      </div>
                      <p style={{ color: colors.textMuted, fontSize: '12px', marginTop: '8px' }}>
                        {stats.correct} of {stats.total} correct
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Study Plan */}
        {currentView === 'studyplan' && (
          <div style={{ animation: 'slideIn 0.5s ease-out' }}>
            <button onClick={generateStudyPlan} className="btn-primary"
              style={{
                marginBottom: '32px', padding: '16px 32px',
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.info})`,
                border: 'none', borderRadius: '14px', color: colors.text,
                fontSize: '16px', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}
            >
              <RefreshCw size={20} /> Generate Study Plan
            </button>

            {studyPlan ? (
              <>
                <div style={{
                  background: `linear-gradient(135deg, ${colors.accent}30, ${colors.info}20)`,
                  borderRadius: '24px', padding: '32px', marginBottom: '32px',
                  border: `1px solid ${colors.accent}40`, display: 'flex', alignItems: 'center', gap: '24px'
                }}>
                  <div style={{
                    width: '80px', height: '80px', borderRadius: '20px',
                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <Sparkles size={40} color="white" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
                      Focus on: {studyPlan.recommendedPractice}
                    </h3>
                    <p style={{ color: colors.textMuted, marginBottom: '16px' }}>
                      Based on your performance analysis, this is your priority area.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.success }}>
                      <TrendingUp size={20} />
                      <span>Estimated improvement: {studyPlan.estimatedImprovement} points</span>
                    </div>
                  </div>
                </div>

                {studyPlan.weakAreas.length > 0 && (
                  <div style={{
                    background: colors.cardBg, borderRadius: '24px', padding: '32px',
                    border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                      <AlertTriangle size={24} color={colors.warning} />
                      <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Areas Needing Improvement</h3>
                    </div>
                    <div style={{ display: 'grid', gap: '16px' }}>
                      {studyPlan.weakAreas.map((area, index) => (
                        <div key={index} style={{
                          padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px',
                          border: `1px solid ${area.priority === 'high' ? colors.accent : colors.warning}30`,
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                        }}>
                          <div>
                            <p style={{ fontWeight: 600, marginBottom: '4px' }}>{area.domain}</p>
                            <span style={{
                              padding: '4px 10px',
                              background: area.priority === 'high' ? `${colors.accent}20` : `${colors.warning}20`,
                              color: area.priority === 'high' ? colors.accent : colors.warning,
                              borderRadius: '50px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase'
                            }}>
                              {area.priority} priority
                            </span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{Math.round(area.accuracy)}%</p>
                            <p style={{ color: colors.textMuted, fontSize: '12px' }}>accuracy</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{
                  background: colors.cardBg, borderRadius: '24px', padding: '32px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Study Tips</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {[
                      { icon: Clock, title: 'Time Management', tip: 'Aim for 1-2 minutes per question. Practice with timed sessions.' },
                      { icon: Brain, title: 'Active Recall', tip: 'Review explanations carefully. Understanding why builds retention.' },
                      { icon: Target, title: 'Focus Practice', tip: 'Concentrate on weak areas before moving to stronger domains.' },
                      { icon: Star, title: 'Consistency', tip: 'Practice 30-60 minutes daily. Consistency beats cramming.' }
                    ].map((item, index) => (
                      <div key={index} style={{
                        padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.05)'
                      }}>
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '10px', background: `${CHART_COLORS[index]}20`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px'
                        }}>
                          <item.icon size={20} color={CHART_COLORS[index]} />
                        </div>
                        <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>{item.title}</h4>
                        <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{item.tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div style={{
                background: colors.cardBg, borderRadius: '24px', padding: '60px',
                border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center'
              }}>
                <div style={{
                  width: '80px', height: '80px', borderRadius: '20px', background: `${colors.info}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px'
                }}>
                  <Target size={40} color={colors.info} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>Generate Your Study Plan</h3>
                <p style={{ color: colors.textMuted, maxWidth: '400px', margin: '0 auto' }}>
                  Complete at least 5 questions to get personalized recommendations based on your performance.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
