import React, { useState } from "react";
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
    <div style={{ padding: 24 }}>
      <h2>AI Question Generator</h2>
      <input
        style={{border:"1px solid #ccc",borderRadius:"8px",padding:"8px",width:"320px"}}
        placeholder="Enter topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button style={{marginLeft:8,padding:"8px 12px"}} onClick={handleGenerate}>
        Generate
      </button>
      <p style={{ marginTop: 12 }}>{result}</p>
    </div>
  );
}
