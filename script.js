
"use strict";

/* =========================================================
   QUIZFORGE — ONLINE QUIZ & EXAM PLATFORM
   HTML + CSS + JavaScript
   Storage: localStorage
========================================================= */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];

const STORAGE = {
  quizzes: "quizforge_quizzes_v1",
  attempts: "quizforge_attempts_v1",
  theme: "quizforge_theme_v1"
};

const CATEGORIES = [
  "Java", "DSA", "HTML", "CSS", "JavaScript", "React",
  "DBMS", "Operating Systems", "Computer Networks",
  "Python", "C Programming", "SQL", "Mathematics",
  "Logical Reasoning", "English", "General Knowledge",
  "Science", "Aptitude", "Algorithms", "Data Structures",
  "Web Development", "OOP", "Cybersecurity", "Cloud Computing",
  "Statistics", "Economics", "History", "Geography",
  "Current Affairs", "Interview Preparation"
];

const CATEGORY_ICONS = {
  "Java": "fa-brands fa-java",
  "DSA": "fa-solid fa-code",
  "HTML": "fa-brands fa-html5",
  "CSS": "fa-brands fa-css3-alt",
  "JavaScript": "fa-brands fa-js",
  "React": "fa-brands fa-react",
  "DBMS": "fa-solid fa-database",
  "Operating Systems": "fa-solid fa-desktop",
  "Computer Networks": "fa-solid fa-network-wired",
  "Python": "fa-brands fa-python",
  "C Programming": "fa-solid fa-terminal",
  "SQL": "fa-solid fa-table",
  "Mathematics": "fa-solid fa-calculator",
  "Logical Reasoning": "fa-solid fa-brain",
  "English": "fa-solid fa-language",
  "General Knowledge": "fa-solid fa-globe",
  "Science": "fa-solid fa-flask",
  "Aptitude": "fa-solid fa-chart-simple",
  "Algorithms": "fa-solid fa-diagram-project",
  "Data Structures": "fa-solid fa-layer-group",
  "Web Development": "fa-solid fa-laptop-code",
  "OOP": "fa-solid fa-cubes",
  "Cybersecurity": "fa-solid fa-shield-halved",
  "Cloud Computing": "fa-solid fa-cloud",
  "Statistics": "fa-solid fa-chart-column",
  "Economics": "fa-solid fa-coins",
  "History": "fa-solid fa-landmark",
  "Geography": "fa-solid fa-earth-asia",
  "Current Affairs": "fa-solid fa-newspaper",
  "Interview Preparation": "fa-solid fa-user-tie"
};

/* =========================================================
   STARTER QUIZZES
   Each question:
   [question, optionA, optionB, optionC, optionD,
    correctOptionIndex, explanation]
========================================================= */

const STARTER_DATA = [
  {
    title: "Java Fundamentals",
    category: "Java",
    difficulty: "Easy",
    description: "Test your knowledge of Java basics and syntax.",
    duration: 5,
    questions: [
      ["Which keyword creates a subclass in Java?", "implements", "extends", "inherits", "super", 1, "The extends keyword establishes class inheritance."],
      ["Which is the entry point of a standard Java application?", "start()", "run()", "main()", "init()", 2, "The standard entry point is public static void main(String[] args)."],
      ["Which type stores true or false?", "int", "char", "String", "boolean", 3, "The boolean primitive stores true or false."]
    ]
  },
  {
    title: "DSA Essentials",
    category: "DSA",
    difficulty: "Medium",
    description: "Arrays, complexity, searching, and fundamental algorithms.",
    duration: 7,
    questions: [
      ["What is the time complexity of binary search on a sorted array?", "O(n)", "O(log n)", "O(n log n)", "O(1) always", 1, "Binary search halves the search interval on each step."],
      ["Which data structure follows LIFO?", "Queue", "Tree", "Stack", "Graph", 2, "A stack follows Last In, First Out."],
      ["What is the average time complexity of hash-table lookup?", "O(n)", "O(log n)", "O(n log n)", "O(1)", 3, "Hash-table lookup is expected O(1) with a suitable hash function and controlled collisions."]
    ]
  },
  {
    title: "HTML Mastery",
    category: "HTML",
    difficulty: "Easy",
    description: "Elements, forms, attributes, and semantic HTML.",
    duration: 5,
    questions: [
      ["Which element creates a hyperlink?", "<link>", "<a>", "<href>", "<url>", 1, "The anchor element creates hyperlinks using its href attribute."],
      ["Which attribute provides alternative text for an image?", "title", "src", "alt", "name", 2, "The alt attribute supplies alternative text."],
      ["Which element represents the main content of a page?", "<section>", "<footer>", "<aside>", "<main>", 3, "The main element identifies the page's dominant content."]
    ]
  },
  {
    title: "CSS Design Basics",
    category: "CSS",
    difficulty: "Easy",
    description: "Selectors, layouts, responsive design, and styling.",
    duration: 5,
    questions: [
      ["Which property changes text color?", "font-style", "color", "background", "opacity", 1, "The color property sets the foreground text color."],
      ["Which layout system is designed for one-dimensional layouts?", "Grid only", "Float", "Flexbox", "Position absolute", 2, "Flexbox is designed primarily for arranging items along a row or column."],
      ["Which unit is relative to the root element's font size?", "px", "%", "vh", "rem", 3, "rem is relative to the root element's computed font size."]
    ]
  },
  {
    title: "JavaScript Core",
    category: "JavaScript",
    difficulty: "Medium",
    description: "Variables, functions, arrays, and language fundamentals.",
    duration: 7,
    questions: [
      ["Which declaration is block-scoped and can be reassigned?", "const", "let", "static", "final", 1, "let is block-scoped and allows reassignment."],
      ["What does Array.prototype.map() return?", "A number", "The same array always", "A new array", "A Promise always", 2, "map returns a new array containing callback results."],
      ["Which operator checks strict equality?", "=", "==", "===", "!==", 2, "The === operator compares without type coercion."]
    ]
  },
  {
    title: "React Fundamentals",
    category: "React",
    difficulty: "Medium",
    description: "Components, props, state, and hooks.",
    duration: 7,
    questions: [
      ["What is a React component?", "A database table", "A reusable UI building block", "A CSS selector", "A browser engine", 1, "Components encapsulate reusable user-interface behavior and rendering."],
      ["Which hook manages local component state?", "useEffect", "useMemo", "useState", "useRef only", 2, "useState provides a state value and its setter."],
      ["What are props primarily used for?", "To pass data into components", "To replace HTML", "To create database indexes", "To style every element automatically", 0, "Props pass information from a parent component to a child."]
    ]
  },
  {
    title: "DBMS Concepts",
    category: "DBMS",
    difficulty: "Medium",
    description: "Keys, transactions, normalization, and database design.",
    duration: 7,
    questions: [
      ["What uniquely identifies a row in a table?", "Foreign key only", "Primary key", "View", "Trigger", 1, "A primary key uniquely identifies each row."],
      ["What does ACID stand for in transactions?", "Access, Control, Index, Data", "Atomic, Consistent, Isolated, Durable", "Add, Create, Insert, Delete", "Automatic, Cached, Indexed, Distributed", 1, "ACID stands for Atomicity, Consistency, Isolation, and Durability."],
      ["Which key references a key in another table?", "Candidate key", "Superkey", "Foreign key", "Composite index", 2, "A foreign key represents a referential relationship between tables."]
    ]
  },
  {
    title: "Operating Systems",
    category: "Operating Systems",
    difficulty: "Medium",
    description: "Processes, threads, scheduling, and memory management.",
    duration: 7,
    questions: [
      ["Which is a unit of execution within a process?", "File", "Thread", "Partition", "Socket", 1, "A thread is an execution unit within a process."],
      ["Which algorithm serves processes in arrival order?", "Round Robin", "Shortest Job First", "First Come First Served", "Priority only", 2, "FCFS schedules processes in their arrival order."],
      ["What is virtual memory?", "A CPU register", "A cache-only system", "A type of file", "A memory abstraction backed by storage", 3, "Virtual memory provides an address-space abstraction and may use disk-backed paging."]
    ]
  },
  {
    title: "Computer Networks",
    category: "Computer Networks",
    difficulty: "Medium",
    description: "Protocols, IP, HTTP, DNS, and networking fundamentals.",
    duration: 7,
    questions: [
      ["Which protocol securely encrypts web traffic?", "FTP", "HTTPS", "HTTP without TLS", "Telnet", 1, "HTTPS uses TLS to protect HTTP communication."],
      ["What is the primary role of DNS?", "Encrypting files", "Routing inside the CPU", "Resolving domain names to records such as IP addresses", "Compiling Java", 2, "DNS resolves domain names into DNS records, commonly IP addresses."],
      ["Which transport protocol provides reliable ordered delivery?", "UDP", "ARP", "ICMP", "TCP", 3, "TCP provides a reliable, ordered byte stream."]
    ]
  },
  {
    title: "Python Programming",
    category: "Python",
    difficulty: "Easy",
    description: "Python syntax, collections, and built-in operations.",
    duration: 5,
    questions: [
      ["Which symbol begins a Python comment?", "//", "#", "<!--", "/*", 1, "Python uses # for single-line comments."],
      ["Which collection is immutable?", "List", "Set", "Tuple", "Dictionary", 2, "A tuple cannot have its item references reassigned after creation."],
      ["What does len([4, 5, 6]) return?", "2", "4", "6", "3", 3, "The list contains three elements."]
    ]
  },
  {
    title: "C Programming",
    category: "C Programming",
    difficulty: "Easy",
    description: "C syntax, pointers, operators, and data types.",
    duration: 5,
    questions: [
      ["Which function is commonly used for formatted output in C?", "input()", "printf()", "echo()", "writeLine()", 1, "printf is declared in stdio.h and provides formatted output."],
      ["Which operator obtains the address of an object?", "*", "->", "&", "%", 2, "The unary & operator obtains an object's address."],
      ["Which header declares printf?", "<stdlib.h>", "<string.h>", "<math.h>", "<stdio.h>", 3, "printf is declared in stdio.h."]
    ]
  },
  {
    title: "SQL Queries",
    category: "SQL",
    difficulty: "Easy",
    description: "SELECT, filtering, grouping, and database queries.",
    duration: 5,
    questions: [
      ["Which clause filters rows before grouping?", "ORDER BY", "WHERE", "HAVING", "LIMIT", 1, "WHERE filters individual rows before grouping."],
      ["Which function counts rows?", "SUM()", "AVG()", "COUNT()", "MAX()", 2, "COUNT returns a count of rows or non-NULL expressions depending on its argument."],
      ["Which clause sorts query results?", "GROUP BY", "WHERE", "JOIN", "ORDER BY", 3, "ORDER BY sorts the result set."]
    ]
  },
  {
    title: "Mathematics Challenge",
    category: "Mathematics",
    difficulty: "Easy",
    description: "Arithmetic, percentages, and elementary algebra.",
    duration: 5,
    questions: [
      ["What is 15% of 200?", "20", "30", "35", "40", 1, "200 × 15 / 100 = 30."],
      ["Solve: 3x = 21.", "x = 6", "x = 8", "x = 7", "x = 9", 2, "Divide both sides by 3 to get x = 7."],
      ["What is the square of 12?", "124", "132", "122", "144", 3, "12 × 12 = 144."]
    ]
  },
  {
    title: "Logical Reasoning",
    category: "Logical Reasoning",
    difficulty: "Medium",
    description: "Number patterns, logic, and analytical thinking.",
    duration: 7,
    questions: [
      ["Find the next number: 2, 4, 8, 16, ?", "24", "32", "30", "34", 1, "Each term is twice the previous term; 16 × 2 = 32."],
      ["All roses are flowers. Which statement must be true?", "All flowers are roses", "No roses are flowers", "Every rose is a flower", "Every flower is red", 2, "The first premise directly states that all roses belong to the flower category."],
      ["Find the odd one out.", "Triangle", "Square", "Circle", "Tuesday", 3, "Tuesday is a day of the week, while the other choices are geometric shapes."]
    ]
  },
  {
    title: "English Grammar",
    category: "English",
    difficulty: "Easy",
    description: "Grammar, vocabulary, and sentence structure.",
    duration: 5,
    questions: [
      ["Choose the grammatically correct sentence.", "She go to school.", "She goes to school.", "She going school.", "She gone to school every day.", 1, "The third-person singular present simple uses goes."],
      ["What is the plural of 'criterion'?", "Criterions only", "Criterias", "Criteria", "Criterionies", 2, "Criteria is the standard plural of criterion."],
      ["Choose the synonym of 'rapid'.", "Weak", "Silent", "Late", "Fast", 3, "Rapid means fast or quick."]
    ]
  },
  {
    title: "General Knowledge",
    category: "General Knowledge",
    difficulty: "Easy",
    description: "Geography, institutions, and general facts.",
    duration: 5,
    questions: [
      ["What is the capital of India?", "Mumbai", "New Delhi", "Kolkata", "Chennai", 1, "New Delhi is India's capital."],
      ["Which is the largest planet in our Solar System?", "Earth", "Saturn", "Jupiter", "Mars", 2, "Jupiter is the largest planet in the Solar System."],
      ["How many days are there in a standard non-leap year?", "360", "364", "366", "365", 3, "A standard non-leap year has 365 days."]
    ]
  },
  {
    title: "Science Fundamentals",
    category: "Science",
    difficulty: "Easy",
    description: "Physics, chemistry, and basic scientific concepts.",
    duration: 5,
    questions: [
      ["What is the chemical symbol for oxygen?", "Ox", "O", "Og", "Oy", 1, "O is the chemical symbol for oxygen."],
      ["What is the SI unit of force?", "Joule", "Watt", "Newton", "Pascal", 2, "Force is measured in newtons."],
      ["Which organelle is the main site of cellular respiration?", "Nucleus", "Ribosome", "Golgi apparatus", "Mitochondrion", 3, "Mitochondria are a major site of aerobic cellular respiration in eukaryotic cells."]
    ]
  },
  {
    title: "Quantitative Aptitude",
    category: "Aptitude",
    difficulty: "Medium",
    description: "Ratios, averages, percentages, and numerical problems.",
    duration: 7,
    questions: [
      ["The ratio 2:3 has a total of 25 units. What is the first share?", "5", "10", "12", "15", 1, "The total parts are 5; each part is 25 / 5 = 5, so the first share is 10."],
      ["What is the average of 4, 8, and 12?", "6", "7", "8", "9", 2, "The average is (4 + 8 + 12) / 3 = 8."],
      ["A price of ₹500 increases by 10%. What is the new price?", "₹510", "₹525", "₹540", "₹550", 3, "Ten percent of 500 is 50, so the new price is ₹550."]
    ]
  },
  {
    title: "Algorithm Analysis",
    category: "Algorithms",
    difficulty: "Medium",
    description: "Complexity, sorting, searching, and algorithmic trade-offs.",
    duration: 7,
    questions: [
      ["What is the worst-case time complexity of merge sort?", "O(n)", "O(n log n)", "O(log n)", "O(n² log n)", 1, "Merge sort has O(n log n) worst-case time complexity."],
      ["Which technique solves a problem by combining smaller subproblems?", "Random guessing", "Linear scanning only", "Divide and conquer", "Busy waiting", 2, "Divide and conquer divides a problem, solves subproblems, and combines their results."],
      ["What is the worst-case time complexity of insertion sort?", "O(log n)", "O(n)", "O(n log n)", "O(n²)", 3, "Insertion sort may perform quadratic work on reverse-sorted input."]
    ]
  },
  {
    title: "Data Structures",
    category: "Data Structures",
    difficulty: "Medium",
    description: "Linked lists, trees, queues, stacks, and hash tables.",
    duration: 7,
    questions: [
      ["Which data structure naturally represents FIFO processing?", "Stack", "Queue", "Binary search tree", "Heap", 1, "A queue follows First In, First Out."],
      ["In a binary tree, what is the maximum number of children per node?", "1", "3", "2", "4", 2, "A binary tree node has at most two children."],
      ["Which structure is commonly used for breadth-first search?", "Stack only", "Priority queue always", "Hash set only", "Queue", 3, "BFS uses a queue to process vertices level by level."]
    ]
  },
  {
    title: "Web Development",
    category: "Web Development",
    difficulty: "Easy",
    description: "Browsers, HTTP, front-end and back-end basics.",
    duration: 5,
    questions: [
      ["Which language primarily structures web page content?", "SQL", "HTML", "Python only", "Bash", 1, "HTML provides the structure and semantic content of web pages."],
      ["Which HTTP status code commonly means Not Found?", "200", "301", "404", "500", 2, "HTTP 404 indicates that the requested resource was not found."],
      ["Which side normally renders CSS styling in a web page?", "Database server only", "DNS resolver", "Mail server", "Browser", 3, "The browser interprets CSS when rendering the page."]
    ]
  },
  {
    title: "Object-Oriented Programming",
    category: "OOP",
    difficulty: "Medium",
    description: "Encapsulation, inheritance, abstraction, and polymorphism.",
    duration: 7,
    questions: [
      ["Which principle bundles data and related methods together?", "Compilation", "Encapsulation", "Recursion", "Indexing", 1, "Encapsulation groups state and behavior and controls access to implementation details."],
      ["What is method overriding?", "Deleting a method", "Changing a variable type", "Providing a subclass implementation of an inherited method", "Calling every method twice", 2, "Overriding provides a new implementation of an inherited method with a compatible signature."],
      ["Which concept allows one interface to have multiple implementations?", "Iteration", "Tokenization", "Serialization", "Polymorphism", 3, "Polymorphism allows different implementations to be used through a shared type or interface."]
    ]
  },
  {
    title: "Cybersecurity Basics",
    category: "Cybersecurity",
    difficulty: "Medium",
    description: "Passwords, encryption, threats, and safe computing.",
    duration: 7,
    questions: [
      ["What does MFA add to authentication?", "A shorter password", "Additional verification factors", "Public access", "An exposed password file", 1, "Multi-factor authentication requires evidence from multiple authentication-factor categories."],
      ["Which is a cryptographic hash function used for password storage when configured appropriately?", "Base64", "Plain text", "Argon2", "URL encoding", 2, "Argon2 is a password-hashing algorithm designed to resist guessing attacks."],
      ["What is phishing?", "A CPU scheduling algorithm", "A backup method", "A file compression format", "A deceptive attempt to obtain sensitive information", 3, "Phishing tricks people into revealing credentials or other sensitive information."]
    ]
  },
  {
    title: "Cloud Computing",
    category: "Cloud Computing",
    difficulty: "Medium",
    description: "Cloud services, scalability, and deployment models.",
    duration: 7,
    questions: [
      ["What does SaaS stand for?", "Storage as a System", "Software as a Service", "Security as a Server", "System as a Stack", 1, "SaaS delivers software to users as a service."],
      ["Which model provides virtual machines and storage infrastructure?", "SaaS", "FaaS only", "IaaS", "DNS", 2, "Infrastructure as a Service provides configurable computing infrastructure."],
      ["What does horizontal scaling generally mean?", "Adding more CPU cores to one machine only", "Increasing one machine's RAM only", "Reducing all server instances", "Adding more machine instances", 3, "Horizontal scaling increases capacity by adding instances or nodes."]
    ]
  },
  {
    title: "Statistics Essentials",
    category: "Statistics",
    difficulty: "Medium",
    description: "Mean, median, probability, and data interpretation.",
    duration: 7,
    questions: [
      ["What is the mean of 2, 4, and 6?", "3", "4", "5", "6", 1, "The mean is (2 + 4 + 6) / 3 = 4."],
      ["What is the median of 1, 3, 9?", "1", "9", "3", "4", 2, "The middle value of the ordered data is 3."],
      ["What is the probability of heads on a fair coin toss?", "0", "1/4", "1", "1/2", 3, "A fair coin has two equally likely outcomes, so heads has probability 1/2."]
    ]
  },
  {
    title: "Economics Basics",
    category: "Economics",
    difficulty: "Easy",
    description: "Supply, demand, markets, and economic indicators.",
    duration: 5,
    questions: [
      ["What does inflation generally mean?", "A fall in every price", "A sustained rise in the general price level", "A rise in production alone", "A fall in population", 1, "Inflation is a sustained increase in the general price level."],
      ["What is a budget deficit?", "Revenue equals spending", "No government expenditure", "Expenditure exceeds revenue", "Exports exceed imports", 2, "A budget deficit occurs when spending exceeds revenue over the relevant period."],
      ["What does GDP measure?", "Only household savings", "Only government debt", "Only imports", "The value of final goods and services produced within an economy", 3, "GDP measures the value of final goods and services produced within an economy over a period."]
    ]
  },
  {
    title: "World History",
    category: "History",
    difficulty: "Easy",
    description: "Major historical periods and important events.",
    duration: 5,
    questions: [
      ["In which year did World War II end?", "1939", "1945", "1918", "1950", 1, "World War II ended in 1945."],
      ["The French Revolution began in which year?", "1776", "1815", "1789", "1848", 2, "The French Revolution began in 1789."],
      ["Which ancient civilization developed along the Nile River?", "Maya", "Inca", "Indus Valley only", "Ancient Egyptian civilization", 3, "Ancient Egyptian civilization developed along the Nile."]
    ]
  },
  {
    title: "Geography Challenge",
    category: "Geography",
    difficulty: "Easy",
    description: "Continents, oceans, landforms, and world geography.",
    duration: 5,
    questions: [
      ["Which is the largest ocean on Earth?", "Atlantic", "Pacific", "Indian", "Arctic", 1, "The Pacific Ocean is the largest ocean."],
      ["Which continent contains the Sahara Desert?", "Asia", "Australia", "Africa", "Europe", 2, "The Sahara is located in northern Africa."],
      ["Which line divides Earth into the Northern and Southern Hemispheres?", "Prime Meridian", "Tropic of Cancer", "Arctic Circle", "Equator", 3, "The Equator is at latitude 0°."]
    ]
  },
  {
    title: "Current Affairs Practice",
    category: "Current Affairs",
    difficulty: "Medium",
    description: "Practice format for contemporary affairs and verification.",
    duration: 7,
    questions: [
      ["Which source is generally most appropriate for verifying a new Indian government policy?", "An anonymous social media post", "The relevant official government publication", "An unverified forwarded message", "An undated screenshot", 1, "Official government publications are primary sources for the policies they announce."],
      ["When checking a news claim, which detail helps establish its timeliness?", "Font size", "Number of emojis", "Publication date and time", "Image brightness", 2, "Publication dates and timestamps help establish when a report was issued."],
      ["What is the best approach when two reports contradict each other?", "Accept the more dramatic headline", "Share both without checking", "Assume the older one is correct", "Check primary sources and independently corroborate the claim", 3, "Cross-checking primary sources and reliable independent reporting helps resolve conflicting claims."]
    ]
  },
  {
    title: "Technical Interview Prep",
    category: "Interview Preparation",
    difficulty: "Hard",
    description: "Core CS concepts and common software engineering questions.",
    duration: 10,
    questions: [
      ["Why is Big O notation useful?", "It gives exact runtime on every machine", "It describes asymptotic growth of resource usage", "It replaces all testing", "It measures only code length", 1, "Big O describes an asymptotic upper bound on growth."],
      ["What is a race condition?", "A syntax error", "A guaranteed deadlock", "An outcome dependent on timing of concurrent operations", "A slow network connection only", 2, "A race condition occurs when correctness depends on the timing or ordering of concurrent operations."],
      ["What is the purpose of unit testing?", "To replace every integration test", "To benchmark the internet", "To deploy automatically", "To test small units of software in isolation", 3, "Unit tests verify the behavior of individual units, ideally with controlled dependencies."]
    ]
  },
  {
    title: "JavaScript Async & APIs",
    category: "JavaScript",
    difficulty: "Hard",
    description: "Promises, asynchronous code, HTTP requests, and errors.",
    duration: 10,
    questions: [
      ["What does an async function always return?", "A string", "A Promise", "An array", "A synchronous iterator", 1, "Calling an async function returns a Promise."],
      ["Which HTTP method is commonly used to retrieve a resource?", "POST", "PATCH", "GET", "DELETE", 2, "GET is used to retrieve a representation of a resource."],
      ["What does await do inside an async function?", "Blocks the entire JavaScript runtime", "Deletes a Promise", "Guarantees success", "Suspends that async function until the awaited result settles", 3, "await pauses that async function's progress while the Promise settles; it does not block the entire runtime."]
    ]
  },
  {
    title: "Frontend Interview Challenge",
    category: "Web Development",
    difficulty: "Hard",
    description: "Responsive design, browser behavior, accessibility, and APIs.",
    duration: 10,
    questions: [
      ["What is event delegation?", "Attaching a listener to every future element manually", "Handling descendant events through a shared ancestor listener", "Disabling browser events", "Replacing HTML with JSON", 1, "Event delegation uses bubbling to handle events from descendants at a shared ancestor."],
      ["What is the main purpose of semantic HTML?", "To make every page animated", "To replace CSS", "To give content meaningful structure", "To prevent every security issue", 2, "Semantic elements express the role and structure of content."],
      ["Which CSS feature is useful for layouts with two-dimensional rows and columns?", "Float", "Text transform", "Visibility", "Grid", 3, "CSS Grid supports two-dimensional row-and-column layouts."]
    ]
  }
];

