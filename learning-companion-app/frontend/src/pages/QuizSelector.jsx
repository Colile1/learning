import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function QuizSelector() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({
    language: "",
    skillLevel: "",
    topic: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/quizzes")
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setQuizzes(data);
        setError("");
      })
      .catch((err) => {
        setError("Could not fetch quizzes. Is the backend running?");
      })
      .finally(() => setLoading(false));
  }, []);

  // Get unique values for filters
  const languages = [...new Set(quizzes.map(q => q.language))];
  const skillLevels = [...new Set(quizzes.map(q => q.skillLevel))];
  const topics = [...new Set(quizzes.map(q => q.topic).filter(Boolean))];

  const filteredQuizzes = quizzes.filter(quiz => {
    return (
      (!filter.language || quiz.language === filter.language) &&
      (!filter.skillLevel || quiz.skillLevel === filter.skillLevel) &&
      (!filter.topic || quiz.topic === filter.topic)
    );
  });

  if (loading) return (
    <div style={{ 
      padding: "2rem", 
      textAlign: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <p>Loading quizzes...</p>
    </div>
  );
  
  if (error) return (
    <div style={{ 
      padding: "2rem", 
      textAlign: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ color: "#e74c3c", fontSize: "1.2rem" }}>{error}</div>
    </div>
  );

  return (
    <div style={{ 
      padding: "2rem", 
      maxWidth: "1000px", 
      margin: "0 auto",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ 
        backgroundColor: "#2c3e50", 
        color: "white", 
        padding: "1.5rem", 
        borderRadius: "12px",
        marginBottom: "2rem"
      }}>
        <h1 style={{ margin: "0 0 1rem 0" }}>Available Quizzes</h1>
        <p style={{ margin: 0, opacity: 0.9 }}>
          Browse through all available quizzes or use the filters to find specific ones.
        </p>
      </div>

      {/* Filters */}
      <div style={{ 
        backgroundColor: "#f8f9fa", 
        padding: "1.5rem", 
        borderRadius: "12px",
        marginBottom: "2rem",
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap"
      }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
            Language
          </label>
          <select 
            value={filter.language} 
            onChange={(e) => setFilter({...filter, language: e.target.value})}
            style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ddd" }}
          >
            <option value="">All Languages</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
            Skill Level
          </label>
          <select 
            value={filter.skillLevel} 
            onChange={(e) => setFilter({...filter, skillLevel: e.target.value})}
            style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ddd" }}
          >
            <option value="">All Levels</option>
            {skillLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
            Topic
          </label>
          <select 
            value={filter.topic} 
            onChange={(e) => setFilter({...filter, topic: e.target.value})}
            style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ddd" }}
          >
            <option value="">All Topics</option>
            {topics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1, textAlign: "right", alignSelf: "end" }}>
          <Link to="/quiz-start">
            <button style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer"
            }}>
              Generate New Quiz
            </button>
          </Link>
        </div>
      </div>

      {/* Quiz List */}
      {filteredQuizzes.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: "3rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px"
        }}>
          <h3>No quizzes found</h3>
          <p>Try adjusting your filters or generate a new quiz.</p>
          <Link to="/quiz-start">
            <button style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}>
              Generate New Quiz
            </button>
          </Link>
        </div>
      ) : (
        <div style={{ 
          display: "grid", 
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))"
        }}>
          {filteredQuizzes.map((quiz) => (
            <div 
              key={quiz._id}
              style={{ 
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: "1px solid #e1e5e9"
              }}
            >
              <h3 style={{ 
                margin: "0 0 1rem 0", 
                color: "#2c3e50",
                fontSize: "1.2rem"
              }}>
                {quiz.title}
              </h3>
              
              <div style={{ marginBottom: "1rem" }}>
                <span style={{ 
                  display: "inline-block",
                  backgroundColor: "#3498db",
                  color: "white",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  marginRight: "0.5rem",
                  marginBottom: "0.5rem"
                }}>
                  {quiz.language}
                </span>
                <span style={{ 
                  display: "inline-block",
                  backgroundColor: "#27ae60",
                  color: "white",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  marginRight: "0.5rem",
                  marginBottom: "0.5rem"
                }}>
                  {quiz.skillLevel}
                </span>
                {quiz.topic && (
                  <span style={{ 
                    display: "inline-block",
                    backgroundColor: "#9b59b6",
                    color: "white",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    marginBottom: "0.5rem"
                  }}>
                    {quiz.topic}
                  </span>
                )}
              </div>

              <p style={{ 
                color: "#666", 
                marginBottom: "1.5rem",
                fontSize: "0.9rem"
              }}>
                {quiz.questions?.length || 0} questions
              </p>

              <Link 
                to={`/quiz/${quiz._id}`}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "0.75rem",
                  backgroundColor: "#2c3e50",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  transition: "background-color 0.2s ease"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#34495e"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#2c3e50"}
              >
                Start Quiz
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuizSelector;