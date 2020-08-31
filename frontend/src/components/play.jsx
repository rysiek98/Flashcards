import React, { Component, useEffect, useState } from "react";
import "../style/play.css";
import axios from "axios";

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      flashcards: [],
      flashcard: null,
      card: null,
      cards: [],
    };

    this.handleSelected = this.handleSelected.bind(this);
    this.handleNextWord = this.handleNextWord.bind(this);
    this.handleBackWord = this.handleBackWord.bind(this);
  }

  handleSelected(flashcard) {
    if (!this.state.selected) {
      this.setState({ selected: true });
      this.setState({ flashcard });
      this.setState({ cards: flashcard.cards });
      this.setState({ card: flashcard.cards[0] });
    } else {
      this.setState({ selected: false });
      this.setState({ flashcard: null });
      this.setState({ cards: [] });
      this.setState({ card: null });
    }
  }

  handleNextWord(card) {
    let index = this.state.cards.indexOf(card);

    if (index < this.state.cards.length - 1) {
      this.setState({ card: this.state.cards[index + 1] });
    }
  }

  handleBackWord(card) {
    let index = this.state.cards.indexOf(card);

    if (index - 1 >= 0) {
      this.setState({ card: this.state.cards[index - 1] });
    }
  }

  componentDidMount() {
    axios.get("http://localhost:9090/api/flashcards").then((res) => {
      const flashcards = res.data;
      this.setState({ flashcards });
    });
  }

  render() {
    if (this.state.selected) {
      return this.game();
    } else {
      return this.listFlashcards();
    }
  }

  listFlashcards() {
    return (
      <div className="listFlashcards">
        <h2>List of existing flashcards in database:</h2>
        <div id="list">
          <ul>
            {this.state.flashcards.map((flashcard, index) => (
              <div key={index}>
                <li>
                  <button onClick={this.handleSelected.bind(this, flashcard)}>
                    {flashcard.name}
                  </button>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  game() {
    return (
      <div className="play">
        <div className="gameBoard">
          <button onClick={this.handleBackWord.bind(this, this.state.card)}>
            Back
          </button>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                {this.state.card.wordInNative}
              </div>
              <div className="flip-card-back">
                {this.state.card.wordInForeign}
              </div>
            </div>
          </div>
          <button onClick={this.handleNextWord.bind(this, this.state.card)}>
            Next
          </button>
        </div>
        <div className="options">
          <button
            onClick={this.handleSelected.bind(this, this.state.flashcard)}
          >
            Return to flashcards list
          </button>
        </div>
      </div>
    );
  }
}
export default Play;
