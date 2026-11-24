import { useState } from 'react';
import { Activity, Cpu, Eye, Layers } from 'lucide-react';

interface MonochromeImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  diagramType?: 'acoustic' | 'microfluidic' | 'optics' | 'braille';
}

function TechnicalDiagramFallback({
  title,
  diagramType = 'acoustic',
}: {
  title?: string;
  diagramType?: 'acoustic' | 'microfluidic' | 'optics' | 'braille';
}) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#161618] via-[#101012] to-[#050506] p-6 text-center">
      <svg
        aria-hidden="true"
        viewBox="0 0 320 200"
        className="mb-3 h-28 w-44 text-zinc-500/70"
        fill="none"
      >
        {diagramType === 'optics' && (
          <>
            <line x1="20" y1="100" x2="115" y2="100" stroke="currentColor" strokeWidth="1.5" />
            <line x1="115" y1="40" x2="115" y2="90" stroke="#F5F5F7" strokeWidth="3" />
            <line x1="115" y1="110" x2="115" y2="160" stroke="#F5F5F7" strokeWidth="3" />
            <path d="M115 100 C175 60, 230 50, 300 45" stroke="currentColor" strokeWidth="1.2" />
            <path d="M115 100 C175 85, 230 82, 300 80" stroke="#D2D2D7" strokeWidth="1.5" />
            <path d="M115 100 L300 100" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M115 100 C175 115, 230 118, 300 120" stroke="#D2D2D7" strokeWidth="1.5" />
            <path d="M115 100 C175 140, 230 150, 300 155" stroke="currentColor" strokeWidth="1.2" />
          </>
        )}
        {diagramType === 'braille' && (
          <>
            {[0, 1].map((col) =>
              [0, 1, 2, 3].map((row) => (
                <circle
                  key={`${col}-${row}`}
                  cx={135 + col * 50}
                  cy={45 + row * 36}
                  r="10"
                  stroke="#F5F5F7"
                  strokeWidth="1.5"
                  fill={(col + row) % 2 === 0 ? '#F5F5F7' : 'transparent'}
                />
              ))
            )}
          </>
        )}
        {(diagramType === 'acoustic' || diagramType === 'microfluidic') && (
          <>
            <path
              d="M20 100 Q 50 45, 80 100 T 140 100 T 200 100 T 260 100 T 300 100"
              stroke="#F5F5F7"
              strokeWidth="1.8"
            />
            <circle cx="160" cy="100" r="56" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          </>
        )}
      </svg>
      <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-zinc-400">
        {diagramType === 'optics' ? (
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
        ) : diagramType === 'braille' ? (
          <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
        ) : diagramType === 'microfluidic' ? (
          <Layers className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Activity className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        <span>{title || 'Technical Schematic'}</span>
      </div>
    </div>
  );
}

export function MonochromeImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  diagramType,
}: MonochromeImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <TechnicalDiagramFallback title={fallbackTitle || alt} diagramType={diagramType} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
