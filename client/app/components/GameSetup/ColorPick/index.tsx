import React, { FC, HTMLAttributes } from "react";
import LongArrow from "../../icons/LongArrow";
import Piece from "../../icons/Piece";
import PieceBRandom from "../../icons/PieceBRandom";
import Card from "../Card";
import Subtitle from "../Subtitle";
import "./index.scss";
import PieceButton from "/client/app/shared/Buttons/PieceButton";
import TextButton from "/client/app/shared/Buttons/TextButton";

interface IColorPickProps extends HTMLAttributes<HTMLDivElement> {}

const ColorPick: FC<IColorPickProps> = ({ className }) => (
  <Card className={className}>
    <Subtitle className="colorPick__subtitle">Color</Subtitle>
    <div className="colorPick__colors d-flex justify-center align-items-center">
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

    <TextButton className="colorPick__variants-btn">
      Variants <LongArrow />
    </TextButton>
  </Card>
);

export default ColorPick;
