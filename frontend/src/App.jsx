import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import AuthPage from './pages/AuthPage';
import LecturerCourseList from './pages/LecturerCourseList';
import CourseCreationForm from './pages/CourseCreationForm';
import LecturerCourseDetail from './pages/LecturerCourseDetail';
import StudentCourseList from './pages/StudentCourseList';
import StudentCourseDetail from './pages/StudentCourseDetail';

// Placeholder for the existing minimal demo component
const Home = () => {
    const { user, logout } = useAuth();
    return (
        <div style={{ padding: '20px' }}>
            <h1>Welcome to SmartLearn (PolyU Version)</h1>
            {user ? (
                <div>
                    <p>Logged in as: <strong>{user.username}</strong> ({user.role})</p>
                    <button onClick={logout} style={{ padding: '10px', backgroundColor: '#d9534f', color: 'white', border: 'none', cursor: 'pointer' }}>Logout</button>
                </div>
            ) : (
                <p>Please login or register.</p>
            )}
        </div>
    );
};

const Navbar = () => {
    const { isAuthenticated, isLecturer, isStudent, logout } = useAuth();

    return (
        <nav style={{ backgroundColor: '#333', padding: '10px', color: 'white' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
                    {isLecturer && (
                        <li><Link to="/lecturer/courses" style={{ color: 'white', textDecoration: 'none' }}>My Courses (L)</Link></li>
                    )}
                    {isStudent && (
                        <li><Link to="/student/courses" style={{ color: 'white', textDecoration: 'none' }}>My Courses (S)</Link></li>
                    )}
                </div>
                <div>
                    {!isAuthenticated ? (
                        <li><Link to="/auth" style={{ color: 'white', textDecoration: 'none' }}>Login/Register</Link></li>
                    ) : (
                        <li><button onClick={logout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button></li>
                    )}
                </div>
            </ul>
        </nav>
    );
};

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />; // Redirect to home if role is not allowed
    }

    return element;
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<AuthPage />} />

                    {/* Lecturer Routes */}
                    <Route path="/lecturer/courses" element={<ProtectedRoute element={<LecturerCourseList />} allowedRoles={['lecturer']} />} />
                    <Route path="/lecturer/courses/new" element={<ProtectedRoute element={<CourseCreationForm />} allowedRoles={['lecturer']} />} />
                    <Route path="/lecturer/courses/:id" element={<ProtectedRoute element={<LecturerCourseDetail />} allowedRoles={['lecturer']} />} />

                    {/* Student Routes */}
                    <Route path="/student/courses" element={<ProtectedRoute element={<StudentCourseList />} allowedRoles={['student']} />} />
                    <Route path="/student/courses/:id" element={<ProtectedRoute element={<StudentCourseDetail />} allowedRoles={['student']} />} />

                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
