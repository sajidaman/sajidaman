import { useState } from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import type { ExperienceCategory } from '../types/portfolio';
import { filterExperiences } from '../utils/portfolioLogic';

const CATEGORIES: ExperienceCategory[] = [
  'All',
  'Research Labs',
  'Teaching & Mentorship',
  'Leadership',
];

export function ExperiencePage() {
  const [selectedCategory, setSelectedCategory] = useState<ExperienceCategory>('All');
  const filtered = filterExperiences(EXPERIENCES, selectedCategory);

  return (
    <div className="bg-black py-16 text-white md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="border-b border-white/10 pb-10">
          <p className="text-xs font-medium text-[#86868B]">Curriculum Vitae</p>
          <h1
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl"
            style={{ textWrap: 'balance' }}
          >
            Research & Teaching Experience
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#A1A1A6] sm:text-base">
            Laboratory internships, high school robotics and science leadership, and mathematics instruction across the Bay Area.
          </p>

          <div
            role="tablist"
            aria-label="Filter experience by category"
            className="mt-8 inline-flex flex-wrap items-center gap-1 rounded-2xl border border-white/10 bg-[#141416] p-1"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-xl px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors duration-150 ${
                    active
                      ? 'bg-white text-black'
                      : 'text-[#A1A1A6] hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 divide-y divide-white/10">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-12"
            >
              <div className="lg:col-span-4">
                <p className="font-mono text-xs tabular-nums text-zinc-300">
                  {item.period}
                </p>
                <p className="mt-1 text-xs text-[#86868B]">
                  {item.category} · {item.location}
                </p>
                {item.mentor && (
                  <p className="mt-3 text-xs text-[#86868B]">
                    Advisor: <span className="text-zinc-300">{item.mentor}</span>
                  </p>
                )}
              </div>

              <div className="lg:col-span-8">
                <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">
                  {item.role}
                </h2>
                <p className="mt-1 text-sm font-medium text-zinc-300">
                  {item.organization}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#A1A1A6]">
                  {item.summary}
                </p>

                <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm text-zinc-300">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="leading-relaxed">
                      — {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
