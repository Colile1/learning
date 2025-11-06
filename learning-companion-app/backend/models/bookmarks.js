// models/bookmarks.js
// Enhanced in-memory bookmarks array (for demo purposes; can later be replaced with MongoDB)

const bookmarks = [
  {
    id: 1,
    title: "Learn React",
    url: "https://reactjs.org",
    category: "Frontend",
    description: "Official React documentation covering hooks, components, and state management.",
    dateAdded: "2025-11-01",
    tags: ["React", "JavaScript", "Frontend"],
    level: "Beginner",
    notes: "Start with the main concepts guide, then explore advanced hooks after mastering basics."
  },
  {
    id: 2,
    title: "Node.js Docs",
    url: "https://nodejs.org",
    category: "Backend",
    description: "Comprehensive Node.js documentation including APIs, events, streams, and modules.",
    dateAdded: "2025-10-25",
    tags: ["Node.js", "Backend", "JavaScript"],
    level: "Intermediate",
    notes: "Pay attention to async patterns and EventEmitter usage for building scalable backend apps."
  },
  {
    id: 3,
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    category: "Frontend",
    description: "Mozilla’s reference for HTML, CSS, and JavaScript with tutorials and examples.",
    dateAdded: "2025-10-20",
    tags: ["HTML", "CSS", "JavaScript", "Web Development"],
    level: "Beginner",
    notes: "A go-to resource for clarifying syntax, best practices, and browser compatibility."
  },
  {
    id: 4,
    title: "Express.js Guide",
    url: "https://expressjs.com",
    category: "Backend",
    description: "Official guide for building web applications and APIs using Express.js.",
    dateAdded: "2025-11-02",
    tags: ["Express", "Node.js", "API", "Backend"],
    level: "Intermediate",
    notes: "Check out middleware patterns and routing best practices for scalable apps."
  },
  {
    id: 5,
    title: "GitHub Docs",
    url: "https://docs.github.com",
    category: "Collaboration",
    description: "Official documentation for GitHub, version control, and collaboration workflows.",
    dateAdded: "2025-10-15",
    tags: ["GitHub", "Git", "Version Control", "Collaboration"],
    level: "Beginner",
    notes: "Understand branching strategies and pull requests to manage projects efficiently."
  }
];

module.exports = bookmarks;
