import type { PageId, ProjectItem, PublicationItem } from '../types/portfolio';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectPublication: (publication: PublicationItem) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <section
      aria-labelledby="home-title"
      className="flex min-h-[72vh] items-center px-6 py-20 sm:px-10 lg:px-16"
    >
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.24em] text-current/50">
          Personal portfolio
        </p>

        <h1
          id="home-title"
          className="max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-[-0.055em] text-current sm:text-7xl lg:text-8xl"
        >
          Sajid Aman<span className="text-current/35">.</span>
        </h1>

        <div className="mt-8 max-w-2xl border-l border-current/25 pl-5 sm:pl-6">
          <p className="text-lg leading-relaxed text-current/80 sm:text-xl">
            High school student at Notre Dame College, exploring physics,
            astronomy, and the engineering of space.
          </p>
          <p className="mt-3 text-sm tracking-wide text-current/50">
            Dhaka, Bangladesh
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="inline-flex min-h-11 items-center rounded-full border border-current bg-current px-6 py-3 text-sm font-medium text-[var(--page-bg,#000)] transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4"
          >
            Explore my work <span aria-hidden="true" className="ml-2">↗</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="inline-flex min-h-11 items-center rounded-full border border-current/20 px-6 py-3 text-sm font-medium text-current transition-colors hover:bg-current/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4"
          >
            About me
          </button>
        </div>

        <div className="mt-20 flex flex-wrap gap-x-8 gap-y-3 border-t border-current/10 pt-5 text-[11px] uppercase tracking-[0.16em] text-current/45">
          <span>Physics</span>
          <span>Astronomy</span>
          <span>Astronautics</span>
          <span>Computational science</span>
        </div>
      </div>
    </section>
  );
}
