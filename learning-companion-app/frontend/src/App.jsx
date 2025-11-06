import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { AssessmentProvider, AssessmentContext } from "./context/AssessmentContext";
import NavBar from "./components/NavBar";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import EducationPage from "./pages/EducationPage";
import BookmarksPage from "./pages/BookmarksPage";
import DebugTipsPage from "./pages/DebugTipsPage";
import DailyContentPage from "./pages/DailyContentPage";
import CodeReviewPage from "./pages/CodeReviewPage";
import ProjectManagementPage from "./pages/ProjectManagementPage";
import ProjectGuides from "./pages/ProjectGuides";
import PracticesPage from "./pages/PracticesPage";
import MethodologiesPage from "./pages/MethodologiesPage";
import ToolsPage from "./pages/ToolsPage";
import AITutor from "./pages/AITutor";
import Profile from "./pages/Profile";

// Quiz pages
import QuizStartPage from "./pages/QuizStartPage";
import QuizPage from "./pages/QuizPage";

// ✅ Language pages (in src/pages/education_homepage)
import LanguageLayout from "./pages/education_homepage/LanguageLayout";
import PythonPage from "./pages/education_homepage/PythonPage";
import JavaScriptPage from "./pages/education_homepage/JavaScriptPage";
import JavaPage from "./pages/education_homepage/JavaPage";
import SQLPage from "./pages/education_homepage/SQLPage";
import CppPage from "./pages/education_homepage/CppPage";
import CsharpPage from "./pages/education_homepage/CsharpPage";

// ✅ Theoretical beginner examples (already in your code)
import CppTheoreticalBeginner from "./pages/education_homepage/lesson/CppTheoreticalBeginner.jsx";
import PythonTheoreticalBeginner from "./pages/education_homepage/lesson/PythonTheoreticalBeginner.jsx";
import JavaTheoreticalBeginner from "./pages/education_homepage/lesson/JavaTheoreticalBeginner.jsx";
import JavaScriptTheoreticalBeginner from "./pages/education_homepage/lesson/JavascriptTheoreticalBeginner.jsx";

// ✅ NEW: Python beginner pages for other learning styles
import PythonHandsOnBeginner from "./pages/education_homepage/lesson/PythonHandsOnBeginner.jsx";
import PythonVisualBeginner from "./pages/education_homepage/lesson/PythonVisualBeginner.jsx";
import PythonInteractiveBeginner from "./pages/education_homepage/lesson/PythonInteractiveBeginner.jsx";
import LearningAssessmentPage from "./pages/LearningAssessmentPage";

