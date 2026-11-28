import { useState } from 'react';
import type { PageId, ProjectItem, PublicationItem } from '../types/portfolio';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectPublication: (publication: PublicationItem) => void;
}

type Component = 'donor' | 'accretor';

export function HomePage(_props: HomePageProps) {
  const [showContours, setShowContours] = useState(true);
  const [showTransfer, setShowTransfer] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [selected, setSelected] = useState<Component>('donor');

  return (
    <section
      className="flex min-h-[78vh] items-center justify-center overflow-hidden px-4 py-10 text-white sm:px-6"
      aria-label="Interactive Roche-lobe binary star system"
    >
      <div className="w-full max-w-[1120px]">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[.28em] opacity-55">
              Binary interaction · stellar astrophysics
            </p>
            <h1 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
              The Roche geometry
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 opacity-65">
              A close binary system shaped by mutual gravity and rotation. Select either star
              or switch the physical layers on and off.
            </p>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[.18em] opacity-45">
            Interactive field study / 01
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-current/15 bg-current/[.025]">
          <div className="relative">
            <svg
              className="block h-auto w-full"
              viewBox="0 0 1000 540"
              role="img"
              aria-labelledby="roche-title roche-desc"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title id="roche-title">Roche lobes in a semi-detached binary star system</title>
              <desc id="roche-desc">
                Two stars lie inside adjoining Roche lobes. The inner Lagrange point sits between
                them, and a stream of matter flows from the donor star toward an accretion disk
                around the companion.
              </desc>
              <defs>
                <radialGradient id="roche-star">
                  <stop offset="0" stopColor="currentColor" stopOpacity=".98" />
                  <stop offset=".55" stopColor="currentColor" stopOpacity=".68" />
                  <stop offset="1" stopColor="currentColor" stopOpacity=".06" />
                </radialGradient>
                <radialGradient id="roche-accretion">
                  <stop offset="0" stopColor="currentColor" stopOpacity=".02" />
                  <stop offset=".48" stopColor="currentColor" stopOpacity=".08" />
                  <stop offset=".7" stopColor="currentColor" stopOpacity=".72" />
                  <stop offset=".82" stopColor="currentColor" stopOpacity=".12" />
                  <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="roche-stream" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="currentColor" stopOpacity=".12" />
                  <stop offset=".52" stopColor="currentColor" stopOpacity=".9" />
                  <stop offset="1" stopColor="currentColor" stopOpacity=".18" />
                </linearGradient>
                <filter id="roche-blur" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="9" />
                </filter>
              </defs>

              <g fill="currentColor" opacity=".3">
                <circle cx="94" cy="100" r="1.3" /><circle cx="160" cy="420" r="1.1" />
                <circle cx="260" cy="75" r="1.4" /><circle cx="420" cy="120" r="1" />
                <circle cx="590" cy="78" r="1.2" /><circle cx="780" cy="105" r="1.2" />
                <circle cx="900" cy="190" r="1.5" /><circle cx="850" cy="440" r="1.1" />
                <circle cx="680" cy="475" r="1.3" /><circle cx="340" cy="470" r="1.1" />
              </g>

              {/* Orbital reference and rotating frame centre. */}
              <ellipse cx="500" cy="270" rx="330" ry="190" fill="none"
                stroke="currentColor" strokeOpacity=".12" strokeDasharray="3 9" />
              <path d="M500 55V485M105 270H895" stroke="currentColor"
                strokeOpacity=".08" strokeDasharray="2 8" />
              <circle cx="500" cy="270" r="3" fill="currentColor" opacity=".42" />

              {/* The two adjoining critical Roche equipotential surfaces. */}
              <path d="M500 270 C466 223 426 177 365 171 C279 162 196 204 164 270
                C196 336 279 378 365 369 C426 363 466 317 500 270Z"
                fill="currentColor" fillOpacity=".035" stroke="currentColor"
                strokeOpacity=".7" strokeWidth="1.8" />
              <path d="M500 270 C534 223 574 177 635 171 C721 162 804 204 836 270
                C804 336 721 378 635 369 C574 363 534 317 500 270Z"
                fill="currentColor" fillOpacity=".035" stroke="currentColor"
                strokeOpacity=".7" strokeWidth="1.8" />

              {showContours && (
                <g fill="none" stroke="currentColor" strokeOpacity=".22" strokeWidth="1">
                  <path d="M500 270 C471 233 435 197 372 192 C302 186 231 219 204 270
                    C231 321 302 354 372 348 C435 343 471 307 500 270Z" />
                  <path d="M500 270 C529 233 565 197 628 192 C698 186 769 219 796 270
                    C769 321 698 354 628 348 C565 343 529 307 500 270Z" />
                  <path d="M500 270 C476 244 445 217 383 214 C328 211 273 232 249 270
                    C273 308 328 329 383 326 C445 323 476 296 500 270Z" />
                  <path d="M500 270 C524 244 555 217 617 214 C672 211 727 232 751 270
                    C727 308 672 329 617 326 C555 323 524 296 500 270Z" />
                </g>
              )}

              {/* Accretion disc around the receiving companion. */}
              <ellipse cx="680" cy="270" rx="93" ry="29" transform="rotate(-18 680 270)"
                fill="url(#roche-accretion)" />
              <ellipse cx="680" cy="270" rx="76" ry="20" transform="rotate(-18 680 270)"
                fill="none" stroke="currentColor" strokeOpacity=".42" strokeWidth="2" />
              <ellipse cx="680" cy="270" rx="57" ry="13" transform="rotate(-18 680 270)"
                fill="none" stroke="currentColor" strokeOpacity=".22" strokeWidth="1" />

              {/* Matter overflowing the donor's inner Lagrange point. */}
              {showTransfer && (
                <g>
                  <path d="M407 270 C438 260 460 264 482 270 C518 281 550 291 594 279
                    C617 273 631 270 646 270" fill="none" stroke="currentColor"
                    strokeOpacity=".13" strokeWidth="12" filter="url(#roche-blur)" />
                  <path d="M407 270 C438 260 460 264 482 270 C518 281 550 291 594 279
                    C617 273 631 270 646 270" fill="none" stroke="url(#roche-stream)"
                    strokeWidth="2.6" strokeLinecap="round" />
                  <g fill="currentColor">
                    <circle cx="445" cy="264" r="2.2" opacity=".8" />
                    <circle cx="478" cy="269" r="1.8" opacity=".8" />
                    <circle cx="523" cy="282" r="1.7" opacity=".75" />
                    <circle cx="568" cy="285" r="1.5" opacity=".65" />
                    <circle cx="613" cy="276" r="1.4" opacity=".6" />
                  </g>
                </g>
              )}

              {/* Stars: click either component to inspect it. */}
              <g
                role="button"
                tabIndex={0}
                aria-label="Select donor star"
                aria-pressed={selected === 'donor'}
                onClick={() => setSelected('donor')}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelected('donor');
                  }
                }}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <circle cx="350" cy="270" r={selected === 'donor' ? 62 : 54}
                  fill="url(#roche-star)" opacity=".22" />
                <circle cx="350" cy="270" r="35" fill="url(#roche-star)" />
                <circle cx="350" cy="270" r="35" fill="none" stroke="currentColor"
                  strokeOpacity={selected === 'donor' ? ".9" : ".35"} strokeWidth="1.5" />
                {selected === 'donor' && <circle cx="350" cy="270" r="47" fill="none"
                  stroke="currentColor" strokeOpacity=".4" strokeDasharray="2 6" />}
              </g>
              <g
                role="button"
                tabIndex={0}
                aria-label="Select accretor star"
                aria-pressed={selected === 'accretor'}
                onClick={() => setSelected('accretor')}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelected('accretor');
                  }
                }}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <circle cx="680" cy="270" r={selected === 'accretor' ? 48 : 41}
                  fill="url(#roche-star)" opacity=".22" />
                <circle cx="680" cy="270" r="23" fill="url(#roche-star)" />
                <circle cx="680" cy="270" r="23" fill="none" stroke="currentColor"
                  strokeOpacity={selected === 'accretor' ? ".9" : ".35"} strokeWidth="1.5" />
                {selected === 'accretor' && <circle cx="680" cy="270" r="34" fill="none"
                  stroke="currentColor" strokeOpacity=".4" strokeDasharray="2 6" />}
              </g>

              {/* Inner Lagrange point and scientific annotations. */}
              <circle cx="500" cy="270" r="5" fill="none" stroke="currentColor"
                strokeWidth="1.5" />
              <circle cx="500" cy="270" r="1.7" fill="currentColor" />
              {showLabels && (
                <g fill="currentColor" fontFamily="ui-monospace, SFMono-Regular, monospace"
                  fontSize="10" letterSpacing="1.6" opacity=".65">
                  <text x="350" y="205" textAnchor="middle">DONOR</text>
                  <text x="680" y="205" textAnchor="middle">ACCRETOR</text>
                  <text x="500" y="242" textAnchor="middle">L1</text>
                  <text x="500" y="450" textAnchor="middle">INNER LAGRANGE POINT</text>
                  <path d="M500 435V282" stroke="currentColor" strokeWidth="1"
                    strokeOpacity=".45" />
                  {showTransfer && <text x="535" y="315">MASS TRANSFER</text>}
                  <text x="680" y="340" textAnchor="middle">ACCRETION DISC</text>
                  <path d="M680 326V302" stroke="currentColor" strokeWidth="1"
                    strokeOpacity=".4" />
                </g>
              )}
            </svg>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-current/15 px-4 py-3 sm:px-5">
            <span className="mr-1 font-mono text-[9px] uppercase tracking-[.2em] opacity-45">
              Layers
            </span>
            <button type="button" onClick={() => setShowContours((v) => !v)}
              aria-pressed={showContours}
              className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${showContours ? 'border-current/55 bg-current/10' : 'border-current/15 opacity-55'}`}>
              Equipotential contours
            </button>
            <button type="button" onClick={() => setShowTransfer((v) => !v)}
              aria-pressed={showTransfer}
              className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${showTransfer ? 'border-current/55 bg-current/10' : 'border-current/15 opacity-55'}`}>
              Mass transfer
            </button>
            <button type="button" onClick={() => setShowLabels((v) => !v)}
              aria-pressed={showLabels}
              className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${showLabels ? 'border-current/55 bg-current/10' : 'border-current/15 opacity-55'}`}>
              Labels
            </button>
            <span className="ml-auto font-mono text-[9px] uppercase tracking-[.16em] opacity-35">
              Select a star
            </span>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
          <div aria-live="polite">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] opacity-45">
              {selected === 'donor' ? '01 / Mass-losing component' : '02 / Mass-gaining component'}
            </p>
            <p className="mt-1 text-sm leading-6 opacity-70">
              {selected === 'donor'
                ? 'The donor star fills its Roche lobe. Material near the inner Lagrange point can escape its gravitational domain and flow toward the companion.'
                : 'The accretor captures the transferred gas. Angular momentum causes the stream to form a disc before matter settles onto the star.'}
            </p>
          </div>
          <p className="max-w-[250px] font-mono text-[9px] leading-5 opacity-40 sm:text-right">
            SCHEMATIC · NOT TO SCALE
            <br />
            Rotating-frame Roche geometry
          </p>
        </div>
      </div>
    </section>
  );
}
