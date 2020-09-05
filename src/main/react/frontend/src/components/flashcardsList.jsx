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
      selectedCardID: 0,
      selectedCard: null,
      cards: [],
      option: "show",
      wordInNative: "",
      wordInForeign: "",
    };

    this.handleSelected = this.handleSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteFlashcard = this.handleDeleteFlashcard.bind(this);
    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleChangeNative = this.handleChangeNative.bind(this);
    this.handleChangeForeign = this.handleChangeForeign.bind(this);
    this.handleEditCard = this.handleEditCard.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
  }

  handleDeleteFlashcard(id) {
    const URL = "http://localhost:9090/api/flashcards/" + id;
    axios.delete(URL).then((res) => {
      console.log(res);
    });
    this.handleChange(this.state.flashcard);
  }

  resetState() {
    axios.get("http://localhost:9090/api/flashcards").then((res) => {
      const flashcards = res.data;
      this.setState({ flashcards });
    });
  }

  handleAddCard() {
    let cardsCopy = [...this.state.cards];
    let cardToAdd = {
      wordInNative: this.state.wordInNative,
      wordInForeign: this.state.wordInForeign,
    };
    cardsCopy.push(cardToAdd);
    this.setState({ cards: cardsCopy });
    axios
      .put("http://localhost:9090/api/flashcards", {
        id: this.state.flashcard.id,
        name: this.state.flashcard.name,
        cards: cardsCopy,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    this.setState({ wordInNative: "" });
    this.setState({ wordInForeign: "" });
  }

  handleEditCard() {
    let cardsCopy = [...this.state.cards];
    let cardToUpdate = this.state.selectedCard;
    cardToUpdate.wordInNative = this.state.wordInNative;
    cardToUpdate.wordInForeign = this.state.wordInForeign;
    cardsCopy.forEach((card) => {
      if (card.id === cardToUpdate.id) card = cardToUpdate;
    });
    this.setState({ cards: cardsCopy });
    axios
      .put("http://localhost:9090/api/flashcards", {
        id: this.state.flashcard.id,
        name: this.state.flashcard.name,
        cards: this.state.cards,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });

    this.handleChangeOption("show");
  }

  handleChangeNative(event) {
    this.setState({
      wordInNative: event.target.value,
    });
  }

  handleChangeForeign(event) {
    this.setState({
      wordInForeign: event.target.value,
    });
  }

  handleChangeOption(option) {
    switch (option) {
      case "add":
        this.setState({ option: "add" });
        break;
      case "edit":
        if (this.state.selectedCardID !== 0) {
          this.setState({ option: "edit" });
        } else {
          this.setState({ option: "show" });
        }
        break;
      case "show":
        this.setState({ option: "show" });
        this.setState({ selectedCardID: 0 });
        this.setState({ selectedCard: null });
        break;
      default:
        this.setState({ option: "show" });
        this.setState({ selectedCardID: 0 });
        this.setState({ selectedCard: null });
        break;
    }
  }

  handleChange(flashcard) {
    if (!this.state.selected) {
      this.setState({ selected: true });
      this.setState({ flashcard });
      this.setState({ cards: flashcard.cards });
    } else {
      this.resetState();
      this.setState({ selected: false });
      this.setState({ flashcard: null });
      this.setState({ cards: [] });
    }
  }

  handleDelete(id) {
    const flashcardID = this.state.flashcard.id;
    const URL =
      "http://localhost:9090/api/flashcards/" + flashcardID + "/card/" + id;
    console.log(URL);
    axios.delete(URL).then((res) => {
      console.log(res);
    });

    if (id > 0) {
      this.setState({
        cards: this.state.cards.filter((card) => card.id !== id),
      });
    }
  }

  handleSelected(card) {
    if (this.state.selectedCardID === card.id) {
      this.setState({ selectedCardID: 0 });
      this.setState({ selectedCard: null });
      this.setState({ wordInNative: "" });
      this.setState({ wordInForeign: "" });
    } else {
      this.setState({ selectedCardID: card.id });
      this.setState({ selectedCard: card });
      this.setState({ wordInNative: card.wordInNative });
      this.setState({ wordInForeign: card.wordInForeign });
    }
  }

  ButtonClicked(id) {
    if (id === this.state.selectedCardID) {
      return "buttonStyleClicked";
    } else {
      return "buttonStyle";
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
      switch (this.state.option) {
        case "show":
          return this.showFlashcard();
        case "add":
          return this.addCard();

        case "edit":
          return this.editCard();

        default:
          return this.showFlashcard();
      }
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
    const cards = this.state.cards;

    return (
      <div className="showFlashcards">
        <h2>{name}</h2>
        {cards.map((card) => {
          return (
            <button
              onClick={this.handleSelected.bind(this, card)}
              className={this.ButtonClicked(card.id)}
            >
              {card.wordInNative} - {card.wordInForeign}
            </button>
          );
        })}
        <div className="optionsButtons">
          <button onClick={this.handleChangeOption.bind(this, "add")}>
            Add Card
          </button>
          <button onClick={this.handleChangeOption.bind(this, "edit")}>
            Edit Card
          </button>
          <button
            onClick={this.handleDelete.bind(this, this.state.selectedCardID)}
          >
            Delete Card
          </button>
          <button onClick={this.handleChange.bind(this, null)}>Go back</button>
          <button
            onClick={this.handleDeleteFlashcard.bind(
              this,
              this.state.flashcard.id
            )}
          >
            Delete Flashcard{" "}
          </button>
        </div>
      </div>
    );
  }

  editCard() {
    return (
      <div className="showFlashcards">
        <div className="addCards">
          <h3>Edit Card</h3>
          <form>
            <label>
              word in native:
              <input
                placeholder="word in native"
                type="text"
                value={this.state.wordInNative}
                onChange={this.handleChangeNative}
              />
            </label>
            <label>
              word in foreign:
              <input
                placeholder="word in foreign"
                type="text"
                value={this.state.wordInForeign}
                onChange={this.handleChangeForeign}
              />
            </label>
          </form>
          <button onClick={this.handleEditCard.bind(this)}> Edit </button>
          <button onClick={this.handleChangeOption.bind(this, "show")}>
            {" "}
            Go back{" "}
          </button>
        </div>
      </div>
    );
  }

  addCard() {
    return (
      <div className="showFlashcards">
        <div className="addCards">
          <h3>Add Card</h3>
          <form>
            <label>
              word in native:
              <input
                placeholder="word in native"
                type="text"
                value={this.state.wordInNative}
                onChange={this.handleChangeNative}
              />
            </label>
            <label>
              word in foreign:
              <input
                placeholder="word in foreign"
                type="text"
                value={this.state.wordInForeign}
                onChange={this.handleChangeForeign}
              />
            </label>
          </form>
          <button onClick={this.handleAddCard.bind(this)}> Add </button>
          <button onClick={this.handleChangeOption.bind(this, "show")}>
            {" "}
            Go back{" "}
          </button>
        </div>
      </div>
    );
  }
}
export default FlashcardsList;
