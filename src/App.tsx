// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import ScreenplayEditor from "./pages/ScreenplayEditor";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/editor/:projectId" element={<ScreenplayEditor />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
