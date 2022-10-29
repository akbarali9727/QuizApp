import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import FinalScreen from "./pages/FinalScreen";
import Questions from "./pages/Questions";
import Settings from "./pages/Settings";
import "./styles.css";


function App() {
  return (
      <Router>
      <h1 className="main-label">Quiz App</h1>
        {/* Agar shu yerga navbar qoysa butun sayt pa gelarida aks etadi */}
        <Routes>
          <Route path="/" element={<Settings />} exact />
          <Route path="/questions" element={<Questions />} />
          <Route path="/score" element={<FinalScreen />} />
        </Routes>
      </Router>
  );
}

export default App;
