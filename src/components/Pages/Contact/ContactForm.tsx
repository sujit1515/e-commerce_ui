"use client";
import { useEffect, useRef, useState } from "react";
import { Send, CheckCircle, Loader2, User, Mail, MessageSquare, ChevronDown } from "lucide-react";
import { sendContactMessage } from "@/api/contact";

// ─────────────────────────────────────────────────────────────────────────────
//  ContactForm.tsx
//  Full contact form with validation, loading state, success screen.
//  Left column = editorial context. Right column = form.
// ─────────────────────────────────────────────────────────────────────────────

const SUBJECTS = [
  "Order Enquiry",
  "Product Question",
  "Press & Collaboration",
  "Wholesale",
  "Return or Exchange",
  "Other",
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}
interface Errors { [k: string]: string }

function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

// ── Floating label input ──────────────────────────────────────────────────────
function Field({
  label, name, type = "text", value, onChange, error, disabled, icon: Icon,
  as,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string; disabled: boolean; icon: React.ElementType; as?: "textarea" | "select";
}) {
  const [focused, setFocused] = useState(false);
  const hasVal = value.length > 0;
  const baseInput = `w-full bg-white border rounded-xl text-black text-sm outline-none transition-all duration-200
    placeholder-transparent resize-none
    focus:bg-white focus:ring-2
    ${error ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-gray-300 focus:border-red-500 focus:ring-red-50"}`;

  return (
    <div className="relative">
      {/* Floating label */}
      <label
        className={`absolute left-11 pointer-events-none font-medium transition-all duration-200 z-10
          ${focused || hasVal
            ? "top-2 text-[10px] tracking-wider uppercase text-red-600"
            : "top-1/2 -translate-y-1/2 text-sm text-gray-500"
          }
          ${as === "textarea" ? (focused || hasVal ? "top-2" : "top-4 -translate-y-0") : ""}
        `}
      >
        {label}
      </label>

      {/* Icon */}
      <Icon className={`absolute left-3.5 w-4 h-4 pointer-events-none transition-colors duration-200 z-10
        ${as === "textarea" ? "top-4" : "top-1/2 -translate-y-1/2"}
        ${focused ? "text-red-500" : "text-gray-400"}`}
      />

      {as === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={5}
          placeholder={label}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${baseInput} pl-10 pr-4 pt-7 pb-3 leading-relaxed`}
        />
      ) : as === "select" ? (
        <div className="relative">
          <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`${baseInput} pl-10 pr-10 pt-6 pb-2.5 appearance-none cursor-pointer`}
          >
            <option value="" disabled />
            {SUBJECTS.map(s => <option key={s}>{s}</option>)}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={label}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${baseInput} pl-10 pr-4 pt-6 pb-2.5`}
        />
      )}

      {error && <p className="mt-1.5 text-red-500 text-xs font-medium">{error}</p>}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ContactForm() {
  const left  = useFadeIn();
  const right = useFadeIn();

  const [form, setForm]           = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors]       = useState<Errors>({});
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => { const n = { ...p }; delete n[name]; return n; });
  };

  const validate = () => {
    const e: Errors = {};
    if (!form.name.trim())                           e.name    = "Name is required";
    if (!form.email.trim())                          e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))      e.email   = "Enter a valid email";
    if (!form.subject)                               e.subject = "Please select a subject";
    if (!form.message.trim())                        e.message = "Message is required";
    else if (form.message.trim().length < 20)        e.message = "Message must be at least 20 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);

  try {
    const response = await sendContactMessage(form);
    setLoading(false);

    if (response.success) {
      setSubmitted(true);
    } else {
      alert(response.message || "Failed to send message.");
    }
  } catch (error) {
    setLoading(false);
    alert("Something went wrong. Please try again later.");
  }
};

  const reset = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT — editorial context ── */}
          <div
            ref={left.ref}
            className={`transition-all duration-700 ${left.vis ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"} lg:sticky lg:top-28`}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-6 bg-red-600" />
              <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">Send a Message</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-black leading-tight mb-5">
              Let's Start a
              <br />
              <span className="italic text-red-600">Conversation</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-10 max-w-md">
              Fill in the form and one of our team members will personally respond.
              We don't use bots — every reply is crafted with care.
            </p>

            {/* Promise cards */}
            <div className="space-y-3">
              {[
                { emoji: "⚡", title: "Fast Response",    detail: "Replies within 24 hours guaranteed" },
                { emoji: "🔒", title: "Private & Secure", detail: "Your data is never shared or sold" },
                { emoji: "🎯", title: "Dedicated Support", detail: "Routed to the right expert, first time" },
              ].map((p, i) => (
                <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <span className="text-xl leading-none mt-0.5">{p.emoji}</span>
                  <div>
                    <p className="font-bold text-black text-sm">{p.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{p.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative image */}
            <div className="mt-10 rounded-2xl overflow-hidden aspect-[16/9] shadow-xl hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80"
                alt="LUXE support team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ── RIGHT — form ── */}
          <div
            ref={right.ref}
            className={`transition-all duration-700 delay-150 ${right.vis ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Top accent */}
              <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600" />

              <div className="p-7 sm:p-10">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Full Name"      name="name"    icon={User}           value={form.name}    onChange={handleChange} error={errors.name}    disabled={loading} />
                      <Field label="Email Address"  name="email"   type="email" icon={Mail} value={form.email}  onChange={handleChange} error={errors.email}   disabled={loading} />
                    </div>
                    <Field label="Subject"         name="subject" icon={ChevronDown}    value={form.subject} onChange={handleChange} error={errors.subject} disabled={loading} as="select" />
                    <Field label="Your message…"   name="message" icon={MessageSquare}  value={form.message} onChange={handleChange} error={errors.message} disabled={loading} as="textarea" />

                    {/* Character count */}
                    <div className="flex justify-end -mt-3">
                      <span className={`text-xs font-medium ${form.message.length > 500 ? "text-red-400" : "text-gray-400"}`}>
                        {form.message.length} / 500
                      </span>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-black hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed
                        text-white font-bold py-3.5 rounded-xl transition-all duration-200
                        shadow-lg shadow-black/20 hover:shadow-xl flex items-center justify-center gap-2 text-sm"
                    >
                      {loading
                        ? <><Loader2 className="animate-spin w-4 h-4" /> Sending message…</>
                        : <><Send className="w-4 h-4" /> Send Message</>
                      }
                    </button>

                    <p className="text-center text-gray-500 text-xs">
                      By submitting, you agree to our{" "}
                      <a href="/privacypolicy" className="text-red-500 hover:underline">Privacy Policy</a>.
                    </p>
                  </form>
                ) : (
                  /* ── Success state ── */
                  <div className="py-8 text-center">
                    <div className="relative inline-flex mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-red-600" />
                      </div>
                      <div className="absolute -inset-2 rounded-3xl bg-red-500/5 animate-ping" style={{ animationDuration: "2s" }} />
                    </div>
                    <h3 className="font-display text-3xl font-bold text-black mb-3">Message Sent!</h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto mb-2">
                      Thank you, <span className="font-semibold text-black">{form.name}</span>.
                      We've received your message and will reply to
                    </p>
                    <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-2 mb-7">
                      <Mail className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                      <span className="text-red-600 font-semibold text-sm break-all">{form.email}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={reset}
                        className="flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-md"
                      >
                        Send Another Message
                      </button>
                      <a
                        href="/"
                        className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold px-6 py-3 rounded-xl transition-all text-sm"
                      >
                        Back to Home
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}