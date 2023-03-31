import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

// page components
import Header from "./components/Header";
import Home from "./components/Home";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (loadingProgress < 100) {
      const timeout = setTimeout(() => {
        setLoadingProgress(loadingProgress + 1);
      }, 75); // Adjust the speed of the progress bar by changing this value
      return () => clearTimeout(timeout);
    }
  }, [loadingProgress]);

  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        {loadingProgress < 100 ? (
          <LoadingScreen progress={loadingProgress} />
        ) : (
          <Home />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
