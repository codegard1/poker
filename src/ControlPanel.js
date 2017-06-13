import React, { Component } from "react";
import * as T from "prop-types";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";

/** Contains buttons that manipulate state in Table
 * @namespace ControlPanel
 * @memberof App.Components
 * @prop {function} putOnBottomOfDeck   - move selected cards to the bottom of the deck (in state)
 * @prop {function} putOnTopOfDeck  - move selected cards to the top of the deck (in state)
 * @prop {function} drawRandom  - draw a random card from the deck (in state)
 * @prop {function} drawFromBottomOfDeck  - draw arbitrary number of cards from the bottom of the deck (in state)
 * @prop {function} draw  - draw arbitrary number of cards from the top of the deck (in state)
 * @prop {function} reset   - reset the deck (in state); order cards by suit and number 
 * @prop {function} shuffle   - shuffle the deck (in state)
 * @prop {function} deal  - moves an arbitrary number of cards to the current player's hand (in state)
 * @prop {function} hit   - move one card to the current player's hand (in state)
 * @prop {function} stay  - advances turn to the next player (in state)
 * @prop {function} resetGame   - resets the deck, players' hands, drawn, and selected arrays, and sets gameStatus to New 
 * @prop {string} gameStatus - string representing the current game's status
 * @prop {number} currentPlayer - index of of the players array (in state) that corresponds to the current player 
 * @prop {array} selected - array containing currently selected cards; passed in from state
  */
export class ControlPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let selectedFlag = this.props.selected.length > 0 ? false : true;
    let bustedFlag = false;
    let gameStatus = this.props.gameStatus;
    let currentPlayer = this.props.currentPlayer || undefined;

    // set bustedFlag
    if (currentPlayer) {
      bustedFlag = this.props.currentPlayer.status === "busted" ? true : false;
    }

    const gameStatusDisplay =
      gameStatus &&
      <p className="ms-font-l">
        <span>
          Game Status: <strong>{gameStatus || "N/A"}</strong>
        </span>
      </p>;

    const currentPlayerDisplay =
      currentPlayer &&
      <p className="ms-font-l">
        <span>{`Current Player: ${currentPlayer.title}`}</span> <br />
        <span>{`Player Status: ${currentPlayer.status}`}</span>
      </p>;

    const buttons = (
      <div>

        <div>
          {!this.props.gameStatus &&
            <DefaultButton title="Deal" onClick={this.props.deal}>
              Deal
            </DefaultButton>}

          {this.props.gameStatus &&
            <DefaultButton
              title="Hit"
              onClick={this.props.hit}
              disabled={bustedFlag}
            >
              Hit
            </DefaultButton>}
          {this.props.gameStatus &&
            <DefaultButton
              title="Stay"
              onClick={this.props.stay}
              disabled={bustedFlag}
            >
              Stay
            </DefaultButton>}
          <DefaultButton onClick={this.props.resetGame}>
            Reset Game
          </DefaultButton>
        </div>

        <div>
          <DefaultButton onClick={this.props.shuffle}>
            Shuffle
          </DefaultButton>
          <DefaultButton onClick={this.props.draw}>
            Draw
          </DefaultButton>
          <DefaultButton onClick={this.props.drawFromBottomOfDeck}>
            Draw from Bottom of Deck
          </DefaultButton>
          <DefaultButton onClick={this.props.drawRandom}>
            Draw Random
          </DefaultButton>
        </div>

        <div>
          <DefaultButton
            onClick={this.props.putOnTopOfDeck}
            disabled={selectedFlag}
          >
            Put on Top of Deck
          </DefaultButton>
          <DefaultButton
            onClick={this.props.putOnBottomOfDeck}
            disabled={selectedFlag}
          >
            Put on Bottom of Deck
          </DefaultButton>
        </div>

      </div>
    );

    return (
      <div id="ControlPanel">
        {gameStatus &&
          <div id="StatusPanel">
            {gameStatusDisplay}
            {currentPlayerDisplay}
          </div>}
        <div id="button-container">
          {buttons}
        </div>
      </div>
    );
  }
}

ControlPanel.propTypes = {
  putOnBottomOfDeck: T.func,
  putOnTopOfDeck: T.func,
  drawRandom: T.func,
  drawFromBottomOfDeck: T.func,
  draw: T.func,
  reset: T.func,
  shuffle: T.func,
  deal: T.func,
  hit: T.func,
  stay: T.func,
  resetGame: T.func,
  gameStatus: T.string,
  currentPlayer: T.object,
  selected: T.array
};

export default ControlPanel;
