import { Download, ExternalLink, FileText, X } from 'lucide-react';

export interface PdfDocument {
  title: string;
  url: string;
}

interface PdfViewerProps {
  document: PdfDocument | null;
  onClose: () => void;
}

/** A single in-site PDF viewer shared by every document link. */
export function PdfViewer({ document, onClose }: PdfViewerProps) {
  if (!document) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col bg-[#090909] text-white"
      role="dialog"
      aria-modal="true"
      aria-label={document.title}
    >
      <header className="flex min-h-16 shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#101010] px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <FileText className="h-5 w-5 shrink-0 text-white/70" />
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">{document.title}</h2>
            <p className="text-xs text-white/45">PDF document</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={document.url}
            download
            className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 px-3 text-xs text-white/80 transition hover:bg-white/10"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </a>
          <a
            href={document.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open PDF in a separate tab"
            title="Open in new tab"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:bg-white/10"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close PDF viewer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>
      <main className="min-h-0 flex-1 bg-[#222]">
        <iframe
          key={document.url}
          src={document.url}
          title={document.title}
          className="h-full w-full border-0"
        />
      </main>
    </div>
  );
}
