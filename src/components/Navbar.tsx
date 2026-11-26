import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import type { PageId } from '../types/portfolio';
import { PAGE_DEFINITIONS } from '../utils/portfolioLogic';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const PRIMARY_NAV_IDS: PageId[] = ['about', 'experience', 'projects', 'publication'];
const MORE_NAV_IDS: PageId[] = ['awards', 'archive', 'fun', 'home'];

export function Navbar({ currentPage, onNavigate, theme, onToggleTheme }: NavbarProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isMoreActive =
    currentPage === 'awards' || currentPage === 'archive' || currentPage === 'fun';

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMoreOpen(false);
        setMobileOpen(false);
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (page: PageId) => {
    setMoreOpen(false);
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-8 px-6">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleSelect('home');
          }}
          className="font-display text-base font-semibold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-sm"
        >
          Sajid Aman
        </a>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7 text-xs font-medium text-[#A1A1A6]">
          {PRIMARY_NAV_IDS.map((id) => {
            const item = PAGE_DEFINITIONS.find((p) => p.id === id)!;
            const active = currentPage === id;
            return (
              <a
                key={id}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(id);
                }}
                aria-current={active ? 'page' : undefined}
                className={`whitespace-nowrap shrink-0 py-1 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-sm ${
                  active
                    ? 'text-white underline underline-offset-8 decoration-white/80'
                    : 'hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((prev) => !prev)}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-1 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-sm ${
                isMoreActive || moreOpen
                  ? 'text-white underline underline-offset-8 decoration-white/80'
                  : 'hover:text-white'
              }`}
            >
              <span>More</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-150 ${moreOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            {moreOpen && (
              <div
                role="menu"
                aria-label="Additional portfolio pages"
                className="absolute right-0 mt-3 w-64 rounded-2xl border border-white/12 bg-[#141416]/95 p-2 shadow-2xl backdrop-blur-2xl"
              >
                {MORE_NAV_IDS.map((id) => {
                  const item = PAGE_DEFINITIONS.find((p) => p.id === id)!;
                  const active = currentPage === id;
                  return (
                    <a
                      key={id}
                      role="menuitem"
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelect(id);
                      }}
                      className={`block rounded-xl px-3.5 py-2.5 transition-colors duration-150 ${
                        active ? 'bg-white text-black' : 'text-[#F5F5F7] hover:bg-white/10'
                      }`}
                    >
                      <div className="text-xs font-semibold">{item.label}</div>
                      <div className={`mt-0.5 text-[11px] leading-snug ${active ? 'text-neutral-700' : 'text-[#86868B]'}`}>
                        {item.description}
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              handleSelect('contact');
            }}
            className={`hidden md:inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              currentPage === 'contact' ? 'bg-zinc-200 text-black' : 'bg-white text-black hover:bg-zinc-200'
            }`}
          >
            Contact me
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav aria-label="Mobile navigation" className="border-t border-white/10 bg-[#0A0A0C] px-6 py-4 md:hidden">
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
        </nav>
      )}
    </header>
  );
}
