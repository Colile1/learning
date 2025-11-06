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

export default function CppTheoreticalBeginner() {
  const navigate = useNavigate();

  // TOC refs
  const sIntro = useRef(null);
  const sTooling = useRef(null);
  const sIDEs = useRef(null);
  const sHello = useRef(null);
  const sSyntax = useRef(null);
  const sComments = useRef(null);
  const sVariables = useRef(null);
  const sTypes = useRef(null);
  const sIO = useRef(null);
  const sConditions = useRef(null);
  const sLogical = useRef(null);
  const sNested = useRef(null);
  const sOperators = useRef(null);
  const sStrings = useRef(null);
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
          <h1 style={styles.title}>C++ · Theoretical Beginner</h1>
          <p style={styles.subtitle}>
            Understand the C++ model: compilation, types, control flow, and I/O. Learn theory first,
            then apply it with clean examples.
          </p>
        </div>
      </header>

      {/* Main layout (TOC left, content right) */}
      <div style={styles.container}>
        {/* TOC */}
        <aside style={styles.toc} className="toc">
          <div style={styles.tocCard}>
            <h3 style={styles.tocTitle}>Table of Contents</h3>
            <ol style={styles.tocList}>
              <li><button style={styles.tocLink} onClick={() => jump(sIntro)}>1. C++ Basics & Model</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sTooling)}>2. Compilers & Tooling</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sIDEs)}>3. IDEs/Editors</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sHello)}>4. First Program</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sSyntax)}>5. Braces & Indentation</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sComments)}>6. Comments</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sVariables)}>7. Variables</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sTypes)}>8. Basic Types</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sIO)}>9. Input/Output</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sConditions)}>10. If Statements</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sLogical)}>11. Logical Operators</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sNested)}>12. Nested if</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sOperators)}>13. Operators</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sStrings)}>14. std::string</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sErrors)}>15. Errors & Exceptions</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sStyle)}>16. Style Basics</button></li>
            </ol>
            <div style={styles.tocActions}>
              <button style={styles.secondaryBtn} onClick={() => navigate(-1)}>Back</button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main style={styles.content}>
          <section ref={sIntro} style={styles.section}>
            <h2 style={styles.h2}>1. C++ Basics & Model</h2>
            <div style={styles.card}>
              <p style={styles.p}>
                C++ is a compiled, multi-paradigm language used for performance-critical apps, games,
                systems, and embedded software. Source code → compiled into machine code by a compiler.
              </p>
            </div>
          </section>

          <section ref={sTooling} style={styles.section}>
            <h2 style={styles.h2}>2. Compilers & Tooling</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li><strong>Compilers:</strong> GCC, Clang, MSVC</li>
                <li><strong>Build tools:</strong> CMake, Make, Ninja</li>
              </ul>
              <p style={styles.p}><strong>Verify compiler:</strong> <code>g++ --version</code></p>
            </div>
          </section>

          <section ref={sIDEs} style={styles.section}>
            <h2 style={styles.h2}>3. IDEs/Editors</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li>VS Code (C/C++ extension)</li>
                <li>CLion / Visual Studio / Qt Creator</li>
              </ul>
            </div>
          </section>

          <section ref={sHello} style={styles.section}>
            <h2 style={styles.h2}>4. First Program</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`#include <iostream>
int main() {
  std::cout << "Hello, world!\\n";
  return 0;
}`}</code></pre>
              <p style={styles.p}>
                Build & run: <code>g++ main.cpp -o app && ./app</code> (Linux/macOS) or <code>app.exe</code> (Windows).
              </p>
            </div>
          </section>

          <section ref={sSyntax} style={styles.section}>
            <h2 style={styles.h2}>5. Braces & Indentation</h2>
            <div style={styles.card}>
              <p style={styles.p}>
                C++ uses <strong>braces</strong> <code>{`{}`}</code> to define blocks. Indentation is stylistic but critical
                for readability.
              </p>
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
            <h2 style={styles.h2}>7. Variables</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`int age = 30;
double pi = 3.14;
bool ok = true;
char grade = 'A';`}</code></pre>
              <p style={styles.p}><strong>Initialize</strong> your variables. Prefer <code>auto</code> when type is obvious.</p>
            </div>
          </section>

          <section ref={sTypes} style={styles.section}>
            <h2 style={styles.h2}>8. Basic Types</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li><code>int</code>, <code>long</code>, <code>float</code>, <code>double</code>, <code>bool</code>, <code>char</code></li>
                <li><code>std::string</code> (from <code>&lt;string&gt;</code>)</li>
              </ul>
              <pre style={styles.pre}><code>{`#include <string>
std::string name = "Alice";`}</code></pre>
            </div>
          </section>

          <section ref={sIO} style={styles.section}>
            <h2 style={styles.h2}>9. Input/Output</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`#include <iostream>
#include <string>
int main() {
  std::string name;
  std::cout << "Name? ";
  std::cin >> name;
  std::cout << "Hello, " << name << "\\n";
}`}</code></pre>
              <p style={styles.p}>Use <code>std::getline</code> for full-line input (with spaces).</p>
            </div>
          </section>

          <section ref={sConditions} style={styles.section}>
            <h2 style={styles.h2}>10. If Statements</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`int a = 33, b = 200;
if (b > a) {
  std::cout << "b is greater than a\\n";
} else if (a == b) {
  std::cout << "equal\\n";
} else {
  std::cout << "a is greater\\n";
}`}</code></pre>
            </div>
          </section>

          <section ref={sLogical} style={styles.section}>
            <h2 style={styles.h2}>11. Logical Operators</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`int a=200, b=33, c=500;
if (a > b && c > a) { /* and */ }
if (a > b || a > c) { /* or  */ }
if (!(a > b)) { /* not */ }`}</code></pre>
            </div>
          </section>

          <section ref={sNested} style={styles.section}>
            <h2 style={styles.h2}>12. Nested if</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`int x = 41;
if (x > 10) {
  std::cout << "Above ten,\\n";
  if (x > 20) std::cout << "and also above 20!\\n";
  else std::cout << "but not above 20.\\n";
}`}</code></pre>
            </div>
          </section>

          <section ref={sOperators} style={styles.section}>
            <h2 style={styles.h2}>13. Operators</h2>
            <div style={styles.card}>
              <p style={styles.p}><strong>Arithmetic:</strong> <code>+ - * / %</code></p>
              <p style={styles.p}><strong>Comparison:</strong> <code>== != &lt; &gt; &lt;= &gt;=</code></p>
              <p style={styles.p}><strong>Increment:</strong> <code>++</code>, <code>--</code></p>
            </div>
          </section>

          <section ref={sStrings} style={styles.section}>
            <h2 style={styles.h2}>14. std::string</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`#include <string>
std::string s = "hello";
s.size();             // length
s += " world";       // concat
s.find("lo");        // search`}</code></pre>
            </div>
          </section>

          <section ref={sErrors} style={styles.section}>
            <h2 style={styles.h2}>15. Errors & Exceptions</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`try {
  throw std::runtime_error("Oops");
} catch (const std::exception& e) {
  std::cerr << e.what() << "\\n";
}`}</code></pre>
            </div>
          </section>

          <section ref={sStyle} style={styles.section}>
            <h2 style={styles.h2}>16. Style Basics</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li>Prefer <code>std::</code> qualifiers over <code>using namespace std;</code> in headers.</li>
                <li>Use meaningful names; 2–4 spaces indentation; consistent brace style.</li>
                <li>Initialize variables; avoid uninitialized reads.</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* Styles */
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