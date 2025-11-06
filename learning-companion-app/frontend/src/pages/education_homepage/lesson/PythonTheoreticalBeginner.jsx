// src/pages/educationhomepage/lesson/PythonTheoreticalBeginner.jsx
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

export default function PythonTheoreticalBeginner() {
  const navigate = useNavigate();

  const sections = {
    sIntro: useRef(null),
    sInstall: useRef(null),
    sIDEs: useRef(null),
    sHello: useRef(null),
    sSyntax: useRef(null),
    sComments: useRef(null),
    sVariables: useRef(null),
    sTypes: useRef(null),
    sTypeLen: useRef(null),
    sConditions: useRef(null),
    sLogical: useRef(null),
    sNested: useRef(null),
    sPass: useRef(null),
    sOperators: useRef(null),
    sStrings: useRef(null),
    sInput: useRef(null),
    sErrors: useRef(null),
    sStyle: useRef(null),
  };

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
          <h1 style={styles.title}>Python · Theoretical Beginner</h1>
          <p style={styles.subtitle}>
            Learn the foundations of Python — what it is, how it works, and its core syntax,
            variables, data types, and control flow — with clear examples and theory.
          </p>
        </div>
      </header>

      <div style={styles.container}>
        {/* Left TOC */}
        <aside style={styles.toc} className="toc">
          <div style={styles.tocCard}>
            <h3 style={styles.tocTitle}>Table of Contents</h3>
            <ol style={styles.tocList}>
              {Object.entries({
                "1. Python Basics & Syntax": "sIntro",
                "2. Install Python": "sInstall",
                "3. Choose an IDE/Editor": "sIDEs",
                "4. First Program": "sHello",
                "5. Indentation": "sSyntax",
                "6. Comments": "sComments",
                "7. Variables": "sVariables",
                "8. Basic Data Types": "sTypes",
                "9. type() & len()": "sTypeLen",
                "10. If Statements": "sConditions",
                "11. Logical Operators": "sLogical",
                "12. Nested if": "sNested",
                "13. pass Statement": "sPass",
                "14. Operators & Expressions": "sOperators",
                "15. Strings & Methods": "sStrings",
                "16. Input, Casting & f-strings": "sInput",
                "17. Errors & Exceptions": "sErrors",
                "18. Style (PEP 8) Basics": "sStyle",
              }).map(([label, key]) => (
                <li key={key}>
                  <button style={styles.tocLink} onClick={() => jump(sections[key])}>
                    {label}
                  </button>
                </li>
              ))}
            </ol>
            <div style={styles.tocActions}>
              <button style={styles.secondaryBtn} onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </div>
        </aside>

        {/* === Main Content === */}
        <main style={styles.content}>
          {/* 1 */}
          <section ref={sections.sIntro} style={styles.section}>
            <h2 style={styles.h2}>1. Python Basics & Syntax</h2>
            <div style={styles.card}>
              <p style={styles.p}>
                Python is a versatile programming language used for web development, automation,
                data analysis, AI, and more. It’s beginner-friendly, readable, and powerful.
              </p>
              <h3 style={styles.h3}>Why Python?</h3>
              <ul style={styles.ul}>
                <li>Works on Windows, Mac, Linux, and Raspberry Pi</li>
                <li>Has simple, English-like syntax</li>
                <li>Runs immediately via interpreter — no compilation</li>
                <li>Can be procedural, object-oriented, or functional</li>
              </ul>
              <h3 style={styles.h3}>Common Uses</h3>
              <ul style={styles.ul}>
                <li>Data analysis and machine learning</li>
                <li>Web development</li>
                <li>Automation or scripting</li>
                <li>Software testing and prototyping</li>
              </ul>
            </div>
          </section>

          {/* 2 */}
          <section ref={sections.sInstall} style={styles.section}>
            <h2 style={styles.h2}>2. Install Python</h2>
            <div style={styles.card}>
              <ol style={styles.ul}>
                <li>Visit <a href="https://www.python.org/downloads/">python.org/downloads</a></li>
                <li>Click “Download Python” (auto-detects your OS)</li>
                <li>
                  Run the installer. On Windows, <strong>check “Add Python to PATH”</strong> before installing.
                </li>
              </ol>
              <pre style={styles.pre}><code>python --version</code></pre>
              <p style={styles.p}>Use the above command in terminal to confirm installation.</p>
            </div>
          </section>

          {/* 3 */}
          <section ref={sections.sIDEs} style={styles.section}>
            <h2 style={styles.h2}>3. Choose an IDE / Editor</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li><strong>IDLE</strong> – Comes with Python, great for beginners.</li>
                <li><strong>VS Code</strong> – Highly recommended; install Python extension.</li>
                <li><strong>PyCharm</strong> – Professional-grade IDE for Python.</li>
                <li>
                  <strong>Jupyter Notebooks</strong> – Ideal for data science; get via{" "}
                  <a href="https://www.anaconda.com/products/distribution">Anaconda</a>.
                </li>
              </ul>
            </div>
          </section>

          {/* 4 */}
          <section ref={sections.sHello} style={styles.section}>
            <h2 style={styles.h2}>4. First Program</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>print("Hello, world!")</code></pre>
              <p style={styles.p}>
                This prints “Hello, world!” to your screen — your first line of Python code.
              </p>
            </div>
          </section>

          {/* 5 */}
          <section ref={sections.sSyntax} style={styles.section}>
            <h2 style={styles.h2}>5. Indentation</h2>
            <div style={styles.card}>
              <p style={styles.p}>
                Python uses indentation (spaces) to define code blocks — not braces or keywords.
              </p>
              <pre style={styles.pre}><code>{`if 5 > 2:
print("Five is greater than two!")  # ❌ Missing indentation`}</code></pre>
              <pre style={styles.pre}><code>{`if 5 > 2:
    print("Five is greater than two!")  # ✅ Correct`}</code></pre>
            </div>
          </section>

          {/* 6 */}
          <section ref={sections.sComments} style={styles.section}>
            <h2 style={styles.h2}>6. Comments</h2>
            <div style={styles.card}>
              <p style={styles.p}>Use comments to describe your code.</p>
              <pre style={styles.pre}><code># This is a single-line comment</code></pre>
              <pre style={styles.pre}><code>{`"""
This is a multi-line comment
"""`}</code></pre>
            </div>
          </section>

          {/* 7 */}
          <section ref={sections.sVariables} style={styles.section}>
            <h2 style={styles.h2}>7. Variables</h2>
            <div style={styles.card}>
              <p style={styles.p}>
                Variables store data values. Created when you assign a value using =.
              </p>
              <pre style={styles.pre}><code>{`x = 5
y = "John"
z = 3.14`}</code></pre>
              <p style={styles.p}>Python automatically determines the variable type.</p>
            </div>
          </section>

          {/* 8 */}
          <section ref={sections.sTypes} style={styles.section}>
            <h2 style={styles.h2}>8. Basic Data Types</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li><strong>int</strong> – Whole numbers (10, -3)</li>
                <li><strong>float</strong> – Decimals (3.14, -0.5)</li>
                <li><strong>str</strong> – Strings ("hello")</li>
                <li><strong>bool</strong> – Boolean (True/False)</li>
              </ul>
              <p style={styles.p}>
                Python is dynamically typed — types change based on assigned value.
              </p>
            </div>
          </section>

          {/* 9 */}
          <section ref={sections.sTypeLen} style={styles.section}>
            <h2 style={styles.h2}>9. type() & len()</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`x = 5
print(type(x))   # Shows type of x
print(len("Hello"))  # Returns 5`}</code></pre>
              <p style={styles.p}>
                <code>type()</code> shows the data type, <code>len()</code> shows sequence length.
              </p>
            </div>
          </section>

          {/* 10 */}
          <section ref={sections.sConditions} style={styles.section}>
            <h2 style={styles.h2}>10. If Statements</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`a = 33
b = 200
if b > a:
    print("b is greater than a")`}</code></pre>
              <p style={styles.p}>Use <code>if</code>, <code>elif</code>, and <code>else</code> for conditions.</p>
            </div>
          </section>

          {/* 11 */}
          <section ref={sections.sLogical} style={styles.section}>
            <h2 style={styles.h2}>11. Logical Operators</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`a, b, c = 200, 33, 500
if a > b and c > a:
    print("Both conditions are True")`}</code></pre>
              <pre style={styles.pre}><code>{`if a > b or a > c:
    print("At least one condition is True")`}</code></pre>
              <pre style={styles.pre}><code>{`if not a > b:
    print("a is NOT greater than b")`}</code></pre>
            </div>
          </section>

          {/* 12 */}
          <section ref={sections.sNested} style={styles.section}>
            <h2 style={styles.h2}>12. Nested if</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`x = 41
if x > 10:
    print("Above ten,")
    if x > 20:
        print("and also above 20!")
    else:
        print("but not above 20.")`}</code></pre>
            </div>
          </section>

          {/* 13 */}
          <section ref={sections.sPass} style={styles.section}>
            <h2 style={styles.h2}>13. pass Statement</h2>
            <div style={styles.card}>
              <p style={styles.p}>
                <code>pass</code> lets you write placeholder code without causing an error.
              </p>
              <pre style={styles.pre}><code>{`a = 33
b = 200

if b > a:
    pass  # Placeholder block`}</code></pre>
            </div>
          </section>

          {/* 14 */}
          <section ref={sections.sOperators} style={styles.section}>
            <h2 style={styles.h2}>14. Operators & Expressions</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`x, y = 5, 2
print(x + y)  # Addition
print(x - y)  # Subtraction
print(x * y)  # Multiplication
print(x / y)  # Division`}</code></pre>
            </div>
          </section>

          {/* 15 */}
          <section ref={sections.sStrings} style={styles.section}>
            <h2 style={styles.h2}>15. Strings & Methods</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`name = "Python"
print(name.upper())
print(name.lower())
print(len(name))
print(name.replace("Py", "My"))`}</code></pre>
            </div>
          </section>

          {/* 16 */}
          <section ref={sections.sInput} style={styles.section}>
            <h2 style={styles.h2}>16. Input, Casting & f-strings</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`name = input("Enter your name: ")
age = int(input("Enter your age: "))
print(f"Hello {name}, you are {age} years old.")`}</code></pre>
              <p style={styles.p}>
                <strong>f-strings</strong> allow variables inside strings for easy formatting.
              </p>
            </div>
          </section>

          {/* 17 */}
          <section ref={sections.sErrors} style={styles.section}>
            <h2 style={styles.h2}>17. Errors & Exceptions</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`try:
    x = int("hello")
except ValueError:
    print("Conversion failed!")`}</code></pre>
              <p style={styles.p}>Use <code>try/except</code> blocks to handle runtime errors safely.</p>
            </div>
          </section>

          {/* 18 */}
          <section ref={sections.sStyle} style={styles.section}>
            <h2 style={styles.h2}>18. Style (PEP 8) Basics</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li>Use 4 spaces per indentation level</li>
                <li>Keep function names lowercase_with_underscores</li>
                <li>Leave 2 blank lines between functions</li>
                <li>Limit lines to 79 characters</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const styles = {
  wrap: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', system-ui, sans-serif" },
  hero: {
    background: `linear-gradient(135deg, #3f46e5 0%, #6366f1 80%)`,
    color: "#fff",
    boxShadow: "0 18px 40px rgba(63,70,229,0.25)",
  },
  heroInner: { maxWidth: 1320, margin: "0 auto", padding: "32px 20px 26px" },
  title: { margin: 0, fontSize: "2.2rem", fontWeight: 800 },
  subtitle: { margin: "10px 0 0", maxWidth: 920, lineHeight: 1.6, opacity: 0.95 },
  container: {
    maxWidth: 1320,
    margin: "18px auto 0",
    padding: "0 16px 32px",
    display: "grid",
    gridTemplateColumns: "320px 1fr",
    gap: "20px",
  },
  toc: { position: "sticky", top: 16, alignSelf: "start" },
  tocCard: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  },
  tocTitle: { margin: "2px 0 10px", fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" },
  tocList: { margin: 0, paddingLeft: "1.05rem", color: "#475569", lineHeight: 1.7, fontSize: "1rem" },
  tocLink: {
    background: "transparent",
    border: "none",
    padding: "2px 0",
    textAlign: "left",
    cursor: "pointer",
    color: "#475569",
  },
  tocActions: { marginTop: 12, display: "flex", gap: 8 },
  content: { minWidth: 0 },
  section: { marginBottom: 20 },
  card: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: "14px 16px 16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  },
  h2: { margin: "0 0 10px", fontSize: "1.3rem", fontWeight: 800, color: "#0f172a" },
  h3: { margin: "12px 0 6px", fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" },
  p: { margin: "8px 0", color: "#475569", lineHeight: 1.65 },
  ul: { margin: "6px 0 8px", paddingLeft: "1.1rem", color: "#475569", lineHeight: 1.6 },
  pre: {
    background: "#eef2ff",
    padding: "10px",
    borderRadius: 8,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
    fontSize: ".95rem",
    lineHeight: 1.5,
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
