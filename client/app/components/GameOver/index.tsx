import React from "react";

import { useHistory } from "react-router";

import { GameStatus } from "/lib/records/GameRecord";
import { SCREEN_LARGE } from "/client/app/constants/breakpoints";
import { useWindowSize } from "/client/app/hooks";

import {
  Backdrop,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Paragraph,
  SmallParagraph,
  StandardButton,
} from "../../shared";
import Card from "../Card";
import Close from "../icons/Close";

import "./index.scss";

type Props = {
  result: GameStatus;
  onClose: () => void;
  onRematch: () => void;
  onAnalysis: () => void;
};

const gameResults = {
  "0-1": "Black won!",
  "1-0": "White won!",
  "1/2-1/2": "Draw",
  "*": "",
};

const GameOver = ({ result, onClose, onRematch, onAnalysis }: Props) => {
  const { width } = useWindowSize();
  const history = useHistory();

  return width ? (
    <Backdrop pRelative={width >= SCREEN_LARGE}>
      <Card className="gameOver">
        <Close className="gameOver__closeIcon pointer" onClick={onClose} />
        <Heading2 className="weight-700">{gameResults[result]}</Heading2>
        <Paragraph className="gameOver__description">
          Description of the game&apos;s result.
        </Paragraph>

        <div className="gameOver__players">
          <div className="gameOver__player-container">
            <div className="gameOver__img-container gameOver__img-container--won">
              <img
                className="gameOver__userPic"
                src="https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                alt=""
              />
            </div>
            <Paragraph className="weight-700 text-center">User name</Paragraph>
          </div>
          <Heading3 className="weight-700">{result}</Heading3>
          <div className="gameOver__player-container">
            <div className="gameOver__img-container gameOver__img-container--lost">
              <img
                className="gameOver__userPic"
                src="https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                alt=""
              />
            </div>
            <Paragraph className="weight-700 text-center">User name</Paragraph>
          </div>
        </div>

        <div className="gameOver__rating-container">
          <SmallParagraph className="gameOver__ratingRapid">
            Rating rapid
          </SmallParagraph>
          <Heading1 className="weight-700">500</Heading1>
          <Heading4>-30</Heading4>
        </div>

        <div className="gameOver__actions">
          <StandardButton onClick={onRematch} color="primary">
            Rematch
          </StandardButton>
          <StandardButton>New 1 min</StandardButton>
          <StandardButton onClick={onAnalysis}>Analysis</StandardButton>
        </div>
      </Card>
    </Backdrop>
  ) : null;
};

export default GameOver;
