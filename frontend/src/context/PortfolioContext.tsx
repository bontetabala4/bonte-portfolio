import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getProfile, getStack, getProjects, getTimeline, getEducation } from "../lib/api";
import type { Profile, StackMap, Project, TimelineItem, EducationItem } from "../lib/types";
import {
  PROFILE as FALLBACK_PROFILE,
  STACK as FALLBACK_STACK,
  PROJECTS as FALLBACK_PROJECTS,
  TIMELINE as FALLBACK_TIMELINE,
  EDUCATION as FALLBACK_EDUCATION,
} from "../data/content";

type Ctx = {
  profile: Profile;
  stack: StackMap;
  projects: Project[];
  timeline: TimelineItem[];
  education: EducationItem[];
};

const PortfolioContext = createContext<Ctx>({
  profile: FALLBACK_PROFILE,
  stack: FALLBACK_STACK,
  projects: FALLBACK_PROJECTS,
  timeline: FALLBACK_TIMELINE,
  education: FALLBACK_EDUCATION,
});

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(FALLBACK_PROFILE);
  const [stack, setStack] = useState<StackMap>(FALLBACK_STACK);
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [timeline, setTimeline] = useState<TimelineItem[]>(FALLBACK_TIMELINE);
  const [education, setEducation] = useState<EducationItem[]>(FALLBACK_EDUCATION);

  useEffect(() => {
    // Chaque fonction a un repli local intégré (lib/api.ts) : si le backend
    // FastAPI n'est pas lancé, l'app reste 100% fonctionnelle avec les
    // données locales déjà affichées ci-dessus.
    getProfile().then(setProfile);
    getStack().then(setStack);
    getProjects().then(setProjects);
    getTimeline().then(setTimeline);
    getEducation().then(setEducation);
  }, []);

  return (
    <PortfolioContext.Provider value={{ profile, stack, projects, timeline, education }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
