import React, { FC } from "react";
import { Arrow } from "../../icons/Arrow";
import { Close } from "../../icons/Close";

type ControlsProps = {
  onCloseModal: () => void;
  onReturnBack: () => void;
};

export const Controls: FC<ControlsProps> = ({ onCloseModal, onReturnBack }) => (
  <div className="d-flex space-between">
    <Arrow className="pointer controls__icon" onClick={onReturnBack} />
    <Close className="pointer controls__icon" onClick={onCloseModal} />
  </div>
);
