// "use client";

// import { useState } from "react";
// import Navbar from "../../components/Common/Navbar";
// import Footer from "../../components/Common/Footer";

// interface JournalPost {
//   id: number;
//   category: string;
//   date: string;
//   title: string;
//   excerpt: string;
//   readTime: string;
//   tag: string | null;
// }

// const journalPosts: JournalPost[] = [
//   {
//     id: 1,
//     category: "CRAFT & PROCESS",
//     date: "MAR 18, 2026",
//     title: "The Art of Slow Fashion: Why We Take Our Time",
//     excerpt:
//       "In a world of fast fashion, we chose a different path. Every stitch, every cut, every choice is deliberate. Here's what that means for you.",
//     readTime: "6 min read",
//     tag: "FEATURED",
//   },
//   {
//     id: 2,
//     category: "BEHIND THE SCENES",
//     date: "MAR 10, 2026",
//     title: "Inside Our Atelier: Where Ideas Become Reality",
//     excerpt:
//       "A rare look into our studio — the sketches, the mistakes, the breakthroughs that shape every collection we release.",
//     readTime: "4 min read",
//     tag: null,
//   },
//   {
//     id: 3,
//     category: "MATERIALS",
//     date: "FEB 28, 2026",
//     title: "Black Is Not a Color — It's a Statement",
//     excerpt:
//       "We obsess over black. The depth, the weight, the way it absorbs light. Our journey to find the perfect black fabric took three years.",
//     readTime: "5 min read",
//     tag: null,
//   },
//   {
//     id: 4,
//     category: "CULTURE",
//     date: "FEB 14, 2026",
//     title: "The Designers Who Changed How We See Red",
//     excerpt:
//       "From Valentino to Comme des Garçons, red has been weaponized, celebrated, and reimagined. We trace its power through fashion history.",
//     readTime: "8 min read",
//     tag: "EDITORIAL",
//   },
//   {
//     id: 5,
//     category: "SUSTAINABILITY",
//     date: "JAN 30, 2026",
//     title: "Zero Waste Is Not a Trend — It's Our Standard",
//     excerpt:
//       "Every scrap of fabric that enters our studio finds a purpose. We break down exactly how our zero-waste process works from start to finish.",
//     readTime: "7 min read",
//     tag: null,
//   },
//   {
//     id: 6,
//     category: "COMMUNITY",
//     date: "JAN 15, 2026",
//     title: "Letters From Our Customers: Real Stories, Real Impact",
//     excerpt:
//       "We asked. You answered. Hundreds of messages about how our pieces became part of your most important moments.",
//     readTime: "3 min read",
//     tag: null,
//   },
// ];

// const categories: string[] = [
//   "ALL",
//   "CRAFT & PROCESS",
//   "BEHIND THE SCENES",
//   "MATERIALS",
//   "CULTURE",
//   "SUSTAINABILITY",
//   "COMMUNITY",
// ];

// export default function JournalPage(): JSX.Element {
//   const [activeCategory, setActiveCategory] = useState<string>("ALL");
//   const [hoveredPost, setHoveredPost] = useState<number | null>(null);

//   const filtered: JournalPost[] =
//     activeCategory === "ALL"
//       ? journalPosts
//       : journalPosts.filter((p) => p.category === activeCategory);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <Navbar />
//       <main
//         style={{
//           background: "#0a0a0a",
//           minHeight: "100vh",
//           color: "#f5f5f0",
//           fontFamily: "'Georgia', 'Times New Roman', serif",
//           overflowX: "hidden",
//           paddingTop: "80px", // Account for fixed navbar
//         }}
//       >
//         <style>{`
//           @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Barlow+Condensed:wght@300;400;500;600;700&display=swap');

//           * { box-sizing: border-box; margin: 0; padding: 0; }

//           .journal-hero {
//             position: relative;
//             padding: 120px 60px 80px;
//             border-bottom: 1px solid #1e1e1e;
//             overflow: hidden;
//           }

//           .hero-bg-text {
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             font-family: 'Playfair Display', serif;
//             font-size: clamp(100px, 18vw, 240px);
//             font-weight: 900;
//             color: transparent;
//             -webkit-text-stroke: 1px rgba(200, 10, 30, 0.08);
//             white-space: nowrap;
//             pointer-events: none;
//             letter-spacing: -4px;
//             user-select: none;
//           }

//           .hero-eyebrow {
//             font-family: 'Barlow Condensed', sans-serif;
//             font-size: 11px;
//             font-weight: 600;
//             letter-spacing: 4px;
//             color: #c8001e;
//             text-transform: uppercase;
//             margin-bottom: 24px;
//             display: flex;
//             align-items: center;
//             gap: 12px;
//           }

