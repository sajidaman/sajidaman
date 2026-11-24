import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  ASSETS,
  AWARDS,
  PROFILE,
  PROJECTS,
  PUBLICATIONS,
} from '../data/portfolioData';
import type { PageId, ProjectItem, PublicationItem } from '../types/portfolio';
import { PAGE_DEFINITIONS } from '../utils/portfolioLogic';
import { MonochromeImage } from '../components/MonochromeImage';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectPublication: (publication: PublicationItem) => void;
}

export function HomePage({
  onNavigate,
  onSelectProject,
  onSelectPublication,
}: HomePageProps) {
  const flagship = PROJECTS[0];
  const secondary = PROJECTS[1];
  const latestPub = PUBLICATIONS[0];
  const topAward = AWARDS[0];

  const directoryPages = PAGE_DEFINITIONS.filter((p) => p.id !== 'home');

  return (
    <div>
      {/* Hero Split — Pure Black Keynote Canvas */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-[1200px] px-6 pb-14 pt-12 md:pt-16">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
            <div className="flex flex-col justify-between lg:col-span-6 lg:py-4">
              <div>
                <p className="text-xs font-medium tracking-wide text-[#86868B]">
                  {PROFILE.school} · {PROFILE.classYear} · {PROFILE.location}
                </p>
                <h1
                  className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.06]"
                  style={{ textWrap: 'balance' }}
                >
                  {PROFILE.tagline}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-[#A1A1A6] sm:text-lg">
                  {PROFILE.subtitle}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-150 hover:bg-zinc-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('publication')}
                  className="inline-flex min-h-[44px] items-center gap-1.5 px-3 py-2 text-sm font-medium text-white transition-colors duration-150 hover:text-zinc-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md"
                >
                  <span>Read Publications</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-72 overflow-hidden rounded-3xl border border-white/10 bg-[#0D0D0F] sm:h-96 lg:h-full lg:min-h-[400px]">
                <MonochromeImage
                  src={ASSETS.heroSculpture}
                  alt="Anodized black aluminum acoustic sensors and optical glass prism on obsidian slate"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Full-width Quantitative Strip below hero split */}
          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
            {PROFILE.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="font-display text-2xl font-semibold tracking-tight tabular-nums text-white sm:text-3xl">
                  {metric.value}
                </div>
                <div className="mt-1 text-xs text-[#86868B]">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Research Bento Grid — Deep Charcoal Canvas */}
      <section className="border-t border-white/10 bg-[#0A0A0C] py-20 text-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium text-[#86868B]">Selected Inquiry</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Built, measured, and published.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('archive')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white whitespace-nowrap self-start sm:self-auto"
            >
              <span>Browse Full Archive</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Flagship 2-col Bento Card */}
            <article className="flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#141416] lg:col-span-7">
              <div className="p-7 sm:p-8">
                <p className="text-xs text-[#86868B]">
                  {flagship.category} · {flagship.year}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white">
                  {flagship.title}
                </h3>
                <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[#A1A1A6]">
                  {flagship.summary}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-zinc-300">
                  {flagship.metrics.slice(0, 3).map((m) => (
                    <span key={m.label} className="tabular-nums">
                      <strong className="font-mono text-white">{m.value}</strong>{' '}
                      <span className="text-[#86868B]">{m.label}</span>
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => onSelectProject(flagship)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors hover:bg-zinc-200 whitespace-nowrap"
                  >
                    <span>Inspect Spec Sheet</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="aspect-[16/9] w-full border-t border-white/10 bg-[#1C1C1F]">
                <MonochromeImage
                  src={flagship.image}
                  alt={flagship.imageAlt || flagship.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </article>

            {/* Right Column Stacked Bento Cards */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <article className="flex flex-1 flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#141416]">
                <div className="p-7">
                  <p className="text-xs text-[#86868B]">
                    {secondary.category} · {secondary.year}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white">
                    {secondary.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A1A1A6]">
                    {secondary.subtitle}.
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelectProject(secondary)}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-white hover:text-zinc-300 whitespace-nowrap"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
                <div className="aspect-[16/9] w-full border-t border-white/10 bg-black">
                  <MonochromeImage
                    src={secondary.image}
                    alt={secondary.imageAlt || secondary.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </article>

              <article className="rounded-3xl border border-white/10 bg-[#141416] p-7">
                <p className="text-xs text-[#86868B]">
                  Latest Publication · {latestPub.year}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-white">
                  {latestPub.title}
                </h3>
                <p className="mt-2 text-xs text-[#A1A1A6]">
                  {latestPub.venue} · {latestPub.doiOrId}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onSelectPublication(latestPub)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-white hover:text-zinc-300 whitespace-nowrap"
                  >
                    <span>Read Abstract & Cite</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Alternating Light Apple Section — Recognition & Complete 9-Page Directory */}
      <section className="bg-[#F5F5F7] py-20 text-[#1D1D1F]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 gap-8 border-b border-black/10 pb-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium text-[#6E6E73]">
                Recent Recognition · {topAward.year}
              </p>
              <h2
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1D1D1F] sm:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                {topAward.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#515154]">
                {topAward.details}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <button
                type="button"
                onClick={() => onNavigate('awards')}
                className="inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-black whitespace-nowrap"
              >
                <span>All Honors & Awards</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-5 py-2.5 text-xs font-medium text-[#1D1D1F] transition-colors hover:bg-zinc-100 whitespace-nowrap"
              >
                <span>Academic Biography</span>
              </button>
            </div>
          </div>

          <div className="pt-14">
            <p className="text-xs font-medium text-[#6E6E73]">Portfolio Index</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#1D1D1F]">
              Every section of the portfolio
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {directoryPages.map((page, index) => (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => onNavigate(page.id)}
                  className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 text-left transition-all duration-150 hover:-translate-y-0.5 hover:border-black/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <div>
                    <span className="font-mono text-xs tabular-nums text-[#86868B]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-[#1D1D1F]">
                      {page.label}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#515154]">
                      {page.description}
                    </p>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-[#1D1D1F]">
                    <span>Open {page.label}</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
