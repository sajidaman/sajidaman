import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterArchiveItems,
  filterAwards,
  filterProjects,
  formatApaCitation,
  formatBibtexCitation,
  getPathForPage,
  parsePageFromPath,
  stepGameOfLife,
  validateContactForm,
} from './portfolioLogic';
import type {
  ArchiveItem,
  AwardItem,
  ProjectItem,
  PublicationItem,
} from '../types/portfolio';

test('parsePageFromPath resolves all 9 portfolio routes cleanly', () => {
  assert.equal(parsePageFromPath('/'), 'home');
  assert.equal(parsePageFromPath('/about'), 'about');
  assert.equal(parsePageFromPath('/experience/'), 'experience');
  assert.equal(parsePageFromPath('/awards'), 'awards');
  assert.equal(parsePageFromPath('/archive'), 'archive');
  assert.equal(parsePageFromPath('/projects'), 'projects');
  assert.equal(parsePageFromPath('/publication'), 'publication');
  assert.equal(parsePageFromPath('/fun'), 'fun');
  assert.equal(parsePageFromPath('/contact'), 'contact');
  assert.equal(parsePageFromPath('/contact-me'), 'contact');
  assert.equal(parsePageFromPath('/unknown-path'), 'home');
});

test('getPathForPage returns canonical paths', () => {
  assert.equal(getPathForPage('home'), '/');
  assert.equal(getPathForPage('publication'), '/publication');
  assert.equal(getPathForPage('contact'), '/contact');
});

test('filterProjects filters by category accurately', () => {
  const sample: ProjectItem[] = [
    {
      id: 'p1',
      title: 'StethoNet',
      subtitle: 'Acoustic cardiac screening',
      category: 'Hardware & Embedded',
      year: '2026',
      summary: 'Test',
      methodology: 'Test',
      outcome: 'Test',
      diagramType: 'acoustic',
      techStack: ['C++'],
      metrics: [],
      repoLabel: 'github.com/test',
    },
    {
      id: 'p2',
      title: 'CellDiff',
      subtitle: 'Microfluidic model',
      category: 'Computational Biology',
      year: '2025',
      summary: 'Test',
      methodology: 'Test',
      outcome: 'Test',
      diagramType: 'microfluidic',
      techStack: ['Python'],
      metrics: [],
      repoLabel: 'github.com/test2',
    },
  ];
  assert.equal(filterProjects(sample, 'All').length, 2);
  assert.equal(filterProjects(sample, 'Hardware & Embedded').length, 1);
  assert.equal(filterProjects(sample, 'Systems & ML').length, 0);
});

test('filterAwards filters by tier', () => {
  const awards: AwardItem[] = [
    {
      id: 'a1',
      year: '2026',
      title: 'ISEF Finalist',
      organization: 'Society for Science',
      tier: 'International & National',
      recognition: '3rd Grand Award',
      linkedWork: 'StethoNet',
      details: 'Details',
    },
    {
      id: 'a2',
      year: '2025',
      title: 'Bay Area Science Fair',
      organization: 'SF Bay',
      tier: 'State & Regional',
      recognition: '1st Place',
      linkedWork: 'CellDiff',
      details: 'Details',
    },
  ];
  assert.equal(filterAwards(awards, 'All').length, 2);
  assert.equal(filterAwards(awards, 'State & Regional')[0].id, 'a2');
});

test('filterArchiveItems combines search query, year, and type', () => {
  const archive: ArchiveItem[] = [
    {
      id: 'ar1',
      year: '2026',
      dateLabel: 'Feb 2026',
      title: 'Piezo Array Calibration Log',
      type: 'Lab Log',
      summary: 'Calibration of MEMS diaphragms',
      excerpt: 'Excerpt',
      artifactCode: 'LOG-26-04',
    },
    {
      id: 'ar2',
      year: '2024',
      dateLabel: 'Nov 2024',
      title: 'Fourier Optics Note',
      type: 'Math Note',
      summary: 'Fraunhofer diffraction notes',
      excerpt: 'Excerpt',
      artifactCode: 'NOTE-24-11',
    },
  ];

  assert.equal(filterArchiveItems(archive, 'MEMS', 'All', 'All').length, 1);
  assert.equal(filterArchiveItems(archive, '', '2024', 'Math Note').length, 1);
  assert.equal(filterArchiveItems(archive, 'MEMS', '2024', 'All').length, 0);
});

test('citation formatters output valid BibTeX and APA strings', () => {
  const pub: PublicationItem = {
    id: 'pub1',
    year: '2026',
    venue: 'Journal of Student Biomedical Engineering',
    status: 'Published',
    title: 'Low-Power Acoustic Murmur Classification',
    authors: 'Nair, A., & Chen, D.',
    doiOrId: 'DOI: 10.1109/JSBE.2026.014',
    abstract: 'Abstract text',
    keyFindings: ['Finding 1'],
    pages: '14-26',
    citationKey: 'nair2026acoustic',
  };

  const bib = formatBibtexCitation(pub);
  const apa = formatApaCitation(pub);
  assert.ok(bib.includes('@article{nair2026acoustic,'));
  assert.ok(bib.includes('year={2026}'));
  assert.ok(apa.includes('Nair, A., & Chen, D. (2026).'));
});

test('validateContactForm rejects invalid inputs and accepts valid submissions', () => {
  const invalid = validateContactForm({
    name: 'A',
    email: 'not-an-email',
    topic: '',
    message: 'Too short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.topic);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Dr. Elena Rostova',
    email: 'elena.rostova@university.edu',
    topic: 'Research Collaboration',
    message: 'I read your acoustic biomarker preprint and would love to discuss dataset validation.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('stepGameOfLife oscillates a classic 3-cell blinker', () => {
  const horizontal = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, true, true, true, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ];
  const vertical = stepGameOfLife(horizontal);
  assert.equal(vertical[1][2], true);
  assert.equal(vertical[2][2], true);
  assert.equal(vertical[3][2], true);
  assert.equal(vertical[2][1], false);
  assert.equal(vertical[2][3], false);
});
