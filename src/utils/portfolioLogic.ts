import type {
  ArchiveItem,
  ArchiveType,
  AwardItem,
  AwardTier,
  ContactFormValues,
  ContactValidationResult,
  ExperienceCategory,
  ExperienceItem,
  NavItem,
  PageId,
  ProjectCategory,
  ProjectItem,
  PublicationItem,
} from '../types/portfolio';

export const PAGE_DEFINITIONS: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    description: 'Overview, flagship research, and selected academic highlights.',
  },
  {
    id: 'about',
    label: 'About',
    path: '/about',
    description: 'Academic biography, coursework, research philosophy, and reading.',
  },
  {
    id: 'experience',
    label: 'Experience',
    path: '/experience',
    description: 'Laboratory appointments, teaching roles, and technical leadership.',
  },
  {
    id: 'awards',
    label: 'Awards',
    path: '/awards',
    description: 'National, state, and fellowship honors across science and math.',
  },
  {
    id: 'archive',
    label: 'Archive',
    path: '/archive',
    description: 'Searchable chronology of lab notebooks, prototypes, and notes.',
  },
  {
    id: 'projects',
    label: 'Projects',
    path: '/projects',
    description: 'Hardware prototypes, simulation engines, and biomedical builds.',
  },
  {
    id: 'publication',
    label: 'Publication',
    path: '/publication',
    description: 'Preprints, conference papers, abstracts, and BibTeX citations.',
  },
  {
    id: 'fun',
    label: 'Fun',
    path: '/fun',
    description: '35mm monochrome photography, cellular automata, and curiosities.',
  },
  {
    id: 'contact',
    label: 'Contact me',
    path: '/contact',
    description: 'Direct academic inquiry form, office hours, and scholarly profiles.',
  },
];

const PATH_TO_PAGE: Record<string, PageId> = {
  '/': 'home',
  '/home': 'home',
  '/about': 'about',
  '/experience': 'experience',
  '/awards': 'awards',
  '/archive': 'archive',
  '/projects': 'projects',
  '/publication': 'publication',
  '/publications': 'publication',
  '/fun': 'fun',
  '/contact': 'contact',
  '/contact-me': 'contact',
};

export function isValidPageId(value: string): value is PageId {
  return PAGE_DEFINITIONS.some((item) => item.id === value);
}

export function parsePageFromPath(pathname: string): PageId {
  // Accept both legacy path routes and GitHub Pages-safe hash routes (/#/about).
  const route = pathname.trim().startsWith('#') ? pathname.trim().slice(1) : pathname.trim();
  const normalized = route.toLowerCase().replace(/\/+$/, '') || '/';
  return PATH_TO_PAGE[normalized] ?? 'home';
}

export function getPathForPage(pageId: PageId): string {
  const match = PAGE_DEFINITIONS.find((item) => item.id === pageId);
  return match ? match.path : '/';
}

export function filterProjects(
  items: ProjectItem[],
  category: ProjectCategory
): ProjectItem[] {
  if (category === 'All') return items;
  return items.filter((item) => item.category === category);
}

export function filterExperiences(
  items: ExperienceItem[],
  category: ExperienceCategory
): ExperienceItem[] {
  if (category === 'All') return items;
  return items.filter((item) => item.category === category);
}

export function filterAwards(
  items: AwardItem[],
  tier: AwardTier
): AwardItem[] {
  if (tier === 'All') return items;
  return items.filter((item) => item.tier === tier);
}

export function filterArchiveItems(
  items: ArchiveItem[],
  query: string,
  yearFilter: string,
  typeFilter: ArchiveType
): ArchiveItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  return items.filter((item) => {
    const matchesYear = yearFilter === 'All' || item.year === yearFilter;
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    if (!matchesYear || !matchesType) return false;
    if (!normalizedQuery) return true;
    const haystack = `${item.title} ${item.summary} ${item.excerpt} ${item.artifactCode} ${item.type}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

export function formatBibtexCitation(pub: PublicationItem): string {
  return [
    `@article{${pub.citationKey},`,
    `  title={${pub.title}},`,
    `  author={${pub.authors}},`,
    `  journal={${pub.venue}},`,
    `  year={${pub.year}},`,
    `  pages={${pub.pages}},`,
    `  note={${pub.doiOrId}}`,
    `}`,
  ].join('\n');
}

export function formatApaCitation(pub: PublicationItem): string {
  return `${pub.authors} (${pub.year}). ${pub.title}. ${pub.venue}, pp. ${pub.pages}. ${pub.doiOrId}`;
}

export function validateContactForm(
  values: ContactFormValues
): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedTopic = values.topic.trim();
  const trimmedMessage = values.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmedEmail)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!trimmedTopic) {
    errors.topic = 'Please select an inquiry topic.';
  }

  if (trimmedMessage.length < 15) {
    errors.message = 'Please include a short message of at least 15 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function stepGameOfLife(grid: boolean[][]): boolean[][] {
  const rows = grid.length;
  if (rows === 0) return [];
  const cols = grid[0].length;
  const next: boolean[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => false)
  );

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let neighbors = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = (r + dr + rows) % rows;
          const nc = (c + dc + cols) % cols;
          if (grid[nr][nc]) neighbors++;
        }
      }
      const alive = grid[r][c];
      next[r][c] = alive ? neighbors === 2 || neighbors === 3 : neighbors === 3;
    }
  }
  return next;
}
