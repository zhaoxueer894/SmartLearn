import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const CourseCreationForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newCourse = {
                courseCode,
                courseName,
                lecturerId: user.id // Assuming user.id is the lecturerId
            };
            await api.post('/courses', newCourse);
            alert('Course created successfully!');
            navigate('/lecturer/courses');
        } catch (error) {
            console.error("Error creating course:", error);
            alert('Failed to create course.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Create New Course</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text"
                    placeholder="Course Code (e.g., COMP1001)"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    required
                    style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
                <input
                    type="text"
                    placeholder="Course Name (e.g., Introduction to Programming)"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    required
                    style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#d9534f', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
                    Create Course
                </button>
            </form>
        </div>
    );
};

export default CourseCreationForm;
