import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatMovelist,
  GameSetup,
  EnhancedChessboard,
  PlayerInfo,
} from "/client/app/components";
import { GameTitle, DigitalClock } from "/client/app/shared";
import { useWindowSize, useSound } from "/client/app/hooks";
import { calcTime } from "../../data/utils";
import { ESounds } from "../../hooks/useSound/constants";
import { gameservice } from "../../Root";
import ControlBox from "./components/ControlBox";
import "./index.scss";
import { getLegalMoves } from "./utils";
import Flip from "/client/app/components/icons/Flip";
import { TMoveItem } from "/client/app/types";
import ClientUser from "/lib/client/ClientUser";
import { ClientComputerPlayedGame } from "/lib/client/game/ClientComputerPlayedGame";
import { PieceColor } from "/lib/records/ChallengeRecord";

const GameMarkup = () => {
  const [showGameSetup, setShowGameSetup] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [fen, setFen] = useState<string>();
  const [clocks, updateClocks] = useState<any>();
  const [movelist, setMovelist] = useState<TMoveItem[]>();
  const [gameInstance, setGameInstance] = useState<ClientComputerPlayedGame>();
  const [moveToMake, setMoveToMake] = useState<PieceColor | undefined>();
  const [legalMoves, updateLegalMoves] = useState<any>();

  const { width } = useWindowSize();

  const playSound = useSound();

  useEffect(() => {
    const onGameStartedListener = (id: string) => {
      const gInstance = gameservice.getTyped(
        id,
        connection.user as ClientUser,
      ) as ClientComputerPlayedGame | undefined;

      if (!gInstance) {
        return;
      }

      const { tomove, variations, fen, clocks } =
        gInstance.getDefaultProperties();

      setFen(fen);
      setMoveToMake(tomove);
      updateClocks(clocks);
      setMovelist(variations.movelist.slice(1) as TMoveItem[]);

      gInstance.events.on("fen", (data) => {
        playSound(ESounds.MOVE);
        setFen(data);
      });

      gInstance.events.on("movelist", (data) => {
        setMovelist(data.movelist.slice(1));
      });

      gInstance.events.on("clocks", (data) => {
        updateClocks(data);
      });

      gInstance.events.on("tomove", (data) => {
        setMoveToMake(data);
        gInstance.events.removeAllListeners();
      });

      gInstance.events.on("ended", () => {
        console.log("ended");
      });

      setGameInstance(gInstance);
    };

    gameservice.events.on("started", (id) => {
      onGameStartedListener(id);
    });
    gameservice.events.on("removed", () => {
      console.log("removed");
    });
    return () => {
      gameservice.events.off("started", onGameStartedListener);
      gameservice.events.off("removed");
    };
  }, []);

  const handleMove = useCallback(
    (move: string[], promotion?: string) => {
      gameInstance?.makeMove(
        connection.user as ClientUser,
        move.join("") + (promotion || ""),
      );
    },
    [gameInstance],
  );

  const onResignHandler = useCallback(() => {
    gameInstance?.resign(connection.user as ClientUser);
  }, [gameInstance]);

  useEffect(() => {
    if (!fen) {
      return;
    }

    const currentLegalMoves = getLegalMoves(fen);
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
            <>
              <GameTitle minutes={15} className="gameContainer__title" />
              <ControlBox
                onResign={onResignHandler}
                className="gameContainer__controlBox"
                moves={movelist || []}
                messages={[]}
              />
            </>
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
