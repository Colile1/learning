// Bookmarks.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Bookmarks() {
  const { token } = useContext(AuthContext);
  const [bookmarks, setBookmarks] = useState([]);
  const [expandedTopics, setExpandedTopics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user bookmarks
  useEffect(() => {
    if (!token) {
      setError("Please login to view bookmarks");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/users/bookmarks", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookmarks");
        return res.json();
      })
      .then((data) => {
        setBookmarks(data.bookmarks || []);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching bookmarks");
      })
      .finally(() => setLoading(false));
  }, [token]);

  const toggleTopic = (id) => {
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const removeBookmark = async (id, contentType) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/bookmarks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ contentType }),
      });
      if (!res.ok) throw new Error("Failed to remove bookmark");
      setBookmarks((prev) => prev.filter((b) => b.content._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error removing bookmark");
    }
  };

  if (loading) return <p>Loading bookmarks...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (bookmarks.length === 0) return <p>No bookmarks yet.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Your Bookmarks</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {bookmarks.map((bookmark) => {
          const item = bookmark.content;
          return (
            <li key={item._id} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 onClick={() => toggleTopic(item._id)} style={{ cursor: "pointer" }}>
                  {item.topic} ({item.language || bookmark.contentType}) {expandedTopics[item._id] ? "▲" : "▼"}
                </h2>
                <button onClick={() => removeBookmark(item._id, bookmark.contentType)}>Remove Bookmark</button>
              </div>

              {expandedTopics[item._id] && (
                <div style={{ marginTop: "0.5rem" }}>
                  <p><strong>Summary:</strong> {item.summary}</p>
                  {item.codeExamples ? (
                    <pre style={{ background: "#f4f4f4", padding: "0.5rem", borderRadius: "4px" }}>{item.codeExamples}</pre>
                  ) : (
                    <p>No code examples available.</p>
                  )}
                  {item.externalLinks?.length > 0 ? (
                    <div style={{ marginTop: "0.5rem" }}>
                      <strong>External Resources:</strong>
                      {item.externalLinks.map((link, idx) => (
                        <div key={idx}><a href={link} target="_blank" rel="noopener noreferrer">Resource {idx + 1}</a></div>
                      ))}
                    </div>
                  ) : <p>No external links provided.</p>}
                  {item.detailedContent ? (
                    <div style={{ marginTop: "0.5rem" }}>
                      <strong>Explanation:</strong> {item.detailedContent}
                    </div>
                  ) : <p>No detailed explanation provided.</p>}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Bookmarks;
