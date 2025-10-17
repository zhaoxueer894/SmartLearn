import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

const StudentCourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCourseDetails();
        fetchAnnouncements();
        fetchQuizzes();
    }, [id]);

    const fetchCourseDetails = async () => {
        try {
            setIsLoading(true);
            // Mock course data for demo
            setCourse({
                id: id,
                courseCode: "CS101",
                courseName: "Introduction to Computer Science",
                description: "Learn the fundamentals of computer science and programming. This course covers basic programming concepts, data structures, and algorithms.",
                lecturer: "Dr. Smith",
                semester: "Fall 2024",
                credits: 3,
                studentsCount: 45
            });
        } catch (error) {
            console.error("Error fetching course details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAnnouncements = async () => {
        try {
            const response = await api.get(`/courses/${id}/announcements`);
            setAnnouncements(response.data);
        } catch (error) {
            console.error("Error fetching announcements:", error);
            // Mock data for demo
            setAnnouncements([
                {
                    id: 1,
                    title: "Welcome to the Course!",
                    content: "Welcome to Introduction to Computer Science. Please review the syllabus and prepare for our first class.",
                    postedAt: new Date().toISOString(),
                    priority: "high"
                },
                {
                    id: 2,
                    title: "Assignment 1 Due Date",
                    content: "Don't forget that Assignment 1 is due next Friday at 11:59 PM. Submit your solutions via the course portal.",
                    postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                    priority: "medium"
                }
            ]);
        }
    };

    const fetchQuizzes = async () => {
        try {
            const response = await api.get(`/courses/${id}/quizzes`);
            setQuizzes(response.data);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
            // Mock data for demo
            setQuizzes([
                {
                    id: 1,
                    title: "Variables and Data Types Quiz",
                    description: "Test your understanding of basic programming concepts including variables, data types, and operators.",
                    dueDate: "2024-12-20",
                    questions: 10,
                    timeLimit: 30,
                    status: "available"
                },
                {
                    id: 2,
                    title: "Control Structures Quiz",
                    description: "Quiz covering if statements, loops, and conditional logic in programming.",
                    dueDate: "2024-12-25",
                    questions: 15,
                    timeLimit: 45,
                    status: "upcoming"
                }
            ]);
        }
    };

    const handleParticipateQuiz = async (quizId) => {
        try {
            const response = await api.post(`/quizzes/${quizId}/submit`, { status: 'completed' });
            alert(response.data); // Show the placeholder message
        } catch (error) {
            console.error("Error participating in quiz:", error);
            alert('Quiz participation feature coming soon!');
        }
    };

    if (isLoading) {
        return (
            <div className="container py-8">
                <div className="flex items-center justify-center min-h-96">
                    <div className="text-center">
                        <div className="w-8 h-8 border-2 border-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-secondary">Loading course details...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-8">
            {/* Header with breadcrumb */}
            <div className="mb-6">
                <nav className="flex items-center text-sm text-light mb-4" aria-label="Breadcrumb">
                    <Link to="/student/courses" className="hover:text-primary">My Courses</Link>
                    <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-primary">{course?.courseCode}</span>
                </nav>
                
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-primary mb-2">
                            {course?.courseCode} - {course?.courseName}
                        </h1>
                        <p className="text-secondary mb-4">{course?.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-secondary">Instructor: {course?.lecturer}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-secondary">{course?.semester}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <span className="text-secondary">{course?.credits} Credits</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:w-64">
                        <div className="card p-6 text-center">
                            <div className="text-2xl font-bold text-red mb-1">{course?.studentsCount}</div>
                            <div className="text-sm text-secondary">Students Enrolled</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Announcements Section */}
                <div className="card">
                    <div className="border-b border-gray-200 p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-light rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-primary">Announcements</h2>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        {announcements.length > 0 ? (
                            <div className="space-y-4">
                                {announcements.map(announcement => (
                                    <div key={announcement.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-medium text-primary">{announcement.title}</h3>
                                            {announcement.priority === 'high' && (
                                                <span className="px-2 py-1 text-xs bg-red-light text-red rounded-full">High</span>
                                            )}
                                        </div>
                                        <p className="text-secondary text-sm mb-3">{announcement.content}</p>
                                        <p className="text-xs text-light">
                                            Posted: {new Date(announcement.postedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <svg className="w-12 h-12 text-light mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                                <p className="text-secondary">No announcements yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quizzes Section */}
                <div className="card">
                    <div className="border-b border-gray-200 p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-light rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-primary">Quizzes & Assignments</h2>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        {quizzes.length > 0 ? (
                            <div className="space-y-4">
                                {quizzes.map(quiz => (
                                    <div key={quiz.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-medium text-primary">{quiz.title}</h3>
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                quiz.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {quiz.status === 'available' ? 'Available' : 'Upcoming'}
                                            </span>
                                        </div>
                                        <p className="text-secondary text-sm mb-3">{quiz.description}</p>
                                        
                                        <div className="flex flex-wrap gap-4 text-xs text-light mb-4">
                                            <span>📝 {quiz.questions} questions</span>
                                            <span>⏱️ {quiz.timeLimit} minutes</span>
                                            <span>📅 Due: {new Date(quiz.dueDate).toLocaleDateString()}</span>
                                        </div>
                                        
                                        <button 
                                            onClick={() => handleParticipateQuiz(quiz.id)}
                                            disabled={quiz.status !== 'available'}
                                            className={`btn w-full ${quiz.status === 'available' ? 'btn-primary' : 'btn-outline opacity-50 cursor-not-allowed'}`}
                                        >
                                            {quiz.status === 'available' ? 'Start Quiz' : 'Coming Soon'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <svg className="w-12 h-12 text-light mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-secondary">No quizzes available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentCourseDetail;
