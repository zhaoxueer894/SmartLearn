import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const LecturerCourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
    const [newQuiz, setNewQuiz] = useState({ title: '', description: '' });
    const [studentIdsInput, setStudentIdsInput] = useState('');

    useEffect(() => {
        // In a real app, you would fetch course details here, but our backend doesn't have a GET by ID yet.
        // For this demo, we'll assume the course details are available or not strictly needed for the management view.
        // fetchCourseDetails(id);
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

    const handlePostAnnouncement = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/courses/${id}/announcements`, newAnnouncement);
            setNewAnnouncement({ title: '', content: '' });
            fetchAnnouncements();
            alert('Announcement posted!');
        } catch (error) {
            console.error("Error posting announcement:", error);
            alert('Failed to post announcement.');
        }
    };

    const handleCreateQuiz = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/courses/${id}/quizzes`, newQuiz);
            setNewQuiz({ title: '', description: '' });
            fetchQuizzes();
            alert('Quiz created!');
        } catch (error) {
            console.error("Error creating quiz:", error);
            alert('Failed to create quiz.');
        }
    };

    const handleImportStudents = async (e) => {
        e.preventDefault();
        try {
            // NOTE: The backend expects an array of Long IDs, but the user inputs student IDs (e.g., S1234567).
            // For this minimal demo, we'll assume the input are the Long IDs for simplicity.
            const studentIds = studentIdsInput.split(',').map(s => s.trim()).filter(s => s).map(Number);
            await api.post(`/courses/${id}/enrollments`, { student_ids: studentIds });
            setStudentIdsInput('');
            alert('Students imported/enrolled successfully!');
        } catch (error) {
            console.error("Error importing students:", error);
            alert('Failed to import students.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Course Management - ID: {id}</h2>
            <div style={{ display: 'flex', gap: '40px' }}>
                
                {/* Announcements Section */}
                <div style={{ flex: 1, border: '1px solid #ccc', padding: '15px' }}>
                    <h3>Post Announcement</h3>
                    <form onSubmit={handlePostAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newAnnouncement.title}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                            required
                            style={{ padding: '8px' }}
                        />
                        <textarea
                            placeholder="Content"
                            value={newAnnouncement.content}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                            required
                            style={{ padding: '8px', minHeight: '100px' }}
                        />
                        <button type="submit" style={{ padding: '8px', backgroundColor: '#d9534f', color: 'white', border: 'none', cursor: 'pointer' }}>
                            Post
                        </button>
                    </form>
                    <h4 style={{ marginTop: '20px' }}>Existing Announcements</h4>
                    {announcements.map(a => (
                        <div key={a.id} style={{ border: '1px solid #eee', padding: '10px', marginTop: '10px' }}>
                            <strong>{a.title}</strong>
                            <p>{a.content}</p>
                        </div>
                    ))}
                </div>

                {/* Quizzes and Enrollment Section */}
                <div style={{ flex: 1, border: '1px solid #ccc', padding: '15px' }}>
                    
                    {/* Quizzes */}
                    <h3>Create Quiz</h3>
                    <form onSubmit={handleCreateQuiz} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newQuiz.title}
                            onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                            required
                            style={{ padding: '8px' }}
                        />
                        <textarea
                            placeholder="Description"
                            value={newQuiz.description}
                            onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                            required
                            style={{ padding: '8px', minHeight: '100px' }}
                        />
                        <button type="submit" style={{ padding: '8px', backgroundColor: '#d9534f', color: 'white', border: 'none', cursor: 'pointer' }}>
                            Create Quiz
                        </button>
                    </form>
                    <h4 style={{ marginTop: '20px' }}>Existing Quizzes</h4>
                    {quizzes.map(q => (
                        <div key={q.id} style={{ border: '1px solid #eee', padding: '10px', marginTop: '10px' }}>
                            <strong>{q.title}</strong>
                            <p>{q.description}</p>
                        </div>
                    ))}

                    {/* Enrollment */}
                    <h3 style={{ marginTop: '30px' }}>Import Students (Enrollment)</h3>
                    <form onSubmit={handleImportStudents} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <textarea
                            placeholder="Enter student IDs (Longs) separated by comma (e.g., 1, 2, 3)"
                            value={studentIdsInput}
                            onChange={(e) => setStudentIdsInput(e.target.value)}
                            required
                            style={{ padding: '8px', minHeight: '80px' }}
                        />
                        <button type="submit" style={{ padding: '8px', backgroundColor: '#5cb85c', color: 'white', border: 'none', cursor: 'pointer' }}>
                            Import/Enroll
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LecturerCourseDetail;
