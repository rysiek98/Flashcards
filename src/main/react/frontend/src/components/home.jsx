import React, { Component } from "react";
import "../style/home.css";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="home">
          <div id="homeText">
            Put simply, a flashcard is a piece of card that has a cue or hint on
            the front side, and a corresponding answer on the back side. The cue
            can be a question, an image, or just one word that prompts or
            triggers an anticipated response. Anything that can be studied in a
            “question and answer” format can be literally turned into flashcards
            — from definitions, foreign language vocabularies, scientific
            symbols, historical dates and traffic signs, to countries and their
            respective capitals or currencies. If you have, for example, a
            flashcard saying: “What is the capital of France?” You would write
            “Paris” on the back side.
          </div>
          <div className="home_img"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