/* =========================================================
   STATE AND STORAGE
========================================================= */

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (error) {
    console.warn("Could not read browser storage:", error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Could not save browser storage:", error);
    showToast("Unable to save data. Browser storage may be full or disabled.", "error");
    return false;
  }
}

function makeId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return "qf-" + Date.now().toString(36) +
    "-" + Math.random().toString(36).slice(2, 10);
}

function normalizeQuestion(question, index) {
  if (!question || typeof question !== "object") return null;

  const options = Array.isArray(question.options)
    ? question.options.map(option => String(option))
    : [];

  if (
    typeof question.question !== "string" ||
    question.question.trim() === "" ||
    options.length !== 4 ||
    options.some(option => !option.trim()) ||
    !Number.isInteger(question.correctIndex) ||
    question.correctIndex < 0 ||
    question.correctIndex > 3
  ) {
    return null;
  }

  return {
    id: question.id || makeId(),
    question: question.question.trim(),
    options,
    correctIndex: question.correctIndex,
    explanation: String(question.explanation || ""),
    marks: Number.isFinite(Number(question.marks))
      ? Math.max(0, Number(question.marks))
      : 1,
    negativeMarks: Number.isFinite(Number(question.negativeMarks))
      ? Math.max(0, Number(question.negativeMarks))
      : 0
  };
}

function normalizeQuiz(quiz) {
  if (!quiz || typeof quiz !== "object") return null;

  if (
    typeof quiz.title !== "string" ||
    !quiz.title.trim() ||
    typeof quiz.category !== "string" ||
    !quiz.category.trim() ||
    !Array.isArray(quiz.questions)
  ) {
    return null;
  }

  const questions = quiz.questions
    .map(normalizeQuestion)
    .filter(Boolean);

  if (!questions.length || questions.length !== quiz.questions.length) {
    return null;
  }

  return {
    id: quiz.id || makeId(),
    title: quiz.title.trim(),
    category: quiz.category.trim(),
    description: String(quiz.description || ""),
    difficulty: ["Easy", "Medium", "Hard"].includes(quiz.difficulty)
      ? quiz.difficulty
      : "Easy",
    duration: Math.max(1, Math.min(240, Number(quiz.duration) || 5)),
    published: quiz.published !== false,
    createdAt: quiz.createdAt || new Date().toISOString(),
    questions
  };
}

function convertStarterQuiz(quiz) {
  return normalizeQuiz({
    ...quiz,
    id: makeId(),
    published: true,
    questions: quiz.questions.map(row => ({
      question: row[0],
      options: row.slice(1, 5),
      correctIndex: row[5],
      explanation: row[6],
      marks: 1,
      negativeMarks: 0
    }))
  });
}

function loadQuizzes() {
  const stored = readStorage(STORAGE.quizzes, null);

  if (Array.isArray(stored)) {
    return stored.map(normalizeQuiz).filter(Boolean);
  }

  const initial = STARTER_DATA.map(convertStarterQuiz).filter(Boolean);

  writeStorage(STORAGE.quizzes, initial);
  return initial;
}

let quizzes = loadQuizzes();
let attempts = readStorage(STORAGE.attempts, []);

if (!Array.isArray(attempts)) attempts = [];

let currentPage = "dashboard";
let activeQuiz = null;
let activeAttempt = null;
let currentQuestionIndex = 0;
let answers = {};
let markedQuestions = new Set();
let remainingSeconds = 0;
let timerInterval = null;
let attemptStartedAt = null;
let quizSearch = "";
let quizCategory = "all";
let quizDifficulty = "all";
let adminSearch = "";
let editingQuizId = null;
let editorQuestions = [];
let modalPreviousFocus = null;
let theme = readStorage(STORAGE.theme, "dark");

/* =========================================================
   SHARED UTILITIES
========================================================= */

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function formatTime(seconds) {
  const safe = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safe / 60);
  const remainder = safe % 60;

  return String(minutes).padStart(2, "0") +
    ":" + String(remainder).padStart(2, "0");
}

function formatDate(date) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Unknown date";

  return parsed.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function totalMarks(quiz) {
  return quiz.questions.reduce(
    (sum, question) => sum + question.marks,
    0
  );
}

function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] || "fa-solid fa-book-open";
}

function getPublishedQuizzes() {
  return quizzes.filter(quiz => quiz.published);
}

function persistQuizzes() {
  return writeStorage(STORAGE.quizzes, quizzes);
}

function persistAttempts() {
  return writeStorage(STORAGE.attempts, attempts);
}

function showToast(message, type = "info") {
  const container = $("#toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast " + (
    ["error", "success"].includes(type) ? type : ""
  );

  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3500);
}

function setTheme(nextTheme) {
  theme = nextTheme === "light" ? "light" : "dark";

  document.body.classList.toggle("light-theme", theme === "light");

  const icon = $("#theme-toggle i");
  if (icon) {
    icon.className = theme === "light"
      ? "fa-solid fa-sun"
      : "fa-solid fa-moon";
  }

  writeStorage(STORAGE.theme, theme);
}

function setPageTitle(title) {
  const breadcrumb = $("#breadcrumb-current");
  if (breadcrumb) breadcrumb.textContent = title;
  document.title = "QuizForge | " + title;
}

