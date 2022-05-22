import { useCallback, useEffect, useState } from "react";

import { Piece, Square } from "chess.js";

import { GameEvents } from "/imports/dao/CommonSingleGameReadOnlyGameDao";
import ClientAnalysisGame from "/lib/client/game/ClientAnalysisGame";

import { useSound, SoundVariants } from "/client/app/hooks/useSound";

type MakeMove = (from: Square, to: Square) => void;
type Put = (piece: Piece, square: Square) => void;
type Remove = (square: Square) => void;
type Clear = () => void;

type HookValue = {
  fen: string;
  makeMove: MakeMove;
  put: Put;
  remove: Remove;
  clear: Clear;
};

export const useAnalysisGame = (game: ClientAnalysisGame): HookValue => {
  const [fen, setFen] = useState<string>("");

  const playSound = useSound();

  const put = useCallback<Put>(
    (piece, square) => game.put(piece, square, connection.user!.id),
    [game],
  );

  const makeMove = useCallback<MakeMove>(
    (from, to) => game.changePiecePosition(from, to, connection.user!.id),
    [game],
  );

  const remove = useCallback<Remove>(
    (square) => game.remove(square, connection.user!.id),
    [game],
  );

  const clear = useCallback<Clear>(
    () => game.clear(connection.user!.id),
    [game],
  );

  useEffect(() => {
    if (!connection.user) {
      throw new Error("No user");
    }

    const { fen } = game.getDefaultProperties();
    setFen(fen);

    game.events.on("fen", (data) => {
      playSound(SoundVariants.MOVE);
      setFen(data);
    });

    return () => {
      const events: GameEvents[] = ["fen"];

      events.forEach((event) => game.events.off(event));
    };
  }, [game]);

  return {
    fen,
    makeMove,
    put,
    remove,
    clear,
  };
};
