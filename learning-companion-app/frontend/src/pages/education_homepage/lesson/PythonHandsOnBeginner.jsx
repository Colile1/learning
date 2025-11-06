import React, { useRef, useState, useEffect } from "react";
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

export default function PythonHandsOnBeginner() {
  const navigate = useNavigate();

  // Left TOC refs
  const sSetup = useRef(null);
  const sHello = useRef(null);
  const sVars = useRef(null);
  const sFlow = useRef(null);
  const sFuncs = useRef(null);
  const sLists = useRef(null);

  const jump = (ref) => ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Quiz state (2 MCQs)
  const [quiz, setQuiz] = useState({
    q1: "", // correct: "b"
    q2: "", // correct: "c"
  });

  // Code tasks (3 inputs)
  const [code, setCode] = useState({
    c1: "", // Hello World
    c2: "", // def add(a,b): return a + b
    c3: "", // loop summing [1,2,3,4] -> 10 and print
  });

  const [result, setResult] = useState(null);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      .toc a, .toc button { transition: color .15s ease }
      .toc button:hover { color: ${palette.primary}; }
      .assess input[type="radio"] { accent-color: ${palette.primary}; }
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const handleSubmitAll = () => {
    let score = 0;
    const notes = [];

    // Quiz marking
    if (quiz.q1 === "b") score += 1; else notes.push("Quiz 1 incorrect.");
    if (quiz.q2 === "c") score += 1; else notes.push("Quiz 2 incorrect.");

    // Code checks (string-based heuristics; no runtime)
    const norm = (s) => (s || "").replace(/\r/g, "").trim();

    // c1: Hello World -> must contain print("Hello, world!") or similar
    const c1 = norm(code.c1).toLowerCase();
    if (c1.includes("print(") && (c1.includes("hello, world") || c1.includes("hello world"))) score += 1;
    else notes.push("Code 1: Expect a print of Hello, world!");

    // c2: add function -> has def add( a , b ) and returns a + b
    const c2 = norm(code.c2);
    const okDef = /def\s+add\s*\(\s*a\s*,\s*b\s*\)\s*:/.test(c2);
    const okReturn = /return\s+a\s*\+\s*b/.test(c2);
    if (okDef && okReturn) score += 1;
    else notes.push("Code 2: Define add(a, b) and return a + b.");

    // c3: loop sum list -> detects list [1,2,3,4], a loop/ sum, and print 10
    const c3 = norm(code.c3).toLowerCase();
    const hasList = /\[\s*1\s*,\s*2\s*,\s*3\s*,\s*4\s*\]/.test(c3);
    const hasLoopOrSum = /(for\s+.in\s+|\bsum\s\()/.test(c3);
    const prints10 = /print\s*\(\s*10\s*\)/.test(c3) || /print\s*\(\s*sum\s*\(.\)\s\)/.test(c3);
    if (hasList && hasLoopOrSum && prints10) score += 1;
    else notes.push("Code 3: Sum [1,2,3,4] and print 10.");

    setResult({ score, total: 5, notes });
  };

  return (
    <div style={styles.wrap}>
      {/* Header */}
      <header style={styles.hero}>
        <div style={styles.heroInner}>
          <h1 style={styles.title}>Python · Hands-On Beginner</h1>
          <p style={styles.subtitle}>
            Learn by doing. Short theory, quick examples, and practical mini-tasks.
          </p>
        </div>
      </header>

      {/* Main grid: TOC left · content center · assessments right (sticky) */}
      <div style={styles.container}>
        {/* Left TOC */}
        <aside style={styles.toc} className="toc">
          <div style={styles.tocCard}>
            <h3 style={styles.tocTitle}>Table of Contents</h3>
            <ol style={styles.tocList}>
              <li><button style={styles.tocLink} onClick={() => jump(sSetup)}>1. Setup (fast)</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sHello)}>2. Hello World</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sVars)}>3. Variables</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sFlow)}>4. Control Flow</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sFuncs)}>5. Functions</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sLists)}>6. Lists</button></li>
            </ol>
            <div style={styles.tocActions}>
              <button style={styles.secondaryBtn} onClick={() => navigate(-1)}>Back</button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main style={styles.content}>
          {/* 1. Setup */}
          <section ref={sSetup} style={styles.section}>
            <h2 style={styles.h2}>1. Setup (fast)</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li>Install Python: <code>python --version</code> to verify</li>
                <li>Pick an editor (VS Code recommended); install Python extension</li>
              </ul>
              <p style={styles.p}><strong>Tip:</strong> In VS Code, open a folder → new file <code>main.py</code> → run.</p>
            </div>
          </section>

          {/* 2. Hello World */}
          <section ref={sHello} style={styles.section}>
            <h2 style={styles.h2}>2. Hello World</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>print("Hello, world!")</code></pre>
              <p style={styles.p}>Run it. If you see the text, you're set.</p>
            </div>
          </section>

          {/* 3. Variables */}
          <section ref={sVars} style={styles.section}>
            <h2 style={styles.h2}>3. Variables</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`name = "Mo"
age = 30
height = 1.75
is_student = False
print(name, age, height, is_student)`}</code></pre>
              <p style={styles.p}>Python infers types from values. Change values, rerun, observe outputs.</p>
            </div>
          </section>

          {/* 4. Control Flow */}
          <section ref={sFlow} style={styles.section}>
            <h2 style={styles.h2}>4. Control Flow</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`score = 72
if score >= 75:
  print("Distinction")
elif score >= 50:
  print("Pass")
else:
  print("Try again")`}</code></pre>
              <p style={styles.p}>Edit <code>score</code> and see how the output changes.</p>
            </div>
          </section>

          {/* 5. Functions */}
          <section ref={sFuncs} style={styles.section}>
            <h2 style={styles.h2}>5. Functions</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`def add(a, b):
  return a + b

print(add(2, 3))  // 5`}</code></pre>
              <p style={styles.p}>Define once, reuse anywhere. Try other numbers.</p>
            </div>
          </section>

          {/* 6. Lists */}
          <section ref={sLists} style={styles.section}>
            <h2 style={styles.h2}>6. Lists</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`nums = [1, 2, 3, 4]
total = 0
for n in nums:
  total += n
print(total)  // 10`}</code></pre>
              <p style={styles.p}><strong>Try:</strong> Use <code>sum(nums)</code> directly.</p>
            </div>
          </section>
        </main>

        {/* Right Assessments (sticky) */}
        <aside style={styles.assess} className="assess">
          <div style={styles.assessCard}>
            <h3 style={styles.assessTitle}>Assessments</h3>

            {/* Quiz 1 */}
            <div style={styles.block}>
              <div style={styles.blockTitle}>Quiz 1 — Basics</div>
              <p style={styles.p}><strong>Q1.</strong> What does <code>print()</code> do?</p>
              <label style={styles.radio}>
                <input
                  type="radio"
                  name="q1"
                  value="a"
                  checked={quiz.q1 === "a"}
                  onChange={(e) => setQuiz({ ...quiz, q1: e.target.value })}
                /> Saves data to a file
              </label>
              <label style={styles.radio}>
                <input
                  type="radio"
                  name="q1"
                  value="b"
                  checked={quiz.q1 === "b"}
                  onChange={(e) => setQuiz({ ...quiz, q1: e.target.value })}
                /> Displays output to the console
              </label>
              <label style={styles.radio}>
                <input
                  type="radio"
                  name="q1"
                  value="c"
                  checked={quiz.q1 === "c"}
                  onChange={(e) => setQuiz({ ...quiz, q1: e.target.value })}
                /> Declares a variable
              </label>
            </div>

            {/* Quiz 2 */}
            <div style={styles.block}>
              <div style={styles.blockTitle}>Quiz 2 — Functions</div>
              <p style={styles.p}><strong>Q2.</strong> Which defines a function?</p>
              <pre style={{ ...styles.pre, marginBottom: 8 }}><code>{`A) fn add(a,b) -> a + b
B) function add(a,b) { return a + b }
C) def add(a, b): return a + b`}</code></pre>
              <label style={styles.radio}>
                <input
                  type="radio"
                  name="q2"
                  value="a"
                  checked={quiz.q2 === "a"}
                  onChange={(e) => setQuiz({ ...quiz, q2: e.target.value })}
                /> A
              </label>
              <label style={styles.radio}>
                <input
                  type="radio"
                  name="q2"
                  value="b"
                  checked={quiz.q2 === "b"}
                  onChange={(e) => setQuiz({ ...quiz, q2: e.target.value })}
                /> B
              </label>
              <label style={styles.radio}>
                <input
                  type="radio"
                  name="q2"
                  value="c"
                  checked={quiz.q2 === "c"}
                  onChange={(e) => setQuiz({ ...quiz, q2: e.target.value })}
                /> C
              </label>
            </div>

            {/* Code 1 */}
            <div style={styles.block}>
              <div style={styles.blockTitle}>Code 1 — Hello</div>
              <p style={styles.p}>
                Write a program that prints <code>Hello, world!</code>
              </p>
              <textarea
                rows={5}
                style={styles.textarea}
                value={code.c1}
                onChange={(e) => setCode({ ...code, c1: e.target.value })}
                placeholder={`# type your code here
print("Hello, world!")`}
              />
            </div>

            {/* Code 2 */}
            <div style={styles.block}>
              <div style={styles.blockTitle}>Code 2 — add(a, b)</div>
              <p style={styles.p}>
                Define <code>add(a, b)</code> that returns their sum.
              </p>
              <textarea
                rows={6}
                style={styles.textarea}
                value={code.c2}
                onChange={(e) => setCode({ ...code, c2: e.target.value })}
                placeholder={`def add(a, b):
  return a + b`}
              />
            </div>

            {/* Code 3 */}
            <div style={styles.block}>
              <div style={styles.blockTitle}>Code 3 — Sum a list</div>
              <p style={styles.p}>
                Given <code>[1, 2, 3, 4]</code>, print the total (<code>10</code>) using a loop or <code>sum()</code>.
              </p>
              <textarea
                rows={7}
                style={styles.textarea}
                value={code.c3}
                onChange={(e) => setCode({ ...code, c3: e.target.value })}
                placeholder={`nums = [1, 2, 3, 4]
total = 0
for n in nums:
  total += n
print(total)  // 10`}
              />
            </div>

            {/* Submit */}
            <button style={styles.primaryBtn} onClick={handleSubmitAll}>Submit All</button>

            {/* Results */}
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
    gridTemplateColumns: "320px 1fr 380px", // TOC · content · assessments
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

  /* Assessments (right, sticky) */
  assess: { position: "sticky", top: 16, gridColumn: 3 },
  assessCard: {
    background: palette.white,
    border: `1px solid ${palette.cardBorder}`,
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  },
  assessTitle: { margin: "2px 0 10px", fontSize: "1.05rem", fontWeight: 800, color: palette.ink },

  block: {
    borderTop: `1px solid ${palette.cardBorder}`,
    paddingTop: 12,
    marginTop: 12,
  },
  blockTitle: {
    fontWeight: 800,
    color: palette.ink,
    marginBottom: 8,
  },
  radio: {
    display: "block",
    margin: "6px 0",
    color: palette.inkSubtle,
    lineHeight: 1.5,
  },
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