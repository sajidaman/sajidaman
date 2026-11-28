import type { PageId, ProjectItem, PublicationItem } from '../types/portfolio';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectPublication: (publication: PublicationItem) => void;
}

export function HomePage(_props: HomePageProps) {
  return <section className="min-h-[70vh]" aria-label="Home page content" />;
}
