import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = async (username, password, userRole = 'student') => {
        try {
            const apiBase = import.meta.env.VITE_API_BASE;
            if (apiBase) {
                // Call real backend
                const resp = await api.post('/api/v1/auth/login', { username, password });
                const { token, user: respUser } = resp.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(respUser));
                setToken(token);
                setUser(respUser);
                return true;
            } else {
                // Fallback to mock login
                if (username && password) {
                    const role = userRole;
                    const mockUser = {
                        id: Date.now(),
                        username: username,
                        role: role,
                        email: `${username}@smartlearn.com`
                    };
                    const mockToken = 'mock-jwt-token-' + Date.now();
                    console.log("Mock login successful:", mockUser);
                    localStorage.setItem('token', mockToken);
                    localStorage.setItem('user', JSON.stringify(mockUser));
                    setToken(mockToken);
                    setUser(mockUser);
                    return true;
                } else {
                    alert("Please enter username and password");
                    return false;
                }
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed, please try again");
            return false;
        }
    };

    const register = async (username, password, role) => {
        try {
            // 临时使用模拟注册
            if (username && password && role) {
                console.log("Mock registration successful with role:", role);
                // After registration, automatically log in with the selected role
                return await login(username, password, role);
            } else {
                alert("Please fill in all registration information");
                return false;
            }
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed, please try again");
            return false;
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = !!user;
    const isLecturer = user?.role === 'lecturer';
    const isStudent = user?.role === 'student';

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, isLecturer, isStudent, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
