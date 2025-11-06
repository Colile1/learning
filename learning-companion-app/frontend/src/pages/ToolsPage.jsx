import { useEffect, useState } from "react";

export default function ToolsPage() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/tools")
      .then((res) => res.json())
      .then((data) => {
        setTools(data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Could not fetch tools.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading tools...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const groupedTools = tools.reduce((acc, tool) => {
    acc[tool.category] = acc[tool.category] || [];
    acc[tool.category].push(tool);
    return acc;
  }, {});

  const categories = ["All", ...Object.keys(groupedTools)];

  const visibleCategories =
    selectedCategory === "All" ? Object.keys(groupedTools) : [selectedCategory];

  return (
    <div className="tools-container">
      <h1>Developer Tools</h1>

      {/* Dropdown filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="tools-select"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {visibleCategories.length === 0 ? (
        <p>No tools found in this category.</p>
      ) : (
        visibleCategories.map((category) => (
          <div key={category} className="tools-category">
            <h2>{category}</h2>
            <div className="tools-grid">
              {groupedTools[category].map((tool) => (
                <div
                  key={tool._id}
                  className="tool-card"
                >
                  <h3>{tool.name}</h3>
                  <p className="tool-desc">{tool.description}</p>

                  {tool.explanation && (
                    <p>
                      <strong>Explanation:</strong> {tool.explanation}
                    </p>
                  )}
                  {tool.useCase && (
                    <p>
                      <strong>Use Case:</strong> {tool.useCase}
                    </p>
                  )}
                  {tool.languages?.length > 0 && (
                    <p>
                      <strong>Languages:</strong> {tool.languages.join(", ")}
                    </p>
                  )}
                  {tool.officialWebsite && (
                    <a
                      href={tool.officialWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="tool-link"
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Embedded CSS */}
      <style>{`
        .tools-container {
          padding: 2rem;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background: #f8fafc;
          min-height: 100vh;
          color: #1e293b;
        }

        .tools-container h1 {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 2rem;
          color: #1e40af;
        }

        .tools-select {
          display: block;
          margin: 0 auto 2.5rem auto;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: #fff;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .tools-select:hover,
        .tools-select:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
          outline: none;
        }

        .tools-category {
          margin-bottom: 3rem;
        }

        .tools-category h2 {
          border-bottom: 3px solid #e2e8f0;
          padding-bottom: 0.4rem;
          color: #334155;
          margin-bottom: 1.5rem;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .tool-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          transition: all 0.25s ease;
        }

        .tool-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.1);
        }

        .tool-card h3 {
          margin-top: 0;
          color: #1e3a8a;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .tool-desc {
          color: #475569;
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }

        .tool-link {
          display: inline-block;
          margin-top: 0.75rem;
          color: #2563eb;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .tool-link:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .tools-container {
            padding: 1.5rem;
          }
          .tool-card {
            padding: 1.2rem;
          }
          .tools-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
