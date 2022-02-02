import { getStyleOnStatusClock } from "/client/app/data/utils";
import RapidIcon from "/client/app/shared/GameTitle/children/RapidIcon";
import Heading2 from "/client/app/shared/Typographies/Heading2";
import { useAppSelector } from "/client/app/store/hooks";
import clsx from "clsx";
import React, { FCICC } from "react";

interface IGameTitle {
  minutes: number;
  instance?: string;
  date?: string;
}

const GameTitle: FCICC<IGameTitle> = ({ minutes, instance, date }) => {
  const classes = useAppSelector((state) => state.theming.classes);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "fit-content",
        alignItems: "center",
      }}
    >
      <RapidIcon />
      <div className={clsx(classes.gameTitleTitle)}>
        {window.i18n.translate("game_title_title", `${minutes}`)}
      </div>
      {instance && (
        <div className={clsx(classes.gameTitleInstance)}>
          {" "}
          {window.i18n.translate(instance)}
        </div>
      )}
      {date && (
        <div className={clsx(classes.gameTitleDate)}>
          {" "}
          {window.i18n.translate(date)}
        </div>
      )}
    </div>
  );
};

export default GameTitle;
