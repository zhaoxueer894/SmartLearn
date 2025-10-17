import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { wordCloudService } from "../services"; // 暂时注释掉有问题的导入

export default function WordCloud() {
  const [word, setWord] = useState("");
  const [cloud, setCloud] = useState({
    "Learning": 15,
    "Education": 12,
    "Technology": 10,
    "Innovation": 8,
    "Smart": 6
  }); // 使用模拟数据

  const submit = async () => {
    if (!word.trim()) return;
    try {
      // 模拟提交单词
      const newCloud = { ...cloud };
      newCloud[word] = (newCloud[word] || 0) + 1;
      setCloud(newCloud);
      setWord("");
    } catch (error) {
      console.error('Error submitting word:', error);
    }
  };

  const refresh = async () => {
    try {
      // 模拟刷新 - 在实际应用中会调用API
      console.log('Word cloud data refreshed');
    } catch (error) {
      console.error('Error getting word cloud:', error);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

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
              <h1 className="text-xl font-semibold text-blue">Word Cloud Activities</h1>
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
            <h2 className="text-2xl font-bold text-blue mb-6">Interactive Word Cloud</h2>
            <p className="text-secondary mb-6">Submit words to contribute to the classroom word cloud visualization.</p>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-blue mb-2">
                Add a Word
              </label>
              <div className="flex gap-4">
                <input
                  className="form-input flex-1"
                  placeholder="Enter a word..."
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && submit()}
                />
                <button 
                  className="btn btn-primary"
                  onClick={submit}
                  disabled={!word.trim()}
                >
                  Submit Word
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue mb-4">Current Word Cloud</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(cloud)
                  .sort(([,a], [,b]) => b - a)
                  .map(([w, c]) => (
                    <div 
                      key={w} 
                      className="bg-white rounded-lg p-3 text-center border border-blue"
                      style={{ fontSize: `${Math.max(12, Math.min(24, c * 1.5))}px` }}
                    >
                      <div className="font-semibold text-blue">{w}</div>
                      <div className="text-xs text-secondary">{c} mentions</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
