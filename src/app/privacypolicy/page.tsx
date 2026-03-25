"use client";
import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck, Eye, Database, Share2, Lock, UserCheck,
  Cookie, Globe, Mail, Phone, ChevronDown, ChevronUp,
  ArrowUp, ExternalLink, CheckCircle, AlertTriangle,
} from "lucide-react";
import Navbar from "@/components/Common/Navbar"; 
import Footer from "@/components/Common/Footer"; 

// ── Brand / meta — EDIT THIS ──────────────────────────────────────────────────
const META = {
  brand:       "LUXE",
  lastUpdated: "March 4, 2026",
  version:     "3.1",
  email:       "privacy@luxe.com",
  phone:       "+1 (800) 589-2200",
  address:     "42 Rue du Faubourg Saint-Honoré, Paris 75001, France",
};

// ── Highlight summary cards ────────────────────────────────────────────────────
const HIGHLIGHTS = [
  { icon: Eye,       color: "red",    title: "Transparent",     desc: "We never sell your data or share it with advertisers." },
  { icon: Lock,      color: "black",  title: "Secure",          desc: "All data is encrypted at rest and in transit (TLS 1.3)." },
  { icon: UserCheck, color: "red",    title: "Your Control",    desc: "You can access, correct, or delete your data any time." },
  { icon: Cookie,    color: "black",  title: "Minimal Cookies", desc: "We use only essential and analytics cookies — no ad tracking." },
];

const COLOR_MAP: Record<string, { bg: string; border: string; icon: string }> = {
  red:    { bg: "bg-red-50",    border: "border-red-200",    icon: "text-red-600"    },
  black:  { bg: "bg-gray-900",  border: "border-gray-700",   icon: "text-white"      },
};

// ── Policy sections — EDIT CONTENT HERE ──────────────────────────────────────
interface PolicySection {
  id:      string;
  icon:    React.ElementType;
  title:   string;
  content: React.ReactNode;
}

