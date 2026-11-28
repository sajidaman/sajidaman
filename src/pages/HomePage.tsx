import { ArrowDownRight, ArrowUpRight, Orbit, Radio, Telescope, Waves } from 'lucide-react';
import type { PageId, ProjectItem, PublicationItem } from '../types/portfolio';
import './HomePage.css';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectPublication: (publication: PublicationItem) => void;
}

const research = [
  {
    number: '01',
    icon: Orbit,
    title: 'Black holes & accretion',
    tag: 'GENERAL RELATIVITY',
    copy: 'Event horizons, relativistic accretion flows, compact objects and the physics of extreme gravity.',
  },
  {
    number: '02',
    icon: Waves,
    title: 'AGN & relativistic jets',
    tag: 'HIGH-ENERGY ASTROPHYSICS',
    copy: 'How supermassive black holes launch collimated outflows that transport energy across galactic scales.',
  },
  {
    number: '03',
    icon: Radio,
    title: 'Radio galaxies & lobes',
    tag: 'RADIO ASTRONOMY',
    copy: 'Synchrotron emission, magnetic fields and enormous radio structures extending far beyond host galaxies.',
  },
  {
    number: '04',
    icon: Telescope,
    title: 'The cosmic web',
    tag: 'EXTRAGALACTIC ASTROPHYSICS',
    copy: 'The intergalactic medium, large-scale structure and the filaments connecting the cosmic environment.',
  },
];

