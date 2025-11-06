import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* Palette aligned with #3f46e5 */
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

export default function PythonVisualBeginner() {
  const navigate = useNavigate();

  // TOC refs
  const sOverview = useRef(null);
  const sMentalModel = useRef(null);
  const sVariables = useRef(null);
  const sControl = useRef(null);
  const sFunctions = useRef(null);

  const jump = (ref) => ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      .toc a, .toc button { transition: color .15s ease }
      .toc button:hover { color: ${palette.primary}; }
      .yt-frame { width: 100%; aspect-ratio: 16 / 9; border: 0; border-radius: 12px; }
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  return (
    <div style={styles.wrap}>
      {/* Header */}
      <header style={styles.hero}>
        <div style={styles.heroInner}>
          <h1 style={styles.title}>Python · Visual Beginner</h1>
          <p style={styles.subtitle}>
            Learn Python with diagrams, mental models, and short examples. Watch, see, and then try.
          </p>
        </div>
      </header>

      {/* Grid: TOC · content · visual aids */}
      <div style={styles.container}>
        {/* Left TOC */}
        <aside style={styles.toc} className="toc">
          <div style={styles.tocCard}>
            <h3 style={styles.tocTitle}>Table of Contents</h3>
            <ol style={styles.tocList}>
              <li><button style={styles.tocLink} onClick={() => jump(sOverview)}>1. Overview</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sMentalModel)}>2. Python Mental Model</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sVariables)}>3. Variables (visual)</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sControl)}>4. Control Flow (flows)</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sFunctions)}>5. Functions (boxes & arrows)</button></li>
            </ol>
            <div style={styles.tocActions}>
              <button style={styles.secondaryBtn} onClick={() => navigate(-1)}>Back</button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={styles.content}>
          {/* 1. Overview */}
          <section ref={sOverview} style={styles.section}>
            <h2 style={styles.h2}>1. Overview</h2>
            <div style={styles.card}>
              <p style={styles.p}>
                Python helps you automate tasks, analyze data, and build apps — with clean, readable code.
                As a visual learner, you'll focus on how data and execution move through your program.
              </p>
              <pre style={styles.pre}><code>print("Hello, world!")  # first run</code></pre>
            </div>
          </section>

          {/* 2. Mental Model */}
          <section ref={sMentalModel} style={styles.section}>
            <h2 style={styles.h2}>2. Python Mental Model</h2>
            <div style={styles.card}>
              <p style={styles.p}><strong>Interpreter</strong> reads your file top-to-bottom and executes statements in order.</p>
              <div style={styles.diagram}>
                {`[ Source Code ]  →  [ Python Interpreter ]  →  [ Actions / Output ]`}
              </div>
              <ul style={styles.ul}>
                <li><strong>Objects:</strong> values with types (int, str, list…) stored in memory.</li>
                <li><strong>Names:</strong> labels that point to objects. Assignment binds names → objects.</li>
              </ul>
            </div>
          </section>

          {/* 3. Variables */}
          <section ref={sVariables} style={styles.section}>
            <h2 style={styles.h2}>3. Variables (visual)</h2>
            <div style={styles.card}>
              <p style={styles.p}>Think of variables as sticky notes pointing to values in memory.</p>
              <div style={styles.diagram}>
                {`name ──► "Mo"
age  ──► 30
pi   ──► 3.14`}
              </div>
              <pre style={styles.pre}><code>{`name = "Mo"
age = 30
pi = 3.14
print(name, age, pi)`}</code></pre>
              <p style={styles.p}><strong>Note:</strong> rebinding changes the arrow to point to a new object.</p>
            </div>
          </section>

          {/* 4. Control Flow */}
          <section ref={sControl} style={styles.section}>
            <h2 style={styles.h2}>4. Control Flow (decision flows)</h2>
            <div style={styles.card}>
              <div style={styles.diagram}>
                {`score ≥ 75?  ── yes ──► "Distinction"
       │
       no
       │
 score ≥ 50? ── yes ──► "Pass"
       │
       no ────────────► "Try again"`}
              </div>
              <pre style={styles.pre}><code>{`score = 72
if score >= 75:
  print("Distinction")
elif score >= 50:
  print("Pass")
else:
  print("Try again")`}</code></pre>
            </div>
          </section>

          {/* 5. Functions */}
          <section ref={sFunctions} style={styles.section}>
            <h2 style={styles.h2}>5. Functions (boxes & arrows)</h2>
            <div style={styles.card}>
              <div style={styles.diagram}>
                {`    a, b
     │ │
     ▼ ▼
  [ add ]  ──►  a + b  ──►  result`}
              </div>
              <pre style={styles.pre}><code>{`def add(a, b):
  return a + b

print(add(2, 3))  # 5`}</code></pre>
              <p style={styles.p}>Functions package logic into reusable boxes that take inputs and produce outputs.</p>
            </div>
          </section>
        </main>

        {/* Right Visual Aids (sticky) */}
        <aside style={styles.right} aria-label="Visual Aids">
          <div style={styles.rightCard}>
            <h3 style={styles.rightTitle}>Visual Aids</h3>

            {/* YouTube: Beginner-friendly Python intro (playable inline) */}
            <div style={styles.block}>
              <div style={styles.blockTitle}>Watch: Python for Beginners</div>
              <iframe
                className="yt-frame"
                title="Python for Beginners"
                src="https://www.youtube.com/embed/kqtD5dpn9C8"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <p style={styles.pSmall}>
                A concise visual introduction to Python fundamentals: variables, flow, and functions.
              </p>
            </div>

            {/* Extra visual card */}
            <div style={styles.block}>
              <div style={styles.blockTitle}>Cheat Sheet (mental cues)</div>
              <ul style={styles.ulSmall}>
                <li>Variables = names → objects</li>
                <li>Flow = decisions + repetition</li>
                <li>Functions = reusable logic</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* -------- Styles -------- */
