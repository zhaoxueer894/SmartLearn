import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = async (username, password, userRole = 'student') => {
        try {
            // 临时使用模拟登录，避免API调用问题
            if (username && password) {
                // 角色完全基于用户选择，默认为student
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
                alert("请输入用户名和密码");
                return false;
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("登录失败，请重试");
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
                alert("请填写完整的注册信息");
                return false;
            }
        } catch (error) {
            console.error("Registration failed:", error);
            alert("注册失败，请重试");
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
