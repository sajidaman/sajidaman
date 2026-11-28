import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import type { PageId } from '../types/portfolio';

interface FooterProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export function Footer(_props: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0B] text-[#86868B]">
      <div className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-display text-sm font-semibold text-white">{PROFILE.name}</div>
            <a href="https://orcid.org/0009-0003-2656-5827" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] tabular-nums text-zinc-500 transition-colors hover:text-white" aria-label="ORCID profile 0009-0003-2656-5827">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#A6CE39] font-sans text-[9px] font-bold text-white">iD</span>
              ORCID 0009-0003-2656-5827
            </a>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-white">Connect</h2>
            <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3">
              <li><a href="https://www.linkedin.com/in/sajidaman01/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs transition-colors hover:text-white"><Linkedin size={14} /> LinkedIn</a></li>
              <li><a href="https://www.instagram.com/seyfert/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs transition-colors hover:text-white"><Instagram size={14} /> Instagram</a></li>
              <li><a href="https://github.com/sajidaman" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs transition-colors hover:text-white"><Github size={14} /> GitHub</a></li>
              <li><a href="mailto:sajidaman01@outlook.com" className="inline-flex items-center gap-2 text-xs transition-colors hover:text-white"><Mail size={14} /> Email</a></li>
              <li><a href="https://orcid.org/0009-0003-2656-5827" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs transition-colors hover:text-white"><span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#A6CE39] text-[9px] font-bold text-white">iD</span> ORCID</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-[11px] text-[#86868B] sm:flex-row sm:items-center">
          <p>© 2026 {PROFILE.name}.</p>
          <p className="tabular-nums">Dhaka, Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
