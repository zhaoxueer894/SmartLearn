import { useEffect, useState } from "react";
import { wordCloudAPI } from "../services/api";

export default function WordCloud() {
  const [word, setWord] = useState("");
  const [cloud, setCloud] = useState({});

  const submit = async () => {
    if (!word.trim()) return;
    await wordCloudAPI.submitWord(word);
    setWord("");
    refresh();
  };

  const refresh = async () => {
    const res = await wordCloudAPI.getWordCloud();
    setCloud(res.data || {});
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