//           .hero-eyebrow::before {
//             content: '';
//             display: inline-block;
//             width: 32px;
//             height: 1px;
//             background: #c8001e;
//           }

//           .hero-title {
//             font-family: 'Playfair Display', serif;
//             font-size: clamp(52px, 7vw, 96px);
//             font-weight: 900;
//             line-height: 0.95;
//             letter-spacing: -2px;
//             color: #f5f5f0;
//             position: relative;
//             z-index: 1;
//             max-width: 700px;
//           }

//           .hero-title em {
//             color: #c8001e;
//             font-style: italic;
//           }

//           .hero-sub {
//             font-family: 'Barlow Condensed', sans-serif;
//             font-size: 16px;
//             font-weight: 300;
//             color: rgba(245, 245, 240, 0.45);
//             margin-top: 28px;
//             max-width: 400px;
//             line-height: 1.6;
//             letter-spacing: 0.5px;
//             position: relative;
//             z-index: 1;
//           }

//           .hero-meta {
//             position: absolute;
//             right: 60px;
//             bottom: 80px;
//             text-align: right;
//             font-family: 'Barlow Condensed', sans-serif;
//           }

//           .hero-count {
//             font-size: 72px;
//             font-weight: 700;
//             color: #f5f5f0;
//             line-height: 1;
//           }

//           .hero-count-label {
//             font-size: 11px;
//             letter-spacing: 3px;
//             color: rgba(245, 245, 240, 0.35);
//             text-transform: uppercase;
//             margin-top: 4px;
//           }

//           .filter-bar {
//             display: flex;
//             align-items: center;
//             gap: 0;
//             padding: 0 60px;
//             border-bottom: 1px solid #1e1e1e;
//             overflow-x: auto;
//             scrollbar-width: none;
//           }

//           .filter-bar::-webkit-scrollbar { display: none; }

//           .filter-btn {
//             font-family: 'Barlow Condensed', sans-serif;
//             font-size: 11px;
//             font-weight: 600;
//             letter-spacing: 2.5px;
//             text-transform: uppercase;
//             color: rgba(245, 245, 240, 0.35);
//             background: none;
//             border: none;
//             padding: 20px 24px;
//             cursor: pointer;
//             white-space: nowrap;
//             transition: color 0.2s;
//             position: relative;
//           }

//           .filter-btn.active {
//             color: #f5f5f0;
//           }

//           .filter-btn.active::after {
//             content: '';
//             position: absolute;
//             bottom: 0;
//             left: 24px;
//             right: 24px;
//             height: 2px;
//             background: #c8001e;
//           }

//           .filter-btn:hover:not(.active) {
//             color: rgba(245, 245, 240, 0.7);
//           }

//           .posts-grid {
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//           }

//           .post-card {
//             padding: 52px 60px;
//             border-bottom: 1px solid #1e1e1e;
//             border-right: 1px solid #1e1e1e;
//             cursor: pointer;
//             position: relative;
//             overflow: hidden;
//             transition: background 0.3s;
//           }

//           .post-card:nth-child(even) {
//             border-right: none;
//           }

//           .post-card:hover {
//             background: rgba(200, 0, 30, 0.03);
//           }

//           .post-card::before {
//             content: '';
//             position: absolute;
//             left: 0;
//             top: 0;
//             width: 3px;
//             height: 100%;
//             background: #c8001e;
//             transform: scaleY(0);
//             transform-origin: bottom;
//             transition: transform 0.3s ease;
//           }

//           .post-card:hover::before {
//             transform: scaleY(1);
//           }

//           .post-tag {
//             display: inline-block;
//             font-family: 'Barlow Condensed', sans-serif;
//             font-size: 9px;
//             font-weight: 700;
//             letter-spacing: 3px;
//             text-transform: uppercase;
//             color: #0a0a0a;
//             background: #c8001e;
//             padding: 4px 10px;
//             margin-bottom: 20px;
//           }

//           .post-category {
//             font-family: 'Barlow Condensed', sans-serif;
//             font-size: 10px;
//             font-weight: 600;
//             letter-spacing: 3px;
//             text-transform: uppercase;
//             color: rgba(245, 245, 240, 0.35);
//             margin-bottom: 12px;
//           }

//           .post-title {
//             font-family: 'Playfair Display', serif;
//             font-size: clamp(22px, 2.5vw, 32px);
//             font-weight: 700;
//             line-height: 1.2;
//             color: #f5f5f0;
//             margin-bottom: 18px;
//             letter-spacing: -0.5px;
//             transition: color 0.2s;
//           }

