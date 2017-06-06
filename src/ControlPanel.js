import React, { Component } from "react";
import * as T from "prop-types";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";

export class ControlPanel extends Component {
  constructor(props) {
    super(props);

    this._handlePutOnTopOfDeck = this._handlePutOnTopOfDeck.bind(this);
    this._handlePutOnBottomOfDeck = this._handlePutOnBottomOfDeck.bind(this);
  }

  _handlePutOnTopOfDeck() {
    this.props.putOnTopOfDeck(this.props.selected);
  }

  _handlePutOnBottomOfDeck(){
    this.props.putOnBottomOfDeck(this.props.selected);
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

        <div>
          <DefaultButton onClick={this.props.shuffle}>
            Shuffle
          </DefaultButton>
          <DefaultButton onClick={this.props.reset}>
            Reset
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
          <DefaultButton
            onClick={this._handlePutOnTopOfDeck}
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
  gameStatus: T.string,
  currentPlayer: T.object,
  selected: T.array,
};

export default ControlPanel;
