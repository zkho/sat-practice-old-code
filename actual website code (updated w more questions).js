import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  BookOpen,
  Brain,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  ChevronRight,
  BarChart3,
  Home,
  User,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  RotateCcw,
  GraduationCap,
  Flame,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

// english question bank (55ish questions)

const allEnglishQuestions = [
  // boundariessssss (8)
  {
    id: "eng-bound-01",
    domain: "Standard English Conventions",
    skill: "Boundaries",
    difficulty: "Medium",
    passage:
      "The Mission 66 initiative, which was approved by Congress in 1956, represented a major investment in the infrastructure of overburdened national ______ it prioritized physical improvements to the parks' roads, utilities, employee housing, and visitor facilities while also establishing educational programming for the public.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["parks and", "parks", "parks;", "parks,"],
    correctAnswer: 2,
    explanation: "A semicolon correctly joins two independent clauses.",
  },
  {
    id: "eng-bound-02",
    domain: "Standard English Conventions",
    skill: "Boundaries",
    difficulty: "Medium",
    passage:
      "In a 2023 study, researchers documented a fascinating behavior in the aquatic plant Elodea densa. When exposed to low levels of light, the plant's ______ the cellular organs that generate energy from light—reshuffled to form a tightly packed, glass-like surface ideal for collecting more light.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "chloroplasts",
      "chloroplasts;",
      "chloroplasts,",
      "chloroplasts—",
    ],
    correctAnswer: 3,
    explanation:
      "A dash pairs with the closing dash to set off the supplementary definition.",
  },
  {
    id: "eng-bound-03",
    domain: "Standard English Conventions",
    skill: "Boundaries",
    difficulty: "Hard",
    passage:
      "Entomologist Heather Grab conducted research on bee populations in New York apple orchards over a ten-year period. ______ found that when wild growth near an orchard was cleared, the number of different bee species visiting the orchard decreased significantly.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["Grab:", "Grab,", "Grab", "Grab—"],
    correctAnswer: 2,
    explanation:
      "No punctuation is needed between the subject 'Grab' and the verb 'found.'",
  },
  {
    id: "eng-bound-04",
    domain: "Standard English Conventions",
    skill: "Boundaries",
    difficulty: "Hard",
    passage:
      "The architectural firm's newest ______ a towering glass structure that seems to defy gravity—has won numerous international design awards since its completion last year.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["project:", "project,", "project—", "project"],
    correctAnswer: 2,
    explanation:
      "A dash is needed to pair with the closing dash to set off the descriptive phrase.",
  },
  {
    id: "eng-bound-05",
    domain: "Standard English Conventions",
    skill: "Boundaries",
    difficulty: "Medium",
    passage:
      "Marine biologists have long been fascinated by the migratory patterns of sea ______ these animals travel thousands of miles each year, navigating with remarkable precision to return to their birthplace.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["turtles", "turtles,", "turtles;", "turtles:"],
    correctAnswer: 2,
    explanation: "A semicolon correctly joins two independent clauses.",
  },
  {
    id: "eng-bound-06",
    domain: "Standard English Conventions",
    skill: "Boundaries",
    difficulty: "Hard",
    passage:
      "The committee reviewed three proposals for the new community ______ the first focused on environmental sustainability, the second emphasized cost efficiency, and the third prioritized accessibility for residents with disabilities.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["center,", "center:", "center;", "center"],
    correctAnswer: 1,
    explanation:
      "A colon introduces a list or explanation that elaborates on what came before.",
  },
  {
    id: "eng-bound-07",
    domain: "Standard English Conventions",
    skill: "Boundaries",
    difficulty: "Medium",
    passage:
      "The museum's collection includes works by several renowned ______ Pablo Picasso, Georgia O'Keeffe, and Frida Kahlo are among the most frequently displayed.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["artists:", "artists;", "artists,", "artists"],
    correctAnswer: 0,
    explanation:
      "A colon introduces the list of specific artists that follows.",
  },
  {
    id: "eng-bound-08",
    domain: "Standard English Conventions",
    skill: "Boundaries",
    difficulty: "Hard",
    passage:
      "The symphony's final ______ a triumphant crescendo that brought the audience to its feet—lasted nearly ten minutes and featured every instrument in the orchestra.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["movement:", "movement", "movement,", "movement—"],
    correctAnswer: 3,
    explanation:
      "A dash pairs with the closing dash to set off the descriptive parenthetical phrase.",
  },

  // form structure sense (12)
  {
    id: "eng-form-01",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Hard",
    passage:
      "Despite being cheap, versatile, and easy to produce, ______ they are made from nonrenewable petroleum, and most do not biodegrade in landfills.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "there are two problems associated with commercial plastics:",
      "two problems are associated with commercial plastics:",
      "commercial plastics' two associated problems are that",
      "commercial plastics have two associated problems:",
    ],
    correctAnswer: 3,
    explanation:
      "The modifying phrase must be followed by 'commercial plastics'—the noun it modifies.",
  },
  {
    id: "eng-form-02",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Medium",
    passage:
      "On April 5, 1977, Kitty Cone and 150 other disability rights activists entered a San Francisco federal building. After pleading for years—to no effect—for the passage of key antidiscrimination legislation, ______ until their demands were addressed.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "pressure on lawmakers increased when the activists staged a sit-in protest",
      "a sit-in protest staged by the activists increased pressure on lawmakers",
      "lawmakers came under increased pressure when the activists staged a sit-in protest",
      "the activists increased pressure on lawmakers by staging a sit-in protest",
    ],
    correctAnswer: 3,
    explanation:
      "The modifying phrase 'After pleading for years...' must be followed by 'the activists.'",
  },
  {
    id: "eng-form-03",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Medium",
    passage:
      'French philosopher René Descartes doubted whether he could prove his own existence. Eventually, he found proof in his famous phrase "I think, therefore I am." The ______ complexity: only those who exist would be able to ponder their existence.',
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "phrases' simplicity masks its",
      "phrases simplicity masks their",
      "phrase's simplicity masks their",
      "phrase's simplicity masks its",
    ],
    correctAnswer: 3,
    explanation:
      "The singular possessive 'phrase's' and 'its' agree with the singular antecedent.",
  },
  {
    id: "eng-form-04",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Hard",
    passage:
      "Known for its high-resolution images of distant galaxies, ______ has captured photographs that have fundamentally changed our understanding of the universe's age and expansion.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "the Hubble Space Telescope",
      "it was the Hubble Space Telescope that",
      "astronomers using the Hubble Space Telescope",
      "the images from the Hubble Space Telescope",
    ],
    correctAnswer: 0,
    explanation:
      "The opening phrase modifies the telescope itself, not astronomers or images.",
  },
  {
    id: "eng-form-05",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Medium",
    passage:
      "The symphony orchestra ______ its season finale next Saturday, featuring works by Beethoven and Brahms.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["perform", "performs", "are performing", "have performed"],
    correctAnswer: 1,
    explanation:
      "The collective noun 'orchestra' is treated as singular, requiring 'performs.'",
  },
  {
    id: "eng-form-06",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Hard",
    passage:
      "Neither the director nor the actors ______ willing to compromise on the artistic vision for the film, despite pressure from the studio executives.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["was", "is", "were", "has been"],
    correctAnswer: 2,
    explanation:
      "With 'neither...nor,' the verb agrees with the nearer subject 'actors' (plural).",
  },
  {
    id: "eng-form-07",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Medium",
    passage:
      "The data collected from the experiment ______ that the hypothesis was incorrect, leading the researchers to reconsider their initial assumptions.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["suggests", "suggest", "are suggesting", "have suggested"],
    correctAnswer: 0,
    explanation:
      "In formal American English, 'data' as a body of information takes a singular verb.",
  },
  {
    id: "eng-form-08",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Hard",
    passage:
      "Having been restored to its original grandeur after decades of neglect, ______ now attracts thousands of visitors each year who come to admire its ornate architecture.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "tourists flock to the historic mansion, which",
      "the historic mansion",
      "it is the historic mansion that",
      "the restoration of the historic mansion means it",
    ],
    correctAnswer: 1,
    explanation:
      "The participial phrase must be followed by 'the historic mansion'—the thing restored.",
  },
  {
    id: "eng-form-09",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Medium",
    passage:
      "By the time the rescue team arrived, the stranded hikers ______ for shelter in a small cave for nearly six hours.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["waited", "have waited", "had been waiting", "were waiting"],
    correctAnswer: 2,
    explanation:
      "Past perfect progressive indicates an action that started before and continued up to another past event.",
  },
  {
    id: "eng-form-10",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Hard",
    passage:
      "The professor insisted that each student ______ their research proposal before the end of the semester.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["submits", "submit", "submitted", "would submit"],
    correctAnswer: 1,
    explanation:
      "After verbs of demand or insistence, use the subjunctive mood: base form 'submit.'",
  },
  {
    id: "eng-form-11",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Medium",
    passage:
      "The committee, along with several outside consultants, ______ reviewing the proposal for the new community center.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: ["are", "is", "were", "have been"],
    correctAnswer: 1,
    explanation:
      "The subject is 'committee' (singular). The phrase 'along with...' doesn't change the subject's number.",
  },
  {
    id: "eng-form-12",
    domain: "Standard English Conventions",
    skill: "Form, Structure, and Sense",
    difficulty: "Hard",
    passage:
      "Celebrated for her innovative use of color and light, ______ continues to influence contemporary artists working in various media.",
    question:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "the paintings of Hilma af Klint",
      "Hilma af Klint's artistic legacy",
      "Hilma af Klint",
      "it was Hilma af Klint who",
    ],
    correctAnswer: 2,
    explanation:
      "The phrase 'Celebrated for her innovative use' must modify a person—'Hilma af Klint.'",
  },

  // transition words (10)
  {
    id: "eng-trans-01",
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Medium",
    passage:
      "The Hubble Space Telescope has revolutionized our understanding of the universe since its launch in 1990. ______, its replacement, the James Webb Space Telescope, promises even greater discoveries with its advanced infrared capabilities.",
    question:
      "Which choice completes the text with the most logical transition?",
    options: ["However", "Furthermore", "Nevertheless", "Consequently"],
    correctAnswer: 1,
    explanation:
      "'Furthermore' adds information that builds on the previous statement.",
  },
  {
    id: "eng-trans-02",
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Hard",
    passage:
      "Many historians argue that the printing press was the most significant invention of the Renaissance. ______, others contend that the compass had a more profound impact by enabling global exploration and trade.",
    question:
      "Which choice completes the text with the most logical transition?",
    options: ["Similarly", "In addition", "By contrast", "As a result"],
    correctAnswer: 2,
    explanation:
      "'By contrast' signals that the second group holds an opposing view.",
  },
  {
    id: "eng-trans-03",
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Medium",
    passage:
      "The city council voted to increase funding for public transportation. ______, they approved a measure to reduce parking availability in the downtown area.",
    question:
      "Which choice completes the text with the most logical transition?",
    options: ["However", "Additionally", "Instead", "Nevertheless"],
    correctAnswer: 1,
    explanation:
      "'Additionally' shows that the second action complements the first.",
  },
  {
    id: "eng-trans-04",
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Hard",
    passage:
      "Early astronomers believed that the Earth was the center of the universe. ______, Copernicus proposed a heliocentric model that placed the Sun at the center, fundamentally challenging centuries of accepted wisdom.",
    question:
      "Which choice completes the text with the most logical transition?",
    options: ["Similarly", "Therefore", "In contrast", "For example"],
    correctAnswer: 2,
    explanation:
      "'In contrast' signals the shift from geocentric to heliocentric models.",
  },
  {
    id: "eng-trans-05",
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Medium",
    passage:
      "The experiment's initial results seemed promising. ______, after closer analysis, researchers discovered several flaws in the methodology.",
    question:
      "Which choice completes the text with the most logical transition?",
    options: ["Moreover", "However", "Therefore", "Similarly"],
    correctAnswer: 1,
    explanation:
      "'However' introduces a contrast between initial promise and subsequent problems.",
  },
  {
    id: "eng-trans-06",
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Hard",
    passage:
      "The new policy was designed to reduce carbon emissions by 30% over five years. ______, environmentalists argue that these targets are insufficient to address the urgency of climate change.",
    question:
      "Which choice completes the text with the most logical transition?",
    options: ["Consequently", "Furthermore", "Nevertheless", "Specifically"],
    correctAnswer: 2,
    explanation:
      "'Nevertheless' introduces criticism despite the policy's positive intentions.",
  },
  {
    id: "eng-trans-07",
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Medium",
    passage:
      "The archaeological dig uncovered pottery fragments dating back over 3,000 years. ______, the team found evidence of an advanced irrigation system.",
    question:
      "Which choice completes the text with the most logical transition?",
    options: ["Instead", "In other words", "In addition", "On the contrary"],
    correctAnswer: 2,
    explanation:
      "'In addition' introduces another significant discovery alongside the first.",
  },
  {
    id: "eng-trans-08",
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Hard",
    passage:
      "The pharmaceutical company invested billions in developing the new treatment. ______, clinical trials revealed serious side effects that forced the company to abandon the project.",
    question:
      "Which choice completes the text with the most logical transition?",
    options: ["As a result", "Unfortunately", "In addition", "For instance"],
    correctAnswer: 1,
    explanation:
      "'Unfortunately' signals the disappointing outcome following the investment.",
  },
  {
    id: "eng-trans-09",
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Medium",
    passage:
      "Solar panels have become increasingly affordable over the past decade. ______, many homeowners are now considering installing them as a way to reduce energy costs.",
    question:
      "Which choice completes the text with the most logical transition?",
    options: ["However", "As a result", "In contrast", "Meanwhile"],
    correctAnswer: 1,
    explanation:
      "'As a result' shows the cause-effect relationship between affordability and adoption.",
  },
  {
    id: "eng-trans-10",
    domain: "Expression of Ideas",
    skill: "Transitions",
    difficulty: "Hard",
    passage:
      "The ancient library of Alexandria was renowned for its vast collection of scrolls. ______, some historians estimate it contained over 400,000 manuscripts at its peak.",
    question:
      "Which choice completes the text with the most logical transition?",
    options: ["However", "Indeed", "Nevertheless", "By contrast"],
    correctAnswer: 1,
    explanation:
      "'Indeed' emphasizes and supports the claim about the library's vastness.",
  },

  // rhetorics (7)
  {
    id: "eng-rhet-01",
    domain: "Expression of Ideas",
    skill: "Rhetorical Synthesis",
    difficulty: "Hard",
    passage:
      "A student is writing an essay about the decline of bee populations. The student wants to emphasize the economic impact of this decline on agriculture.",
    question:
      "Which choice most effectively uses data to emphasize the economic impact?",
    options: [
      "Bees are fascinating creatures that have existed for millions of years.",
      "The U.S. Department of Agriculture estimates that bee pollination contributes over $15 billion annually to crop production.",
      "Many flowers depend on bees for pollination.",
      "Scientists are working to understand why bee populations are declining.",
    ],
    correctAnswer: 1,
    explanation:
      "The specific dollar figure ($15 billion) directly quantifies the economic impact.",
  },
  {
    id: "eng-rhet-02",
    domain: "Expression of Ideas",
    skill: "Rhetorical Synthesis",
    difficulty: "Medium",
    passage:
      "A researcher is writing a report about urban green spaces. The researcher wants to highlight the mental health benefits for city residents.",
    question:
      "Which choice most effectively emphasizes mental health benefits?",
    options: [
      "Urban parks provide habitat for various bird species.",
      "Studies show that spending just 20 minutes in green spaces can significantly reduce cortisol levels and symptoms of anxiety.",
      "Many cities are investing in new park developments.",
      "Green spaces can help reduce urban heat island effects.",
    ],
    correctAnswer: 1,
    explanation:
      "This directly addresses mental health by citing specific benefits (reduced cortisol, reduced anxiety).",
  },
  {
    id: "eng-rhet-03",
    domain: "Expression of Ideas",
    skill: "Rhetorical Synthesis",
    difficulty: "Hard",
    passage:
      "A journalist is writing about renewable energy adoption. The journalist wants to emphasize the rapid growth of solar energy installation.",
    question: "Which choice most effectively conveys rapid growth?",
    options: [
      "Solar panels convert sunlight into electricity through photovoltaic cells.",
      "Solar energy capacity has increased by 400% over the past decade, making it the fastest-growing energy source worldwide.",
      "Many homeowners are interested in installing solar panels.",
      "Solar energy is one of several renewable energy options available today.",
    ],
    correctAnswer: 1,
    explanation:
      "The 400% increase and 'fastest-growing' superlative emphasize rapid growth.",
  },
  {
    id: "eng-rhet-04",
    domain: "Expression of Ideas",
    skill: "Rhetorical Synthesis",
    difficulty: "Medium",
    passage:
      "A student is writing about Roman engineering. The student wants to emphasize the durability of Roman construction techniques.",
    question: "Which choice most effectively emphasizes durability?",
    options: [
      "The Romans built many roads throughout their empire.",
      "Roman concrete structures, such as the Pantheon's dome, have remained intact for nearly 2,000 years.",
      "Roman engineers were highly trained professionals.",
      "The Roman Empire had significant resources for construction projects.",
    ],
    correctAnswer: 1,
    explanation:
      "The specific example (Pantheon) with timeframe (2,000 years) demonstrates durability.",
  },
  {
    id: "eng-rhet-05",
    domain: "Expression of Ideas",
    skill: "Rhetorical Synthesis",
    difficulty: "Hard",
    passage:
      "An economist is analyzing income inequality. The economist wants to illustrate the concentration of wealth among the highest earners.",
    question: "Which choice most effectively illustrates wealth concentration?",
    options: [
      "Income inequality has been a topic of debate among policymakers.",
      "The top 1% of earners now control more wealth than the entire bottom 50% combined.",
      "Various economic theories attempt to explain income distribution.",
      "Some countries have higher levels of income inequality than others.",
    ],
    correctAnswer: 1,
    explanation:
      "The comparison (top 1% vs. bottom 50%) dramatically illustrates wealth concentration.",
  },
  {
    id: "eng-rhet-06",
    domain: "Expression of Ideas",
    skill: "Rhetorical Synthesis",
    difficulty: "Medium",
    passage:
      "A marine biologist is writing about coral reef decline. The biologist wants to convey the urgency of the situation.",
    question: "Which choice most effectively conveys urgency?",
    options: [
      "Coral reefs are home to many species of fish.",
      "Scientists predict that without immediate action, 90% of the world's coral reefs could disappear by 2050.",
      "Coral reefs are found in tropical waters around the world.",
      "Many organizations are studying coral reef ecosystems.",
    ],
    correctAnswer: 1,
    explanation:
      "The specific prediction (90% by 2050) and 'immediate action' convey urgency.",
  },
  {
    id: "eng-rhet-07",
    domain: "Expression of Ideas",
    skill: "Rhetorical Synthesis",
    difficulty: "Hard",
    passage:
      "A public health official is writing about vaccination rates. The official wants to emphasize the effectiveness of vaccines in preventing disease.",
    question: "Which choice most effectively emphasizes vaccine effectiveness?",
    options: [
      "Vaccines have been available for many decades.",
      "Since the introduction of the measles vaccine, cases have declined by over 99%, preventing an estimated 21 million deaths worldwide.",
      "Many parents have questions about vaccines.",
      "Vaccine development is a complex scientific process.",
    ],
    correctAnswer: 1,
    explanation:
      "The specific statistics (99% decline, 21 million deaths prevented) demonstrate effectiveness.",
  },

  // "central ideas" (idek what this actually means but thats what collegeboard calls them) (6)
  {
    id: "eng-central-01",
    domain: "Information and Ideas",
    skill: "Central Ideas and Purpose",
    difficulty: "Medium",
    passage:
      "Archaeological evidence suggests that ancient Polynesians were master navigators who traversed thousands of miles of open ocean using only the stars, wave patterns, and bird behavior as guides. Their double-hulled canoes, capable of carrying dozens of people along with supplies and livestock, enabled them to colonize islands scattered across a vast expanse of the Pacific Ocean.",
    question: "Which choice best states the main idea of the text?",
    options: [
      "Ancient Polynesians built canoes that could carry many passengers.",
      "Polynesians used birds to help them navigate.",
      "Ancient Polynesians were skilled navigators who used sophisticated techniques and vessels to explore the Pacific.",
      "The Pacific Ocean contains many scattered islands.",
    ],
    correctAnswer: 2,
    explanation:
      "This encompasses both the navigation techniques and the vessels that enabled Pacific exploration.",
  },
  {
    id: "eng-central-02",
    domain: "Information and Ideas",
    skill: "Central Ideas and Purpose",
    difficulty: "Hard",
    passage:
      "The octopus possesses a remarkably decentralized nervous system, with two-thirds of its neurons located in its arms rather than its brain. Each arm can independently taste, touch, and even make basic decisions without input from the central brain. This distributed intelligence allows the octopus to multitask in ways that would be impossible for creatures with more centralized nervous systems.",
    question: "Which choice best states the main idea of the text?",
    options: [
      "Octopuses have neurons in their arms.",
      "The octopus's decentralized nervous system gives each arm autonomous capabilities, enabling unique multitasking abilities.",
      "Octopuses are more intelligent than other sea creatures.",
      "Scientists are studying octopus nervous systems.",
    ],
    correctAnswer: 1,
    explanation:
      "This captures the key point: decentralized nervous system enables arm autonomy and multitasking.",
  },
  {
    id: "eng-central-03",
    domain: "Information and Ideas",
    skill: "Central Ideas and Purpose",
    difficulty: "Medium",
    passage:
      "Cities around the world have experimented with converting abandoned railway lines into elevated public parks. New York's High Line, which opened in 2009, transformed a defunct freight rail line into a 1.45-mile greenway that now attracts over 8 million visitors annually. The project has inspired similar initiatives in cities from Chicago to Singapore.",
    question: "Which choice best states the main idea of the text?",
    options: [
      "New York's High Line is 1.45 miles long.",
      "The High Line's successful transformation of abandoned railway into public space has inspired similar urban renewal projects worldwide.",
      "Many cities have abandoned railway lines.",
      "Urban parks are popular tourist attractions.",
    ],
    correctAnswer: 1,
    explanation:
      "The main idea connects the High Line's success and its influence on other cities.",
  },
  {
    id: "eng-central-04",
    domain: "Information and Ideas",
    skill: "Central Ideas and Purpose",
    difficulty: "Hard",
    passage:
      "Mycelium, the root-like network of fungal threads that permeates forest soil, serves as a biological internet connecting trees across vast distances. Through this network, trees can share nutrients with struggling neighbors, send chemical warning signals about insect attacks, and even recognize their own offspring. This discovery has challenged the traditional view of forests as collections of competing individuals.",
    question: "Which choice best states the main idea of the text?",
    options: [
      "Mycelium is made of fungal threads.",
      "Trees can recognize their offspring.",
      "Mycelium networks enable trees to communicate and cooperate, challenging views of forests as purely competitive ecosystems.",
      "Forests contain many different types of trees.",
    ],
    correctAnswer: 2,
    explanation:
      "The main idea is that mycelium enables cooperation, contradicting the competitive model.",
  },
  {
    id: "eng-central-05",
    domain: "Information and Ideas",
    skill: "Central Ideas and Purpose",
    difficulty: "Medium",
    passage:
      "The development of antibiotics in the twentieth century was hailed as one of medicine's greatest achievements, saving countless lives from bacterial infections. However, the overuse and misuse of these drugs has led to the emergence of antibiotic-resistant bacteria, creating what health officials call a 'post-antibiotic era' in which common infections could once again become deadly.",
    question: "Which choice best states the main idea of the text?",
    options: [
      "Antibiotics were developed in the twentieth century.",
      "While antibiotics have saved many lives, their overuse has created dangerous resistant bacteria that threaten to undo this medical progress.",
      "Bacterial infections were once very deadly.",
      "Health officials are concerned about medical issues.",
    ],
    correctAnswer: 1,
    explanation:
      "The main idea balances the benefit of antibiotics with the threat of resistance from overuse.",
  },
  {
    id: "eng-central-06",
    domain: "Information and Ideas",
    skill: "Central Ideas and Purpose",
    difficulty: "Hard",
    passage:
      "For decades, neuroscientists believed that adult brains could not generate new neurons—a process called neurogenesis. Recent research has overturned this dogma, revealing that new neurons continue to form in certain brain regions throughout life, particularly in the hippocampus, which is crucial for memory and learning. This discovery has opened new avenues for treating neurodegenerative diseases.",
    question: "Which choice best states the main idea of the text?",
    options: [
      "The hippocampus is important for memory.",
      "Neuroscientists have changed their beliefs over time.",
      "The discovery that adult brains can generate new neurons has overturned previous beliefs and created possibilities for treating brain diseases.",
      "Neurogenesis is a complex biological process.",
    ],
    correctAnswer: 2,
    explanation:
      "The main idea is the paradigm shift regarding neurogenesis and its medical implications.",
  },

  // taking infernece (6)
  {
    id: "eng-infer-01",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficulty: "Hard",
    passage:
      "In a recent study, researchers found that plants release more volatile organic compounds when neighboring plants are being eaten by herbivores. Other plants in the area then increase their production of defensive chemicals, even before they themselves are attacked.",
    question:
      "Based on the text, what can most reasonably be inferred about plant communication?",
    options: [
      "Plants can only communicate through their root systems.",
      "Plants may use chemical signals to warn neighboring plants of danger.",
      "Herbivores prefer plants that don't produce defensive chemicals.",
      "All plants produce the same volatile organic compounds.",
    ],
    correctAnswer: 1,
    explanation:
      "Plants responding to airborne chemicals from attacked neighbors implies chemical warning signals.",
  },
  {
    id: "eng-infer-02",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficulty: "Medium",
    passage:
      "A study of professional musicians found that those who began training before age seven had significantly stronger connections between the left and right hemispheres of their brains compared to those who started later. The researchers noted that this period coincides with a critical window of neural development in childhood.",
    question: "Based on the text, what can most reasonably be inferred?",
    options: [
      "All professional musicians started training before age seven.",
      "Early musical training may have lasting effects on brain structure due to developmental timing.",
      "The right hemisphere is more important for music.",
      "Adults cannot learn to play musical instruments.",
    ],
    correctAnswer: 1,
    explanation:
      "The connection between early training, neural connections, and 'critical window' suggests timing affects brain development.",
  },
  {
    id: "eng-infer-03",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficulty: "Hard",
    passage:
      "Archaeologists studying ancient Mayan cities have found that many urban centers were abandoned around 900 CE, shortly after a prolonged period of severe drought revealed by sediment analysis. Interestingly, smaller rural settlements in the same region continued to thrive during this period.",
    question:
      "Based on the text, what can most reasonably be inferred about the Mayan urban decline?",
    options: [
      "The Maya had no knowledge of agriculture.",
      "Large urban populations may have been more vulnerable to drought conditions than smaller rural communities.",
      "All Mayan cities were abandoned at exactly the same time.",
      "The drought was caused by deforestation.",
    ],
    correctAnswer: 1,
    explanation:
      "The contrast between abandoned cities and thriving rural areas suggests urban vulnerability to drought.",
  },
  {
    id: "eng-infer-04",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficulty: "Medium",
    passage:
      "Emperor penguins can dive to depths exceeding 500 meters and hold their breath for over 20 minutes. Their muscles contain unusually high concentrations of myoglobin, a protein that stores oxygen. Additionally, their heart rate can slow to as few as 15 beats per minute during deep dives.",
    question: "Based on the text, what can most reasonably be inferred?",
    options: [
      "Emperor penguins are the only birds that can dive.",
      "The penguins' physiological adaptations enable their remarkable diving abilities.",
      "Myoglobin is found only in penguins.",
      "Penguins prefer to hunt at exactly 500 meters.",
    ],
    correctAnswer: 1,
    explanation:
      "The diving abilities are linked to specific adaptations (myoglobin, heart rate), implying these enable diving.",
  },
  {
    id: "eng-infer-05",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficulty: "Hard",
    passage:
      "A longitudinal study tracked two groups of students over ten years. One group attended schools with extensive arts programs, while the other attended schools with minimal arts education. The first group showed higher rates of college graduation, civic engagement, and career satisfaction, even when controlling for socioeconomic factors.",
    question: "Based on the text, what can most reasonably be inferred?",
    options: [
      "Arts education directly causes higher college graduation rates.",
      "Students who like art are naturally more successful.",
      "Arts education may be associated with positive long-term outcomes beyond artistic skills.",
      "Schools should eliminate all non-arts subjects.",
    ],
    correctAnswer: 2,
    explanation:
      "The correlation suggests arts education may contribute to broader success, though causation isn't proven.",
  },
  {
    id: "eng-infer-06",
    domain: "Information and Ideas",
    skill: "Inferences",
    difficulty: "Medium",
    passage:
      "When honeybees discover a new food source, they return to the hive and perform a 'waggle dance' that indicates the direction and distance of the food. Bees that watch this dance can then fly directly to the food source without ever having visited it before.",
    question: "Based on the text, what can most reasonably be inferred?",
    options: [
      "Honeybees have poor eyesight.",
      "The waggle dance communicates specific spatial information that other bees can interpret.",
      "All insects use dance to communicate.",
      "Honeybees only eat one type of food.",
    ],
    correctAnswer: 1,
    explanation:
      "The ability to fly directly to an unvisited location after watching the dance implies specific information transfer.",
  },

  // w-o-c questions (6)
  {
    id: "eng-vocab-01",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficulty: "Medium",
    passage:
      "The author's mordant wit was evident throughout the essay, as she skewered the pretensions of the social elite with razor-sharp observations that left readers both amused and uncomfortable.",
    question: "As used in the text, 'mordant' most nearly means",
    options: ["gentle", "biting", "elaborate", "inconsistent"],
    correctAnswer: 1,
    explanation:
      "Context clues like 'skewered,' 'razor-sharp,' and 'uncomfortable' indicate biting, sharp humor.",
  },
  {
    id: "eng-vocab-02",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficulty: "Hard",
    passage:
      "The diplomat's equivocal response frustrated journalists, who had hoped for a clear statement on the administration's position regarding the proposed trade agreement.",
    question: "As used in the text, 'equivocal' most nearly means",
    options: ["hostile", "enthusiastic", "ambiguous", "lengthy"],
    correctAnswer: 2,
    explanation:
      "The contrast with 'clear statement' and journalists' frustration indicates the response was ambiguous.",
  },
  {
    id: "eng-vocab-03",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficulty: "Medium",
    passage:
      "The novel's protagonist undergoes a profound metamorphosis over the course of the narrative, transforming from a timid clerk into a confident leader who challenges the corrupt establishment.",
    question: "As used in the text, 'metamorphosis' most nearly means",
    options: ["journey", "transformation", "awakening", "rebellion"],
    correctAnswer: 1,
    explanation:
      "The word 'transforming' and the change from 'timid' to 'confident' indicate a transformation.",
  },
  {
    id: "eng-vocab-04",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficulty: "Hard",
    passage:
      "Critics praised the architect's audacious design, noting that the building's unconventional angles and floating staircases challenged established norms while creating functional living spaces.",
    question: "As used in the text, 'audacious' most nearly means",
    options: ["expensive", "traditional", "boldly innovative", "controversial"],
    correctAnswer: 2,
    explanation:
      "'Unconventional' and 'challenged established norms' indicate boldly innovative design.",
  },
  {
    id: "eng-vocab-05",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficulty: "Medium",
    passage:
      "The researcher's meticulous documentation of every experimental procedure ensured that other scientists could replicate her findings with precision.",
    question: "As used in the text, 'meticulous' most nearly means",
    options: ["rapid", "extremely careful", "creative", "controversial"],
    correctAnswer: 1,
    explanation:
      "The connection to 'precision' and ability to 'replicate' indicates extremely careful documentation.",
  },
  {
    id: "eng-vocab-06",
    domain: "Craft and Structure",
    skill: "Words in Context",
    difficulty: "Hard",
    passage:
      "The CEO's recalcitrant attitude toward environmental regulations put the company at odds with both government agencies and increasingly eco-conscious consumers.",
    question: "As used in the text, 'recalcitrant' most nearly means",
    options: ["enthusiastic", "stubbornly resistant", "confused", "diplomatic"],
    correctAnswer: 1,
    explanation:
      "Being 'at odds with' regulators over environmental issues indicates stubborn resistance.",
  },
];

