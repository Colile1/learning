// models/debugTips.js

const debuggingAndCleanCodeTips = [
  // 🔍 DEBUGGING TIPS
  {
    id: 1,
    category: "Debugging",
    title: "Use console.log() wisely",
    tip: "Insert console.log() statements strategically to trace variable values and program flow. Avoid leaving them in production code to prevent console clutter.",
    example: "console.log('User data:', userData);"
  },
  {
    id: 2,
    category: "Debugging",
    title: "Use breakpoints and watch variables",
    tip: "Use Chrome DevTools or VS Code's debugger to pause code execution at specific lines. Monitor variable states and step through logic to find bugs efficiently.",
    example: "In VS Code: Click left of line numbers → press F5 → inspect variables in Debug panel."
  },
  {
    id: 3,
    category: "Debugging",
    title: "Check network requests and responses",
    tip: "Use browser DevTools > Network tab to inspect API calls, payloads, and server responses to quickly identify backend or frontend data mismatches.",
    example: "Inspect failed requests → verify endpoint URL and JSON structure."
  },
  {
    id: 4,
    category: "Debugging",
    title: "Reproduce bugs consistently",
    tip: "Try to recreate the bug step-by-step before fixing it. Consistent reproduction ensures that your fix addresses the root cause and not just the symptom."
  },
  {
    id: 5,
    category: "Debugging",
    title: "Read stack traces carefully",
    tip: "When an error occurs, read the full stack trace from bottom to top. It shows the exact file and line where the issue originated."
  },

  // ✨ CLEAN CODE PRACTICES
  {
    id: 6,
    category: "Clean Code",
    title: "Write descriptive variable and function names",
    tip: "Use meaningful names that describe the purpose of the variable or function instead of generic terms like data or temp.",
    example: "✅ getUserProfile() instead of ❌ handleData()"
  },
  {
    id: 7,
    category: "Clean Code",
    title: "Keep functions small and focused",
    tip: "A function should ideally do one thing. Smaller functions are easier to test, debug, and maintain.",
    example: "✅ split large processUserData() into validateUser(), formatUser(), saveUser()"
  },
  {
    id: 8,
    category: "Clean Code",
    title: "Remove dead code and unused imports",
    tip: "Eliminate commented-out blocks and unused variables. This keeps your project lightweight and avoids confusion for future developers."
  },
  {
    id: 9,
    category: "Clean Code",
    title: "Use consistent formatting",
    tip: "Apply consistent indentation, spacing, and line breaks across your codebase. Use tools like Prettier or ESLint to enforce formatting rules."
  },
  {
    id: 10,
    category: "Clean Code",
    title: "Refactor regularly",
    tip: "Refactor code periodically to simplify logic, improve readability, and remove duplication. Don’t wait for a major issue before cleaning up."
  },

  // 💡 BEST PRACTICES
  {
    id: 11,
    category: "Best Practices",
    title: "Add comments for complex logic",
    tip: "Use comments to explain why something is done, not what is done. Let the code explain itself as much as possible."
  },
  {
    id: 12,
    category: "Best Practices",
    title: "Validate inputs and handle errors",
    tip: "Always check user input and handle errors gracefully to prevent crashes and unexpected behaviors."
  },
  {
    id: 13,
    category: "Best Practices",
    title: "Use version control effectively",
    tip: "Commit small, logical changes frequently. Use meaningful commit messages and avoid committing sensitive information."
  },
  {
    id: 14,
    category: "Best Practices",
    title: "Write modular and reusable code",
    tip: "Break code into reusable components or modules. This reduces redundancy and improves scalability."
  },
  {
    id: 15,
    category: "Best Practices",
    title: "Write tests for critical functions",
    tip: "Use unit tests and integration tests to ensure that core features work correctly after every update."
  },

  // ⚙️ PRODUCTIVITY & TEAM TIPS
  {
    id: 16,
    category: "Productivity",
    title: "Automate repetitive tasks",
    tip: "Use scripts or tools (like npm scripts, Gulp, or Makefiles) to automate builds, tests, and deployments."
  },
  {
    id: 17,
    category: "Productivity",
    title: "Use linters and code analyzers",
    tip: "Integrate ESLint or similar tools into your workflow to detect errors, enforce conventions, and improve code quality automatically."
  },
  {
    id: 18,
    category: "Productivity",
    title: "Review your code before merging",
    tip: "Perform self-reviews or request peer reviews. Reviewing your own code helps catch mistakes and improve clarity."
  },
  {
    id: 19,
    category: "Productivity",
    title: "Document your APIs and modules",
    tip: "Keep a short README or API reference for each module or route. It helps new developers understand your system faster."
  },
  {
    id: 20,
    category: "Productivity",
    title: "Stay consistent with coding style",
    tip: "Follow your team's style guide for naming, formatting, and architecture. Consistency improves collaboration and reduces merge conflicts."
  }
];

module.exports = debuggingAndCleanCodeTips;
