import React from "react";
import { SCREEN_LARGE } from "../../constants/breakpoints";
import { useWindowSize } from "../../hooks";
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

interface Props {
  onClose: () => void;
}

const GameOver = ({ onClose }: Props) => {
  const { width } = useWindowSize();

  return width ? (
    <Backdrop pRelative={width >= SCREEN_LARGE}>
      <Card className="gameOver">
        <Close className="gameOver__closeIcon pointer" onClick={onClose} />
        <Heading2 className="weight-700">Black won!</Heading2>
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
          <Heading3 className="weight-700">1-0</Heading3>
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
          <StandardButton color="primary">Rematch</StandardButton>
          <StandardButton>New 1 min</StandardButton>
          <StandardButton>Analysis</StandardButton>
        </div>
      </Card>
    </Backdrop>
  ) : null;
};

export default GameOver;
