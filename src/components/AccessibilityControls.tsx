import { useEffect, useState } from 'react';
import { Accessibility, Moon, RotateCcw, Sun, Type, X } from 'lucide-react';

type RangeSettingProps = {
  id: string; label: string; value: number; min: number; max: number;
  step?: number; output: string; minLabel: string; maxLabel: string;
  onChange: (value: number) => void;
};

function readA11ySetting(key: string, fallback: number) {
  try {
    const stored = localStorage.getItem('sajid-a11y-' + key);
    return stored === null ? fallback : Number(stored);
  } catch {
    return fallback;
  }
}

function RangeSetting({ id, label, value, min, max, step = 1, output, minLabel, maxLabel, onChange }: RangeSettingProps) {
  return (
    <div className="rounded-xl border border-neutral-200 px-3 py-2.5 dark:border-neutral-700">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-[13px] font-medium">{label}</label>
        <output htmlFor={id} className="text-[11px] font-semibold text-red-700 dark:text-red-300">{output}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={(event) => onChange(Number(event.target.value))} className="portfolio-a11y-range w-full" />
      <div className="mt-1 flex justify-between text-[9px] text-neutral-500 dark:text-neutral-400"><span>{minLabel}</span><span>{maxLabel}</span></div>
    </div>
  );
}

type Props = { theme: 'dark' | 'light'; onSetTheme: (theme: 'dark' | 'light') => void };

export function AccessibilityControls({ theme, onSetTheme }: Props) {
  const [open, setOpen] = useState(false);
  const [textScale, setTextScale] = useState(() => readA11ySetting('text-scale', 100));
  const [lineSpacing, setLineSpacing] = useState(() => readA11ySetting('line-spacing', 150));
  const [contrast, setContrast] = useState(() => readA11ySetting('contrast', 0));
  const [linkStyle, setLinkStyle] = useState(() => readA11ySetting('link-style', 0));
  const [motion, setMotion] = useState(() => readA11ySetting('motion', 0));
  const [focusStrength, setFocusStrength] = useState(() => readA11ySetting('focus-strength', 3));
  const [cursorSize, setCursorSize] = useState(() => readA11ySetting('cursor-size', 20));
  const [brightness, setBrightness] = useState(() => readA11ySetting('brightness', 100));

  useEffect(() => {
    const settings = { textScale, lineSpacing, contrast, linkStyle, motion, focusStrength, cursorSize, brightness };
    try {
      Object.entries(settings).forEach(([key, value]) => localStorage.setItem('sajid-a11y-' + ({
        textScale: 'text-scale', lineSpacing: 'line-spacing', focusStrength: 'focus-strength',
        cursorSize: 'cursor-size', linkStyle: 'link-style'
      } as Record<string, string>)[key] || key, String(value)));
      localStorage.setItem('sajid-a11y-settings', JSON.stringify(settings));
    } catch {
      // Accessibility controls remain usable when browser storage is unavailable.
    }
  }, [textScale, lineSpacing, contrast, linkStyle, motion, focusStrength, cursorSize, brightness]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--a11y-font-scale', String(textScale / 100));
    root.style.setProperty('--a11y-line-height', String(lineSpacing / 100));
    root.style.setProperty('--a11y-focus-width', focusStrength + 'px');
    root.style.setProperty('--a11y-brightness', String(brightness / 100));
    root.style.setProperty('--a11y-contrast', String(contrast === 1 ? 1.12 : contrast === 2 ? 1.35 : 1));
    const center = cursorSize / 2, ring = cursorSize * .32, dot = cursorSize * .14, stroke = Math.max(1, cursorSize * .045);
    const cursor = (pointer: boolean) => {
      const svg = pointer
        ? `<svg xmlns='http://www.w3.org/2000/svg' width='${cursorSize}px' height='${cursorSize}px' viewBox='0 0 ${cursorSize} ${cursorSize}'><circle cx='${center}' cy='${center}' r='${cursorSize * .11}' fill='#A30000'/><circle cx='${center}' cy='${center}' r='${ring}' fill='none' stroke='#A30000' stroke-width='${stroke * 1.2}'/></svg>`
        : `<svg xmlns='http://www.w3.org/2000/svg' width='${cursorSize}px' height='${cursorSize}px' viewBox='0 0 ${cursorSize} ${cursorSize}'><circle cx='${center}' cy='${center}' r='${dot}' fill='#A30000'/><circle cx='${center}' cy='${center}' r='${ring}' fill='none' stroke='#A30000' stroke-width='${stroke}'/><path d='M${center} ${cursorSize*.04}v${cursorSize*.18}M${center} ${cursorSize*.78}v${cursorSize*.18}M${cursorSize*.04} ${center}h${cursorSize*.18}M${cursorSize*.78} ${center}h${cursorSize*.18}' stroke='#A30000' stroke-width='${stroke}' stroke-linecap='round'/></svg>`;
      return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${center} ${center}, ${pointer ? 'pointer' : 'auto'}`;
    };
    root.style.setProperty('--a11y-cursor-default', cursor(false));
    root.style.setProperty('--a11y-cursor-pointer', cursor(true));

    root.classList.toggle('a11y-link-style-1', linkStyle === 1);
    root.classList.toggle('a11y-link-style-2', linkStyle === 2);
    root.classList.toggle('a11y-motion-1', motion === 1);
    root.classList.toggle('a11y-motion-2', motion === 2);

  }, [textScale, lineSpacing, contrast, linkStyle, motion, focusStrength, cursorSize, brightness]);

  const reset = () => {
    setTextScale(100); setLineSpacing(150); setContrast(0); setLinkStyle(0);
    setMotion(0); setFocusStrength(3); setCursorSize(20); setBrightness(100);
  };

  return (
    <div className="fixed bottom-5 left-5 z-[80]">
      {open && (
        <section id="portfolio-accessibility-panel" aria-label="Accessibility and display settings"
          className="portfolio-a11y-panel mb-2.5 h-[min(30rem,calc(100dvh-7rem))] w-[min(21rem,calc(100vw-2.5rem))] overflow-y-auto rounded-2xl border p-3 shadow-2xl">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-sm font-bold tracking-wide">Accessibility</h2>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close accessibility settings"
              className="rounded-lg p-2 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 dark:hover:bg-neutral-800"><X size={17} aria-hidden="true" /></button>
          </div>
          <div className="space-y-3">
            <section aria-labelledby="portfolio-a11y-display" className="space-y-1.5">
              <h3 id="portfolio-a11y-display" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500"><Sun size={12} aria-hidden="true" /> Display</h3>
              <div className="rounded-xl border border-neutral-200 px-3 py-3 dark:border-neutral-700">
                <span className="mb-1.5 block text-[13px] font-medium">Colour theme</span>
                <div className="grid grid-cols-2 gap-2" role="group" aria-label="Colour theme">
                  <button type="button" aria-pressed={theme === 'light'} onClick={() => onSetTheme('light')} className="portfolio-a11y-theme-choice inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700"><Sun size={14} /> Light</button>
                  <button type="button" aria-pressed={theme === 'dark'} onClick={() => onSetTheme('dark')} className="portfolio-a11y-theme-choice inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700"><Moon size={14} /> Dark</button>
                </div>
              </div>
              <RangeSetting id="portfolio-a11y-brightness" label="Brightness" value={brightness} min={50} max={150} output={brightness + '%'} minLabel="Dim" maxLabel="Bright" onChange={setBrightness} />
              <RangeSetting id="portfolio-a11y-text" label="Text size" value={textScale} min={100} max={150} output={textScale + '%'} minLabel="Default" maxLabel="Larger" onChange={setTextScale} />
              <RangeSetting id="portfolio-a11y-spacing" label="Line spacing" value={lineSpacing} min={130} max={220} output={(lineSpacing / 100).toFixed(2) + '×'} minLabel="Compact" maxLabel="Spacious" onChange={setLineSpacing} />
            </section>
            <section aria-labelledby="portfolio-a11y-reading" className="space-y-2">
              <h3 id="portfolio-a11y-reading" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500"><Type size={12} aria-hidden="true" /> Reading support</h3>
              <RangeSetting id="portfolio-a11y-contrast" label="Contrast" value={contrast} min={0} max={2} output={['Standard', 'High', 'Maximum'][contrast]} minLabel="Standard" maxLabel="Maximum" onChange={setContrast} />
              <RangeSetting id="portfolio-a11y-links" label="Link emphasis" value={linkStyle} min={0} max={2} output={['Standard', 'Underline', 'Underline + bold'][linkStyle]} minLabel="Standard" maxLabel="Strong" onChange={setLinkStyle} />
            </section>
            <section aria-labelledby="portfolio-a11y-navigation" className="space-y-2">
              <h3 id="portfolio-a11y-navigation" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500"><Accessibility size={12} aria-hidden="true" /> Navigation</h3>
              <RangeSetting id="portfolio-a11y-motion" label="Motion" value={motion} min={0} max={2} output={['Full', 'Reduced', 'Minimal'][motion]} minLabel="Full" maxLabel="Minimal" onChange={setMotion} />
              <RangeSetting id="portfolio-a11y-focus" label="Keyboard focus indicator" value={focusStrength} min={1} max={6} step={0.25} output={focusStrength + 'px'} minLabel="Subtle" maxLabel="Strong" onChange={setFocusStrength} />
              <RangeSetting id="portfolio-a11y-cursor" label="Cursor size" value={cursorSize} min={16} max={48} output={cursorSize + 'px'} minLabel="Small" maxLabel="Large" onChange={setCursorSize} />
            </section>
          </div>
          <button type="button" onClick={reset} className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-red-700 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 dark:text-red-300 dark:hover:bg-red-950/40"><RotateCcw size={12} /> Reset accessibility settings</button>
        </section>
      )}
      <button type="button" aria-label="Open accessibility settings" aria-expanded={open} aria-controls="portfolio-accessibility-panel"
        onClick={() => setOpen(value => !value)} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-red-800 text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-red-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-300">
        <Accessibility size={23} aria-hidden="true" />
      </button>
    </div>
  );
}
