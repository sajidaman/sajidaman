import type { PublicationItem } from '../types/portfolio';

interface PublicationPageProps {
  onSelectPublication: (publication: PublicationItem) => void;
}

export function PublicationPage(_props: PublicationPageProps) {
  return <section className="min-h-[70vh]" aria-label="Publications page content" />;
}
