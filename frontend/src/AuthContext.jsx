import React, { createContext, useState, useContext } from 'react';
import api from './api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = async (username) => {
        try {
            // Placeholder: In a real app, you'd send username/password
            const response = await api.post('/auth/login', { username });
            const { token: newToken, user: newUser } = response.data;
            
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(newUser));
            setToken(newToken);
            setUser(newUser);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const register = async (username, role) => {
        try {
            const response = await api.post('/auth/register', { username, role });
            // After registration, automatically log in for this demo
            return login(username);
        } catch (error) {
            console.error("Registration failed:", error);
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