function updateNavigation(page) {
  $$(".nav-link").forEach(button => {
    button.classList.toggle("active", button.dataset.page === page);
  });

  $("#sidebar")?.classList.remove("open");
}

function closeModal() {
  const overlay = $("#modal-overlay");
  if (!overlay) return;

  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (modalPreviousFocus?.isConnected) {
    modalPreviousFocus.focus();
  }
}

function openModal(title, message, actions = []) {
  const overlay = $("#modal-overlay");
  const content = $("#modal-content");

  if (!overlay || !content) return;

  modalPreviousFocus = document.activeElement;

  content.innerHTML = `
    <h2 id="modal-title">${escapeHTML(title)}</h2>
    <p id="modal-message">${escapeHTML(message)}</p>
    <div class="form-actions">
      ${actions.map((action, index) => `
        <button
          type="button"
          class="btn ${action.primary ? "btn-primary" : "btn-secondary"}"
          data-modal-action="${index}">
          ${escapeHTML(action.label)}
        </button>
      `).join("")}
    </div>
  `;

  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  $$("[data-modal-action]", content).forEach(button => {
    button.addEventListener("click", () => {
      const action = actions[Number(button.dataset.modalAction)];
      if (action) action.run();
    });
  });

  $(".modal-close")?.focus();
}

function getAttemptStats() {
  const completed = attempts.filter(attempt => attempt.completed);

  const average = completed.length
    ? completed.reduce((sum, attempt) => sum + attempt.percentage, 0) /
      completed.length
    : 0;

  return {
    total: completed.length,
    average,
    best: completed.length
      ? Math.max(...completed.map(attempt => attempt.percentage))
      : 0
  };
}

/* =========================================================
   PAGE ROUTER
========================================================= */

function navigate(page) {
  if (activeAttempt && !activeAttempt.submitted &&
      ["dashboard", "explore", "exams", "history", "admin"].includes(page)) {
    openModal(
      "Leave this exam?",
      "Your current exam is in progress. Leaving will discard this attempt.",
      [
        {
          label: "Stay here",
          run: closeModal
        },
        {
          label: "Leave exam",
          primary: true,
          run: () => {
            clearInterval(timerInterval);
            timerInterval = null;
            activeAttempt = null;
            activeQuiz = null;
            answers = {};
            markedQuestions.clear();
            closeModal();
            navigate(page);
          }
        }
      ]
    );
    return;
  }

  currentPage = page;
  updateNavigation(page);

  const hero = $(".welcome-section");
  const dashboardContent = $("#dashboard-content");

  if (hero) hero.classList.toggle("hidden", page !== "dashboard");
  if (dashboardContent) dashboardContent.classList.add("hidden");

  const container = $("#page-container");
  if (!container) return;

  switch (page) {
    case "dashboard":
      setPageTitle("Dashboard");
      if (dashboardContent) {
        dashboardContent.classList.remove("hidden");
        renderDashboard();
      }
      break;

    case "explore":
      setPageTitle("Explore quizzes");
      renderExplore(container);
      break;

    case "exams":
      setPageTitle("Timed exams");
      renderExams(container);
      break;

    case "history":
      setPageTitle("My performance");
      renderHistory(container);
      break;

    case "admin":
      setPageTitle("Admin panel");
      renderAdmin(container);
      break;

    case "take-quiz":
      setPageTitle(activeQuiz?.title || "Quiz");
      renderExam();
      break;

    case "results":
      setPageTitle("Exam results");
      renderResults(container);
      break;

    default:
      currentPage = "dashboard";
      navigate("dashboard");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================================================
   QUIZ CARD RENDERER
========================================================= */

function quizCardHTML(quiz) {
  const difficulty = quiz.difficulty.toLowerCase();
  const count = quiz.questions.length;
  const quizId = escapeHTML(quiz.id);

  return `
    <article class="quiz-card fade-in">
      <div class="quiz-card-top">
        <div class="category-icon">
          <i class="${escapeHTML(getCategoryIcon(quiz.category))}"></i>
        </div>
        <span class="difficulty ${difficulty}">
          ${escapeHTML(quiz.difficulty)}
        </span>
      </div>

      <h3>${escapeHTML(quiz.title)}</h3>
      <p>${escapeHTML(quiz.description)}</p>

      <div class="quiz-meta">
        <span><i class="fa-regular fa-circle-question"></i>
          ${count} questions</span>
        <span><i class="fa-regular fa-clock"></i>
          ${quiz.duration} min</span>
        <span><i class="fa-solid fa-star"></i>
          ${totalMarks(quiz)} marks</span>
      </div>

      <button class="btn btn-secondary"
        data-start-quiz="${quizId}">
        Start quiz <i class="fa-solid fa-arrow-right"></i>
      </button>
    </article>
  `;
}

function emptyStateHTML(icon, title, description, buttonText = "") {
  return `
    <div class="empty-state">
      <div class="empty-icon"><i class="${escapeHTML(icon)}"></i></div>
      <h3>${escapeHTML(title)}</h3>
      <p>${escapeHTML(description)}</p>
      ${buttonText ? `
        <button class="btn btn-primary" data-page="explore">
          ${escapeHTML(buttonText)}
        </button>` : ""}
    </div>
  `;
}

/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {
  const container = $("#dashboard-content");
  if (!container) return;

  const published = getPublishedQuizzes();
  const stats = getAttemptStats();
  const recent = attempts
    .filter(attempt => attempt.completed)
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  container.innerHTML = `
    <section class="stats-grid fade-in">
      <article class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon"><i class="fa-solid fa-book-open"></i></div>
          <span class="stat-trend">AVAILABLE</span>
        </div>
        <div class="stat-value">${published.length}</div>
        <div class="stat-label">Published quizzes</div>
      </article>

      <article class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon"><i class="fa-solid fa-stopwatch"></i></div>
          <span class="stat-trend">COMPLETED</span>
        </div>
        <div class="stat-value">${stats.total}</div>
        <div class="stat-label">Exams attempted</div>
      </article>

      <article class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon"><i class="fa-solid fa-chart-line"></i></div>
          <span class="stat-trend">AVERAGE</span>
        </div>
        <div class="stat-value">${stats.average.toFixed(1)}%</div>
        <div class="stat-label">Average percentage</div>
      </article>

      <article class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon"><i class="fa-solid fa-trophy"></i></div>
          <span class="stat-trend">PERSONAL BEST</span>
        </div>
        <div class="stat-value">${stats.best.toFixed(1)}%</div>
        <div class="stat-label">Highest percentage</div>
      </article>
    </section>

    <section class="content-section">
      <div class="section-heading">
        <div>
          <h2>Popular practice quizzes</h2>
          <p>Choose a topic and improve one question at a time.</p>
        </div>
        <button class="text-button" data-page="explore">
          View all <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div class="quiz-grid">
        ${published.slice(0, 3).map(quizCardHTML).join("")}
      </div>
    </section>

    <section class="content-section dashboard-grid">
      <div class="panel">
        <div class="panel-header">
          <div>
            <h3>Recent attempts</h3>
            <p>Your latest completed quizzes</p>
          </div>
          <button class="text-button" data-page="history">History</button>
        </div>

        ${recent.length ? `
          <div class="history-list">
            ${recent.map(attempt => `
              <div class="history-item">
                <div>
                  <h3>${escapeHTML(attempt.quizTitle)}</h3>
                  <p>${escapeHTML(attempt.category)} · ${escapeHTML(formatDate(attempt.date))}</p>
                </div>
                <div class="history-score">
                  ${Number(attempt.percentage).toFixed(1)}%
                </div>
              </div>
            `).join("")}
          </div>
        ` : emptyStateHTML(
          "fa-solid fa-chart-simple",
          "Your journey starts here",
          "Complete a quiz to see your scores and progress."
        )}
      </div>

      <div class="panel">
        <div class="panel-header">
          <div>
            <h3>Quick actions</h3>
            <p>Jump into your next task</p>
          </div>
        </div>

        <div class="history-list">
          <button class="btn btn-primary btn-full" data-page="explore">
            <i class="fa-solid fa-compass"></i> Explore all quizzes
          </button>

          <button class="btn btn-secondary btn-full" data-page="exams">
            <i class="fa-solid fa-stopwatch"></i> Timed examination
          </button>

          <button class="btn btn-secondary btn-full" data-page="history">
            <i class="fa-solid fa-chart-line"></i> Review performance
          </button>

          <button class="btn btn-secondary btn-full" data-page="admin">
            <i class="fa-solid fa-shield-halved"></i> Manage quizzes
          </button>
        </div>
      </div>
    </section>
  `;
}

/* =========================================================
   EXPLORE AND FILTER
========================================================= */

function renderExplore(container) {
  container.innerHTML = `
    <section class="content-section fade-in">
      <div class="section-heading">
        <div>
          <h2>Explore the library</h2>
          <p>Search subjects, compare difficulty, and start practicing.</p>
        </div>
        <span class="badge orange" id="quiz-count"></span>
      </div>

      <div class="quiz-filters">
        <label class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input id="quiz-search" type="search"
            placeholder="Search quizzes or subjects..."
            value="${escapeHTML(quizSearch)}"
            aria-label="Search quizzes">
        </label>

        <select id="quiz-category" class="filter-select"
          aria-label="Filter by category">
          <option value="all">All subjects</option>
          ${CATEGORIES.map(category => `
            <option value="${escapeHTML(category)}"
              ${quizCategory === category ? "selected" : ""}>
              ${escapeHTML(category)}
            </option>
          `).join("")}
        </select>

        <select id="quiz-difficulty" class="filter-select"
          aria-label="Filter by difficulty">
          <option value="all">All levels</option>
          ${["Easy", "Medium", "Hard"].map(level => `
            <option value="${level}"
              ${quizDifficulty === level ? "selected" : ""}>
              ${level}
            </option>
          `).join("")}
        </select>
      </div>

      <div class="quiz-grid" id="explore-grid"></div>
    </section>
  `;

  const search = $("#quiz-search");
  const category = $("#quiz-category");
  const difficulty = $("#quiz-difficulty");

  search.addEventListener("input", () => {
    quizSearch = search.value;
    renderExploreGrid();
  });

  category.addEventListener("change", () => {
    quizCategory = category.value;
    renderExploreGrid();
  });

  difficulty.addEventListener("change", () => {
    quizDifficulty = difficulty.value;
    renderExploreGrid();
  });

  renderExploreGrid();
}

function renderExploreGrid() {
  const grid = $("#explore-grid");
  if (!grid) return;

  const query = quizSearch.trim().toLowerCase();

  const filtered = getPublishedQuizzes().filter(quiz => {
    const searchable = [
      quiz.title,
      quiz.category,
      quiz.description
    ].join(" ").toLowerCase();

    return searchable.includes(query) &&
      (quizCategory === "all" || quiz.category === quizCategory) &&
      (quizDifficulty === "all" || quiz.difficulty === quizDifficulty);
  });

  const count = $("#quiz-count");
  if (count) count.textContent = `${filtered.length} quizzes`;

  grid.innerHTML = filtered.length
    ? filtered.map(quizCardHTML).join("")
    : `<div style="grid-column:1/-1">
        ${emptyStateHTML(
          "fa-solid fa-magnifying-glass",
          "No quizzes found",
          "Try another search or change your filters."
        )}
      </div>`;
}

/* =========================================================
   TIMED EXAMS
========================================================= */

function renderExams(container) {
  const published = getPublishedQuizzes();

  container.innerHTML = `
    <section class="content-section fade-in">
      <div class="section-heading">
        <div>
          <h2>Timed examinations</h2>
          <p>Practice managing time and answering under exam conditions.</p>
        </div>
        <span class="badge red">
          <i class="fa-solid fa-clock"></i> Timed mode
        </span>
      </div>

      <div class="panel mb-20">
        <div class="panel-header">
          <div>
            <h3>Exam rules</h3>
            <p>Review these before starting.</p>
          </div>
        </div>

        <div class="history-list">
          <p><i class="fa-solid fa-check text-orange"></i>
            Each exam has a countdown timer.</p>
          <p><i class="fa-solid fa-check text-orange"></i>
            You can navigate between questions.</p>
          <p><i class="fa-solid fa-check text-orange"></i>
            You can mark questions for review.</p>
          <p><i class="fa-solid fa-check text-orange"></i>
            The exam submits automatically when time expires.</p>
          <p><i class="fa-solid fa-triangle-exclamation text-orange"></i>
            Leaving the exam discards the current attempt.</p>
        </div>
      </div>

      <div class="quiz-grid">
        ${published.length
          ? published.map(quizCardHTML).join("")
          : emptyStateHTML("fa-solid fa-book", "No exams available",
            "An administrator needs to publish a quiz.")}
      </div>
    </section>
  `;
}

/* =========================================================
   START AN ATTEMPT
========================================================= */

function startQuiz(quizId) {
  const quiz = quizzes.find(item =>
    item.id === quizId && item.published
  );

  if (!quiz) {
    showToast("This quiz is unavailable or unpublished.", "error");
    return;
  }

  activeQuiz = quiz;
  activeAttempt = {
    id: makeId(),
    quizId: quiz.id,
    quizTitle: quiz.title,
    category: quiz.category,
    date: new Date().toISOString(),
    completed: false,
    submitted: false
  };

  answers = {};
  markedQuestions = new Set();
  currentQuestionIndex = 0;
  remainingSeconds = quiz.duration * 60;
  attemptStartedAt = Date.now();

  navigate("take-quiz");
  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (!activeAttempt || activeAttempt.submitted) {
      clearInterval(timerInterval);
      return;
    }

    remainingSeconds--;

    const timer = $("#exam-timer");
    if (timer) {
      timer.textContent = formatTime(remainingSeconds);
      timer.closest(".timer-box")?.classList.toggle(
        "danger", remainingSeconds <= 60
      );
    }

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;

      showToast("Time is up. Submitting your exam.", "error");
      submitQuiz(true);
    }
  }, 1000);
}

