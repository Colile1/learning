import { useState } from "react";
import { useNavigate } from "react-router-dom";

function QuizStartPage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const languages = ["Python", "JavaScript", "Java", "C#", "C++", "SQL"];
  const skillLevels = ["Beginner", "Intermediate", "Advanced"];

  const handleStartQuiz = async () => {
    if (!language || !skillLevel) {
      setError("Please select language and skill level.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const queryParams = new URLSearchParams({
        language,
        skillLevel
      });

      const res = await fetch(
        `http://localhost:5000/api/quizzes/random?${queryParams}`
      );
      
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error(`No quizzes found for ${language} at ${skillLevel} level.`);
        }
        throw new Error(`Server error: ${res.status}`);
      }

      const randomQuiz = await res.json();
      navigate(`/quiz/${randomQuiz._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: "2rem", 
      maxWidth: "600px", 
      margin: "0 auto",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ 
        backgroundColor: "#f8f9fa", 
        padding: "2rem", 
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ 
          textAlign: "center", 
          color: "#2c3e50", 
          marginBottom: "1rem" 
        }}>
          Start Your Quiz
        </h1>
        
        <p style={{ 
          textAlign: "center", 
          color: "#666", 
          marginBottom: "2rem" 
        }}>
          Select your preferences to generate a personalized quiz
        </p>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "0.5rem", 
            fontWeight: "bold",
            color: "#2c3e50"
          }}>
            Programming Language
          </label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #e1e5e9",
              borderRadius: "8px",
              fontSize: "1rem",
              backgroundColor: "white"
            }}
          >
            <option value="">-- Select Language --</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "0.5rem", 
            fontWeight: "bold",
            color: "#2c3e50"
          }}>
            Skill Level
          </label>
          <select 
            value={skillLevel} 
            onChange={(e) => setSkillLevel(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #e1e5e9",
              borderRadius: "8px",
              fontSize: "1rem",
              backgroundColor: "white"
            }}
          >
            <option value="">-- Select Skill Level --</option>
            {skillLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {error && (
          <div style={{ 
            color: "#e74c3c", 
            backgroundColor: "#fdf2f2",
            padding: "0.75rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            border: "1px solid #f5c6cb"
          }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button 
            onClick={handleStartQuiz} 
            disabled={loading}
            style={{
              flex: "1",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Generating Quiz..." : "Start Quiz"}
          </button>
          
          <button 
            onClick={() => navigate("/")}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#95a5a6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer"
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizStartPage;