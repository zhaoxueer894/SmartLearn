import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import Home from './components/layout/Home';
import AiTools from './pages/AiTools';
import WordCloud from './pages/WordCloud';
import LecturerCourseList from './pages/LecturerCourseList';
import StudentCourseList from './pages/StudentCourseList';
import CourseCreationForm from './pages/CourseCreationForm';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      {/* Authentication Page */}
      <Route path="/auth" element={isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />} />
      
      {/* Protected Home Page */}
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      
      {/* Tool Pages */}
      <Route path="/ai-tools" element={<ProtectedRoute><AiTools /></ProtectedRoute>} />
      <Route path="/word-cloud" element={<ProtectedRoute><WordCloud /></ProtectedRoute>} />
      
      {/* Course Related Pages */}
      <Route path="/courses" element={<ProtectedRoute><LecturerCourseList /></ProtectedRoute>} />
      <Route path="/student/courses" element={<ProtectedRoute><StudentCourseList /></ProtectedRoute>} />
      <Route path="/courses/create" element={<ProtectedRoute><CourseCreationForm /></ProtectedRoute>} />
      
      {/* 404 Page */}
      <Route path="*" element={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
            <p className="text-secondary mb-6">Page not found</p>
            <a href="/" className="btn btn-primary">Back to Home</a>
          </div>
        </div>
      } />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
