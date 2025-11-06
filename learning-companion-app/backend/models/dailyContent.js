// models/dailyContent.js

const dailyContent = [
  {
    id: 1,
    type: 'Tip',
    content: 'Practice coding every day, even if just for 20 minutes.',
    date: '2025-11-03',
    challenge: 'Solve one coding problem daily on LeetCode or HackerRank.',
    tutorial: 'https://www.learnjavascript.online/',
    motivation: 'Consistency is key. Small daily improvements compound over time.',
  },
  {
    id: 2,
    type: 'Challenge',
    content: 'Write a function that reverses a string.',
    date: '2025-11-03',
    challenge: 'Implement the reverse function without using built-in methods.',
    tutorial: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split',
    motivation: 'Understand string manipulation deeply—it’s a common interview problem.',
  },
  {
    id: 3,
    type: 'Tip',
    content: 'Break big problems into smaller, manageable pieces.',
    date: '2025-11-02',
    challenge: 'Take a large algorithm problem and divide it into steps.',
    tutorial: 'https://refactoring.guru/refactoring/techniques',
    motivation: 'Smaller tasks are easier to debug and test.',
  },
  {
    id: 4,
    type: 'Challenge',
    content: 'Build a to-do list app using your favorite language.',
    date: '2025-11-02',
    challenge: 'Add, edit, and delete tasks with local storage or a database.',
    tutorial: 'https://www.freecodecamp.org/news/how-to-build-a-todo-app/',
    motivation: 'Hands-on projects solidify your learning faster than tutorials alone.',
  },
  {
    id: 5,
    type: 'Tip',
    content: 'Read other people’s code to learn new techniques.',
    date: '2025-11-01',
    challenge: 'Pick an open-source project and understand one module of it.',
    tutorial: 'https://github.com/trending',
    motivation: 'You’ll learn idiomatic coding patterns and best practices.',
  },
];

module.exports = dailyContent;
