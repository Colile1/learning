import { useEffect, useState } from "react";

export default function DailyContentPage() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState({}); // Track expanded cards

  useEffect(() => {
    fetch("http://localhost:5000/api/dailycontent")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch daily content");
        return res.json();
      })
      .then((data) => {
        // Add a default date if missing
        const mapped = data.map((item, index) => ({
          ...item,
          _id: item.id || index,
          date: item.date ? new Date(item.date) : new Date(),
        }));
        setContents(mapped);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("⚠️ Could not fetch daily content.");
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
        <div className="status-message">⏳ Loading daily content...</div>
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
      <div className="daily-content-container">
        <h1 className="page-title">📅 Daily Developer Content</h1>

        {contents.length === 0 && <p className="status-message">No content available.</p>}

        {contents.map((item) => (
          <div
            key={item._id}
            className={`content-card ${expanded[item._id] ? "expanded" : ""}`}
            onClick={() => toggleCard(item._id)}
          >
            <p className="content-date">{item.date.toLocaleDateString()}</p>
            <h3 className="content-tip">{item.content}</h3>

            {expanded[item._id] && (
              <div className="content-details">
                {item.type && <p><strong>Type:</strong> {item.type}</p>}
                {item.challenge && <p><strong>Challenge:</strong> {item.challenge}</p>}
                {item.tutorial && (
                  <p>
                    <strong>Tutorial:</strong>{" "}
                    <a href={item.tutorial} target="_blank" rel="noopener noreferrer">
                      Learn more
                    </a>
                  </p>
                )}
                {item.motivation && <p className="content-motivation">{item.motivation}</p>}
              </div>
            )}
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
      .daily-content-container {
        max-width: 900px;
        margin: 2rem auto;
        padding: 2rem;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background: #f8fafc;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        color: #222;
      }

      .page-title {
        text-align: center;
        font-size: 2rem;
        color: #004b8d;
        margin-bottom: 2rem;
        font-weight: 700;
      }

      .content-card {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 1.2rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 3px 6px rgba(0,0,0,0.05);
        transition: all 0.25s ease;
        cursor: pointer;
      }

      .content-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 12px rgba(0,0,0,0.08);
        border-color: #007acc;
      }

      .content-date {
        font-size: 0.85rem;
        color: #888;
        margin-bottom: 0.3rem;
      }

      .content-tip {
        color: #007acc;
        margin: 0.5rem 0;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .content-details {
        margin-top: 0.8rem;
        color: #333;
      }

      .content-motivation {
        font-style: italic;
        color: #555;
        margin-top: 0.5rem;
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

      a {
        color: #007acc;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      @media (max-width: 600px) {
        .daily-content-container {
          padding: 1.2rem;
        }

        .content-card {
          padding: 1rem;
        }

        .page-title {
          font-size: 1.6rem;
        }
      }
    `}</style>
  );
}