// math question bank (mostly hard, some medium)
const allMathQuestions = [
  // linear equatiosn (10)
  {
    id: "math-lin-01",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "Medium",
    passage:
      "A line passes through the points (2, 5) and (6, 13) in the xy-plane.",
    question: "What is the y-intercept of this line?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 0,
    explanation:
      "Slope m = (13-5)/(6-2) = 2. Using y = mx + b: 5 = 2(2) + b → b = 1.",
    solution: "m = 2, b = 1",
  },
  {
    id: "math-lin-02",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "Hard",
    passage:
      "Line p has equation 3x - 4y = 12. Line q is perpendicular to line p and passes through (6, 2).",
    question: "What is the equation of line q?",
    options: [
      "y = (4/3)x - 6",
      "y = (-4/3)x + 10",
      "y = (3/4)x - 2.5",
      "y = (-3/4)x + 6.5",
    ],
    correctAnswer: 1,
    explanation:
      "Line p slope = 3/4. Perpendicular slope = -4/3. Through (6,2): y = (-4/3)x + 10.",
    solution: "Perpendicular slope = -4/3",
  },
  {
    id: "math-lin-03",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "Medium",
    passage: "For a linear function f, f(2) = 7 and f(5) = 16.",
    question: "What is the value of f(8)?",
    options: ["22", "25", "28", "31"],
    correctAnswer: 1,
    explanation: "Slope m = (16-7)/(5-2) = 3. f(x) = 3x + 1. f(8) = 25.",
    solution: "m = 3, b = 1, f(8) = 25",
  },
  {
    id: "math-lin-04",
    domain: "Algebra",
    skill: "Systems of linear equations",
    difficulty: "Hard",
    passage: "2x + 3y = 13\n4x - y = 5",
    question: "What is the value of x + y?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2,
    explanation:
      "From equation 2: y = 4x - 5. Substitute: x = 2, y = 3. x + y = 5.",
    solution: "x = 2, y = 3",
  },
  {
    id: "math-lin-05",
    domain: "Algebra",
    skill: "Systems of linear equations",
    difficulty: "Medium",
    passage: "3x + 2y = 19\nx + 2y = 13",
    question: "What is the value of x?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    explanation: "Subtract: 2x = 6 → x = 3.",
    solution: "x = 3",
  },
  {
    id: "math-lin-06",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "Hard",
    passage: "f(x) = ax + b. If f(3) = 10 and f(7) = 22.",
    question: "What is f(0)?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 0,
    explanation: "a = (22-10)/(7-3) = 3. 10 = 9 + b → b = 1. f(0) = 1.",
    solution: "a = 3, b = 1",
  },
  {
    id: "math-lin-07",
    domain: "Algebra",
    skill: "Linear inequalities",
    difficulty: "Medium",
    passage:
      "A helicopter delivers 100-lb and 120-lb packages. Must carry at least 10 packages, max weight 1,100 lbs.",
    question: "Maximum number of 120-lb packages?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2,
    explanation: "120a + 100(10-a) ≤ 1100 → 20a ≤ 100 → a ≤ 5.",
    solution: "a ≤ 5",
  },
  {
    id: "math-lin-08",
    domain: "Algebra",
    skill: "Linear inequalities",
    difficulty: "Hard",
    passage:
      "Student has $50 for notebooks ($4) and pens ($2). Wants at least 15 items.",
    question: "Maximum notebooks?",
    options: ["8", "9", "10", "11"],
    correctAnswer: 2,
    explanation: "4n + 2(15-n) ≤ 50 → 2n ≤ 20 → n ≤ 10.",
    solution: "n ≤ 10",
  },
  {
    id: "math-lin-09",
    domain: "Algebra",
    skill: "Linear inequalities",
    difficulty: "Hard",
    passage: "Sum of two positive integers ≤ 20. Larger ≥ 2(smaller) + 3.",
    question: "Greatest value of smaller integer?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 1,
    explanation: "s + (2s + 3) ≤ 20 → 3s ≤ 17 → s ≤ 5.",
    solution: "s ≤ 5",
  },
  {
    id: "math-lin-10",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "Medium",
    passage: "",
    question: "If 5(x - 3) = 2(x + 6), what is x?",
    options: ["7", "8", "9", "10"],
    correctAnswer: 2,
    explanation: "5x - 15 = 2x + 12 → 3x = 27 → x = 9.",
    solution: "x = 9",
  },

  // quadratic questions (10)
  {
    id: "math-quad-01",
    domain: "Advanced Math",
    skill: "Quadratic equations",
    difficulty: "Medium",
    passage: "",
    question: "If x² - 6x + 8 = 0, what is the sum of the solutions?",
    options: ["6", "8", "-6", "2"],
    correctAnswer: 0,
    explanation:
      "By Vieta's formulas, sum = -b/a = 6. Or (x-2)(x-4) = 0, sum = 6.",
    solution: "Sum = 6",
  },
  {
    id: "math-quad-02",
    domain: "Advanced Math",
    skill: "Quadratic equations",
    difficulty: "Hard",
    passage: "f(x) = x² - 4x + k has exactly one real zero.",
    question: "What is k?",
    options: ["2", "4", "8", "16"],
    correctAnswer: 1,
    explanation: "Discriminant = 0: 16 - 4k = 0 → k = 4.",
    solution: "k = 4",
  },
  {
    id: "math-quad-03",
    domain: "Advanced Math",
    skill: "Quadratic functions",
    difficulty: "Medium",
    passage: "y = (x - 3)² - 4",
    question: "What is the minimum value of y?",
    options: ["-4", "-3", "3", "4"],
    correctAnswer: 0,
    explanation:
      "Vertex form: vertex at (3, -4). Parabola opens up, minimum = -4.",
    solution: "min = -4",
  },
  {
    id: "math-quad-04",
    domain: "Advanced Math",
    skill: "Quadratic equations",
    difficulty: "Hard",
    passage: "",
    question: "If roots of x² + bx + 12 = 0 are 3 and 4, what is b?",
    options: ["-7", "-1", "1", "7"],
    correctAnswer: 0,
    explanation: "Sum of roots = -b. 3 + 4 = 7 = -b → b = -7.",
    solution: "b = -7",
  },
  {
    id: "math-quad-05",
    domain: "Advanced Math",
    skill: "Quadratic equations",
    difficulty: "Medium",
    passage: "h(t) = -16t² + 48t + 4 (height in feet after t seconds)",
    question: "Maximum height?",
    options: ["36 feet", "40 feet", "52 feet", "64 feet"],
    correctAnswer: 1,
    explanation: "Max at t = 1.5. h(1.5) = -36 + 72 + 4 = 40.",
    solution: "40 feet",
  },
  {
    id: "math-quad-06",
    domain: "Advanced Math",
    skill: "Quadratic equations",
    difficulty: "Hard",
    passage: "",
    question: "For x² - 6x + c = 0 to have roots differing by 4, what is c?",
    options: ["5", "8", "9", "12"],
    correctAnswer: 0,
    explanation: "Roots r and r+4: 2r + 4 = 6 → r = 1. Roots 1, 5. c = 5.",
    solution: "c = 5",
  },
  {
    id: "math-quad-07",
    domain: "Advanced Math",
    skill: "Quadratic functions",
    difficulty: "Medium",
    passage: "f(x) = 2x² - 8x + 6",
    question: "Y-coordinate of vertex?",
    options: ["-4", "-2", "2", "6"],
    correctAnswer: 1,
    explanation: "f(x) = 2(x-2)² - 2. Vertex y = -2.",
    solution: "y = -2",
  },
  {
    id: "math-quad-08",
    domain: "Advanced Math",
    skill: "Quadratic equations",
    difficulty: "Hard",
    passage: "",
    question: "If x² + 4x + 3 = 0 and y² + 4y + 3 = 0 (x ≠ y), what is x + y?",
    options: ["-4", "-3", "-2", "0"],
    correctAnswer: 0,
    explanation: "Both are roots of same equation. Sum = -4.",
    solution: "x + y = -4",
  },
  {
    id: "math-quad-09",
    domain: "Advanced Math",
    skill: "Quadratic equations",
    difficulty: "Medium",
    passage: "",
    question: "Solutions to x² - 5x - 14 = 0?",
    options: [
      "x = -2 and x = 7",
      "x = 2 and x = -7",
      "x = -2 and x = -7",
      "x = 2 and x = 7",
    ],
    correctAnswer: 0,
    explanation: "(x + 2)(x - 7) = 0 → x = -2 or x = 7.",
    solution: "x = -2, 7",
  },
  {
    id: "math-quad-10",
    domain: "Advanced Math",
    skill: "Quadratic functions",
    difficulty: "Hard",
    passage: "y = ax² + bx + c passes through (0, 5), (1, 2), (2, 3).",
    question: "What is a?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    explanation: "c = 5. From other points: a + b = -3, 2a + b = -1. a = 2.",
    solution: "a = 2",
  },

  // exponmentials, polynomials (10)
  {
    id: "math-exp-01",
    domain: "Advanced Math",
    skill: "Exponential functions",
    difficulty: "Medium",
    passage: "Bacteria doubles every 3 hours. Initial: 500.",
    question: "Population after 9 hours?",
    options: ["1,500", "2,000", "4,000", "8,000"],
    correctAnswer: 2,
    explanation: "9 hours = 3 doublings. 500 × 2³ = 4,000.",
    solution: "4,000",
  },
  {
    id: "math-exp-02",
    domain: "Advanced Math",
    skill: "Exponential decay",
    difficulty: "Hard",
    passage: "Car depreciates 15%/year. Current: $20,000.",
    question: "Expression for value after t years?",
    options: [
      "20000(0.15)^t",
      "20000(0.85)^t",
      "20000(1.15)^t",
      "20000 - 3000t",
    ],
    correctAnswer: 1,
    explanation: "Retains 85% each year. V = 20000(0.85)^t.",
    solution: "V = 20000(0.85)^t",
  },
  {
    id: "math-exp-03",
    domain: "Advanced Math",
    skill: "Exponential functions",
    difficulty: "Medium",
    passage: "V(t) = 1000(1.06)^t",
    question: "Annual growth rate?",
    options: ["0.6%", "6%", "60%", "106%"],
    correctAnswer: 1,
    explanation: "Growth factor 1.06 means r = 6%.",
    solution: "6%",
  },
  {
    id: "math-exp-04",
    domain: "Advanced Math",
    skill: "Exponential functions",
    difficulty: "Hard",
    passage: "Half-life: 5 years. Initial: 80 grams.",
    question: "Grams after 15 years?",
    options: ["5", "10", "20", "40"],
    correctAnswer: 1,
    explanation: "15 years = 3 half-lives. 80 × (1/2)³ = 10.",
    solution: "10 grams",
  },
  {
    id: "math-exp-05",
    domain: "Advanced Math",
    skill: "Exponential equations",
    difficulty: "Hard",
    passage: "",
    question: "If 3^(2x) = 27^(x-1), what is x?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
    explanation: "3^(2x) = 3^(3x-3) → 2x = 3x - 3 → x = 3.",
    solution: "x = 3",
  },
  {
    id: "math-poly-01",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "Medium",
    passage: "",
    question: "(x + 3)(x² - 3x + 9) equals?",
    options: ["x³ + 27", "x³ - 27", "x³ + 9x + 27", "x³ - 9x + 27"],
    correctAnswer: 0,
    explanation: "Sum of cubes: x³ + 27.",
    solution: "x³ + 27",
  },
  {
    id: "math-poly-02",
    domain: "Advanced Math",
    skill: "Polynomial factors",
    difficulty: "Hard",
    passage: "",
    question: "If (x - 2) is a factor of x³ - 6x² + 11x - 6, other factors?",
    options: [
      "(x - 1)(x - 3)",
      "(x + 1)(x + 3)",
      "(x - 1)(x + 3)",
      "(x + 1)(x - 3)",
    ],
    correctAnswer: 0,
    explanation: "Divide to get x² - 4x + 3 = (x - 1)(x - 3).",
    solution: "(x-1)(x-3)",
  },
  {
    id: "math-rat-01",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    difficulty: "Medium",
    passage: "",
    question: "Where is (x² - 9)/(x - 3) undefined?",
    options: ["-3", "0", "3", "9"],
    correctAnswer: 2,
    explanation: "Undefined when x - 3 = 0 → x = 3.",
    solution: "x = 3",
  },
  {
    id: "math-rat-02",
    domain: "Advanced Math",
    skill: "Nonlinear equations",
    difficulty: "Hard",
    passage: "",
    question: "Simplify: (x² - 4)/(x² + 4x + 4)",
    options: ["(x-2)/(x+2)", "(x+2)/(x-2)", "x - 2", "x + 2"],
    correctAnswer: 0,
    explanation: "(x+2)(x-2)/(x+2)² = (x-2)/(x+2).",
    solution: "(x-2)/(x+2)",
  },
  {
    id: "math-exp-06",
    domain: "Advanced Math",
    skill: "Exponential functions",
    difficulty: "Medium",
    passage: "Population of 1000 grows 5%/year.",
    question: "Population after 2 years?",
    options: ["1,100", "1,102.50", "1,105", "1,200"],
    correctAnswer: 1,
    explanation: "P = 1000(1.05)² = 1102.50.",
    solution: "1102.50",
  },

  // data/stats (shouldnt be any graphs, mostly just stuff that can be done in desmos for convenience' sake [idk how to install desmos onto here] (12)
  {
    id: "math-stat-01",
    domain: "Problem Solving and Data Analysis",
    skill: "Statistics",
    difficulty: "Medium",
    passage: "Mean of five numbers is 12. Four are 8, 10, 14, 16.",
    question: "Fifth number?",
    options: ["10", "12", "14", "16"],
    correctAnswer: 1,
    explanation: "Sum = 60. Fifth = 60 - 48 = 12.",
    solution: "12",
  },
  {
    id: "math-stat-02",
    domain: "Problem Solving and Data Analysis",
    skill: "Statistics",
    difficulty: "Hard",
    passage: "Data set: mean 25, SD 4. Each value × 3.",
    question: "New SD?",
    options: ["4", "7", "12", "75"],
    correctAnswer: 2,
    explanation: "SD multiplied by same factor: 4 × 3 = 12.",
    solution: "12",
  },
  {
    id: "math-stat-03",
    domain: "Problem Solving and Data Analysis",
    skill: "Statistics",
    difficulty: "Medium",
    passage: "Class of 30: 18 take chemistry, 15 physics, 8 both.",
    question: "How many take neither?",
    options: ["3", "5", "7", "8"],
    correctAnswer: 1,
    explanation: "At least one = 18 + 15 - 8 = 25. Neither = 5.",
    solution: "5",
  },
  {
    id: "math-stat-04",
    domain: "Problem Solving and Data Analysis",
    skill: "Statistics",
    difficulty: "Hard",
    passage: "Median of {3, 7, x, 12, 15} is 9 (in order).",
    question: "What is x?",
    options: ["8", "9", "10", "11"],
    correctAnswer: 1,
    explanation: "Median = 3rd value = x = 9.",
    solution: "x = 9",
  },
  {
    id: "math-prob-01",
    domain: "Problem Solving and Data Analysis",
    skill: "Probability",
    difficulty: "Medium",
    passage: "Bag: 4 red, 3 blue, 5 green marbles.",
    question: "P(blue)?",
    options: ["1/4", "1/3", "1/5", "5/12"],
    correctAnswer: 0,
    explanation: "P = 3/12 = 1/4.",
    solution: "1/4",
  },
  {
    id: "math-prob-02",
    domain: "Problem Solving and Data Analysis",
    skill: "Probability",
    difficulty: "Hard",
    passage: "Two fair dice rolled.",
    question: "P(sum = 7)?",
    options: ["1/6", "1/9", "1/12", "1/36"],
    correctAnswer: 0,
    explanation: "6 ways out of 36. P = 1/6.",
    solution: "1/6",
  },
  {
    id: "math-prob-03",
    domain: "Problem Solving and Data Analysis",
    skill: "Probability",
    difficulty: "Medium",
    passage: "100 people: 60 like coffee, 50 tea, 20 both.",
    question: "P(coffee only)?",
    options: ["2/5", "3/10", "1/2", "3/5"],
    correctAnswer: 0,
    explanation: "Coffee only = 40. P = 2/5.",
    solution: "2/5",
  },
  {
    id: "math-ratio-01",
    domain: "Problem Solving and Data Analysis",
    skill: "Ratios and proportions",
    difficulty: "Medium",
    passage: "Recipe: 2 cups flour per 3 cups sugar.",
    question: "With 8 cups flour, sugar needed?",
    options: ["6", "10", "12", "16"],
    correctAnswer: 2,
    explanation: "2/3 = 8/x → x = 12.",
    solution: "12",
  },
  {
    id: "math-percent-01",
    domain: "Problem Solving and Data Analysis",
    skill: "Percentages",
    difficulty: "Medium",
    passage: "$150 item: 20% off, then 8% tax.",
    question: "Final price?",
    options: ["$120.00", "$126.00", "$129.60", "$136.80"],
    correctAnswer: 2,
    explanation: "$150 × 0.80 × 1.08 = $129.60.",
    solution: "$129.60",
  },
  {
    id: "math-percent-02",
    domain: "Problem Solving and Data Analysis",
    skill: "Percentages",
    difficulty: "Hard",
    passage: "Stock +20% one year, -20% next.",
    question: "Net % change?",
    options: ["0%", "-4%", "4%", "-2%"],
    correctAnswer: 1,
    explanation: "100 → 120 → 96. Net = -4%.",
    solution: "-4%",
  },
  {
    id: "math-ratio-02",
    domain: "Problem Solving and Data Analysis",
    skill: "Ratios and proportions",
    difficulty: "Hard",
    passage: "Boys:girls = 3:5. Total: 40.",
    question: "How many more girls than boys?",
    options: ["5", "8", "10", "15"],
    correctAnswer: 2,
    explanation: "Boys = 15, Girls = 25. Diff = 10.",
    solution: "10",
  },
  {
    id: "math-percent-03",
    domain: "Problem Solving and Data Analysis",
    skill: "Percentages",
    difficulty: "Medium",
    passage: "Base $500/week + 8% commission. Earned $740.",
    question: "Total sales?",
    options: ["$2,000", "$2,500", "$3,000", "$3,500"],
    correctAnswer: 2,
    explanation: "Commission = $240. Sales = $3,000.",
    solution: "$3,000",
  },

  // geometry and trig (13)
  {
    id: "math-geo-01",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "Medium",
    passage: "(x - 2)² + (y + 3)² = 25",
    question: "Radius?",
    options: ["5", "25", "√5", "12.5"],
    correctAnswer: 0,
    explanation: "r² = 25 → r = 5.",
    solution: "r = 5",
  },
  {
    id: "math-geo-02",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "Hard",
    passage: "Circle: center (3, -2), passes through (7, 1).",
    question: "Equation?",
    options: [
      "(x - 3)² + (y + 2)² = 25",
      "(x - 3)² + (y + 2)² = 5",
      "(x + 3)² + (y - 2)² = 25",
      "(x - 7)² + (y - 1)² = 25",
    ],
    correctAnswer: 0,
    explanation: "r = √(16 + 9) = 5. Equation: (x - 3)² + (y + 2)² = 25.",
    solution: "r = 5",
  },
  {
    id: "math-geo-03",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "Medium",
    passage: "Circle area = 36π.",
    question: "Circumference?",
    options: ["6π", "12π", "18π", "36π"],
    correctAnswer: 1,
    explanation: "r = 6. C = 2π(6) = 12π.",
    solution: "12π",
  },
  {
    id: "math-tri-01",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles",
    difficulty: "Medium",
    passage: "Right triangle: leg = 5, hypotenuse = 13.",
    question: "Other leg?",
    options: ["8", "10", "12", "14"],
    correctAnswer: 2,
    explanation: "5² + b² = 13² → b = 12.",
    solution: "b = 12",
  },
  {
    id: "math-tri-02",
    domain: "Geometry and Trigonometry",
    skill: "Trigonometry",
    difficulty: "Medium",
    passage: "sin(θ) = 3/5",
    question: "cos(θ)?",
    options: ["3/5", "4/5", "5/4", "5/3"],
    correctAnswer: 1,
    explanation: "cos²θ = 1 - 9/25 = 16/25 → cosθ = 4/5.",
    solution: "4/5",
  },
  {
    id: "math-tri-03",
    domain: "Geometry and Trigonometry",
    skill: "Trigonometry",
    difficulty: "Hard",
    passage: "tan(θ) = 7/24",
    question: "sin(θ)?",
    options: ["7/25", "24/25", "7/24", "25/7"],
    correctAnswer: 0,
    explanation: "Hyp = 25. sinθ = 7/25.",
    solution: "7/25",
  },
  {
    id: "math-tri-04",
    domain: "Geometry and Trigonometry",
    skill: "Triangles",
    difficulty: "Medium",
    passage: "Triangle angles: 40°, 60°, x°.",
    question: "x?",
    options: ["60", "70", "80", "90"],
    correctAnswer: 2,
    explanation: "40 + 60 + x = 180 → x = 80.",
    solution: "80",
  },
  {
    id: "math-tri-05",
    domain: "Geometry and Trigonometry",
    skill: "Similar triangles",
    difficulty: "Hard",
    passage: "Similar triangles, sides ratio 2:5. Smaller area = 12.",
    question: "Larger area?",
    options: ["30", "48", "60", "75"],
    correctAnswer: 3,
    explanation: "Area ratio = (5/2)² = 25/4. Area = 75.",
    solution: "75",
  },
  {
    id: "math-vol-01",
    domain: "Geometry and Trigonometry",
    skill: "Volume",
    difficulty: "Medium",
    passage: "Cylinder: r = 3, h = 8.",
    question: "Volume?",
    options: ["24π", "48π", "72π", "96π"],
    correctAnswer: 2,
    explanation: "V = π(9)(8) = 72π.",
    solution: "72π",
  },
  {
    id: "math-vol-02",
    domain: "Geometry and Trigonometry",
    skill: "Volume",
    difficulty: "Hard",
    passage: "Cone with same base/height as cylinder (V = 90π).",
    question: "Cone volume?",
    options: ["30π", "45π", "60π", "270π"],
    correctAnswer: 0,
    explanation: "Cone = (1/3) × cylinder = 30π.",
    solution: "30π",
  },
  {
    id: "math-vol-03",
    domain: "Geometry and Trigonometry",
    skill: "Volume",
    difficulty: "Hard",
    passage: "Cube surface area = 150 cm².",
    question: "Volume?",
    options: ["25 cm³", "75 cm³", "125 cm³", "625 cm³"],
    correctAnswer: 2,
    explanation: "6s² = 150 → s = 5. V = 125 cm³.",
    solution: "125 cm³",
  },
  {
    id: "math-coord-01",
    domain: "Geometry and Trigonometry",
    skill: "Coordinate geometry",
    difficulty: "Medium",
    passage: "",
    question: "Distance from (1, 2) to (4, 6)?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 1,
    explanation: "d = √(9 + 16) = 5.",
    solution: "5",
  },
  {
    id: "math-coord-02",
    domain: "Geometry and Trigonometry",
    skill: "Coordinate geometry",
    difficulty: "Hard",
    passage: "",
    question: "Midpoint of (-3, 7) and (5, -1)?",
    options: ["(1, 3)", "(2, 4)", "(1, 4)", "(4, 3)"],
    correctAnswer: 0,
    explanation: "((−3+5)/2, (7−1)/2) = (1, 3).",
    solution: "(1, 3)",
  },
];

