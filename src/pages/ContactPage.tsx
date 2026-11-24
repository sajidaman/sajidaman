import { useState } from 'react';
import { Check, Copy, Send } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import type { ContactFormValues } from '../types/portfolio';
import { validateContactForm } from '../utils/portfolioLogic';

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  topic: 'Research Collaboration',
  message: '',
};

const TOPICS = [
  'Research Collaboration',
  'Hardware & Open-Source Inquiry',
  'Math Circle / Speaking',
  'University & Admissions',
  'General Note',
];

export function ContactPage() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [submittedRecord, setSubmittedRecord] = useState<ContactFormValues | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(PROFILE.email);
      }
    } catch {
      // Fallback visual confirmation
    }
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = validateContactForm(values);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setSubmittedRecord(values);
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setSubmittedRecord(null);
  };

  return (
    <div className="bg-black py-16 text-white md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column — Academic Contact Details */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium text-[#86868B]">Correspondence</p>
            <h1
              className="mt-3 font-display text-3xl font-semibold tracking-[-0.015em] text-white sm:text-5xl"
              style={{ textWrap: 'balance' }}
            >
              Contact me
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[#A1A1A6] sm:text-base">
              Open to research mentorship discussions, hardware replication questions, preprint feedback, and STEM outreach collaborations.
            </p>

            <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
              <div className="rounded-2xl border border-white/10 bg-[#141416] p-5">
                <p className="text-xs text-[#86868B]">Direct Academic Email</p>
                <div className="mt-1.5 flex items-center justify-between gap-3">
                  <span className="truncate font-mono text-sm text-white">
                    {PROFILE.email}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white hover:text-black whitespace-nowrap"
                  >
                    {copiedEmail ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#141416] p-5">
                <p className="text-xs text-[#86868B]">Scholarly Identifiers</p>
                <dl className="mt-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[#86868B]">ORCID</dt>
                    <dd className="font-mono tabular-nums text-zinc-200">
                      {PROFILE.orcid}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[#86868B]">GitHub</dt>
                    <dd className="font-mono text-zinc-200">
                      @{PROFILE.githubHandle}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[#86868B]">Location</dt>
                    <dd className="text-zinc-200">{PROFILE.location}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Right Column — Validated Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-[#141416] p-7 sm:p-9">
              {submittedRecord ? (
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-zinc-300">
                    <Check className="h-4 w-4 text-white" aria-hidden="true" />
                    <span>Message Prepared · Confirmation Ready</span>
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-white">
                    Thank you, {submittedRecord.name}.
                  </h2>
                  <p className="text-sm leading-relaxed text-[#A1A1A6]">
                    Your inquiry regarding <span className="text-white">{submittedRecord.topic}</span> has been recorded for {submittedRecord.email}. I typically respond within two school days.
                  </p>
                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4 text-xs leading-relaxed text-zinc-300">
                    {submittedRecord.message}
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors hover:bg-zinc-200 whitespace-nowrap"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <h2 className="font-display text-xl font-semibold text-white">
                      Send a Note
                    </h2>
                    <p className="mt-1 text-xs text-[#86868B]">
                      All fields are required.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-zinc-300"
                      >
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={values.name}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, name: e.target.value }))
                        }
                        aria-invalid={Boolean(errors.name)}
                        placeholder="Dr. Elena Rostova"
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                      />
                      {errors.name && (
                        <p role="alert" className="mt-1.5 text-xs text-zinc-300">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-zinc-300"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={values.email}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, email: e.target.value }))
                        }
                        aria-invalid={Boolean(errors.email)}
                        placeholder="name@institution.edu"
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                      />
                      {errors.email && (
                        <p role="alert" className="mt-1.5 text-xs text-zinc-300">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Inquiry Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={values.topic}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, topic: e.target.value }))
                      }
                      aria-invalid={Boolean(errors.topic)}
                      className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                    >
                      {TOPICS.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                    {errors.topic && (
                      <p role="alert" className="mt-1.5 text-xs text-zinc-300">
                        {errors.topic}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={values.message}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, message: e.target.value }))
                      }
                      aria-invalid={Boolean(errors.message)}
                      placeholder="Share details about your research inquiry, paper question, or collaboration..."
                      className="mt-2 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none"
                    />
                    {errors.message && (
                      <p role="alert" className="mt-1.5 text-xs text-zinc-300">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-medium text-black transition-colors hover:bg-zinc-200 whitespace-nowrap"
                  >
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
