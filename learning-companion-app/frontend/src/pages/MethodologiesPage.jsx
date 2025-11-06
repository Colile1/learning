import { useEffect, useState } from "react";

export default function MethodologiesPage() {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/methodologies")
      .then((res) => res.json())
      .then((data) => {
        setMethods(data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Could not fetch development methodologies.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading methodologies...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Development Methodologies</h1>

      {methods.map((m) => (
        <div
          key={m._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1.5rem",
            backgroundColor: "#fafafa",
          }}
        >
          <h2>{m.name}</h2>
          <p>{m.description}</p>

          <h3>Advantages</h3>
          <ul>
            {m.advantages?.map((adv, i) => (
              <li key={i}>{adv}</li>
            ))}
          </ul>

          <h3>Disadvantages</h3>
          <ul>
            {m.disadvantages?.map((dis, i) => (
              <li key={i}>{dis}</li>
            ))}
          </ul>

          <h3>Use Cases</h3>
          <ul>
            {m.useCases?.map((use, i) => (
              <li key={i}>{use}</li>
            ))}
          </ul>

          {m.externalLinks?.length > 0 && (
            <p>
              <a
                href={m.externalLinks[0]}
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
