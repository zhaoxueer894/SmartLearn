import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back to Home Button */}
      <div className="bg-white shadow-sm border-b border-blue">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-2xl font-bold text-blue hover:text-blue-600 transition">
                SmartLearn
              </Link>
              <span className="text-gray-300">|</span>
              <h1 className="text-xl font-semibold text-blue">Dashboard</h1>
            </div>
            <Link to="/" className="btn btn-secondary">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold text-blue mb-4">Dashboard</h2>
          <p className="text-secondary">This is a placeholder for the dashboard content.</p>
        </div>
      </div>
    </div>
  );
}
