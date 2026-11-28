import type { PageId, ProjectItem, PublicationItem } from '../types/portfolio';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectPublication: (publication: PublicationItem) => void;
}

export function HomePage(_props: HomePageProps) {
  return (
    <section
      className="relative isolate flex min-h-[76vh] w-full items-center justify-center overflow-hidden px-4 py-10 text-white"
      aria-label="Astronomical illustration"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_46%,rgba(255,255,255,0.09),transparent_58%)]" />
      <div className="w-full max-w-[1440px]">
        <svg
          className="h-auto w-full overflow-visible"
          viewBox="0 0 1440 720"
          role="img"
          aria-labelledby="observatory-title observatory-description"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="observatory-title">An observatory beneath a star-filled sky</title>
          <desc id="observatory-description">
            An original monochrome illustration of a mountain observatory, a telescope dome,
            distant planets, constellations and sweeping orbital paths.
          </desc>
          <defs>
            <linearGradient id="sky-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity=".13" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="mountain-shade" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity=".17" />
              <stop offset="1" stopColor="currentColor" stopOpacity=".035" />
            </linearGradient>
            <radialGradient id="planet-shade" cx="34%" cy="28%" r="72%">
              <stop offset="0" stopColor="currentColor" stopOpacity=".3" />
              <stop offset="1" stopColor="currentColor" stopOpacity=".04" />
            </radialGradient>
            <clipPath id="scene-clip">
              <rect x="36" y="22" width="1368" height="656" rx="28" />
            </clipPath>
          </defs>

          <g clipPath="url(#scene-clip)">
            <rect x="36" y="22" width="1368" height="656" rx="28" fill="url(#sky-glow)" />
            <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".22">
              <path d="M-30 250 C260 12 650 5 920 176 S1320 360 1490 190" strokeDasharray="3 10" />
              <path d="M-40 310 C280 70 650 64 920 230 S1310 415 1490 245" />
              <path d="M80 85 C340 210 515 255 720 214 S1120 70 1370 120" strokeDasharray="2 9" />
              <ellipse cx="1060" cy="245" rx="245" ry="76" transform="rotate(-19 1060 245)" />
              <ellipse cx="1060" cy="245" rx="310" ry="112" transform="rotate(-19 1060 245)" strokeDasharray="2 12" />
            </g>

            <g fill="currentColor">
              <circle cx="170" cy="135" r="2.4" /><circle cx="255" cy="84" r="1.6" />
              <circle cx="345" cy="178" r="2" /><circle cx="470" cy="94" r="1.5" />
              <circle cx="590" cy="146" r="2.5" /><circle cx="690" cy="72" r="1.5" />
              <circle cx="790" cy="160" r="1.8" /><circle cx="900" cy="92" r="2.2" />
              <circle cx="1200" cy="94" r="2" /><circle cx="1310" cy="170" r="1.5" />
              <circle cx="1370" cy="85" r="2.4" /><circle cx="115" cy="270" r="1.6" />
              <circle cx="380" cy="290" r="1.7" /><circle cx="760" cy="280" r="1.4" />
              <circle cx="1280" cy="330" r="1.8" /><circle cx="1100" cy="410" r="1.3" />
            </g>
            <g fill="none" stroke="currentColor" strokeWidth="1.3" opacity=".55">
              <path d="M255 84 345 178 470 94 590 146" />
              <path d="M900 92 970 160 1060 130 1150 205 1200 94" />
              <path d="M118 270 170 135 255 84" />
            </g>
            <g stroke="currentColor" strokeWidth="1.4" opacity=".8">
              <path d="M345 165v26M332 178h26M900 82v20M890 92h20M590 135v22M579 146h22" />
            </g>

            <g transform="translate(1080 235)">
              <circle r="83" fill="url(#planet-shade)" stroke="currentColor" strokeOpacity=".42" />
              <path d="M-75 -19c40-24 104-27 150-7M-79 12c48-19 111-19 158 2M-62 43c34-13 83-14 124-1" fill="none" stroke="currentColor" strokeOpacity=".24" strokeWidth="2" />
              <ellipse rx="133" ry="31" transform="rotate(-19)" fill="none" stroke="currentColor" strokeOpacity=".6" strokeWidth="1.5" />
              <ellipse rx="151" ry="42" transform="rotate(-19)" fill="none" stroke="currentColor" strokeOpacity=".18" strokeDasharray="3 8" />
            </g>
            <g transform="translate(710 205)" opacity=".7">
              <circle r="37" fill="url(#planet-shade)" stroke="currentColor" strokeOpacity=".45" />
              <path d="M-34 3c18-12 48-14 68-5M-24 21c17-7 34-8 49-3" fill="none" stroke="currentColor" strokeOpacity=".35" />
            </g>
            <path d="M1320 255a42 42 0 1 1-52-57 34 34 0 1 0 52 57Z" fill="currentColor" opacity=".42" />

            <path d="M36 520 180 405l98 66 147-167 128 137 121-93 110 111 144-168 120 124 115-94 141 133v224H36Z" fill="url(#mountain-shade)" />
            <path d="m36 520 144-115 98 66 147-167 128 137 121-93 110 111 144-168 120 124 115-94 141 133" fill="none" stroke="currentColor" strokeOpacity=".5" strokeWidth="2" />
            <path d="m425 304 35 37 35-17-42 2-28-22ZM830 391l44-65 38 39-37-21-45 47ZM178 405l31 20 25-4-26-2-30-14Z" fill="currentColor" opacity=".3" />
            <path d="M36 570c160-66 271-23 412 4s235 13 369-24 247-25 354 13 173 39 233 6v109H36Z" fill="currentColor" opacity=".055" />
            <path d="M36 610c177-48 283-14 418 10 169 30 265-25 415-33 179-10 320 62 535 6v85H36Z" fill="currentColor" opacity=".08" />

            <g transform="translate(720 530)">
              <path d="M-184 144v-105c0-84 68-152 152-152h24c84 0 152 68 152 152v105Z" fill="currentColor" opacity=".12" stroke="currentColor" strokeOpacity=".72" strokeWidth="2" />
              <path d="M-160 144V42c0-72 58-130 130-130h16c72 0 130 58 130 130v102" fill="none" stroke="currentColor" strokeOpacity=".55" strokeWidth="1.5" />
              <path d="M-184 40h368M-170 144h340" stroke="currentColor" strokeOpacity=".55" strokeWidth="2" />
              <path d="M-120 40a88 88 0 0 1 176 0" fill="none" stroke="currentColor" strokeOpacity=".5" strokeWidth="1.4" />
              <path d="M-20 -107v-47h40v47" fill="none" stroke="currentColor" strokeOpacity=".7" strokeWidth="2" />
              <path d="M-10 -154h20l8-12h-36Z" fill="currentColor" opacity=".45" />
              <path d="M0-166v-72" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              <path d="M-5-237h10l21 10h-52Z" fill="currentColor" opacity=".72" />
              <path d="M-5-166h10" stroke="currentColor" strokeWidth="2" />
              <path d="M-148 144v-55M148 144V89" stroke="currentColor" strokeOpacity=".35" strokeWidth="2" />
            </g>

            <g fill="none" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.2">
              <path d="M190 574c65-33 118-36 173-18" />
              <path d="M1070 575c57-26 111-23 165 4" />
              <path d="M515 635c82-18 130-17 205-5" strokeDasharray="3 8" />
            </g>
            <g fill="currentColor" opacity=".6">
              <circle cx="188" cy="574" r="3" /><circle cx="1360" cy="572" r="2.5" />
              <circle cx="515" cy="635" r="2" /><circle cx="930" cy="616" r="2" />
            </g>
          </g>
          <rect x="36.5" y="22.5" width="1367" height="655" rx="28" fill="none" stroke="currentColor" strokeOpacity=".14" />
        </svg>
      </div>
    </section>
  );
}