//           .post-card:hover .post-title {
//             color: #ffffff;
//           }

//           .post-excerpt {
//             font-family: 'Barlow Condensed', sans-serif;
//             font-size: 15px;
//             font-weight: 300;
//             color: rgba(245, 245, 240, 0.45);
//             line-height: 1.65;
//             letter-spacing: 0.3px;
//             margin-bottom: 32px;
//           }

//           .post-footer {
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//           }

//           .post-date {
//             font-family: 'Barlow Condensed', sans-serif;
//             font-size: 10px;
//             font-weight: 500;
//             letter-spacing: 2px;
//             color: rgba(245, 245, 240, 0.25);
//             text-transform: uppercase;
//           }

//           .post-read-link {
//             font-family: 'Barlow Condensed', sans-serif;
//             font-size: 11px;
//             font-weight: 600;
//             letter-spacing: 2.5px;
//             text-transform: uppercase;
//             color: #c8001e;
//             display: flex;
//             align-items: center;
//             gap: 8px;
//             text-decoration: none;
//             transition: gap 0.2s;
//           }

//           .post-card:hover .post-read-link {
//             gap: 14px;
//           }

//           .post-read-link::after {
//             content: '→';
//           }

//           .post-num {
//             position: absolute;
//             top: 52px;
//             right: 60px;
//             font-family: 'Playfair Display', serif;
//             font-size: 64px;
//             font-weight: 900;
//             color: rgba(245, 245, 240, 0.04);
//             line-height: 1;
//             user-select: none;
//           }

//           .newsletter-strip {
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             border-top: 1px solid #1e1e1e;
//           }

//           .newsletter-left {
//             padding: 72px 60px;
//             border-right: 1px solid #1e1e1e;
//           }

//           .newsletter-label {
//             font-family: 'Barlow Condensed', sans-serif;
//             font-size: 11px;
//             font-weight: 600;
//             letter-spacing: 4px;
//             color: #c8001e;
//             text-transform: uppercase;
//             margin-bottom: 20px;
//             display: flex;
//             align-items: center;
//             gap: 12px;
//           }

//           .newsletter-label::before {
//             content: '';
//             display: inline-block;
//             width: 24px;
//             height: 1px;
//             background: #c8001e;
//           }

//           .newsletter-heading {
//             font-family: 'Playfair Display', serif;
//             font-size: clamp(32px, 4vw, 52px);
//             font-weight: 700;
//             line-height: 1.1;
//             letter-spacing: -1px;
//             color: #f5f5f0;
//           }

//           .newsletter-heading em {
//             font-style: italic;
//             color: #c8001e;
//           }

//           .newsletter-right {
//             padding: 72px 60px;
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//           }

//           .nl-desc {
//             font-family: 'Barlow Condensed', sans-serif;
//             font-size: 15px;
//             font-weight: 300;
//             color: rgba(245, 245, 240, 0.45);
//             line-height: 1.65;
//             margin-bottom: 36px;
//             letter-spacing: 0.3px;
//           }

//           .nl-form {
//             display: flex;
//             gap: 0;
//             border: 1px solid rgba(245, 245, 240, 0.12);
//           }

//           .nl-input {
//             flex: 1;
//             background: transparent;
//             border: none;
//             outline: none;
//             padding: 16px 20px;
//             font-family: 'Barlow Condensed', sans-serif;
//             font-size: 13px;
//             font-weight: 400;
//             letter-spacing: 1px;
//             color: #f5f5f0;
//           }

//           .nl-input::placeholder {
//             color: rgba(245, 245, 240, 0.25);
//             font-size: 12px;
//             letter-spacing: 2px;
//             text-transform: uppercase;
//           }

//           .nl-submit {
//             background: #c8001e;
//             border: none;
//             padding: 16px 28px;
//             font-family: 'Barlow Condensed', sans-serif;
//             font-size: 11px;
//             font-weight: 700;
//             letter-spacing: 3px;
//             text-transform: uppercase;
//             color: #fff;
//             cursor: pointer;
//             transition: background 0.2s;
//             white-space: nowrap;
//           }

//           .nl-submit:hover {
//             background: #a00018;
//           }

//           .footer-bar {
//             padding: 32px 60px;
//             border-top: 1px solid #1e1e1e;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//           }

//           .footer-logo {
//             font-family: 'Playfair Display', serif;
//             font-size: 18px;
//             font-weight: 900;
//             letter-spacing: -0.5px;
//             color: #f5f5f0;
//           }

