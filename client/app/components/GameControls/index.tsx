import React, { FC, HTMLAttributes } from "react";
import Next from "/client/app/components/icons/Next";
import NextEnd from "/client/app/components/icons/NextEnd";
import Prev from "/client/app/components/icons/Prev";
import PrevEnd from "/client/app/components/icons/PrevEnd";

interface IControls extends HTMLAttributes<HTMLDivElement> {
  onPrevEndClick: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  onNextEndClick: () => void;
}

const Controls: FC<IControls> = ({
  onPrevClick,
  onPrevEndClick,
  onNextClick,
  onNextEndClick,
  ...rest
}) => (
  <div {...rest}>
    <PrevEnd onClick={onPrevEndClick} />
    <Prev onClick={onPrevClick} />
    <Next onClick={onNextClick} />
    <NextEnd onClick={onNextEndClick} />
  </div>
);

export default Controls;
