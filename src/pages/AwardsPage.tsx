import { useState } from 'react';
import { AWARDS } from '../data/portfolioData';
import type { AwardItem, AwardTier } from '../types/portfolio';
import { filterAwards } from '../utils/portfolioLogic';

const TIERS: AwardTier[] = [
  'All',
  'International & National',
  'State & Regional',
  'School & Fellowships',
];

export function AwardsPage() {
  const [selectedTier, setSelectedTier] = useState<AwardTier>('All');
  const [expandedId, setExpandedId] = useState<string | null>(AWARDS[0].id);

  const filtered = filterAwards(AWARDS, selectedTier);

  const toggleExpand = (item: AwardItem) => {
    setExpandedId((prev) => (prev === item.id ? null : item.id));
  };

  return (
    <div className="bg-[#F5F5F7] py-16 text-[#1D1D1F] md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="border-b border-black/10 pb-10">
          <p className="text-xs font-medium text-[#6E6E73]">Honors & Distinctions</p>
          <h1
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#1D1D1F] sm:text-5xl"
            style={{ textWrap: 'balance' }}
          >
            Awards & Academic Recognition
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#515154] sm:text-base">
            Competitions, research fair honors, and fellowships earned across biomedical engineering, physics, and mathematics.
          </p>

          <div
            role="tablist"
            aria-label="Filter awards by tier"
            className="mt-8 inline-flex flex-wrap items-center gap-1 rounded-2xl border border-black/10 bg-white p-1"
          >
            {TIERS.map((tier) => {
              const active = selectedTier === tier;
              return (
                <button
                  key={tier}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setSelectedTier(tier)}
                  className={`rounded-xl px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors duration-150 ${
                    active
                      ? 'bg-[#1D1D1F] text-white'
                      : 'text-[#515154] hover:text-[#1D1D1F]'
                  }`}
                >
                  {tier}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {filtered.map((award) => {
            const isExpanded = expandedId === award.id;
            return (
              <article
                key={award.id}
                className="overflow-hidden rounded-2xl border border-black/10 bg-white transition-colors"
              >
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-label={`${isExpanded ? 'Hide' : 'View'} details for ${award.title}`}
                  onClick={() => toggleExpand(award)}
                  className="flex w-full flex-col gap-3 p-6 text-left sm:flex-row sm:items-center sm:justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                    <span className="font-mono text-xs font-medium tabular-nums text-[#6E6E73]">
                      {award.year}
                    </span>
                    <div>
                      <h2 className="font-display text-base font-semibold text-[#1D1D1F] sm:text-lg">
                        {award.title}
                      </h2>
                      <p className="mt-0.5 text-xs text-[#515154]">
                        {award.organization} · {award.tier} · {award.recognition}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-medium text-[#1D1D1F] whitespace-nowrap">
                    {isExpanded ? 'Hide Details' : 'View Details'}
                  </span>
                </button>

                {isExpanded && (
                  <div className="border-t border-black/10 bg-[#FAFAFC] px-6 py-5 text-sm text-[#515154]">
                    <p className="leading-relaxed">{award.details}</p>
                    <p className="mt-3 text-xs text-[#6E6E73]">
                      Associated Work:{' '}
                      <span className="font-medium text-[#1D1D1F]">
                        {award.linkedWork}
                      </span>
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
