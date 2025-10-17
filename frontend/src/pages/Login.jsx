import { useState } from "react";
import { api } from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await api.post("/users/register", { username, password });
      setMessage(res.data.message + " (username: " + res.data.username + ")");
    } catch (err) {
      setMessage("Error connecting to backend.");
    }
  };

  const testHello = async () => {
    try {
      const res = await api.get("/hello");
      setMessage(res.data);
    } catch {
      setMessage("Backend not reachable.");
    }
  };

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",gap:"12px"}}>
      <h1>SmartLearn</h1>
      <input
        style={{border:"1px solid #ccc",borderRadius:"8px",padding:"8px",width:"240px"}}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{border:"1px solid #ccc",borderRadius:"8px",padding:"8px",width:"240px"}}
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{display:"flex",gap:"8px"}}>
        <button style={{padding:"8px 12px"}} onClick={handleRegister}>Register (Test)</button>
        <button style={{padding:"8px 12px"}} onClick={testHello}>Ping Backend</button>
      </div>
      <p style={{color:"#555"}}>{message}</p>
    </div>
  );
}
