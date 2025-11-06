// src/pages/education/JavaScriptPage.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* 🎨 Palette aligned with #3f46e5 */
const palette = {
  primary: "#3f46e5",
  primaryLight: "#6366f1",
  primarySoft: "#818cf8",
  primaryDark: "#312e81",
  accentBg: "#eef2ff",
  ink: "#0f172a",
  inkSubtle: "#475569",
  cardBorder: "#e2e8f0",
  pageBg: "#f8fafc",
  white: "#ffffff",
};

/** Accessible modal for "Coming soon" */
function ComingSoonModal({ open, onClose, title = "Coming soon" }) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cs-title"
      style={modalStyles.backdrop}
      onClick={onClose}
    >
      <div style={modalStyles.sheet} onClick={(e) => e.stopPropagation()}>
        <h3 id="cs-title" style={modalStyles.title}>{title}</h3>
        <p style={modalStyles.body}>We're crafting this level now. Check back soon!</p>
        <button autoFocus onClick={onClose} style={modalStyles.btn}>OK</button>
      </div>
    </div>
  );
}

export default function JavaScriptPage() {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [soonOpen, setSoonOpen] = useState(false);

  /* Keep topics similar across styles (tailored to JS) */
  const sharedTopics = {
    beginner: [
      "let/const, Types & Coercion",
      "Control Flow (if/for/while)",
      "Functions (params, return)",
      "Arrays & Objects",
      "Intro to DOM & Events",
    ],
    intermediate: [
      "Classes & Prototypes",
      "Modules (import/export) & NPM",
      "Errors & Testing (Jest)",
      "Fetch/HTTP & JSON",
      "Tooling (ESLint, Prettier)",
    ],
    advanced: [
      "Async/Await & Promises",
      "Performance & Profiling",
      "Bundling & Deploy (Vite/Webpack)",
      "Design Patterns",
      "Best Practices",
    ],
  };

  const catalog = useMemo(
    () => ({
      visual: {
        label: "Visual Learner",
        levels: {
          beginner: {
            title: "Beginner · Visual (JS)",
            eta: "~4–6 hours",
            topics: sharedTopics.beginner,
            route: "/education_homepage/lesson/javascript-visual-beginner",
          },
          intermediate: {
            title: "Intermediate · Visual (JS)",
            eta: "~8–10 hours",
            topics: sharedTopics.intermediate,
          },
          advanced: {
            title: "Advanced · Visual (JS)",
            eta: "~12–15 hours",
            topics: sharedTopics.advanced,
          },
        },
      },
      hands_on: {
        label: "Hands-On Learner",
        levels: {
          beginner: {
            title: "Beginner · Hands-On (JS)",
            eta: "~5–7 hours",
            topics: sharedTopics.beginner,
            route: "/education_homepage/lesson/javascript-hands-on-beginner",
          },
          intermediate: {
            title: "Intermediate · Hands-On (JS)",
            eta: "~9–12 hours",
            topics: sharedTopics.intermediate,
          },
          advanced: {
            title: "Advanced · Hands-On (JS)",
            eta: "~14–18 hours",
            topics: sharedTopics.advanced,
          },
        },
      },
      theoretical: {
        label: "Theoretical Learner",
        levels: {
          beginner: {
            title: "Beginner · Theory (JS)",
            eta: "~4–6 hours",
            topics: sharedTopics.beginner,
            route: "/education_homepage/lesson/javascript-theoretical-beginner",
          },
          intermediate: {
            title: "Intermediate · Theory (JS)",
            eta: "~8–10 hours",
            topics: sharedTopics.intermediate,
          },
          advanced: {
            title: "Advanced · Theory (JS)",
            eta: "~12–16 hours",
            topics: sharedTopics.advanced,
          },
        },
      },
      interactive: {
        label: "Interactive Learner",
        levels: {
          beginner: {
            title: "Beginner · Interactive (JS)",
            eta: "~4–6 hours",
            topics: sharedTopics.beginner,
            route: "/education_homepage/lesson/javascript-interactive-beginner",
          },
          intermediate: {
            title: "Intermediate · Interactive (JS)",
            eta: "~8–10 hours",
            topics: sharedTopics.intermediate,
          },
          advanced: {
            title: "Advanced · Interactive (JS)",
            eta: "~12–14 hours",
            topics: sharedTopics.advanced,
          },
        },
      },
    }),
    []
  );

  const styleOptions = [
    { key: "visual", title: "Visual Learner", text: "Learn through diagrams and flowcharts" },
    { key: "hands_on", title: "Hands-On Learner", text: "Practice coding interactively" },
    { key: "theoretical", title: "Theoretical Learner", text: "Explore deep conceptual knowledge" },
    { key: "interactive", title: "Interactive Learner", text: "Engage with quizzes and games" },
  ];

  const handleStyleClick = (styleKey) => {
    setSelectedStyle(styleKey);
    requestAnimationFrame(() =>
      document.getElementById("levels-section")?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  const handleLevelClick = (styleKey, levelKey) => {
    const lvl = catalog[styleKey].levels[levelKey];
    if (levelKey === "beginner" && lvl?.route) navigate(lvl.route);
    else setSoonOpen(true);
  };

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      .click-card:focus-visible { outline: 3px solid rgba(99,102,241,0.6); outline-offset: 2px; }
      .click-card:hover { transform: translateY(-4px); box-shadow: 0 14px 28px rgba(63,70,229,.2); }
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const selectedMeta = selectedStyle ? catalog[selectedStyle] : null;

  return (
    <div style={styles.page}>
      <header style={styles.hero}>
        <h1 style={styles.title}>Master JavaScript</h1>
        <p style={styles.subtitle}>
          Modern JavaScript from fundamentals to advanced patterns — tailored to your learning style,
          with practical projects and clear mental models.
        </p>
        <div style={styles.badgeRow}>
          <span style={styles.badge}>30 Structured Lessons</span>
          <span style={styles.badge}>AI Tutor Support</span>
          <span style={styles.badge}>4 Learning Paths</span>
          <span style={styles.badge}>Hands-On Practice</span>
        </div>
      </header>

      {/* Learning Style Cards */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Choose Your Learning Style</h2>
        <p style={styles.sectionSub}>Pick the path that matches how you like to learn.</p>

        <div style={styles.styleGrid}>
          {styleOptions.map((opt) => (
            <button
              key={opt.key}
              className="click-card"
              type="button"
              aria-pressed={selectedStyle === opt.key}
              onClick={() => handleStyleClick(opt.key)}
              style={{
                ...styles.styleCard,
                ...(selectedStyle === opt.key ? styles.styleCardActive : null),
              }}
            >
              <h3 style={styles.styleTitle}>{opt.title}</h3>
              <p style={styles.styleText}>{opt.text}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Levels */}
      {selectedMeta && (
        <section id="levels-section" style={{ ...styles.section, marginTop: "1.5rem" }}>
          <h2 style={styles.sectionTitle}>Your {selectedMeta.label} Path</h2>
          <p style={styles.sectionSub}>Beginner opens a lesson; Intermediate & Advanced are coming soon.</p>

          <div style={styles.levelGrid}>
            {["beginner", "intermediate", "advanced"].map((lvlKey) => {
              const lvl = selectedMeta.levels[lvlKey];
              return (
                <button
                  key={lvlKey}
                  className="click-card"
                  type="button"
                  onClick={() => handleLevelClick(selectedStyle, lvlKey)}
                  style={styles.levelCard}
                  aria-label={`${lvlKey} card`}
                >
                  <div style={styles.levelHeader}>
                    <span style={styles.levelBadge}>
                      {lvlKey === "beginner"
                        ? "Beginner"
                        : lvlKey === "intermediate"
                        ? "Intermediate"
                        : "Advanced"}
                    </span>
                    <span style={styles.levelEta}>{lvl.eta}</span>
                  </div>

                  <h3 style={styles.levelTitle}>{lvl.title}</h3>
                  <ul style={styles.topicList}>
                    {lvl.topics.map((t) => (
                      <li key={t} style={styles.topicItem}>{t}</li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <ComingSoonModal open={soonOpen} onClose={() => setSoonOpen(false)} />
    </div>
  );
}

/* ------------- Styles ------------- */
const styles = {
  page: {
    minHeight: "100vh",
    background: palette.pageBg,
    paddingBottom: "4rem",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  hero: {
    background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryLight} 80%)`,
    color: palette.white,
    padding: "4rem 1.5rem 3rem",
    textAlign: "center",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    boxShadow: "0 18px 40px rgba(63,70,229,0.25)",
  },
  title: { fontSize: "2.6rem", fontWeight: 800, margin: 0, marginBottom: "0.75rem" },
  subtitle: {
    maxWidth: 880,
    margin: "0 auto",
    opacity: 0.95,
    lineHeight: 1.6,
    fontSize: "1.05rem",
  },
  badgeRow: {
    marginTop: "1.5rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
  },
  badge: {
    background: "rgba(255,255,255,0.16)",
    border: "1px solid rgba(255,255,255,0.35)",
    color: palette.white,
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: "0.9rem",
    backdropFilter: "blur(4px)",
  },
  section: { maxWidth: 1150, margin: "2.5rem auto 0", padding: "0 1.25rem" },
  sectionTitle: { fontSize: "1.6rem", fontWeight: 800, color: palette.ink, marginBottom: "0.35rem" },
  sectionSub: { color: palette.inkSubtle, marginBottom: "1.25rem" },

  styleGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" },
  styleCard: {
    background: palette.primary,
    color: palette.white,
    borderRadius: 18,
    padding: "22px 20px",
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    transition: "transform .2s ease, box-shadow .2s ease",
    border: "1px solid rgba(255,255,255,0.28)",
    cursor: "pointer",
  },
  styleCardActive: { background: palette.primarySoft, boxShadow: "0 12px 28px rgba(63,70,229,.25)" },
  styleTitle: { margin: 0, marginBottom: 8, fontSize: "1.15rem", fontWeight: 800 },
  styleText: { margin: 0, lineHeight: 1.6, opacity: 0.98 },

  levelGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px" },
  levelCard: {
    background: palette.white,
    color: palette.ink,
    borderRadius: 18,
    padding: "18px 18px 20px",
    textAlign: "left",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    transition: "transform .2s ease, box-shadow .2s ease",
    border: `1px solid ${palette.cardBorder}`,
    cursor: "pointer",
  },
  levelHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  levelBadge: {
    background: palette.accentBg,
    color: palette.primaryDark,
    border: `1px solid ${palette.primarySoft}`,
    padding: "6px 10px",
    borderRadius: 999,
    fontWeight: 800,
    fontSize: ".8rem",
  },
  levelEta: { color: palette.inkSubtle, fontWeight: 700, fontSize: ".85rem" },
  levelTitle: { fontSize: "1.15rem", fontWeight: 800, margin: "4px 0 8px", color: palette.ink },
  topicList: {
    margin: "8px 0 0",
    paddingLeft: "1.1rem",
    color: palette.inkSubtle,
    lineHeight: 1.6,
    fontSize: ".95rem",
  },
  topicItem: { marginBottom: 4 },
};

/* Modal styles */
const modalStyles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.55)",
    display: "grid",
    placeItems: "center",
    zIndex: 40,
    padding: "1rem",
  },
  sheet: {
    background: palette.white,
    borderRadius: 16,
    padding: "1.25rem 1.25rem 1rem",
    width: "min(420px, 92vw)",
    boxShadow: "0 20px 50px rgba(0,0,0,.25)",
    border: `1px solid ${palette.cardBorder}`,
  },
  title: { margin: 0, fontSize: "1.15rem", fontWeight: 800, color: palette.ink },
  body: { marginTop: 8, color: palette.inkSubtle },
  btn: {
    marginTop: 14,
    background: palette.primaryLight,
    color: palette.white,
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(63,70,229,0.25)",
  },
};