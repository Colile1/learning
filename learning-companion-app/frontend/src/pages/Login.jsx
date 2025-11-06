import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", {
        usernameOrEmail,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      console.error("Login Failed:", err);
      alert(err.response?.data?.message || "Login failed. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    try {
      const res = await api.post("/auth/forgot-password", { email: resetEmail });
      alert(res.data.message || "Password reset link sent to your email!");
      setForgotPasswordOpen(false);
      setResetEmail("");
    } catch (err) {
      console.error("Forgot Password Error:", err);
      alert(err.response?.data?.message || "Error sending reset email.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back 👋</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <div style={{ textAlign: "right", marginBottom: "10px" }}>
            <button
              type="button"
              onClick={() => setForgotPasswordOpen(true)}
              style={styles.forgotLink}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p style={styles.text}>
          New here?{" "}
          <Link to="/register" style={styles.link}>
            Create an account
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={{ marginBottom: "1rem" }}>Reset Password</h2>
            <form onSubmit={handleForgotPassword} style={styles.form}>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                style={styles.input}
                required
              />
              <button type="submit" style={styles.button} disabled={resetLoading}>
                {resetLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
            <button
              onClick={() => setForgotPasswordOpen(false)}
              style={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const styles = {
  container: {
    minHeight: "100vh",
    background: "#e5e7eb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "35px",
    borderRadius: "15px",
    width: "360px",
    textAlign: "center",
    boxShadow: "0px 6px 16px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "25px",
    color: "#1f2937",
    fontWeight: "700",
    fontSize: "26px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    fontSize: "15px",
    border: "1px solid #cbd5e1",
    outline: "none",
  },
  button: {
    padding: "12px",
    background: "#4f46e5",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  text: {
    fontSize: "14px",
    marginTop: "12px",
  },
  link: {
    color: "#4f46e5",
    fontWeight: "600",
    textDecoration: "none",
  },
  forgotLink: {
    color: "#4f46e5",
    fontSize: "14px",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontWeight: "500",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    width: "350px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  closeButton: {
    marginTop: "1rem",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};