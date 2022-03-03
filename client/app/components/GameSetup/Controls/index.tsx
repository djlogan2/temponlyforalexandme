import React, { FC } from "react";
import Arrow from "../../icons/Arrow";
import Close from "../../icons/Close";

interface IControlsProps {
  onCloseModal: () => void;
  onReturnBack: () => void;
}

const Controls: FC<IControlsProps> = ({ onCloseModal, onReturnBack }) => (
  <div className="d-flex space-between">
    <Arrow className="pointer controls__icon" onClick={onReturnBack} />
    <Close className="pointer controls__icon" onClick={onCloseModal} />
  </div>
);

export default Controls;
