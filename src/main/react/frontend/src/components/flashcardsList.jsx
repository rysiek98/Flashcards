import React, { Component, useEffect, useState } from "react";
import "../style/flashcardsList.css";
import axios from "axios";

class FlashcardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      flashcards: [],
      flashcard: null,
      selectedCard: 0,
    };

    this.handleSelected = this.handleSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(flashcard) {
    if (!this.state.selected) {
      this.setState({ selected: true });
    } else {
      this.setState({ selected: false });
    }
    this.setState({ flashcard });
  }

  handleDelete(cardToDelete) {
    if (cardToDelete !== 0) {
      this.state.flashcards.cards.filter((card) => card.id !== cardToDelete.id);
    }
  }

  handleSelected() {}

  componentDidMount() {
    axios.get("http://localhost:9090/api/flashcards").then((res) => {
      const flashcards = res.data;
      this.setState({ flashcards });
    });
  }

  render() {
    if (this.state.selected) {
      return this.showFlashcard();
    } else {
      return this.listFlashcards();
    }
  }

  listFlashcards() {
    return (
      <div className="flashcards">
        <h2>List of existing flashcards in database:</h2>
        <div id="list">
          <ul>
            {this.state.flashcards.map((flashcard, index) => (
              <div key={index}>
                <li>
                  <button onClick={this.handleChange.bind(this, flashcard)}>
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

  showFlashcard() {
    const name = this.state.flashcard.name;
    const cards = this.state.flashcard.cards;
    return (
      <div className="showFlashcards">
        <h2>{name}</h2>
        {cards.map((card) => {
          return (
            <button onClick={this.handleChange.bind(this, null)}>
              {card.wordInNative} - {card.wordInForeign}
            </button>
          );
        })}
        <div>
          <button onClick={this.handleChange.bind(this, null)}>Add</button>
          <button onClick={this.handleChange.bind(this, null)}>Edit</button>
          <button onClick={this.handleChange.bind(this, null)}>Delete</button>
          <button onClick={this.handleChange.bind(this, null)}>Go back</button>
        </div>
      </div>
    );
  }
}
export default FlashcardsList;
