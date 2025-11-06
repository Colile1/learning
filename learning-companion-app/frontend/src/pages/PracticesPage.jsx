import { useEffect, useState } from "react";

export default function PracticesPage() {
  const [practices, setPractices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/practices")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch practices");
        return res.json();
      })
      .then(data => {
        setPractices(data);
        setError("");
      })
      .catch(err => {
        console.error(err);
        setError("Could not fetch practice tasks.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={styles.loading}>Loading practice tasks...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Best Practices For Coding</h1>
      {Object.entries(practices).map(([category, items]) => (
        <section key={category} style={styles.categorySection}>
          <h2 style={styles.categoryTitle}>{category}</h2>
          <div style={styles.practiceList}>
            {items.map(p => (
              <div key={p.id} style={styles.practiceCard}>
                <h3 style={styles.practiceName}>{p.name}</h3>
                <p style={styles.practiceDescription}>{p.description}</p>
                <p><strong>Example:</strong> {p.example}</p>
                <p><strong>Tip:</strong> {p.tip}</p>
                <p><strong>Level:</strong> {p.level}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  pageTitle: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: "2rem",
  },
  categorySection: { marginBottom: "3rem" },
  categoryTitle: {
    fontSize: "1.8rem",
    borderBottom: "2px solid #4f46e5",
    paddingBottom: "0.5rem",
    marginBottom: "1rem",
    color: "#4f46e5",
  },
  practiceList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  practiceCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "default",
  },
  practiceName: {
    fontSize: "1.4rem",
    color: "#0984e3",
    marginBottom: "0.5rem",
  },
  practiceDescription: { color: "#636e72", marginBottom: "0.5rem", lineHeight: "1.4" },
  loading: { textAlign: "center", fontSize: "1.5rem", color: "#4f46e5" },
  error: { textAlign: "center", fontSize: "1.5rem", color: "red" },
};
