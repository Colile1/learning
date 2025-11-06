const codeReviewGuidelines = [
  {
    id: 1,
    category: "Readability",
    title: "Clarity & Readability",
    guideline: "Review for code clarity and readability.",
    details:
      "Ensure variable names are descriptive, functions are short and focused, and the overall code is easy to follow. Avoid cryptic abbreviations.",
    importance: "High",
  },
  {
    id: 2,
    category: "Standards",
    title: "Coding Standards",
    guideline: "Check for adherence to coding standards.",
    details:
      "Ensure the code follows the team's style guide: indentation, naming conventions, file structure, and formatting.",
    importance: "High",
  },
  {
    id: 3,
    category: "Redundancy",
    title: "Redundant Code",
    guideline: "Identify redundant or duplicate code.",
    details:
      "Look for repeated code blocks or unnecessary variables and functions. Suggest refactoring or creating reusable modules.",
    importance: "Medium",
  },
  {
    id: 4,
    category: "Error Handling",
    title: "Error Handling",
    guideline: "Verify proper error handling and edge cases.",
    details:
      "Ensure the code gracefully handles errors, edge cases, and unexpected input. Validate inputs and provide meaningful error messages.",
    importance: "High",
  },
  {
    id: 5,
    category: "Version Control",
    title: "Version Control Best Practices",
    guideline: "Ensure proper use of version control.",
    details:
      "Commits should be atomic, descriptive, and frequent. Pull requests should be reviewed thoroughly and branches properly named.",
    importance: "Medium",
  },
  {
    id: 6,
    category: "Feedback",
    title: "Constructive Feedback",
    guideline: "Encourage constructive feedback and learning during reviews.",
    details:
      "Provide actionable suggestions, avoid personal criticism, and highlight positive aspects of the code.",
    importance: "Medium",
  },
  {
    id: 7,
    category: "Testing",
    title: "Code Testing",
    guideline: "Test the code to ensure it works as expected.",
    details:
      "Make sure unit tests, integration tests, or manual testing covers critical paths. Verify that changes do not break existing functionality.",
    importance: "High",
  },
  {
    id: 8,
    category: "Documentation",
    title: "Documentation",
    guideline: "Check for proper documentation and comments.",
    details:
      "Ensure functions, modules, and complex logic are documented clearly. Avoid redundant comments that explain obvious code.",
    importance: "Medium",
  },
  {
    id: 9,
    category: "Security",
    title: "Security Best Practices",
    guideline: "Review for potential security vulnerabilities.",
    details:
      "Look for unsafe code patterns, validate user inputs, avoid hardcoded secrets, and follow secure coding practices.",
    importance: "High",
  },
  {
    id: 10,
    category: "Performance",
    title: "Performance Optimization",
    guideline: "Check for performance and efficiency issues.",
    details:
      "Identify expensive loops, inefficient algorithms, and unnecessary computations. Suggest improvements without sacrificing readability.",
    importance: "Medium",
  },
];

module.exports = codeReviewGuidelines;
