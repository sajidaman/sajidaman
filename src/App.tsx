import { useEffect, useState } from 'react';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { Footer } from './components/Footer';
import {
  ArchiveDetailModal,
  PhotoLightboxModal,
  ProjectDetailModal,
  PublicationDetailModal,
} from './components/Modals';
import { Navbar } from './components/Navbar';
import { AboutPage } from './pages/AboutPage';
import { ArchivePage } from './pages/ArchivePage';
import { AwardsPage } from './pages/AwardsPage';
import { ContactPage } from './pages/ContactPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { FunPage } from './pages/FunPage';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PublicationPage } from './pages/PublicationPage';
import type {
  ArchiveItem,
  PageId,
  PhotoFrame,
  ProjectItem,
  PublicationItem,
} from './types/portfolio';
import {
  getPathForPage,
  PAGE_DEFINITIONS,
  parsePageFromPath,
} from './utils/portfolioLogic';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() =>
    parsePageFromPath(window.location.pathname)
  );
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedPublication, setSelectedPublication] =
    useState<PublicationItem | null>(null);
  const [selectedArchive, setSelectedArchive] = useState<ArchiveItem | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoFrame | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(parsePageFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const pageMeta = PAGE_DEFINITIONS.find((p) => p.id === currentPage);
    document.title =
      currentPage === 'home'
        ? 'Ananya Nair — Academic Portfolio'
        : `${pageMeta?.label ?? 'Portfolio'} · Ananya Nair`;
  }, [currentPage]);

  const navigateTo = (page: PageId) => {
    const targetPath = getPathForPage(page);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-[#F5F5F7]">
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      <main className="flex-1" data-page={currentPage}>
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectProject={setSelectedProject}
            onSelectPublication={setSelectedPublication}
          />
        )}
        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}
        {currentPage === 'experience' && <ExperiencePage />}
        {currentPage === 'awards' && <AwardsPage />}
        {currentPage === 'archive' && (
          <ArchivePage onSelectArchive={setSelectedArchive} />
        )}
        {currentPage === 'projects' && (
          <ProjectsPage onSelectProject={setSelectedProject} />
        )}
        {currentPage === 'publication' && (
          <PublicationPage onSelectPublication={setSelectedPublication} />
        )}
        {currentPage === 'fun' && <FunPage onSelectPhoto={setSelectedPhoto} />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer currentPage={currentPage} onNavigate={navigateTo} />

      <AccessibilityPanel />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <PublicationDetailModal
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)}
      />
      <ArchiveDetailModal
        item={selectedArchive}
        onClose={() => setSelectedArchive(null)}
      />
      <PhotoLightboxModal
        frame={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}
