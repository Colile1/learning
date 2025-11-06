import React, { useRef, useEffect, useState } from "react";
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

export default function PythonInteractiveBeginner() {
  const navigate = useNavigate();

  // TOC refs
  const sOverview = useRef(null);
  const sNamesObjects = useRef(null);
  const sFlow = useRef(null);
  const sFunctions = useRef(null);
  const sLists = useRef(null);

  const jump = (ref) => ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      .toc a, .toc button { transition: color .15s ease }
      .toc button:hover { color: ${palette.primary}; }
      .interact input[type="radio"] { accent-color: ${palette.primary}; }
      .smallcode { white-space: pre-wrap; word-break: break-word; }
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  // ---------- Interactive State ----------
  // Quizzes (2)
  const [quiz, setQuiz] = useState({
    q1: "", // correct: b
    q2: "", // correct: a
  });

  // Code Drills (2)
  const [code, setCode] = useState({
    c1: "", // greet(name) -> print Hello, <name>!
    c2: "", // filter even numbers from [1..8]
  });

  // Challenge (1)
  const [challenge, setChallenge] = useState(
`# Build a tiny "grade" function:
# Input: score (0..100)
# Output (print only ONE): "Distinction" for >=75, "Pass" for >=50, else "Try again"
# Example: score=83 -> Distinction`
  );

  const [result, setResult] = useState(null);

  const onQuizChange = (key, val) => setQuiz((p) => ({ ...p, [key]: val }));
  const onCodeChange = (key, val) => setCode((p) => ({ ...p, [key]: val }));

  const normalize = (s) => (s || "").replace(/\r/g, "").trim();

  const handleSubmitAll = () => {
    let score = 0;
    const total = 5; // 2 quizzes + 2 code drills + 1 challenge
    const notes = [];

    // ---- Mark quizzes
    if (quiz.q1 === "b") score += 1; else notes.push("Quiz 1 incorrect.");
    if (quiz.q2 === "a") score += 1; else notes.push("Quiz 2 incorrect.");

    // ---- Code Drill 1: greet(name) -> prints Hello, <name>!
    // Looking for: def greet(name): ... print("Hello, " + name) or f"Hello, {name}"
    const c1 = normalize(code.c1);
    const hasDefGreet = /def\s+greet\s*\(\s*name\s*\)\s*:/.test(c1);
    const printsHello = /(print\s*\(\s*["']Hello[, ]\s*["']\s*\+\s*name\s*\))|(print\s*\(\s*f?["']Hello[, ]\s*\{?name\}?\s*["']\s*\))|print\s*\(\s*["']Hello,\s*\$\{name\}["']\s*\)/.test(c1);
    // Allow f-strings or concatenation loosely
    if (hasDefGreet && /print\s*\(/.test(c1) && /name/.test(c1)) {
      score += 1;
    } else {
      notes.push("Code Drill 1: Define greet(name) and print a hello using the name.");
    }

    // ---- Code Drill 2: even numbers from [1..8]
    // Accepts usage of list, loop or list comprehension, or filter, and prints only evens
    const c2 = normalize(code.c2).toLowerCase();
    const mentionsList = /\[\s*1\s*,\s*2\s*,\s*3\s*,\s*4\s*,\s*5\s*,\s*6\s*,\s*7\s*,\s*8\s*\]/.test(c2);
    const someEvenLogic = /(for\s+.in\s+|\bfilter\b|\blistcomp\b|\bif\s+.%\s*2\s*==\s*0\b|\bsum\s*\(|\[\s*.for.*in.\])/.test(c2);
    const printsEvens = /(print\s*\(.2.*4.*6.*8.\))|(\[2,\s*4,\s*6,\s*8\])/.test(c2);
    if (mentionsList && someEvenLogic && printsEvens) {
      score += 1;
    } else {
      notes.push("Code Drill 2: From [1..8], print only even numbers (2,4,6,8).");
    }

    // ---- Challenge: grade function
    const ch = normalize(challenge).toLowerCase();
    // Light rubric: looks for def, if/elif/else, three phrases, and a print
    const hasFunc = /def\s+grade\s*\(\s*score\s*\)\s*:/.test(ch);
    const hasBranches = /(if\s+.)|(elif\s+.)|(else\s*:)/.test(ch);
    const hasLabels = /(distinction|pass|try again)/.test(ch);
    const hasPrint = /print\s*\(/.test(ch);
    if (hasFunc && hasBranches && hasLabels && hasPrint) {
      score += 1;
    } else {
      notes.push("Challenge: Create grade(score) with if/elif/else and print one of: Distinction, Pass, Try again.");
    }

    setResult({ score, total, notes });
  };

  return (
    <div style={styles.wrap}>
      {/* Header */}
      <header style={styles.hero}>
        <div style={styles.heroInner}>
          <h1 style={styles.title}>Python · Interactive Beginner</h1>
          <p style={styles.subtitle}>
            Learn by exploring, answering, and typing. Short theory meets instant interaction.
          </p>
        </div>
      </header>

      {/* Grid: TOC · content · interactive panel */}
      <div style={styles.container}>
        {/* Left TOC */}
        <aside style={styles.toc} className="toc">
          <div style={styles.tocCard}>
            <h3 style={styles.tocTitle}>Table of Contents</h3>
            <ol style={styles.tocList}>
              <li><button style={styles.tocLink} onClick={() => jump(sOverview)}>1. Overview</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sNamesObjects)}>2. Names & Objects</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sFlow)}>3. Control Flow</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sFunctions)}>4. Functions</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sLists)}>5. Lists</button></li>
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
                Python lets you automate tasks, analyze data, and build apps quickly.
                This track mixes brief theory with interactive checks to reinforce learning.
              </p>
              <pre style={styles.pre}><code>print("Hello, interactive world!")</code></pre>
            </div>
          </section>

          {/* 2. Names & Objects */}
          <section ref={sNamesObjects} style={styles.section}>
            <h2 style={styles.h2}>2. Names & Objects</h2>
            <div style={styles.card}>
              <p style={styles.p}><strong>Objects</strong> hold values and types; <strong>names</strong> point to them.</p>
              <pre style={styles.pre}><code>{`a = 10      # 'a' points to an int object 10
b = a       # now 'b' points to the same object
a = a + 5   # 'a' points to a new object 15; 'b' still points to 10`}</code></pre>
              <p style={styles.p}>This explains why changing one name doesn't always change another.</p>
            </div>
          </section>

          {/* 3. Control Flow */}
          <section ref={sFlow} style={styles.section}>
            <h2 style={styles.h2}>3. Control Flow</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`score = 64
if score >= 75:
  print("Distinction")
elif score >= 50:
  print("Pass")
else:
  print("Try again")`}</code></pre>
              <p style={styles.p}>Adjust <code>score</code> to see different branches.</p>
            </div>
          </section>

          {/* 4. Functions */}
          <section ref={sFunctions} style={styles.section}>
            <h2 style={styles.h2}>4. Functions</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`def add(a, b):
  return a + b

print(add(4, 6))  # 10`}</code></pre>
              <p style={styles.p}>Functions package logic so you can reuse it easily.</p>
            </div>
          </section>

          {/* 5. Lists */}
          <section ref={sLists} style={styles.section}>
            <h2 style={styles.h2}>5. Lists</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`nums = [1, 2, 3, 4, 5]
print(len(nums))         # 5
print(nums[0], nums[-1]) # 1 5
print(sum(nums))         # 15`}</code></pre>
              <p style={styles.p}>Lists are ordered, mutable sequences of items.</p>
            </div>
          </section>
        </main>

        {/* Right Interactive Panel (sticky) */}
        <aside style={styles.right} className="interact" aria-label="Interactive Panel">
          <div style={styles.rightCard}>
            <h3 style={styles.rightTitle}>Interact</h3>

            {/* Quiz 1 */}
            <div style={styles.block}>
              <div style={styles.blockTitle}>Quiz 1 — Output</div>
              <p style={styles.p}><strong>Q1.</strong> What is printed by <code>print(2 + 3 * 2)</code>?</p>
              <label style={styles.radio}>
                <input type="radio" name="q1" value="a" checked={quiz.q1 === "a"} onChange={(e) => onQuizChange("q1", e.target.value)} /> 10
              </label>
              <label style={styles.radio}>
                <input type="radio" name="q1" value="b" checked={quiz.q1 === "b"} onChange={(e) => onQuizChange("q1", e.target.value)} /> 8
              </label>
              <label style={styles.radio}>
                <input type="radio" name="q1" value="c" checked={quiz.q1 === "c"} onChange={(e) => onQuizChange("q1", e.target.value)} /> 7
              </label>
              <p style={{ ...styles.p, fontSize: ".9rem" }} className="smallcode"># Multiplication has higher precedence than addition → 3*2=6 → 2+6=8</p>
            </div>

            {/* Quiz 2 */}
            <div style={styles.block}>
              <div style={styles.blockTitle}>Quiz 2 — Types</div>
              <p style={styles.p}><strong>Q2.</strong> What's the type of <code>len("abc")</code>?</p>
              <label style={styles.radio}>
                <input type="radio" name="q2" value="a" checked={quiz.q2 === "a"} onChange={(e) => onQuizChange("q2", e.target.value)} /> int
              </label>
              <label style={styles.radio}>
                <input type="radio" name="q2" value="b" checked={quiz.q2 === "b"} onChange={(e) => onQuizChange("q2", e.target.value)} /> str
              </label>
              <label style={styles.radio}>
                <input type="radio" name="q2" value="c" checked={quiz.q2 === "c"} onChange={(e) => onQuizChange("q2", e.target.value)} /> bool
              </label>
            </div>

            {/* Code Drill 1 */}
            <div style={styles.block}>
              <div style={styles.blockTitle}>Code Drill 1 — greet(name)</div>
              <p style={styles.p}>Define <code>greet(name)</code> that prints <code>Hello, &lt;name&gt;!</code></p>
              <textarea
                rows={6}
                style={styles.textarea}
                value={code.c1}
                onChange={(e) => onCodeChange("c1", e.target.value)}
                placeholder={`def greet(name):
  print(f"Hello, {name}!")`}
              />
            </div>

            {/* Code Drill 2 */}
            <div style={styles.block}>
              <div style={styles.blockTitle}>Code Drill 2 — Even numbers</div>
              <p style={styles.p}>From <code>[1,2,3,4,5,6,7,8]</code>, print <code>2,4,6,8</code> (any approach).</p>
              <textarea
                rows={6}
                style={styles.textarea}
                value={code.c2}
                onChange={(e) => onCodeChange("c2", e.target.value)}
                placeholder={`nums = [1,2,3,4,5,6,7,8]
evens = [n for n in nums if n % 2 == 0]
print(evens)  # [2, 4, 6, 8]`}
              />
            </div>

           {/* Challenge */}
