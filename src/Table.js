import React, { Component } from "react";
import Shuffle from "shuffle";
import DeckContainer from "./DeckContainer";
import ControlPanel from "./ControlPanel";

export class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: undefined,
      players: ["Player1"]
    };

    this._putOnBottomOfDeck = this._putOnBottomOfDeck.bind(this);
    this._putOnTopOfDeck = this._putOnTopOfDeck.bind(this);
    this._drawRandom = this._drawRandom.bind(this);
    this._drawFromBottomOfDeck = this._drawFromBottomOfDeck.bind(this);
    this._draw = this._draw.bind(this);
    this._reset = this._reset.bind(this);
    this._shuffle = this._shuffle.bind(this);
  }

  componentWillMount() {
    const deck = Shuffle.shuffle();
    console.log("deck:", deck);
    this.setState({
      deck: deck
    });
  }

  _shuffle() {
    const deck = this.state.deck;
    console.log("_shuffle new deck:", deck);
    deck.shuffle();
    this.setState({ deck });
  }

  _reset() {
    const deck = this.state.deck;
    deck.reset(); //sets the deck back to a full 52-card deck, unshuffled
    this.setState({ deck: deck });
  }
  _draw(num) {
    const deck = this.state.deck;
    const ret = deck.draw(1);
    console.log("draw:", ret);
    this.setState({ deck });
  }

  _drawFromBottomOfDeck(num) {
    const deck = this.state.deck;
    const ret = deck.drawFromBottomOfDeck(1);
    console.log("drawFromBottomOfDeck:", ret);
    this.setState({ deck });
  }

  _drawRandom(num) {
    const deck = this.state.deck;
    const ret = deck.drawRandom(1);
    console.log("drawRandom:", ret);
    this.setState({ deck });
  }

  _putOnTopOfDeck(cards) {
    const deck = this.state.deck;
    console.log("putOnTopOfDeck:");
  }

  _putOnBottomOfDeck(cards) {
    const deck = this.state.deck;
    console.log("putOnBottomOfDeck:");
  }

  _deal() {
    const deck = this.state.deck;
    const player1 = "Chris";
    deck.deal(1, [player1]);
    this.setState({ deck: deck });
  }

  render() {
    return (
      <div id="Table">
        <DeckContainer deck={this.state.deck} />
        <ControlPanel
          shuffle={this._shuffle}
          putOnBottomOfDeck={this._putOnBottomOfDeck}
          putOnTopOfDeck={this._putOnTopOfDeck}
          drawRandom={this._drawRandom}
          drawFromBottomOfDeck={this._drawFromBottomOfDeck}
          draw={this._draw}
          reset={this._reset}
        />
      </div>
    );
  }
}

export default Table;