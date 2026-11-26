import type { PageId } from '../types/portfolio';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export function AboutPage(_props: AboutPageProps) {
  return <section className="min-h-[70vh]" aria-label="About page content" />;
}
