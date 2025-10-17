import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import api from '../api';

const LecturerCourseList = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
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
            <h2>My Courses (Lecturer)</h2>
            <Link to="/lecturer/courses/new" style={{ display: 'inline-block', padding: '10px 15px', backgroundColor: '#d9534f', color: 'white', textDecoration: 'none', borderRadius: '5px', marginBottom: '20px' }}>
                Create New Course
            </Link>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {courses.map(course => (
                    <div key={course.id} style={{ border: '1px solid #ccc', padding: '15px', width: '300px', borderRadius: '5px' }}>
                        <h3>{course.courseCode} - {course.courseName}</h3>
                        <p>ID: {course.id}</p>
                        <Link to={`/lecturer/courses/${course.id}`} style={{ color: '#d9534f', textDecoration: 'none' }}>
                            Manage Course
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LecturerCourseList;
