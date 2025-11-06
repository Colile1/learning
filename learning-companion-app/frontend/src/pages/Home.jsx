// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaBug,
  FaProjectDiagram,
  FaTools,
  FaCode,
  FaCalendarDay,
  FaStar,
  FaLightbulb,
  FaRobot,
} from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  const educationCards = [
    { icon: <FaBook />, title: "Education", description: "Access curated learning materials and tutorials.", path: "/education" },
    { icon: <FaCode />, title: "Quizzes", description: "Test your knowledge with coding quizzes.", path: "/quizzes" },
    { icon: <FaLightbulb />, title: "Practices", description: "Explore best programming practices and methodologies.", path: "/practices" },
    { icon: <FaRobot />, title: "AI Tutor", description: "Ask coding questions and get AI-powered guidance.", path: "/ai-tutor" },
  ];

  const toolsCards = [
    { icon: <FaBug />, title: "Debug Tips", description: "Learn how to fix common coding errors.", path: "/debug-tips" },
    { icon: <FaCalendarDay />, title: "Daily Content", description: "Get fresh daily content to improve your skills.", path: "/daily-content" },
    { icon: <FaStar />, title: "Code Review", description: "Submit your code for feedback and suggestions.", path: "/code-review" },
    { icon: <FaProjectDiagram />, title: "Project Management", description: "Manage your learning projects efficiently.", path: "/project-management" },
    { icon: <FaTools />, title: "Tools", description: "Access development tools and utilities.", path: "/tools" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome to 4C Learning</h1>
        <p style={styles.subtitle}>
          Choose your next step and enhance your programming journey!
        </p>
      </div>

      {/* ===== Education & Learning Section ===== */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Education & Learning</h2>
        <div style={styles.grid}>
          {educationCards.map((card, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={() => navigate(card.path)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
            >
              <div style={styles.iconWrapper}>
                <div style={styles.icon}>{card.icon}</div>
              </div>
              <h3 style={styles.cardTitle}>{card.title}</h3>
              <p style={styles.cardDesc}>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Tools & Tips Section ===== */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}> Tools & Tips</h2>
        <div style={styles.grid}>
          {toolsCards.map((card, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={() => navigate(card.path)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
            >
              <div style={styles.iconWrapper}>
                <div style={styles.icon}>{card.icon}</div>
              </div>
              <h3 style={styles.cardTitle}>{card.title}</h3>
              <p style={styles.cardDesc}>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer style={styles.footer}>
        <div>
          <p style={styles.footerText}>
            © {new Date().getFullYear()} Learning Companion. All rights reserved.
          </p>
          <p style={styles.footerLinks}>
            <a href="/about" style={styles.footerLink}>About</a> ·{" "}
            <a href="/privacy" style={styles.footerLink}>Privacy</a> ·{" "}
            <a href="/contact" style={styles.footerLink}>Contact</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    padding: "60px 30px",
    textAlign: "center",
    background: "linear-gradient(135deg, #f8faff 0%, #eef2ff 100%)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    marginBottom: "40px",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "800",
    color: "#1e1e2f",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#555",
    fontSize: "1.1rem",
    fontWeight: "500",
  },
  section: {
    marginBottom: "60px",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#3f46e5",
    marginBottom: "25px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "30px",
    justifyContent: "center",
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "35px 25px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  },
  iconWrapper: {
    background: "linear-gradient(135deg, #3f46e5, #6b73ff)",
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 20px",
    boxShadow: "0 4px 10px rgba(63,70,229,0.3)",
  },
  icon: {
    fontSize: "2rem",
    color: "#fff",
  },
  cardTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#3f46e5",
    marginBottom: "10px",
  },
  cardDesc: {
    color: "#555",
    fontSize: "0.95rem",
    lineHeight: 1.6,
  },
  footer: {
    backgroundColor: "#fff",
    borderTop: "1px solid #e5e7eb",
    padding: "25px 10px",
    marginTop: "50px",
  },
  footerText: {
    color: "#555",
    fontSize: "0.9rem",
    marginBottom: "5px",
  },
  footerLinks: {
    fontSize: "0.9rem",
    color: "#3f46e5",
  },
  footerLink: {
    color: "#3f46e5",
    textDecoration: "none",
  },
};
