export type PageId =
  | 'home'
  | 'about'
  | 'experience'
  | 'awards'
  | 'archive'
  | 'projects'
  | 'publication'
  | 'fun'
  | 'contact';

export interface NavItem {
  id: PageId;
  label: string;
  path: string;
  description: string;
}

export type ProjectCategory =
  | 'All'
  | 'Computational Biology'
  | 'Hardware & Embedded'
  | 'Systems & ML';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  summary: string;
  methodology: string;
  outcome: string;
  image?: string;
  imageAlt?: string;
  diagramType: 'acoustic' | 'microfluidic' | 'optics' | 'braille';
  techStack: string[];
  metrics: ProjectMetric[];
  featured?: boolean;
  repoLabel: string;
}

export type ExperienceCategory =
  | 'All'
  | 'Research Labs'
  | 'Teaching & Mentorship'
  | 'Leadership';

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  category: Exclude<ExperienceCategory, 'All'>;
  summary: string;
  highlights: string[];
  mentor?: string;
}

export type AwardTier =
  | 'All'
  | 'International & National'
  | 'State & Regional'
  | 'School & Fellowships';

export interface AwardItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  tier: Exclude<AwardTier, 'All'>;
  recognition: string;
  linkedWork: string;
  details: string;
}

export type ArchiveType = 'All' | 'Lab Log' | 'Prototype' | 'Math Note' | 'Essay';

export interface ArchiveItem {
  id: string;
  year: string;
  dateLabel: string;
  title: string;
  type: Exclude<ArchiveType, 'All'>;
  summary: string;
  excerpt: string;
  artifactCode: string;
}

export interface PublicationItem {
  id: string;
  year: string;
  venue: string;
  status: string;
  title: string;
  authors: string;
  doiOrId: string;
  abstract: string;
  keyFindings: string[];
  pages: string;
  citationKey: string;
}

export interface PhotoFrame {
  id: string;
  title: string;
  location: string;
  year: string;
  camera: string;
  film: string;
  exposure: string;
  image: string;
  alt: string;
  caption: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormValues, string>>;
}
