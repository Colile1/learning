import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [score, setScore] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Fetch quiz by ID
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        setQuiz(data);
      } catch (err) {
        console.error(err);
        setError("Could not fetch quiz. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = () => {
    if (!quiz) return;

    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (answers[q._id] === q.answer) correctCount += 1;
    });

    setScore({
      correct: correctCount,
      total: quiz.questions.length,
      percentage: Math.round((correctCount / quiz.questions.length) * 100)
    });
  };

  const nextQuestion = () => {
    setCurrentQuestion(prev => Math.min(prev + 1, quiz.questions.length - 1));
  };

  const prevQuestion = () => {
    setCurrentQuestion(prev => Math.max(prev - 1, 0));
  };

  if (loading) return (
    <div style={{ 
      padding: "2rem", 
      textAlign: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <p>Loading quiz...</p>
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
  
  if (!quiz) return (
    <div style={{ 
      padding: "2rem", 
      textAlign: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <p>Quiz not found.</p>
    </div>
  );

  const currentQ = quiz.questions[currentQuestion];

  return (
    <div style={{ 
      padding: "2rem", 
      maxWidth: "800px", 
      margin: "0 auto",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Quiz Header */}
      <div style={{ 
        backgroundColor: "#2c3e50", 
        color: "white", 
        padding: "1.5rem", 
        borderRadius: "12px",
        marginBottom: "2rem"
      }}>
        <h1 style={{ margin: "0 0 0.5rem 0" }}>{quiz.title}</h1>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <span>Language: {quiz.language}</span>
          <span>Level: {quiz.skillLevel}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ 
        marginBottom: "2rem",
        backgroundColor: "#ecf0f1",
        borderRadius: "10px",
        overflow: "hidden"
      }}>
        <div 
          style={{ 
            height: "8px",
            backgroundColor: "#3498db",
            width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
            transition: "width 0.3s ease"
          }} 
        />
      </div>

      {/* Question Navigation */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "1.5rem"
      }}>
        <button 
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: currentQuestion === 0 ? "#bdc3c7" : "#3498db",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: currentQuestion === 0 ? "not-allowed" : "pointer"
          }}
        >
          Previous
        </button>
        
        <span style={{ fontWeight: "bold", color: "#2c3e50" }}>
          Question {currentQuestion + 1} of {quiz.questions.length}
        </span>
        
        <button 
          onClick={nextQuestion}
          disabled={currentQuestion === quiz.questions.length - 1}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: currentQuestion === quiz.questions.length - 1 ? "#bdc3c7" : "#3498db",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: currentQuestion === quiz.questions.length - 1 ? "not-allowed" : "pointer"
          }}
        >
          Next
        </button>
      </div>

      {/* Current Question */}
      <div style={{ 
        backgroundColor: "white", 
        padding: "1.5rem", 
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        marginBottom: "1.5rem"
      }}>
        <p style={{ 
          fontSize: "1.2rem", 
          fontWeight: "bold", 
          marginBottom: "1rem",
          color: "#2c3e50"
        }}>
          {currentQuestion + 1}. {currentQ.question}
        </p>
        
        {currentQ.options.map((opt, index) => (
          <label 
            key={opt} 
            style={{ 
              display: "block", 
              padding: "0.75rem 1rem",
              marginBottom: "0.5rem",
              border: "2px solid #e1e5e9",
              borderRadius: "8px",
              cursor: score === null ? "pointer" : "default",
              backgroundColor: answers[currentQ._id] === opt ? "#3498db" : "white",
              color: answers[currentQ._id] === opt ? "white" : "#2c3e50",
              transition: "all 0.2s ease"
            }}
          >
            <input
              type="radio"
              name={currentQ._id}
              value={opt}
              onChange={(e) => handleChange(currentQ._id, e.target.value)}
              disabled={score !== null}
              style={{ marginRight: "0.75rem" }}
            />
            {opt}
          </label>
        ))}

        {/* Answer Explanation */}
        {score !== null && (
          <div style={{ 
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: answers[currentQ._id] === currentQ.answer ? "#d4edda" : "#f8d7da",
            border: `1px solid ${answers[currentQ._id] === currentQ.answer ? "#c3e6cb" : "#f5c6cb"}`,
            borderRadius: "8px",
            color: answers[currentQ._id] === currentQ.answer ? "#155724" : "#721c24"
          }}>
            <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold" }}>
              {answers[currentQ._id] === currentQ.answer ? "Correct!" : "Incorrect"}
            </p>
            <p style={{ margin: "0 0 0.5rem 0" }}>
              <strong>Correct Answer:</strong> {currentQ.answer}
            </p>
            {currentQ.explanation && (
              <p style={{ margin: 0 }}>
                <strong>Explanation:</strong> {currentQ.explanation}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Submit Button */}
      {score === null && (
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <button 
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== quiz.questions.length}
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: Object.keys(answers).length === quiz.questions.length ? "#27ae60" : "#bdc3c7",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: Object.keys(answers).length === quiz.questions.length ? "pointer" : "not-allowed"
            }}
          >
            Submit Quiz
          </button>
          <p style={{ color: "#7f8c8d", marginTop: "0.5rem" }}>
            {Object.keys(answers).length} of {quiz.questions.length} questions answered
          </p>
        </div>
      )}

      {/* Results */}
      {score !== null && (
        <div style={{ 
          textAlign: "center",
          backgroundColor: "#f8f9fa",
          padding: "2rem",
          borderRadius: "12px",
          border: "2px solid #e9ecef"
        }}>
          <h2 style={{ color: "#2c3e50", marginBottom: "1rem" }}>
            {score.percentage >= 70 ? "Excellent!" : 
             score.percentage >= 50 ? "Good Job!" : "Keep Learning!"}
          </h2>
          <div style={{ 
            fontSize: "2rem", 
            fontWeight: "bold",
            color: score.percentage >= 70 ? "#27ae60" : 
                   score.percentage >= 50 ? "#f39c12" : "#e74c3c",
            marginBottom: "1rem"
          }}>
            {score.correct} / {score.total} ({score.percentage}%)
          </div>
          
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button 
              onClick={() => navigate("/quiz-start")}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              Try Another Quiz
            </button>
            <button 
              onClick={() => navigate("/quizzes")}
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
              Browse Quizzes
            </button>
            <button 
              onClick={() => navigate("/")}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#7f8c8d",
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
      )}
    </div>
  );
}

export default QuizPage;