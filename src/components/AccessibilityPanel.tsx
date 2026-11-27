import { useEffect, useRef, useState } from 'react';
import { Accessibility, RotateCcw, X } from 'lucide-react';

type TextScale = 100 | 112 | 125;

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [textScale, setTextScale] = useState<TextScale>(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${textScale}%`;
    root.dataset.highContrast = String(highContrast);
    root.dataset.reducedMotion = String(reducedMotion);

    return () => {
      root.style.fontSize = '';
      delete root.dataset.highContrast;
      delete root.dataset.reducedMotion;
    };
  }, [textScale, highContrast, reducedMotion]);

  useEffect(() => {
    if (isOpen) {
      panelRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    } else if (wasOpen.current) {
      triggerRef.current?.focus();
    }
    wasOpen.current = isOpen;

    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  const resetSettings = () => {
    setTextScale(100);
    setHighContrast(false);
    setReducedMotion(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <section
          ref={panelRef}
          id="accessibility-panel"
          aria-labelledby="accessibility-panel-title"
          className="mb-3 w-80 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-white/15 bg-[#111113]/95 p-5 text-[#F5F5F7] shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#86868B]">
                Display preferences
              </p>
              <h2
                id="accessibility-panel-title"
                className="mt-1 font-display text-base font-semibold text-white"
              >
                Accessibility
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close accessibility settings"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#A1A1A6] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-5 pt-4">
            <fieldset>
              <legend className="text-xs font-medium text-white">Text size</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {([100, 112, 125] as const).map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => setTextScale(scale)}
                    aria-pressed={textScale === scale}
                    className={`min-h-10 rounded-xl border px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      textScale === scale
                        ? 'border-white bg-white text-black'
                        : 'border-white/15 bg-white/5 text-[#D1D1D6] hover:border-white/30 hover:bg-white/10'
                    }`}
                  >
                    {scale === 100 ? 'Default' : `${scale - 100}% larger`}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="space-y-3">
              <button
                type="button"
                role="switch"
                aria-checked={highContrast}
                onClick={() => setHighContrast((enabled) => !enabled)}
                className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>
                  <span className="block text-xs font-medium text-white">High contrast</span>
                  <span className="mt-0.5 block text-[11px] text-[#A1A1A6]">
                    Stronger text, borders, and focus rings
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    highContrast ? 'bg-white' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full transition-transform ${
                      highContrast ? 'translate-x-5 bg-black' : 'translate-x-0.5 bg-white'
                    }`}
                  />
                </span>
              </button>

              <button
                type="button"
                role="switch"
                aria-checked={reducedMotion}
                onClick={() => setReducedMotion((enabled) => !enabled)}
                className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>
                  <span className="block text-xs font-medium text-white">Reduce motion</span>
                  <span className="mt-0.5 block text-[11px] text-[#A1A1A6]">
                    Minimize animation and smooth scrolling
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    reducedMotion ? 'bg-white' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full transition-transform ${
                      reducedMotion
                        ? 'translate-x-5 bg-black'
                        : 'translate-x-0.5 bg-white'
                    }`}
                  />
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={resetSettings}
              className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/15 text-xs font-medium text-[#D1D1D6] transition-colors hover:border-white/30 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset preferences
            </button>
          </div>
        </section>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close accessibility settings' : 'Open accessibility settings'}
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'accessibility-panel' : undefined}
        className="ml-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white text-black shadow-lg shadow-black/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <Accessibility className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
