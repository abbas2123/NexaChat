import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import BackgroundShader from "./components/BackgroundShader";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  if (showSplash) {
    return (
      <>
        <BackgroundShader />

        <SplashScreen onComplete={() => setShowSplash(false)} />
      </>
    );
  }
  return (
    <>
    <Toaster/>
      <BackgroundShader />
      <AppRoutes />
      
    </>
  );
}

export default App;
