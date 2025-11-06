import { useEffect, useState, useMemo } from "react";

export default function ProjectManagementPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openProject, setOpenProject] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/projectmanagement");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProjects(data);
        setError("");
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not fetch project guides. Please check your backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = useMemo(
    () => [...new Set(projects.map((p) => p.category))],
    [projects]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === "" || p.category === selectedCategory;
      const matchesSearch =
        search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.content && p.content.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, search, selectedCategory]);

  if (loading) return <p>Loading project management guides...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (projects.length === 0) return <p>No project guides available at the moment.</p>;

  const groupedProjects = filteredProjects.reduce((acc, project) => {
    if (!acc[project.category]) acc[project.category] = [];
    acc[project.category].push(project);
    return acc;
  }, {});

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Project Management Guides</h1>

      {/* Search & Filter */}
      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Search by keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "0.5rem", flex: 1 }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: "0.5rem" }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {Object.keys(groupedProjects).length === 0 && <p>No results found.</p>}

      {/* Render grouped projects */}
      {Object.entries(groupedProjects).map(([category, projectsInCategory]) => (
        <div key={category} style={{ marginBottom: "2rem" }}>
          <h2>{category}</h2>
          {projectsInCategory.map((p) => (
            <div
              key={p._id}
              style={{
                marginBottom: "1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                background: "#fafafa",
              }}
            >
              <div
                onClick={() =>
                  setOpenProject(openProject === p._id ? null : p._id)
                }
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <h3 style={{ margin: 0 }}>{p.title}</h3>
                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  {openProject === p._id ? "▲" : "▼"}
                </span>
              </div>

              {openProject === p._id && (
                <div style={{ marginTop: "1rem" }}>
                  <p style={{ fontStyle: "italic" }}>{p.content || p.description}</p>
                  {p.tags && p.tags.length > 0 && (
                    <p>
                      <strong>Tags:</strong> {p.tags.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}