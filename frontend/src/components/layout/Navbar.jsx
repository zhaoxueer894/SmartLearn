import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const { isAuthenticated, isLecturer, isStudent, logout, user } = useAuth();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white border-b border-gray shadow-sm sticky top-0 z-50">
            <div className="container">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                        <div className="w-8 h-8 bg-red rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">SL</span>
                        </div>
                        SmartLearn
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link 
                            to="/" 
                            className={`nav-link ${isActive('/') ? 'active' : ''}`}
                        >
                            Home
                        </Link>
                        
                        {isLecturer && (
                            <Link 
                                to="/lecturer/courses" 
                                className={`nav-link ${isActive('/lecturer/courses') ? 'active' : ''}`}
                            >
                                My Courses
                            </Link>
                        )}
                        
                        {isStudent && (
                            <Link 
                                to="/student/courses" 
                                className={`nav-link ${isActive('/student/courses') ? 'active' : ''}`}
                            >
                                My Courses
                            </Link>
                        )}
                    </div>

                    {/* Auth Section */}
                    <div className="hidden md:flex items-center gap-4">
                        {!isAuthenticated ? (
                            <Link to="/auth" className="btn btn-primary">
                                Sign In
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-medium text-secondary">
                                            {user?.username?.charAt(0)?.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium text-primary">{user?.username}</div>
                                        <div className="text-xs text-secondary capitalize">{user?.role}</div>
                                    </div>
                                </div>
                                <button 
                                    onClick={logout} 
                                    className="btn btn-ghost text-sm"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray">
                        <div className="flex flex-col gap-2">
                            <Link 
                                to="/" 
                                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            
                            {isLecturer && (
                                <Link 
                                    to="/lecturer/courses" 
                                    className={`nav-link ${isActive('/lecturer/courses') ? 'active' : ''}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    My Courses
                                </Link>
                            )}
                            
                            {isStudent && (
                                <Link 
                                    to="/student/courses" 
                                    className={`nav-link ${isActive('/student/courses') ? 'active' : ''}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    My Courses
                                </Link>
                            )}

                            <div className="border-t border-gray mt-2 pt-2">
                                {!isAuthenticated ? (
                                    <Link 
                                        to="/auth" 
                                        className="btn btn-primary w-full"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 p-2">
                                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium text-secondary">
                                                    {user?.username?.charAt(0)?.toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="text-sm">
                                                <div className="font-medium text-primary">{user?.username}</div>
                                                <div className="text-xs text-secondary capitalize">{user?.role}</div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                logout();
                                                setIsMobileMenuOpen(false);
                                            }} 
                                            className="btn btn-secondary w-full"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
