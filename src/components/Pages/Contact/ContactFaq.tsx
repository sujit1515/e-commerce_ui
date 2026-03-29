"use client";
import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQ { q: string; a: string }

const FAQ_ITEMS: FAQ[] = [
  { q: "How long does shipping take?",           a: "Standard shipping takes 3–7 business days. Express (1–2 days) and Same-Day (select cities) are also available at checkout. All orders are dispatched from our Paris warehouse within 24 hours." },
  { q: "What is your return policy?",            a: "We offer a 30-day hassle-free return policy. Items must be unworn, unwashed, and in original packaging. Once received, refunds are processed within 5–7 business days to your original payment method." },
  { q: "Do you ship internationally?",           a: "Yes — we ship to 180+ countries. International orders arrive within 7–14 business days. Duties and taxes are calculated at checkout based on your destination country." },
  { q: "How do I track my order?",               a: "Once your order ships, you'll receive an email with a tracking link. You can also check the status in real time from the 'My Orders' section in your account." },
  { q: "Can I change or cancel my order?",       a: "Orders can be modified or cancelled within 2 hours of placement. After that, the order enters our fulfilment pipeline. Contact us immediately at hello@luxe.com and we'll do our best to assist." },
  { q: "Are LUXE products sustainably made?",    a: "Sustainability is central to everything we do. We use certified sustainable materials, carbon-neutral shipping, and 100% recycled packaging. We publish an annual impact report on our Sustainability page." },
];

function AccordionItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`border rounded-2xl overflow-hidden shadow-sm transition-all duration-500
        ${open ? "shadow-md" : "hover:border-maroon/30"}
        ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ 
        transitionDelay: vis ? `${index * 60}ms` : "0ms",
        borderColor: open ? "rgba(128, 0, 0, 0.3)" : "rgba(128, 0, 0, 0.1)"
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200
          ${open ? "bg-maroon/5" : "bg-white hover:bg-maroon/5"}`}
        style={{ backgroundColor: open ? "rgba(128, 0, 0, 0.05)" : undefined }}
      >
        <span className={`font-bold text-sm sm:text-base ${open ? "text-maroon" : "text-black"}`} style={{ color: open ? "#800000" : "#000000" }}>
          {faq.q}
        </span>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200
          ${open ? "text-white" : "bg-gray-100 text-gray-600"}`}
          style={{ backgroundColor: open ? "#800000" : "#f3f4f6" }}
        >
          {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* Animated answer */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "300px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="px-6 pb-5 pt-2 text-gray-600 text-sm leading-relaxed" style={{ borderTop: "1px solid rgba(128, 0, 0, 0.1)" }}>
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function ContactFAQ() {
  const headRef = useRef<HTMLDivElement>(null);
  const [headVis, setHeadVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeadVis(true); }, { threshold: 0.2 });
    if (headRef.current) obs.observe(headRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 sm:py-28" style={{ backgroundColor: "#F8F4F0" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-12 transition-all duration-700 ${headVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-6" style={{ backgroundColor: "#800000" }} />
            <span className="text-maroon text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#800000" }}>FAQ</span>
            <div className="h-px w-6" style={{ backgroundColor: "#800000" }} />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-4">
            <span style={{ color: "#000000" }}>Common</span>
            <br />
            <span className="italic" style={{ color: "#800000" }}>Questions</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-sm mx-auto">
            Can't find what you're looking for? Send us a message using the form above.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, i) => (
            <AccordionItem key={i} faq={faq} index={i} />
          ))}
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
          .px-6 {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .py-5 {
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}