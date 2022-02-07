import React, { FCICC } from "react";
import "./index.scss";
import RapidIcon from "/client/app/shared/GameTitle/children/RapidIcon";
import clsx from "clsx";

interface IGameTitle {
  minutes: number;
  instance?: string;
  date?: string;
}

const GameTitle: FCICC<IGameTitle> = ({ minutes, instance, date }) => (
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
    <div className={clsx("gameTitleTitle")} style={{ marginLeft: "10px" }}>
      {window.i18n.translate("game_title_title", `${minutes}`)}
    </div>
    {instance && (
      <div className={clsx("gameTitleInstance")}>
        {" "}
        {window.i18n.translate(instance)}
      </div>
    )}
    {date && (
      <div className={clsx("gameTitleDate")}>
        {" "}
        {window.i18n.translate(date)}
      </div>
    )}
  </div>
);

export default GameTitle;
