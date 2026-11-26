import type { ProjectItem } from '../types/portfolio';

interface ProjectsPageProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsPage(_props: ProjectsPageProps) {
  return <section className="min-h-[70vh]" aria-label="Projects page content" />;
}
