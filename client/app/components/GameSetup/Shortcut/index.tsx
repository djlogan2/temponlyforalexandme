import clsx from "clsx";
import React, { FC, HTMLAttributes } from "react";
import Card from "../../Card";
import Subtitle from "../../Subtitle";
import Switch from "/client/app/shared/Switch";
import "./index.scss";

interface IShortcutProps extends HTMLAttributes<HTMLElement> {}

const Shortcut: FC<IShortcutProps> = ({ className }) => (
  <Card className={clsx("shortcut d-flex space-between", className)}>
    <Subtitle>Make it a Shortcut</Subtitle>
    <Switch name="shortcut" />
  </Card>
);

export default Shortcut;
