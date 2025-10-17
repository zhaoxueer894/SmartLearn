import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { aiService } from "../services"; // 暂时注释掉有问题的导入

export default function AiTools() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    try {
      // 暂时使用模拟数据，避免服务调用
      if (topic.trim()) {
        setResult(`AI Generated Mock: Smart questions about "${topic}" have been generated!\n\n1. What are the core concepts of ${topic}?\n2. What are the characteristics of ${topic} in practical applications?\n3. How to better understand ${topic}?`);
      } else {
        setResult("Please enter a topic");
      }
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

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
              <h1 className="text-xl font-semibold text-blue">AI Tools</h1>
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
        <div className="max-w-4xl mx-auto">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-blue mb-6">AI Question Generator</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-blue mb-2">
                Enter Topic
              </label>
              <div className="flex gap-4">
                <input
                  className="form-input flex-1"
                  placeholder="Enter topic to generate questions..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <button 
                  className="btn btn-primary"
                  onClick={handleGenerate}
                >
                  Generate Questions
                </button>
              </div>
            </div>

            {result && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue mb-3">Generated Results:</h3>
                <pre className="text-secondary whitespace-pre-wrap">{result}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
