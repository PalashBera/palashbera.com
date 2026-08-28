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

export const site = {
  url: "https://palashbera.com",
  name: "Palash Bera",
  role: "Full-stack Software Developer",
  location: "Kolkata, India",
  email: "palashbera1234@gmail.com",
  phone: "+918441005506",
  resume: "/Palash-Bera-Resume.pdf",
  tagline:
    "I build and scale web products end to end — Ruby on Rails and Python on the backend, React and Tailwind on the front.",
  summary: [
    `I'm a proactive, self-motivated full-stack developer with ${yearsOfExperience()}+ years of experience creating and optimizing web applications. My core expertise is Ruby on Rails and React, backed by a strong habit of working closely with cross-functional teams.`,
    "I care about the parts that are easy to skip: query plans that stay fast under load, tests that catch real regressions, and interfaces that feel obvious. Lately I spend most of my time turning proofs of concept into production systems.",
  ],
} as const;

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

/** Add a GitHub / X / Bluesky entry here and it shows up in the header and footer. */
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

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export type Job = {
  company: string;
  title: string;
  period: string;
  current?: boolean;
  highlights: string[];
  stack: string[];
};

export const experience: Job[] = [
  {
    company: "Cisco Systems (India) Private Limited",
    title: "Software Engineer",
    period: "Jul 2021 — Present",
    current: true,
    highlights: [
      "Built multiple proof-of-concept prototypes under tight deadlines, with a 100% success rate moving them from POC into production.",
      "Contributed to the end-to-end software lifecycle of 4+ projects, 3 of which are live and delivering value today.",
      "Partnered with cross-functional teams to raise application quality, keeping delivery continuous and predictable.",
    ],
    stack: ["Ruby on Rails", "Python", "React", "PostgreSQL", "AWS", "CI/CD"],
  },
  {
    company: "Involio LLC",
    title: "Rails Engineer",
    period: "Jul 2020 — Jun 2021",
    highlights: [
      "Delivered key product features on very tight deadlines and closed out 200+ bug fixes.",
      "Optimized application performance for a 78% improvement in speed and efficiency, making the experience noticeably smoother for users.",
    ],
    stack: ["Ruby on Rails", "RSpec", "PostgreSQL", "Sidekiq", "Redis"],
  },
  {
    company: "Kreeti Technologies Pvt. Ltd.",
    title: "Web Engineer",
    period: "Sep 2017 — Jun 2020",
    highlights: [
      "Spearheaded development of custom applications in Ruby on Rails and React, driving a 30% gain in operational efficiency through automation.",
      "Cut page load times by 240% by refactoring hot paths and applying advanced performance optimization techniques.",
      "Improved mobile responsiveness and shipped role-based access control, contributing to a 21% lift in user engagement.",
    ],
    stack: ["Ruby on Rails", "React", "JavaScript", "MySQL", "SASS"],
  },
];

export type SkillGroup = {
  title: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    title: "Backend",
    items: [
      "Ruby on Rails",
      "Ruby",
      "Python",
      "Node.js",
      "RESTful APIs",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Sidekiq",
      "RSpec",
    ],
  },
  {
    title: "Frontend",
    items: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "SASS",
      "Bootstrap",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "CI/CD", "CircleCI", "GitHub Actions", "Git"],
  },
  {
    title: "Ways of working",
    items: ["Code review", "Agile delivery", "Jira", "Datadog", "Slack"],
  },
];

export type Project = {
  name: string;
  period: string;
  description: string;
  stack: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    name: "GPS-based smart spy surveillance robot",
    period: "Fall 2016",
    description:
      "A Raspberry Pi surveillance robot for security applications, controlled wirelessly from a web browser or a companion Android app. Integrated camera, gripper, ultrasonic sensor and GPS module for real-time environment monitoring and location tracking.",
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
