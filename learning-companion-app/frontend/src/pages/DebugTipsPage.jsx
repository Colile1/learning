import { useEffect, useState } from "react";

export default function DebugTipsPage() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/debugtips")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tips");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          // Map backend data to a standard tip object
          const mappedTips = data.map((tip) => ({
            _id: tip.id || tip._id,
            category: "Debug & Clean Code",
            title: tip.tip,
            description: tip.description || "",
            badExample: tip.badExample || "",
            cleanExample: tip.cleanExample || "",
          }));
          setTips(mappedTips);
        } else {
          setTips([]);
        }
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("⚠️ Could not fetch debug tips.");
        setTips([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <>
        <Style />
        <div className="status-message">⏳ Loading debug tips...</div>
      </>
    );

  if (error)
    return (
      <>
        <Style />
        <div className="status-message error">{error}</div>
      </>
    );

  return (
    <>
      <Style />
      <div className="debug-tips-container">
        <h1 className="page-title">🧠 Debug & Clean Code Tips</h1>
        {tips.length === 0 && <p className="status-message">No tips available.</p>}
        <div className="tips-grid">
          {tips.map((tip) => (
            <div key={tip._id} className="tip-card">
              <h3 className="tip-title">{tip.title}</h3>
              {tip.description && <p className="tip-description">{tip.description}</p>}

              {tip.badExample && (
                <>
                  <strong>❌ Bad Code:</strong>
                  <pre className="code-block">
                    <code>{tip.badExample}</code>
                  </pre>
                </>
              )}

              {tip.cleanExample && (
                <>
                  <strong>✅ Clean Code:</strong>
                  <pre className="code-block clean">
                    <code>{tip.cleanExample}</code>
                  </pre>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Inline CSS
function Style() {
  return (
    <style>{`
      .debug-tips-container {
        max-width: 1000px;
        margin: 2rem auto;
        padding: 2rem;
        background: #f8fafc;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        color: #222;
      }

      .page-title {
        text-align: center;
        font-size: 2.2rem;
        color: #004b8d;
        margin-bottom: 2.5rem;
        font-weight: 700;
      }

      .tips-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
      }

      .tip-card {
        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        padding: 1.2rem;
        box-shadow: 0 3px 6px rgba(0,0,0,0.05);
        transition: all 0.25s ease;
      }

      .tip-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 15px rgba(0,0,0,0.08);
        border-color: #007acc;
      }

      .tip-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: #333;
        margin-bottom: 0.5rem;
      }

      .tip-description {
        color: #555;
        margin-bottom: 0.6rem;
        font-size: 0.95rem;
      }

      .code-block {
        background: #1e1e1e;
        color: #dcdcdc;
        font-family: "Consolas", "Courier New", monospace;
        padding: 0.8rem;
        border-radius: 6px;
        font-size: 0.85rem;
        overflow-x: auto;
        white-space: pre-wrap;
        line-height: 1.4;
        margin-bottom: 0.8rem;
      }

      .code-block.clean {
        background: #f6f8fa;
        color: #222;
        border: 1px solid #ddd;
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
    `}</style>
  );
}
