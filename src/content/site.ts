/**
 * Single source of truth for every piece of copy on the site.
 * Edit this file to update the portfolio — no component changes needed.
 */

export const CAREER_START = "2017-09-01";

/** Whole years since the first professional role, floored. */
export function yearsOfExperience(now: Date = new Date()): number {
  const start = new Date(CAREER_START);
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  return Math.max(0, Math.floor(months / 12));
}

const years = yearsOfExperience();

export const site = {
  url: "https://palashbera.com",
  name: "Palash Bera",
  role: "Full-stack Software Developer",
  /** Shown in the hero badge. Swap to something like "Open to new roles" when job hunting. */
  availability: "Open to interesting problems",
  company: "Cisco",
  location: "Kolkata, India",
  email: "palashbera1234@gmail.com",
  phone: "+918441005506",
  resume: "/Palash-Bera-Resume.pdf",
  tagline:
    "I build web products end to end — and then make them fast. Currently at Cisco, where my job is turning proofs of concept into systems that actually ship.",
  summary: [
    `I've spent ${years}+ years building and optimizing web applications, mostly in Ruby on Rails and React. Three companies, one consistent thread: taking something ambiguous — a rough spec, a slow page, a prototype nobody trusts yet — and turning it into something a team can rely on.`,
    "The work I'm proudest of usually isn't the feature itself. It's the page that got 2.4× faster once the hot paths were rewritten, the access control that let a team stop worrying about who could see what, the proof of concept that reached production instead of dying in a demo.",
    "I work best close to a cross-functional team, where I can follow a problem all the way from the first conversation to the thing running in production.",
  ],
} as const;

/** Resume-backed numbers, surfaced under the hero. */
export const stats = [
  { value: `${years}+`, label: "years shipping" },
  { value: "4+", label: "projects end to end" },
  { value: "100%", label: "POCs into production" },
] as const;

/** The three things worth hiring me for, each tied to real evidence below. */
export const focusAreas = [
  {
    title: "End-to-end delivery",
    body: "From an ambiguous spec or a rough prototype through to production. Every proof of concept I've built at Cisco has made it into production.",
  },
  {
    title: "Performance work",
    body: "Profiling, rewriting hot paths, and cutting the work each request does. 2.4× faster pages at Kreeti; 78% faster at Involio.",
  },
  {
    title: "Rails & React depth",
    body: `${years}+ years in one core stack across three engineering teams and very different stages of product maturity.`,
  },
] as const;

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

/** Add a GitHub / X / Bluesky entry here and it shows up in the footer. */
export const socials: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/palash-bera",
    handle: "palash-bera",
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    handle: site.email,
  },
];

export type NavItem = {
  label: string;
  href: string;
  /** Present for on-page anchors; drives the active-section underline. */
  sectionId?: string;
};

