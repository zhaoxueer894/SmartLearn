import React, { createContext, useState, useContext } from 'react';
import api from './api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = async (username, password) => {
        try {
            const response = await api.post('/auth/login', { username, password });
            console.log("Login response:", response.data);
            
            const { token: newToken, user: newUser } = response.data;
            
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(newUser));
            setToken(newToken);
            setUser(newUser);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
            alert(errorMessage);
            return false;
        }
    };

    const register = async (username, password, role) => {
        try {
            const response = await api.post('/auth/register', { username, password, role });
            console.log("Registration successful:", response.data);
            
            // After registration, automatically log in
            return await login(username, password);
        } catch (error) {
            console.error("Registration failed:", error);
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            alert(errorMessage);
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
