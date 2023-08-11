//import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homefeed from "../src/components/Homefeed/Homefeed";
import Profile from "../src/components/Profile/Profile";
import NavBar from "../src/components/NavBar/NavBar";
import Discover from "./components/Discover/Discover";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homefeed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/discover" element={<Discover />} />
      </Routes>
    </Router>
  );
}

export default App;
