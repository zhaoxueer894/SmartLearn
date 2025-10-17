import React, { useEffect, useState } from "react";
// import { wordCloudService } from "../services"; // 暂时注释掉有问题的导入

export default function WordCloud() {
  const [word, setWord] = useState("");
  const [cloud, setCloud] = useState({
    "学习": 15,
    "教育": 12,
    "技术": 10,
    "创新": 8,
    "智能": 6
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
      console.log('词云数据已刷新');
    } catch (error) {
      console.error('Error getting word cloud:', error);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Word Cloud (demo data)</h2>
      <input
        style={{border:"1px solid #ccc",borderRadius:"8px",padding:"8px",width:"240px"}}
        placeholder="Enter a word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button style={{marginLeft:8,padding:"8px 12px"}} onClick={submit}>Submit</button>

      <ul style={{ marginTop: 16 }}>
        {Object.entries(cloud).map(([w, c]) => (
          <li key={w}>{w}: {c}</li>
        ))}
      </ul>
    </div>
  );
}
