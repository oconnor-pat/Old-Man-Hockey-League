//import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homefeed from "../src/components/Homefeed/Homefeed";
import Profile from "../src/components/Profile/Profile";
import NavBar from "../src/components/Navbar/Navbar";
import Discover from "./components/Discover/Discover";
import GlobalStyles from "./utils/GlobalStyles";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homefeed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/discover" element={<Discover />} />
      </Routes>
      <GlobalStyles />
    </Router>
  );
}

export default App;
