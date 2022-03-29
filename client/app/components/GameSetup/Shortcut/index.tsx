import clsx from "clsx";
import React, { FC, HTMLAttributes } from "react";
import Card from "../../Card";
import Subtitle from "../../Subtitle";
import Switch from "/client/app/shared/Switch";
import "./index.scss";
import { useTranslate } from "/client/app/hooks";

interface IShortcutProps extends HTMLAttributes<HTMLElement> {}

const Shortcut: FC<IShortcutProps> = ({ className }) => {
  const { t } = useTranslate();

  return (
    <Card className={clsx("shortcut d-flex space-between", className)}>
      <Subtitle>{t("makeShortcut")}</Subtitle>
      <Switch name="shortcut" />
    </Card>
  );
};

export default Shortcut;
