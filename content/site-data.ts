export type VerificationStatus = "verified" | "placeholder";

export type MediaItem = {
  id: string;
  title: string;
  alt: string;
  category: "Workshop" | "Camp" | "Student Project" | "Team" | "Community Event" | "Behind the Scenes";
  tone: "green" | "yellow" | "blue" | "lavender" | "coral";
  event?: string;
  date?: string;
  photoConsent: "confirmed" | "not-applicable" | "pending";
  src?: string;
};

export type Program = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  ages: string;
  level: "Beginner" | "All levels" | "Intermediate";
  format: "Workshop" | "Camp" | "Series";
  topic: "AI" | "Coding" | "Creativity" | "Responsible AI";
  duration: string;
  builds: string[];
  outcomes: string[];
  schedule: { time: string; activity: string }[];
  mediaId: string;
};

export type EventItem = {
  slug: string;
  title: string;
  location: string;
  dateLabel: string;
  dateISO: string;
  ageGroup: string;
  status: "Interest open" | "Registration soon" | "Recap";
  capacity?: string;
  theme: string;
  summary: string;
  topics: string[];
  verificationStatus: VerificationStatus;
  days: {
    label: string;
    summary: string;
    result: string;
    mediaIds: string[];
  }[];
};

export const organization = {
  name: "AI Sprouts",
  email: "hello@aisprouts.org",
  siteUrl: "https://aisprouts.org",
  instagramUrl: "https://www.instagram.com/",
  mission:
    "AI Sprouts helps young people become thoughtful creators through practical, creative, and responsible experiences with artificial intelligence and code.",
};

export const announcement = {
  enabled: true,
  label: "Now growing",
  message: "New community workshop dates are being planned.",
  linkLabel: "Join the interest list",
  href: "/register",
  verificationStatus: "placeholder" as const,
};

export const learningPillars = [
  { icon: "01", title: "AI Foundations", text: "Understand what AI can do, how it learns, and where people guide it." },
  { icon: "02", title: "Creative Coding", text: "Turn ideas into playful experiments with approachable coding tools." },
  { icon: "03", title: "Build AI Projects", text: "Create classifiers, stories, games, and helpers with a purpose." },
  { icon: "04", title: "Responsible AI", text: "Practice fairness, privacy, source-checking, and thoughtful decision-making." },
  { icon: "05", title: "Grow Together", text: "Share roles, test ideas, give feedback, and solve problems as a team." },
];

export const media: MediaItem[] = [
  { id: "hero-1", title: "Activity photo needed", alt: "Placeholder for an approved photo of students collaborating during an AI Sprouts activity", category: "Workshop", tone: "green", photoConsent: "pending" },
  { id: "hero-2", title: "Project photo needed", alt: "Placeholder for an approved close-up of a student project", category: "Student Project", tone: "yellow", photoConsent: "pending" },
  { id: "hero-3", title: "Community photo needed", alt: "Placeholder for an approved photo of a library or school workshop", category: "Community Event", tone: "blue", photoConsent: "pending" },
  { id: "explorers", title: "AI Explorers photo", alt: "Placeholder for approved AI Explorers program photography", category: "Workshop", tone: "lavender", photoConsent: "pending" },
  { id: "creative", title: "Creative AI photo", alt: "Placeholder for approved Creative AI project photography", category: "Student Project", tone: "coral", photoConsent: "pending" },
  { id: "responsible", title: "Responsible AI poster", alt: "Placeholder for an anonymized responsible AI poster created by a student team", category: "Student Project", tone: "yellow", photoConsent: "pending" },
  { id: "fortmill-d1-a", title: "Day 1 welcome circle", alt: "Placeholder for an approved Day 1 workshop welcome photo", category: "Workshop", tone: "green", event: "Fort Mill Library AI Lab", date: "Day 1", photoConsent: "pending" },
  { id: "fortmill-d1-b", title: "Day 1 model activity", alt: "Placeholder for an approved Day 1 hands-on model activity photo", category: "Workshop", tone: "blue", event: "Fort Mill Library AI Lab", date: "Day 1", photoConsent: "pending" },
  { id: "fortmill-d2-a", title: "Day 2 team build", alt: "Placeholder for an approved Day 2 collaborative build photo", category: "Workshop", tone: "lavender", event: "Fort Mill Library AI Lab", date: "Day 2", photoConsent: "pending" },
  { id: "fortmill-d2-b", title: "Day 2 project share", alt: "Placeholder for an approved Day 2 student presentation photo", category: "Student Project", tone: "coral", event: "Fort Mill Library AI Lab", date: "Day 2", photoConsent: "pending" },
  { id: "project-classifier", title: "Nature Sorter", alt: "Placeholder for an anonymized image classifier project screenshot", category: "Student Project", tone: "green", photoConsent: "not-applicable" },
  { id: "project-story", title: "Story Seed", alt: "Placeholder for an anonymized AI-assisted story project", category: "Student Project", tone: "lavender", photoConsent: "not-applicable" },
  { id: "project-game", title: "Eco Quest", alt: "Placeholder for an anonymized educational game project", category: "Student Project", tone: "blue", photoConsent: "not-applicable" },
  { id: "team-1", title: "Team portrait needed", alt: "Placeholder for an approved AI Sprouts team portrait", category: "Team", tone: "coral", photoConsent: "pending" },
  { id: "team-2", title: "Mentor portrait needed", alt: "Placeholder for an approved volunteer mentor portrait", category: "Team", tone: "yellow", photoConsent: "pending" },
  { id: "behind-scenes", title: "Materials table", alt: "Placeholder for a behind-the-scenes workshop materials photo", category: "Behind the Scenes", tone: "green", photoConsent: "pending" },
];

