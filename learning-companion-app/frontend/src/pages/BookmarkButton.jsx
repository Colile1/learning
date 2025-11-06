import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function BookmarkButton({ contentId, contentType }) {
  const { token } = useContext(AuthContext);
  const [bookmarked, setBookmarked] = useState(false);

  // Fetch initial bookmark state if token exists
  useEffect(() => {
    if (!token) return;

    const fetchBookmarks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/bookmarks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const ids = data.bookmarks
          .filter(b => b.contentType === contentType)
          .map(b => b.content._id);
        setBookmarked(ids.includes(contentId));
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      }
    };

    fetchBookmarks();
  }, [token, contentId, contentType]);

  const toggleBookmark = async () => {
    if (!token) {
      alert("Please login to bookmark content");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/users/bookmarks/${contentId}`, {
        method: bookmarked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contentType }),
      });

      if (!res.ok) throw new Error("Failed to update bookmark");
      setBookmarked(prev => !prev);
    } catch (err) {
      console.error(err);
      alert("Error updating bookmark");
    }
  };

  return (
    <button onClick={toggleBookmark}>
      {bookmarked ? "Remove Bookmark" : "Bookmark"}
    </button>
  );
}