//           .footer-logo span {
//             color: #c8001e;
//           }

//           .footer-back {
//             font-family: 'Barlow Condensed', sans-serif;
//             font-size: 11px;
//             font-weight: 600;
//             letter-spacing: 3px;
//             text-transform: uppercase;
//             color: rgba(245, 245, 240, 0.35);
//             text-decoration: none;
//             display: flex;
//             align-items: center;
//             gap: 8px;
//             transition: color 0.2s, gap 0.2s;
//             cursor: pointer;
//             background: none;
//             border: none;
//           }

//           .footer-back:hover {
//             color: #f5f5f0;
//             gap: 14px;
//           }

//           .footer-back::before {
//             content: '←';
//           }

//           @media (max-width: 768px) {
//             .journal-hero { padding: 80px 24px 60px; }
//             .hero-meta { right: 24px; bottom: 60px; }
//             .filter-bar { padding: 0 24px; }
//             .posts-grid { grid-template-columns: 1fr; }
//             .post-card { padding: 40px 24px; border-right: none !important; }
//             .newsletter-strip { grid-template-columns: 1fr; }
//             .newsletter-left { padding: 52px 24px; border-right: none; border-bottom: 1px solid #1e1e1e; }
//             .newsletter-right { padding: 52px 24px; }
//             .footer-bar { padding: 24px; }
//           }
//         `}</style>

//         {/* HERO */}
//         <section className="journal-hero">
//           <div className="hero-bg-text">JOURNAL</div>
//           <div className="hero-eyebrow">Our Journal</div>
//           <h1 className="hero-title">
//             Words That <em>Matter.</em>
//             <br />Stories Worth
//             <br />Telling.
//           </h1>
//           <p className="hero-sub">
//             Craft, culture, and the thinking behind every piece we make. No noise — just depth.
//           </p>
//           <div className="hero-meta">
//             <div className="hero-count">{journalPosts.length}</div>
//             <div className="hero-count-label">Stories Published</div>
//           </div>
//         </section>

//         {/* FILTER BAR */}
//         <nav className="filter-bar">
//           {categories.map((cat: string) => (
//             <button
//               key={cat}
//               className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
//               onClick={() => setActiveCategory(cat)}
//             >
//               {cat}
//             </button>
//           ))}
//         </nav>

//         {/* POSTS GRID */}
//         <section className="posts-grid">
//           {filtered.map((post: JournalPost, i: number) => (
//             <article
//               key={post.id}
//               className="post-card"
//               onMouseEnter={() => setHoveredPost(post.id)}
//               onMouseLeave={() => setHoveredPost(null)}
//             >
//               <div className="post-num">0{i + 1}</div>

//               {post.tag ? (
//                 <div className="post-tag">{post.tag}</div>
//               ) : (
//                 <div style={{ marginBottom: 20 }} />
//               )}

//               <div className="post-category">{post.category}</div>
//               <h2 className="post-title">{post.title}</h2>
//               <p className="post-excerpt">{post.excerpt}</p>

//               <div className="post-footer">
//                 <span className="post-date">
//                   {post.date} &nbsp;·&nbsp; {post.readTime}
//                 </span>
//                 <a href="#" className="post-read-link">
//                   Read
//                 </a>
//               </div>
//             </article>
//           ))}
//         </section>

//         {/* NEWSLETTER */}
//         <section className="newsletter-strip">
//           <div className="newsletter-left">
//             <div className="newsletter-label">Stay In The Loop</div>
//             <h2 className="newsletter-heading">
//               Get The Journal
//               <br />
//               <em>Directly.</em>
//             </h2>
//           </div>
//           <div className="newsletter-right">
//             <p className="nl-desc">
//               New stories drop every week. No spam, no promotions — just the essays, process
//               notes, and cultural takes that make this journal worth reading.
//             </p>
//             <div className="nl-form">
//               <input
//                 className="nl-input"
//                 type="email"
//                 placeholder="Your email address"
//               />
//               <button className="nl-submit">Subscribe</button>
//             </div>
//           </div>
//         </section>

//         {/* FOOTER BAR - Note: This is now just an internal footer, main Footer component will be added below */}
//         <div className="footer-bar">
//           <div className="footer-logo">
//             NOIR<span>.</span>
//           </div>
//           <button className="footer-back" onClick={scrollToTop}>
//             Back to Top
//           </button>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }

import React from 'react'

export default function page() {
  return (
    <div>
      
    </div>
  )
}
