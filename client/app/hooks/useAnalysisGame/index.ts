import { useEffect, useState } from "react";

import GameService from "/imports/client/service/GameService";
import { GameEvents } from "/imports/dao/CommonSingleGameReadOnlyGameDao";

import { MoveItem } from "client/app/types";
import { Piece, Square } from "chess.js";

import { ESounds } from "../useSound/constants";
import { useSound } from "..";
import ClientAnalysisGame from "/lib/client/game/ClientAnalysisGame";

const emptyFunc = () => () => {};
type MakeMove = () => (move: string[], promotion?: string) => void;
type Put = () => (piece: Piece, square: Square) => void;

export const useAnalysisGame = (
  initGameId: string,
  gameService: GameService,
) => {
  const [gameId, setGameId] = useState<string>(initGameId);
  const [put, setPut] = useState<Put>(emptyFunc);
  const [isGameOver, setIsGameOver] = useState(false);
  const [fen, setFen] = useState<string>();
  const [movelist, setMovelist] = useState<MoveItem[]>([]);
  const [makeMove, setMakeMove] = useState<MakeMove>(emptyFunc);
  const playSound = useSound();

  useEffect(() => {
    if (!connection.user) {
      throw new Error("No user");
    }

    const game = gameService.getTyped(
      gameId,
      connection.user,
    ) as ClientAnalysisGame;

    setFen(fen);

    game.events.on("fen", (data) => {
      playSound(ESounds.MOVE);
      setFen(data);
    });

    setMakeMove(
      () => (move: string[], promotion?: string) =>
        game.makeMove(connection.user!, move.join("") + (promotion || "")),
    );

    setPut(
      () => (piece: Piece, square: Square) =>
        game.put(piece, square, connection.user!.id),
    );

    return () => {
      const events: GameEvents[] = [
        "fen",
        "movelist",
        "clocks",
        "tomove",
        "converted",
      ];

      events.forEach((event) => game.events.off(event));
    };
  }, [gameId]);

  return {
    fen,
    movelist,
    isGameOver,
    setGameId,
    setIsGameOver,
    makeMove,
    put,
  };
};