export const programs: Program[] = [
  {
    slug: "ai-explorers",
    title: "AI Explorers",
    eyebrow: "A welcoming first step",
    summary: "A hands-on introduction to how AI recognizes patterns, makes predictions, and needs human judgment.",
    ages: "Ages 9–12",
    level: "Beginner",
    format: "Workshop",
    topic: "AI",
    duration: "2–3 hours",
    builds: ["A simple image classifier", "A model-testing journal", "A responsible-use pledge"],
    outcomes: ["Explain AI in everyday language", "Train and test a small model", "Spot bias in examples", "Present a team discovery"],
    schedule: [
      { time: "0:00", activity: "Welcome, wonder question, and AI myth-busting" },
      { time: "0:30", activity: "Human sorting game: how examples shape a model" },
      { time: "1:00", activity: "Build and test an image classifier" },
      { time: "1:50", activity: "Improve the model and discuss fairness" },
      { time: "2:20", activity: "Project share and reflection" },
    ],
    mediaId: "explorers",
  },
  {
    slug: "creative-ai-studio",
    title: "Creative AI Studio",
    eyebrow: "Ideas into stories",
    summary: "Students combine storytelling, design, and code to make an original interactive experience.",
    ages: "Ages 11–15",
    level: "All levels",
    format: "Series",
    topic: "Creativity",
    duration: "4 weekly sessions",
    builds: ["An interactive story", "Original prompt experiments", "A creator statement"],
    outcomes: ["Develop and storyboard an idea", "Direct a tool with clear constraints", "Revise creative work", "Credit sources and collaborators"],
    schedule: [
      { time: "Week 1", activity: "Story seeds, creative constraints, and responsible prompting" },
      { time: "Week 2", activity: "Prototype characters, settings, and interactions" },
      { time: "Week 3", activity: "Code, test, and revise" },
      { time: "Week 4", activity: "Showcase and creator reflection" },
    ],
    mediaId: "creative",
  },
  {
    slug: "responsible-ai-lab",
    title: "Responsible AI Lab",
    eyebrow: "Think before you click",
    summary: "A discussion-rich lab where students investigate fairness, privacy, accuracy, and human responsibility.",
    ages: "Ages 12–17",
    level: "All levels",
    format: "Workshop",
    topic: "Responsible AI",
    duration: "90 minutes",
    builds: ["A fairness test", "A source-checking checklist", "A responsible-AI poster"],
    outcomes: ["Question an AI response", "Protect personal information", "Recognize uneven outcomes", "Choose when a human should decide"],
    schedule: [
      { time: "0:00", activity: "Real-or-generated warmup" },
      { time: "0:20", activity: "Fairness case study in small teams" },
      { time: "0:50", activity: "Design a responsible-AI checklist" },
      { time: "1:15", activity: "Gallery walk and reflection" },
    ],
    mediaId: "responsible",
  },
  {
    slug: "code-a-community-helper",
    title: "Code a Community Helper",
    eyebrow: "Build for a real need",
    summary: "A project-based camp where teams design a simple digital tool around a community challenge.",
    ages: "Ages 12–16",
    level: "Intermediate",
    format: "Camp",
    topic: "Coding",
    duration: "5 half-days",
    builds: ["A working web prototype", "User-test notes", "A final project pitch"],
    outcomes: ["Frame a useful problem", "Build an interface", "Collect kind, actionable feedback", "Explain technical choices"],
    schedule: [
      { time: "Day 1", activity: "Discover a community need" },
      { time: "Day 2", activity: "Sketch and plan the experience" },
      { time: "Day 3", activity: "Build the core interaction" },
      { time: "Day 4", activity: "Test, revise, and check accessibility" },
      { time: "Day 5", activity: "Present the solution" },
    ],
    mediaId: "project-game",
  },
];

