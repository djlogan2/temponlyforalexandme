import clsx from "clsx";
import React, { FC, HTMLAttributes } from "react";
import Card from "../../Card";
import Subtitle from "../../Subtitle";
import Switch from "/client/app/shared/Switch";
import "./index.scss";

interface IRatedGameProps extends HTMLAttributes<HTMLElement> {}

const RatedGame: FC<IRatedGameProps> = ({ className }) => (
  <Card className={clsx("ratedGame d-flex space-between", className)}>
    <Subtitle>Rated Game</Subtitle>
    <Switch name="rated" />
  </Card>
);

export default RatedGame;
