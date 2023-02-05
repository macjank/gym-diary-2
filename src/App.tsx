import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navigation from "./components/navigation/Navigation";
import { routes } from "./static/routes";
import AddTraining from "./pages/addTraining/AddTraining";
import FirebaseService from "./services/firebaseService";

function App() {
  useEffect(() => {
    FirebaseService.getMuscles();
    FirebaseService.getExercises();
  }, []);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.addTraining} element={<AddTraining />} />
      </Routes>
    </>
  );
}

export default App;
