import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import './styles/global.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import AuthPage from './pages/AuthPage';
import LecturerCourseList from './pages/LecturerCourseList';
import CourseCreationForm from './pages/CourseCreationForm';
import LecturerCourseDetail from './pages/LecturerCourseDetail';
import StudentCourseList from './pages/StudentCourseList';
import StudentCourseDetail from './pages/StudentCourseDetail';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return element;
};

const AppLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
                {children}
            </main>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Auth page without navbar */}
                    <Route path="/auth" element={<AuthPage />} />
                    
                    {/* All other routes with navbar */}
                    <Route path="/*" element={
                        <AppLayout>
                            <Routes>
                                <Route path="/" element={<Home />} />

                                {/* Lecturer Routes */}
                                <Route 
                                    path="/lecturer/courses" 
                                    element={
                                        <ProtectedRoute 
                                            element={<LecturerCourseList />} 
                                            allowedRoles={['lecturer']} 
                                        />
                                    } 
                                />
                                <Route 
                                    path="/lecturer/courses/new" 
                                    element={
                                        <ProtectedRoute 
                                            element={<CourseCreationForm />} 
                                            allowedRoles={['lecturer']} 
                                        />
                                    } 
                                />
                                <Route 
                                    path="/lecturer/courses/:id" 
                                    element={
                                        <ProtectedRoute 
                                            element={<LecturerCourseDetail />} 
                                            allowedRoles={['lecturer']} 
                                        />
                                    } 
                                />

                                {/* Student Routes */}
                                <Route 
                                    path="/student/courses" 
                                    element={
                                        <ProtectedRoute 
                                            element={<StudentCourseList />} 
                                            allowedRoles={['student']} 
                                        />
                                    } 
                                />
                                <Route 
                                    path="/student/courses/:id" 
                                    element={
                                        <ProtectedRoute 
                                            element={<StudentCourseDetail />} 
                                            allowedRoles={['student']} 
                                        />
                                    } 
                                />

                                <Route path="*" element={
                                    <div className="container py-12 text-center">
                                        <h1 className="text-4xl font-bold text-primary mb-4">404 - Page Not Found</h1>
                                        <p className="text-secondary mb-6">The page you're looking for doesn't exist.</p>
                                        <a href="/" className="btn btn-primary">Go Back Home</a>
                                    </div>
                                } />
                            </Routes>
                        </AppLayout>
                    } />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
