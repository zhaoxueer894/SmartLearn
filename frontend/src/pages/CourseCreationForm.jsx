import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const CourseCreationForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState({
        courseCode: '',
        courseName: '',
        description: '',
        semester: '',
        credits: 3,
        enrollmentCapacity: 50
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setCourseData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const newCourse = {
                ...courseData,
                lecturerId: user.id // Assuming user.id is the lecturerId
            };
            await api.post('/courses', newCourse);
            alert('Course created successfully!');
            navigate('/lecturer/courses');
        } catch (error) {
            console.error("Error creating course:", error);
            alert('Course creation feature coming soon!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container py-8">
            <div className="max-w-2xl mx-auto">
                {/* Header with breadcrumb */}
                <div className="mb-8">
                    <nav className="flex items-center text-sm text-light mb-4" aria-label="Breadcrumb">
                        <Link to="/lecturer/courses" className="hover:text-primary">My Courses</Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-primary">Create New Course</span>
                    </nav>
                    
                    <h1 className="text-3xl font-bold text-primary mb-2">Create New Course</h1>
                    <p className="text-secondary">
                        Set up a new course for your students with detailed information and enrollment settings.
                    </p>
                </div>

                {/* Course Creation Form */}
                <div className="card">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-light rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-primary">Course Information</h2>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Course Code *
                                    </label>
                                    <input
                                        type="text"
                                        name="courseCode"
                                        placeholder="e.g., CS101, MATH201"
                                        value={courseData.courseCode}
                                        onChange={handleInputChange}
                                        required
                                        className="input w-full"
                                        pattern="[A-Z]{2,4}[0-9]{3,4}"
                                        title="Course code should be in format like CS101 or MATH201"
                                    />
                                    <p className="text-xs text-light mt-1">
                                        Use format like CS101, MATH201, etc.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Semester *
                                    </label>
                                    <select
                                        name="semester"
                                        value={courseData.semester}
                                        onChange={handleInputChange}
                                        required
                                        className="input w-full"
                                    >
                                        <option value="">Select Semester</option>
                                        <option value="Fall 2024">Fall 2024</option>
                                        <option value="Spring 2025">Spring 2025</option>
                                        <option value="Summer 2025">Summer 2025</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-secondary mb-2">
                                    Course Name *
                                </label>
                                <input
                                    type="text"
                                    name="courseName"
                                    placeholder="e.g., Introduction to Computer Science"
                                    value={courseData.courseName}
                                    onChange={handleInputChange}
                                    required
                                    className="input w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-secondary mb-2">
                                    Course Description
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="Provide a detailed description of the course content, objectives, and what students will learn..."
                                    value={courseData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="input w-full resize-vertical"
                                />
                                <p className="text-xs text-light mt-1">
                                    Help students understand what they'll learn in this course.
                                </p>
                            </div>

                            {/* Course Settings */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Credits *
                                    </label>
                                    <select
                                        name="credits"
                                        value={courseData.credits}
                                        onChange={handleInputChange}
                                        required
                                        className="input w-full"
                                    >
                                        <option value={1}>1 Credit</option>
                                        <option value={2}>2 Credits</option>
                                        <option value={3}>3 Credits</option>
                                        <option value={4}>4 Credits</option>
                                        <option value={5}>5 Credits</option>
                                        <option value={6}>6 Credits</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Enrollment Capacity *
                                    </label>
                                    <input
                                        type="number"
                                        name="enrollmentCapacity"
                                        min="1"
                                        max="300"
                                        value={courseData.enrollmentCapacity}
                                        onChange={handleInputChange}
                                        required
                                        className="input w-full"
                                    />
                                    <p className="text-xs text-light mt-1">
                                        Maximum number of students that can enroll.
                                    </p>
                                </div>
                            </div>

                            {/* Course Preview */}
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <h3 className="text-sm font-medium text-secondary mb-3">Course Preview</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-light">Course:</span>
                                        <span className="text-primary font-medium">
                                            {courseData.courseCode ? `${courseData.courseCode} - ${courseData.courseName || 'Course Name'}` : 'Course Code - Course Name'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-light">Semester:</span>
                                        <span className="text-secondary">{courseData.semester || 'Not selected'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-light">Credits:</span>
                                        <span className="text-secondary">{courseData.credits}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-light">Capacity:</span>
                                        <span className="text-secondary">{courseData.enrollmentCapacity} students</span>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={() => navigate('/lecturer/courses')}
                                    className="btn btn-outline flex-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn btn-primary flex-1"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Create Course
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCreationForm;
