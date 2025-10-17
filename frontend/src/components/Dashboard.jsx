import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

// 内容组件
const OverviewContent = ({ user, isLecturer, isStudent }) => (
    <div className="p-6">
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">Quick Stats</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-secondary">Total Courses:</span>
                            <span className="font-semibold">12</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-secondary">Active Students:</span>
                            <span className="font-semibold">284</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-secondary">Completed Quizzes:</span>
                            <span className="font-semibold">45</span>
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">Recent Activity</h3>
                    <div className="space-y-2 text-sm">
                        <div className="text-secondary">New student enrolled in "React Basics"</div>
                        <div className="text-secondary">Quiz completed: "JavaScript Fundamentals"</div>
                        <div className="text-secondary">New course created: "Advanced CSS"</div>
                    </div>
                </div>

                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">Quick Actions</h3>
                    <div className="space-y-2">
                        {isLecturer && (
                            <>
                                <Link to="/lecturer/courses" className="btn btn-sm btn-primary w-full">
                                    Create New Course
                                </Link>
                                <button className="btn btn-sm btn-secondary w-full">
                                    View Reports
                                </button>
                            </>
                        )}
                        {isStudent && (
                            <>
                                <Link to="/student/courses" className="btn btn-sm btn-primary w-full">
                                    Browse Courses
                                </Link>
                                <button className="btn btn-sm btn-secondary w-full">
                                    Take Quiz
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const CoursesContent = ({ user, isLecturer, isStudent }) => (
    <div className="p-6">
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">
                {isLecturer ? 'Course Management' : 'My Courses'}
            </h1>
            
            <div className="mb-6">
                {isLecturer && (
                    <button className="btn btn-primary">Create New Course</button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card p-6 card-hover">
                    <h3 className="text-lg font-semibold text-primary mb-2">React Fundamentals</h3>
                    <p className="text-secondary mb-4">Learn the basics of React development</p>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-secondary">24 students</span>
                        <button className="btn btn-sm btn-primary">View</button>
                    </div>
                </div>

                <div className="card p-6 card-hover">
                    <h3 className="text-lg font-semibold text-primary mb-2">JavaScript Advanced</h3>
                    <p className="text-secondary mb-4">Advanced JavaScript concepts and patterns</p>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-secondary">18 students</span>
                        <button className="btn btn-sm btn-primary">View</button>
                    </div>
                </div>

                <div className="card p-6 card-hover">
                    <h3 className="text-lg font-semibold text-primary mb-2">CSS Mastery</h3>
                    <p className="text-secondary mb-4">Master modern CSS techniques</p>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-secondary">32 students</span>
                        <button className="btn btn-sm btn-primary">View</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const QuizzesContent = ({ user, isLecturer }) => (
    <div className="p-6">
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">Interactive Quizzes</h1>
            
            <div className="mb-6">
                {isLecturer && (
                    <button className="btn btn-primary">Create New Quiz</button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">React Components Quiz</h3>
                    <p className="text-secondary mb-4">Test your knowledge of React components</p>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-secondary">15 questions</span>
                        <button className="btn btn-sm btn-primary">Take Quiz</button>
                    </div>
                </div>

                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">JavaScript Basics</h3>
                    <p className="text-secondary mb-4">Fundamental JavaScript concepts</p>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-secondary">20 questions</span>
                        <button className="btn btn-sm btn-primary">Take Quiz</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const AIToolsContent = () => (
    <div className="p-6">
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">AI-Powered Tools</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">Question Generator</h3>
                    <p className="text-secondary mb-4">Generate quiz questions automatically using AI</p>
                    <button className="btn btn-primary">Use Tool</button>
                </div>

                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">Content Analyzer</h3>
                    <p className="text-secondary mb-4">Analyze student responses and provide insights</p>
                    <button className="btn btn-primary">Use Tool</button>
                </div>
            </div>
        </div>
    </div>
);

const EngagementContent = () => (
    <div className="p-6">
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">Student Engagement</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">Live Polls</h3>
                    <p className="text-secondary mb-4">Create interactive polls for real-time engagement</p>
                    <button className="btn btn-primary">Create Poll</button>
                </div>

                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">Discussion Forums</h3>
                    <p className="text-secondary mb-4">Facilitate student discussions and Q&A</p>
                    <button className="btn btn-primary">View Forums</button>
                </div>
            </div>
        </div>
    </div>
);

const AnalyticsContent = () => (
    <div className="p-6">
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">Analytics & Reports</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">Student Performance</h3>
                    <p className="text-secondary mb-4">Track individual and class performance</p>
                    <button className="btn btn-primary">View Report</button>
                </div>

                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">Course Analytics</h3>
                    <p className="text-secondary mb-4">Analyze course completion rates and engagement</p>
                    <button className="btn btn-primary">View Report</button>
                </div>

                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">Quiz Results</h3>
                    <p className="text-secondary mb-4">Detailed quiz performance analytics</p>
                    <button className="btn btn-primary">View Report</button>
                </div>
            </div>
        </div>
    </div>
);

const WordCloudContent = () => (
    <div className="p-6">
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">Word Cloud Activities</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">Create Word Cloud</h3>
                    <p className="text-secondary mb-4">Collect student responses and visualize as word cloud</p>
                    <button className="btn btn-primary">Create Activity</button>
                </div>

                <div className="card p-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">Recent Word Clouds</h3>
                    <p className="text-secondary mb-4">View and manage your word cloud activities</p>
                    <button className="btn btn-primary">View All</button>
                </div>
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const { user, isAuthenticated, isLecturer, isStudent } = useAuth();
    const [selectedModule, setSelectedModule] = useState('overview');

    // 定义模块
    const modules = [
        {
            id: 'overview',
            name: 'Overview',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            roles: ['student', 'lecturer']
        },
        {
            id: 'courses',
            name: isLecturer ? 'Course Management' : 'My Courses',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            roles: ['student', 'lecturer']
        },
        {
            id: 'quizzes',
            name: 'Interactive Quizzes',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            roles: ['student', 'lecturer']
        },
        {
            id: 'ai-tools',
            name: 'AI-Powered Tools',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            roles: ['lecturer']
        },
        {
            id: 'engagement',
            name: 'Student Engagement',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            roles: ['lecturer']
        },
        {
            id: 'analytics',
            name: 'Analytics & Reports',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            roles: ['lecturer']
        },
        {
            id: 'wordcloud',
            name: 'Word Cloud Activities',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
            ),
            roles: ['lecturer']
        }
    ];

    // 过滤模块根据用户角色
    const filteredModules = modules.filter(module => 
        module.roles.includes(user?.role)
    );

    // 渲染右侧内容
    const renderContent = () => {
        switch (selectedModule) {
            case 'overview':
                return <OverviewContent user={user} isLecturer={isLecturer} isStudent={isStudent} />;
            case 'courses':
                return <CoursesContent user={user} isLecturer={isLecturer} isStudent={isStudent} />;
            case 'quizzes':
                return <QuizzesContent user={user} isLecturer={isLecturer} />;
            case 'ai-tools':
                return <AIToolsContent />;
            case 'engagement':
                return <EngagementContent />;
            case 'analytics':
                return <AnalyticsContent />;
            case 'wordcloud':
                return <WordCloudContent />;
            default:
                return <OverviewContent user={user} isLecturer={isLecturer} isStudent={isStudent} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* 左侧导航栏 */}
            <div className="w-64 bg-white shadow-md flex-shrink-0">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-primary">
                        Dashboard
                    </h2>
                    <p className="text-sm text-secondary">
                        Welcome back, {user?.username}
                    </p>
                </div>
                
                <nav className="p-4">
                    <ul className="space-y-2">
                        {filteredModules.map((module) => (
                            <li key={module.id}>
                                <button
                                    onClick={() => setSelectedModule(module.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                                        selectedModule === module.id
                                            ? 'bg-red text-white'
                                            : 'text-secondary hover:bg-gray-100 hover:text-primary'
                                    }`}
                                >
                                    {module.icon}
                                    <span className="font-medium">{module.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* 右侧内容区域 */}
            <div className="flex-1 overflow-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;