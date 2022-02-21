import clsx from "clsx";
import React, { FCICC, useCallback, useEffect, useState } from "react";
import { calcTime } from "../data/utils";
import { gameservice } from "../Root";
import "./index.scss";
import EnhancedChessboard from "/client/app/components/EnhancedChessboard";
import Flip from "/client/app/components/icons/Flip";
import Movelist, { IMoveItem } from "/client/app/components/Movelist";
import PlayerInfo from "/client/app/components/PlayerInfo";
import DigitalClock from "/client/app/shared/Clocks/DigitalClock";
import GameTitle from "/client/app/shared/GameTitle";
import ClientUser from "/lib/client/ClientUser";
import ClientAnalysisGame from "/lib/client/game/ClientAnalysisGame";
import { ClientComputerPlayedGame } from "/lib/client/game/ClientComputerPlayedGame";
import { ComputerChallengeRecord } from "/lib/records/ChallengeRecord";

interface IGameMarkup {}

const computerchallenge: ComputerChallengeRecord = {
  skill_level: 1,
  color: "w",
  clock: { minutes: 15 },
};

const GameMarkup: FCICC<IGameMarkup> = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeGame, setActiveGame] = useState<any>();
  const [fen, setFen] = useState<string>();
  const [movelist, setMovelist] = useState<IMoveItem[]>();
  const [gameInstance, setGameInstance] = useState<
    ClientComputerPlayedGame | ClientAnalysisGame
  >();
  const [moveToMake, setMoveToMake] = useState<"w" | "b" | undefined>();

  useEffect(() => {
    const onGameStartedListener = (id: string) => {
      const gInstance = gameservice.getTyped(id, connection.user as ClientUser);
      const currentGame = (gInstance as any).me;
      setActiveGame(currentGame);
      setFen(currentGame.fen);
      setMovelist(currentGame.variations.movelist.slice(1));
      setMoveToMake(currentGame.tomove);

      setGameInstance(gInstance);
    };

    gameservice.events.on("started", onGameStartedListener);

    return () => gameservice.events.off("started", onGameStartedListener);
  }, []);

  useEffect(() => {
    if (!movelist || !gameInstance) {
      return;
    }

    const onMoveMadeListener = (move: IMoveItem) => {
      setMoveToMake(move.smith.color === "w" ? "b" : "w");
      setMovelist((moves) => [...(moves || []), move]);
    };

    gameInstance?.events.on("move", onMoveMadeListener);

    return () => gameInstance?.events.off("move", onMoveMadeListener);
  }, [movelist, gameInstance]);

  const handleMove = useCallback(
    (move: string[], promotion?: string) => {
      gameInstance?.makeMove(
        connection.user as ClientUser,
        move.join("") + (promotion || ""),
      );
    },
    [gameInstance],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => gameservice.startComputerGame(computerchallenge)}
      >
        Start a game
      </button>
      {activeGame && fen && movelist && moveToMake ? (
        <div className="gameContainer">
          <PlayerInfo
            userStatus="online"
            picture="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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
            picture="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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
          <GameTitle
            minutes={15}
            keyboardFunctions={[]}
            token={{
              token: "",
              args: [],
            }}
            classes={[]}
            className="gameContainer__title"
          />
          <EnhancedChessboard
            fen={fen}
            flipped={isFlipped}
            className="gameContainer__board"
            circles={[]}
            arrows={[]}
            showLegalMoves={false}
            smartMoves={false}
            smallSize={500}
            onMoveHandler={handleMove}
          />
          <Flip
            onClick={() => setIsFlipped((val) => !val)}
            className="gameContainer__btn-flip"
          />
          <DigitalClock
            time={calcTime(
              activeGame.clocks.b.current,
              moveToMake === "b",
              activeGame.clocks.b.initial.minutes,
              activeGame.clocks.b.starttime,
            )}
            className={clsx(
              "gameContainer__clock-one",
              isFlipped && "gameContainer__clock-one--flipped",
            )}
            isMyTurn={moveToMake === "b"}
          />
          <Movelist
            openingName="FAKE_TEXT"
            token={{ token: "FAKE_TEXT", args: [] }}
            keyboardFunctions={[]}
            classes={[]}
            moves={movelist}
            className="gameContainer__movelist"
          />
          <DigitalClock
            time={calcTime(
              activeGame.clocks.w.current,
              moveToMake === "w",
              activeGame.clocks.w.initial.minutes,
              activeGame.clocks.w.starttime,
            )}
            className={clsx(
              "gameContainer__clock-two",
              isFlipped && "gameContainer__clock-two--flipped",
            )}
            isMyTurn={moveToMake === "w"}
          />
        </div>
      ) : null}
    </>
  );
};

export default GameMarkup;
