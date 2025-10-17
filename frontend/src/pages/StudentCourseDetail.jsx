import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const StudentCourseDetail = () => {
    const { id } = useParams();
    const [announcements, setAnnouncements] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetchAnnouncements();
        fetchQuizzes();
    }, [id]);

    const fetchAnnouncements = async () => {
        try {
            const response = await api.get(`/courses/${id}/announcements`);
            setAnnouncements(response.data);
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };

    const fetchQuizzes = async () => {
        try {
            const response = await api.get(`/courses/${id}/quizzes`);
            setQuizzes(response.data);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    };

    const handleParticipateQuiz = async (quizId) => {
        try {
            const response = await api.post(`/quizzes/${quizId}/submit`, { status: 'completed' });
            alert(response.data); // Show the placeholder message
        } catch (error) {
            console.error("Error participating in quiz:", error);
            alert('Failed to participate in quiz.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Course View - ID: {id}</h2>
            <div style={{ display: 'flex', gap: '40px' }}>
                
                {/* Announcements Section */}
                <div style={{ flex: 1, border: '1px solid #ccc', padding: '15px' }}>
                    <h3>Announcements</h3>
                    {announcements.map(a => (
                        <div key={a.id} style={{ border: '1px solid #eee', padding: '10px', marginTop: '10px' }}>
                            <strong>{a.title}</strong>
                            <p>{a.content}</p>
                            <small>Posted: {new Date(a.postedAt).toLocaleString()}</small>
                        </div>
                    ))}
                </div>

                {/* Quizzes Section */}
                <div style={{ flex: 1, border: '1px solid #ccc', padding: '15px' }}>
                    <h3>Quizzes</h3>
                    {quizzes.map(q => (
                        <div key={q.id} style={{ border: '1px solid #eee', padding: '10px', marginTop: '10px' }}>
                            <strong>{q.title}</strong>
                            <p>{q.description}</p>
                            <button 
                                onClick={() => handleParticipateQuiz(q.id)}
                                style={{ padding: '5px 10px', backgroundColor: '#d9534f', color: 'white', border: 'none', cursor: 'pointer' }}
                            >
                                Participate (Placeholder)
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentCourseDetail;
