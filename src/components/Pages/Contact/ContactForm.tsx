"use client";
import { useEffect, useRef, useState } from "react";
import { Send, CheckCircle, Loader2, User, Mail, MessageSquare, ChevronDown } from "lucide-react";
import { sendContactMessage } from "@/api/contact";


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
    ${error ? "border-maroon/40 focus:border-maroon focus:ring-maroon/10" : "border-gray-300 focus:border-maroon focus:ring-maroon/10"}`;

  return (
    <div className="relative">
      {/* Floating label */}
      <label
        className={`absolute left-11 pointer-events-none font-medium transition-all duration-200 z-10
          ${focused || hasVal
            ? "top-2 text-[10px] tracking-wider uppercase text-maroon"
            : "top-1/2 -translate-y-1/2 text-sm text-gray-500"
          }
          ${as === "textarea" ? (focused || hasVal ? "top-2" : "top-4 -translate-y-0") : ""}
        `}
        style={{ color: (focused || hasVal) ? "#800000" : undefined }}
      >
        {label}
      </label>

      {/* Icon */}
      <Icon className={`absolute left-3.5 w-4 h-4 pointer-events-none transition-colors duration-200 z-10
        ${as === "textarea" ? "top-4" : "top-1/2 -translate-y-1/2"}
        ${focused ? "text-maroon" : "text-gray-400"}`}
        style={{ color: focused ? "#800000" : undefined }}
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

      {error && <p className="mt-1.5 text-maroon text-xs font-medium" style={{ color: "#800000" }}>{error}</p>}
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
    <section className="py-20 sm:py-28" style={{ backgroundColor: "#F8F4F0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT — editorial context ── */}
          <div
            ref={left.ref}
            className={`transition-all duration-700 ${left.vis ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"} lg:sticky lg:top-28`}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-6" style={{ backgroundColor: "#800000" }} />
              <span className="text-maroon text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#800000" }}>Send a Message</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-5">
              <span style={{ color: "#000000" }}>Let's Start a</span>
              <br />
              <span className="italic" style={{ color: "#800000" }}>Conversation</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-10 max-w-md">
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
                <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 border shadow-sm" style={{ borderColor: "rgba(128, 0, 0, 0.1)" }}>
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
            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor: "rgba(128, 0, 0, 0.1)" }}>
              {/* Top accent - maroon gradient */}
              <div className="h-1 w-full bg-gradient-to-r" style={{ background: "linear-gradient(to right, #800000, #9D2A2A, #800000)" }} />

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
                      <span className={`text-xs font-medium ${form.message.length > 500 ? "text-maroon/60" : "text-gray-400"}`}>
                        {form.message.length} / 500
                      </span>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full disabled:bg-gray-300 disabled:cursor-not-allowed
                        text-white font-bold py-3.5 rounded-xl transition-all duration-200
                        shadow-lg flex items-center justify-center gap-2 text-sm"
                      style={{ 
                        backgroundColor: "#800000",
                        boxShadow: "0 10px 25px -5px rgba(128, 0, 0, 0.3)"
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#5C0000"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#800000"; }}
                    >
                      {loading
                        ? <><Loader2 className="animate-spin w-4 h-4" /> Sending message…</>
                        : <><Send className="w-4 h-4" /> Send Message</>
                      }
                    </button>

                    <p className="text-center text-gray-500 text-xs">
                      By submitting, you agree to our{" "}
                      <a href="/privacypolicy" className="text-maroon hover:underline" style={{ color: "#800000" }}>Privacy Policy</a>.
                    </p>
                  </form>
                ) : (
                  /* ── Success state ── */
                  <div className="py-8 text-center">
                    <div className="relative inline-flex mb-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(128, 0, 0, 0.1)", border: "1px solid rgba(128, 0, 0, 0.2)" }}>
                        <CheckCircle className="w-8 h-8" style={{ color: "#800000" }} />
                      </div>
                      <div className="absolute -inset-2 rounded-3xl animate-ping" style={{ backgroundColor: "rgba(128, 0, 0, 0.05)", animationDuration: "2s" }} />
                    </div>
                    <h3 className="font-display text-3xl font-bold text-black mb-3">Message Sent!</h3>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto mb-2">
                      Thank you, <span className="font-semibold text-black">{form.name}</span>.
                      We've received your message and will reply to
                    </p>
                    <div className="inline-flex items-center gap-2 rounded-xl px-4 py-2 mb-7" style={{ backgroundColor: "rgba(128, 0, 0, 0.1)", border: "1px solid rgba(128, 0, 0, 0.2)" }}>
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#800000" }} />
                      <span className="font-semibold text-sm break-all" style={{ color: "#800000" }}>{form.email}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={reset}
                        className="flex items-center justify-center gap-2 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-md"
                        style={{ backgroundColor: "#800000" }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#5C0000"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#800000"; }}
                      >
                        Send Another Message
                      </button>
                      <a
                        href="/"
                        className="flex items-center justify-center gap-2 border text-gray-600 hover:bg-gray-50 font-semibold px-6 py-3 rounded-xl transition-all text-sm"
                        style={{ borderColor: "rgba(128, 0, 0, 0.2)" }}
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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');
        
        .font-display {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif !important;
        }
        
        .text-maroon {
          color: #800000 !important;
        }
        
        @media (max-width: 640px) {
          .text-4xl {
            font-size: 2rem !important;
          }
          .p-7 {
            padding: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}