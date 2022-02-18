import clsx from "clsx";
import { noop } from "lodash";
import React, { FCICC, Fragment, useState } from "react";
import { SCREEN_LARGE } from "../../constants/breakpoints";
import useWindowSize from "../../hooks/userWindowSize";
import ActionButton from "../../shared/Buttons/ActionButton";
import RegularButton from "../../shared/Buttons/RegularButton";
import SmallButton from "../../shared/Buttons/SmallButton";
import ScrollBar from "../../shared/ScrollBar";
import SmallParagraph from "../../shared/Typographies/SmallParagraph";
import { TFigures } from "../CapturedPieces";
import Abort from "../icons/Abort";
import Back from "../icons/Back";
import Draw from "../icons/Draw";
import Knight from "../icons/MovelistPieces/Knight";
import Bishop from "../icons/MovelistPieces/Bishop";
import Next from "../icons/Next";
import NextEnd from "../icons/NextEnd";
import Prev from "../icons/Prev";
import PrevEnd from "../icons/PrevEnd";
import Resign from "../icons/Resign";
import "./index.scss";
import Rook from "../icons/MovelistPieces/Rook";

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

export interface IMoveItem {
  bcurrent: number;
  eco: {
    name: string;
    code: string;
  };
  move: string;
  prev: number;
  smith: {
    color: "w" | "b";
    flags: string;
    from: string;
    piece: TFigures;
    san: string;
    to: string;
  };
  wcurrent: number;
}

interface IMovelistProps {
  openingName: string;
  moves: IMoveItem[];
  onResignClick?: () => void;
  onDrawClick?: () => void;
  onRequestAccept?: () => void;
  onRequestReject?: () => void;
  request?: "draw" | "abort" | "back";
  className?: string;
}

const Pieces = {
  n: Knight,
  b: Bishop,
  r: Rook,
  k: undefined,
  q: undefined,
  p: undefined,
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
    <div className={clsx("movelist", className)}>
      <div className="movelist__controls">
        <PrevEnd />
        <Prev />
        <Next />
        <NextEnd />
      </div>

      <div className="movelist__moves-container">
        <ScrollBar thumbSize={width >= SCREEN_LARGE ? 48.68 : 31.76}>
          <div className="movelist__moves">
            {moves.length >= 1 &&
              moves.map((move, i) => {
                const { color, piece, to } = move.smith;
                const Piece = Pieces[piece];
                const rowNumber = Math.ceil((i + 1) / 2);

                return (
                  <Fragment key={i}>
                    {i % 2 === 0 && (
                      <span className="movelist__item--number">
                        {rowNumber}
                      </span>
                    )}

                    <div
                      className={`movelist__item--${
                        color === "w" ? "center" : "right"
                      }`}
                    >
                      {Piece && <Piece className="movelist__piece" />}
                      {to}
                    </div>
                    {i !== 0 && i % 2 !== 0 && (
                      <span className="movelist__row-line" />
                    )}
                  </Fragment>
                );
              })}
          </div>
        </ScrollBar>
      </div>

      <div className="movelist__opening">
        <SmallParagraph
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
        <div className="movelist__actions">
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
