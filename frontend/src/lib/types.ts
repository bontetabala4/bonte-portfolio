export type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin?: string;
  summary: string;
};

export type Project = {
  id: string;
  name: string;
  client: string;
  status: string;
  date: string;
  description: string;
  stack: string[];
  highlights?: string[];
  context?: string;
  role?: string;
  demoUrl?: string;
  githubUrl?: string;
};

export type TimelineItem = { when: string; title: string; org: string };
export type EducationItem = { title: string; meta: string; org: string };
export type StackMap = Record<string, string[]>;
