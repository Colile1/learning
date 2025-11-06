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

export default function JavaTheoreticalBeginner() {
  const navigate = useNavigate();

  const sIntro = useRef(null);
  const sJDK = useRef(null);
  const sIDEs = useRef(null);
  const sHello = useRef(null);
  const sSyntax = useRef(null);
  const sComments = useRef(null);
  const sVariables = useRef(null);
  const sTypes = useRef(null);
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
          <h1 style={styles.title}>Java · Theoretical Beginner</h1>
          <p style={styles.subtitle}>
            Learn the Java platform, the JVM model, classes, types, control flow, and exceptions —
            with a theory-first foundation and clear examples.
          </p>
        </div>
      </header>

      <div style={styles.container}>
        <aside style={styles.toc} className="toc">
          <div style={styles.tocCard}>
            <h3 style={styles.tocTitle}>Table of Contents</h3>
            <ol style={styles.tocList}>
              <li><button style={styles.tocLink} onClick={() => jump(sIntro)}>1. Java Model & Basics</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sJDK)}>2. Install JDK</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sIDEs)}>3. IDEs/Editors</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sHello)}>4. First Program</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sSyntax)}>5. Classes & Blocks</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sComments)}>6. Comments</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sVariables)}>7. Variables</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sTypes)}>8. Primitives & Strings</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sStrings)}>9. String Methods</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sInput)}>10. Input (Scanner)</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sConditions)}>11. If Statements</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sLogical)}>12. Logical Operators</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sNested)}>13. Nested if</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sOperators)}>14. Operators</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sErrors)}>15. Exceptions</button></li>
              <li><button style={styles.tocLink} onClick={() => jump(sStyle)}>16. Style Basics</button></li>
            </ol>
            <div style={styles.tocActions}>
              <button style={styles.secondaryBtn} onClick={() => navigate(-1)}>Back</button>
            </div>
          </div>
        </aside>

        <main style={styles.content}>
          <section ref={sIntro} style={styles.section}>
            <h2 style={styles.h2}>1. Java Model & Basics</h2>
            <div style={styles.card}>
              <p style={styles.p}>
                Java code compiles to <strong>bytecode</strong> and runs on the <strong>JVM</strong>. It's
                object-oriented, strongly and statically typed.
              </p>
            </div>
          </section>

          <section ref={sJDK} style={styles.section}>
            <h2 style={styles.h2}>2. Install JDK</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li>Download JDK (Temurin, Oracle, etc.).</li>
                <li>Verify: <code>java -version</code> and <code>javac -version</code>.</li>
              </ul>
            </div>
          </section>

          <section ref={sIDEs} style={styles.section}>
            <h2 style={styles.h2}>3. IDEs/Editors</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li>IntelliJ IDEA (Community/Ultimate)</li>
                <li>VS Code (Java extensions)</li>
                <li>Eclipse</li>
              </ul>
            </div>
          </section>

          <section ref={sHello} style={styles.section}>
            <h2 style={styles.h2}>4. First Program</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, world!");
  }
}`}</code></pre>
              <p style={styles.p}>
                Compile: <code>javac Main.java</code> → Run: <code>java Main</code>
              </p>
            </div>
          </section>

          <section ref={sSyntax} style={styles.section}>
            <h2 style={styles.h2}>5. Classes & Blocks</h2>
            <div style={styles.card}>
              <p style={styles.p}>Code lives in classes. Blocks are delimited by braces <code>{`{}`}</code>.</p>
            </div>
          </section>

          <section ref={sComments} style={styles.section}>
            <h2 style={styles.h2}>6. Comments</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`// single-line
/* multi-line */
/** Javadoc style */`}</code></pre>
            </div>
          </section>

          <section ref={sVariables} style={styles.section}>
            <h2 style={styles.h2}>7. Variables</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`int age = 30;
double pi = 3.14;
boolean ok = true;
char grade = 'A';
String name = "Alice";`}</code></pre>
              <p style={styles.p}><strong>final</strong> makes a variable constant after assignment.</p>
            </div>
          </section>

          <section ref={sTypes} style={styles.section}>
            <h2 style={styles.h2}>8. Primitives & Strings</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li>Primitives: <code>byte short int long float double boolean char</code></li>
                <li>Reference types: <code>String</code>, arrays, classes, etc.</li>
              </ul>
            </div>
          </section>

          <section ref={sStrings} style={styles.section}>
            <h2 style={styles.h2}>9. String Methods</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`String s = "hello";
s.length();            // 5
s.toUpperCase();       // "HELLO"
s.contains("el");      // true
s.replace("h","y");    // "yello"`}</code></pre>
            </div>
          </section>

          <section ref={sInput} style={styles.section}>
            <h2 style={styles.h2}>10. Input (Scanner)</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Age? ");
    int age = sc.nextInt();
    System.out.println("You are " + age);
  }
}`}</code></pre>
            </div>
          </section>

          <section ref={sConditions} style={styles.section}>
            <h2 style={styles.h2}>11. If Statements</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`int a = 33, b = 200;
if (b > a) {
  System.out.println("b is greater");
} else if (a == b) {
  System.out.println("equal");
} else {
  System.out.println("a is greater");
}`}</code></pre>
            </div>
          </section>

          <section ref={sLogical} style={styles.section}>
            <h2 style={styles.h2}>12. Logical Operators</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`boolean x = true, y = false;
if (x && !y) { /* and/not */ }
if (x || y)  { /* or */ }`}</code></pre>
            </div>
          </section>

          <section ref={sNested} style={styles.section}>
            <h2 style={styles.h2}>13. Nested if</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`int n = 41;
if (n > 10) {
  System.out.print("Above ten, ");
  if (n > 20) System.out.println("and above 20!");
  else System.out.println("but not above 20.");
}`}</code></pre>
            </div>
          </section>

          <section ref={sOperators} style={styles.section}>
            <h2 style={styles.h2}>14. Operators</h2>
            <div style={styles.card}>
              <p style={styles.p}><strong>Arithmetic:</strong> <code>+ - * / %</code></p>
              <p style={styles.p}><strong>Comparison:</strong> <code>== != &lt; &gt; &lt;= &gt;=</code></p>
              <p style={styles.p}><strong>String compare:</strong> use <code>.equals()</code> not <code>==</code>.</p>
            </div>
          </section>

          <section ref={sErrors} style={styles.section}>
            <h2 style={styles.h2}>15. Exceptions</h2>
            <div style={styles.card}>
              <pre style={styles.pre}><code>{`try {
  int x = Integer.parseInt("abc");
} catch (NumberFormatException e) {
  System.out.println("Bad number");
}`}</code></pre>
            </div>
          </section>

          <section ref={sStyle} style={styles.section}>
            <h2 style={styles.h2}>16. Style Basics</h2>
            <div style={styles.card}>
              <ul style={styles.ul}>
                <li>Classes: <code>PascalCase</code>, methods/vars: <code>camelCase</code>.</li>
                <li>One public class per file, file name matches class name.</li>
                <li>Prefer descriptive names; 2–4 spaces indentation.</li>
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