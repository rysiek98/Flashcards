import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

const Flashcards = () => {
  const fetchFlashcards = () => {
    axios.get("http://localhost:9090/api/flashcards").then((res) => {
      console.log(res);
    });
  };
  useEffect(() => {
    fetchFlashcards();
  }, []);

  return <h1>Hello</h1>;
};

function App() {
  return (
    <div className="App">
      <Flashcards />
    </div>
  );
}

export default App;