<div style={styles.block}>
  <div style={styles.blockTitle}>Challenge — grade(score)</div>
  <p style={styles.p}>
    Create <code>grade(score)</code> that prints only one of: <em>Distinction</em> (&gt;=75),
    <em>Pass</em> (&gt;=50), or <em>Try again</em>.
  </p>
  <textarea
    rows={8}
    style={styles.textarea}
    value={challenge}
    onChange={(e) => setChallenge(e.target.value)}
  />
</div>

            {/* Submit & Results */}
            <button style={styles.primaryBtn} onClick={handleSubmitAll}>Submit All</button>

            {result && (
              <div style={{ ...styles.block, marginTop: 12 }}>
                <div style={styles.blockTitle}>Results</div>
                <p style={styles.p}><strong>Score:</strong> {result.score} / {result.total}</p>
                {result.notes.length > 0 && (
                  <>
                    <p style={styles.p}><strong>Feedback:</strong></p>
                    <ul style={styles.ul}>
                      {result.notes.map((n, i) => <li key={i}>{n}</li>)}
                    </ul>
                  </>
                )}
              </div>
            )}
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
    gridTemplateColumns: "320px 1fr 420px", // TOC · content · interact
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

  /* Right interactive panel */
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
  radio: { display: "block", margin: "6px 0", color: palette.inkSubtle, lineHeight: 1.5 },

  textarea: {
    width: "100%",
    borderRadius: 10,
    border: `1px solid ${palette.cardBorder}`,
    background: "#fff",
    padding: 10,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: ".95rem",
    outline: "none",
  },

  primaryBtn: {
    marginTop: 10,
    background: palette.primary,
    color: palette.white,
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 800,
    cursor: "pointer",
    width: "100%",
    boxShadow: "0 8px 20px rgba(63,70,229,.2)",
  },

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