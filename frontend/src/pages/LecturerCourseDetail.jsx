import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

const LecturerCourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
    const [newQuiz, setNewQuiz] = useState({ title: '', description: '' });
    const [studentIdsInput, setStudentIdsInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

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
                description: "Learn the fundamentals of computer science and programming. This comprehensive course covers basic programming concepts, data structures, and algorithms.",
                semester: "Fall 2024",
                credits: 3,
                studentsCount: 45,
                enrollmentCapacity: 60,
                averageGrade: 8.5
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
                    postedAt: new Date().toISOString()
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
                    questions: 10,
                    submissions: 35
                }
            ]);
        }
    };

    const handlePostAnnouncement = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/courses/${id}/announcements`, newAnnouncement);
            setNewAnnouncement({ title: '', content: '' });
            fetchAnnouncements();
            alert('Announcement posted successfully!');
        } catch (error) {
            console.error("Error posting announcement:", error);
            alert('Announcement posting feature coming soon!');
        }
    };

    const handleCreateQuiz = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/courses/${id}/quizzes`, newQuiz);
            setNewQuiz({ title: '', description: '' });
            fetchQuizzes();
            alert('Quiz created successfully!');
        } catch (error) {
            console.error("Error creating quiz:", error);
            alert('Quiz creation feature coming soon!');
        }
    };

    const handleImportStudents = async (e) => {
        e.preventDefault();
        try {
            const studentIds = studentIdsInput.split(',').map(s => s.trim()).filter(s => s).map(Number);
            await api.post(`/courses/${id}/enrollments`, { student_ids: studentIds });
            setStudentIdsInput('');
            alert('Students enrolled successfully!');
        } catch (error) {
            console.error("Error importing students:", error);
            alert('Student enrollment feature coming soon!');
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
                    <Link to="/lecturer/courses" className="hover:text-primary">My Courses</Link>
                    <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-primary">{course?.courseCode}</span>
                </nav>
                
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-primary mb-2">
                            {course?.courseCode} - {course?.courseName}
                        </h1>
                        <p className="text-secondary mb-4">{course?.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm">
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
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="card p-6 text-center">
                        <div className="text-2xl font-bold text-red mb-1">{course?.studentsCount}</div>
                        <div className="text-sm text-secondary">Enrolled Students</div>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="text-2xl font-bold text-red mb-1">{course?.enrollmentCapacity}</div>
                        <div className="text-sm text-secondary">Capacity</div>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="text-2xl font-bold text-red mb-1">{course?.averageGrade}</div>
                        <div className="text-sm text-secondary">Average Grade</div>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="text-2xl font-bold text-red mb-1">{announcements.length + quizzes.length}</div>
                        <div className="text-sm text-secondary">Total Activities</div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8">
                        {[
                            { id: 'overview', name: 'Overview', icon: '📊' },
                            { id: 'announcements', name: 'Announcements', icon: '📢' },
                            { id: 'quizzes', name: 'Quizzes & Assignments', icon: '📝' },
                            { id: 'students', name: 'Student Management', icon: '👥' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === tab.id
                                        ? 'border-red text-red'
                                        : 'border-transparent text-light hover:text-secondary hover:border-gray-300'
                                }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="card">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-primary">Recent Announcements</h2>
                        </div>
                        <div className="p-6">
                            {announcements.slice(0, 3).map(announcement => (
                                <div key={announcement.id} className="mb-4 last:mb-0">
                                    <h3 className="font-medium text-primary mb-1">{announcement.title}</h3>
                                    <p className="text-sm text-secondary line-clamp-2">{announcement.content}</p>
                                </div>
                            ))}
                            <Link to="#" onClick={() => setActiveTab('announcements')} className="text-red text-sm hover:underline">
                                View all announcements →
                            </Link>
                        </div>
                    </div>

                    <div className="card">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-primary">Recent Quizzes</h2>
                        </div>
                        <div className="p-6">
                            {quizzes.slice(0, 3).map(quiz => (
                                <div key={quiz.id} className="mb-4 last:mb-0">
                                    <h3 className="font-medium text-primary mb-1">{quiz.title}</h3>
                                    <p className="text-sm text-secondary line-clamp-2">{quiz.description}</p>
                                </div>
                            ))}
                            <Link to="#" onClick={() => setActiveTab('quizzes')} className="text-red text-sm hover:underline">
                                View all quizzes →
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'announcements' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Post New Announcement */}
                    <div className="card">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-primary">Post New Announcement</h2>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handlePostAnnouncement} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">Title</label>
                                    <input
                                        type="text"
                                        placeholder="Enter announcement title"
                                        value={newAnnouncement.title}
                                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                                        required
                                        className="input w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">Content</label>
                                    <textarea
                                        placeholder="Enter announcement content"
                                        value={newAnnouncement.content}
                                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                                        required
                                        rows={4}
                                        className="input w-full resize-vertical"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-full">
                                    Post Announcement
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Existing Announcements */}
                    <div className="card">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-primary">Existing Announcements</h2>
                        </div>
                        <div className="p-6">
                            {announcements.length > 0 ? (
                                <div className="space-y-4">
                                    {announcements.map(announcement => (
                                        <div key={announcement.id} className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-medium text-primary mb-2">{announcement.title}</h3>
                                            <p className="text-sm text-secondary">{announcement.content}</p>
                                            <p className="text-xs text-light mt-2">
                                                Posted: {new Date(announcement.postedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-secondary text-center py-8">No announcements yet</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'quizzes' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Create New Quiz */}
                    <div className="card">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-primary">Create New Quiz</h2>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleCreateQuiz} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">Title</label>
                                    <input
                                        type="text"
                                        placeholder="Enter quiz title"
                                        value={newQuiz.title}
                                        onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                                        required
                                        className="input w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">Description</label>
                                    <textarea
                                        placeholder="Enter quiz description"
                                        value={newQuiz.description}
                                        onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                                        required
                                        rows={4}
                                        className="input w-full resize-vertical"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-full">
                                    Create Quiz
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Existing Quizzes */}
                    <div className="card">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-primary">Existing Quizzes</h2>
                        </div>
                        <div className="p-6">
                            {quizzes.length > 0 ? (
                                <div className="space-y-4">
                                    {quizzes.map(quiz => (
                                        <div key={quiz.id} className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-medium text-primary mb-2">{quiz.title}</h3>
                                            <p className="text-sm text-secondary mb-3">{quiz.description}</p>
                                            <div className="flex justify-between text-xs text-light">
                                                <span>Questions: {quiz.questions || 'N/A'}</span>
                                                <span>Submissions: {quiz.submissions || 0}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-secondary text-center py-8">No quizzes yet</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'students' && (
                <div className="max-w-2xl">
                    <div className="card">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-primary">Student Enrollment</h2>
                            <p className="text-sm text-secondary mt-1">Add students to your course by entering their IDs</p>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleImportStudents} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Student IDs (comma-separated)
                                    </label>
                                    <textarea
                                        placeholder="Enter student IDs separated by commas (e.g., 1, 2, 3)"
                                        value={studentIdsInput}
                                        onChange={(e) => setStudentIdsInput(e.target.value)}
                                        required
                                        rows={3}
                                        className="input w-full resize-vertical"
                                    />
                                    <p className="text-xs text-light mt-1">
                                        Note: In the demo, enter numeric IDs. In production, this would support student ID formats.
                                    </p>
                                </div>
                                <button type="submit" className="btn btn-primary w-full">
                                    Enroll Students
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LecturerCourseDetail;
