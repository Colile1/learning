import { useEffect, useState, useMemo } from "react";

export default function ProjectGuidesPage() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openGuide, setOpenGuide] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/project-guides");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setGuides(data.guides || []);
        setError("");
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not fetch project guides. Please check your backend.");
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  const categories = useMemo(
    () => [...new Set(guides.map((g) => g.category))],
    [guides]
  );

  const filteredGuides = useMemo(() => {
    return guides.filter((g) => {
      const matchesCategory =
        selectedCategory === "" || g.category === selectedCategory;
      const matchesSearch =
        search === "" ||
        g.title.toLowerCase().includes(search.toLowerCase()) ||
        g.description.toLowerCase().includes(search.toLowerCase()) ||
        g.steps.some((step) =>
          step.step.toLowerCase().includes(search.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [guides, search, selectedCategory]);

  if (loading) return <p>Loading project guides...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (guides.length === 0) return <p>No project guides available.</p>;

  const groupedGuides = filteredGuides.reduce((acc, guide) => {
    if (!acc[guide.category]) acc[guide.category] = [];
    acc[guide.category].push(guide);
    return acc;
  }, {});

  return (
    <div className="pg-container">
      <h1>Project Guides</h1>

      <div className="pg-controls">
        <input
          type="text"
          placeholder="Search by keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {Object.keys(groupedGuides).length === 0 && <p>No results found.</p>}

      {Object.entries(groupedGuides).map(([category, guidesInCategory]) => (
        <div key={category} className="pg-category">
          <h2>{category}</h2>
          <div className="pg-flex">
            {guidesInCategory.map((g) => (
              <div
                key={g._id}
                className="pg-card"
                onClick={() =>
                  setOpenGuide(openGuide === g._id ? null : g._id)
                }
              >
                <h3>{g.title}</h3>
                {openGuide === g._id && (
                  <div className="pg-details">
                    <p>{g.description}</p>
                    {g.steps && (
                      <>
                        <h4>Steps:</h4>
                        <ol>
                          {g.steps.map((step, idx) => (
                            <li key={idx}>
                              <strong>{step.step}</strong>
                              {step.explanation && <p>{step.explanation}</p>}
                              {step.code && <pre>{step.code}</pre>}
                            </li>
                          ))}
                        </ol>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* CSS */}
      <style>{`
        .pg-container {
          max-width: 1400px;
          margin: 2rem auto;
          padding: 1rem;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .pg-container h1 {
          text-align: center;
          margin-bottom: 2rem;
          color: #004b8d;
        }

        .pg-controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .pg-controls input,
        .pg-controls select {
          padding: 0.5rem;
          font-size: 1rem;
          flex: 1;
        }

        .pg-category h2 {
          color: #007acc;
          margin-bottom: 1rem;
        }

        /* Horizontal flex layout for cards */
        .pg-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .pg-card {
          flex: 1 1 30%; /* grow, shrink, base width 30% */
          min-width: 280px; /* prevent too small */
          background: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 1rem;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .pg-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          border-color: #007acc;
        }

        .pg-card h3 {
          margin: 0 0 0.5rem 0;
          font-weight: 600;
          color: #333;
        }

        .pg-details {
          margin-top: 1rem;
          font-size: 0.95rem;
          color: #555;
        }

        .pg-details h4 {
          margin-top: 1rem;
          color: #007acc;
        }

        .pg-details pre {
          background: #f5f5f5;
          padding: 0.5rem;
          border-radius: 4px;
          overflow-x: auto;
        }

        @media (max-width: 1024px) {
          .pg-card {
            flex: 1 1 45%;
          }
        }

        @media (max-width: 700px) {
          .pg-card {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </div>
  );
}
