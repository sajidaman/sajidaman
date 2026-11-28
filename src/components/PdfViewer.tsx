import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronLeft, ChevronRight, Download, FileText, Maximize2, Minimize2,
  Minus, Plus, Printer, RotateCw, Search, SidebarClose, SidebarOpen, X,
  Highlighter, Underline, Strikethrough, StickyNote, BookOpen, Trash2,
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
type MarkKind = 'highlight' | 'underline' | 'strike' | 'note';
interface MarkRect { x: number; y: number; w: number; h: number }
interface PdfMark {
  id: string;
  kind: MarkKind;
  page: number;
  text: string;
  note?: string;
  color: string;
  rects: MarkRect[];
}
interface SelectionDraft {
  page: number;
  text: string;
  rects: MarkRect[];
}
interface DictionaryEntry {
  word?: string;
  phonetic?: string;
  phonetics?: { text?: string; audio?: string }[];
  meanings?: { partOfSpeech?: string; definitions?: { definition: string; example?: string }[] }[];
}

const colors = [
  { name: 'Yellow', value: '#ffe66d' },
  { name: 'Green', value: '#9be7a5' },
  { name: 'Blue', value: '#8ecbff' },
  { name: 'Pink', value: '#ffb4d2' },
];

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
  const [marks, setMarks] = useState<PdfMark[]>([]);
  const [selection, setSelection] = useState<SelectionDraft | null>(null);
  const [markColor, setMarkColor] = useState(colors[0].value);
  const [noteDraft, setNoteDraft] = useState('');
  const [noteTarget, setNoteTarget] = useState<SelectionDraft | null>(null);
  const [dictionaryWord, setDictionaryWord] = useState('');
  const [dictionaryEntry, setDictionaryEntry] = useState<DictionaryEntry | null>(null);
  const [dictionaryLoading, setDictionaryLoading] = useState(false);
  const [dictionaryError, setDictionaryError] = useState('');
  const [activePanel, setActivePanel] = useState<'notes' | 'dictionary' | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const textLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const renderTaskRef = useRef<{ cancel: () => void }[]>([]);

  const storageKey = document ? `sajid-pdf-marks:${document.url}` : '';

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
    setSelection(null);
    setDictionaryWord('');
    try {
      const saved = localStorage.getItem(`sajid-pdf-marks:${document.url}`);
      setMarks(saved ? JSON.parse(saved) as PdfMark[] : []);
    } catch {
      setMarks([]);
    }
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
    if (!storageKey) return;
    try { localStorage.setItem(storageKey, JSON.stringify(marks)); } catch { /* Storage may be disabled or full. */ }
  }, [storageKey, marks]);

  useEffect(() => {
    if (!pdf) return;
    let cancelled = false;
    renderTaskRef.current.forEach((task) => task.cancel());
    renderTaskRef.current = [];
    const renderPages = async () => {
      for (let i = 1; i <= pdf.numPages; i += 1) {
        if (cancelled) return;
        const canvas = canvasRefs.current[i - 1];
        const wrapper = pageRefs.current[i - 1];
        const textLayer = textLayerRefs.current[i - 1];
        const thumb = thumbRefs.current[i - 1];
        if (!canvas || !wrapper || !textLayer) continue;
        try {
          const pdfPage = await pdf.getPage(i);
          const base = pdfPage.getViewport({ scale: 1, rotation });
          const availableWidth = Math.max(280, (scrollRef.current?.clientWidth ?? 900) - 64);
          const scale = fitWidth ? Math.min(2.5, availableWidth / base.width) : zoom;
          const viewport = pdfPage.getViewport({ scale, rotation });
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          wrapper.style.width = `${viewport.width}px`;
          wrapper.style.height = `${viewport.height}px`;
          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = `${viewport.width}px`;
          canvas.style.height = `${viewport.height}px`;
          textLayer.style.width = `${viewport.width}px`;
          textLayer.style.height = `${viewport.height}px`;
          const context = canvas.getContext('2d');
          if (context) {
            const task = pdfPage.render({ canvasContext: context, viewport, transform: dpr === 1 ? undefined : [dpr, 0, 0, dpr, 0, 0] });
            renderTaskRef.current.push(task);
            await task.promise;
          }
          const textContent = await pdfPage.getTextContent();
          textLayer.replaceChildren();
          const m = viewport.transform;
          for (const item of textContent.items) {
            if (!('str' in item) || !item.str) continue;
            const t = item.transform;
            const tx = [
              m[0] * t[0] + m[2] * t[1], m[1] * t[0] + m[3] * t[1],
              m[0] * t[2] + m[2] * t[3], m[1] * t[2] + m[3] * t[3],
              m[0] * t[4] + m[2] * t[5] + m[4], m[1] * t[4] + m[3] * t[5] + m[5],
            ];
            const fontHeight = Math.max(1, Math.hypot(tx[2], tx[3]));
            const span = window.document.createElement('span');
            span.textContent = item.str;
            span.style.left = `${tx[4]}px`;
            span.style.top = `${tx[5] - fontHeight}px`;
            span.style.fontSize = `${fontHeight}px`;
            span.style.height = `${fontHeight * 1.2}px`;
            span.style.width = `${Math.max(1, item.width * scale)}px`;
            span.style.transform = `rotate(${Math.atan2(tx[1], tx[0])}rad)`;
            textLayer.appendChild(span);
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
      if (event.key === 'Escape') {
        if (activePanel) setActivePanel(null);
        else onClose();
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f') {
        event.preventDefault();
        rootRef.current?.querySelector<HTMLInputElement>('[data-pdf-search]')?.focus();
      }
      if (event.key === 'ArrowLeft' && !(event.target instanceof HTMLInputElement)) setPage((p) => Math.max(1, p - 1));
      if (event.key === 'ArrowRight' && !(event.target instanceof HTMLInputElement)) setPage((p) => Math.min(pageCount, p + 1));
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'h') {
        event.preventDefault();
        if (selection) addMark('highlight');
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'd') {
        event.preventDefault();
        if (selection) lookupWord(selection.text);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [document, onClose, pageCount, activePanel, selection]);

  useEffect(() => {
    pageRefs.current[page - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [page]);

  useEffect(() => {
    if (!dictionaryWord) return;
    let cancelled = false;
    setDictionaryLoading(true);
    setDictionaryError('');
    setDictionaryEntry(null);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(dictionaryWord)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error(response.status === 404 ? 'No English dictionary entry was found.' : 'Dictionary lookup failed. Try again.');
        return await response.json() as DictionaryEntry[];
      })
      .then((entries) => { if (!cancelled) setDictionaryEntry(entries[0] ?? null); })
      .catch((reason: unknown) => { if (!cancelled) setDictionaryError(reason instanceof Error ? reason.message : 'Dictionary lookup failed.'); })
      .finally(() => { if (!cancelled) setDictionaryLoading(false); });
    return () => { cancelled = true; };
  }, [dictionaryWord]);

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

  const captureSelection = () => {
    const current = window.getSelection();
    const text = current?.toString().trim();
    if (!current || !text || current.rangeCount === 0) { setSelection(null); return; }
    const range = current.getRangeAt(0);
    const anchor = range.commonAncestorContainer instanceof Element
      ? range.commonAncestorContainer
      : range.commonAncestorContainer.parentElement;
    const pageElement = anchor?.closest<HTMLElement>('[data-pdf-page]');
    if (!pageElement) { setSelection(null); return; }
    const pageNumber = Number(pageElement.dataset.pdfPage);
    const bounds = pageElement.getBoundingClientRect();
    const rects = Array.from(range.getClientRects()).map((rect) => ({
      x: Math.max(0, (rect.left - bounds.left) / bounds.width),
      y: Math.max(0, (rect.top - bounds.top) / bounds.height),
      w: Math.min(1, rect.width / bounds.width),
      h: Math.min(1, rect.height / bounds.height),
    })).filter((rect) => rect.w > 0 && rect.h > 0);
    if (rects.length) setSelection({ page: pageNumber, text, rects });
  };

  const addMark = (kind: MarkKind, note?: string) => {
    if (!selection) return;
    const mark: PdfMark = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      kind, page: selection.page, text: selection.text, note, color: markColor, rects: selection.rects,
    };
    setMarks((current) => [...current, mark]);
    setSelection(null);
    setNoteTarget(null);
    setNoteDraft('');
    window.getSelection()?.removeAllRanges();
    setActivePanel(kind === 'note' ? 'notes' : activePanel);
  };

  const openNoteEditor = () => {
    if (!selection) return;
    setNoteTarget(selection);
    setNoteDraft('');
  };

  const lookupWord = (text: string) => {
    const word = text.match(/[A-Za-z]+(?:['’-][A-Za-z]+)?/)?.[0];
    if (!word) return;
    setDictionaryWord(word);
    setActivePanel('dictionary');
    setSelection(null);
    window.getSelection()?.removeAllRanges();
  };

  const captureAndLookup = () => {
    const current = window.getSelection()?.toString().trim() ?? '';
    lookupWord(current || selection?.text || '');
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
    <section ref={rootRef} className="pdf-viewer fixed inset-0 z-[10000] flex flex-col bg-[#181818] text-white" role="dialog" aria-modal="true" aria-label={`${document.title} PDF viewer`}>
      <header className="flex min-h-14 shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#202020] px-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <FileText className="h-5 w-5 shrink-0 text-white/65" />
          <div className="min-w-0"><h2 className="truncate text-sm font-semibold">{document.title}</h2><p className="text-[10px] tracking-wide text-white/40">PDF DOCUMENT</p></div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" className={toolButton} onClick={() => setActivePanel(activePanel === 'notes' ? null : 'notes')} title="Annotations and notes"><StickyNote className="h-4 w-4" /><span className="hidden sm:inline">Notes ({marks.length})</span></button>
          <button type="button" className={toolButton} onClick={() => { const word = window.getSelection()?.toString().trim(); lookupWord(word || selection?.text || ''); }} title="Dictionary"><BookOpen className="h-4 w-4" /><span className="hidden sm:inline">Dictionary</span></button>
          <a href={document.url} download className={toolButton} aria-label="Download PDF" title="Download"><Download className="h-4 w-4" /></a>
          <button type="button" onClick={toggleFullscreen} className={toolButton} aria-label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'} title="Fullscreen">{fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}</button>
          <button type="button" onClick={onClose} className={toolButton} aria-label="Close viewer" title="Close"><X className="h-5 w-5" /></button>
        </div>
      </header>

      <div className="flex min-h-12 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#252525] px-2 sm:px-4">
        <div className="flex items-center gap-1">
          <button type="button" className={toolButton} onClick={() => setSidebar((v) => !v)} aria-label="Toggle thumbnails" title="Thumbnails">{sidebar ? <SidebarClose className="h-4 w-4" /> : <SidebarOpen className="h-4 w-4" />}</button>
          <button type="button" className={toolButton} onClick={() => goToPage(page - 1)} disabled={page <= 1} aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></button>
          <input aria-label="Current page" value={page || ''} onChange={(e) => goToPage(Number(e.target.value))} className="h-7 w-11 rounded border border-white/15 bg-[#151515] text-center text-xs text-white outline-none focus:border-white/50" />
          <span className="text-xs text-white/45">/ {pageCount || '—'}</span>
          <button type="button" className={toolButton} onClick={() => goToPage(page + 1)} disabled={page >= pageCount} aria-label="Next page"><ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" className={toolButton} onClick={() => { setFitWidth(false); setZoom((z) => Math.max(0.5, Math.round((z - 0.1) * 10) / 10)); }} aria-label="Zoom out"><Minus className="h-4 w-4" /></button>
          <button type="button" className="h-8 min-w-14 rounded px-2 text-xs text-white/75 hover:bg-white/10" onClick={() => { setFitWidth(true); setZoom(1); }}>{fitWidth ? 'Fit width' : `${Math.round(zoom * 100)}%`}</button>
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

      {selection && <div className="z-20 flex shrink-0 flex-wrap items-center justify-center gap-1 border-b border-white/10 bg-[#303030] px-2 py-2">
        <span className="mr-2 max-w-40 truncate text-xs text-white/55" title={selection.text}>{selection.text}</span>
        <button type="button" className={toolButton} onClick={() => addMark('highlight')} title="Highlight selected text"><Highlighter className="h-4 w-4" />Highlight</button>
        <button type="button" className={toolButton} onClick={() => addMark('underline')} title="Underline selected text"><Underline className="h-4 w-4" /></button>
        <button type="button" className={toolButton} onClick={() => addMark('strike')} title="Strike through selected text"><Strikethrough className="h-4 w-4" /></button>
        <button type="button" className={toolButton} onClick={openNoteEditor} title="Add note"><StickyNote className="h-4 w-4" />Note</button>
        <button type="button" className={toolButton} onClick={captureAndLookup} title="Look up word"><BookOpen className="h-4 w-4" />Define</button>
        <div className="ml-1 flex items-center gap-1">{colors.map((color) => <button key={color.value} type="button" onClick={() => setMarkColor(color.value)} aria-label={color.name + ' marking colour'} aria-pressed={markColor === color.value} className={`h-5 w-5 rounded-full border-2 ${markColor === color.value ? 'border-white' : 'border-white/20'}`} style={{ backgroundColor: color.value }} />)}</div>
        <button type="button" className={toolButton} onClick={() => setSelection(null)} aria-label="Dismiss selection toolbar"><X className="h-4 w-4" /></button>
      </div>}

      <div className="flex min-h-0 flex-1">
        {sidebar && <aside className="hidden w-44 shrink-0 overflow-y-auto border-r border-white/10 bg-[#202020] p-3 sm:block" aria-label="Page thumbnails">
          {Array.from({ length: pageCount }, (_, i) => <button key={i} type="button" onClick={() => goToPage(i + 1)} className={`mb-3 flex w-full flex-col items-center gap-1 rounded-lg border p-2 transition ${page === i + 1 ? 'border-white/60 bg-white/10' : 'border-transparent hover:bg-white/5'}`}>
            <canvas ref={(node) => { thumbRefs.current[i] = node; }} className="max-h-40 max-w-full bg-white shadow" />
            <span className="text-[10px] text-white/65">{i + 1}</span>
          </button>)}
        </aside>}
        <main ref={scrollRef} onMouseUp={captureSelection} onTouchEnd={captureSelection} className="min-w-0 flex-1 overflow-auto bg-[#333] px-3 py-6 sm:px-8" aria-label="PDF pages">
          {loading && <div className="flex h-full items-center justify-center text-sm text-white/60">Loading PDF…</div>}
          {error && <div className="mx-auto mt-12 max-w-lg rounded-xl border border-white/10 bg-[#202020] p-6 text-center"><FileText className="mx-auto mb-3 h-8 w-8 text-white/40" /><h3 className="mb-2 text-sm font-semibold">Unable to open this PDF</h3><p className="text-xs text-white/55">{error}</p><a href={document.url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-xs underline underline-offset-4">Try opening the original file</a></div>}
          {pdf && <div className="mx-auto flex w-fit min-w-full flex-col items-center gap-6">
            {Array.from({ length: pageCount }, (_, i) => <div key={i} ref={(node) => { pageRefs.current[i] = node; }} data-pdf-page={i + 1} className="pdf-page relative shrink-0 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              <canvas ref={(node) => { canvasRefs.current[i] = node; }} className="absolute inset-0" aria-label={`Page ${i + 1}`} />
              <div ref={(node) => { textLayerRefs.current[i] = node; }} className="pdf-text-layer absolute inset-0" />
              {marks.filter((mark) => mark.page === i + 1).map((mark) => <div key={mark.id} className="pdf-mark-group" aria-label={mark.note || mark.kind}>
                {mark.rects.map((rect, index) => <span key={index} className={`pdf-mark pdf-mark-${mark.kind}`} style={{ left: `${rect.x * 100}%`, top: `${rect.y * 100}%`, width: `${rect.w * 100}%`, height: `${rect.h * 100}%`, '--mark-color': mark.color } as React.CSSProperties} />)}
                {mark.kind === 'note' && <button type="button" className="pdf-note-pin" style={{ left: `${(mark.rects[0]?.x ?? 0) * 100}%`, top: `${(mark.rects[0]?.y ?? 0) * 100}%` }} title={mark.note || 'Note'} onClick={() => { setActivePanel('notes'); setPage(mark.page); }}>✎</button>}
              </div>)}
            </div>)}
          </div>}
        </main>
        {activePanel && <aside className="w-72 max-w-[80vw] shrink-0 overflow-y-auto border-l border-white/10 bg-[#202020] p-4" aria-label={activePanel === 'notes' ? 'Annotations and notes' : 'Dictionary'}>
          <div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-semibold">{activePanel === 'notes' ? 'Annotations & notes' : 'Dictionary'}</h3><button type="button" className={toolButton} onClick={() => setActivePanel(null)} aria-label="Close panel"><X className="h-4 w-4" /></button></div>
          {activePanel === 'notes' ? <div className="space-y-3">
            {marks.length === 0 && <p className="text-xs leading-5 text-white/50">Select text in the document to highlight, underline, strike through, or attach a note. Your marks are saved in this browser for this PDF.</p>}
            {marks.map((mark) => <article key={mark.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <div className="mb-2 flex items-center justify-between"><button type="button" className="text-[10px] text-white/50 hover:text-white" onClick={() => goToPage(mark.page)}>Page {mark.page} · {mark.kind}</button><button type="button" className="text-white/40 hover:text-white" onClick={() => setMarks((current) => current.filter((item) => item.id !== mark.id))} aria-label="Delete annotation"><Trash2 className="h-3.5 w-3.5" /></button></div>
              <p className="line-clamp-3 text-xs text-white/80">{mark.text}</p>
              {mark.note && <p className="mt-2 whitespace-pre-wrap border-l-2 border-white/30 pl-2 text-xs text-white/60">{mark.note}</p>}
            </article>)}
          </div> : <div>
            <form className="mb-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); lookupWord(dictionaryWord); }}>
              <input value={dictionaryWord} onChange={(e) => setDictionaryWord(e.target.value)} placeholder="Look up a word" className="min-w-0 flex-1 rounded-md border border-white/15 bg-[#151515] px-3 py-2 text-sm text-white outline-none" />
              <button type="submit" className="rounded-md bg-white px-3 text-xs font-semibold text-black">Go</button>
            </form>
            {dictionaryLoading && <p className="text-xs text-white/50">Looking up “{dictionaryWord}”…</p>}
            {dictionaryError && <p className="text-xs text-white/60">{dictionaryError}</p>}
            {dictionaryEntry && <div className="space-y-4">
              <div><h4 className="text-xl font-semibold">{dictionaryEntry.word ?? dictionaryWord}</h4><p className="mt-1 text-xs text-white/50">{dictionaryEntry.phonetic ?? dictionaryEntry.phonetics?.find((item) => item.text)?.text ?? ''}</p>
                {dictionaryEntry.phonetics?.find((item) => item.audio)?.audio && <audio controls className="mt-2 w-full" src={dictionaryEntry.phonetics.find((item) => item.audio)?.audio} />}</div>
              {dictionaryEntry.meanings?.map((meaning, index) => <section key={index}><h5 className="mb-2 text-xs font-semibold italic text-white/60">{meaning.partOfSpeech}</h5><ol className="list-decimal space-y-2 pl-4">{meaning.definitions?.slice(0, 8).map((definition, itemIndex) => <li key={itemIndex} className="text-xs leading-5 text-white/85">{definition.definition}{definition.example && <p className="mt-1 text-white/45">“{definition.example}”</p>}</li>)}</ol></section>)}
              <p className="text-[10px] text-white/35">Definitions provided by the Free Dictionary API.</p>
            </div>}
          </div>}
        </aside>}
      </div>

      {noteTarget && <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-4">
        <div className="w-full max-w-md rounded-xl border border-white/15 bg-[#202020] p-4 shadow-2xl">
          <h3 className="mb-2 text-sm font-semibold">Add a note</h3><p className="mb-3 line-clamp-2 text-xs text-white/55">“{noteTarget.text}”</p>
          <textarea value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} autoFocus rows={4} placeholder="Write your note…" className="w-full resize-y rounded-lg border border-white/15 bg-[#111] p-3 text-sm text-white outline-none focus:border-white/50" />
          <div className="mt-3 flex justify-end gap-2"><button type="button" className={toolButton} onClick={() => setNoteTarget(null)}>Cancel</button><button type="button" disabled={!noteDraft.trim()} className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black disabled:opacity-40" onClick={() => { setSelection(noteTarget); addMark('note', noteDraft.trim()); }}>Save note</button></div>
        </div>
      </div>}

      <footer className="flex min-h-7 shrink-0 items-center justify-between border-t border-white/10 bg-[#202020] px-4 text-[10px] text-white/40"><span>{document.title}</span><span>{pageCount ? `Page ${page} of ${pageCount}` : ' '}</span></footer>
    </section>
  );
}
