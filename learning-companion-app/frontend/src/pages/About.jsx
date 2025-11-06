import React from "react";

export default function About() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Learning Companion 📚</h1>
      <p style={styles.subtitle}>
        Learning Companion is your personal AI-powered study partner — designed to
        help you learn programming, manage projects, and stay organized.
      </p>

      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>💡 Our Mission</h2>
          <p style={styles.cardText}>
            To empower students and developers with an all-in-one learning hub that
            makes studying smarter, faster, and more enjoyable. We believe in
            accessible education powered by modern technology.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🚀 What We Offer</h2>
          <ul style={styles.list}>
            <li>Interactive quizzes to test your coding skills</li>
            <li>AI tutor for personalized learning support</li>
            <li>Educational content and daily tips</li>
            <li>Project management and code review tools</li>
            <li>Bookmarks and learning progress tracking</li>
          </ul>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🤝 Our Vision</h2>
          <p style={styles.cardText}>
            To become a trusted digital companion for learners and developers across
            the world — fostering creativity, collaboration, and continuous growth
            through technology.
          </p>
        </div>
      </div>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Learning Companion. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    color: "#3f37c9",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#555",
    marginBottom: "40px",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "25px",
    textAlign: "left",
  },
  cardTitle: {
    fontSize: "1.3rem",
    color: "#3f37c9",
    marginBottom: "10px",
  },
  cardText: {
    color: "#444",
    lineHeight: "1.6",
  },
  list: {
    color: "#444",
    lineHeight: "1.8",
    paddingLeft: "20px",
  },
  footer: {
    marginTop: "50px",
    color: "#777",
    fontSize: "0.9rem",
  },
};