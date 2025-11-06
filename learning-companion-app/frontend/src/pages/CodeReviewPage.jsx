import { useEffect, useState } from "react";

export default function CodeReviewPage() {
  const [guidelines, setGuidelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState({}); // Track expanded cards

  useEffect(() => {
    fetch("http://localhost:5000/api/codereview")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((g) => ({
          _id: g.id,
          category: g.category || "General",
          title: g.title || g.guideline,
          content: g.details || g.guideline,
        }));
        setGuidelines(mapped);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("⚠️ Could not fetch code review guidelines.");
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleCard = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading)
    return (
      <>
        <Style />
        <div className="status-message">⏳ Loading code review guidelines...</div>
      </>
    );

  if (error)
    return (
      <>
        <Style />
        <div className="status-message error">{error}</div>
      </>
    );

  // Group by category
  const grouped = guidelines.reduce((acc, g) => {
    const cat = g.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(g);
    return acc;
  }, {});

  return (
    <>
      <Style />
      <div className="code-review-container">
        <h1 className="page-title">📘 Code Review Guidelines</h1>

        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="guidelines-grid">
              {items.map((g) => (
                <div
                  key={g._id}
                  className={`guideline-card ${expanded[g._id] ? "expanded" : ""}`}
                  onClick={() => toggleCard(g._id)}
                >
                  <h3 className="guideline-title">{g.title}</h3>
                  {expanded[g._id] && <p className="guideline-content">{g.content}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Inline CSS
function Style() {
  return (
    <style>{`
      .code-review-container {
        max-width: 1000px;
        margin: 2rem auto;
        padding: 2rem;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background: #f7f9fc;
        border-radius: 12px;
        box-shadow: 0 6px 25px rgba(0,0,0,0.08);
        color: #222;
      }

      .page-title {
        text-align: center;
        font-size: 2.2rem;
        color: #004b8d;
        margin-bottom: 2.5rem;
        font-weight: 700;
      }

      .category-section {
        margin-bottom: 3rem;
      }

      .category-title {
        color: #007acc;
        border-bottom: 3px solid #007acc;
        display: inline-block;
        padding-bottom: 0.3rem;
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
        font-weight: 600;
      }

      .guidelines-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .guideline-card {
        background: #fff;
        border: 1px solid #e1e5eb;
        border-radius: 12px;
        padding: 1rem 1.2rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        cursor: pointer;
        transition: all 0.3s ease;
        flex: 1 1 calc(33% - 1rem); /* Three cards per row */
        min-width: 250px;
      }

      .guideline-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.08);
        border-color: #007acc;
      }

      .guideline-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: #333;
        margin-bottom: 0.5rem;
      }

      .guideline-content {
        margin-top: 0.5rem;
        color: #555;
        line-height: 1.5;
        border-top: 1px solid #e1e5eb;
        padding-top: 0.5rem;
      }

      .status-message {
        text-align: center;
        margin-top: 3rem;
        font-size: 1.1rem;
        color: #555;
      }

      .status-message.error {
        color: #d9534f;
        font-weight: bold;
      }

      @media (max-width: 900px) {
        .guideline-card {
          flex: 1 1 calc(50% - 1rem); /* Two cards per row */
        }
      }

      @media (max-width: 600px) {
        .guideline-card {
          flex: 1 1 100%; /* One card per row */
        }
      }
    `}</style>
  );
}
