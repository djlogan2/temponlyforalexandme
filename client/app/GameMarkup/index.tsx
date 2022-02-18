import clsx from "clsx";
import React, { FCICC, useEffect, useState } from "react";
import { gameservice } from "../Root";
import "./index.scss";
import DummyChessboard from "/client/app/components/DummyChessboard";
import Flip from "/client/app/components/icons/Flip";
import Movelist, { IMoveItem } from "/client/app/components/Movelist";
import PlayerInfo from "/client/app/components/PlayerInfo";
import DigitalClock from "/client/app/shared/Clocks/DigitalClock";
import GameTitle from "/client/app/shared/GameTitle";
import ClientUser from "/lib/client/ClientUser";
import { ClientComputerPlayedGame } from "/lib/client/game/ClientComputerPlayedGame";
import { ComputerChallengeRecord } from "/lib/records/ChallengeRecord";
import EnhancedChessboard from "/client/app/components/EnhancedChessboard";

interface IGameMarkup {}

const computerchallenge: ComputerChallengeRecord = {
  skill_level: 1,
  color: "w",
  clock: { minutes: 15 },
};

const myGames: ClientComputerPlayedGame[] = [];

const GameMarkup: FCICC<IGameMarkup> = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeGame, setActiveGame] = useState<any>();
  const [fen, setFen] = useState<string>();
  const [movelist, setMovelist] = useState<IMoveItem[]>();

  useEffect(() => {
    const onGameStartedListener = (game: ClientComputerPlayedGame) => {
      const currentGame = (game as any).game;
      console.log(currentGame);
      setActiveGame(currentGame);
      setFen(currentGame.fen);
      setMovelist(currentGame.variations.movelist.slice(1));

      myGames.push(game);
    };

    gameservice.events.on("started", onGameStartedListener);

    return () => gameservice.events.off("started", onGameStartedListener);
  }, []);

  // useEffect(() => {
  //   if (!movelist) {
  //     return;
  //   }

  //   const onMoveMadeListener = (move: IMoveItem) => {
  //     const moves = [...movelist];
  //     moves.push(move);
  //     setMovelist(moves);
  //   };

  //   gameservice.events.on("movemade", onMoveMadeListener);

  //   return () => gameservice.events.off("movemade", onMoveMadeListener);
  // }, [movelist]);

  const handleMove = (move: string[], promotion?: string) => {
    if (promotion) {
      myGames[0].makeMove(
        connection.user as ClientUser,
        move.join("") + promotion,
      );
    } else {
      myGames[0].makeMove(connection.user as ClientUser, move.join(""));
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => gameservice.startComputerGame(computerchallenge)}
      >
        Start a game
      </button>
      {activeGame && fen && movelist ? (
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
            time="00:00:29"
            status="in"
            keyboardFunctions={[]}
            token={{
              token: "",
              args: [],
            }}
            classes={[]}
            className={clsx(
              "gameContainer__clock-one",
              isFlipped && "gameContainer__clock-one--flipped",
            )}
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
            time="00:00:30"
            status="inactive"
            keyboardFunctions={[]}
            token={{
              token: "",
              args: [],
            }}
            classes={[]}
            className={clsx(
              "gameContainer__clock-two",
              isFlipped && "gameContainer__clock-two--flipped",
            )}
          />
        </div>
      ) : null}
    </>
  );
};

export default GameMarkup;
