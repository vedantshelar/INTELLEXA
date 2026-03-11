import "./App.css";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import SignInSignUpPage from "./pages/SignInSignUpPage";
import Dashboard from "./pages/Dashboard";
import Graphs from "./pages/dashboardPages/Graphs";
import Insights from "./pages/dashboardPages/Insights";
import Predictions from "./pages/dashboardPages/Predicitons";
import AiAssistant from "./pages/dashboardPages/AiAssistant";
import RiskAndDetection from "./pages/dashboardPages/RiskAndDetection";
import History from "./pages/dashboardPages/History";
import Upload from "./pages/dashboardPages/Upload";

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signInSignUpPage" element={<SignInSignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Upload />} />
          <Route path="upload" element={<Upload />} />
          <Route path="graphs" element={<Graphs />} />
          <Route path="insights" element={<Insights />} />
          <Route path="predictions" element={<Predictions />} />
          <Route path="chatbot" element={<AiAssistant />} />
          <Route path="risk" element={<RiskAndDetection />} />
          <Route path="history/:indx" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
   );
}

export default App;