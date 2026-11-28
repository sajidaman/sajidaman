import type { PageId, ProjectItem, PublicationItem } from '../types/portfolio';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectPublication: (publication: PublicationItem) => void;
}

export function HomePage(_props: HomePageProps) {
  return (
    <section
      className="flex min-h-[72vh] items-center justify-center overflow-hidden px-5 py-12 text-white"
      aria-label="Black hole illustration"
    >
      <div className="w-full max-w-[1180px]">
        <svg
          className="mx-auto block h-auto w-full"
          viewBox="0 0 1200 620"
          role="img"
          aria-labelledby="black-hole-title black-hole-description"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="black-hole-title">Black hole and accretion disk</title>
          <desc id="black-hole-description">
            A still, minimalist scientific illustration of a black hole, its luminous accretion
            disk and two narrow relativistic jets.
          </desc>
          <defs>
            <linearGradient id="disk-upper" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity=".16" />
              <stop offset=".48" stopColor="currentColor" stopOpacity=".92" />
              <stop offset="1" stopColor="currentColor" stopOpacity=".2" />
            </linearGradient>
            <linearGradient id="disk-lower" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="currentColor" stopOpacity=".12" />
              <stop offset=".5" stopColor="currentColor" stopOpacity=".7" />
              <stop offset="1" stopColor="currentColor" stopOpacity=".12" />
            </linearGradient>
            <linearGradient id="jet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity=".04" />
              <stop offset=".5" stopColor="currentColor" stopOpacity=".45" />
              <stop offset="1" stopColor="currentColor" stopOpacity=".04" />
            </linearGradient>
            <radialGradient id="halo">
              <stop offset=".42" stopColor="currentColor" stopOpacity="0" />
              <stop offset=".57" stopColor="currentColor" stopOpacity=".1" />
              <stop offset=".72" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
            <filter id="soft-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="13" />
            </filter>
          </defs>

          {/* A few restrained stars give the object scale without clutter. */}
          <g fill="currentColor" opacity=".42">
            <circle cx="176" cy="142" r="1.8" />
            <circle cx="292" cy="354" r="1.3" />
            <circle cx="388" cy="112" r="1.5" />
            <circle cx="804" cy="116" r="1.7" />
            <circle cx="944" cy="322" r="1.4" />
            <circle cx="1040" cy="180" r="1.8" />
            <circle cx="1084" cy="450" r="1.2" />
            <circle cx="142" cy="466" r="1.3" />
          </g>

          <ellipse cx="600" cy="310" rx="360" ry="225" fill="url(#halo)" />

          {/* Relativistic jets, aligned with the rotation axis. */}
          <path d="M600 254 C585 186 575 116 600 34 C625 116 615 186 600 254Z"
            fill="url(#jet)" />
          <path d="M600 366 C585 434 575 504 600 586 C625 504 615 434 600 366Z"
            fill="url(#jet)" />
          <path d="M600 244V44M600 376v200" stroke="currentColor" strokeOpacity=".32" strokeWidth="1.4" />
          <path d="M590 112l10-24 10 24M590 508l10 24 10-24"
            fill="none" stroke="currentColor" strokeOpacity=".42" strokeWidth="1.2" />

          {/* Accretion flow behind the event horizon. */}
          <ellipse cx="600" cy="310" rx="310" ry="102"
            transform="rotate(-13 600 310)" fill="none"
            stroke="currentColor" strokeOpacity=".12" strokeWidth="38" filter="url(#soft-glow)" />
          <ellipse cx="600" cy="310" rx="310" ry="102"
            transform="rotate(-13 600 310)" fill="none"
            stroke="url(#disk-upper)" strokeWidth="23" />
          <ellipse cx="600" cy="310" rx="270" ry="78"
            transform="rotate(-13 600 310)" fill="none"
            stroke="currentColor" strokeOpacity=".38" strokeWidth="2" />
          <ellipse cx="600" cy="310" rx="235" ry="62"
            transform="rotate(-13 600 310)" fill="none"
            stroke="currentColor" strokeOpacity=".2" strokeWidth="1.2" />

          {/* The event horizon occludes the rear half of the disk. */}
          <circle cx="600" cy="310" r="104" fill="#000000" />
          <circle cx="600" cy="310" r="112" fill="none"
            stroke="currentColor" strokeOpacity=".85" strokeWidth="2.5" />
          <circle cx="600" cy="310" r="119" fill="none"
            stroke="currentColor" strokeOpacity=".18" strokeWidth="1" />

          {/* Foreground portion of the disk. */}
          <path d="M300 356 C395 420 500 447 600 443 C700 439 805 397 900 300"
            fill="none" stroke="url(#disk-lower)" strokeWidth="18" strokeLinecap="round" />
          <path d="M344 372 C440 420 526 431 600 427 C700 422 773 392 855 334"
            fill="none" stroke="currentColor" strokeOpacity=".5" strokeWidth="2" />
          <path d="M400 390 C476 419 548 420 600 417 C680 413 735 390 790 357"
            fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="1.2" />

          {/* Small, quiet labels make the graphic read as an astrophysics plate. */}
          <g fill="currentColor" fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="11" letterSpacing="2" opacity=".55">
            <text x="76" y="558">RELATIVISTIC JET</text>
            <path d="M244 552H410L570 520" fill="none" stroke="currentColor" strokeWidth="1" />
            <text x="900" y="558">ACCRETION DISK</text>
            <path d="M890 544H820L760 400" fill="none" stroke="currentColor" strokeWidth="1" />
          </g>
        </svg>
      </div>
    </section>
  );
}
