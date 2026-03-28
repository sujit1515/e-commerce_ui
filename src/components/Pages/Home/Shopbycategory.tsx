"use client";

import { useState, KeyboardEvent } from "react";
import React from "react";
import { useRouter } from "next/navigation"; 

// ── Types 
interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
  href: string;
}

// ── Data 
const categories: Category[] = [
  {
    id: 1,
    name: "Mens Collection",
    image: "/Images/Shop/men.jpg",
    description: "Timeless elegance draped in tradition",
    href: "/shop/men",
  },
  {
    id: 2,
    name: "Kid Collection",
    image: "/Images/Shop/kid.jpg",
    description: "Bridal grandeur for your finest moments",
    href: "/shop/kid",
  },
   {
    id: 3,
    name: "Womens Collection",
    image: "/Images/Shop/women.jpg",
    description: "Contemporary comfort meets cultural grace",
    href: "/shop/women",
  }
];

// ── Styles
const styles: Record<string, React.CSSProperties> = {
  section: {
    width: "100%",
    backgroundColor: "#F8F4F0", // Updated background color
    padding: "4rem 1rem",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  decorLine: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "0.75rem",
  },
  lineBar: {
    height: "1px",
    width: "80px",
    backgroundColor: "#800000", // Maroon color
    opacity: 0.3,
  },
  diamond: {
    width: "8px",
    height: "8px",
    backgroundColor: "#800000", // Maroon color
    transform: "rotate(45deg)",
    opacity: 0.5,
  },
  title: {
    fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
    letterSpacing: "0.25em",
    color: "#800000", // Maroon color
    fontWeight: "600",
    margin: "0 0 0.5rem 0",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  },
  subtitle: {
    fontSize: "clamp(0.85rem, 2vw, 1rem)",
    color: "#800000", // Maroon color
    fontStyle: "italic",
    margin: 0,
    letterSpacing: "0.05em",
    fontWeight: "500",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "2rem",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: "3 / 4",
    overflow: "hidden",
    marginBottom: "1.25rem",
    position: "relative",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(128, 0, 0, 0.1)", // Maroon tinted shadow
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
    display: "block",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(128, 0, 0, 0.9) 0%, rgba(128, 0, 0, 0.3) 70%, transparent 100%)", // Maroon gradient
    opacity: 0,
    transition: "opacity 0.4s ease",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: "1.5rem",
  },
  overlayText: {
    color: "#ffffff",
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    fontStyle: "italic",
    textAlign: "center",
    padding: "0 1rem",
    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
    fontWeight: "500",
  },
  categoryName: {
    fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
    letterSpacing: "0.3em",
    color: "#800000", // Maroon color
    fontWeight: "600",
    margin: "0.5rem 0 0.25rem 0",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  },
  shopNowBtn: {
    marginTop: "0.5rem",
    fontSize: "0.7rem",
    letterSpacing: "0.2em",
    color: "#800000", // Maroon color
    border: "none",
    background: "none",
    cursor: "pointer",
    padding: "0.25rem 0",
    borderBottom: "1px solid #800000", // Maroon border
    transition: "color 0.2s, border-color 0.2s",
    fontWeight: "500",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function SignatureStyleSection(): React.ReactElement {
  const [hovered, setHovered] = useState<number | null>(null);
  const router = useRouter();

  const handleNavigate = (href: string): void => {
    router.push(href);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, href: string): void => {
    if (e.key === "Enter") handleNavigate(href);
  };

  return (
    <>
      {/* ── Responsive CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');

        .sig-section {
          font-family: 'Cormorant Garamond', Georgia, serif !important;
          background-color: #F8F4F0 !important; /* Updated background color */
        }
        .sig-title {
          font-family: 'Cormorant Garamond', Georgia, serif !important;
          font-weight: 600 !important;
        }
        .sig-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .sig-card:hover .sig-image {
          transform: scale(1.06);
        }
        .sig-card:hover .sig-overlay {
          opacity: 1 !important;
        }
        .sig-card:hover {
          transform: translateY(-6px);
        }
        .sig-shop-btn:hover {
          color: #9d2a2a !important;
          border-color: #9d2a2a !important;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .sig-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
          .sig-section {
            padding: 3rem 1rem !important;
          }
        }

        /* Mobile - 3 columns */
        @media (max-width: 640px) {
          .sig-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0.75rem;
          }
          .sig-header {
            margin-bottom: 1.5rem !important;
          }
          .sig-section {
            padding: 2rem 0.75rem !important;
          }
          .sig-line-bar {
            width: 40px !important;
          }
          .sig-card .sig-image-wrapper {
            margin-bottom: 0.5rem !important;
          }
          .sig-card .sig-category-name {
            font-size: 0.65rem !important;
            letter-spacing: 0.2em !important;
            text-align: center !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            max-width: 100% !important;
            padding: 0 0.25rem !important;
          }
          .sig-card .sig-overlay-text {
            font-size: 0.6rem !important;
            padding: 0 0.5rem !important;
          }
        }

        /* Small mobile */
        @media (max-width: 400px) {
          .sig-grid {
            gap: 0.5rem;
          }
          .sig-card .sig-category-name {
            font-size: 0.55rem !important;
            letter-spacing: 0.15em !important;
          }
        }

        /* Extra small devices */
        @media (max-width: 320px) {
          .sig-card .sig-category-name {
            font-size: 0.45rem !important;
            letter-spacing: 0.1em !important;
          }
        }
      `}</style>

      <section style={styles.section} className="sig-section">
        <div style={styles.container}>

          {/* ── Header with Maroon Accents ── */}
          <div style={styles.header} className="sig-header">
            {/* Decorative Line */}
            <div style={styles.decorLine}>
              <div style={styles.lineBar} className="sig-line-bar"></div>
              <div style={styles.diamond}></div>
              <div style={styles.lineBar} className="sig-line-bar"></div>
            </div>
            
            <h2 style={styles.title} className="sig-title">
              CELEBRATE YOUR SIGNATURE STYLE
            </h2>
            <p style={styles.subtitle}>
              Explore Pareenita's Most-Loved Categories
            </p>
          </div>

          {/* ── Category Grid ── */}
          <div style={styles.grid} className="sig-grid">
            {categories.map((cat: Category) => (
              <div
                key={cat.id}
                style={styles.card}
                className="sig-card"
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleNavigate(cat.href)}
                role="button"
                tabIndex={0}
                aria-label={`Shop ${cat.name}`}
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => handleKeyDown(e, cat.href)}
              >
                {/* Image */}
                <div style={styles.imageWrapper} className="sig-image-wrapper">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={styles.image}
                    className="sig-image"
                    loading="lazy"
                  />

                  {/* Hover overlay with maroon gradient */}
                  <div
                    style={{
                      ...styles.overlay,
                      opacity: hovered === cat.id ? 1 : 0,
                    }}
                    className="sig-overlay"
                  >
                    <p style={styles.overlayText} className="sig-overlay-text">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Category Name in Maroon */}
                <p style={styles.categoryName} className="sig-title sig-category-name">
                  {cat.name}
                </p>
                
                {/* Shop Now Button - Optional but adds interactivity */}
                <button 
                  style={styles.shopNowBtn}
                  className="sig-shop-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(cat.href);
                  }}
                >
                  SHOP NOW →
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}