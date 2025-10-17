import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

export default function CourseList() {
    const { user } = useAuth();
    const [courses] = useState([
        {
            id: 1,
            courseCode: "CS101",
            courseName: "Introduction to Computer Science",
            description: "Learn the fundamentals of computer science and programming.",
            studentsCount: 45,
            semester: "Fall 2024",
            credits: 3
        },
        {
            id: 2,
            courseCode: "MATH201",
            courseName: "Calculus II",
            description: "Advanced calculus concepts and applications.",
            studentsCount: 32,
            semester: "Fall 2024",
            credits: 4
        },
        {
            id: 3,
            courseCode: "ENG102",
            courseName: "Academic Writing",
            description: "Develop advanced writing skills for academic contexts.",
            studentsCount: 28,
            semester: "Fall 2024",
            credits: 3
        }
    ]);

    return (
        <div className="container py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary mb-2">Course Catalog</h1>
                <p className="text-secondary">
                    Browse all available courses for the current semester.
                </p>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card p-6 text-center">
                    <div className="text-3xl font-bold text-red mb-2">{courses.length}</div>
                    <div className="text-sm text-secondary">Available Courses</div>
                </div>
                <div className="card p-6 text-center">
                    <div className="text-3xl font-bold text-red mb-2">
                        {courses.reduce((total, course) => total + course.studentsCount, 0)}
                    </div>
                    <div className="text-sm text-secondary">Total Enrollments</div>
                </div>
                <div className="card p-6 text-center">
                    <div className="text-3xl font-bold text-red mb-2">Fall 2024</div>
                    <div className="text-sm text-secondary">Current Semester</div>
                </div>
            </div>

            {/* Course Grid */}
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
                                {course.description}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-primary">{course.studentsCount}</div>
                                    <div className="text-xs text-light">Students</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-primary">{course.credits}</div>
                                    <div className="text-xs text-light">Credits</div>
                                </div>
                            </div>
                            
                            <div className="text-xs text-light mb-4">
                                Semester: {course.semester}
                            </div>
                            
                            <div className="flex gap-2">
                                {user?.role === 'student' ? (
                                    <Link 
                                        to={`/student/courses/${course.id}`} 
                                        className="btn btn-primary flex-1 text-sm"
                                    >
                                        View Course
                                    </Link>
                                ) : user?.role === 'lecturer' ? (
                                    <Link 
                                        to={`/lecturer/courses/${course.id}`} 
                                        className="btn btn-primary flex-1 text-sm"
                                    >
                                        Manage Course
                                    </Link>
                                ) : (
                                    <button className="btn btn-outline flex-1 text-sm" disabled>
                                        Login to Access
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Call to Action */}
            {!user && (
                <div className="text-center mt-12 py-8">
                    <h2 className="text-xl font-semibold text-primary mb-4">
                        Ready to start learning?
                    </h2>
                    <p className="text-secondary mb-6">
                        Sign up today to access all courses and start your educational journey.
                    </p>
                    <Link to="/auth" className="btn btn-primary">
                        Get Started
                    </Link>
                </div>
            )}
        </div>
    );
}
