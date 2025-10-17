import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Home = () => {
    const { user, isAuthenticated, isLecturer, isStudent, logout } = useAuth();

    // 如果用户已登录，显示用户专属的主页
    if (isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* 顶部导航栏 */}
                <nav className="bg-white shadow-sm border-b">
                    <div className="container py-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-primary">SmartLearn</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-secondary">
                                    欢迎, {user?.username} ({isLecturer ? '教师' : '学生'})
                                </span>
                                <button
                                    onClick={logout}
                                    className="btn btn-ghost text-sm"
                                >
                                    退出登录
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* 主要内容 */}
                <div className="container py-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-4">
                            {isLecturer ? '教师工作台' : '学生学习中心'}
                        </h2>
                        <p className="text-lg text-secondary">
                            {isLecturer ? '管理您的课程和学生' : '查看您的课程和作业'}
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {isLecturer ? (
                            <>
                                <Link to="/courses" className="card p-6 card-hover cursor-pointer block">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">📚</span>
                                        <h3 className="text-xl font-semibold text-primary">课程管理</h3>
                                    </div>
                                    <p className="text-secondary">创建和管理您的课程内容</p>
                                </Link>
                                <div className="card p-6 card-hover cursor-pointer">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">👥</span>
                                        <h3 className="text-xl font-semibold text-primary">学生管理</h3>
                                    </div>
                                    <p className="text-secondary">查看学生进度和成绩</p>
                                </div>
                                <Link to="/ai-tools" className="card p-6 card-hover cursor-pointer block">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">🧠</span>
                                        <h3 className="text-xl font-semibold text-primary">AI工具</h3>
                                    </div>
                                    <p className="text-secondary">AI辅助教学和内容生成</p>
                                </Link>
                                <Link to="/word-cloud" className="card p-6 card-hover cursor-pointer block">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">☁️</span>
                                        <h3 className="text-xl font-semibold text-primary">词云活动</h3>
                                    </div>
                                    <p className="text-secondary">创建互动词云收集反馈</p>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/student/courses" className="card p-6 card-hover cursor-pointer block">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">📖</span>
                                        <h3 className="text-xl font-semibold text-primary">我的课程</h3>
                                    </div>
                                    <p className="text-secondary">查看已报名的课程</p>
                                </Link>
                                <div className="card p-6 card-hover cursor-pointer">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">📝</span>
                                        <h3 className="text-xl font-semibold text-primary">作业任务</h3>
                                    </div>
                                    <p className="text-secondary">完成课程作业和测试</p>
                                </div>
                                <Link to="/ai-tools" className="card p-6 card-hover cursor-pointer block">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">📊</span>
                                        <h3 className="text-xl font-semibold text-primary">AI工具</h3>
                                    </div>
                                    <p className="text-secondary">体验AI辅助学习功能</p>
                                </Link>
                                <Link to="/word-cloud" className="card p-6 card-hover cursor-pointer block">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">💬</span>
                                        <h3 className="text-xl font-semibold text-primary">互动活动</h3>
                                    </div>
                                    <p className="text-secondary">参与课堂互动和讨论</p>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* 用户信息卡片 */}
                    <div className="card p-4 max-w-md mx-auto mt-8">
                        <h4 className="font-semibold text-primary mb-2">账户信息</h4>
                        <div className="text-sm text-secondary space-y-1">
                            <p>用户名: {user?.username}</p>
                            <p>邮箱: {user?.email}</p>
                            <p>角色: {user?.role}</p>
                            <p>用户ID: {user?.id}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 如果用户未登录，显示欢迎页面
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-white">
                <div className="container py-12 md:py-20">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                            Welcome to{' '}
                            <span className="text-red">SmartLearn</span>
                        </h1>
                        <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
                            The #1 interactive learning and student engagement platform. 
                            Create engaging courses, manage students, and track progress all in one place.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/auth" className="btn btn-primary btn-lg">
                                Get Started Free
                            </Link>
                            <button className="btn btn-secondary btn-lg">
                                Watch Demo
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                            Everything you need to enhance learning
                        </h2>
                        <p className="text-lg text-secondary max-w-2xl mx-auto">
                            Discover powerful tools designed to make teaching and learning more engaging and effective.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Course Management */}
                        <div className="card p-6 text-center card-hover">
                            <div className="w-12 h-12 bg-red-light rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-primary mb-2">Course Management</h3>
                            <p className="text-secondary">
                                Create and organize courses with ease. Manage content, assignments, and student progress.
                            </p>
                        </div>

                        {/* Interactive Quizzes */}
                        <div className="card p-6 text-center card-hover">
                            <div className="w-12 h-12 bg-red-light rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-primary mb-2">Interactive Quizzes</h3>
                            <p className="text-secondary">
                                Engage students with interactive quizzes and real-time feedback.
                            </p>
                        </div>

                        {/* AI-Powered Tools */}
                        <div className="card p-6 text-center card-hover">
                            <div className="w-12 h-12 bg-red-light rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-primary mb-2">AI-Powered Tools</h3>
                            <p className="text-secondary">
                                Leverage AI to generate questions, analyze responses, and enhance learning outcomes.
                            </p>
                        </div>

                        {/* Student Engagement */}
                        <div className="card p-6 text-center card-hover">
                            <div className="w-12 h-12 bg-red-light rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-primary mb-2">Student Engagement</h3>
                            <p className="text-secondary">
                                Keep students engaged with interactive content and real-time participation tools.
                            </p>
                        </div>

                        {/* Analytics & Reports */}
                        <div className="card p-6 text-center card-hover">
                            <div className="w-12 h-12 bg-red-light rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-primary mb-2">Analytics & Reports</h3>
                            <p className="text-secondary">
                                Track student progress and gain insights with comprehensive analytics and reporting.
                            </p>
                        </div>

                        {/* Word Cloud */}
                        <div className="card p-6 text-center card-hover">
                            <div className="w-12 h-12 bg-red-light rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-primary mb-2">Word Cloud Activities</h3>
                            <p className="text-secondary">
                                Collect and visualize student responses with interactive word cloud activities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-white py-16">
                <div className="container text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        Ready to transform your teaching?
                    </h2>
                    <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto">
                        Join thousands of educators who are already using SmartLearn to create engaging learning experiences.
                    </p>
                    <Link to="/auth" className="btn btn-primary btn-lg">
                        Start Your Journey Today
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;