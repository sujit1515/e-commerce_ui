"use client";

// ─────────────────────────────────────────────────────────────────────────────
//  ContactHero.tsx
//  Full-width dark hero banner for the Contact page.
//  Reusable: swap headline / subtext via CONTENT object below.
// ─────────────────────────────────────────────────────────────────────────────

const CONTENT = {
  eyebrow: "Get In Touch",
  headline: ["We'd Love to", "Hear From", "You."],
  accentWord: "You.",           // last word rendered in red italic
  subtext:
    "Whether it's a question about an order, a collaboration idea, or simply a desire to know more — our team is here, and we reply within 24 hours.",
};

export default function ContactHero() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center overflow-hidden bg-black">

      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=75"
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* ── Floating orbs ── */}
      <div
        className="absolute top-16 right-[10%] w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full bg-red-600/8 blur-3xl pointer-events-none"
        style={{ animation: "heroFloat 8s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-16 left-[5%] w-48 h-48 rounded-full bg-red-500/6 blur-2xl pointer-events-none"
        style={{ animation: "heroFloat 11s ease-in-out infinite reverse" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 w-full">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-8 opacity-0" style={{ animation: "fadeUp 0.6s ease 0.1s forwards" }}>
            <div className="h-px w-8 bg-red-600" />
            <span className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase">{CONTENT.eyebrow}</span>
            <div className="h-px w-8 bg-red-600" />
          </div>

          {/* Headline */}
          <div className="opacity-0" style={{ animation: "fadeUp 0.7s ease 0.25s forwards" }}>
            <h1 className="font-display leading-[0.92] mb-8">
              {CONTENT.headline.slice(0, -1).map((line, i) => (
                <span key={i} className="block text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold text-white">
                  {line}
                </span>
              ))}
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold italic text-red-500">
                {CONTENT.headline[CONTENT.headline.length - 1]}
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <p
            className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg opacity-0"
            style={{ animation: "fadeUp 0.7s ease 0.42s forwards" }}
          >
            {CONTENT.subtext}
          </p>

          {/* Scroll cue */}
          <div
            className="mt-14 flex items-center gap-3 opacity-0"
            style={{ animation: "fadeUp 0.6s ease 0.58s forwards" }}
          >
            <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2">
              <div className="w-1 h-2 rounded-full bg-red-500" style={{ animation: "scrollCue 1.8s ease-in-out infinite" }} />
            </div>
            <span className="text-gray-500 text-xs tracking-widest uppercase font-medium">Scroll to explore</span>
          </div>
        </div>
      </div>

      {/* Bottom white fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent" />

      <style>{`
        @keyframes heroFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scrollCue { 0%,100%{transform:translateY(0);opacity:1} 60%{transform:translateY(8px);opacity:0} }
      `}</style>
    </section>
  );
}