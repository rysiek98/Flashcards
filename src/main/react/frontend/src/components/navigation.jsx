import React, { Component } from "react";
import "../style/navigation.css";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <NavLink to="/home" className="links">
          Home
        </NavLink>
        <NavLink to="/flashcardsList" className="links">
          Flashcards List
        </NavLink>
        <NavLink to="/play" className="links">
          Play
        </NavLink>
        <NavLink to="/addFlashcard" className="links">
          Add new Flashcards
        </NavLink>
      </nav>
    );
  }
}

export default NavBar;
