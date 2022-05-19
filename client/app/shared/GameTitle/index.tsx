import React, { FC } from "react";
import "./index.scss";
import { RapidIcon } from "/client/app/shared/GameTitle/children/RapidIcon";
import clsx from "clsx";
import { useTranslate } from "../../hooks";

type GameTitleProps = {
  minutes: number;
  instance?: string;
  date?: string;
  className?: string;
};

export const GameTitle: FC<GameTitleProps> = ({
  minutes,
  instance,
  date,
  className,
}) => {
  const { t } = useTranslate();

  return (
    <div className={clsx("gameTitle", className)}>
      <RapidIcon />
      <div className={clsx("gameTitleTitle")}>
        {t("game_title_title", `${minutes}`)}
      </div>
      {instance && (
        <div className={clsx("gameTitleInstance")}> {t(instance)}</div>
      )}
      {date && <div className={clsx("gameTitleDate")}> {t(date)}</div>}
    </div>
  );
};
