import { Chess, Square } from "chess.js";
import { useCallback, useEffect, useState } from "react";
import { useSound } from "..";
import { gameservice } from "../../Root";
import { TMoveItem } from "../../types";
import { ESounds } from "../useSound/constants";
import { GameStatus } from "../../../../lib/records/GameRecord";
import ClientUser from "/lib/client/ClientUser";
import { ClientComputerPlayedGame } from "/lib/client/game/ClientComputerPlayedGame";
import { PieceColor } from "/lib/records/ChallengeRecord";
import { GameConvertRecord } from "/lib/records/GameRecord";

export const getLegalMoves = (fen: string) => {
  const chess = Chess(fen || "");
  const moves: Record<string, Square[]> = {};
  ["a", "b", "c", "d", "e", "f", "g", "h"].forEach((rank) => {
    for (let file = 1; file <= 8; file++) {
      const legal = chess
        .moves({ square: rank + file, verbose: true })
        .map((verbose) => verbose.to);

      if (legal?.length) {
        moves[rank + file] = legal;
      }
    }
  });
  return moves;
};

const useComputerPlayGame = (gameId: string) => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [fen, setFen] = useState<string>();
  const [clocks, updateClocks] = useState<any>();
  const [movelist, setMovelist] = useState<TMoveItem[]>([]);
  const [game, setGame] = useState<ClientComputerPlayedGame>();
  const [moveToMake, setMoveToMake] = useState<PieceColor | undefined>();
  const [legalMoves, updateLegalMoves] = useState<any>({});
  const [myColor, setMyColor] = useState<PieceColor>();
  const [result, setResult] = useState<GameStatus>();
  const playSound = useSound();

  useEffect(() => {
    const game = gameservice.getTyped(
      gameId,
      connection.user as ClientUser,
    ) as ClientComputerPlayedGame;

    const { tomove, variations, fen, clocks, myColor } =
      game.getDefaultProperties();

    setMyColor(myColor);
    setFen(fen);
    setMoveToMake(tomove);
    updateClocks(clocks);
    setMovelist(variations.movelist.slice(1) as TMoveItem[]);

    game.events.on("fen", (data) => {
      playSound(ESounds.MOVE);
      setFen(data);

      if (!fen) {
        return;
      }

      const currentLegalMoves = getLegalMoves(fen);
      updateLegalMoves(currentLegalMoves);
    });

    game.events.on("movelist", (data) => {
      setMovelist(data.movelist.slice(1));
    });

    game.events.on("clocks", (data) => {
      updateClocks(data);
    });

    game.events.on("tomove", (data) => {
      setMoveToMake(data);
    });

    game.events.on("converted", () => {
      const { result } = gameservice.getGameEntity(
        gameId,
      ) as unknown as GameConvertRecord;

      setResult(result);
      setIsGameOver(true);
    });

    setGame(game);

    return () => {
      gameservice.events.removeAllListeners();
    };
  }, []);

  const makeMove = useCallback(
    (move: string[], promotion?: string) => {
      game?.makeMove(
        connection.user as ClientUser,
        move.join("") + (promotion || ""),
      );
    },
    [game],
  );

  const resign = useCallback(() => {
    game?.resign(connection.user as ClientUser);
  }, [game]);

  return {
    fen,
    clocks,
    movelist,
    moveToMake,
    legalMoves,
    isGameOver,
    myColor,
    result,
    setIsGameOver,
    makeMove,
    resign,
  };
};

export default useComputerPlayGame;
