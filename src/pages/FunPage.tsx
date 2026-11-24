import { useEffect, useState } from 'react';
import { Pause, Play, RotateCcw, StepForward } from 'lucide-react';
import { FUN_NOTES, PHOTO_FRAMES } from '../data/portfolioData';
import type { PhotoFrame } from '../types/portfolio';
import { stepGameOfLife } from '../utils/portfolioLogic';
import { MonochromeImage } from '../components/MonochromeImage';

interface FunPageProps {
  onSelectPhoto: (frame: PhotoFrame) => void;
}

const GRID_ROWS = 12;
const GRID_COLS = 22;

function createSeedGrid(): boolean[][] {
  const grid: boolean[][] = Array.from({ length: GRID_ROWS }, () =>
    Array.from({ length: GRID_COLS }, () => false)
  );
  // Classic glider + pulsar-inspired symmetric seeds
  const coords: [number, number][] = [
    [1, 2], [2, 3], [3, 1], [3, 2], [3, 3],
    [5, 10], [5, 11], [5, 12],
    [7, 15], [8, 16], [9, 14], [9, 15], [9, 16],
    [3, 17], [3, 18], [4, 17], [4, 18],
  ];
  for (const [r, c] of coords) {
    if (r < GRID_ROWS && c < GRID_COLS) grid[r][c] = true;
  }
  return grid;
}

export function FunPage({ onSelectPhoto }: FunPageProps) {
  const [grid, setGrid] = useState<boolean[][]>(() => createSeedGrid());
  const [generation, setGeneration] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setGrid((prev) => stepGameOfLife(prev));
      setGeneration((g) => g + 1);
    }, 240);
    return () => window.clearInterval(timer);
  }, [running]);

  const toggleCell = (r: number, c: number) => {
    setGrid((prev) =>
      prev.map((row, ri) =>
        ri === r ? row.map((cell, ci) => (ci === c ? !cell : cell)) : row
      )
    );
  };

  const handleStep = () => {
    setGrid((prev) => stepGameOfLife(prev));
    setGeneration((g) => g + 1);
  };

  const handleReset = () => {
    setRunning(false);
    setGrid(createSeedGrid());
    setGeneration(0);
  };

  const handleClear = () => {
    setRunning(false);
    setGrid(
      Array.from({ length: GRID_ROWS }, () =>
        Array.from({ length: GRID_COLS }, () => false)
      )
    );
    setGeneration(0);
  };

  const liveCells = grid.reduce(
    (sum, row) => sum + row.filter(Boolean).length,
    0
  );

  return (
    <div>
      {/* Dark 35mm Monochrome Photography Gallery */}
      <section className="bg-black py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="border-b border-white/10 pb-10">
            <p className="text-xs font-medium text-[#86868B]">Beyond the Bench</p>
            <h1
              className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl"
              style={{ textWrap: 'balance' }}
            >
              35mm Film, Keyboards & Automata
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#A1A1A6] sm:text-base">
              Weekend analog darkroom prints, tactile keyboard builds, and a small cellular automaton sandbox.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PHOTO_FRAMES.map((frame) => (
              <article
                key={frame.id}
                className="flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#141416]"
              >
                <button
                  type="button"
                  onClick={() => onSelectPhoto(frame)}
                  aria-label={`Open lightbox for ${frame.title}`}
                  className="group relative aspect-[4/3] w-full overflow-hidden bg-black text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <MonochromeImage
                    src={frame.image}
                    alt={frame.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </button>
                <div className="p-6">
                  <p className="text-xs text-[#86868B]">
                    {frame.location} · {frame.year}
                  </p>
                  <h2 className="mt-1.5 font-display text-lg font-semibold text-white">
                    {frame.title}
                  </h2>
                  <p className="mt-2 font-mono text-[11px] tabular-nums text-zinc-400">
                    {frame.camera} · {frame.exposure}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Light Interactive Monochrome Game of Life & Notes */}
      <section className="bg-[#F5F5F7] py-16 text-[#1D1D1F] md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-5">
                  <div>
                    <p className="text-xs font-medium text-[#6E6E73]">
                      Interactive Toy · Cellular Automaton
                    </p>
                    <h2 className="mt-1 font-display text-xl font-semibold text-[#1D1D1F]">
                      Conway’s Game of Life
                    </h2>
                  </div>
                  <div className="flex items-center gap-4 font-mono text-xs tabular-nums text-[#515154]">
                    <span>Gen {generation}</span>
                    <span aria-hidden="true">·</span>
                    <span>{liveCells} Alive</span>
                  </div>
                </div>

                <div
                  className="mt-5 grid gap-1 rounded-2xl bg-[#111113] p-3"
                  style={{
                    gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
                  }}
                  role="grid"
                  aria-label="Interactive Conway Game of Life grid"
                >
                  {grid.map((row, r) =>
                    row.map((alive, c) => (
                      <button
                        key={`${r}-${c}`}
                        type="button"
                        onClick={() => toggleCell(r, c)}
                        aria-label={`Row ${r + 1} Column ${c + 1} ${
                          alive ? 'alive' : 'dead'
                        }`}
                        className={`aspect-square rounded-[3px] transition-colors duration-100 ${
                          alive
                            ? 'bg-white'
                            : 'bg-zinc-800/70 hover:bg-zinc-700'
                        }`}
                      />
                    ))
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setRunning((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1D1D1F] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-black whitespace-nowrap"
                  >
                    {running ? (
                      <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>{running ? 'Pause' : 'Play'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleStep}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-medium text-[#1D1D1F] transition-colors hover:bg-zinc-100 whitespace-nowrap"
                  >
                    <StepForward className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Step</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-medium text-[#1D1D1F] transition-colors hover:bg-zinc-100 whitespace-nowrap"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Reset Seed</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClear}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-medium text-[#515154] transition-colors hover:bg-zinc-100 whitespace-nowrap"
                  >
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-5">
              {FUN_NOTES.map((note) => (
                <article
                  key={note.title}
                  className="rounded-3xl border border-black/10 bg-white p-6"
                >
                  <p className="text-xs text-[#6E6E73]">{note.meta}</p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-[#1D1D1F]">
                    {note.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#515154]">
                    {note.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
