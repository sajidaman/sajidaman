import type { ArchiveItem } from '../types/portfolio';

interface ArchivePageProps {
  onSelectArchive: (item: ArchiveItem) => void;
}

export function ArchivePage(_props: ArchivePageProps) {
  return <section className="min-h-[70vh]" aria-label="Archive page content" />;
}
