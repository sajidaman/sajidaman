import { PROFILE } from '../data/portfolioData';
import type { PageId } from '../types/portfolio';
import { PAGE_DEFINITIONS } from '../utils/portfolioLogic';

interface FooterProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export function Footer({ currentPage, onNavigate }: FooterProps) {
  const researchPages: PageId[] = ['home', 'about', 'experience', 'projects'];
  const scholarlyPages: PageId[] = ['publication', 'awards', 'archive', 'fun', 'contact'];

  const renderLinks = (ids: PageId[]) =>
    ids.map((id) => {
      const item = PAGE_DEFINITIONS.find((p) => p.id === id)!;
      const active = currentPage === id;
      return (
        <li key={id}>
          <a
            href={item.path}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(id);
            }}
            className={`inline-block py-1 text-xs transition-colors ${
              active
                ? 'font-medium text-white underline underline-offset-4'
                : 'text-[#86868B] hover:text-white'
            }`}
          >
            {item.label}
          </a>
        </li>
      );
    });

  return (
    <footer className="border-t border-white/10 bg-[#0A0A0B] text-[#86868B]">
      <div className="mx-auto max-w-[1200px] px-6 py-14">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-sm font-semibold text-white">
              {PROFILE.name}
            </div>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-[#86868B]">
              {PROFILE.school} · {PROFILE.classYear} · {PROFILE.location}. Independent research in computational acoustics, biomedical instrumentation, and applied mathematics.
            </p>
            <p className="mt-4 font-mono text-[11px] tabular-nums text-zinc-500">
              ORCID {PROFILE.orcid}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-white">Portfolio</h2>
            <ul className="mt-3 space-y-1">{renderLinks(researchPages)}</ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-white">Academic Record</h2>
            <ul className="mt-3 space-y-1">{renderLinks(scholarlyPages)}</ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-[11px] text-[#86868B] sm:flex-row sm:items-center">
          <p>© 2026 {PROFILE.name}. Crafted in black, grey, and white.</p>
          <p className="tabular-nums">9 Pages · Palo Alto, CA</p>
        </div>
      </div>
    </footer>
  );
}
