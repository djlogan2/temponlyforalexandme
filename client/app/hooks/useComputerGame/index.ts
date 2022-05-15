import { useEffect, useState } from "react";

import GameService from "/imports/client/service/GameService";
import { GameEvents } from "/imports/dao/CommonSingleGameReadOnlyGameDao";
import { ClientComputerPlayedGame } from "/lib/client/game/ClientComputerPlayedGame";
import { PieceColor } from "/lib/records/ChallengeRecord";
import { GameConvertRecord } from "/lib/records/GameRecord";
import { GameStatus } from "lib/records/GameRecord";

import { MoveItem } from "client/app/types";

import { ESounds } from "../useSound/constants";
import { useSound } from "..";

import { getLegalMoves } from "./constants";

type MakeMove = () => (move: string[], promotion?: string) => void;
type Resign = () => () => void;

const emptyFunc = () => () => {};

export const useComputerGame = (
  initGameId: string,
  gameService: GameService,
) => {
  const [gameId, setGameId] = useState<string>(initGameId);
  const [isGameOver, setIsGameOver] = useState(false);
  const [fen, setFen] = useState<string>();
  const [clocks, updateClocks] = useState<any>();
  const [movelist, setMovelist] = useState<MoveItem[]>([]);
  const [moveToMake, setMoveToMake] = useState<PieceColor | undefined>();
  const [legalMoves, updateLegalMoves] = useState<any>({});
  const [myColor, setMyColor] = useState<PieceColor>();
  const [result, setResult] = useState<GameStatus>();
  const [makeMove, setMakeMove] = useState<MakeMove>(emptyFunc);
  const [resign, setResign] = useState<Resign>(emptyFunc);
  const playSound = useSound();

  useEffect(() => {
    const game = gameService.getTyped(
      gameId,
      connection.user!,
    ) as ClientComputerPlayedGame;

    const { tomove, variations, fen, clocks, myColor } =
      game.getDefaultProperties();

    setMyColor(myColor);
    setFen(fen);
    setMoveToMake(tomove);
    updateClocks(clocks);
    setMovelist(variations.movelist.slice(1) as MoveItem[]);

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
      const { result } = gameService.getGameEntity(
        gameId,
      ) as unknown as GameConvertRecord;

      setResult(result);
      setIsGameOver(true);
    });

    setMakeMove(
      () => (move: string[], promotion?: string) =>
        game.makeMove(connection.user!, move.join("") + (promotion || "")),
    );

    setResign(() => () => game.playerResign());

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
    clocks,
    movelist,
    moveToMake,
    legalMoves,
    isGameOver,
    myColor,
    result,
    setGameId,
    setIsGameOver,
    makeMove,
    resign,
  };
};
