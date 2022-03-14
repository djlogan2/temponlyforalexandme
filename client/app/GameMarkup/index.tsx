import { Chess } from "chess.js";
import clsx from "clsx";
import React, { FCICC, useEffect, useState } from "react";
import ControlBox from "../components/ControlBox";
import FlatMovelist from "../components/FlatMovelist";
import GameSetup from "../components/GameSetup";
import { calcTime } from "../data/utils";
import useWindowSize from "../hooks/userWindowSize";
import useSound from "../hooks/useSound";
import { ESounds } from "../hooks/useSound/constants";
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
import { PieceColor } from "/lib/records/ChallengeRecord";

interface IGameMarkup {}

const GameMarkup: FCICC<IGameMarkup> = ({ ...rest }) => {
  const [showGameSetup, setShowGameSetup] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [fen, setFen] = useState<string>();
  const [clocks, updateClocks] = useState<any>();
  const [movelist, setMovelist] = useState<IMoveItem[]>();
  const [gameInstance, setGameInstance] = useState<
    ClientComputerPlayedGame | ClientAnalysisGame
  >();
  const [moveToMake, setMoveToMake] = useState<PieceColor | undefined>();
  const [legalMoves, updateLegalMoves] = useState<any>();

  const { width } = useWindowSize();

  const play = useSound(ESounds.MOVE);

  useEffect(() => {
    const onGameStartedListener = (id: string) => {
      const gInstance = gameservice.getTyped(id, connection.user as ClientUser);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { tomove, variations, fen, clocks } =
        // @ts-ignore
        gInstance.getDefaultProperties();

      setFen(fen);
      setMoveToMake(tomove);
      updateClocks(clocks);
      setMovelist(variations.movelist.slice(1));
      // @ts-ignore
      gInstance.events.on("fen", (data) => {
        play();
        setFen(data);
      });

      // @ts-ignore
      gInstance.events.on("movelist", (data) => {
        setMovelist(data.movelist.slice(1));
      });

      // @ts-ignore
      gInstance.events.on("clocks", (data) => {
        updateClocks(data);
      });

      // @ts-ignore
      gInstance.events.on("tomove", (data) => {
        setMoveToMake(data);
      });
      setGameInstance(gInstance);
    };

    const onGameRemovedListener = () => {
      setFen("");
      updateClocks(null);
      setMovelist([]);
      // @ts-ignore
      setGameInstance(null);
    };

    gameservice.events.on("started", onGameStartedListener);
    gameservice.events.on("removed", onGameRemovedListener);
    return () => gameservice.events.off("started", onGameStartedListener);
  }, []);

  const handleMove = (move: string[], promotion?: string) => {
    gameInstance?.makeMove(
      connection.user as ClientUser,
      move.join("") + (promotion || ""),
    );
  };

  useEffect(() => {
    const getLegalMoves = () => {
      const chess = Chess(fen || "");
      const moves = {};
      // @ts-ignore
      ["a", "b", "c", "d", "e", "f", "g", "h"].forEach((rank) => {
        // eslint-disable-next-line no-plusplus
        for (let file = 1; file <= 8; file++) {
          const legal = chess
            .moves({ square: rank + file, verbose: true })
            .map((verbose: { to: any }) => verbose.to);
          if (!!legal && !!legal.length) {
            // @ts-ignore
            moves[rank + file] = legal;
          }
        }
      });
      return moves;
    };

    const currentLegalMoves = getLegalMoves();
    updateLegalMoves(currentLegalMoves);
  }, [fen]);

  return (
    <>
      <button type="button" onClick={() => setShowGameSetup(true)}>
        Start a game
      </button>
      {showGameSetup && (
        <GameSetup onCloseModal={() => setShowGameSetup(false)} />
      )}
      {fen && clocks && moveToMake ? (
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
            legalMoves={legalMoves}
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
            <ControlBox
              className="gameContainer__controlBox"
              moves={movelist || []}
              messages={[]}
            />
          ) : (
            <FlatMovelist moves={movelist || []} />
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
      ) : null}
    </>
  );
};

export default GameMarkup;
