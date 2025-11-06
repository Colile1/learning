import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

export default function JavascriptTheoreticalBeginner() {
  const navigate = useNavigate();

  const sIntro = useRef(null);
  const sRuntime = useRef(null);
  const sIDEs = useRef(null);
  const sHello = useRef(null);
  const sSyntax = useRef(null);
  const sComments = useRef(null);
  const sVariables = useRef(null);
  const sTypes = useRef(null);
  const sEquality = useRef(null);
  const sStrings = useRef(null);
  const sInput = useRef(null);
  const sConditions = useRef(null);
  const sLogical = useRef(null);
  const sNested = useRef(null);
  const sOperators = useRef(null);
  const sErrors = useRef(null);
  const sStyle = useRef(null);

  const jump = (ref) => ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .toc a, .toc button { transition: color .15s ease }
      .toc button:hover { color: ${palette.primary}; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={styles.wrap}>
      <header style={styles.hero}>
        <div style={styles.heroInner}>
          <h1 style={styles.title}>JavaScript · Theoretical Beginner</h1>
          <p style={styles.subtitle}>
            Learn the JS runtime model, variables, types, equality, control flow, and basic I/O —
            browser and Node fundamentals.
          </p>
        </div>
      </header>

      <div style={styles.container}>
        <aside style={styles.toc} className="toc">
          <div style={styles.tocCard}>
            <h3 style={styles.tocTitle}>Table of Contents</h3>
            <ol style={styles.tocList}>
              <li><button style={styles.tocLink} onClick={() => jump(sIntro)}>1. JS Basics</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sRuntime)}>2. Runtimes (Browser/Node)</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sIDEs)}>3. Editors & Tools</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sHello)}>4. First Program</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sSyntax)}>5. Blocks & Indentation</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sComments)}>6. Comments</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sVariables)}>7. let/const/var</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sTypes)}>8. Types & typeof</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sEquality)}>9. Equality (== vs ===)</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sStrings)}>10. Strings & Templates</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sInput)}>11. Input (prompt / readline)</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sConditions)}>12. If Statements</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sLogical)}>13. Logical Operators</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sNested)}>14. Nested if</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sOperators)}>15. Operators</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sErrors)}>16. Errors & try/catch</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sStyle)}>17. Style (ESLint/Prettier)</button></li>
            </ol>
            <div style={styles.tocActions}>
              <button style={styles.secondaryBtn} onClick={() => navigate(-1)}>Back</button>
            </div>
          </div>
        </aside>

        <main style={styles.content}>
          <section ref={sIntro} style={styles.section}>
            <h2 style={styles.h2}>1. JS Basics</h2>
            <div style={styles.card}>
              <p style={styles.p}>
                JavaScript runs in browsers and on servers (Node.js). It's dynamically typed and
                single-threaded with an event loop.
              </p>
            </div>
          </section>

          <section ref={sRuntime} style={styles.section}>
            <h2 style={styles.h2}>2. Runtimes (Browser/Node)</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li><strong>Browser:</strong> DOM, console, prompt</li>
                <li><strong>Node:</strong> console, filesystem, modules</li>
              </ul>
              <p style={styles.p}>Install Node: <code>node -v</code>, <code>npm -v</code></p>
            </div>
          </section>

          <section ref={sIDEs} style={styles.section}>
            <h2 style={styles.h2}>3. Editors & Tools</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li>VS Code (ESLint, Prettier)</li>
                <li>Browser DevTools console</li>
                <li>Node REPL</li>
              </ul>
            </div>
          </section>

          <section ref={sHello} style={styles.section}>
            <h2 style={styles.h2}>4. First Program</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>console.log("Hello, world!");</code></pre>
              <p style={styles.p}>Run in DevTools console or with Node: <code>node app.js</code></p>
            </div>
          </section>

          <section ref={sSyntax} style={styles.section}>
            <h2 style={styles.h2}>5. Blocks & Indentation</h2>
            <div style={styles.card}>
              <p style={styles.p}>Blocks use braces <code>{`{}`}</code>. Indentation is stylistic but key for readability.</p>
            </div>
          </section>

          <section ref={sComments} style={styles.section}>
            <h2 style={styles.h2}>6. Comments</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`// single-line
/* multi-line */`}</code></pre>
            </div>
          </section>

          <section ref={sVariables} style={styles.section}>
            <h2 style={styles.h2}>7. let / const / var</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li><code>const</code> for values that don't get reassigned</li>
                <li><code>let</code> for block-scoped variables</li>
                <li><code>var</code> (function-scoped) — avoid in modern code</li>
              </ul>
              <pre style={styles.pre}><code>{`const pi = 3.14;
let count = 0;`}</code></pre>
            </div>
          </section>

          <section ref={sTypes} style={styles.section}>
            <h2 style={styles.h2}>8. Types & typeof</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li>Primitives: <code>number</code>, <code>string</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, <code>bigint</code>, <code>symbol</code></li>
                <li>Objects: arrays, functions, plain objects</li>
              </ul>
              <pre style={styles.pre}><code>{`typeof 42            // "number"
typeof "hi"         // "string"
typeof null         // "object" (quirk)
Array.isArray([])   // true`}</code></pre>
            </div>
          </section>

          <section ref={sEquality} style={styles.section}>
            <h2 style={styles.h2}>9. Equality: == vs ===</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`0 == false   // true  (coercion)
0 === false  // false (no coercion)
"2" + 2      // "22"
"2" - 1      // 1`}</code></pre>
              <p style={styles.p}><strong>Prefer</strong> <code>===</code> and <code>!==</code> for predictable behavior.</p>
            </div>
          </section>

          <section ref={sStrings} style={styles.section}>
            <h2 style={styles.h2}>10. Strings & Template Literals</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`const name = "Alice";
name.toUpperCase();         // "ALICE"
"  hi  ".trim();            // "hi"
\`Hello, \${name}!\`;        // "Hello, Alice!"`}</code></pre>
            </div>
          </section>

          <section ref={sInput} style={styles.section}>
            <h2 style={styles.h2}>11. Input</h2>
            <div style={styles.card}>
              <p style={styles.p}><strong>Browser:</strong> <code>prompt("Age?")</code></p>
              <pre style={styles.pre}><code>{`const age = Number(prompt("Age?"));
console.log(\`You are \${age}\`);`}</code></pre>
              <p style={styles.p}><strong>Node:</strong> <code>readline</code> module or third-party libs.</p>
            </div>
          </section>

          <section ref={sConditions} style={styles.section}>
            <h2 style={styles.h2}>12. If Statements</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`const a = 33, b = 200;
if (b > a) {
  console.log("b is greater");
} else if (a === b) {
  console.log("equal");
} else {
  console.log("a is greater");
}`}</code></pre>
            </div>
          </section>

          <section ref={sLogical} style={styles.section}>
            <h2 style={styles.h2}>13. Logical Operators</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`const x = true, y = false;
if (x && !y) { /* and/not */ }
if (x || y)  { /* or */ }`}</code></pre>
            </div>
          </section>

          <section ref={sNested} style={styles.section}>
            <h2 style={styles.h2}>14. Nested if</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`const n = 41;
if (n > 10) {
  console.log("Above ten,");
  if (n > 20) console.log("and also above 20!");
  else console.log("but not above 20.");
}`}</code></pre>
            </div>
          </section>

          <section ref={sOperators} style={styles.section}>
            <h2 style={styles.h2}>15. Operators</h2>
            <div style={styles.card}>
              <p style={styles.p}><strong>Arithmetic:</strong> <code>+ - * / % **</code></p>
              <p style={styles.p}><strong>Comparison:</strong> <code>== != === !== &lt; &gt; &lt;= &gt;=</code></p>
            </div>
          </section>

          <section ref={sErrors} style={styles.section}>
            <h2 style={styles.h2}>16. Errors & try/catch</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`try {
  JSON.parse("{bad json}");
} catch (e) {
  console.error("Parse error:", e.message);
}`}</code></pre>
            </div>
          </section>

          <section ref={sStyle} style={styles.section}>
            <h2 style={styles.h2}>17. Style (ESLint/Prettier)</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li>Use <code>const</code>/<code>let</code>, avoid <code>var</code>.</li>
                <li>Prefer <code>===</code>/<code>!==</code>.</li>
                <li>Lint with ESLint; format with Prettier.</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const styles = {
  wrap: { minHeight: "100vh", background: palette.pageBg, fontFamily: "'Segoe UI', system-ui, sans-serif", overflowX: "hidden" },
  hero: { background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primaryLight} 80%)`, color: palette.white, boxShadow: "0 18px 40px rgba(63,70,229,0.25)" },
  heroInner: { maxWidth: 1320, margin: "0 auto", padding: "32px 20px 26px" },
  title: { margin: 0, fontSize: "2.1rem", fontWeight: 800 },
  subtitle: { margin: "10px 0 0", maxWidth: 980, lineHeight: 1.6, opacity: 0.95 },

  container: { maxWidth: 1320, margin: "18px auto 0", padding: "0 16px 32px", display: "grid", gridTemplateColumns: "320px 1fr", gap: "20px" },
  toc: { position: "sticky", top: 16, alignSelf: "start", height: "fit-content" },
  tocCard: { background: palette.white, border: `1px solid ${palette.cardBorder}`, borderRadius: 16, padding: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" },
  tocTitle: { margin: "2px 0 10px", fontSize: "1.05rem", fontWeight: 800, color: palette.ink },
  tocList: { margin: 0, paddingLeft: "1.05rem", color: palette.inkSubtle, lineHeight: 1.7, fontSize: "1rem", maxHeight: "70vh", overflow: "auto" },
  tocLink: { background: "transparent", border: "none", padding: "2px 0", textAlign: "left", cursor: "pointer", color: palette.inkSubtle, fontSize: "0.98rem" },
  tocActions: { marginTop: 12, display: "flex", gap: 8 },

  content: { minWidth: 0 },
  section: { marginBottom: 20 },
  card: { background: palette.white, border: `1px solid ${palette.cardBorder}`, borderRadius: 16, padding: "14px 16px 16px", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" },
  h2: { margin: "0 0 10px", fontSize: "1.3rem", fontWeight: 800, color: palette.ink },
  h3: { margin: "12px 0 6px", fontSize: "1.06rem", fontWeight: 800, color: palette.ink },
  p: { margin: "8px 0", color: palette.inkSubtle, lineHeight: 1.65 },
  ul: { margin: "6px 0 8px", paddingLeft: "1.1rem", color: palette.inkSubtle, lineHeight: 1.65 },
  pre: { margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: ".95rem", lineHeight: 1.5, color: palette.ink },
};