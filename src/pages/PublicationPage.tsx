import { useState } from 'react';
import { BookOpen, Check, ChevronDown, Copy } from 'lucide-react';
import { PUBLICATIONS } from '../data/portfolioData';
import type { PublicationItem } from '../types/portfolio';
import { formatBibtexCitation } from '../utils/portfolioLogic';

interface PublicationPageProps {
  onSelectPublication: (publication: PublicationItem) => void;
}

export function PublicationPage({ onSelectPublication }: PublicationPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>(PUBLICATIONS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyBibtex = async (pub: PublicationItem) => {
    const bib = formatBibtexCitation(pub);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(bib);
      }
    } catch {
      // Fallback confirmation when clipboard API is restricted
    }
    setCopiedId(pub.id);
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-[#F5F5F7] py-16 text-[#1D1D1F] md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="border-b border-black/10 pb-10">
          <p className="text-xs font-medium text-[#6E6E73]">Scholarly Output</p>
          <h1
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#1D1D1F] sm:text-5xl"
            style={{ textWrap: 'balance' }}
          >
            Publications & Preprints
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#515154] sm:text-base">
            Peer-reviewed student research manuscripts, conference submissions, and pedagogical notes with BibTeX citations.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {PUBLICATIONS.map((pub, index) => {
            const isExpanded = expandedId === pub.id;
            const isCopied = copiedId === pub.id;
            return (
              <article
                key={pub.id}
                className="rounded-3xl border border-black/10 bg-white p-7 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6E6E73]">
                  <span>
                    {String(index + 1).padStart(2, '0')} · {pub.venue} · {pub.year}
                  </span>
                  <span className="font-mono text-[#1D1D1F]">{pub.status}</span>
                </div>

                <h2 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-[#1D1D1F] sm:text-2xl">
                  {pub.title}
                </h2>

                <p className="mt-2 text-sm text-[#515154]">
                  {pub.authors} · <span className="font-mono text-xs">{pub.doiOrId}</span> ·{' '}
                  <span className="tabular-nums">pp. {pub.pages}</span>
                </p>

                {isExpanded && (
                  <div className="mt-5 border-t border-black/10 pt-5">
                    <h3 className="text-xs font-semibold text-[#1D1D1F]">Abstract</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#515154]">
                      {pub.abstract}
                    </p>
                    <ul className="mt-4 space-y-1.5 text-sm text-[#515154]">
                      {pub.keyFindings.map((finding) => (
                        <li key={finding}>— {finding}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-black/10 pt-5">
                  <button
                    type="button"
                    onClick={() => onSelectPublication(pub)}
                    aria-label={`Open full record for ${pub.title}`}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[#1D1D1F] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-black whitespace-nowrap"
                  >
                    <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Open Full Record</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopyBibtex(pub)}
                    aria-label={`Copy BibTeX citation for ${pub.title}`}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-medium text-[#1D1D1F] transition-colors hover:bg-zinc-100 whitespace-nowrap"
                  >
                    {isCopied ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>{isCopied ? 'Copied BibTeX' : 'Copy BibTeX'}</span>
                  </button>

                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? 'Hide' : 'Read'} abstract for ${pub.title}`}
                    onClick={() => setExpandedId(isExpanded ? null : pub.id)}
                    className="inline-flex min-h-[40px] items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#515154] hover:text-[#1D1D1F] whitespace-nowrap"
                  >
                    <span>{isExpanded ? 'Hide Abstract' : 'Read Abstract'}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-150 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