const styles = {
  wrap: {
    minHeight: "100vh",
    background: palette.pageBg,
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  hero: {
    background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryLight} 80%)`,
    color: palette.white,
    boxShadow: "0 18px 40px rgba(63,70,229,0.25)",
  },
  heroInner: { maxWidth: 1320, margin: "0 auto", padding: "32px 20px 26px" },
  title: { margin: 0, fontSize: "2.1rem", fontWeight: 800 },
  subtitle: { margin: "10px 0 0", maxWidth: 980, lineHeight: 1.6, opacity: 0.95 },

  container: {
    maxWidth: 1320,
    margin: "18px auto 28px",
    padding: "0 16px",
    display: "grid",
    gridTemplateColumns: "320px 1fr 420px", // TOC · content · right aids
    gap: "20px",
    alignItems: "start",
  },

  /* TOC */
  toc: { position: "sticky", top: 16 },
  tocCard: {
    background: palette.white,
    border: `1px solid ${palette.cardBorder}`,
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  },
  tocTitle: { margin: "2px 0 10px", fontSize: "1.05rem", fontWeight: 800, color: palette.ink },
  tocList: {
    margin: 0,
    paddingLeft: "1.05rem",
    color: palette.inkSubtle,
    lineHeight: 1.7,
    fontSize: "1rem",
    maxHeight: "70vh",
    overflow: "auto",
  },
  tocLink: {
    background: "transparent",
    border: "none",
    padding: "2px 0",
    textAlign: "left",
    cursor: "pointer",
    color: palette.inkSubtle,
    fontSize: "0.98rem",
  },
  tocActions: { marginTop: 12, display: "flex", gap: 8 },

  /* Content */
  content: { minWidth: 0, gridColumn: 2 },
  section: { marginBottom: 20 },
  card: {
    background: palette.white,
    border: `1px solid ${palette.cardBorder}`,
    borderRadius: 16,
    padding: "14px 16px 16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  },
  h2: { margin: "0 0 10px", fontSize: "1.3rem", fontWeight: 800, color: palette.ink },
  p: { margin: "8px 0", color: palette.inkSubtle, lineHeight: 1.65 },
  ul: { margin: "6px 0 8px", paddingLeft: "1.1rem", color: palette.inkSubtle, lineHeight: 1.65 },
  pre: {
    background: palette.accentBg,
    padding: "10px",
    borderRadius: 8,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: ".95rem",
    lineHeight: 1.5,
  },
  diagram: {
    whiteSpace: "pre",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: ".95rem",
    background: palette.accentBg,
    border: `1px solid ${palette.cardBorder}`,
    borderRadius: 10,
    padding: "10px 12px",
    marginBottom: 10,
    color: palette.ink,
  },

  /* Right panel */
  right: { position: "sticky", top: 16, gridColumn: 3 },
  rightCard: {
    background: palette.white,
    border: `1px solid ${palette.cardBorder}`,
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  },
  rightTitle: { margin: "2px 0 10px", fontSize: "1.05rem", fontWeight: 800, color: palette.ink },
  block: { borderTop: `1px solid ${palette.cardBorder}`, paddingTop: 12, marginTop: 12 },
  blockTitle: { fontWeight: 800, color: palette.ink, marginBottom: 8 },
  pSmall: { color: palette.inkSubtle, fontSize: ".95rem", marginTop: 6 },
  ulSmall: { margin: 0, paddingLeft: "1.1rem", color: palette.inkSubtle, lineHeight: 1.6, fontSize: ".95rem" },

  secondaryBtn: {
    background: "#e5e7eb",
    color: "#111827",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
  },
};