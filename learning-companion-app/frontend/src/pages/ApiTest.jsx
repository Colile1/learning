import { useEffect, useState } from "react";

function ApiTest() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/hello") // 👈 backend route
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setMessage(data.message);
        setError("");
      })
      .catch((err) => {
        console.error("API error:", err);
        setError("⚠️ Backend not reachable. Please check server.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const styles = {
    container: {
      padding: "2rem",
      fontFamily: "Arial, sans-serif",
      maxWidth: "700px",
      margin: "2rem auto",
      backgroundColor: "#f3f4f6",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    },
    title: {
      fontSize: "2rem",
      textAlign: "center",
      color: "#1f2937",
      marginBottom: "1.5rem",
    },
    message: {
      padding: "1rem",
      borderRadius: "8px",
      backgroundColor: "#e0f2fe",
      color: "#0369a1",
      fontWeight: "bold",
      textAlign: "center",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    },
    loading: {
      padding: "1rem",
      textAlign: "center",
      color: "#6366f1",
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
    error: {
      padding: "1rem",
      textAlign: "center",
      color: "#dc2626",
      fontWeight: "bold",
      backgroundColor: "#fee2e2",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>API Test Page</h1>

      {loading && <p style={styles.loading}>Loading...</p>}
      {!loading && error && <p style={styles.error}>{error}</p>}
      {!loading && !error && <p style={styles.message}>{message}</p>}
    </div>
  );
}

export default ApiTest;