export const nav: NavItem[] = [
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Experience", href: "/#experience", sectionId: "experience" },
  { label: "Skills", href: "/#skills", sectionId: "skills" },
  { label: "Projects", href: "/#projects", sectionId: "projects" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

export type Job = {
  company: string;
  title: string;
  period: string;
  /** One line of orientation: what the company does, or what I owned there. */
  context: string;
  current?: boolean;
  highlights: string[];
  stack: string[];
};

export const experience: Job[] = [
  {
    company: "Cisco Systems (India)",
    title: "Software Engineer",
    period: "Jul 2021 — Present",
    context: "Internal engineering platforms, from concept to production.",
    current: true,
    highlights: [
      "Built proof-of-concept prototypes under tight deadlines and carried every one of them through to production — a 100% conversion rate from demo to shipped system.",
      "Owned work across the full software lifecycle on 4+ projects, three of which are live and delivering value today.",
      "Partnered with cross-functional teams to raise the quality bar, keeping delivery continuous rather than lumpy.",
    ],
    stack: ["Ruby on Rails", "Python", "React", "PostgreSQL", "AWS", "CI/CD"],
  },
  {
    company: "Involio LLC",
    title: "Rails Engineer",
    period: "Jul 2020 — Jun 2021",
    context: "A social investing platform, shipping on short cycles.",
    highlights: [
      "Delivered core product features against very tight deadlines while closing out 200+ bugs.",
      "Made the application 78% faster by attacking the slowest paths first, which turned a sluggish experience into a smooth one.",
    ],
    stack: ["Ruby on Rails", "RSpec", "PostgreSQL", "Sidekiq", "Redis"],
  },
  {
    company: "Kreeti Technologies",
    title: "Web Engineer",
    period: "Sep 2017 — Jun 2020",
    context: "Custom business applications for enterprise clients.",
    highlights: [
      "Led development of custom applications in Ruby on Rails and React, automating manual steps for a 30% gain in operational efficiency.",
      "Made pages load 2.4× faster by refactoring hot paths and applying targeted performance optimizations.",
      "Rebuilt mobile responsiveness and shipped role-based access control, contributing to a 21% lift in user engagement.",
    ],
    stack: ["Ruby on Rails", "React", "JavaScript", "MySQL", "SASS"],
  },
];

export type Skill = {
  name: string;
  /** Core skills get visual emphasis — keep this list short and honest. */
  core?: boolean;
};

export type SkillGroup = {
  title: string;
  items: Skill[];
};

export const skills: SkillGroup[] = [
  {
    title: "Backend",
    items: [
      { name: "Ruby on Rails", core: true },
      { name: "Ruby", core: true },
      { name: "Python", core: true },
      { name: "REST APIs" },
      { name: "Node.js" },
      { name: "Sidekiq" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", core: true },
      { name: "JavaScript", core: true },
      { name: "Tailwind CSS" },
      { name: "SASS" },
      { name: "HTML" },
      { name: "CSS" },
      { name: "Bootstrap" },
    ],
  },
  {
    title: "Data & infra",
    items: [
      { name: "PostgreSQL", core: true },
      { name: "AWS", core: true },
      { name: "MySQL" },
      { name: "Redis" },
      { name: "Git" },
    ],
  },
  {
    title: "Testing & delivery",
    items: [
      { name: "RSpec", core: true },
      { name: "CI/CD" },
      { name: "GitHub Actions" },
      { name: "CircleCI" },
      { name: "Datadog" },
      { name: "Code review" },
    ],
  },
];

export type Project = {
  name: string;
  period: string;
  /** Small label above the title, e.g. "Final-year project" or "Side project". */
  context?: string;
  description: string;
  stack: string[];
  href?: string;
};

/**
 * Add recent work here — a side project, an open-source contribution, or a
 * write-up of something you shipped. Each entry renders as its own card:
 *
 *   {
 *     name: "Project name",
 *     period: "2026",
 *     context: "Side project",
 *     description: "One or two sentences on the problem and the outcome.",
 *     stack: ["Rails", "React"],
 *     href: "https://github.com/...",   // optional, adds a link arrow
 *   }
 */
export const projects: Project[] = [
  {
    name: "GPS-based smart spy surveillance robot",
    period: "Fall 2016",
    context: "Final-year project",
    description:
      "A Raspberry Pi surveillance robot for security applications, driven wirelessly from a web browser or a companion Android app. Combined a camera, gripper, ultrasonic sensor and GPS module for real-time environment monitoring and location tracking.",
    stack: ["Raspberry Pi", "Python", "Android", "GPS", "Ultrasonic sensor"],
  },
];

export type Education = {
  institution: string;
  degree: string;
  detail: string;
  period: string;
};

export const education: Education[] = [
  {
    institution: "University of Engineering & Management, Jaipur",
    degree: "B.Tech, Electronics & Communication Engineering",
    detail: "73.25%",
    period: "Jul 2013 — Jun 2017",
  },
];
