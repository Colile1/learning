import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes, FaRobot, FaBrain, FaBolt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState(""); 

  const menuRef = useRef();
  const searchRef = useRef();
  const aiRef = useRef();
  const responseRef = useRef();

  // Close menu and search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      if (aiRef.current && !aiRef.current.contains(event.target)) {
        setAiAssistantOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-scroll to bottom when new response comes
  useEffect(() => {
    if (responseRef.current && aiResponse) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [aiResponse]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
  };

  const handleAiSubmit = async () => {
    if (!aiMessage.trim()) return;

    setIsLoading(true);
    setAiResponse("");
    setCurrentMode("deepthink");

    try {
      const response = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: aiMessage, mode: "deepthink" }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setAiResponse(data.reply);
      } else {
        setAiResponse("Error: " + (data.error || "Failed to get response"));
      }
    } catch (error) {
      setAiResponse("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFastAiSubmit = async () => {
    if (!aiMessage.trim()) return;

    setIsLoading(true);
    setAiResponse("");
    setCurrentMode("quick");

    try {
      const response = await fetch("http://localhost:5000/api/ai/chat/fast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: aiMessage, mode: "quick" }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setAiResponse(data.reply);
      } else {
        setAiResponse("Error: " + (data.error || "Failed to get response"));
      }
    } catch (error) {
      setAiResponse("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setAiMessage("");
    setAiResponse("");
    setCurrentMode("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleFastAiSubmit();
    }
  };

  const getModeDisplayName = () =>
    currentMode === "deepthink" ? "DeepThink" : "Quick Answer";
  const getModelName = () =>
    currentMode === "deepthink" ? "GPT-4o Mini" : "GPT-3.5 Turbo";

  return (
    <nav style={styles.nav}>
      {/* Logo and Navigation Links */}
      <div style={styles.leftSection}>
        <div style={styles.logo}>
          <span style={{ color: "#fff", marginRight: "6px" }}>{"</>"}</span>
          <span style={{ color: "#fff", fontWeight: "700" }}>4C</span>
          <span style={{ color: "#e5e7eb" }}> Learning</span>
        </div>

        {/* Navigation Links */}
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/quizzes" style={styles.link}>Quiz</Link>
          <Link to="/about" style={styles.link}>About</Link>
        </div>
      </div>

      {/* Right side buttons */}
      <div style={styles.rightButtons}>
        {/* AI Assistant */}
        <div style={styles.aiContainer} ref={aiRef}>
          <button
            style={styles.aiButton}
            onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
            title="AI Assistant"
          >
            <FaRobot style={styles.aiIcon} />
            AI Assistant
          </button>

          {aiAssistantOpen && (
            <div style={styles.aiPopup}>
              <div style={styles.aiPopupHeader}>
                <h3 style={styles.aiTitle}>AI Learning Assistant</h3>
                <button
                  onClick={() => setAiAssistantOpen(false)}
                  style={styles.closeButton}
                >
                  <FaTimes />
                </button>
              </div>

              <div style={styles.aiContent}>
                {/* Response */}
                {aiResponse && (
                  <div style={styles.responseSection}>
                    <div style={styles.responseHeader}>
                      <span style={styles.modeBadge}>
                        {getModeDisplayName()} • {getModelName()}
                      </span>
                    </div>
                    <div ref={responseRef} style={styles.responseContainer}>
                      <div style={styles.responseText}>{aiResponse}</div>
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div style={styles.inputSection}>
                  <div style={styles.inputContainer}>
                    <textarea
                      placeholder="Ask me anything about programming, learning, or coding concepts..."
                      value={aiMessage}
                      onChange={(e) => setAiMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      style={styles.aiInput}
                      rows="3"
                      disabled={isLoading}
                    />

                    <div style={styles.buttonContainer}>
                      <div style={styles.leftButtons}>
                        <button
                          onClick={clearChat}
                          style={styles.clearBtn}
                          disabled={isLoading}
                        >
                          Clear
                        </button>
                      </div>
                      <div style={styles.rightButtons}>
                        <button
                          onClick={handleAiSubmit}
                          style={{
                            ...styles.deepThinkBtn,
                            ...(isLoading && currentMode === "deepthink"
                              ? styles.loadingBtn
                              : {}),
                          }}
                          disabled={isLoading || !aiMessage.trim()}
                        >
                          {isLoading && currentMode === "deepthink" ? (
                            <>
                              <div style={styles.spinner}></div>
                              Thinking...
                            </>
                          ) : (
                            <>
                              <FaBrain style={styles.btnIcon} />
                              DeepThink
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleFastAiSubmit}
                          style={{
                            ...styles.enterBtn,
                            ...(isLoading && currentMode === "quick"
                              ? styles.loadingBtn
                              : {}),
                          }}
                          disabled={isLoading || !aiMessage.trim()}
                        >
                          {isLoading && currentMode === "quick" ? (
                            <>
                              <div style={styles.spinner}></div>
                              Thinking...
                            </>
                          ) : (
                            <>
                              <FaBolt style={styles.btnIcon} />
                              Enter
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div style={styles.modeInfo}>
                      <div style={styles.modeHint}>
                        <strong>DeepThink</strong> - Detailed answers with GPT-4o Mini
                      </div>
                      <div style={styles.modeHint}>
                        <strong>Enter</strong> - Quick answers with GPT-3.5 Turbo
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div style={styles.searchContainer} ref={searchRef}>
          <button
            style={styles.searchIconBtn}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            {searchOpen ? <FaTimes /> : <FaSearch />}
          </button>
          {searchOpen && (
            <div style={styles.searchBox}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                style={styles.searchInput}
              />
              <button onClick={handleSearch} style={styles.searchBtn}>
                Go
              </button>
            </div>
          )}
        </div>

        {/* User Menu */}
        {user && (
          <div style={styles.kebabMenuContainer} ref={menuRef}>
            <button
              style={styles.kebabButton}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ⋮
            </button>

            {menuOpen && (
              <div style={styles.dropdown}>
                <Link to="/profile" style={styles.dropdownItem}>
                  Profile
                </Link>
                <button onClick={handleLogout} style={styles.dropdownItemBtn}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

// --- Styles ---
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#4f46e5",
    padding: "10px 20px",
    borderRadius: "0 0 12px 12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    position: "relative",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "700",
  },
  links: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    background: "#6366f1",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  rightButtons: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  // AI Assistant Styles
  aiContainer: { position: "relative" },
  aiButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#10b981",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  },
  aiIcon: { fontSize: "16px" },
  aiPopup: {
    position: "absolute",
    top: "100%",
    right: 0,
    width: "600px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    zIndex: 1001,
    marginTop: "10px",
    border: "1px solid #e5e7eb",
    maxHeight: "70vh",
    display: "flex",
    flexDirection: "column",
  },
  aiPopupHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    borderBottom: "1px solid #e5e7eb",
    background: "#f8fafc",
    borderRadius: "12px 12px 0 0",
  },
  aiTitle: { margin: 0, color: "#1f2937", fontSize: "16px", fontWeight: "600" },
  closeButton: {
    background: "transparent",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    fontSize: "16px",
  },
  responseSection: {
    flex: 1,
    minHeight: "200px",
    borderBottom: "1px solid #e5e7eb",
  },
  responseHeader: {
    padding: "12px 20px",
    background: "#f8fafc",
    borderBottom: "1px solid #e5e7eb",
  },
  modeBadge: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#6b7280",
    background: "#e5e7eb",
    padding: "4px 8px",
    borderRadius: "4px",
  },
  responseContainer: {
    maxHeight: "calc(75vh - 200px)",
    overflowY: "auto",
    padding: "20px",
    background: "#f9fafb",
    border: "1px solid #4f46e5", 
    borderRadius: "8px", 
    margin: "15px", 
    boxSizing: "border-box", 
  },
  responseText: {
    color: "#374151",
    fontSize: "14px",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
  inputSection: {
    flexShrink: 0,
    background: "#fff",
  },
  inputContainer: {
    padding: "20px",
  },
  aiInput: {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    resize: "vertical",
    fontFamily: "inherit",
    marginBottom: "12px",
    minHeight: "80px",
    boxSizing: "border-box",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  leftButtons: {
    display: "flex",
    gap: "8px",
  },
  rightButtons: {
    display: "flex",
    gap: "8px",
  },
  deepThinkBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 16px",
    background: "#8b5cf6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.2s",
  },
  enterBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 20px",
    background: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.2s",
  },
  clearBtn: {
    padding: "10px 16px",
    background: "#6b7280",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  },
  loadingBtn: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  btnIcon: {
    fontSize: "14px",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid transparent",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  modeInfo: {
    padding: "8px 0",
  },
  modeHint: {
    fontSize: "11px",
    color: "#6b7280",
    marginBottom: "2px",
  },
  kebabMenuContainer: {
    position: "relative",
  },
  kebabButton: {
    fontSize: "24px",
    color: "#fff",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    marginLeft: "15px",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "100%",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    minWidth: "160px",
    zIndex: 1000,
    marginTop: "8px",
  },
  dropdownItem: {
    padding: "10px 15px",
    color: "#4f46e5",
    textDecoration: "none",
    background: "transparent",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    fontWeight: 500,
  },
  dropdownItemBtn: {
    padding: "10px 15px",
    color: "#4f46e5",
    background: "transparent",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    fontWeight: 500,
  },
  searchContainer: {
    position: "relative",
  },
  searchIconBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "18px",
  },
  searchBox: {
    position: "absolute",
    top: "100%",
    right: 0,
    background: "#fff",
    padding: "8px",
    borderRadius: "8px",
    marginTop: "6px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    display: "flex",
    gap: "6px",
  },
  searchInput: {
    flex: 1,
    padding: "6px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  searchBtn: {
    padding: "6px 12px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

// Spinner Animation
const spinnerStyle = document.createElement("style");
spinnerStyle.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerStyle);