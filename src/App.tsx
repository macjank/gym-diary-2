import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navigation from "./components/navigation/Navigation";
import { routes } from "./static/routes";
import TrainingForm from "./pages/addTraining/TrainingForm";
import FirebaseService from "./services/firebaseService";

function App() {
  useEffect(() => {
    FirebaseService.getExercisesCategories();
    FirebaseService.getExercises();
  }, []);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.addTraining} element={<TrainingForm />} />
      </Routes>
    </>
  );
}

export default App;
