export type ProjectCategory =
  | "Machine Learning"
  | "LLMs & Agents"
  | "Computer Vision"
  | "Full-Stack"
  | "Systems"
  | "Dev Tools"
  | "Research"
  | "Learning";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  category: ProjectCategory;
  year: number;
  repo: string | null;
  homepage: string | null;
  private: boolean;
  /** 1–5 significance, used for ordering. */
  weight: number;
  featured?: boolean;
  award?: string;
  /** Big number shown on featured cards. */
  metric?: { value: string; label: string };
}

export interface Role {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  url?: string;
  points: string[];
  stack: string[];
}

export interface OssHighlight {
  org: string;
  project: string;
  summary: string;
  prs: { number: number; url: string }[];
}
