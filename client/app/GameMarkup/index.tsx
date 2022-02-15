import clsx from "clsx";
import React, { FCICC, useEffect, useState } from "react";
import { gameservice } from "../Root";
import "./index.scss";
import DummyChessboard from "/client/app/components/DummyChessboard";
import Flip from "/client/app/components/icons/Flip";
import Movelist from "/client/app/components/Movelist";
import PlayerInfo from "/client/app/components/PlayerInfo";
import DigitalClock from "/client/app/shared/Clocks/DigitalClock";
import GameTitle from "/client/app/shared/GameTitle";
import ClientUser from "/lib/client/ClientUser";
import { ClientComputerPlayedGame } from "/lib/client/game/ClientComputerPlayedGame";
import { ComputerChallengeRecord } from "/lib/records/ChallengeRecord";

interface IGameMarkup {}

const computerchallenge: ComputerChallengeRecord = {
  _id: "x",
  type: "computer",
  skill_level: 1,
  color: "w",
  clock: { minutes: 15 },
};

const myGames: ClientComputerPlayedGame[] = [];

const GameMarkup: FCICC<IGameMarkup> = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeGame, setActiveGame] = useState<any>();
  const [fen, setFen] = useState<string>();

  useEffect(() => {
    gameservice.events.on("started", (game: ClientComputerPlayedGame) => {
      const currentGame = (game as any).game;
      setActiveGame(currentGame);
      setFen(currentGame.fen);
      console.log("STARTED FEN", currentGame.fen);

      myGames.push(game);
      // game.makeMove(connection.user as ClientUser, "e4");
    });

    gameservice.events.on("movemade", (data) => {
      console.log("______________");
      console.log(data);
      console.log("______________");
    });
  }, []);

  const handleMove = (move: string) => {
    console.log(move);
    myGames[0].makeMove(connection.user as ClientUser, move);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => gameservice.startComputerGame(computerchallenge)}
      >
        Start a game
      </button>
      {activeGame && fen ? (
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
          <DummyChessboard
            flipped={isFlipped}
            className="gameContainer__board"
            onMoveHandler={handleMove}
            fen={fen || activeGame.fen}
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
            moves={new Array(10).fill(0).map((_, i) => ({
              first: {
                move: `c${i}`,
                piece: "q",
              },
              second: {
                move: `d${i}`,
                piece: "n",
              },
            }))}
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
