import { useHistory } from "react-router-dom";
import { Chess, Square } from "chess.js";
import { useCallback, useEffect, useState } from "react";
import { gameservice } from "../../Root";
import { TMoveItem } from "../../types";
import ClientUser from "/lib/client/ClientUser";
import { ClientComputerPlayedGame } from "/lib/client/game/ClientComputerPlayedGame";
import { PieceColor } from "/lib/records/ChallengeRecord";
import { useSound } from "..";
import { ESounds } from "../useSound/constants";

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
  const [fen, setFen] = useState<string>();
  const [clocks, updateClocks] = useState<any>();
  const [movelist, setMovelist] = useState<TMoveItem[]>();
  const [gameInstance, setGameInstance] = useState<ClientComputerPlayedGame>();
  const [moveToMake, setMoveToMake] = useState<PieceColor | undefined>();
  const [legalMoves, updateLegalMoves] = useState<any>();
  const playSound = useSound();

  const history = useHistory();

  useEffect(() => {
    const game = gameservice.getTyped(gameId, connection.user as ClientUser) as
      | ClientComputerPlayedGame
      | undefined;

    if (!game) {
      return;
    }

    const { tomove, variations, fen, clocks } = game.getDefaultProperties();

    setFen(fen);
    setMoveToMake(tomove);
    updateClocks(clocks);
    setMovelist(variations.movelist.slice(1) as TMoveItem[]);

    game.events.on("fen", (data) => {
      playSound(ESounds.MOVE);
      setFen(data);

      if (!fen) {
        history.push("/");
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

    game.events.on("ended", () => {});

    setGameInstance(game);
  }, []);

  const makeMove = useCallback(
    (move: string[], promotion?: string) => {
      gameInstance?.makeMove(
        connection.user as ClientUser,
        move.join("") + (promotion || ""),
      );
    },
    [gameInstance],
  );

  const resign = useCallback(() => {
    gameInstance?.resign(connection.user as ClientUser);
  }, [gameInstance]);

  return { fen, clocks, movelist, moveToMake, legalMoves, makeMove, resign };
};

export default useComputerPlayGame;
