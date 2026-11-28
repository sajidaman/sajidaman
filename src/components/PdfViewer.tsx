import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronLeft, ChevronRight, Download, FileText, Maximize2, Minimize2,
  Minus, Plus, Printer, RotateCw, Search, SidebarClose, SidebarOpen, X,
} from 'lucide-react';
import * as pdfjs from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

export interface PdfDocument {
  title: string;
  url: string;
}

interface PdfViewerProps {
  document: PdfDocument | null;
  onClose: () => void;
}

export function PdfViewer({ document, onClose }: PdfViewerProps) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [fitWidth, setFitWidth] = useState(true);
  const [sidebar, setSidebar] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState<number[]>([]);
  const [matchIndex, setMatchIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const thumbRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const renderTaskRef = useRef<{ cancel: () => void }[]>([]);

  useEffect(() => {
    if (!document) return;
    let cancelled = false;
    let loaded: PDFDocumentProxy | null = null;
    setPdf(null);
    setPage(1);
    setPageCount(0);
    setZoom(1);
    setRotation(0);
    setError('');
    setLoading(true);
    pdfjs.getDocument({ url: document.url }).promise.then((result) => {
      loaded = result;
      if (cancelled) { void result.destroy(); return; }
      setPdf(result);
      setPageCount(result.numPages);
      setLoading(false);
    }).catch((reason: unknown) => {
      if (!cancelled) {
        setError(reason instanceof Error ? reason.message : 'The PDF could not be loaded.');
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
      renderTaskRef.current.forEach((task) => task.cancel());
      if (loaded) void loaded.destroy();
    };
  }, [document?.url]);

  useEffect(() => {
    if (!pdf) return;
    let cancelled = false;
    renderTaskRef.current.forEach((task) => task.cancel());
    renderTaskRef.current = [];
    const renderPages = async () => {
      for (let i = 1; i <= pdf.numPages; i += 1) {
        if (cancelled) return;
        const canvas = canvasRefs.current[i - 1];
        const thumb = thumbRefs.current[i - 1];
        if (!canvas) continue;
        try {
          const pdfPage = await pdf.getPage(i);
          const base = pdfPage.getViewport({ scale: 1, rotation });
          const availableWidth = Math.max(320, (scrollRef.current?.clientWidth ?? 900) - 64);
          const scale = fitWidth ? Math.min(2.5, availableWidth / base.width) : zoom;
          const viewport = pdfPage.getViewport({ scale, rotation });
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = `${viewport.width}px`;
          canvas.style.height = `${viewport.height}px`;
          const context = canvas.getContext('2d');
          if (context) {
            const task = pdfPage.render({ canvasContext: context, viewport, transform: dpr === 1 ? undefined : [dpr, 0, 0, dpr, 0, 0] });
            renderTaskRef.current.push(task);
            await task.promise;
          }
          if (thumb) {
            const thumbViewport = pdfPage.getViewport({ scale: 0.16, rotation });
            thumb.width = Math.ceil(thumbViewport.width);
            thumb.height = Math.ceil(thumbViewport.height);
            const thumbContext = thumb.getContext('2d');
            if (thumbContext) await pdfPage.render({ canvasContext: thumbContext, viewport: thumbViewport }).promise;
          }
        } catch (reason) {
          if (!(reason instanceof Error && reason.name === 'RenderingCancelledException')) console.error(reason);
        }
      }
    };
    void renderPages();
    return () => {
      cancelled = true;
      renderTaskRef.current.forEach((task) => task.cancel());
    };
  }, [pdf, zoom, rotation, fitWidth, sidebar]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        const index = pageRefs.current.findIndex((item) => item === visible.target);
        if (index >= 0) setPage(index + 1);
      }
    }, { root: scrollRef.current, threshold: [0.25, 0.5, 0.75] });
    pageRefs.current.forEach((item) => { if (item) observer.observe(item); });
    return () => observer.disconnect();
  }, [pdf, pageCount]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!document) return;
      if (event.key === 'Escape') onClose();
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f') {
        event.preventDefault();
        window.setTimeout(() => rootRef.current?.querySelector<HTMLInputElement>('[data-pdf-search]')?.focus(), 0);
      }
      if (event.key === 'ArrowLeft') setPage((p) => Math.max(1, p - 1));
      if (event.key === 'ArrowRight') setPage((p) => Math.min(pageCount, p + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [document, onClose, pageCount]);

  useEffect(() => {
    pageRefs.current[page - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [page]);

  const goToPage = useCallback((next: number) => {
    setPage(Math.max(1, Math.min(pageCount, next)));
  }, [pageCount]);

  const search = async () => {
    if (!pdf || !query.trim()) { setMatches([]); return; }
    const found: number[] = [];
    const needle = query.trim().toLocaleLowerCase();
    for (let i = 1; i <= pdf.numPages; i += 1) {
      const content = await (await pdf.getPage(i)).getTextContent();
      const text = content.items.map((item) => ('str' in item ? item.str : '')).join(' ').toLocaleLowerCase();
      if (text.includes(needle)) found.push(i);
    }
    setMatches(found);
    setMatchIndex(0);
    if (found.length) goToPage(found[0]);
  };

  const changeMatch = (direction: number) => {
    if (!matches.length) return;
    const next = (matchIndex + direction + matches.length) % matches.length;
    setMatchIndex(next);
    goToPage(matches[next]);
  };

  const toggleFullscreen = async () => {
    if (!rootRef.current) return;
    if (!window.document.fullscreenElement) await rootRef.current.requestFullscreen?.();
    else await window.document.exitFullscreen?.();
  };

  useEffect(() => {
    const update = () => setFullscreen(Boolean(window.document.fullscreenElement));
    window.document.addEventListener('fullscreenchange', update);
    return () => window.document.removeEventListener('fullscreenchange', update);
  }, []);

  if (!document) return null;

  const toolButton = 'inline-flex h-9 min-w-9 items-center justify-center gap-2 rounded-lg px-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30';
  return (
    <section ref={rootRef} className="fixed inset-0 z-[10000] flex flex-col bg-[#181818] text-white" role="dialog" aria-modal="true" aria-label={`${document.title} PDF viewer`}>
      <header className="flex min-h-14 shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#202020] px-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <FileText className="h-5 w-5 shrink-0 text-white/65" />
          <div className="min-w-0"><h2 className="truncate text-sm font-semibold">{document.title}</h2><p className="text-[10px] tracking-wide text-white/40">PDF DOCUMENT</p></div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <a href={document.url} download className={toolButton} aria-label="Download PDF" title="Download"><Download className="h-4 w-4" /><span className="hidden md:inline">Download</span></a>
          <button type="button" onClick={toggleFullscreen} className={toolButton} aria-label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'} title="Fullscreen">{fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}</button>
          <button type="button" onClick={onClose} className={toolButton} aria-label="Close viewer" title="Close"><X className="h-5 w-5" /></button>
        </div>
      </header>

      <div className="flex min-h-12 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#252525] px-2 sm:px-4">
        <div className="flex items-center gap-1">
          <button type="button" className={toolButton} onClick={() => setSidebar((v) => !v)} aria-label="Toggle thumbnails" title="Thumbnails">{sidebar ? <SidebarClose className="h-4 w-4" /> : <SidebarOpen className="h-4 w-4" />}</button>
          <span className="mx-1 h-5 w-px bg-white/10" />
          <button type="button" className={toolButton} onClick={() => goToPage(page - 1)} disabled={page <= 1} aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></button>
          <input aria-label="Current page" value={page || ''} onChange={(e) => goToPage(Number(e.target.value))} className="h-7 w-11 rounded border border-white/15 bg-[#151515] text-center text-xs text-white outline-none focus:border-white/50" />
          <span className="text-xs text-white/45">/ {pageCount || '—'}</span>
          <button type="button" className={toolButton} onClick={() => goToPage(page + 1)} disabled={page >= pageCount} aria-label="Next page"><ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" className={toolButton} onClick={() => { setFitWidth(false); setZoom((z) => Math.max(0.5, Math.round((z - 0.1) * 10) / 10)); }} aria-label="Zoom out"><Minus className="h-4 w-4" /></button>
          <button type="button" className="h-8 min-w-14 rounded px-2 text-xs text-white/75 hover:bg-white/10" onClick={() => { setFitWidth(true); setZoom(1); }}> {fitWidth ? 'Fit width' : `${Math.round(zoom * 100)}%`}</button>
          <button type="button" className={toolButton} onClick={() => { setFitWidth(false); setZoom((z) => Math.min(2.5, Math.round((z + 0.1) * 10) / 10)); }} aria-label="Zoom in"><Plus className="h-4 w-4" /></button>
          <button type="button" className={toolButton} onClick={() => setRotation((r) => (r + 90) % 360)} aria-label="Rotate clockwise" title="Rotate"><RotateCw className="h-4 w-4" /></button>
          <button type="button" className={toolButton} onClick={() => window.print()} aria-label="Print PDF" title="Print"><Printer className="h-4 w-4" /></button>
        </div>
        <form className="flex min-w-0 items-center gap-1" onSubmit={(e) => { e.preventDefault(); void search(); }}>
          <Search className="h-4 w-4 shrink-0 text-white/45" />
          <input data-pdf-search value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find in document" className="h-8 w-28 bg-transparent text-xs text-white outline-none placeholder:text-white/35 sm:w-36" aria-label="Find in document" />
          <button className={toolButton} type="submit">Find</button>
          {matches.length > 0 && <><span className="text-[10px] text-white/50">{matchIndex + 1}/{matches.length}</span><button type="button" className={toolButton} onClick={() => changeMatch(-1)} aria-label="Previous match"><ChevronLeft className="h-3 w-3" /></button><button type="button" className={toolButton} onClick={() => changeMatch(1)} aria-label="Next match"><ChevronRight className="h-3 w-3" /></button></>}
        </form>
      </div>

      <div className="flex min-h-0 flex-1">
        {sidebar && <aside className="hidden w-48 shrink-0 overflow-y-auto border-r border-white/10 bg-[#202020] p-3 sm:block" aria-label="Page thumbnails">
          {Array.from({ length: pageCount }, (_, i) => <button key={i} type="button" onClick={() => goToPage(i + 1)} className={`mb-3 flex w-full flex-col items-center gap-1 rounded-lg border p-2 transition ${page === i + 1 ? 'border-white/60 bg-white/10' : 'border-transparent hover:bg-white/5'}`}>
            <canvas ref={(node) => { thumbRefs.current[i] = node; }} className="max-h-40 max-w-full bg-white shadow" />
            <span className="text-[10px] text-white/65">{i + 1}</span>
          </button>)}
        </aside>}
        <main ref={scrollRef} className="min-w-0 flex-1 overflow-auto bg-[#333] px-3 py-6 sm:px-8" aria-label="PDF pages">
          {loading && <div className="flex h-full items-center justify-center text-sm text-white/60">Loading PDF…</div>}
          {error && <div className="mx-auto mt-12 max-w-lg rounded-xl border border-white/10 bg-[#202020] p-6 text-center"><FileText className="mx-auto mb-3 h-8 w-8 text-white/40" /><h3 className="mb-2 text-sm font-semibold">Unable to open this PDF</h3><p className="text-xs text-white/55">{error}</p><a href={document.url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-xs underline underline-offset-4">Try opening the original file</a></div>}
          {pdf && <div className="mx-auto flex w-fit min-w-full flex-col items-center gap-6">
            {Array.from({ length: pageCount }, (_, i) => <div key={i} ref={(node) => { pageRefs.current[i] = node; }} className="flex min-h-40 w-fit justify-center bg-white shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              <canvas ref={(node) => { canvasRefs.current[i] = node; }} aria-label={`Page ${i + 1}`} />
            </div>)}
          </div>}
        </main>
      </div>
      <footer className="flex min-h-7 shrink-0 items-center justify-between border-t border-white/10 bg-[#202020] px-4 text-[10px] text-white/40"><span>{document.title}</span><span>{pageCount ? `Page ${page} of ${pageCount}` : ' '}</span></footer>
    </section>
  );
}