/* =========================================================
   EXAM RENDERING
========================================================= */

function renderExam() {
  if (!activeQuiz || !activeAttempt) return;

  const container = $("#page-container");
  if (!container) return;

  const question = activeQuiz.questions[currentQuestionIndex];
  const total = activeQuiz.questions.length;
  const selected = answers[question.id];
  const answeredCount = Object.keys(answers).length;

  container.innerHTML = `
    <section class="content-section fade-in">
      <div class="exam-layout">
        <div class="exam-main">
          <div class="exam-header">
            <div>
              <h2>${escapeHTML(activeQuiz.title)}</h2>
              <p class="exam-subtitle">
                ${escapeHTML(activeQuiz.category)} ·
                ${total} questions · ${totalMarks(activeQuiz)} marks
              </p>
            </div>

            <div class="timer-box">
              <i class="fa-regular fa-clock"></i>
              <span id="exam-timer">${formatTime(remainingSeconds)}</span>
            </div>
          </div>

          <div class="question-progress">
            <div class="question-progress-fill"
              style="width:${((currentQuestionIndex + 1) / total) * 100}%">
            </div>
          </div>

          <div class="question-topline">
            <span class="question-number">
              QUESTION ${currentQuestionIndex + 1} OF ${total}
            </span>

            <span>${question.marks} mark${question.marks === 1 ? "" : "s"}</span>
          </div>

          <h3 class="question-title">
            ${escapeHTML(question.question)}
          </h3>

          <div class="options-list">
            ${question.options.map((option, index) => `
              <button type="button"
                class="option-item ${selected === index ? "selected" : ""}"
                data-answer="${index}"
                aria-pressed="${selected === index}">
                <span class="option-marker">
                  ${String.fromCharCode(65 + index)}
                </span>
                <span class="option-text">${escapeHTML(option)}</span>
              </button>
            `).join("")}
          </div>

          <div class="exam-actions">
            <div class="exam-actions-left">
              <button class="btn btn-secondary"
                data-exam-action="previous"
                ${currentQuestionIndex === 0 ? "disabled" : ""}>
                <i class="fa-solid fa-arrow-left"></i> Previous
              </button>

              <button class="btn review-button"
                data-exam-action="mark">
                <i class="fa-solid fa-bookmark"></i>
                ${markedQuestions.has(question.id)
                  ? "Unmark review" : "Mark review"}
              </button>
            </div>

            <div class="exam-actions-right">
              ${currentQuestionIndex < total - 1 ? `
                <button class="btn btn-primary"
                  data-exam-action="next">
                  Next <i class="fa-solid fa-arrow-right"></i>
                </button>
              ` : `
                <button class="btn btn-primary"
                  data-exam-action="submit">
                  Submit exam
                </button>
              `}
            </div>
          </div>
        </div>

        <aside class="exam-sidebar">
          <div class="panel-header">
            <div>
              <h3>Question palette</h3>
              <p>${answeredCount} of ${total} answered</p>
            </div>
          </div>

          <div class="question-palette">
            ${activeQuiz.questions.map((item, index) => {
              const isAnswered = Object.hasOwn(answers, item.id);
              const isMarked = markedQuestions.has(item.id);

              return `
                <button class="palette-item
                  ${index === currentQuestionIndex ? "current" : ""}
                  ${isAnswered ? "answered" : ""}
                  ${isMarked ? "marked" : ""}"
                  data-question-index="${index}"
                  aria-label="Go to question ${index + 1}">
                  ${index + 1}
                </button>
              `;
            }).join("")}
          </div>

          <div class="palette-legend">
            <div class="legend-item">
              <span class="legend-square answered"></span> Answered
            </div>
            <div class="legend-item">
              <span class="legend-square marked"></span> Marked for review
            </div>
            <div class="legend-item">
              <span class="legend-square unanswered"></span> Unanswered
            </div>
          </div>

          <div class="divider"></div>

          <div class="history-list">
            <p>Remaining:
              <strong class="text-orange">${total - answeredCount}</strong>
            </p>
            <p>For review:
              <strong class="text-orange">${markedQuestions.size}</strong>
            </p>
          </div>

          <button class="btn btn-primary btn-full mt-20"
            data-exam-action="submit">
            Finish examination
          </button>
        </aside>
      </div>
    </section>
  `;
}

/* =========================================================
   EXAM EVENTS
========================================================= */

function selectAnswer(index) {
  if (!activeQuiz || !activeAttempt) return;

  const question = activeQuiz.questions[currentQuestionIndex];
  if (!question || index < 0 || index > 3) return;

  answers[question.id] = index;
  renderExam();
}

function moveQuestion(index) {
  if (!activeQuiz) return;

  if (index < 0 || index >= activeQuiz.questions.length) return;

  currentQuestionIndex = index;
  renderExam();
}

function toggleMarkedQuestion() {
  const question = activeQuiz.questions[currentQuestionIndex];

  if (markedQuestions.has(question.id)) {
    markedQuestions.delete(question.id);
  } else {
    markedQuestions.add(question.id);
  }

  renderExam();
}

/* =========================================================
   SCORING AND SUBMISSION
========================================================= */

function calculateResults(quiz, selectedAnswers) {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  let earnedMarks = 0;
  let maxMarks = 0;

  const details = quiz.questions.map(question => {
    const selected = selectedAnswers[question.id];
    const hasAnswer = Number.isInteger(selected);

    maxMarks += question.marks;

    let status;

    if (!hasAnswer) {
      status = "unanswered";
      unanswered++;
    } else if (selected === question.correctIndex) {
      status = "correct";
      correct++;
      earnedMarks += question.marks;
    } else {
      status = "incorrect";
      incorrect++;
      earnedMarks -= question.negativeMarks;
    }

    return {
      questionId: question.id,
      question: question.question,
      options: question.options.slice(),
      selectedIndex: hasAnswer ? selected : null,
      correctIndex: question.correctIndex,
      explanation: question.explanation,
      status,
      marks: question.marks,
      negativeMarks: question.negativeMarks
    };
  });

  earnedMarks = Math.max(0, earnedMarks);

  return {
    correct,
    incorrect,
    unanswered,
    earnedMarks,
    maxMarks,
    percentage: maxMarks > 0 ? earnedMarks / maxMarks * 100 : 0,
    details
  };
}

