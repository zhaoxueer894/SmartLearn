import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{display:"flex",gap:"16px",padding:"12px",borderBottom:"1px solid #eee"}}>
      <Link to="/" style={{textDecoration:"none",color:"#007bff"}}>SmartLearn</Link>
      <Link to="/dashboard" style={{textDecoration:"none",color:"#007bff"}}>Dashboard</Link>
      <Link to="/ai-tools" style={{textDecoration:"none",color:"#007bff"}}>AI Tools</Link>
      <Link to="/word-cloud" style={{textDecoration:"none",color:"#007bff"}}>Word Cloud</Link>
    </div>
  );
}
