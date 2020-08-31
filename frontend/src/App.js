import React, { useState, useEffect } from "react";
import "./App.css";
import Section from "./components/section";
import axios from "axios";
import Footer from "./components/footer";

function App() {
  return (
    <div className="container">
      <Section />
      <Footer />
    </div>
  );
}

export default App;
