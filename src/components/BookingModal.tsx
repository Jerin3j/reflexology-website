import { useEffect, useMemo, useRef, useState } from "react";
import {
  X,
  CalendarDays,
  ChevronDown,
  Clock,
  CircleCheck,
  Phone,
  TriangleAlert,
  Footprints,
  LoaderCircle,
} from "lucide-react";
import {
  BUSINESS,
  IMAGES,
  SESSIONS,
  WA_GREETING_LINK,
  formatPrice,
  timeSlotsFor,
  waLink,
} from "@/data/site";
import { WhatsAppGlyph } from "@/components/icons";
import { cn } from "@/utils/cn";

interface BookingModalProps {
  open: boolean;
  sessionId: string | null;
  onClose: () => void;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  session: string;
  date: string;
  time: string;
  notes: string;
}

const EMPTY: FormState = {
  name: "",
  phone: "",
  email: "",
  session: "",
  date: "",
  time: "",
  notes: "",
};

const toMinutes = (label: string) => {
  const [hm, ap] = label.split(" ");
  const [h, m] = hm.split(":").map(Number);
  return ((h % 12) + (ap === "PM" ? 12 : 0)) * 60 + m;
};

const localToday = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export function BookingModal({ open, sessionId, onClose }: BookingModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const firstField = useRef<HTMLInputElement>(null);

  /* preselect session + reset state when opened */
  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, session: sessionId ?? f.session }));
      setErrors({});
      setConfirmation(null);
      document.body.style.overflow = "hidden";
      setTimeout(() => firstField.current?.focus(), 350);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, sessionId]);

  /* close on Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /* available time slots for chosen day */
  const slots = useMemo(() => {
    if (!form.date) return [];
    const dayIdx = new Date(`${form.date}T12:00:00`).getDay();
    const all = timeSlotsFor(dayIdx);
    if (form.date !== localToday()) return all;
    const now = new Date();
    const cutoff = now.getHours() * 60 + now.getMinutes() + 60; // 1h notice
    return all.filter((s) => toMinutes(s) >= cutoff);
  }, [form.date]);

  const maxDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 60);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }, []);

  if (!open) return null;

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "date") next.time = ""; // re-pick slot when day changes
      return next;
    });
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) errs.name = "Please share your name.";
    if (!/^[\d\s()+.-]{7,}$/.test(form.phone.trim()))
      errs.phone = "A valid phone number is needed to confirm.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "That email doesn't look quite right.";
    if (!form.session) errs.session = "Choose a session.";
    if (!form.date) errs.date = "Pick a day.";
    else if (form.date < localToday()) errs.date = "Please choose today or later.";
    if (!form.time) errs.time = "Pick a time.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulated request round-trip — swap with a real booking API/webhook.
    window.setTimeout(() => {
      setSubmitting(false);
      setConfirmation(
        `SF-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
      );
    }, 900);
  };

  const chosen = SESSIONS.find((s) => s.id === form.session);
  const niceDate = form.date
    ? new Date(`${form.date}T12:00:00`).toLocaleDateString("en-IN", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  /* Pre-filled WhatsApp confirmation with the full booking summary */
  const waConfirmLink = confirmation
    ? waLink(
        `Hello Serene Feet! I'd like to confirm my booking request ${confirmation} — ${
          chosen?.name ?? "a session"
        } on ${niceDate} at ${form.time}.${
          form.notes.trim() ? ` Note: ${form.notes.trim()}.` : ""
        } — ${form.name.trim()}`
      )
    : WA_GREETING_LINK;

  const inputCls = (bad?: string) =>
    cn(
      "w-full rounded-xl border bg-white/80 px-4 py-3 text-sm font-normal text-espresso placeholder:text-mocha/40",
      "outline-none transition-all duration-300 focus:border-ember focus:ring-2 focus:ring-ember/25",
      bad ? "border-red-400/70 bg-red-50/40" : "border-mocha/15"
    );

  const labelCls =
    "mb-1.5 block text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-mocha/75";
  const errCls = "mt-1.5 flex items-center gap-1.5 text-xs text-red-700";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      {/* backdrop */}
      <button
        aria-label="Close booking dialog"
        onClick={onClose}
        className="absolute inset-0 h-full w-full animate-fade-in bg-espresso/60 backdrop-blur-sm"
      />

      {/* panel */}
      <div className="relative z-10 grid max-h-[94vh] w-full max-w-4xl animate-modal-in overflow-hidden rounded-t-[1.8rem] bg-cream shadow-2xl sm:rounded-[1.8rem] md:grid-cols-[0.85fr_1.15fr]">
        {/* left visual panel */}
        <div className="relative hidden md:block">
          <img
            src={IMAGES.interior}
            alt="The calm, wood-toned treatment room at Serene Feet"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/40 to-espresso/25" />
          <div className="relative flex h-full flex-col justify-between p-8">
            <span className="flex items-center gap-2.5 text-champagne">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/15 backdrop-blur">
                <Footprints className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span className="text-[0.66rem] font-semibold uppercase tracking-[0.3em]">
                Serene Feet
              </span>
            </span>
            <div className="text-cream">
              <p className="font-display text-3xl font-medium italic leading-snug">
                “An hour that belongs entirely to you.”
              </p>
              <p className="mt-4 text-xs font-light leading-relaxed text-cream/70">
                {BUSINESS.addressLine1}, {BUSINESS.addressLine2}
                <br />
                Questions? Call {BUSINESS.phoneDisplay}
              </p>
            </div>
          </div>
        </div>

        {/* right form panel */}
        <div className="max-h-[94vh] overflow-y-auto p-6 sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-ember">
                Request a booking
              </p>
              <h2
                id="booking-title"
                className="mt-2 font-display text-3xl font-semibold text-espresso"
              >
                {confirmation ? "Request received" : "Reserve your quiet hour"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-mocha/15 text-mocha transition-colors hover:bg-sand hover:text-espresso"
              aria-label="Close"
            >
              <X className="h-4.5 w-4.5" strokeWidth={2} />
            </button>
          </div>

          {confirmation ? (
            /* ── success state ── */
            <div className="mt-8 animate-fade-in">
              <div className="flex items-center gap-4 rounded-2xl border border-emerald-700/20 bg-emerald-700/[0.06] p-5">
                <CircleCheck className="h-9 w-9 shrink-0 text-emerald-700" strokeWidth={1.6} />
                <div>
                  <p className="text-sm font-medium text-espresso">
                    Thank you, {form.name.split(" ")[0]}. Reference{" "}
                    <span className="font-semibold tracking-wide text-ember">{confirmation}</span>
                  </p>
                  <p className="mt-0.5 text-sm font-light text-mocha/75">
                    {chosen?.name} · {niceDate} at {form.time}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-champagne-deep/50 bg-champagne/30 p-5">
                <p className="text-[0.84rem] font-light leading-relaxed text-mocha">
                  <span className="font-medium text-espresso">One last step:</span> tap
                  “Confirm on WhatsApp” — your session, day, and time are already written
                  into the message. Just press send and we will hold your chair.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={waConfirmLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2.5 rounded-full bg-ember px-6 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-cream shadow-[0_16px_36px_-14px_rgba(200,121,44,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ember-deep"
                >
                  <WhatsAppGlyph className="h-4.5 w-4.5" />
                  Confirm on WhatsApp
                </a>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={BUSINESS.phoneHref}
                    className="flex flex-1 items-center justify-center gap-2.5 rounded-full border border-mocha/20 px-6 py-3.5 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-espresso transition-colors hover:bg-sand"
                  >
                    <Phone className="h-4 w-4" strokeWidth={1.9} />
                    Or call us
                  </a>
                  <button
                    onClick={onClose}
                    className="flex-1 rounded-full border border-mocha/20 px-6 py-3.5 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-espresso transition-colors hover:bg-sand"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ── form ── */
            <form onSubmit={submit} noValidate className="mt-7 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="bk-name" className={labelCls}>
                    Full name *
                  </label>
                  <input
                    id="bk-name"
                    ref={firstField}
                    type="text"
                    autoComplete="name"
                    placeholder="Jordan Rivers"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={inputCls(errors.name)}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className={errCls}>
                      <TriangleAlert className="h-3 w-3" /> {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="bk-phone" className={labelCls}>
                    Phone *
                  </label>
                  <input
                    id="bk-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(503) 555-0134"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className={inputCls(errors.phone)}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <p className={errCls}>
                      <TriangleAlert className="h-3 w-3" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="bk-email" className={labelCls}>
                  Email <span className="font-normal normal-case text-mocha/45">(optional)</span>
                </label>
                <input
                  id="bk-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputCls(errors.email)}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className={errCls}>
                    <TriangleAlert className="h-3 w-3" /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="bk-session" className={labelCls}>
                  Session *
                </label>
                <div className="relative">
                  <select
                    id="bk-session"
                    value={form.session}
                    onChange={(e) => set("session", e.target.value)}
                    className={cn(inputCls(errors.session), "appearance-none pr-10")}
                    aria-invalid={!!errors.session}
                  >
                    <option value="">Choose a session…</option>
                    {SESSIONS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {s.durationMin} min · {formatPrice(s.price)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mocha/50" strokeWidth={2} />
                </div>
                {errors.session && (
                  <p className={errCls}>
                    <TriangleAlert className="h-3 w-3" /> {errors.session}
                  </p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="bk-date" className={labelCls}>
                    <CalendarDays className="mr-1 inline h-3.5 w-3.5 align-[-2px]" /> Day *
                  </label>
                  <input
                    id="bk-date"
                    type="date"
                    min={localToday()}
                    max={maxDate}
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                    className={inputCls(errors.date)}
                    aria-invalid={!!errors.date}
                  />
                  {errors.date && (
                    <p className={errCls}>
                      <TriangleAlert className="h-3 w-3" /> {errors.date}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="bk-time" className={labelCls}>
                    <Clock className="mr-1 inline h-3.5 w-3.5 align-[-2px]" /> Time *
                  </label>
                  <div className="relative">
                    <select
                      id="bk-time"
                      value={form.time}
                      onChange={(e) => set("time", e.target.value)}
                      disabled={!form.date}
                      className={cn(
                        inputCls(errors.time),
                        "appearance-none pr-10 disabled:cursor-not-allowed disabled:opacity-50"
                      )}
                      aria-invalid={!!errors.time}
                    >
                      <option value="">
                        {form.date ? "Choose a time…" : "Pick a day first"}
                      </option>
                      {slots.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mocha/50" strokeWidth={2} />
                  </div>
                  {errors.time && (
                    <p className={errCls}>
                      <TriangleAlert className="h-3 w-3" /> {errors.time}
                    </p>
                  )}
                  {form.date && slots.length === 0 && (
                    <p className={errCls}>
                      <TriangleAlert className="h-3 w-3" /> No openings left that day — try tomorrow.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="bk-notes" className={labelCls}>
                  Notes <span className="font-normal normal-case text-mocha/45">(optional)</span>
                </label>
                <textarea
                  id="bk-notes"
                  rows={3}
                  placeholder="Pressure preferences, sensitivities, occasion…"
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  className={cn(inputCls(), "resize-none")}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 flex items-center justify-center gap-3 rounded-full bg-ember px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream shadow-[0_16px_36px_-14px_rgba(200,121,44,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ember-deep disabled:cursor-wait disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2.2} />
                    Sending request…
                  </>
                ) : (
                  "Request Booking"
                )}
              </button>

              <p className="text-center text-xs font-light leading-relaxed text-mocha/55">
                No payment is taken online — requests are confirmed on WhatsApp or by phone.
                <br />
                Prefer chat?{" "}
                <a
                  href={WA_GREETING_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-ember underline-offset-4 hover:underline"
                >
                  Book instantly on WhatsApp
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
