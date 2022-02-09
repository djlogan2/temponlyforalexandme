import clsx from "clsx";
import { noop } from "lodash";
import React, { FC, FCICC, useState } from "react";
import { SCREEN_LARGE } from "../../constants/breakpoints";
import useWindowSize from "../../hooks/userWindowSize";
import ActionButton from "../../shared/Buttons/ActionButton";
import RegularButton from "../../shared/Buttons/RegularButton";
import SmallButton from "../../shared/Buttons/SmallButton";
import ScrollBar from "../../shared/ScrollBar";
import SmallParagraph from "../../shared/Typographies/SmallParagraph";
import { ComponentsMap, TFigures } from "../CapturedPieces";
import Abort from "../icons/Abort";
import Back from "../icons/Back";
import Draw from "../icons/Draw";
import Next from "../icons/Next";
import NextEnd from "../icons/NextEnd";
import Prev from "../icons/Prev";
import PrevEnd from "../icons/PrevEnd";
import Resign from "../icons/Resign";
import "./index.scss";

const RequestMapIcons = {
  draw: Draw,
  resign: Resign,
  abort: Abort,
  back: Back,
};

const RequestButtonText = {
  draw: "ACCEPT DRAW",
  abort: "ACCEPT ABORT",
  back: "ACCEPT TAKE BACK",
  resign: "CONFIRM RESIGN",
};

interface IMovelistProps {
  openingName: string;
  // TODO. once data comes in defined structure change places where this array is used
  moves: any[];
  onResignClick?: () => void;
  onDrawClick?: () => void;
  onRequestAccept?: () => void;
  onRequestReject?: () => void;
  request?: "draw" | "abort" | "back";
  className?: string;
}

const Pieces: {
  [key in TFigures]: FC<{ width: number; height: number; color: string }>;
} = {
  ...ComponentsMap,
};

const Movelist: FCICC<IMovelistProps> = ({
  openingName,
  moves,
  request,
  onResignClick = noop,
  onDrawClick = noop,
  onRequestAccept = noop,
  onRequestReject = noop,
  className,
}) => {
  const [confirmResign, setConfirmResign] = useState(false);
  const { width } = useWindowSize();

  const onRequestRejectHandler = () => {
    if (confirmResign) {
      setConfirmResign(false);
    }

    onRequestAccept();
  };

  const RequestIcon =
    (request || confirmResign) && RequestMapIcons[request || "resign"];

  return (
    <div className={clsx("movelistContainer", className)}>
      <div className="movelistTopActions">
        <PrevEnd />
        <Prev />
        <Next />
        <NextEnd />
      </div>

      <div className="movelistMovesContainer">
        <ScrollBar thumbSize={width >= SCREEN_LARGE ? 48.68 : 31.76}>
          <div className="movelistMoves">
            {moves.map((move, i) => {
              const WhitePiece = Pieces[move.second.piece as TFigures];

              const BlackPiece = Pieces[move.second.piece as TFigures];

              return (
                <div key={`${i}-item`} className="movelistItem">
                  <span>{i + 1}</span>
                  <div>
                    {!!WhitePiece && (
                      <WhitePiece color="black" width={19} height={15} />
                    )}
                    <span className="span-margin">{move.first.move}</span>
                  </div>
                  <div>
                    {!!BlackPiece && (
                      <BlackPiece color="black" width={19} height={15} />
                    )}
                    <span className="span-margin">{move.second.move}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollBar>
      </div>

      <div className="movelistOpeningNameContainer">
        <SmallParagraph
          className="movelistOpeningName"
          name="Opening game"
          token={{ token: openingName, args: [] }}
          keyboardFunctions={[]}
          classes={[]}
        />
      </div>

      {RequestIcon ? (
        <div>
          <RegularButton>
            <span className="regular-span">
              <RequestIcon width={22} height={22} />
            </span>
            {RequestButtonText[request || "resign"]}
          </RegularButton>

          <div
            style={{
              display: "flex",
              justifyContent: !confirmResign ? "space-between" : "center",
              marginTop: 10,
            }}
          >
            <SmallButton color="red" onClick={onRequestRejectHandler}>
              {!confirmResign ? "REJECT" : "CANCEL"}
            </SmallButton>
            {!confirmResign && (
              <SmallButton onClick={onRequestReject}>NEVER</SmallButton>
            )}
          </div>
        </div>
      ) : (
        <div className="movelistActions">
          <ActionButton
            color="red"
            size="small"
            name="fakeButton"
            token={{ token: "M", args: [] }}
            keyboardFunctions={[]}
            classes={[]}
            onButtonClick={onResignClick}
            hoverText="REJECT"
            onClick={() => {
              setConfirmResign(true);
            }}
          >
            <Resign />
          </ActionButton>
          <ActionButton
            size="small"
            name="fakeButton"
            token={{ token: "M", args: [] }}
            keyboardFunctions={[]}
            classes={[]}
            onButtonClick={onDrawClick}
            hoverText="DRAW"
          >
            <Draw />
          </ActionButton>
        </div>
      )}
    </div>
  );
};

export default Movelist;
