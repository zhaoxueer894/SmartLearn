import React, { useState } from "react";
// import { aiService } from "../services"; // 暂时注释掉有问题的导入

export default function AiTools() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    try {
      // 暂时使用模拟数据，避免服务调用
      if (topic.trim()) {
        setResult(`模拟AI生成：关于 "${topic}" 的智能问题已生成！\n\n1. 什么是${topic}的核心概念？\n2. ${topic}在实际应用中有哪些特点？\n3. 如何更好地理解${topic}？`);
      } else {
        setResult("请输入一个话题");
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