function BlackHoleIllustration() {
  return (
    <svg className="bh-illustration" viewBox="0 0 760 520" role="img" aria-label="Scientific illustration of a supermassive black hole with an accretion disk, relativistic jets and radio lobes">
      <defs>
        <radialGradient id="bh-core"><stop offset="0" stopColor="#000" /><stop offset=".58" stopColor="#000" /><stop offset=".7" stopColor="#171717" /><stop offset="1" stopColor="#000" /></radialGradient>
        <linearGradient id="bh-disk" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".08" /><stop offset=".45" stopColor="#fff" stopOpacity=".95" /><stop offset=".62" stopColor="#888" stopOpacity=".5" /><stop offset="1" stopColor="#fff" stopOpacity=".08" /></linearGradient>
        <linearGradient id="bh-jet" x1="0" y1="1" x2="0" y2="0"><stop stopColor="#fff" stopOpacity=".85" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <radialGradient id="bh-lobe"><stop stopColor="#fff" stopOpacity=".32" /><stop offset=".65" stopColor="#aaa" stopOpacity=".12" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
        <filter id="bh-glow"><feGaussianBlur stdDeviation="7" /></filter>
      </defs>
      <g className="bh-stars" fill="currentColor">
        {Array.from({ length: 48 }, (_, i) => <circle key={i} cx={(i * 137 + 31) % 740 + 10} cy={(i * 83 + 17) % 490 + 10} r={i % 7 === 0 ? 1.8 : .8} opacity={i % 3 === 0 ? .75 : .32} />)}
      </g>
      <g opacity=".75">
        <ellipse cx="380" cy="112" rx="116" ry="46" fill="url(#bh-lobe)" filter="url(#bh-glow)" />
        <ellipse cx="380" cy="408" rx="116" ry="46" fill="url(#bh-lobe)" filter="url(#bh-glow)" />
        <path d="M380 238 C350 190 360 145 380 52 C400 145 410 190 380 238Z" fill="url(#bh-jet)" opacity=".55" />
        <path d="M380 282 C350 330 360 375 380 468 C400 375 410 330 380 282Z" fill="url(#bh-jet)" opacity=".55" />
        <path d="M380 230 L380 34 M380 290 L380 486" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" opacity=".55" />
      </g>
      <g className="bh-lobes">
        <ellipse cx="380" cy="102" rx="68" ry="31" fill="none" stroke="currentColor" strokeOpacity=".4" strokeWidth="1.2" />
        <ellipse cx="380" cy="418" rx="68" ry="31" fill="none" stroke="currentColor" strokeOpacity=".4" strokeWidth="1.2" />
        <path d="M312 102 Q380 65 448 102 Q380 139 312 102Z" fill="none" stroke="currentColor" strokeOpacity=".28" />
        <path d="M312 418 Q380 381 448 418 Q380 455 312 418Z" fill="none" stroke="currentColor" strokeOpacity=".28" />
      </g>
      <ellipse cx="380" cy="260" rx="178" ry="52" transform="rotate(-12 380 260)" fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="1" />
      <ellipse cx="380" cy="260" rx="150" ry="38" transform="rotate(-12 380 260)" fill="none" stroke="url(#bh-disk)" strokeWidth="17" opacity=".9" />
      <ellipse cx="380" cy="260" rx="115" ry="25" transform="rotate(-12 380 260)" fill="none" stroke="currentColor" strokeWidth="3" opacity=".6" />
      <ellipse cx="380" cy="260" rx="72" ry="17" fill="url(#bh-core)" />
      <circle cx="380" cy="260" r="45" fill="#000" stroke="currentColor" strokeOpacity=".7" strokeWidth="1.5" />
      <circle cx="380" cy="260" r="51" fill="none" stroke="currentColor" strokeOpacity=".24" strokeWidth="1" />
      <path d="M220 225 Q380 174 540 225" fill="none" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.2" />
      <path d="M220 295 Q380 346 540 295" fill="none" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.2" />
      <g fill="currentColor" fontFamily="monospace" fontSize="10" letterSpacing="1.5" opacity=".75">
        <text x="470" y="76">RADIO LOBE</text><path d="M462 80 L430 92" stroke="currentColor" fill="none" />
        <text x="500" y="250">ACCRETION DISK</text><path d="M492 254 L505 260" stroke="currentColor" fill="none" />
        <text x="462" y="180">RELATIVISTIC JET</text><path d="M454 184 L400 154" stroke="currentColor" fill="none" />
        <text x="88" y="264">EVENT HORIZON</text><path d="M190 260 L327 260" stroke="currentColor" fill="none" />
      </g>
    </svg>
  );
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <section className="home-cosmos" aria-label="Home page content">
      <div className="home-cosmos-grid" />
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-14 sm:px-10 lg:px-14">
        <div className="home-eyebrow"><span className="home-eyebrow-dot" /> PERSONAL PORTFOLIO <span className="home-eyebrow-line" /> DHAKA, BANGLADESH</div>
        <div className="home-hero grid items-center gap-8 lg:grid-cols-[1.02fr_.98fr]">
          <div className="relative z-10 py-10">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[.28em] text-neutral-500">Physics · Astronomy · Computation</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-.055em] sm:text-6xl lg:text-[4.7rem]">
              Exploring the<br /><span className="home-title-muted">extreme universe.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-neutral-400 sm:text-lg">
              I’m Sajid Aman — a student fascinated by the physics of the cosmos, from quantum-scale phenomena to black holes, active galaxies and the large-scale structure of the Universe.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button onClick={() => onNavigate('projects')} className="home-primary-cta">Explore my work <ArrowUpRight size={16} /></button>
              <button onClick={() => onNavigate('about')} className="home-secondary-cta">A little about me <ArrowDownRight size={16} /></button>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-[.18em] text-neutral-500">
              <span>Curiosity without a horizon</span><span>Est. 2009</span><span>Bangladesh</span>
            </div>
          </div>
          <div className="home-art-wrap">
            <div className="home-art-index">FIG. 01 / AGN ENGINE</div>
            <BlackHoleIllustration />
            <div className="home-art-caption"><span>SCHEMATIC VISUALIZATION</span><span>NOT TO SCALE</span></div>
          </div>
        </div>

        <div className="home-section-heading mt-16">
          <div><p className="home-kicker">BEYOND THE EVENT HORIZON</p><h2>Where my curiosity points</h2></div>
          <span className="hidden font-mono text-[10px] tracking-[.18em] text-neutral-500 sm:block">04 AREAS OF INTEREST</span>
        </div>
        <div className="home-research-grid mt-7 grid gap-px sm:grid-cols-2 xl:grid-cols-4">
          {research.map(({ number, icon: Icon, title, tag, copy }) => (
            <article key={number} className="home-research-card">
              <div className="flex items-center justify-between"><span className="font-mono text-[11px] text-neutral-500">{number} / 04</span><Icon size={19} strokeWidth={1.4} className="text-neutral-400" /></div>
              <p className="mt-9 font-mono text-[9px] tracking-[.2em] text-neutral-500">{tag}</p>
              <h3 className="mt-3 text-xl font-medium tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-400">{copy}</p>
              <div className="home-card-rule mt-7" />
            </article>
          ))}
        </div>

        <div className="home-interlude mt-20 grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className="home-kicker">A COSMIC PERSPECTIVE</p><h2 className="mt-4 max-w-sm text-3xl font-medium leading-tight tracking-[-.04em]">The universe is bigger than the objects we observe.</h2></div>
          <div className="max-w-2xl self-end"><p className="text-base leading-8 text-neutral-400">A radio galaxy can inflate lobes hundreds of thousands of light-years across. Jets carry energy from regions only a few gravitational radii wide into the intergalactic medium. I’m interested in connecting these scales through physics, mathematical modelling and data.</p><button onClick={() => onNavigate('publication')} className="home-text-link mt-6">Explore publications and notes <ArrowUpRight size={15} /></button></div>
        </div>

        <div className="home-bottom-bar mt-20">
          <div><p className="home-kicker">KEEP LOOKING UP</p><p className="mt-2 text-lg">There is always more to understand.</p></div>
          <button onClick={() => onNavigate('contact')} className="home-secondary-cta">Get in touch <ArrowUpRight size={16} /></button>
        </div>
      </div>
    </section>
  );
}