// shuffle questions function

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// colors
const colors = {
  primary: "#1a1a2e",
  secondary: "#16213e",
  accent: "#e94560",
  accentLight: "#ff6b6b",
  success: "#10b981",
  warning: "#f59e0b",
  info: "#3b82f6",
  text: "#f0f0f0",
  textMuted: "#94a3b8",
  cardBg: "rgba(30, 41, 59, 0.8)",
};

const CHART_COLORS = [
  "#e94560",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
];

// main component of site

export default function SATPerformanceSystem() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [activeSection, setActiveSection] = useState("english");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    totalAttempted: 0,
    correct: 0,
    byDomain: {},
    byDifficulty: {
      Medium: { correct: 0, total: 0 },
      Hard: { correct: 0, total: 0 },
    },
    history: [],
    streak: 0,
    maxStreak: 0,
  });
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [studyPlan, setStudyPlan] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // randomized question function (i.e., where the shuffle comes into play hehehehe) (15 each)
  const [englishQuestions, setEnglishQuestions] = useState(() =>
    shuffleArray(allEnglishQuestions).slice(0, 15)
  );
  const [mathQuestions, setMathQuestions] = useState(() =>
    shuffleArray(allMathQuestions).slice(0, 15)
  );

  const questions =
    activeSection === "english" ? englishQuestions : mathQuestions;

  // shuffle quesitons
  const shuffleNewQuestions = () => {
    setEnglishQuestions(shuffleArray(allEnglishQuestions).slice(0, 15));
    setMathQuestions(shuffleArray(allMathQuestions).slice(0, 15));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const generateStudyPlan = useCallback(() => {
    const weakAreas = [];
    Object.entries(sessionStats.byDomain).forEach(([domain, stats]) => {
      const accuracy =
        stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
      if (accuracy < 70) {
        weakAreas.push({
          domain,
          accuracy,
          priority: accuracy < 50 ? "high" : "medium",
        });
      }
    });
    setStudyPlan({
      weakAreas: weakAreas.sort((a, b) => a.accuracy - b.accuracy),
      recommendedPractice:
        weakAreas.length > 0 ? weakAreas[0].domain : "Continue practicing!",
      estimatedImprovement: Math.min(50 + weakAreas.length * 20, 150),
    });
  }, [sessionStats]);

  const checkAnswer = () => {
    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;

    setSessionStats((prev) => {
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
      if (!newStats.byDomain[domain])
        newStats.byDomain[domain] = { correct: 0, total: 0 };
      newStats.byDomain[domain].total++;
      if (isCorrect) newStats.byDomain[domain].correct++;

      if (!newStats.byDifficulty[question.difficulty]) {
        newStats.byDifficulty[question.difficulty] = { correct: 0, total: 0 };
      }
      newStats.byDifficulty[question.difficulty].total++;
      if (isCorrect) newStats.byDifficulty[question.difficulty].correct++;

      newStats.history.push({
        questionId: question.id,
        section: activeSection,
        domain: question.domain,
        difficulty: question.difficulty,
        isCorrect,
        timestamp: Date.now(),
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
    if (currentQuestion >= questions.length - 1) {
      // finished all 15 questions - offer to shuffle new set
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsTimerRunning(true);
    setTimer(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const accuracy =
    sessionStats.totalAttempted > 0
      ? Math.round((sessionStats.correct / sessionStats.totalAttempted) * 100)
      : 0;

  const projectedScore = useMemo(
    () => 400 + Math.round((accuracy / 100) * 400),
    [accuracy]
  );

  const performanceData = useMemo(() => {
    const last10 = sessionStats.history.slice(-10);
    return last10.map((item, index) => ({
      attempt: index + 1,
      cumulative: last10.slice(0, index + 1).filter((i) => i.isCorrect).length,
    }));
  }, [sessionStats.history]);

  const domainData = useMemo(() => {
    return Object.entries(sessionStats.byDomain).map(([name, stats]) => ({
      name: name.split(" ")[0],
      accuracy:
        stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
    }));
  }, [sessionStats.byDomain]);

  const difficultyPieData = useMemo(() => {
    return Object.entries(sessionStats.byDifficulty)
      .filter(([_, stats]) => stats.total > 0)
      .map(([name, stats]) => ({
        name,
        value: stats.total,
        accuracy:
          stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
      }));
  }, [sessionStats.byDifficulty]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, #0f172a 100%)`,
        fontFamily: "'Inter', system-ui, sans-serif",
        color: colors.text,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
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
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.accent}15 0%, transparent 70%)`,
            top: "-200px",
            right: "-200px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.info}10 0%, transparent 70%)`,
            bottom: "-100px",
            left: "-100px",
          }}
        />
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "10px",
                height: "10px",
                background: CHART_COLORS[i % CHART_COLORS.length],
                borderRadius: i % 2 === 0 ? "50%" : "0",
                left: `${Math.random() * 100}%`,
                animation: `confetti ${2 + Math.random()}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Navigation */}
      <nav
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: "260px",
          background: "rgba(22, 33, 62, 0.95)",
          backdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          padding: "24px",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
            padding: "12px",
            background: `linear-gradient(135deg, ${colors.accent}20, transparent)`,
            borderRadius: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 20px ${colors.accent}40`,
            }}
          >
            <GraduationCap size={28} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>
              SAT Prep
            </h1>
            <p style={{ fontSize: "12px", color: colors.textMuted, margin: 0 }}>
              Performance System
            </p>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          {[
            { id: "dashboard", icon: Home, label: "Dashboard" },
            { id: "practice", icon: BookOpen, label: "Practice" },
            { id: "analytics", icon: BarChart3, label: "Analytics" },
            { id: "studyplan", icon: Target, label: "Study Plan" },
          ].map((item) => (
            <button
              key={item.id}
              className="nav-item"
              onClick={() => setCurrentView(item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 16px",
                marginBottom: "8px",
                background:
                  currentView === item.id
                    ? `linear-gradient(90deg, ${colors.accent}30, transparent)`
                    : "transparent",
                border: "none",
                borderRadius: "12px",
                color:
                  currentView === item.id ? colors.accent : colors.textMuted,
                fontSize: "15px",
                fontWeight: currentView === item.id ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.2s ease",
                borderLeft:
                  currentView === item.id
                    ? `3px solid ${colors.accent}`
                    : "3px solid transparent",
              }}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </div>

        <div
          style={{
            padding: "20px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: `linear-gradient(135deg, ${colors.info}, ${colors.accent})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User size={20} color="white" />
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>
                Student
              </p>
              <p
                style={{ fontSize: "12px", color: colors.textMuted, margin: 0 }}
              >
                Level {Math.floor(sessionStats.totalAttempted / 5) + 1}
              </p>
            </div>
          </div>
          <div
            style={{
              height: "6px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(sessionStats.totalAttempted % 5) * 20}%`,
                background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentLight})`,
                borderRadius: "3px",
                transition: "width 0.5s ease",
              }}
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main
        style={{
          marginLeft: "260px",
          padding: "32px 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: 800,
                margin: 0,
                background: `linear-gradient(90deg, ${colors.text}, ${colors.textMuted})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {currentView === "dashboard" && "Welcome Back!"}
              {currentView === "practice" && "Practice Mode"}
              {currentView === "analytics" && "Performance Analytics"}
              {currentView === "studyplan" && "Your Study Plan"}
            </h2>
            <p style={{ color: colors.textMuted, marginTop: "4px" }}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          {sessionStats.streak >= 3 && (
            <div
              className="streak-badge"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 20px",
                background: `linear-gradient(135deg, ${colors.warning}20, ${colors.accent}20)`,
                borderRadius: "50px",
                border: `2px solid ${colors.warning}50`,
              }}
            >
              <Flame size={24} color={colors.warning} />
              <span style={{ fontWeight: 700, fontSize: "18px" }}>
                {sessionStats.streak}
              </span>
              <span style={{ color: colors.textMuted }}>streak!</span>
            </div>
          )}
        </header>

        {/* Dashboard */}
        {currentView === "dashboard" && (
          <div style={{ animation: "slideIn 0.5s ease-out" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
                marginBottom: "32px",
              }}
            >
              {[
                {
                  icon: Target,
                  label: "Questions",
                  value: sessionStats.totalAttempted,
                  color: colors.accent,
                },
                {
                  icon: CheckCircle,
                  label: "Accuracy",
                  value: `${accuracy}%`,
                  color: colors.success,
                },
                {
                  icon: TrendingUp,
                  label: "Projected",
                  value: projectedScore,
                  color: colors.info,
                },
                {
                  icon: Zap,
                  label: "Best Streak",
                  value: sessionStats.maxStreak,
                  color: colors.warning,
                },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="stat-card card-hover"
                  style={{
                    background: colors.cardBg,
                    borderRadius: "20px",
                    padding: "24px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    animationDelay: `${index * 0.1}s`,
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: `${stat.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <stat.icon size={24} color={stat.color} />
                  </div>
                  <p
                    style={{
                      color: colors.textMuted,
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    {stat.label}
                  </p>
                  <p style={{ fontSize: "32px", fontWeight: 800, margin: 0 }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px",
                marginBottom: "32px",
              }}
            >
              <div
                className="card-hover"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent}90, ${colors.accentLight}90)`,
                  borderRadius: "24px",
                  padding: "32px",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
                onClick={() => setCurrentView("practice")}
              >
                <div
                  style={{
                    position: "absolute",
                    right: "-40px",
                    bottom: "-40px",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                  }}
                />
                <BookOpen size={40} style={{ marginBottom: "16px" }} />
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  Start Practice
                </h3>
                <p style={{ opacity: 0.8, marginBottom: "20px" }}>
                  15 randomized questions per session
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  Begin Session <ArrowRight size={18} />
                </div>
              </div>

              <div
                style={{
                  background: colors.cardBg,
                  borderRadius: "24px",
                  padding: "32px",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    marginBottom: "20px",
                  }}
                >
                  Choose Section
                </h3>
                <div style={{ display: "flex", gap: "12px" }}>
                  {["english", "math"].map((section) => (
                    <button
                      key={section}
                      onClick={() => {
                        setActiveSection(section);
                        setCurrentQuestion(0);
                        setSelectedAnswer(null);
                        setShowExplanation(false);
                      }}
                      style={{
                        flex: 1,
                        padding: "20px",
                        background:
                          activeSection === section
                            ? `linear-gradient(135deg, ${colors.accent}30, ${colors.info}20)`
                            : "rgba(255,255,255,0.03)",
                        border:
                          activeSection === section
                            ? `2px solid ${colors.accent}`
                            : "2px solid rgba(255,255,255,0.1)",
                        borderRadius: "16px",
                        color: colors.text,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          background:
                            section === "english"
                              ? `${colors.info}30`
                              : `${colors.success}30`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 12px",
                        }}
                      >
                        {section === "english" ? (
                          <BookOpen size={20} color={colors.info} />
                        ) : (
                          <Brain size={20} color={colors.success} />
                        )}
                      </div>
                      <p
                        style={{
                          fontWeight: 600,
                          textTransform: "capitalize",
                          margin: 0,
                        }}
                      >
                        {section}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: colors.textMuted,
                          marginTop: "4px",
                        }}
                      >
                        15 of{" "}
                        {section === "english"
                          ? allEnglishQuestions.length
                          : allMathQuestions.length}{" "}
                        questions
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                background: colors.cardBg,
                borderRadius: "24px",
                padding: "32px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>
                  Recent Performance
                </h3>
                <p style={{ color: colors.textMuted, fontSize: "14px" }}>
                  Last 10 questions
                </p>
              </div>
              {performanceData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={performanceData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis dataKey="attempt" stroke={colors.textMuted} />
                    <YAxis stroke={colors.textMuted} />
                    <Tooltip
                      contentStyle={{
                        background: colors.cardBg,
                        border: "none",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="cumulative"
                      stroke={colors.accent}
                      strokeWidth={3}
                      dot={{ fill: colors.accent }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div
                  style={{
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: colors.textMuted,
                  }}
                >
                  Complete some questions to see your performance chart!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Practice */}
        {currentView === "practice" && (
          <div style={{ animation: "slideIn 0.5s ease-out" }}>
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "24px",
                alignItems: "center",
              }}
            >
              {["english", "math"].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    setActiveSection(section);
                    setCurrentQuestion(0);
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                  }}
                  style={{
                    padding: "12px 24px",
                    background:
                      activeSection === section
                        ? colors.accent
                        : "rgba(255,255,255,0.05)",
                    border: "none",
                    borderRadius: "12px",
                    color: colors.text,
                    fontWeight: 600,
                    cursor: "pointer",
                    textTransform: "capitalize",
                    transition: "all 0.2s ease",
                  }}
                >
                  {section}
                </button>
              ))}
              <div style={{ flex: 1 }} />
              <button
                onClick={shuffleNewQuestions}
                style={{
                  padding: "12px 20px",
                  background: "rgba(255,255,255,0.05)",
                  border: "none",
                  borderRadius: "12px",
                  color: colors.textMuted,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                }}
              >
                <RefreshCw size={16} /> New Questions
              </button>
              <div
                style={{
                  padding: "12px 20px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Clock size={18} color={colors.textMuted} />
                <span style={{ fontFamily: "monospace", fontWeight: 600 }}>
                  {formatTime(timer)}
                </span>
              </div>
            </div>

            <div
              style={{
                background: colors.cardBg,
                borderRadius: "24px",
                padding: "32px",
                border: "1px solid rgba(255,255,255,0.05)",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <span
                    style={{
                      padding: "6px 12px",
                      background: `${colors.info}20`,
                      color: colors.info,
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {questions[currentQuestion]?.domain}
                  </span>
                  <span
                    style={{
                      padding: "6px 12px",
                      background:
                        questions[currentQuestion]?.difficulty === "Hard"
                          ? `${colors.accent}20`
                          : `${colors.warning}20`,
                      color:
                        questions[currentQuestion]?.difficulty === "Hard"
                          ? colors.accent
                          : colors.warning,
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {questions[currentQuestion]?.difficulty}
                  </span>
                </div>
                <span style={{ color: colors.textMuted, fontSize: "14px" }}>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>

              {questions[currentQuestion]?.passage && (
                <div
                  style={{
                    padding: "20px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    marginBottom: "24px",
                    borderLeft: `4px solid ${colors.accent}`,
                    lineHeight: 1.8,
                  }}
                >
                  {questions[currentQuestion].passage}
                </div>
              )}

              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  marginBottom: "24px",
                  lineHeight: 1.6,
                }}
              >
                {questions[currentQuestion]?.question}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "12px",
                  marginBottom: "24px",
                }}
              >
                {questions[currentQuestion]?.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect =
                    showExplanation &&
                    index === questions[currentQuestion].correctAnswer;
                  const isWrong =
                    showExplanation &&
                    isSelected &&
                    index !== questions[currentQuestion].correctAnswer;

                  return (
                    <button
                      key={index}
                      className="option-btn"
                      onClick={() =>
                        !showExplanation && setSelectedAnswer(index)
                      }
                      disabled={showExplanation}
                      style={{
                        padding: "16px 20px",
                        textAlign: "left",
                        background: isCorrect
                          ? `${colors.success}20`
                          : isWrong
                          ? `${colors.accent}20`
                          : isSelected
                          ? `${colors.info}20`
                          : "rgba(255,255,255,0.03)",
                        border: `2px solid ${
                          isCorrect
                            ? colors.success
                            : isWrong
                            ? colors.accent
                            : isSelected
                            ? colors.info
                            : "rgba(255,255,255,0.1)"
                        }`,
                        borderRadius: "12px",
                        color: colors.text,
                        cursor: showExplanation ? "default" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: isCorrect
                            ? colors.success
                            : isWrong
                            ? colors.accent
                            : isSelected
                            ? colors.info
                            : "rgba(255,255,255,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "14px",
                          flexShrink: 0,
                        }}
                      >
                        {isCorrect ? (
                          <CheckCircle size={18} />
                        ) : isWrong ? (
                          <XCircle size={18} />
                        ) : (
                          ["A", "B", "C", "D"][index]
                        )}
                      </span>
                      <span style={{ fontSize: "15px" }}>{option}</span>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div
                  style={{
                    padding: "20px",
                    background: `${colors.info}10`,
                    borderRadius: "12px",
                    border: `1px solid ${colors.info}30`,
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "12px",
                    }}
                  >
                    <Lightbulb size={20} color={colors.warning} />
                    <span style={{ fontWeight: 600 }}>Explanation</span>
                  </div>
                  <p style={{ lineHeight: 1.7, margin: 0 }}>
                    {questions[currentQuestion]?.explanation}
                  </p>
                  {questions[currentQuestion]?.solution && (
                    <p
                      style={{
                        marginTop: "12px",
                        fontFamily: "monospace",
                        color: colors.textMuted,
                      }}
                    >
                      {questions[currentQuestion].solution}
                    </p>
                  )}
                </div>
              )}

              <div style={{ display: "flex", gap: "12px" }}>
                {!showExplanation ? (
                  <button
                    className="btn-primary"
                    onClick={checkAnswer}
                    disabled={selectedAnswer === null}
                    style={{
                      flex: 1,
                      padding: "16px",
                      border: "none",
                      borderRadius: "12px",
                      background:
                        selectedAnswer !== null
                          ? `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`
                          : "rgba(255,255,255,0.1)",
                      color:
                        selectedAnswer !== null ? "white" : colors.textMuted,
                      fontWeight: 600,
                      fontSize: "16px",
                      cursor:
                        selectedAnswer !== null ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Check Answer <ChevronRight size={20} />
                  </button>
                ) : currentQuestion < questions.length - 1 ? (
                  <button
                    className="btn-primary"
                    onClick={nextQuestion}
                    style={{
                      flex: 1,
                      padding: "16px",
                      border: "none",
                      borderRadius: "12px",
                      background: `linear-gradient(135deg, ${colors.success}, #059669)`,
                      color: "white",
                      fontWeight: 600,
                      fontSize: "16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Next Question <ArrowRight size={20} />
                  </button>
                ) : (
                  <button
                    className="btn-primary"
                    onClick={shuffleNewQuestions}
                    style={{
                      flex: 1,
                      padding: "16px",
                      border: "none",
                      borderRadius: "12px",
                      background: `linear-gradient(135deg, ${colors.info}, #2563eb)`,
                      color: "white",
                      fontWeight: 600,
                      fontSize: "16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Sparkles size={20} /> Get New Questions
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                    setTimer(0);
                  }}
                  style={{
                    padding: "16px 20px",
                    background: "rgba(255,255,255,0.05)",
                    border: "none",
                    borderRadius: "12px",
                    color: colors.textMuted,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
              }}
            >
              {[
                { label: "Attempted", value: sessionStats.totalAttempted },
                { label: "Correct", value: sessionStats.correct },
                { label: "Accuracy", value: `${accuracy}%` },
                { label: "Streak", value: sessionStats.streak },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: colors.cardBg,
                    borderRadius: "16px",
                    padding: "20px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      color: colors.textMuted,
                      fontSize: "13px",
                      marginBottom: "4px",
                    }}
                  >
                    {stat.label}
                  </p>
                  <p style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics */}
        {currentView === "analytics" && (
          <div style={{ animation: "slideIn 0.5s ease-out" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                marginBottom: "32px",
              }}
            >
              {[
                {
                  label: "Total Questions",
                  value: sessionStats.totalAttempted,
                  color: colors.accent,
                },
                {
                  label: "Correct Answers",
                  value: sessionStats.correct,
                  color: colors.success,
                },
                {
                  label: "Overall Accuracy",
                  value: `${accuracy}%`,
                  color: colors.info,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}20, transparent)`,
                    borderRadius: "20px",
                    padding: "24px",
                    border: `1px solid ${stat.color}30`,
                  }}
                >
                  <p
                    style={{
                      color: colors.textMuted,
                      fontSize: "14px",
                      marginBottom: "8px",
                    }}
                  >
                    {stat.label}
                  </p>
                  <p
                    style={{
                      fontSize: "36px",
                      fontWeight: 800,
                      margin: 0,
                      color: stat.color,
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px",
              }}
            >
              <div
                style={{
                  background: colors.cardBg,
                  borderRadius: "24px",
                  padding: "32px",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    marginBottom: "24px",
                  }}
                >
                  Performance by Domain
                </h3>
                {domainData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={domainData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                      />
                      <XAxis dataKey="name" stroke={colors.textMuted} />
                      <YAxis stroke={colors.textMuted} />
                      <Tooltip
                        contentStyle={{
                          background: colors.cardBg,
                          border: "none",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="accuracy"
                        fill={colors.accent}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div
                    style={{
                      height: "250px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: colors.textMuted,
                    }}
                  >
                    Complete questions to see domain analysis
                  </div>
                )}
              </div>

              <div
                style={{
                  background: colors.cardBg,
                  borderRadius: "24px",
                  padding: "32px",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    marginBottom: "24px",
                  }}
                >
                  By Difficulty
                </h3>
                {difficultyPieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={difficultyPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, accuracy }) => `${name}: ${accuracy}%`}
                      >
                        {difficultyPieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: colors.cardBg,
                          border: "none",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div
                    style={{
                      height: "250px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: colors.textMuted,
                    }}
                  >
                    Complete questions to see difficulty breakdown
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Study Plan */}
        {currentView === "studyplan" && (
          <div style={{ animation: "slideIn 0.5s ease-out" }}>
            <button
              onClick={generateStudyPlan}
              style={{
                padding: "16px 32px",
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.info})`,
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "32px",
                fontSize: "16px",
              }}
            >
              <RefreshCw size={20} /> Generate Study Plan
            </button>

            {studyPlan ? (
              <>
                <div
                  style={{
                    background: `linear-gradient(135deg, ${colors.accent}20, ${colors.info}20)`,
                    borderRadius: "24px",
                    padding: "32px",
                    border: `1px solid ${colors.accent}30`,
                    marginBottom: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "20px",
                      background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentLight})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Sparkles size={40} color="white" />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "24px",
                        fontWeight: 700,
                        marginBottom: "8px",
                      }}
                    >
                      Focus on: {studyPlan.recommendedPractice}
                    </h3>
                    <p
                      style={{ color: colors.textMuted, marginBottom: "12px" }}
                    >
                      This is your priority area based on performance analysis
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: colors.success,
                      }}
                    >
                      <TrendingUp size={20} />
                      <span>
                        Estimated improvement: +{studyPlan.estimatedImprovement}{" "}
                        points
                      </span>
                    </div>
                  </div>
                </div>

                {studyPlan.weakAreas.length > 0 && (
                  <div
                    style={{
                      background: colors.cardBg,
                      borderRadius: "24px",
                      padding: "32px",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "24px",
                      }}
                    >
                      <AlertTriangle size={24} color={colors.warning} />
                      <h3
                        style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}
                      >
                        Areas Needing Improvement
                      </h3>
                    </div>
                    <div style={{ display: "grid", gap: "16px" }}>
                      {studyPlan.weakAreas.map((area, index) => (
                        <div
                          key={index}
                          style={{
                            padding: "20px",
                            background: "rgba(255,255,255,0.03)",
                            borderRadius: "12px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <p style={{ fontWeight: 600, marginBottom: "4px" }}>
                              {area.domain}
                            </p>
                            <span
                              style={{
                                padding: "4px 8px",
                                borderRadius: "6px",
                                fontSize: "12px",
                                fontWeight: 600,
                                background:
                                  area.priority === "high"
                                    ? `${colors.accent}20`
                                    : `${colors.warning}20`,
                                color:
                                  area.priority === "high"
                                    ? colors.accent
                                    : colors.warning,
                              }}
                            >
                              {area.priority} priority
                            </span>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <p
                              style={{
                                fontSize: "24px",
                                fontWeight: 700,
                                marginBottom: "4px",
                              }}
                            >
                              {Math.round(area.accuracy)}%
                            </p>
                            <p
                              style={{
                                fontSize: "12px",
                                color: colors.textMuted,
                              }}
                            >
                              accuracy
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div
                style={{
                  background: colors.cardBg,
                  borderRadius: "24px",
                  padding: "60px",
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Target
                  size={64}
                  color={colors.textMuted}
                  style={{ marginBottom: "24px" }}
                />
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: 600,
                    marginBottom: "12px",
                  }}
                >
                  Generate Your Study Plan
                </h3>
                <p
                  style={{
                    color: colors.textMuted,
                    maxWidth: "400px",
                    margin: "0 auto",
                  }}
                >
                  Complete some practice questions, then click the button above
                  to get personalized recommendations.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