function AppRoutes() {
  const { user } = useContext(AuthContext);
  const { hasCompletedAssessment } = useContext(AssessmentContext);

  // If not logged in → restrict access
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Logged-in user → full app
  return (
    <>
      <NavBar />
      <Routes>
        {/* Home & general pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />

        {/* Quiz routes */}
        <Route path="/quizzes" element={<QuizStartPage />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />

        {/* Education */}
        <Route path="/education" element={<EducationPage />} />
        {/* ✅ Specific language routes */}
        <Route path="/education/python" element={<PythonPage />} />
        <Route path="/education/javascript" element={<JavaScriptPage />} />
        <Route path="/education/java" element={<JavaPage />} />
        <Route path="/education/sql" element={<SQLPage />} />
        <Route path="/education/cpp" element={<CppPage />} />
        <Route path="/education/csharp" element={<CsharpPage />} />
        {/* ✅ Dynamic fallback for any other language */}
        <Route path="/education/:language" element={<LanguageLayout />} />

        {/* Other learning sections */}
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/debug-tips" element={<DebugTipsPage />} />
        <Route path="/daily-content" element={<DailyContentPage />} />
        <Route path="/code-review" element={<CodeReviewPage />} />
        <Route path="/project-management" element={<ProjectManagementPage />} />
        <Route path="/project-guides" element={<ProjectGuides />} />
        <Route path="/practices" element={<PracticesPage />} />
        <Route path="/methodologies" element={<MethodologiesPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/ai-tutor" element={<AITutor />} />

        
        <Route path="/lessons/python/visual/beginner" element={<div>Visual Beginner Lesson (coming later)</div>} />
        <Route path="/lessons/python/hands_on/beginner" element={<div>Hands-On Beginner Lesson (coming later)</div>} />
        <Route path="/lessons/python/theoretical/beginner" element={<div>Theory Beginner Lesson (coming later)</div>} />
        <Route path="/lessons/python/interactive/beginner" element={<div>Interactive Beginner Lesson (coming later)</div>} />
        <Route path="/lessons/javascript/visual/beginner" element={<div>JS Visual Beginner (coming later)</div>} />
        <Route path="/lessons/javascript/hands_on/beginner" element={<div>JS Hands-On Beginner (coming later)</div>} />
        <Route path="/lessons/javascript/theoretical/beginner" element={<div>JS Theory Beginner (coming later)</div>} />
        <Route path="/lessons/javascript/interactive/beginner" element={<div>JS Interactive Beginner (coming later)</div>} />
        <Route path="/lessons/java/visual/beginner" element={<div>Java Visual Beginner (coming later)</div>} />
        <Route path="/lessons/java/hands_on/beginner" element={<div>Java Hands-On Beginner (coming later)</div>} />
        <Route path="/lessons/java/theoretical/beginner" element={<div>Java Theory Beginner (coming later)</div>} />
        <Route path="/lessons/java/interactive/beginner" element={<div>Java Interactive Beginner (coming later)</div>} />
        <Route path="/lessons/cpp/visual/beginner" element={<div>C++ Visual Beginner (coming later)</div>} />
        <Route path="/lessons/cpp/hands_on/beginner" element={<div>C++ Hands-On Beginner (coming later)</div>} />
        <Route path="/lessons/cpp/theoretical/beginner" element={<div>C++ Theory Beginner (coming later)</div>} />
        <Route path="/lessons/cpp/interactive/beginner" element={<div>C++ Interactive Beginner (coming later)</div>} />
        <Route path="/lessons/sql/visual/beginner" element={<div>SQL Visual Beginner (coming later)</div>} />
        <Route path="/lessons/sql/hands_on/beginner" element={<div>SQL Hands-On Beginner (coming later)</div>} />
        <Route path="/lessons/sql/theoretical/beginner" element={<div>SQL Theory Beginner (coming later)</div>} />
        <Route path="/lessons/sql/interactive/beginner" element={<div>SQL Interactive Beginner (coming later)</div>} />
        <Route path="/lessons/csharp/visual/beginner" element={<div>C# Visual Beginner (coming later)</div>} />
        <Route path="/lessons/csharp/hands_on/beginner" element={<div>C# Hands-On Beginner (coming later)</div>} />
        <Route path="/lessons/csharp/theoretical/beginner" element={<div>C# Theory Beginner (coming later)</div>} />
        <Route path="/lessons/csharp/interactive/beginner" element={<div>C# Interactive Beginner (coming later)</div>} />

        {/* ✅ Real lesson routes in education_homepage */}
        <Route path="/education_homepage/lesson/python-theoretical-beginner" element={<PythonTheoreticalBeginner />} />
        <Route path="/education_homepage/lesson/python-hands-on-beginner" element={<PythonHandsOnBeginner />} />
        <Route path="/education_homepage/lesson/python-visual-beginner" element={<PythonVisualBeginner />} />
        <Route path="/education_homepage/lesson/python-interactive-beginner" element={<PythonInteractiveBeginner />} />

        {/* Other theoretical examples already imported */}
        <Route path="/education_homepage/lesson/cpp-theoretical-beginner" element={<CppTheoreticalBeginner />} />
        <Route path="/education_homepage/lesson/java-theoretical-beginner" element={<JavaTheoreticalBeginner />} />
        <Route path="/education_homepage/lesson/javascript-theoretical-beginner" element={<JavaScriptTheoreticalBeginner />} />

        {/* Catch-all: redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AssessmentProvider>
        <AppRoutes />
      </AssessmentProvider>
    </AuthProvider>
  );
}
