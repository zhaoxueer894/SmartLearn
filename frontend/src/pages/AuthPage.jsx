import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [isRegister, setIsRegister] = useState(false);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 验证输入
        if (!username.trim()) {
            alert('Username is required');
            return;
        }
        
        if (!password.trim()) {
            alert('Password is required');
            return;
        }

        let success;
        if (isRegister) {
            success = await register(username, password, role);
        } else {
            success = await login(username, password);
        }

        if (success) {
            navigate('/');
        } else {
            // 错误信息会在AuthContext中处理
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username (e.g., L1001 or S2001)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', margin: '10px 0' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', margin: '10px 0' }}
                />
                {isRegister && (
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{ width: '100%', padding: '10px', margin: '10px 0' }}
                    >
                        <option value="student">Student</option>
                        <option value="lecturer">Lecturer</option>
                    </select>
                )}
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#d9534f', color: 'white', border: 'none', cursor: 'pointer' }}>
                    {isRegister ? 'Register' : 'Login'}
                </button>
            </form>
            <p style={{ marginTop: '15px', textAlign: 'center' }}>
                {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                <span
                    onClick={() => setIsRegister(!isRegister)}
                    style={{ color: '#d9534f', cursor: 'pointer' }}
                >
                    {isRegister ? 'Login' : 'Register'}
                </span>
            </p>
        </div>
    );
};

export default AuthPage;
