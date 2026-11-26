import type { PhotoFrame } from '../types/portfolio';

interface FunPageProps {
  onSelectPhoto: (photo: PhotoFrame) => void;
}

export function FunPage(_props: FunPageProps) {
  return <section className="min-h-[70vh]" aria-label="Fun page content" />;
}
