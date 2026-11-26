import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import type { PageId } from '../types/portfolio';
import { PAGE_DEFINITIONS } from '../utils/portfolioLogic';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Navbar({ currentPage, onNavigate, theme, onToggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (page: PageId) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <div className="mx-auto flex min-h-14 max-w-[1440px] items-center justify-between gap-5 px-5">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleSelect('home');
          }}
          className="shrink-0 rounded-sm font-display text-base font-semibold tracking-tight text-white whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          Sajid Aman
        </a>

        <nav
          aria-label="Portfolio pages"
          className="hidden min-w-0 flex-1 items-center justify-center gap-x-10 gap-y-2 overflow-x-auto py-2 text-[11px] font-medium text-[#A1A1A6] lg:flex"
        >
          {PAGE_DEFINITIONS.map((item) => {
            const active = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(item.id);
                }}
                aria-current={active ? 'page' : undefined}
                className={`shrink-0 whitespace-nowrap rounded-sm py-1 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                  active
                    ? 'text-white underline underline-offset-8 decoration-white/80'
                    : 'hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-white/30 px-5 py-2 text-xs font-semibold tracking-wide text-white transition-colors hover:border-white hover:bg-white hover:text-black lg:inline-flex"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav aria-label="Mobile portfolio pages" className="border-t border-white/10 bg-[#0A0A0C] px-6 py-4 lg:hidden">
          <div className="grid grid-cols-1 gap-1">
            {PAGE_DEFINITIONS.map((item) => {
              const active = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelect(item.id);
                  }}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    active ? 'bg-white text-black' : 'text-[#F5F5F7] hover:bg-white/10'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={`text-xs ${active ? 'text-neutral-600' : 'text-[#86868B]'}`}>{item.path}</span>
                </a>
              );
            })}
          </div>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex min-h-[44px] items-center justify-center rounded-full border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
          >
            Resume
          </a>
        </nav>
      )}
    </header>
  );
}
