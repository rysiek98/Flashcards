import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./home";
import FlashcardsList from "./flashcardsList";
import Navigation from "./navigation";
import Play from "./play";
import AddFlashcards from "./addFlashcard";

class Section extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/flashcardsList" component={FlashcardsList} />
          <Route path="/play" component={Play} />
          <Route path="/addFlashcard" component={AddFlashcards} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Section;
