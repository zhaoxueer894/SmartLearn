import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
// import { courseService } from '../services'; // 暂时注释掉

const LecturerCourseList = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setIsLoading(true);
                const response = await api.get(`/courses?userId=${user.id}&role=${user.role}`);
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
                // Mock data for demo
                setCourses([
                    {
                        id: 1,
                        courseCode: "CS101",
                        courseName: "Introduction to Computer Science",
                        lecturerId: user?.id || "L001",
                        description: "Learn the fundamentals of computer science and programming.",
                        studentsCount: 45,
                        assignments: 5,
                        lastActivity: "2 hours ago"
                    },
                    {
                        id: 2,
                        courseCode: "CS201",
                        courseName: "Data Structures and Algorithms",
                        lecturerId: user?.id || "L001",
                        description: "Advanced data structures and algorithmic problem solving.",
                        studentsCount: 38,
                        assignments: 7,
                        lastActivity: "1 day ago"
                    }
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchCourses();
        }
    }, [user]);

    if (isLoading) {
        return (
            <div className="container py-8">
                <div className="flex items-center justify-center min-h-96">
                    <div className="text-center">
                        <div className="w-8 h-8 border-2 border-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-secondary">Loading your courses...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-3xl font-bold text-primary mb-2">My Courses</h1>
                    <p className="text-secondary">
                        Manage your courses and track student progress, {user?.username}.
                    </p>
                </div>
                <Link 
                    to="/lecturer/courses/new" 
                    className="btn btn-primary flex items-center gap-2 self-start"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create New Course
                </Link>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="card p-6 text-center">
                    <div className="text-3xl font-bold text-red mb-2">{courses.length}</div>
                    <div className="text-sm text-secondary">Active Courses</div>
                </div>
                <div className="card p-6 text-center">
                    <div className="text-3xl font-bold text-red mb-2">
                        {courses.reduce((total, course) => total + (course.studentsCount || 0), 0)}
                    </div>
                    <div className="text-sm text-secondary">Total Students</div>
                </div>
                <div className="card p-6 text-center">
                    <div className="text-3xl font-bold text-red mb-2">
                        {courses.reduce((total, course) => total + (course.assignments || 0), 0)}
                    </div>
                    <div className="text-sm text-secondary">Total Assignments</div>
                </div>
                <div className="card p-6 text-center">
                    <div className="text-3xl font-bold text-red mb-2">95%</div>
                    <div className="text-sm text-secondary">Completion Rate</div>
                </div>
            </div>

            {/* Courses Grid */}
            {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                        <div key={course.id} className="card card-hover">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-primary mb-1">
                                            {course.courseCode}
                                        </h3>
                                        <h4 className="text-base text-secondary mb-2">
                                            {course.courseName}
                                        </h4>
                                    </div>
                                    <div className="w-12 h-12 bg-red-light rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                </div>
                                
                                <p className="text-sm text-secondary mb-4 line-clamp-2">
                                    {course.description || "No description available."}
                                </p>
                                
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-primary">{course.studentsCount || 0}</div>
                                        <div className="text-xs text-light">Students</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-primary">{course.assignments || 0}</div>
                                        <div className="text-xs text-light">Assignments</div>
                                    </div>
                                </div>
                                
                                <div className="text-xs text-light mb-4">
                                    Last activity: {course.lastActivity || "No recent activity"}
                                </div>
                                
                                <div className="flex gap-2">
                                    <Link 
                                        to={`/lecturer/courses/${course.id}`} 
                                        className="btn btn-primary flex-1 text-sm"
                                    >
                                        Manage
                                    </Link>
                                    <Link 
                                        to={`/lecturer/courses/${course.id}/analytics`} 
                                        className="btn btn-outline flex-1 text-sm"
                                    >
                                        Analytics
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-primary mb-2">No courses yet</h3>
                    <p className="text-secondary mb-4">
                        Create your first course to start teaching and managing students.
                    </p>
                    <Link 
                        to="/lecturer/courses/new" 
                        className="btn btn-primary inline-flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create New Course
                    </Link>
                </div>
            )}
        </div>
    );
};

export default LecturerCourseList;
