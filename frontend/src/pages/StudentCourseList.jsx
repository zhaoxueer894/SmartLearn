import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
// import { courseService } from '../services'; // 暂时注释掉

const StudentCourseList = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setIsLoading(true);
                // NOTE: The backend API for student courses is not fully implemented yet,
                // so we will mock the enrolled courses for this minimal demo.
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
                        lecturerId: "L001",
                        description: "Learn the fundamentals of computer science and programming.",
                        studentsCount: 45
                    },
                    {
                        id: 2,
                        courseCode: "MATH201",
                        courseName: "Calculus II",
                        lecturerId: "L002",
                        description: "Advanced calculus concepts and applications.",
                        studentsCount: 32
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
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary mb-2">My Courses</h1>
                <p className="text-secondary">
                    Welcome back, {user?.username}! Here are your enrolled courses.
                </p>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card p-6 text-center">
                    <div className="text-3xl font-bold text-red mb-2">{courses.length}</div>
                    <div className="text-sm text-secondary">Enrolled Courses</div>
                </div>
                <div className="card p-6 text-center">
                    <div className="text-3xl font-bold text-red mb-2">12</div>
                    <div className="text-sm text-secondary">Assignments Due</div>
                </div>
                <div className="card p-6 text-center">
                    <div className="text-3xl font-bold text-red mb-2">8.5</div>
                    <div className="text-sm text-secondary">Average Grade</div>
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
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                </div>
                                
                                <p className="text-sm text-secondary mb-4 line-clamp-2">
                                    {course.description || "No description available."}
                                </p>
                                
                                <div className="flex items-center justify-between text-xs text-light mb-4">
                                    <span>Lecturer: {course.lecturerId}</span>
                                    <span>{course.studentsCount || 0} students</span>
                                </div>
                                
                                <Link 
                                    to={`/student/courses/${course.id}`} 
                                    className="btn btn-primary w-full"
                                >
                                    View Course
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-primary mb-2">No courses yet</h3>
                    <p className="text-secondary mb-4">
                        You haven't enrolled in any courses yet. Contact your administrator to get enrolled.
                    </p>
                </div>
            )}
        </div>
    );
};

export default StudentCourseList;
