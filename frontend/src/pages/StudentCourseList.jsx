import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import api from '../api';

const StudentCourseList = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // NOTE: The backend API for student courses is not fully implemented yet,
                // so we will mock the enrolled courses for this minimal demo.
                // In a full implementation, the backend would return courses based on enrollment.
                // For now, we'll fetch all courses and assume the student is enrolled in all of them for demo purposes.
                const response = await api.get(`/courses?userId=${user.id}&role=${user.role}`);
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        if (user) {
            fetchCourses();
        }
    }, [user]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>My Enrolled Courses (Student)</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {courses.map(course => (
                    <div key={course.id} style={{ border: '1px solid #ccc', padding: '15px', width: '300px', borderRadius: '5px' }}>
                        <h3>{course.courseCode} - {course.courseName}</h3>
                        <p>Lecturer ID: {course.lecturerId}</p>
                        <Link to={`/student/courses/${course.id}`} style={{ color: '#d9534f', textDecoration: 'none' }}>
                            View Course
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentCourseList;
