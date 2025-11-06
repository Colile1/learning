import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Profile() {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return setLoading(false);
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  if (loading) return <p style={styles.loading}>Loading profile...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.avatar}>{user.name ? user.name.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}</div>
        <h2 style={styles.title}>{user.name || user.username}</h2>
        <p style={styles.subTitle}>{user.role || "Student"}</p>
      </div>

      <div style={styles.card}>
        <ProfileField label="Full Name" value={user.name || user.username} />
        <ProfileField label="Email" value={user.email || "N/A"} />
        <ProfileField label="Role" value={user.role || "Student"} />
        <ProfileField
          label="Joined"
          value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
        />
        <ProfileField
          label="Last Login"
          value={user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}
        />
        <ProfileField
          label="Quizzes Completed"
          value={user.quizzesCompleted ?? 0}
        />
        <button style={styles.editBtn} onClick={() => alert("Edit profile coming soon!")}>
          ✏ Edit Profile
        </button>
      </div>
    </div>
  );
}

// Reusable profile field component
const ProfileField = ({ label, value }) => (
  <div style={styles.field}>
    <strong>{label}:</strong>
    <span>{value}</span>
  </div>
);

const styles = {
  container: {
    padding: "50px 20px",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "fadeIn 0.8s ease forwards",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6c5ce7, #00b894)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "3rem",
    margin: "0 auto 15px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    transition: "transform 0.3s ease",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#2d3436",
    margin: "0",
  },
  subTitle: {
    fontSize: "1rem",
    color: "#636e72",
    marginTop: "5px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
    padding: "35px 30px",
    maxWidth: "500px",
    width: "100%",
    textAlign: "left",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  field: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #dfe6e9",
    padding: "14px 0",
    fontSize: "1rem",
    color: "#2d3436",
  },
  editBtn: {
    marginTop: "25px",
    width: "100%",
    padding: "14px",
    backgroundColor: "#6c5ce7",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#6c5ce7",
  },
  error: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "red",
  },
};

// Add hover effects using inline style approach (JS trick)
styles.avatar[':hover'] = { transform: 'scale(1.1)' };
styles.card[':hover'] = { transform: 'scale(1.02)', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' };
styles.editBtn[':hover'] = { backgroundColor: "#341f97" };
