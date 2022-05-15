import React, { useEffect, useState } from "react";

import clsx from "clsx";
import { useHistory, useParams } from "react-router-dom";

import { useGameSetup } from "/client/app/contexts/gameSetup";
import { calcTime } from "/client/app/data/utils";
import { useServices } from "/client/app/contexts/services";
import { useComputerGame, useWindowSize } from "/client/app/hooks";
import { DigitalClock, GameTitle } from "/client/app/shared";
import {
  EnhancedChessboard,
  FlatMovelist,
  PlayerInfo,
  GameOver,
} from "/client/app/components";
import Flip from "/client/app/components/icons/Flip";

import ControlBox from "./components/ControlBox";
import "./index.scss";

const GameMarkup = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { width } = useWindowSize();
  const { gameService } = useServices();
  const {
    clocks,
    fen,
    legalMoves,
    moveToMake,
    movelist,
    isGameOver,
    myColor,
    result,
    setGameId,
    resign,
    makeMove,
    setIsGameOver,
  } = useComputerGame(id, gameService);
  const { rematchComputerGame } = useGameSetup();

  const [isFlipped, setIsFlipped] = useState(myColor === "b");

  useEffect(() => {
    setIsFlipped(myColor === "b");
  }, [myColor]);

  useEffect(() => {
    setGameId(id);
  }, [id]);

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
        {isGameOver && result && (
          <GameOver
            result={result}
            onRematch={() => {
              setIsGameOver(false);
              rematchComputerGame();
            }}
            onClose={() => {
              setIsGameOver(false);
              history.push("/");
            }}
            onAnalysis={() => gameService.startAnalysisGame(id)}
          />
        )}
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
