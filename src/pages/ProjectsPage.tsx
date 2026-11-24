import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import type { ProjectCategory, ProjectItem } from '../types/portfolio';
import { filterProjects } from '../utils/portfolioLogic';
import { MonochromeImage } from '../components/MonochromeImage';

interface ProjectsPageProps {
  onSelectProject: (project: ProjectItem) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All',
  'Hardware & Embedded',
  'Computational Biology',
  'Systems & ML',
];

export function ProjectsPage({ onSelectProject }: ProjectsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const filtered = filterProjects(PROJECTS, selectedCategory);

  return (
    <div className="bg-black py-16 text-white md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="border-b border-white/10 pb-10">
          <p className="text-xs font-medium text-[#86868B]">Engineering & Research</p>
          <h1
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl"
            style={{ textWrap: 'balance' }}
          >
            Selected Projects
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#A1A1A6] sm:text-base">
            Hardware prototypes, differentiable fluid solvers, and physics instrumentation engineered from schematic to validation.
          </p>

          <div
            role="tablist"
            aria-label="Filter projects by discipline"
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

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {filtered.map((project) => (
            <article
              key={project.id}
              className="flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#141416]"
            >
              <div className="aspect-[16/10] w-full border-b border-white/10 bg-[#0B0B0D]">
                <MonochromeImage
                  src={project.image}
                  alt={project.imageAlt || project.title}
                  fallbackTitle={project.title}
                  diagramType={project.diagramType}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-7">
                <div>
                  <p className="text-xs text-[#86868B]">
                    {project.category} · {project.year}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-zinc-300">
                    {project.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#A1A1A6]">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="font-mono text-sm font-medium tabular-nums text-white">
                          {metric.value}
                        </div>
                        <div className="text-[11px] text-[#86868B]">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="truncate text-xs text-[#86868B]">
                      {project.techStack.slice(0, 3).join(' · ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      aria-label={`Inspect Spec Sheet for ${project.title}`}
                      className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors hover:bg-zinc-200 whitespace-nowrap"
                    >
                      <span>Spec Sheet</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
