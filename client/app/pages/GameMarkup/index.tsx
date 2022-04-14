import clsx from "clsx";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { calcTime } from "../../data/utils";
import ControlBox from "./components/ControlBox";
import "./index.scss";
import {
  EnhancedChessboard,
  FlatMovelist,
  PlayerInfo,
  GameOver,
} from "/client/app/components";
import Flip from "/client/app/components/icons/Flip";
import { useComputerPlayGame, useWindowSize } from "/client/app/hooks";
import { DigitalClock, GameTitle } from "/client/app/shared";

const GameMarkup = () => {
  const { id } = useParams<{ id: string }>();
  const {
    clocks,
    fen,
    legalMoves,
    makeMove,
    moveToMake,
    movelist,
    resign,
    isGameOver,
    setIsGameOver,
  } = useComputerPlayGame(id);

  const [isFlipped, setIsFlipped] = useState(false);

  const { width } = useWindowSize();

  return fen && clocks && moveToMake ? (
    <div className="gameContainer">
      <PlayerInfo
        userStatus="online"
        rank={2500}
        username="Grand_Master01"
        title="WGM"
        lagLevel={3}
        flip={isFlipped}
        className={clsx(
          "gameContainer__player-one",
          isFlipped && "gameContainer__player-one--flipped",
        )}
      />
      <PlayerInfo
        userStatus="online"
        rank={2500}
        username="Grand_Master02"
        title="GM"
        lagLevel={5}
        flip={!isFlipped}
        className={clsx(
          "gameContainer__player-two",
          isFlipped && "gameContainer__player-two--flipped",
        )}
      />
      <div className="gameContainer__board-container">
        {isGameOver && <GameOver onClose={() => setIsGameOver(false)} />}
        <EnhancedChessboard
          fen={fen}
          flipped={isFlipped}
          className="gameContainer__board"
          circles={[]}
          arrows={[]}
          legalMoves={legalMoves}
          showLegalMoves={false}
          smartMoves={false}
          smallSize={500}
          onMoveHandler={makeMove}
        />
      </div>
      <Flip
        onClick={() => setIsFlipped((val) => !val)}
        className="gameContainer__btn-flip"
      />
      <DigitalClock
        time={calcTime(
          clocks.b.current,
          moveToMake === "b",
          clocks.b.initial.minutes,
          clocks.b.starttime,
        )}
        className={clsx(
          "gameContainer__clock-one",
          isFlipped && "gameContainer__clock-one--flipped",
        )}
        isMyTurn={moveToMake === "b"}
      />
      {width > 785 ? (
        <>
          <GameTitle minutes={15} className="gameContainer__title" />
          <ControlBox
            onResign={resign}
            className="gameContainer__controlBox"
            moves={movelist}
            messages={[]}
          />
        </>
      ) : (
        <FlatMovelist moves={movelist} />
      )}
      <DigitalClock
        time={calcTime(
          clocks.w.current,
          moveToMake === "w",
          clocks.w.initial.minutes,
          clocks.w.starttime,
        )}
        className={clsx(
          "gameContainer__clock-two",
          isFlipped && "gameContainer__clock-two--flipped",
        )}
        isMyTurn={moveToMake === "w"}
      />
    </div>
  ) : null;
};

export default GameMarkup;
