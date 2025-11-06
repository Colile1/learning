import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ Added import

export default function EducationPage() {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/educationalcontent")
      .then((res) => res.json())
      .then((data) => {
        const uniqueLanguages = Array.from(new Set(data.map((item) => item.language)));
        setLanguages(uniqueLanguages);
      })
      .catch((err) => {
        console.error(err);
        setError("⚠ Could not fetch content.");
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleShowAll = () => setShowAll(!showAll);

  // ✅ Create URL-friendly routes
  const toSlug = (name) => {
    const lower = name.toLowerCase().trim();
    if (lower === "c++") return "cpp";
    if (lower === "c#") return "csharp";
    if (lower === "node.js") return "nodejs";
    return lower.replace(/\s+/g, "-");
  };

  const languageInfo = {
    JavaScript: {
      desc: "Build dynamic web apps and interactive user interfaces.",
      uses: ["Frontend Web Development", "Full Stack Development", "Mobile Apps (React Native)"],
    },
    Python: {
      desc: "Data science, AI, and backend development made simple.",
      uses: ["Data Science", "AI & Machine Learning", "Automation & Web Development"],
    },
    Java: {
      desc: "Enterprise applications and cross-platform solutions.",
      uses: ["Android Development", "Enterprise Systems", "Backend APIs"],
    },
    "C++": {
      desc: "High-performance systems and game development.",
      uses: ["Game Development", "Embedded Systems", "High-Speed Applications"],
    },
    HTML: {
      desc: "Structure and content foundation for the web.",
      uses: ["Web Design", "Frontend Development", "Email Templates"],
    },
    CSS: {
      desc: "Beautiful styling and responsive web design.",
      uses: ["UI/UX Design", "Responsive Layouts", "Frontend Animation"],
    },
    React: {
      desc: "Modern UI development with reusable components.",
      uses: ["Web Apps", "Dashboards", "Cross-Platform Apps"],
    },
    "Node.js": {
      desc: "Server-side JavaScript for scalable applications.",
      uses: ["APIs", "Microservices", "Real-Time Apps"],
    },
  };

  const displayedLanguages = showAll ? languages : languages.slice(0, 4);

  if (loading) return <p style={styles.loading}>Loading languages...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <p style={styles.supported}>SUPPORTED LANGUAGES</p>
        <h1 style={styles.mainTitle}>Learn the right language for your goals</h1>
        <p style={styles.subtitle}>
          Choose from our curated collection of programming languages and frameworks
        </p>
      </div>

      <div style={styles.grid}>
        {displayedLanguages.map((language) => {
          const info = languageInfo[language] || {
            desc: `Master ${language} programming with hands-on tutorials.`,
            uses: ["Software Development", "Problem Solving", "Career Growth"],
          };
          const slug = toSlug(language);

          return (
            <Link
              key={language}
              to={`/education/${slug}`} // ✅ Direct navigation
              style={styles.cardLink}
              className="edu-card-link"
            >
              <article style={styles.card} className="edu-card">
                <div style={styles.iconCircle}>{language[0]}</div>
                <h3 style={styles.languageName}>{language}</h3>
                <p style={styles.cardDescription}>{info.desc}</p>
                <ul style={styles.bulletList}>
                  {info.uses.map((use, i) => (
                    <li key={i} style={styles.bulletItem}>{use}</li>
                  ))}
                </ul>
                <p style={styles.explore}>Start Learning →</p>
              </article>
            </Link>
          );
        })}
      </div>

      {languages.length > 4 && (
        <button style={styles.viewAll} onClick={toggleShowAll}>
          {showAll ? "Show Less" : `View All ${languages.length} Languages →`}
        </button>
      )}

      {/* Card hover animation */}
      <style>{`
        .edu-card-link { text-decoration: none; color: inherit; }
        .edu-card-link:hover .edu-card {
          transform: translateY(-6px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#f9fafc",
    minHeight: "100vh",
    padding: "3rem 1.5rem 6rem",
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  supported: {
    color: "#635bff",
    fontWeight: 600,
    fontSize: "1rem",
    marginBottom: "0.5rem",
    letterSpacing: "1px",
  },
  mainTitle: {
    fontSize: "2.5rem",
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: "1rem",
  },
  subtitle: { fontSize: "1.1rem", color: "#6b7280" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "2rem",
    justifyItems: "stretch",
    alignItems: "start",        
    marginBottom: "4rem",       
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "2rem 1.5rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    textAlign: "left",
    transition: "all 0.3s ease",
    cursor: "pointer",
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",              // ✅ keep this so cards stay uniform
    position: "relative",        // ✅ ensures stacking context
    zIndex: 1,                   // ✅ prevents overlap above button
  },
  iconCircle: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#eef2ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    color: "#4f46e5",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  languageName: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "0.75rem",
  },
  cardDescription: {
    color: "#4b5563",
    fontSize: "0.95rem",
    lineHeight: "1.5",
    marginBottom: "0.75rem",
  },
  bulletList: {
    marginLeft: "1.25rem",
    marginBottom: "1.5rem",
    color: "#4b5563",
    fontSize: "0.9rem",
    listStyleType: "disc",
  },
  bulletItem: { marginBottom: "0.25rem" },
  explore: {
    color: "#2563eb",
    fontWeight: "600",
    fontSize: "0.95rem",
    marginTop: "auto",
  },
  viewAll: {
    display: "block",
    margin: "0 auto",
    backgroundColor: "#635bff",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "1rem 2.5rem",
    fontSize: "1.1rem",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(99,91,255,0.25)",
    transition: "all 0.3s ease",
    fontWeight: "600",
  },
  loading: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: "3rem",
    fontSize: "1.2rem",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "2rem",
    fontSize: "1.2rem",
  },
};