function submitQuiz(autoSubmitted = false) {
  if (!activeQuiz || !activeAttempt || activeAttempt.submitted) return;

  if (!autoSubmitted) {
    const unanswered = activeQuiz.questions.filter(
      question => !Object.hasOwn(answers, question.id)
    ).length;

    openModal(
      "Submit your examination?",
      `You have ${unanswered} unanswered question(s). Once submitted, your answers cannot be changed.`,
      [
        {
          label: "Continue exam",
          run: closeModal
        },
        {
          label: "Submit now",
          primary: true,
          run: () => {
            closeModal();
            finalizeQuiz(false);
          }
        }
      ]
    );

    return;
  }

  finalizeQuiz(true);
}

function finalizeQuiz(autoSubmitted) {
  if (!activeQuiz || !activeAttempt || activeAttempt.submitted) return;

  clearInterval(timerInterval);
  timerInterval = null;

  const result = calculateResults(activeQuiz, answers);
  const elapsedSeconds = Math.max(
    0,
    Math.floor((Date.now() - attemptStartedAt) / 1000)
  );

  const completedAttempt = {
    ...activeAttempt,
    completed: true,
    submitted: true,
    autoSubmitted,
    elapsedSeconds,
    durationSeconds: activeQuiz.duration * 60,
    answers: { ...answers },
    markedQuestionIds: [...markedQuestions],
    ...result
  };

  attempts.unshift(completedAttempt);

  if (attempts.length > 200) attempts = attempts.slice(0, 200);

  persistAttempts();

  activeAttempt = { ...completedAttempt };
  navigate("results");

  showToast("Examination submitted successfully.", "success");
}

/* =========================================================
   RESULT SCREEN
========================================================= */

function renderResults(container) {
  const result = activeAttempt;

  if (!result || !result.completed) {
    container.innerHTML = emptyStateHTML(
      "fa-solid fa-circle-exclamation",
      "No result available",
      "Complete an exam to view its results.",
      "Explore quizzes"
    );
    return;
  }

  const percentage = Number(result.percentage) || 0;
  const performanceLabel = percentage >= 80
    ? "Excellent performance!"
    : percentage >= 60
      ? "Good work. Keep improving!"
      : percentage >= 40
        ? "A solid start. Practice more!"
        : "Keep learning and try again!";

  container.innerHTML = `
    <section class="content-section fade-in">
      <div class="section-heading">
        <div>
          <div class="eyebrow">EXAM COMPLETED</div>
          <h2>Your results</h2>
          <p>Review your score, answers, and explanations.</p>
        </div>
        <span class="badge green">
          <i class="fa-solid fa-check"></i> Submitted
        </span>
      </div>

      <div class="result-hero">
        <div class="result-summary">
          <div class="score-ring">
            <strong>${percentage.toFixed(1)}%</strong>
            <span>Final score</span>
          </div>

          <div>
            <h2>${escapeHTML(performanceLabel)}</h2>
            <p>
              ${escapeHTML(result.quizTitle)}<br>
              ${escapeHTML(result.category)} ·
              ${escapeHTML(formatDate(result.date))}
            </p>

            <p>
              Marks obtained:
              <strong class="text-orange">
                ${Number(result.earnedMarks).toFixed(2)}
                / ${Number(result.maxMarks).toFixed(2)}
              </strong>
            </p>

            <p>
              Time taken: ${formatTime(result.elapsedSeconds)}
              ${result.autoSubmitted ? " · Automatically submitted" : ""}
            </p>

            <div class="flex flex-wrap gap-sm">
              <button class="btn btn-primary"
                data-review-toggle="true">
                <i class="fa-solid fa-list-check"></i> Review answers
              </button>

              <button class="btn btn-secondary"
                data-page="explore">
                Try another quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="result-stats">
        <div class="result-stat correct">
          <strong>${result.correct}</strong>
          <span>Correct answers</span>
        </div>

        <div class="result-stat wrong">
          <strong>${result.incorrect}</strong>
          <span>Incorrect answers</span>
        </div>

        <div class="result-stat skipped">
          <strong>${result.unanswered}</strong>
          <span>Unanswered</span>
        </div>

        <div class="result-stat">
          <strong>${result.details.length}</strong>
          <span>Total questions</span>
        </div>
      </div>

      <div class="content-section">
        <div class="panel-header">
          <div>
            <h3>Answer analysis</h3>
            <p>Understand the correct answer to each question.</p>
          </div>
        </div>

        <div id="answer-review" class="review-list hidden">
          ${result.details.map((detail, index) => `
            <article class="review-question">
              <div class="question-topline">
                <span class="question-number">
                  QUESTION ${index + 1}
                </span>
                <span class="badge ${
                  detail.status === "correct" ? "green" :
                  detail.status === "incorrect" ? "red" : "orange"
                }">
                  ${escapeHTML(detail.status)}
                </span>
              </div>

              <h3>${escapeHTML(detail.question)}</h3>

              <div class="review-answer ${
                detail.status === "correct" ? "correct" :
                detail.status === "incorrect" ? "wrong" : ""
              }">
                Your answer:
                ${detail.selectedIndex === null
                  ? "Not answered"
                  : escapeHTML(detail.options[detail.selectedIndex])}
              </div>

              <div class="review-answer correct">
                Correct answer:
                ${escapeHTML(detail.options[detail.correctIndex])}
              </div>

              ${detail.explanation ? `
                <div class="review-explanation">
                  <strong>Explanation:</strong>
                  ${escapeHTML(detail.explanation)}
                </div>
              ` : ""}
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

/* =========================================================
   HISTORY AND ANALYTICS
========================================================= */

function renderHistory(container) {
  const completed = attempts
    .filter(attempt => attempt.completed)
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const stats = getAttemptStats();

  const byCategory = {};

  completed.forEach(attempt => {
    if (!byCategory[attempt.category]) {
      byCategory[attempt.category] = [];
    }

    byCategory[attempt.category].push(attempt.percentage);
  });

  const categories = Object.entries(byCategory).map(
    ([category, scores]) => ({
      category,
      average: scores.reduce((sum, score) => sum + score, 0) /
        scores.length
    })
  ).sort((a, b) => b.average - a.average);

  container.innerHTML = `
    <section class="content-section fade-in">
      <div class="section-heading">
        <div>
          <h2>My performance</h2>
          <p>Track your completed attempts and progress by subject.</p>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-check-double"></i></div>
          <div class="stat-value">${stats.total}</div>
          <div class="stat-label">Completed attempts</div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-chart-line"></i></div>
          <div class="stat-value">${stats.average.toFixed(1)}%</div>
          <div class="stat-label">Average score</div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-trophy"></i></div>
          <div class="stat-value">${stats.best.toFixed(1)}%</div>
          <div class="stat-label">Personal best</div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-book-open"></i></div>
          <div class="stat-value">${new Set(completed.map(a => a.quizId)).size}</div>
          <div class="stat-label">Different quizzes attempted</div>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="panel">
          <div class="panel-header">
            <div>
              <h3>Subject performance</h3>
              <p>Average score for each attempted subject.</p>
            </div>
          </div>

          ${categories.length ? `
            <div class="bar-chart">
              ${categories.map(item => `
                <div class="bar-row">
                  <span class="bar-label">${escapeHTML(item.category)}</span>
                  <div class="bar-track">
                    <div class="bar-fill"
                      style="width:${Math.max(0, Math.min(100, item.average))}%">
                    </div>
                  </div>
                  <span class="bar-value">${item.average.toFixed(0)}%</span>
                </div>
              `).join("")}
            </div>
          ` : `<p>Complete some quizzes to see subject performance.</p>`}
        </div>

        <div class="panel">
          <div class="panel-header">
            <div>
              <h3>Study suggestions</h3>
              <p>Simple ways to improve.</p>
            </div>
          </div>

          <div class="history-list">
            <p><i class="fa-solid fa-bullseye text-orange"></i>
              Focus on subjects with lower average scores.</p>
            <p><i class="fa-solid fa-rotate text-orange"></i>
              Review incorrect answers after each attempt.</p>
            <p><i class="fa-solid fa-clock text-orange"></i>
              Use timed exams to practice time management.</p>
          </div>

          <button class="btn btn-primary btn-full mt-20"
            data-page="explore">Practice now</button>
        </div>
      </div>

      <div class="content-section mt-20">
        <div class="section-heading">
          <div>
            <h2>Attempt history</h2>
            <p>Your saved results, newest first.</p>
          </div>
        </div>

        ${completed.length ? `
          <div class="history-list">
            ${completed.map(attempt => `
              <article class="history-item">
                <div>
                  <h3>${escapeHTML(attempt.quizTitle)}</h3>
                  <p>
                    ${escapeHTML(attempt.category)} ·
                    ${escapeHTML(formatDate(attempt.date))} ·
                    ${attempt.correct} correct
                  </p>
                </div>

                <div class="history-score">
                  ${Number(attempt.percentage).toFixed(1)}%
                </div>
              </article>
            `).join("")}
          </div>
        ` : emptyStateHTML(
          "fa-solid fa-chart-line",
          "No attempts yet",
          "Your results will appear here after your first completed quiz.",
          "Explore quizzes"
        )}
      </div>
    </section>
  `;
}

/* =========================================================
   ADMIN PANEL
========================================================= */

function renderAdmin(container) {
  container.innerHTML = `
    <section class="content-section fade-in">
      <div class="admin-header">
        <div>
          <div class="eyebrow">QUIZ MANAGEMENT</div>
          <h1>Admin panel</h1>
          <p>
            Create and manage quizzes, edit questions, control publication,
            and review platform statistics.
          </p>
          <p class="form-help mt-20">
            Demo mode: this panel has no authentication. Do not use it
            to protect real exam content.
          </p>
        </div>

        <button class="btn btn-primary" data-admin-action="create">
          <i class="fa-solid fa-plus"></i> Create new quiz
        </button>
      </div>

      <div class="admin-stats">
        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-book"></i></div>
          <div class="stat-value">${quizzes.length}</div>
          <div class="stat-label">Total quizzes</div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-eye"></i></div>
          <div class="stat-value">${getPublishedQuizzes().length}</div>
          <div class="stat-label">Published quizzes</div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><i class="fa-solid fa-list-check"></i></div>
          <div class="stat-value">${quizzes.reduce((sum, q) => sum + q.questions.length, 0)}</div>
          <div class="stat-label">Total questions</div>
        </div>
      </div>

      <div class="panel">
        <div class="admin-toolbar">
          <label class="search-box">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input id="admin-search" type="search"
              placeholder="Search quizzes..."
              value="${escapeHTML(adminSearch)}"
              aria-label="Search admin quizzes">
          </label>

          <button class="btn btn-secondary"
            data-admin-action="export">
            <i class="fa-solid fa-download"></i> Export JSON
          </button>

          <button class="btn btn-secondary"
            data-admin-action="import">
            <i class="fa-solid fa-upload"></i> Import JSON
          </button>
        </div>

        <input type="file" id="import-file"
          accept=".json,application/json" class="hidden">

        <div id="admin-table-container"></div>
      </div>

      <div id="admin-editor-container"></div>
    </section>
  `;

  $("#admin-search").addEventListener("input", event => {
    adminSearch = event.target.value;
    renderAdminTable();
  });

  renderAdminTable();
}

