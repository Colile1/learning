// models/practices.js

const bestCodingPractices = [
  {
    id: 1,
    name: 'DRY (Don’t Repeat Yourself)',
    category: 'Code Quality',
    description: 'Avoid duplicating code by reusing functions, modules, or components.',
    example: 'Instead of repeating the same validation logic, create a reusable function.',
    tip: 'Always abstract repeated patterns into functions or classes.',
    level: 'Intermediate'
  },
  {
    id: 2,
    name: 'Modularization',
    category: 'Code Quality',
    description: 'Break code into small, reusable, and maintainable modules or functions.',
    example: 'Separate authentication logic into a module rather than embedding it in every route.',
    tip: 'Each module should have a single responsibility and clear interface.',
    level: 'Intermediate'
  },
  {
    id: 3,
    name: 'Code Comments',
    category: 'Documentation',
    description: 'Write meaningful comments to explain complex or non-obvious logic.',
    example: 'Explain why a particular algorithm or approach was chosen, not just what it does.',
    tip: 'Use comments to clarify intent, not to repeat code.',
    level: 'Beginner'
  },
  {
    id: 4,
    name: 'Version Control',
    category: 'Collaboration',
    description: 'Use Git or other version control systems to track changes and collaborate.',
    example: 'Create meaningful commit messages and use feature branches for new work.',
    tip: 'Commit often and pull the latest changes before starting new work.',
    level: 'Beginner'
  },
  {
    id: 5,
    name: 'Consistent Naming',
    category: 'Code Quality',
    description: 'Use clear and consistent names for variables, functions, and classes.',
    example: 'Use camelCase for variables and functions, PascalCase for components/classes.',
    tip: 'Follow your project or language-specific naming conventions strictly.',
    level: 'Beginner'
  },
  {
    id: 6,
    name: 'Error Handling',
    category: 'Error Handling',
    description: 'Properly handle exceptions and errors in your code.',
    example: 'Use try-catch blocks and provide informative error messages.',
    tip: 'Do not ignore errors; log them and provide actionable feedback.',
    level: 'Intermediate'
  },
  {
    id: 7,
    name: 'Code Reviews',
    category: 'Collaboration',
    description: 'Regularly review code with peers to maintain quality and catch bugs.',
    example: 'Use pull requests and peer reviews before merging into main branches.',
    tip: 'Focus on readability, maintainability, and security during reviews.',
    level: 'Advanced'
  },
  {
    id: 8,
    name: 'Testing',
    category: 'Code Quality',
    description: 'Write automated tests to verify your code works as expected.',
    example: 'Unit tests for functions, integration tests for APIs.',
    tip: 'Test critical paths and edge cases to avoid regressions.',
    level: 'Intermediate'
  },
  {
    id: 9,
    name: 'Documentation',
    category: 'Documentation',
    description: 'Maintain proper documentation for APIs, modules, and project setup.',
    example: 'Use README files and inline docs for functions and classes.',
    tip: 'Good documentation reduces onboarding time for new developers.',
    level: 'Beginner'
  }
];

module.exports = bestCodingPractices;
