import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./components/theme"; // Import your custom theme
import BfitNavbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ExerciseLibraryPage from "./pages/ExerciseLibraryPage"; // Ensure this path is correct
import GoalSettingPage from "./pages/GoalSettingPage";
import WorkoutTrackingPage from "./pages/WorkoutTrackingPage";
import AboutUsPage from "./pages/AboutUsPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          <BfitNavbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/exerciseLibrary" element={<ExerciseLibraryPage />} />
            <Route path="/goalSetting" element={<GoalSettingPage />} />
            <Route path="/workoutTracking" element={<WorkoutTrackingPage />} />
            <Route path="/about" element={<AboutUsPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
