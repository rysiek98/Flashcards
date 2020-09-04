import React, { Component, useEffect, useState } from "react";
import "../style/addFlashcard.css";
import axios from "axios";

class addFlashcard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cards: [],
    };

    this.handleChangeNative = this.handleChangeNative.bind(this);
    this.handleChangeForeign = this.handleChangeForeign.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
    this.handleAddToBase = this.handleAddToBase.bind(this);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
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

  handleAddCard() {
    this.setState({
      cards: this.state.cards.concat({
        wordInNative: this.state.wordInNative,
        wordInForeign: this.state.wordInForeign,
      }),
    });

    this.setState({ wordInNative: "" });
    this.setState({ wordInForeign: "" });
  }

  handleAddToBase() {
    axios
      .post("http://localhost:9090/api/flashcards", {
        name: this.state.name,
        cards: this.state.cards,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    this.resetState();
  }

  resetState() {
    this.setState({ name: "" });
    this.setState({ wordInNative: "" });
    this.setState({ wordInForeign: "" });
    this.setState({ cards: [] });
  }
  componentDidMount() {
    axios.get("http://localhost:9090/api/flashcards").then((res) => {
      const flashcards = res.data;
      this.setState({ flashcards });
    });
  }

  render() {
    return (
      <div className="addFlashcard">
        <h1>Create a new Flashcard</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            flashcard name:
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChangeName}
              placeholder="Flashcard name"
            />
          </label>
        </form>
        <div className="addCards">
          <h3>Added Cards {this.state.cards.length}</h3>
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
          <button onClick={this.handleAddCard.bind()}> Add card </button>
        </div>
        <div>
          <button onClick={this.handleAddToBase.bind()}>Add Flashcard </button>
        </div>
      </div>
    );
  }
}
export default addFlashcard;
