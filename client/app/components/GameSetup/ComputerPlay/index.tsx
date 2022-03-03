import React, { FC, HTMLAttributes } from "react";
import LongArrow from "../../icons/LongArrow";
import Card from "../Card";
import ColorPick from "../ColorPick";
import RatedGame from "../RatedGame";
import Subtitle from "../Subtitle";
import TimeOptions from "../TimeOptions";
import RangeSlider from "/client/app/shared/RangeSlider";
import { EComponents, TTimeOption } from "../types";
import "./index.scss";
import StandardButton from "/client/app/shared/Buttons/StandardButton";
import Input from "/client/app/shared/Input";

interface IComputerPlayProps extends HTMLAttributes<HTMLDivElement> {
  navigate: (tab: EComponents) => void;
}

const ComputerPlay: FC<IComputerPlayProps> = () => (
  <div className="computerPlay">
    <Subtitle size="big" className="computerPlay__subtitle">
      Set game options
    </Subtitle>

    <TimeOptions className="computerPlay__card" />

    <Card className="computerPlay__card computerPlay__rangeSlider">
      <Subtitle size="small" className="computerPlay__sliderSubtitle">
        Computer profile
      </Subtitle>
      <RangeSlider min={1000} max={2000} value={1500} />
    </Card>

    <ColorPick className="computerPlay__card computerPlay__colors" />

    <RatedGame className="computerPlay__card computerPlay__rated" />

    <Card className="computerPlay__card computerPlay__fen">
      <Subtitle size="small" className="computerPlay__positionSubtitle">
        Starting position
      </Subtitle>

      <Input
        name="startingFen"
        label="Description"
        icon={<LongArrow />}
        className="computerPlay__fen-input"
        placeholder="Share FEN"
      />
    </Card>

    <StandardButton color="primary">Play</StandardButton>
  </div>
);

export default ComputerPlay;
