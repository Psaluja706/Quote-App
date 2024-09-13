// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Listing from "./pages/Listing";
import CreateQuote from "./pages/CreateQuote";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/list" element={<Listing />} />
        <Route path="/create" element={<CreateQuote />} />
      </Routes>
    </Router>
  );
}

export default App;
