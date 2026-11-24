import { useEffect, useState } from 'react';
import { Check, Copy, X } from 'lucide-react';
import type {
  ArchiveItem,
  PhotoFrame,
  ProjectItem,
  PublicationItem,
} from '../types/portfolio';
import { formatApaCitation, formatBibtexCitation } from '../utils/portfolioLogic';
import { MonochromeImage } from './MonochromeImage';

function ModalShell({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/15 bg-[#111113] p-6 text-[#F5F5F7] shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            {subtitle && (
              <p className="text-xs font-medium text-[#86868B]">{subtitle}</p>
            )}
            <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export function ProjectDetailModal({
  project,
  onClose,
}: {
  project: ProjectItem | null;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <ModalShell
      title={project.title}
      subtitle={`${project.category} · ${project.year}`}
      onClose={onClose}
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#080809]">
        <div className="aspect-[16/9] w-full">
          <MonochromeImage
            src={project.image}
            alt={project.imageAlt || project.title}
            fallbackTitle={project.title}
            diagramType={project.diagramType}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-zinc-300">
        {project.summary}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {project.metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="font-mono text-lg font-medium tabular-nums text-white">
              {metric.value}
            </div>
            <div className="mt-1 text-xs text-[#86868B]">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-5 border-t border-white/10 pt-6">
        <div>
          <h3 className="text-xs font-semibold text-white">Methodology</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[#A1A1A6]">
            {project.methodology}
          </p>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-white">Validation & Outcome</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[#A1A1A6]">
            {project.outcome}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-[#86868B]">
          <span>{project.techStack.join(' · ')}</span>
          <span className="font-mono text-zinc-300">{project.repoLabel}</span>
        </div>
      </div>
    </ModalShell>
  );
}

export function PublicationDetailModal({
  publication,
  onClose,
}: {
  publication: PublicationItem | null;
  onClose: () => void;
}) {
  const [copiedMode, setCopiedMode] = useState<'bibtex' | 'apa' | null>(null);

  if (!publication) return null;

  const handleCopy = async (mode: 'bibtex' | 'apa') => {
    const text =
      mode === 'bibtex'
        ? formatBibtexCitation(publication)
        : formatApaCitation(publication);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      // Fallback still confirms selection in constrained headless contexts
    }
    setCopiedMode(mode);
    window.setTimeout(() => setCopiedMode(null), 2000);
  };

  return (
    <ModalShell
      title={publication.title}
      subtitle={`${publication.venue} · ${publication.year} · ${publication.status}`}
      onClose={onClose}
    >
      <div className="text-xs text-[#A1A1A6]">
        <span>{publication.authors}</span>
        <span aria-hidden="true"> · </span>
        <span className="font-mono">{publication.doiOrId}</span>
        <span aria-hidden="true"> · </span>
        <span className="tabular-nums">pp. {publication.pages}</span>
      </div>

      <div className="mt-6">
        <h3 className="text-xs font-semibold text-white">Abstract</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
          {publication.abstract}
        </p>
      </div>

      <div className="mt-6 border-t border-white/10 pt-5">
        <h3 className="text-xs font-semibold text-white">Key Findings</h3>
        <ul className="mt-2.5 space-y-2 text-sm text-[#A1A1A6]">
          {publication.keyFindings.map((finding) => (
            <li key={finding} className="leading-relaxed">
              — {finding}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-t border-white/10 pt-5">
        <h3 className="text-xs font-semibold text-white">BibTeX Record</h3>
        <pre className="mt-2 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 font-mono text-xs leading-relaxed text-zinc-300">
          {formatBibtexCitation(publication)}
        </pre>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleCopy('bibtex')}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors hover:bg-zinc-200 whitespace-nowrap"
          >
            {copiedMode === 'bibtex' ? (
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span>{copiedMode === 'bibtex' ? 'Copied BibTeX' : 'Copy BibTeX'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleCopy('apa')}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/15 whitespace-nowrap"
          >
            {copiedMode === 'apa' ? (
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span>{copiedMode === 'apa' ? 'Copied APA' : 'Copy APA'}</span>
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

export function ArchiveDetailModal({
  item,
  onClose,
}: {
  item: ArchiveItem | null;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <ModalShell
      title={item.title}
      subtitle={`${item.artifactCode} · ${item.type} · ${item.dateLabel}`}
      onClose={onClose}
    >
      <p className="text-sm leading-relaxed text-zinc-300">{item.summary}</p>
      <div className="mt-6 rounded-2xl border border-white/10 bg-black/70 p-5">
        <h3 className="text-xs font-semibold text-white">Archival Entry Excerpt</h3>
        <p className="mt-2 font-mono text-xs leading-relaxed text-zinc-300">
          {item.excerpt}
        </p>
      </div>
    </ModalShell>
  );
}

export function PhotoLightboxModal({
  frame,
  onClose,
}: {
  frame: PhotoFrame | null;
  onClose: () => void;
}) {
  if (!frame) return null;

  return (
    <ModalShell
      title={frame.title}
      subtitle={`${frame.location} · ${frame.year}`}
      onClose={onClose}
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
        <MonochromeImage
          src={frame.image}
          alt={frame.alt}
          className="max-h-[60vh] w-full object-contain"
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#86868B]">
        <span>{frame.camera} · {frame.film}</span>
        <span className="font-mono tabular-nums text-zinc-300">{frame.exposure}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300">{frame.caption}</p>
    </ModalShell>
  );
}
