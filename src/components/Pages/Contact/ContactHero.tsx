"use client";

const CONTENT = {
  eyebrow: "Get In Touch",
  headline: ["We'd Love to", "Hear From", "You."],
  accentWord: "You.",           // last word rendered in red italic
  subtext:
    "Whether it's a question about an order, a collaboration idea, or simply a desire to know more — our team is here, and we reply within 24 hours.",
};

export default function ContactHero() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center overflow-hidden" style={{ backgroundColor: "#F8F4F0" }}>

      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=75"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F4F0] via-[#F8F4F0]/85 to-[#F8F4F0]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F4F0] via-transparent to-transparent" />
      </div>

      {/* ── Floating orbs - changed to maroon ── */}
      <div
        className="absolute top-16 right-[10%] w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full blur-3xl pointer-events-none"
        style={{ 
          backgroundColor: "#800000",
          opacity: 0.08,
          animation: "heroFloat 8s ease-in-out infinite" 
        }}
      />
      <div
        className="absolute bottom-16 left-[5%] w-48 h-48 rounded-full blur-2xl pointer-events-none"
        style={{ 
          backgroundColor: "#800000",
          opacity: 0.06,
          animation: "heroFloat 11s ease-in-out infinite reverse" 
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 w-full">
        <div className="max-w-3xl">

          {/* Eyebrow - changed to maroon */}
          <div className="inline-flex items-center gap-3 mb-8 opacity-0" style={{ animation: "fadeUp 0.6s ease 0.1s forwards" }}>
            <div className="h-px w-8" style={{ backgroundColor: "#800000" }} />
            <span className="text-maroon text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#800000" }}>{CONTENT.eyebrow}</span>
            <div className="h-px w-8" style={{ backgroundColor: "#800000" }} />
          </div>

          {/* Headline - changed text colors */}
          <div className="opacity-0" style={{ animation: "fadeUp 0.7s ease 0.25s forwards" }}>
            <h1 className="font-display leading-[0.92] mb-8">
              {CONTENT.headline.slice(0, -1).map((line, i) => (
                <span key={i} className="block text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold" style={{ color: "#000000" }}>
                  {line}
                </span>
              ))}
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold italic" style={{ color: "#800000" }}>
                {CONTENT.headline[CONTENT.headline.length - 1]}
              </span>
            </h1>
          </div>

          {/* Subtext - changed to dark gray */}
          <p
            className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg opacity-0"
            style={{ animation: "fadeUp 0.7s ease 0.42s forwards" }}
          >
            {CONTENT.subtext}
          </p>

          {/* Scroll cue - changed to maroon */}
          <div
            className="mt-14 flex items-center gap-3 opacity-0"
            style={{ animation: "fadeUp 0.6s ease 0.58s forwards" }}
          >
            <div className="w-6 h-10 rounded-full border border-gray-300 flex items-start justify-center pt-2">
              <div className="w-1 h-2 rounded-full" style={{ backgroundColor: "#800000", animation: "scrollCue 1.8s ease-in-out infinite" }} />
            </div>
            <span className="text-gray-500 text-xs tracking-widest uppercase font-medium">Scroll to explore</span>
          </div>
        </div>
      </div>

      {/* Bottom fade to cream */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#F8F4F0] to-transparent" />

      <style>{`
        @keyframes heroFloat { 
          0%,100%{transform:translateY(0)} 
          50%{transform:translateY(-14px)} 
        }
        @keyframes fadeUp { 
          from{opacity:0;transform:translateY(22px)} 
          to{opacity:1;transform:translateY(0)} 
        }
        @keyframes scrollCue { 
          0%,100%{transform:translateY(0);opacity:1} 
          60%{transform:translateY(8px);opacity:0} 
        }
        
        .text-maroon {
          color: #800000 !important;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .text-5xl {
            font-size: 2.5rem !important;
          }
          .py-24 {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }
          .mb-8 {
            margin-bottom: 1.5rem !important;
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .text-5xl {
            font-size: 3rem !important;
          }
        }
        
        /* Smooth font rendering */
        .font-display {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif !important;
        }
        
        /* Import font */
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');
      `}</style>
    </section>
  );
}