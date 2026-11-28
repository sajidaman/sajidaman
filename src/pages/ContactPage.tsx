import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, Github, Instagram, Linkedin, LoaderCircle, Mail, Send } from 'lucide-react';

type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<SubmissionState>('idle');
  const [feedback, setFeedback] = useState('');

  const configured = Boolean(supabaseUrl && supabaseAnonKey);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback('');

    // Quiet honeypot: ordinary visitors never see or fill this field.
    if (website.trim()) {
      setStatus('success');
      setFeedback('Thanks for reaching out. Your message has been received.');
      return;
    }

    if (!configured) {
      setStatus('error');
      setFeedback('The contact service is not configured yet. Please try again later.');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseAnonKey!,
          Authorization: `Bearer ${supabaseAnonKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        const detail = await response.text();
        console.error('Supabase contact submission failed:', response.status, detail);
        throw new Error('The message could not be sent. Please try again or email me directly.');
      }

      setStatus('success');
      setFeedback('Message sent successfully. Thank you for reaching out!');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  const fieldClass = 'mt-2 w-full rounded-xl border border-white/15 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/50 focus:bg-white/[0.06]';
  const labelClass = 'block text-xs font-medium tracking-wide text-white/65';

  return (
    <section className="mx-auto min-h-[70vh] w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="contact-heading">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/40">Get in touch</p>
          <h1 id="contact-heading" className="max-w-lg text-4xl font-semibold tracking-tight text-white sm:text-5xl">Let’s start a conversation.</h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
            Have a question, an opportunity, a research idea, or simply want to connect? Send me a message and I’ll get back to you.
          </p>

          <div className="mt-10">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Connect</h2>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.linkedin.com/in/sajidaman01/" target="_blank" rel="noreferrer" aria-label="LinkedIn: sajidaman01" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:border-white/35 hover:bg-white/[0.05] hover:text-white">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a href="https://www.instagram.com/seyfert/" target="_blank" rel="noreferrer" aria-label="Instagram: seyfert" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:border-white/35 hover:bg-white/[0.05] hover:text-white">
                <Instagram className="h-4 w-4" /> Instagram
              </a>
              <a href="mailto:sajidaman01@outlook.com" aria-label="Email: sajidaman01@outlook.com" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:border-white/35 hover:bg-white/[0.05] hover:text-white">
                <Mail className="h-4 w-4" /> Mail
              </a>
              <a href="https://github.com/sajidaman" target="_blank" rel="noreferrer" aria-label="GitHub: sajidaman" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:border-white/35 hover:bg-white/[0.05] hover:text-white">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href="https://orcid.org/0009-0003-2656-5827?lang=en" target="_blank" rel="noreferrer" aria-label="ORCID profile" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:border-white/35 hover:bg-white/[0.05] hover:text-white">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#A6CE39] text-[9px] font-bold text-white">iD</span> ORCID
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-8">
          <div className="mb-7 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Send a message</h2>
              <p className="mt-1 text-xs text-white/40">All fields are required.</p>
            </div>
            <Send className="h-5 w-5 text-white/45" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                Your name
                <input className={fieldClass} name="name" autoComplete="name" required minLength={2} maxLength={100} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
              </label>
              <label className={labelClass}>
                Email address
                <input className={fieldClass} name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" />
              </label>
            </div>
            <label className={labelClass}>
              Subject
              <input className={fieldClass} name="subject" required minLength={3} maxLength={160} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What would you like to discuss?" />
            </label>
            <label className={labelClass}>
              Message
              <textarea className={`${fieldClass} min-h-36 resize-y leading-6`} name="message" required minLength={10} maxLength={5000} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message here…" />
              <span className="mt-1 block text-right text-[10px] text-white/30">{message.length}/5000</span>
            </label>

            <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label>Leave this field empty<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
            </div>

            <button type="submit" disabled={status === 'sending'} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-wait disabled:opacity-60 sm:w-auto">
              {status === 'sending' ? <><LoaderCircle className="h-4 w-4 animate-spin" />Sending…</> : <>Send message <ArrowUpRight className="h-4 w-4" /></>}
            </button>

            {feedback && (
              <div role="status" aria-live="polite" className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-xs leading-5 ${status === 'success' ? 'border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-200' : 'border-rose-400/20 bg-rose-400/[0.06] text-rose-200'}`}>
                {status === 'success' && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />}
                <span>{feedback}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
