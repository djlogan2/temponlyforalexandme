import React from "react";
import Arrow from "../../icons/Arrow";
import Close from "../../icons/Close";

const GameSetupControls = () => (
  <div className="d-flex space-between">
    <Arrow className="pointer gameSetupControls__icon" />
    <Close className="pointer gameSetupControls__icon" />
  </div>
);

export default GameSetupControls;
