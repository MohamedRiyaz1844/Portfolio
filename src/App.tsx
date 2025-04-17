import React from "react";
import HomeScreen from "./pages/HomeScreen"; // Adjust path if needed
import Header from "./components/Header"; // Adjust path if needed

const App: React.FC = () => {
  return (
    <div className="App h-screen overflow-hidden">
      <Header />
      <HomeScreen />
    </div>
  );
};

export default App;