export const events: EventItem[] = [
  {
    slug: "community-ai-studio",
    title: "Community AI Studio",
    location: "Community venue to be confirmed",
    dateLabel: "Date to be announced",
    dateISO: "2026-10-01",
    ageGroup: "Ages 10–14",
    status: "Interest open",
    capacity: "Capacity to be confirmed",
    theme: "From curious question to creative prototype",
    summary: "A future hands-on workshop for students who want to explore, build, and share with AI.",
    topics: ["How AI learns", "Creative coding", "Team prototyping"],
    verificationStatus: "placeholder",
    days: [],
  },
  {
    slug: "fort-mill-library-ai-lab",
    title: "Fort Mill Library AI Lab",
    location: "Fort Mill Library",
    dateLabel: "Recap date pending verification",
    dateISO: "2026-06-01",
    ageGroup: "Youth workshop",
    status: "Recap",
    theme: "Explore, test, build, and share",
    summary: "Demonstration recap content showing how a two-day library program can be presented once dates, details, and approved photos are supplied.",
    topics: ["AI foundations", "Model testing", "Responsible AI", "Project sharing"],
    verificationStatus: "placeholder",
    days: [
      { label: "Day 1", summary: "Students explored how examples help a computer recognize patterns, then tested where a model could get confused.", result: "A first model plus a list of ideas for making its examples stronger.", mediaIds: ["fortmill-d1-a", "fortmill-d1-b"] },
      { label: "Day 2", summary: "Teams turned their discoveries into small projects, tested with peers, and practiced explaining their choices.", result: "A project share focused on what worked, what changed, and how people stayed in control.", mediaIds: ["fortmill-d2-a", "fortmill-d2-b"] },
    ],
  },
];

export const studentProjects = [
  { title: "Nature Sorter", group: "Ages 9–12", program: "AI Explorers", tools: "Visual model trainer", text: "A classifier that sorts local nature photos and documents where the model needs better examples.", skills: ["Pattern finding", "Testing", "Reflection"], mediaId: "project-classifier" },
  { title: "Story Seed", group: "Ages 11–15", program: "Creative AI Studio", tools: "Storyboarding + creative AI", text: "An interactive story shaped by a student team’s original characters, choices, and revision notes.", skills: ["Story design", "Prompting", "Attribution"], mediaId: "project-story" },
  { title: "Eco Quest", group: "Ages 12–16", program: "Community Helper Camp", tools: "HTML, CSS + JavaScript", text: "A short educational game that helps players practice everyday environmental choices.", skills: ["Coding", "User testing", "Teamwork"], mediaId: "project-game" },
];

export const processSteps = [
  { number: "01", title: "Understand", text: "Meet a big idea through an everyday example." },
  { number: "02", title: "Experiment", text: "Try, observe, question, and compare results." },
  { number: "03", title: "Build", text: "Turn a possibility into something that works." },
  { number: "04", title: "Present", text: "Share the project and explain key choices." },
  { number: "05", title: "Reflect", text: "Consider impact, improvement, and next steps." },
];

export const impact = [
  { value: "—", label: "Students reached", note: "Verified total needed" },
  { value: "—", label: "Workshops completed", note: "Verified total needed" },
  { value: "—", label: "Community partners", note: "Verified total needed" },
  { value: "—", label: "Projects built", note: "Verified total needed" },
];

export const partners = [
  { name: "Library partner", type: "Logo + permission needed" },
  { name: "School partner", type: "Logo + permission needed" },
  { name: "Community partner", type: "Logo + permission needed" },
  { name: "Program sponsor", type: "Logo + permission needed" },
];

export const testimonials = [
  { audience: "Parent voice", quote: "Approved parent testimonial will appear here.", attribution: "Placeholder — do not publish as an endorsement" },
  { audience: "Student voice", quote: "Approved, privacy-safe student reflection will appear here.", attribution: "Placeholder — do not publish as an endorsement" },
  { audience: "Educator voice", quote: "Approved educator testimonial will appear here.", attribution: "Placeholder — do not publish as an endorsement" },
];

export const team = [
  { name: "Team profile needed", role: "Founder / Program Lead", expertise: "Mission, biography, and portrait pending", favorite: "Add an approved teaching reflection.", mediaId: "team-1" },
  { name: "Team profile needed", role: "Learning Experience Lead", expertise: "Role details and biography pending", favorite: "Add an approved teaching reflection.", mediaId: "team-2" },
  { name: "Mentor profile needed", role: "Volunteer Mentor", expertise: "Skills and biography pending", favorite: "Add an approved mentoring reflection.", mediaId: "behind-scenes" },
];

export const involvementPaths = [
  { title: "Parents & students", text: "Find an age-appropriate program and tell us what your learner is curious about.", commitment: "One workshop, series, or camp", next: "Join the interest list", href: "/register" },
  { title: "Schools & libraries", text: "Host a practical program shaped around your learners, space, and goals.", commitment: "Planning call + program date", next: "Request a host conversation", href: "/contact?type=host" },
  { title: "Volunteers & mentors", text: "Support small teams, share a skill, or help a showcase run smoothly.", commitment: "Flexible, role-dependent", next: "Share your interest", href: "/contact?type=volunteer" },
  { title: "Sponsors & partners", text: "Help expand accessible, community-based AI learning for young people.", commitment: "Custom partnership", next: "Start a partnership conversation", href: "/contact?type=sponsor" },
];

export const navigation = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/student-projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Get involved", href: "/get-involved" },
];

export function getMedia(id: string) {
  return media.find((item) => item.id === id) ?? media[0];
}
