import React from "react";

export default function LanguageLayout({ title, description, topics }) {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.desc}>{description}</p>
      </header>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>Key Learning Topics</h2>
        <ul style={styles.list}>
          {topics.map((t, i) => (
            <li key={i} style={styles.listItem}>{t}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const styles = {
  page: {
    padding: "2rem",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    marginBottom: "2rem",
  },
  title: { fontSize: "2.5rem", fontWeight: "800" },
  desc: { fontSize: "1.1rem", opacity: 0.9, marginTop: "0.5rem" },
  section: { maxWidth: "800px", margin: "0 auto" },
  subtitle: { fontSize: "1.5rem", marginBottom: "1rem" },
  list: { listStyle: "disc", marginLeft: "1.5rem" },
  listItem: { marginBottom: "0.5rem", fontSize: "1rem", color: "#374151" },
};