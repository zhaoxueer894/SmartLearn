import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AiTools from "./pages/AiTools";
import WordCloud from "./pages/WordCloud";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-tools" element={<AiTools />} />
          <Route path="/word-cloud" element={<WordCloud />} />
        </Routes>
      </div>
    </Router>
  );
}
