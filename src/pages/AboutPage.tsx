import { ArrowRight } from 'lucide-react';
import {
  ASSETS,
  COURSEWORK,
  PROFILE,
  READING_SHELF,
} from '../data/portfolioData';
import type { PageId } from '../types/portfolio';
import { MonochromeImage } from '../components/MonochromeImage';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div>
      {/* Dark Editorial Portrait & Bio */}
      <section className="bg-black py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="h-96 overflow-hidden rounded-3xl border border-white/10 bg-[#141416] lg:h-full lg:min-h-[480px]">
                <MonochromeImage
                  src={ASSETS.aboutPortrait}
                  alt="Black and white editorial portrait of Ananya Nair studying beside a library window"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between lg:col-span-7 lg:py-2">
              <div>
                <p className="text-xs font-medium text-[#86868B]">
                  About · {PROFILE.school} · {PROFILE.classYear}
                </p>
                <h1
                  className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl"
                  style={{ textWrap: 'balance' }}
                >
                  Engineering at the boundary of physics, acoustics, and medicine.
                </h1>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#A1A1A6] sm:text-base">
                  <p>
                    I am Ananya Nair, a high school senior in Palo Alto, California. My academic work focuses on translating classical physics and signal processing into compact, affordable diagnostic tools that work outside well-funded laboratories.
                  </p>
                  <p>
                    Whether machining a dual-MEMS chest piece for cardiac auscultation or training physics-constrained neural operators for microfluidic cell sorting, I prefer starting from physical first principles—measuring real noise floors before reaching for deeper software stacks.
                  </p>
                  <p>
                    Outside research, I teach competition combinatorics at the Peninsula Youth Math Circle, co-captain our Science Olympiad hardware roster, and shoot 35mm black-and-white film on weekends.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                <button
                  type="button"
                  onClick={() => onNavigate('experience')}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors hover:bg-zinc-200 whitespace-nowrap"
                >
                  <span>View Research Experience</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10 whitespace-nowrap"
                >
                  <span>Get in Touch</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Light Section — Coursework & Technical Stack */}
      <section className="bg-[#F5F5F7] py-16 text-[#1D1D1F] md:py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="text-xs font-medium text-[#6E6E73]">Academic Preparation</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Selected Quantitative Coursework
          </h2>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-black/10 bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-black/10 text-xs text-[#6E6E73]">
                  <th className="px-5 py-3.5 font-medium">Course</th>
                  <th className="px-5 py-3.5 font-medium">Title</th>
                  <th className="px-5 py-3.5 font-medium">Institution</th>
                  <th className="px-5 py-3.5 font-medium">Term</th>
                  <th className="px-5 py-3.5 font-medium text-right">Standing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {COURSEWORK.map((course) => (
                  <tr key={course.code} className="hover:bg-[#FAFAFC]">
                    <td className="px-5 py-4 font-mono text-xs font-medium text-[#1D1D1F] whitespace-nowrap">
                      {course.code}
                    </td>
                    <td className="px-5 py-4 font-medium text-[#1D1D1F]">
                      {course.title}
                    </td>
                    <td className="px-5 py-4 text-[#515154]">{course.institution}</td>
                    <td className="px-5 py-4 tabular-nums text-[#515154] whitespace-nowrap">
                      {course.term}
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-xs font-medium tabular-nums text-[#1D1D1F]">
                      {course.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <h3 className="font-display text-base font-semibold text-[#1D1D1F]">
                Instrumentation & CAD
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#515154]">
                KiCad 4-layer PCB layout, Altium Designer, SolidWorks parametric assembly, CNC aluminum prototyping, oscilloscope & FFT bench characterization.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <h3 className="font-display text-base font-semibold text-[#1D1D1F]">
                Scientific Computing
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#515154]">
                Python (JAX, PyTorch, SciPy), FEniCSx finite-element solvers, C++ / CMSIS-DSP for ARM Cortex-M4, Rust compiled to WebAssembly.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <h3 className="font-display text-base font-semibold text-[#1D1D1F]">
                Wet Lab & Microfluidics
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#515154]">
                SU-8 soft lithography, PDMS oxygen-plasma bonding, brightfield & high-speed fluorescence microscopy, particle tracking velocimetry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Reading Shelf */}
      <section className="border-t border-white/10 bg-[#0A0A0C] py-16 text-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="text-xs font-medium text-[#86868B]">Intellectual Influences</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Books I keep on my desk
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {READING_SHELF.map((book) => (
              <article
                key={book.title}
                className="rounded-2xl border border-white/10 bg-[#141416] p-6"
              >
                <p className="text-xs text-[#86868B]">{book.author}</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">
                  {book.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#A1A1A6]">
                  {book.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
