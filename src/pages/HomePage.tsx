import { useEffect, useState } from 'react';
import type { PageId, ProjectItem, PublicationItem } from '../types/portfolio';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectPublication: (publication: PublicationItem) => void;
}

export function HomePage(_props: HomePageProps) {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    let objectUrl = '';
    let cancelled = false;

    fetch('/space.mp4.b64')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load homepage video');
        return response.text();
      })
      .then((encoded) => {
        const binary = atob(encoded.trim());
        const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
        objectUrl = URL.createObjectURL(new Blob([bytes], { type: 'video/mp4' }));
        if (cancelled) {
          URL.revokeObjectURL(objectUrl);
        } else {
          setVideoUrl(objectUrl);
        }
      })
      .catch((error) => console.error(error));

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  return (
    <section aria-label="Space motion visual" className="w-full bg-black">
      {videoUrl && (
        <video
          className="block h-auto w-full"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="A cinematic view of space"
        />
      )}
    </section>
  );
}
