import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRobot, FaUser, FaPaperPlane, FaBrain, FaBolt, FaCopy, FaCheck } from "react-icons/fa";

export default function AITutor() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState("quick");
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAskAI = async () => {
    if (!prompt.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: prompt,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    const currentPrompt = prompt;
    setPrompt("");

    try {
      const endpoint = currentMode === "deep" 
        ? "http://localhost:5000/api/ai/chat" 
        : "http://localhost:5000/api/ai/chat/fast";

      const res = await axios.post(endpoint, { 
        message: currentPrompt,
        mode: currentMode 
      });
      
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: res.data.reply || res.data.answer || "No response content",
        timestamp: new Date().toLocaleTimeString(),
        mode: currentMode,
        model: currentMode === "deep" ? "GPT-4o Mini" : "GPT-3.5 Turbo"
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error("API Error:", err);
      const errorMessage = {
        id: Date.now() + 1,
        type: "error",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskAI();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const copyToClipboard = async (content, messageId) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatContainer}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <FaRobot style={styles.headerIcon} />
            <div>
              <h1 style={styles.title}>4C learning AI</h1>
              <p style={styles.subtitle}>Ask me anything about programming</p>
            </div>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.modeSelector}>
              <button
                onClick={() => setCurrentMode("quick")}
                style={{
                  ...styles.modeButton,
                  ...(currentMode === "quick" ? styles.modeButtonActive : {})
                }}
              >
                <FaBolt style={styles.modeIcon} />
                Quick
              </button>
              <button
                onClick={() => setCurrentMode("deep")}
                style={{
                  ...styles.modeButton,
                  ...(currentMode === "deep" ? styles.modeButtonActive : {})
                }}
              >
                <FaBrain style={styles.modeIcon} />
                DeepThink
              </button>
            </div>
            {messages.length > 0 && (
              <button onClick={clearChat} style={styles.clearButton}>
                Clear Chat
              </button>
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <div style={styles.messagesContainer}>
          {messages.length === 0 && (
            <div style={styles.welcomeMessage}>
              <div style={styles.welcomeIcon}>
                <FaRobot />
              </div>
              <h2 style={styles.welcomeTitle}>Welcome to AI Tutor!</h2>
              <p style={styles.welcomeText}>
                I'm here to help you with programming concepts, coding problems, 
                and learning guidance.
              </p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                ...styles.message,
                ...(message.type === "user" ? styles.userMessage : 
                    message.type === "error" ? styles.errorMessage : styles.aiMessage)
              }}
            >
              <div style={styles.messageHeader}>
                <div style={{
                  ...styles.messageAvatar,
                  ...(message.type === "user" ? styles.userAvatar : styles.aiAvatar)
                }}>
                  {message.type === "user" ? <FaUser /> : <FaRobot />}
                </div>
                <div style={styles.messageInfo}>
                  <span style={styles.messageSender}>
                    {message.type === "user" ? "You" : 
                     message.type === "error" ? "Error" : "AI Assistant"}
                  </span>
                  {message.type === "ai" && (
                    <span style={styles.messageModel}>
                      {message.mode === "deep" ? "DeepThink" : "Quick Answer"} • {message.model}
                    </span>
                  )}
                  <span style={styles.messageTime}>{message.timestamp}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(message.content, message.id)}
                  style={styles.copyButton}
                  title="Copy to clipboard"
                >
                  {copiedMessageId === message.id ? <FaCheck /> : <FaCopy />}
                </button>
              </div>
              <div style={{
                ...styles.messageContent,
                ...(message.type === "user" ? styles.userMessageContent : {})
              }}>
                {message.content}
              </div>
            </div>
          ))}
          
          {loading && (
            <div style={styles.thinkingIndicator}>
              <div style={styles.thinkingAvatar}>
                <FaRobot />
              </div>
              <div style={styles.thinkingContent}>
                <div style={styles.thinkingText}>
                  {currentMode === "deep" ? "Deep thinking..." : "Thinking..."}
                </div>
                <div style={styles.thinkingDots}>
                  <span style={styles.thinkingDot}></span>
                  <span style={styles.thinkingDot}></span>
                  <span style={styles.thinkingDot}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={styles.inputContainer}>
          <div style={styles.inputWrapper}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask a question... (Press Enter to send)"
              style={styles.textarea}
              rows="3"
              disabled={loading}
            />
            <button
              onClick={handleAskAI}
              disabled={loading || !prompt.trim()}
              style={{
                ...styles.sendButton,
                ...((loading || !prompt.trim()) ? styles.sendButtonDisabled : {})
              }}
            >
              {loading ? (
                <div style={styles.spinner}></div>
              ) : (
                <FaPaperPlane style={styles.sendIcon} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
  },
  chatContainer: {
    width: "100%",
    maxWidth: "900px",
    height: "85vh",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 30px",
    background: "#f8fafc",
    borderBottom: "1px solid #e5e7eb",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  headerIcon: {
    fontSize: "32px",
    color: "#4f46e5",
  },
  title: {
    fontSize: "1.5rem",
    color: "#1f2937",
    margin: 0,
    fontWeight: "700",
  },
  subtitle: {
    color: "#6b7280",
    margin: 0,
    fontSize: "0.9rem",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  modeSelector: {
    display: "flex",
    background: "#e5e7eb",
    borderRadius: "10px",
    padding: "4px",
  },
  modeButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    border: "none",
    background: "transparent",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  modeButtonActive: {
    background: "#fff",
    color: "#4f46e5",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  modeIcon: {
    fontSize: "14px",
  },
  clearButton: {
    padding: "8px 16px",
    background: "#6b7280",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  messagesContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    background: "#f9fafb",
  },
  welcomeMessage: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#6b7280",
  },
  welcomeIcon: {
    fontSize: "48px",
    color: "#4f46e5",
    marginBottom: "20px",
  },
  welcomeTitle: {
    fontSize: "1.5rem",
    color: "#1f2937",
    marginBottom: "10px",
  },
  welcomeText: {
    fontSize: "1rem",
    lineHeight: "1.6",
    maxWidth: "500px",
    margin: "0 auto",
  },
  message: {
    marginBottom: "20px",
  },
  userMessage: {
    marginLeft: "auto",
    maxWidth: "80%",
  },
  aiMessage: {
    marginRight: "auto",
    maxWidth: "80%",
  },
  errorMessage: {
    marginRight: "auto",
    maxWidth: "80%",
    borderLeft: "4px solid #ef4444",
  },
  messageHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
    gap: "10px",
  },
  messageAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
  userAvatar: {
    background: "#4f46e5",
  },
  aiAvatar: {
    background: "#10b981",
  },
  messageInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: 1,
  },
  messageSender: {
    fontWeight: "600",
    color: "#1f2937",
    fontSize: "14px",
  },
  messageModel: {
    fontSize: "12px",
    color: "#6b7280",
    background: "#e5e7eb",
    padding: "2px 6px",
    borderRadius: "4px",
  },
  messageTime: {
    fontSize: "12px",
    color: "#9ca3af",
  },
  copyButton: {
    background: "transparent",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "4px",
    fontSize: "14px",
  },
  messageContent: {
    background: "#fff",
    padding: "16px 20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    border: "1px solid #e5e7eb",
  },
  userMessageContent: {
    background: "#4f46e5",
    color: "#fff",
  },
  thinkingIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
    opacity: 0.7,
  },
  thinkingAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#10b981",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
  thinkingContent: {
    background: "#fff",
    padding: "12px 20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  thinkingText: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "4px",
  },
  thinkingDots: {
    display: "flex",
    gap: "4px",
  },
  thinkingDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#9ca3af",
  },
  inputContainer: {
    padding: "20px 30px",
    background: "#f8fafc",
    borderTop: "1px solid #e5e7eb",
  },
  inputWrapper: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-end",
  },
  textarea: {
    flex: 1,
    padding: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    fontSize: "14px",
    resize: "vertical",
    fontFamily: "inherit",
    minHeight: "60px",
    outline: "none",
    background: "#fff",
  },
  sendButton: {
    padding: "16px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    height: "52px",
  },
  sendButtonDisabled: {
    background: "#9ca3af",
    cursor: "not-allowed",
  },
  sendIcon: {
    fontSize: "16px",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid transparent",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};