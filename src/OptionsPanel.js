import React from "react";
import * as T from "prop-types";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { CommandButton } from "office-ui-fabric-react/lib/Button";

/* custom stuff */
import './OptionsPanel.css';

/* Flux */
import AppActions from "./actions/AppActions";

const OptionsPanel = props => {
  const resetGame = () => {
    AppActions.reset();
    AppActions.newDeck();
    AppActions.showMessageBar("Game Reset");
  };

  return (
    <Panel
      id="OptionsPanel"
      isOpen={props.isOptionsPanelVisible}
      onDismiss={AppActions.hideOptionsPanel}
      type={PanelType.smallFixedNear}
      headerText="Options"
      isLightDismiss
    >
      <div id="ButtonColumn">
        <CommandButton
          iconProps={{ iconName: "Refresh" }}
          disabled={false}
          checked={false}
          onClick={resetGame}
        >
          Reset Game
        </CommandButton>

        <CommandButton
          iconProps={{ iconName: "StackIndicator" }}
          disabled={false}
          checked={false}
          onClick={AppActions.deal}
        >
          Deal
        </CommandButton>

        <Toggle
          checked={props.isDeckVisible}
          label="Show Deck"
          onAriaLabel="The deck is visible. Pres to hide it."
          offAriaLabel="The deck is not visible. Press to show it."
          onText="On"
          offText="Off"
          onChanged={checked => AppActions.toggleDeckVisibility(checked)}
          value
        />
        <Toggle
          checked={props.isDrawnVisible}
          label="Show Drawn"
          onAriaLabel="The Drawn cards are visible. Pres to hide it."
          offAriaLabel="The Drawn cards are not visible. Press to show it."
          onText="On"
          offText="Off"
          onChanged={checked => AppActions.toggleDrawnVisibility(checked)}
        />
        <Toggle
          checked={props.isSelectedVisible}
          label="Show Selected"
          onAriaLabel="The Selected cards are visible. Pres to hide it."
          offAriaLabel="The Selected cards are not visible. Press to show it."
          onText="On"
          offText="Off"
          onChanged={checked => AppActions.toggleSelectedVisibility(checked)}
        />
      </div>
    </Panel>
  );
};

OptionsPanel.propTypes = {
  isOptionsPanelVisible: T.bool.isRequired,
  isDeckVisible: T.bool.isRequired,
  isDrawnVisible: T.bool.isRequired,
  isSelectedVisible: T.bool.isRequired
};

export default OptionsPanel;
