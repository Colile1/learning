import { useEffect, useState } from "react";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/bookmarks")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setBookmarks(data);
        setError("");
      })
      .catch((err) => {
        console.error("API error:", err);
        setError("⚠️ Could not fetch bookmarks. Please check the backend.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>My Bookmarks</h1>

      {loading && <p style={styles.loading}>Loading bookmarks...</p>}
      {!loading && error && <p style={styles.error}>{error}</p>}

      {!loading && !error && bookmarks.length === 0 && (
        <p style={styles.empty}>No bookmarks found.</p>
      )}

      {!loading && !error && bookmarks.length > 0 && (
        <div style={styles.grid}>
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} style={styles.card}>
              <h3 style={styles.title}>{bookmark.title}</h3>
              <p style={styles.category}>Category: {bookmark.category}</p>
              <p style={styles.description}>{bookmark.description}</p>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                Visit Website →
              </a>
            </div>
          ))}
        </div>
      )}
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
  loading: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#4f46e5",
  },
  error: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "red",
    fontWeight: "bold",
  },
  empty: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#636e72",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  title: {
    fontSize: "1.4rem",
    color: "#0984e3",
    marginBottom: "0.5rem",
  },
  category: {
    fontSize: "0.95rem",
    fontWeight: "bold",
    color: "#636e72",
    marginBottom: "0.5rem",
  },
  description: {
    color: "#636e72",
    marginBottom: "0.5rem",
    lineHeight: "1.4",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block",
    marginTop: "0.5rem",
  },
};
