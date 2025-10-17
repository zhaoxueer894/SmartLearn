import { useState } from "react";
import { aiAPI } from "../services/api";

export default function AiTools() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    const res = await aiAPI.generateQuestion(topic);
    setResult(res.data);
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