function renderAdminTable() {
  const container = $("#admin-table-container");
  if (!container) return;

  const query = adminSearch.trim().toLowerCase();

  const filtered = quizzes.filter(quiz =>
    [quiz.title, quiz.category, quiz.description]
      .join(" ")
      .toLowerCase()
      .includes(query)
  );

  if (!filtered.length) {
    container.innerHTML = emptyStateHTML(
      "fa-solid fa-book",
      "No quizzes found",
      "Create a quiz or change your search."
    );
    return;
  }

  container.innerHTML = `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>QUIZ</th>
            <th>CATEGORY</th>
            <th>QUESTIONS</th>
            <th>DURATION</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          ${filtered.map(quiz => `
            <tr>
              <td>
                <strong>${escapeHTML(quiz.title)}</strong><br>
                <span class="muted">${escapeHTML(quiz.difficulty)}</span>
              </td>

              <td>${escapeHTML(quiz.category)}</td>
              <td>${quiz.questions.length}</td>
              <td>${quiz.duration} min</td>

              <td>
                <span class="badge ${quiz.published ? "green" : "orange"}">
                  ${quiz.published ? "Published" : "Draft"}
                </span>
              </td>

              <td>
                <div class="table-actions">
                  <button class="table-action"
                    data-admin-action="edit"
                    data-quiz-id="${escapeHTML(quiz.id)}"
                    aria-label="Edit ${escapeHTML(quiz.title)}"
                    title="Edit">
                    <i class="fa-solid fa-pen"></i>
                  </button>

                  <button class="table-action"
                    data-admin-action="toggle"
                    data-quiz-id="${escapeHTML(quiz.id)}"
                    aria-label="Toggle publication"
                    title="${quiz.published ? "Unpublish" : "Publish"}">
                    <i class="fa-solid ${quiz.published ? "fa-eye-slash" : "fa-eye"}"></i>
                  </button>

                  <button class="table-action"
                    data-admin-action="duplicate"
                    data-quiz-id="${escapeHTML(quiz.id)}"
                    aria-label="Duplicate quiz"
                    title="Duplicate">
                    <i class="fa-solid fa-copy"></i>
                  </button>

                  <button class="table-action delete"
                    data-admin-action="delete"
                    data-quiz-id="${escapeHTML(quiz.id)}"
                    aria-label="Delete quiz"
                    title="Delete">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

/* =========================================================
   QUIZ EDITOR
========================================================= */

function openQuizEditor(quizId = null) {
  const existing = quizId
    ? quizzes.find(quiz => quiz.id === quizId)
    : null;

  if (quizId && !existing) {
    showToast("Quiz not found.", "error");
    return;
  }

  editingQuizId = existing?.id || null;

  editorQuestions = existing
    ? existing.questions.map(question => ({ ...question, options: [...question.options] }))
    : [{
        id: makeId(),
        question: "",
        options: ["", "", "", ""],
        correctIndex: 0,
        explanation: "",
        marks: 1,
        negativeMarks: 0
      }];

  const editor = $("#admin-editor-container");
  if (!editor) return;

  editor.innerHTML = `
    <section class="panel mt-20 fade-in" id="quiz-editor">
      <div class="section-heading">
        <div>
          <h2>${existing ? "Edit quiz" : "Create a quiz"}</h2>
          <p>Configure the quiz and add multiple-choice questions.</p>
        </div>
        <button class="icon-button" data-admin-action="cancel-editor"
          aria-label="Close editor">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <form id="quiz-form">
        <div class="admin-form">
          <div class="form-group">
            <label for="quiz-title">Quiz title *</label>
            <input class="form-control" id="quiz-title"
              name="title" maxlength="120" required
              value="${escapeHTML(existing?.title || "")}"
              placeholder="e.g. Java Interview Quiz">
          </div>

          <div class="form-group">
            <label for="quiz-category">Category *</label>
            <input class="form-control" id="quiz-category"
              name="category" maxlength="80" required list="category-options"
              value="${escapeHTML(existing?.category || "Java")}"
              placeholder="Choose or type a subject">

            <datalist id="category-options">
              ${CATEGORIES.map(category =>
                `<option value="${escapeHTML(category)}"></option>`
              ).join("")}
            </datalist>
          </div>

          <div class="form-group full-width">
            <label for="quiz-description">Description</label>
            <textarea class="form-control" id="quiz-description"
              name="description" maxlength="500"
              placeholder="Describe what students will learn.">${escapeHTML(existing?.description || "")}</textarea>
          </div>

          <div class="form-group">
            <label for="quiz-difficulty">Difficulty</label>
            <select class="form-control" id="quiz-difficulty">
              ${["Easy", "Medium", "Hard"].map(level => `
                <option value="${level}"
                  ${(existing?.difficulty || "Easy") === level ? "selected" : ""}>
                  ${level}
                </option>
              `).join("")}
            </select>
          </div>

          <div class="form-group">
            <label for="quiz-duration">Duration in minutes *</label>
            <input class="form-control" id="quiz-duration"
              type="number" min="1" max="240" required
              value="${existing?.duration || 10}">
          </div>

          <div class="form-group full-width">
            <label>
              <input id="quiz-published" type="checkbox"
                ${existing?.published !== false ? "checked" : ""}>
              Publish this quiz immediately
            </label>
            <span class="form-help">
              Unpublished quizzes will not appear in the student library.
            </span>
          </div>
        </div>

        <div class="admin-divider"></div>

        <div class="section-heading">
          <div>
            <h2>Questions</h2>
            <p>Each question needs four options and one correct answer.</p>
          </div>

          <button class="btn btn-secondary" type="button"
            data-admin-action="add-question">
            <i class="fa-solid fa-plus"></i> Add question
          </button>
        </div>

        <div id="question-editor-list"></div>

        <div class="form-actions mt-20">
          <button class="btn btn-secondary" type="button"
            data-admin-action="cancel-editor">
            Cancel
          </button>

          <button class="btn btn-primary" type="submit">
            <i class="fa-solid fa-floppy-disk"></i>
            ${existing ? "Save changes" : "Create quiz"}
          </button>
        </div>
      </form>
    </section>
  `;

  renderQuestionEditors();

  editor.scrollIntoView({ behavior: "smooth", block: "start" });
  $("#quiz-title")?.focus();
}

function renderQuestionEditors() {
  const container = $("#question-editor-list");
  if (!container) return;

  container.innerHTML = editorQuestions.map((question, index) => `
    <article class="question-editor" data-editor-index="${index}">
      <div class="question-editor-header">
        <h3>Question ${index + 1}</h3>

        <button class="table-action delete"
          type="button"
          data-admin-action="remove-question"
          data-question-index="${index}"
          aria-label="Remove question ${index + 1}"
          ${editorQuestions.length === 1 ? "disabled" : ""}>
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>

      <div class="form-group">
        <label>Question text *</label>
        <textarea class="form-control"
          data-question-field="question"
          data-question-index="${index}"
          required maxlength="1000"
          placeholder="Write your question...">${escapeHTML(question.question)}</textarea>
      </div>

      <div class="question-editor-grid mt-20">
        ${question.options.map((option, optionIndex) => `
          <div class="form-group">
            <label>Option ${String.fromCharCode(65 + optionIndex)} *</label>

            <div class="option-form-row">
              <input class="form-control"
                data-question-field="option"
                data-question-index="${index}"
                data-option-index="${optionIndex}"
                required maxlength="500"
                value="${escapeHTML(option)}"
                placeholder="Enter option">

              <label class="form-group">
                <span class="form-help">Correct?</span>
                <input type="radio"
                  name="correct-${index}"
                  data-question-field="correct"
                  data-question-index="${index}"
                  value="${optionIndex}"
                  ${question.correctIndex === optionIndex ? "checked" : ""}>
              </label>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="admin-form mt-20">
        <div class="form-group">
          <label>Marks for a correct answer</label>
          <input class="form-control"
            type="number" min="0" max="100"
            step="0.25"
            data-question-field="marks"
            data-question-index="${index}"
            value="${question.marks}">
        </div>

        <div class="form-group">
          <label>Negative marks for a wrong answer</label>
          <input class="form-control"
            type="number" min="0" max="100"
            step="0.25"
            data-question-field="negativeMarks"
            data-question-index="${index}"
            value="${question.negativeMarks}">
        </div>

        <div class="form-group full-width">
          <label>Answer explanation</label>
          <textarea class="form-control"
            data-question-field="explanation"
            data-question-index="${index}"
            maxlength="1500"
            placeholder="Explain why the correct answer is right.">${escapeHTML(question.explanation)}</textarea>
        </div>
      </div>
    </article>
  `).join("");
}

function readEditorQuestions() {
  return editorQuestions.map((question, index) => {
    const root = $(`[data-editor-index="${index}"]`);
    if (!root) return null;

    const getValue = field =>
      $(`[data-question-field="${field}"]`, root)?.value ?? "";

    const options = $$('[data-question-field="option"]', root)
      .map(input => input.value.trim());

    const selectedCorrect = $(
      '[data-question-field="correct"]:checked', root
    );

    return {
      id: question.id || makeId(),
      question: getValue("question").trim(),
      options,
      correctIndex: selectedCorrect
        ? Number(selectedCorrect.value)
        : -1,
      explanation: getValue("explanation").trim(),
      marks: Number(getValue("marks")),
      negativeMarks: Number(getValue("negativeMarks"))
    };
  });
}

function saveQuizForm(event) {
  event.preventDefault();

  const title = $("#quiz-title").value.trim();
  const category = $("#quiz-category").value.trim();
  const description = $("#quiz-description").value.trim();
  const difficulty = $("#quiz-difficulty").value;
  const duration = Number($("#quiz-duration").value);
  const published = $("#quiz-published").checked;

  if (!title || !category) {
    showToast("Enter a quiz title and category.", "error");
    return;
  }

  if (!Number.isInteger(duration) || duration < 1 || duration > 240) {
    showToast("Duration must be between 1 and 240 minutes.", "error");
    return;
  }

  const questions = readEditorQuestions();

  if (!questions.length) {
    showToast("Add at least one question.", "error");
    return;
  }

  for (let index = 0; index < questions.length; index++) {
    const question = questions[index];

    if (!question.question) {
      showToast(`Question ${index + 1} needs question text.`, "error");
      return;
    }

    if (question.options.length !== 4 ||
        question.options.some(option => !option)) {
      showToast(`Question ${index + 1} needs four non-empty options.`, "error");
      return;
    }

    if (new Set(question.options).size !== 4) {
      showToast(`Question ${index + 1} has duplicate options.`, "error");
      return;
    }

    if (question.correctIndex < 0 || question.correctIndex > 3) {
      showToast(`Select the correct answer for question ${index + 1}.`, "error");
      return;
    }

    if (!Number.isFinite(question.marks) ||
        question.marks < 0 ||
        !Number.isFinite(question.negativeMarks) ||
        question.negativeMarks < 0) {
      showToast(`Invalid marking scheme in question ${index + 1}.`, "error");
      return;
    }
  }

  const existing = editingQuizId
    ? quizzes.find(quiz => quiz.id === editingQuizId)
    : null;

  const quiz = normalizeQuiz({
    id: editingQuizId || makeId(),
    title,
    category,
    description,
    difficulty,
    duration,
    published,
    createdAt: existing?.createdAt || new Date().toISOString(),
    questions
  });

  if (!quiz) {
    showToast("Quiz validation failed. Check the question fields.", "error");
    return;
  }

  const previous = quizzes.slice();

  if (editingQuizId) {
    quizzes = quizzes.map(item => item.id === editingQuizId ? quiz : item);
  } else {
    quizzes.unshift(quiz);
  }

  if (!persistQuizzes()) {
    quizzes = previous;
    return;
  }

  editingQuizId = null;
  editorQuestions = [];

  renderAdmin($("#page-container"));
  showToast(
    existing ? "Quiz updated successfully." : "Quiz created successfully.",
    "success"
  );

  $("#admin-editor-container")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

/* =========================================================
   ADMIN CRUD OPERATIONS
========================================================= */

function toggleQuizPublication(quizId) {
  const previous = quizzes.slice();

  quizzes = quizzes.map(quiz =>
    quiz.id === quizId
      ? { ...quiz, published: !quiz.published }
      : quiz
  );

  if (!persistQuizzes()) {
    quizzes = previous;
    return;
  }

  renderAdmin($("#page-container"));
  showToast("Publication status updated.", "success");
}

function duplicateQuiz(quizId) {
  const source = quizzes.find(quiz => quiz.id === quizId);
  if (!source) return;

  const copy = normalizeQuiz({
    ...source,
    id: makeId(),
    title: source.title + " (Copy)",
    published: false,
    createdAt: new Date().toISOString(),
    questions: source.questions.map(question => ({
      ...question,
      id: makeId(),
      options: [...question.options]
    }))
  });

  if (!copy) {
    showToast("Could not duplicate quiz.", "error");
    return;
  }

  quizzes.unshift(copy);

  if (!persistQuizzes()) {
    quizzes.shift();
    return;
  }

  renderAdmin($("#page-container"));
  showToast("Draft copy created.", "success");
}

function deleteQuiz(quizId) {
  const quiz = quizzes.find(item => item.id === quizId);
  if (!quiz) return;

  openModal(
    "Delete this quiz?",
    `This will permanently remove "${quiz.title}" from the local quiz library. Existing attempt history will remain saved.`,
    [
      {
        label: "Cancel",
        run: closeModal
      },
      {
        label: "Delete quiz",
        primary: true,
        run: () => {
          const previous = quizzes.slice();

          quizzes = quizzes.filter(item => item.id !== quizId);

          if (!persistQuizzes()) {
            quizzes = previous;
            closeModal();
            return;
          }

          closeModal();
          renderAdmin($("#page-container"));
          showToast("Quiz deleted.", "success");
        }
      }
    ]
  );
}

/* =========================================================
   IMPORT / EXPORT QUIZZES
========================================================= */

function exportQuizzes() {
  const data = JSON.stringify(quizzes, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "quizforge-quizzes.json";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
  showToast("Quiz export prepared.", "success");
}

function importQuizzes(file) {
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    showToast("Import file must be smaller than 5 MB.", "error");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);

      if (!Array.isArray(parsed) || parsed.length > 500) {
        throw new Error("Expected an array of at most 500 quizzes.");
      }

      const imported = parsed.map(normalizeQuiz);

      if (imported.some(quiz => !quiz)) {
        throw new Error("One or more quizzes contain invalid data.");
      }

      const existingIds = new Set(quizzes.map(quiz => quiz.id));

      imported.forEach(quiz => {
        if (existingIds.has(quiz.id)) quiz.id = makeId();

        quiz.questions = quiz.questions.map(question => ({
          ...question,
          id: makeId()
        }));
      });

      const previous = quizzes.slice();
      quizzes = [...imported, ...quizzes];

      if (!persistQuizzes()) {
        quizzes = previous;
        return;
      }

      renderAdmin($("#page-container"));
      showToast(`${imported.length} quiz(es) imported.`, "success");
    } catch (error) {
      showToast("Import failed: " + error.message, "error");
    }
  };

  reader.onerror = () => {
    showToast("Could not read the import file.", "error");
  };

  reader.readAsText(file);
}

/* =========================================================
   EVENT DELEGATION
========================================================= */

document.addEventListener("click", event => {
  const pageButton = event.target.closest("[data-page]");

  if (pageButton) {
    event.preventDefault();
    navigate(pageButton.dataset.page);
    return;
  }

  const startButton = event.target.closest("[data-start-quiz]");

  if (startButton) {
    startQuiz(startButton.dataset.startQuiz);
    return;
  }

  const answerButton = event.target.closest("[data-answer]");

  if (answerButton) {
    selectAnswer(Number(answerButton.dataset.answer));
    return;
  }

  const paletteButton = event.target.closest("[data-question-index]");

  if (paletteButton) {
    moveQuestion(Number(paletteButton.dataset.questionIndex));
    return;
  }

  const examAction = event.target.closest("[data-exam-action]");

  if (examAction) {
    switch (examAction.dataset.examAction) {
      case "previous":
        moveQuestion(currentQuestionIndex - 1);
        break;

      case "next":
        moveQuestion(currentQuestionIndex + 1);
        break;

      case "mark":
        toggleMarkedQuestion();
        break;

      case "submit":
        submitQuiz(false);
        break;
    }

    return;
  }

  const adminButton = event.target.closest("[data-admin-action]");

  if (adminButton) {
    const action = adminButton.dataset.adminAction;
    const quizId = adminButton.dataset.quizId;

    switch (action) {
      case "create":
        openQuizEditor();
        break;

      case "edit":
        openQuizEditor(quizId);
        break;

      case "toggle":
        toggleQuizPublication(quizId);
        break;

      case "duplicate":
        duplicateQuiz(quizId);
        break;

      case "delete":
        deleteQuiz(quizId);
        break;

      case "add-question":
        editorQuestions.push({
          id: makeId(),
          question: "",
          options: ["", "", "", ""],
          correctIndex: 0,
          explanation: "",
          marks: 1,
          negativeMarks: 0
        });
        renderQuestionEditors();
        break;

      case "remove-question": {
        const index = Number(adminButton.dataset.questionIndex);

        if (editorQuestions.length > 1) {
          editorQuestions.splice(index, 1);
          renderQuestionEditors();
        }
        break;
      }

      case "cancel-editor":
        editingQuizId = null;
        editorQuestions = [];
        $("#admin-editor-container").innerHTML = "";
        break;

      case "export":
        exportQuizzes();
        break;

      case "import":
        $("#import-file")?.click();
        break;
    }

    return;
  }

  if (event.target.closest("[data-review-toggle]")) {
    const review = $("#answer-review");
    if (!review) return;

    review.classList.toggle("hidden");

    const button = event.target.closest("[data-review-toggle]");
    button.innerHTML = review.classList.contains("hidden")
      ? '<i class="fa-solid fa-list-check"></i> Review answers'
      : '<i class="fa-solid fa-eye-slash"></i> Hide review';

    if (!review.classList.contains("hidden")) {
      review.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return;
  }

  if (event.target.closest("#menu-toggle")) {
    $("#sidebar")?.classList.toggle("open");
    return;
  }

  if (event.target.closest("#theme-toggle")) {
    setTheme(theme === "dark" ? "light" : "dark");
  }
});

document.addEventListener("submit", event => {
  if (event.target.id === "quiz-form") {
    saveQuizForm(event);
  }
});

document.addEventListener("change", event => {
  if (event.target.id === "import-file") {
    const file = event.target.files?.[0];
    if (file) importQuizzes(file);

    event.target.value = "";
  }
});

$("#modal-close")?.addEventListener("click", closeModal);

$("#modal-overlay")?.addEventListener("click", event => {
  if (event.target.id === "modal-overlay") closeModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    const overlay = $("#modal-overlay");

    if (overlay?.classList.contains("open")) {
      closeModal();
    } else {
      $("#sidebar")?.classList.remove("open");
    }
  }
});

/* =========================================================
   INITIALIZATION
========================================================= */

function initializeApp() {
  setTheme(theme);

  // Refresh old or malformed stored data safely.
  quizzes = quizzes.map(normalizeQuiz).filter(Boolean);
  attempts = Array.isArray(attempts) ? attempts : [];

  navigate("dashboard");

  console.info("QuizForge initialized.");
  console.info("Loaded quizzes:", quizzes.length);
}

initializeApp();
