import React from "react";
import Arrow from "../../icons/Arrow";
import Close from "../../icons/Close";

const Controls = () => (
  <div className="d-flex space-between">
    <Arrow className="pointer controls__icon" />
    <Close className="pointer controls__icon" />
  </div>
);

export default Controls;
