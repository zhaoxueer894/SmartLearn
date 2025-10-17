import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [isRegister, setIsRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!username.trim()) {
            alert('Username is required');
            return;
        }
        
        if (!password.trim()) {
            alert('Password is required');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        setIsLoading(true);

        try {
            let success;
            if (isRegister) {
                success = await register(username, password, role);
            } else {
                // 在登录时也传递选中的角色
                success = await login(username, password, role);
            }

            if (success) {
                navigate('/');
            }
        } catch (error) {
            console.error('Auth error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-blue rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">SL</span>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-blue">
                        {isRegister ? 'Create your account' : 'Welcome back'}
                    </h2>
                    <p className="mt-2 text-secondary">
                        {isRegister 
                            ? 'Join thousands of educators and students using SmartLearn'
                            : 'Sign in to your SmartLearn account'
                        }
                    </p>
                </div>

                {/* Form */}
                <div className="card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-blue mb-2">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                required
                                className="form-input"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-blue mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="form-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                            {isRegister && (
                                <p className="mt-1 text-xs text-light">
                                    Password must be at least 6 characters long
                                </p>
                            )}
                        </div>

                        {/* Role Selection (Both login and registration) */}
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-blue mb-2">
                                I am a...
                            </label>
                            <select
                                id="role"
                                className="form-select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                disabled={isLoading}
                            >
                                <option value="student">Student</option>
                                <option value="lecturer">Lecturer</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary w-full btn-lg"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    {isRegister ? 'Creating Account...' : 'Signing In...'}
                                </div>
                            ) : (
                                isRegister ? 'Create Account' : 'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Toggle Auth Mode */}
                    <div className="mt-6 text-center">
                        <p className="text-secondary">
                            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsRegister(!isRegister);
                                    setUsername('');
                                    setPassword('');
                                    setRole('student');
                                }}
                                className="text-blue hover:text-blue-hover font-medium transition"
                                disabled={isLoading}
                            >
                                {isRegister ? 'Sign in' : 'Create account'}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Demo Accounts Info */}
                <div className="mt-8 card p-4 bg-gray-50 border-gray">
                    <h3 className="text-sm font-medium text-blue mb-2">Demo Accounts</h3>
                    <div className="text-xs text-secondary space-y-1">
                        <p><strong>Lecturer:</strong> teacher1 / password123</p>
                        <p><strong>Student:</strong> student1 / password123</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
