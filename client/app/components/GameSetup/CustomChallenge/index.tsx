import React, { FC } from "react";
import LongArrow from "../../icons/LongArrow";
import Piece from "../../icons/Piece";
import PieceBRandom from "../../icons/PieceBRandom";
import PieceButton from "/client/app/shared/Buttons/PieceButton";
import StandardButton from "/client/app/shared/Buttons/StandardButton";
import TextButton from "/client/app/shared/Buttons/TextButton";
import Checkbox from "/client/app/shared/Checkbox";
import Input from "/client/app/shared/Input";
import Switch from "/client/app/shared/Switch";

interface ICustomChallengeProps {}

const CustomChallenge: FC<ICustomChallengeProps> = () => (
  <div className="customChallenge">
    <div className="customChallenge__card">
      <p className="customChallenge__subtitle">Time control</p>
      <div className="customChallenge__inputs">
        <Input label="Move" name="move1" placeholder="00m" type="number" />
        <Input label="Move" name="mov2" placeholder="00m" type="number" />
      </div>
      <p className="customChallenge__checkbox">
        <Checkbox name="checkbox" />
        <span className="customChallenge__textPlaceholder">
          Text placeholder
        </span>
      </p>
    </div>
    <div className="customChallenge__card d-flex space-between">
      <p className="customChallenge__subtitle">Rated Game</p>
      <Switch name="rated" />
    </div>
    <div className="customChallenge__card">
      <p className="customChallenge__subtitle">Time control</p>

      <div className="customChallenge__ratings d-flex space-between">
        <span className="customChallenge__decrease customChallenge__rating">
          1000{" "}
          <button type="button" className="customChallenge__btnRating">
            -
          </button>
        </span>
        <span className="customChallenge__middle customChallenge__rating">
          1200{" "}
        </span>
        <span className="customChallenge__increase customChallenge__rating">
          1400{" "}
          <button type="button" className="customChallenge__btnRating">
            +
          </button>
        </span>
      </div>
    </div>
    <div className="customChallenge__card">
      <p className="customChallenge__subtitle">Color</p>
      <div className="customChallenge__colors d-flex justify-center align-items-center">
        <PieceButton size="small">
          <Piece />
        </PieceButton>
        <PieceButton size="big">
          <PieceBRandom />
        </PieceButton>
        <PieceButton size="small">
          <Piece />
        </PieceButton>
      </div>

      <TextButton className="customChallenge__variants-btn">
        Variants <LongArrow />
      </TextButton>
    </div>
    <div className="customChallenge__card d-flex space-between">
      <p className="customChallenge__subtitle">Make it a Shortcut</p>
      <Switch name="shortcut" />
    </div>

    <div className="customChallenge__actions">
      <StandardButton color="primary" height="small">
        Launch Challenge
      </StandardButton>
      <StandardButton color="regular" height="small">
        Share challenge
      </StandardButton>
    </div>
  </div>
);

export default CustomChallenge;
