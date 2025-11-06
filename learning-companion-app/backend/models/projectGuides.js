// models/projectGuides.js
const projectGuides = [
  {
    _id: "1",
    category: "Planning",
    title: "Break the project into small, manageable tasks",
    description: "Divide your project into smaller tasks to manage workload effectively.",
    steps: [
      { step: "List all tasks", explanation: "Write down every task needed for the project." },
      { step: "Prioritize tasks", explanation: "Decide which tasks are most important or time-sensitive." },
      { step: "Assign deadlines", explanation: "Give each task a realistic deadline." }
    ]
  },
  {
    _id: "2",
    category: "Tools",
    title: "Use project management tools like Trello or Jira",
    description: "These tools help you organize and track tasks visually.",
    steps: [
      { step: "Create a board", explanation: "Set up a new project board for your tasks." },
      { step: "Add tasks", explanation: "Enter all tasks as cards with deadlines." },
      { step: "Track progress", explanation: "Move tasks to 'In Progress' or 'Done' as work progresses." }
    ]
  },
  {
    _id: "3",
    category: "Teamwork",
    title: "Hold regular check-ins to track progress",
    description: "Frequent meetings help the team stay aligned and identify blockers.",
    steps: [
      { step: "Schedule stand-ups", explanation: "Daily or weekly check-ins to review tasks." },
      { step: "Share updates", explanation: "Each team member shares progress and blockers." }
    ]
  }
];

module.exports = projectGuides;
