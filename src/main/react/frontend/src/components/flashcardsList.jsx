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
      name: "",
    };

    this.handleSelected = this.handleSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteFlashcard = this.handleDeleteFlashcard.bind(this);
    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleChangeNative = this.handleChangeNative.bind(this);
    this.handleChangeForeign = this.handleChangeForeign.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleEditCard = this.handleEditCard.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
    this.handleChangeFlashcardName = this.handleChangeFlashcardName.bind(this);
  }

  handleChangeFlashcardName() {
    let FlashcardCopy = this.state.flashcard;
    FlashcardCopy.name = this.state.name;
    this.setState({ flashcard: FlashcardCopy });
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
    this.setState({ name: "" });
    this.handleChangeOption("show");
  }

  handleDeleteFlashcard(id) {
    const URL = "http://localhost:9090/api/flashcards/" + id;
    axios.delete(URL).then((res) => {
      console.log(res);
    });
    this.setState({ selected: false });
    this.resetState();

    window.location.reload(false);
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

  handleChangeName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleChangeOption(option) {
    switch (option) {
      case "add":
        this.setState({ option: "add" });
        this.setState({ wordInNative: "" });
        this.setState({ wordInForeign: "" });
        break;
      case "edit":
        if (this.state.selectedCardID !== 0) {
          this.setState({ option: "edit" });
        } else {
          this.setState({ option: "show" });
        }
        break;

      case "editName":
        this.setState({ option: "editName" });
        this.setState({ name: this.state.flashcard.name });
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
      this.setState({ selectedCard: null });
      this.setState({ selectedCardID: 0 });
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

        case "editName":
          return this.editName();

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
          <button
            style={{ backgroundColor: "#b70100" }}
            onClick={this.handleDeleteFlashcard.bind(
              this,
              this.state.flashcard.id
            )}
          >
            Delete Flashcard{" "}
          </button>
          <button
            style={{ backgroundColor: "#b70100" }}
            onClick={this.handleChangeOption.bind(this, "editName")}
          >
            Change Flashcard Name{" "}
          </button>
          <button
            style={{ backgroundColor: "#00b730" }}
            onClick={this.handleChange.bind(this, null)}
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  editCard() {
    return (
      <div className="showFlashcards">
        <div className="editCard">
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
        <div className="addCard">
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

  editName() {
    return (
      <div className="showFlashcards">
        <div className="editCard">
          <h3>Change Flashcard name</h3>
          <form>
            <label>
              flashcard name:
              <input
                placeholder="Flashcard name"
                type="text"
                value={this.state.name}
                onChange={this.handleChangeName}
              />
            </label>
          </form>
          <button onClick={this.handleChangeFlashcardName.bind(this)}>
            {" "}
            Edit{" "}
          </button>
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