const SECTIONS: PolicySection[] = [
  {
    id: "overview",
    icon: ShieldCheck,
    title: "Overview",
    content: (
      <div className="space-y-4">
        <p>
          Welcome to LUXE. We are committed to protecting your personal information and your right to privacy.
          This Privacy Policy explains what information we collect, how we use it, and what rights you have in
          relation to it. Please read it carefully before using our services.
        </p>
        <p>
          This policy applies to all information collected through our website (<strong>luxe.com</strong>),
          mobile applications, and any related services, sales, marketing, or events.
        </p>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3">
          <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 text-sm font-medium leading-relaxed">
            <strong>Summary:</strong> We collect only what we need, use it only for the purpose it was
            collected, never sell it to third parties, and give you full control to manage or delete it.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "data-collection",
    icon: Database,
    title: "Information We Collect",
    content: (
      <div className="space-y-5">
        <p>We collect information you provide directly and information generated automatically when you use our services.</p>

        <div>
          <h4 className="font-bold text-gray-900 text-sm mb-3">Information You Provide</h4>
          <ul className="space-y-2">
            {[
              "Name, email address, phone number, and billing/shipping address when you create an account or place an order",
              "Payment information (processed securely via PCI-DSS compliant payment processors — we never store raw card numbers)",
              "Profile preferences, size information, and saved wishlists",
              "Communications with our customer service team",
              "Reviews, feedback, or survey responses you submit",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-1.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 text-sm mb-3">Information Collected Automatically</h4>
          <ul className="space-y-2">
            {[
              "IP address, browser type, device identifiers, and operating system",
              "Pages visited, time spent, clicks, and navigation paths",
              "Referring URLs and search terms that led you to our site",
              "Location data (country/region level only, unless you enable precise location)",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-1.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "data-use",
    icon: Eye,
    title: "How We Use Your Information",
    content: (
      <div className="space-y-4">
        <p>We use the information we collect for the following purposes, always within the scope of the reason it was originally collected:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "Order Processing",      desc: "Fulfil, ship, and update you on your purchases." },
            { title: "Account Management",    desc: "Create and maintain your LUXE account and preferences." },
            { title: "Customer Support",      desc: "Respond to enquiries, complaints, and service requests." },
            { title: "Personalisation",       desc: "Show relevant product recommendations and content." },
            { title: "Security & Fraud",      desc: "Detect, investigate, and prevent fraudulent transactions." },
            { title: "Legal Compliance",      desc: "Meet our obligations under applicable laws and regulations." },
            { title: "Service Improvement",   desc: "Analyse usage patterns to improve site performance." },
            { title: "Marketing (opt-in)",    desc: "Send promotional emails only if you have subscribed." },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-3.5">
              <p className="font-bold text-gray-900 text-sm mb-1">{item.title}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 text-sm font-medium leading-relaxed">
            We will <strong>never</strong> use your data for purposes incompatible with those listed above
            without your explicit consent.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "data-sharing",
    icon: Share2,
    title: "Information Sharing",
    content: (
      <div className="space-y-4">
        <p>
          We do not sell, trade, or rent your personal information to third parties.
          We share information only in the following limited circumstances:
        </p>
        <div className="space-y-3">
          {[
            { title: "Service Providers",   desc: "Trusted vendors who help us operate (e.g. payment processors like Stripe, shipping partners like DHL/FedEx, email delivery via Mailchimp). All are bound by strict data processing agreements.", type: "neutral" },
            { title: "Legal Obligations",   desc: "When required by law, court order, or government authority. We will notify you when permitted before complying.", type: "neutral" },
            { title: "Business Transfers",  desc: "In the event of a merger, acquisition, or sale of assets, your data may be transferred. We will notify you via email and post a prominent notice on our site.", type: "neutral" },
            { title: "With Your Consent",   desc: "Any other sharing only occurs with your explicit, informed consent, which you can revoke at any time.", type: "positive" },
          ].map((item, i) => (
            <div key={i} className={`rounded-xl border p-4 flex gap-3
              ${item.type === "positive" ? "bg-red-50 border-red-200" : "bg-white border-gray-100 shadow-sm"}`}>
              <span className={`w-1 rounded-full flex-shrink-0 self-stretch
                ${item.type === "positive" ? "bg-red-500" : "bg-gray-300"}`} />
              <div>
                <p className="font-bold text-gray-900 text-sm mb-0.5">{item.title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies & Tracking",
    content: (
      <div className="space-y-5">
        <p>
          We use cookies and similar tracking technologies to enhance your experience.
          You can control cookies through your browser settings or our cookie preference centre.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-[11px] font-black tracking-wider uppercase text-gray-500">Type</th>
                <th className="text-left py-3 px-4 text-[11px] font-black tracking-wider uppercase text-gray-500">Purpose</th>
                <th className="text-left py-3 px-4 text-[11px] font-black tracking-wider uppercase text-gray-500">Duration</th>
                <th className="text-left py-3 px-4 text-[11px] font-black tracking-wider uppercase text-gray-500">Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { type: "Essential",   purpose: "Session management, security, cart",  duration: "Session",  required: true },
                { type: "Analytics",   purpose: "Anonymous usage stats via Plausible", duration: "1 year",   required: false },
                { type: "Preferences", purpose: "Language, currency, region",          duration: "1 year",   required: false },
                { type: "Marketing",   purpose: "Not used — we do not run ad tracking", duration: "—",       required: false },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-gray-900">{row.type}</td>
                  <td className="py-3 px-4 text-gray-500">{row.purpose}</td>
                  <td className="py-3 px-4 text-gray-500">{row.duration}</td>
                  <td className="py-3 px-4">
                    {row.required
                      ? <span className="text-[10px] font-black bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Required</span>
                      : <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Optional</span>}
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">
          We deliberately <strong>do not</strong> use Facebook Pixel, Google Ads tags, or any cross-site
          advertising trackers. Your browsing stays private.
        </p>
      </div>
    ),
  },
  {
    id: "security",
    icon: Lock,
    title: "Data Security",
    content: (
      <div className="space-y-4">
        <p>
          Protecting your data is a core part of how we build and operate LUXE. We implement
          industry-standard and beyond-standard measures:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "TLS 1.3 Encryption",     desc: "All data in transit is encrypted end-to-end." },
            { title: "AES-256 at Rest",         desc: "Databases and backups are encrypted with AES-256." },
            { title: "PCI-DSS Compliance",      desc: "Payment data handled by Stripe — we never see raw card numbers." },
            { title: "2FA on All Systems",      desc: "Staff access to production systems requires multi-factor auth." },
            { title: "Regular Penetration Tests", desc: "Third-party security audits conducted quarterly." },
            { title: "Incident Response Plan",  desc: "We will notify you within 72 hours of any confirmed breach." },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 bg-white border border-gray-100 rounded-xl p-3.5 shadow-sm">
              <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "your-rights",
    icon: UserCheck,
    title: "Your Rights",
    content: (
      <div className="space-y-4">
        <p>
          Depending on your location, you may have the following rights regarding your personal data.
          We honour all of these for every user globally, regardless of jurisdiction.
        </p>
        <div className="space-y-2.5">
          {[
            { right: "Right to Access",       desc: "Request a copy of all personal data we hold about you." },
            { right: "Right to Rectification", desc: "Correct any inaccurate or incomplete personal data." },
            { right: "Right to Erasure",       desc: "Request deletion of your data ('right to be forgotten')." },
            { right: "Right to Portability",   desc: "Receive your data in a structured, machine-readable format." },
            { right: "Right to Object",        desc: "Object to processing based on legitimate interests or for marketing." },
            { right: "Right to Restrict",      desc: "Ask us to pause processing of your data in certain circumstances." },
            { right: "Withdraw Consent",       desc: "Revoke previously given consent at any time with immediate effect." },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 font-black text-[10px]
                flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="font-bold text-gray-900 text-sm">{item.right}</p>
                <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-800 font-medium">
          To exercise any of these rights, email us at{" "}
          <a href={`mailto:${META.email}`} className="underline font-bold">{META.email}</a>.
          We will respond within <strong>30 days</strong>.
        </div>
      </div>
    ),
  },
  {
    id: "international",
    icon: Globe,
    title: "International Transfers",
    content: (
      <div className="space-y-4">
        <p>
          LUXE operates globally. Your information may be transferred to and processed in countries
          other than the one in which you reside. We ensure adequate safeguards are in place:
        </p>
        <ul className="space-y-2.5">
          {[
            "EU–US Data Privacy Framework for transfers between the EU/UK and United States",
            "Standard Contractual Clauses (SCCs) approved by the European Commission",
            "Binding Corporate Rules for intra-group transfers",
            "Adequacy decisions issued by the European Commission where applicable",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
              <Globe className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500">
          By using our services, you acknowledge that your data may be transferred internationally
          subject to these safeguards.
        </p>
      </div>
    ),
  },
  {
    id: "children",
    icon: AlertTriangle,
    title: "Children's Privacy",
    content: (
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 text-sm font-medium leading-relaxed">
            Our services are not directed to children under the age of <strong>16</strong>.
            We do not knowingly collect personal information from children.
          </p>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          If you are a parent or guardian and believe your child has provided us with personal
          information, please contact us immediately at{" "}
          <a href={`mailto:${META.email}`} className="text-red-600 font-semibold underline">{META.email}</a>.
          We will take steps to remove that information from our systems promptly.
        </p>
      </div>
    ),
  },
  {
    id: "retention",
    icon: Database,
    title: "Data Retention",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-gray-600 leading-relaxed">
          We retain personal information only for as long as necessary to fulfil the purposes for
          which it was collected, including legal, accounting, or reporting requirements.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-[11px] font-black tracking-wider uppercase text-gray-500">Data Type</th>
                <th className="text-left py-3 px-4 text-[11px] font-black tracking-wider uppercase text-gray-500">Retention Period</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { type: "Account data",          period: "Until account deletion + 30 days"  },
                { type: "Order & transaction records", period: "7 years (legal requirement)"   },
                { type: "Support conversations", period: "3 years"                            },
                { type: "Marketing preferences", period: "Until you unsubscribe"              },
                { type: "Analytics data",        period: "13 months (anonymised thereafter)"  },
                { type: "Security & fraud logs", period: "2 years"                            },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-gray-900">{row.type}</td>
                  <td className="py-3 px-4 text-gray-500">{row.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: "changes",
    icon: CheckCircle,
    title: "Changes to This Policy",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-gray-600 leading-relaxed">
          We may update this Privacy Policy from time to time. When we make material changes,
          we will notify you by:
        </p>
        <ul className="space-y-2">
          {[
            "Sending an email to the address on your account",
            "Displaying a prominent notice on our website for 30 days",
            "Updating the 'Last Updated' date at the top of this policy",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-1.5" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-600 leading-relaxed">
          Continued use of our services after a policy update constitutes acceptance of the revised terms.
          We encourage you to review this policy periodically.
        </p>
      </div>
    ),
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact Us",
    content: (
      <div className="space-y-5">
        <p className="text-sm text-gray-600 leading-relaxed">
          If you have any questions, concerns, or requests regarding this Privacy Policy or our
          data practices, please reach out to our dedicated Privacy Team:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: Mail,  label: "Email",   value: META.email,   href: `mailto:${META.email}` },
            { icon: Phone, label: "Phone",   value: META.phone,   href: `tel:${META.phone}`    },
            { icon: Globe, label: "Address", value: META.address, href: "#"                    },
          ].map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              className="flex flex-col gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-4
                hover:border-red-300 hover:bg-red-50 transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center
                group-hover:border-red-300 transition-colors">
                <Icon className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" />
              </div>
              <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">{label}</p>
              <p className="text-sm font-semibold text-gray-900 leading-snug">{value}</p>
            </a>
          ))}
        </div>
        <p className="text-sm text-gray-500">
          Our Data Protection Officer can be reached at{" "}
          <a href={`mailto:dpo@luxe.com`} className="text-red-600 font-semibold underline">dpo@luxe.com</a>.
          You also have the right to lodge a complaint with your local data protection authority.
        </p>
      </div>
    ),
  },
];

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

// ── Single policy section (desktop inline) ───────────────────────────────────
function PolicyBlock({ section, index }: { section: PolicySection; index: number }) {
  const { ref, vis } = useFadeIn();
  const Icon = section.icon;
  return (
    <div
      id={section.id}
      ref={ref}
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden scroll-mt-6
        transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 bg-gray-50/60">
        <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-gray-400">
            Section {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="font-bold text-gray-900 text-base sm:text-lg leading-tight">{section.title}</h2>
        </div>
      </div>
      {/* Content */}
      <div className="px-6 py-6 text-gray-600 text-sm leading-relaxed">{section.content}</div>
    </div>
  );
}

// ── Mobile accordion item ─────────────────────────────────────────────────────
function MobileAccordion({ section, index }: { section: PolicySection; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const Icon = section.icon;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-3 px-5 py-4 text-left transition-colors
          ${open ? "bg-red-50" : "hover:bg-gray-50"}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors
            ${open ? "bg-red-600" : "bg-gray-100"}`}>
            <Icon className={`w-4 h-4 ${open ? "text-white" : "text-gray-500"}`} />
          </div>
          <span className={`font-bold text-sm ${open ? "text-red-700" : "text-gray-900"}`}>
            {section.title}
          </span>
        </div>
        {open
          ? <ChevronUp   className="w-4 h-4 text-red-500 flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-2 text-sm text-gray-600 leading-relaxed border-t border-red-100">
          {section.content}
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [showTop,  setShowTop]  = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handler = () => {
      setShowTop(window.scrollY > 400);
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveId(s.id);
          return;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
        .font-display{font-family:'Cormorant Garamond',serif;}
        *{font-family:'DM Sans',sans-serif;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        html{scroll-behavior:smooth;}
      `}</style>

      {/* Add Navbar here */}
      <Navbar />

      <div className="min-h-screen bg-white pt-20"> {/* Changed to white background */}

        {/* ── HERO ── */}
        <section className="relative bg-black overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
            <div className="inline-flex items-center gap-2 mb-5 opacity-0" style={{ animation: "fadeUp 0.5s ease 0.1s forwards" }}>
              <div className="h-px w-6 bg-red-500" />
              <span className="text-red-400 text-[10px] font-bold tracking-[0.3em] uppercase">Legal</span>
              <div className="h-px w-6 bg-red-500" />
            </div>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/30 mb-6 opacity-0"
              style={{ animation: "fadeUp 0.5s ease 0.2s forwards" }}>
              <ShieldCheck className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5 opacity-0"
              style={{ animation: "fadeUp 0.6s ease 0.3s forwards" }}>
              Privacy Policy
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-7 opacity-0"
              style={{ animation: "fadeUp 0.6s ease 0.4s forwards" }}>
              We believe privacy is a right, not a privilege. This policy explains clearly and honestly
              how we collect, use, and protect your personal information.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap opacity-0"
              style={{ animation: "fadeUp 0.5s ease 0.52s forwards" }}>
              <span className="text-[11px] font-bold text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                Last updated: {META.lastUpdated}
              </span>
              <span className="text-[11px] font-bold text-red-400 bg-red-600/10 border border-red-500/20 px-3 py-1.5 rounded-full">
                Version {META.version}
              </span>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

          {/* ── HIGHLIGHTS ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
            {HIGHLIGHTS.map(({ icon: Icon, color, title, desc }) => {
              const c = COLOR_MAP[color];
              return (
                <div key={title} className={`rounded-2xl border p-4 sm:p-5 ${c.bg} ${c.border}`}>
                  <div className={`w-9 h-9 rounded-xl bg-white border ${c.border} flex items-center justify-center mb-3`}>
                    <Icon className={`w-4 h-4 ${c.icon}`} />
                  </div>
                  <p className={`font-black text-sm mb-1 ${color === 'red' ? 'text-red-600' : 'text-white'}`}>{title}</p>
                  <p className={`text-xs leading-relaxed ${color === 'red' ? 'text-gray-600' : 'text-gray-300'}`}>{desc}</p>
                </div>
              );
            })}
          </div>

          {/* ── DESKTOP: sidebar TOC + content ── */}
          <div className="hidden lg:grid lg:grid-cols-[240px_1fr] gap-10 items-start">

            {/* Sticky TOC */}
            <nav className="sticky top-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-4 border-b border-gray-100">
                <p className="text-[10px] font-black tracking-[0.22em] uppercase text-gray-400">
                  Contents
                </p>
              </div>
              <ul className="py-2">
                {SECTIONS.map((s, i) => {
                  const Icon = s.icon;
                  const isActive = activeId === s.id;
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => scrollTo(s.id)}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-all group
                          ${isActive ? "bg-red-50 text-red-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                      >
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-red-600" : "text-gray-300 group-hover:text-gray-500"}`} />
                        <span className={`text-xs font-semibold leading-snug ${isActive ? "font-bold" : ""}`}>
                          {s.title}
                        </span>
                        {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Content blocks */}
            <div className="space-y-4">
              {SECTIONS.map((s, i) => <PolicyBlock key={s.id} section={s} index={i} />)}

              {/* Footer note */}
              <div className="bg-black rounded-2xl p-6 sm:p-8 text-center">
                <ShieldCheck className="w-8 h-8 text-red-400 mx-auto mb-3" />
                <p className="font-display italic font-bold text-white text-2xl mb-2">
                  Privacy by Design
                </p>
                <p className="text-gray-400 text-sm max-w-md mx-auto mb-5 leading-relaxed">
                  {META.brand} is built with privacy at its core. We revisit and improve these practices
                  continuously — and we welcome your feedback.
                </p>
                <a
                  href={`mailto:${META.email}`}
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white
                    font-bold text-sm tracking-wide px-6 py-3 rounded-xl transition-all"
                >
                  <Mail className="w-4 h-4" /> Contact Privacy Team
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* ── MOBILE / TABLET: accordion ── */}
          <div className="lg:hidden space-y-3">
            {SECTIONS.map((s, i) => <MobileAccordion key={s.id} section={s} index={i} />)}

            {/* Footer */}
            <div className="bg-black rounded-2xl p-6 text-center">
              <ShieldCheck className="w-7 h-7 text-red-400 mx-auto mb-3" />
              <p className="font-display italic font-bold text-white text-2xl mb-2">Privacy by Design</p>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                {META.brand} is built with privacy at its core. We welcome your feedback.
              </p>
              <a
                href={`mailto:${META.email}`}
                className="inline-flex items-center gap-2 bg-red-600 text-white font-bold text-sm px-6 py-3 rounded-xl"
              >
                <Mail className="w-4 h-4" /> Contact Privacy Team
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add Footer here */}
      <Footer />

      {/* ── Back to top ── */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-2xl bg-black hover:bg-red-700
            text-white shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
}