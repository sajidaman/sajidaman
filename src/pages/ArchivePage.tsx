import { useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { ARCHIVE_ITEMS } from '../data/portfolioData';
import type { ArchiveItem, ArchiveType } from '../types/portfolio';
import { filterArchiveItems } from '../utils/portfolioLogic';

interface ArchivePageProps {
  onSelectArchive: (item: ArchiveItem) => void;
}

const YEARS = ['All', '2026', '2025', '2024', '2023'];
const TYPES: ArchiveType[] = ['All', 'Lab Log', 'Prototype', 'Math Note', 'Essay'];

export function ArchivePage({ onSelectArchive }: ArchivePageProps) {
  const [query, setQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState<ArchiveType>('All');

  const items = filterArchiveItems(ARCHIVE_ITEMS, query, yearFilter, typeFilter);

  return (
    <div className="bg-black py-16 text-white md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="border-b border-white/10 pb-10">
          <p className="text-xs font-medium text-[#86868B]">Index 2023–2026</p>
          <h1
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl"
            style={{ textWrap: 'balance' }}
          >
            Research & Hardware Archive
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#A1A1A6] sm:text-base">
            Chronological log of lab notebook entries, failure analyses, early prototypes, and mathematical teaching notes.
          </p>

          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <label htmlFor="archive-search" className="sr-only">
                Search archive entries
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868B]"
                aria-hidden="true"
              />
              <input
                id="archive-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search logs, codes, or topics..."
                className="w-full rounded-xl border border-white/15 bg-[#141416] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-[#86868B] focus:border-white focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div
                role="group"
                aria-label="Filter archive by year"
                className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-[#141416] p-1"
              >
                {YEARS.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setYearFilter(year)}
                    className={`rounded-lg px-3 py-1.5 font-mono text-xs tabular-nums whitespace-nowrap transition-colors ${
                      yearFilter === year
                        ? 'bg-white text-black font-medium'
                        : 'text-[#A1A1A6] hover:text-white'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              <div
                role="group"
                aria-label="Filter archive by entry type"
                className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#141416] p-1"
              >
                {TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTypeFilter(type)}
                    className={`rounded-lg px-3 py-1.5 text-xs whitespace-nowrap transition-colors ${
                      typeFilter === type
                        ? 'bg-white text-black font-medium'
                        : 'text-[#A1A1A6] hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-[#141416] p-10 text-center">
            <p className="text-sm font-medium text-white">No matching archival entries</p>
            <p className="mt-1 text-xs text-[#86868B]">
              Adjust your search keyword, year, or entry type filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setYearFilter('All');
                setTypeFilter('All');
              }}
              className="mt-4 rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white hover:bg-white/10"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-6 divide-y divide-white/10 border-b border-white/10">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#86868B]">
                    <span className="font-mono text-zinc-300 tabular-nums">
                      {item.artifactCode}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.dateLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.type}</span>
                  </div>
                  <h2 className="mt-1.5 font-display text-base font-semibold text-white sm:text-lg">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-[#A1A1A6]">{item.summary}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectArchive(item)}
                  aria-label={`Read archival entry ${item.artifactCode}: ${item.title}`}
                  className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 self-start rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white hover:text-black sm:self-center whitespace-nowrap"
                >
                  <span>Read Entry</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
