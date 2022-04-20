import { noop } from "lodash";
import { useEffect, useState } from "react";
import { useSound } from "..";
import { GameStatus } from "../../../../lib/records/GameRecord";
import { gameservice } from "../../Root";
import { TMoveItem } from "../../types";
import { ESounds } from "../useSound/constants";
import { getLegalMoves } from "./constants";
import { ClientComputerPlayedGame } from "/lib/client/game/ClientComputerPlayedGame";
import { PieceColor } from "/lib/records/ChallengeRecord";
import { GameConvertRecord } from "/lib/records/GameRecord";

type TMakeMove = () => (move: string[], promotion?: string) => void;
type TResign = () => () => void;

const emptyFunc = () => () => {};

const useComputerPlayGame = (gameId: string) => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [fen, setFen] = useState<string>();
  const [clocks, updateClocks] = useState<any>();
  const [movelist, setMovelist] = useState<TMoveItem[]>([]);
  const [moveToMake, setMoveToMake] = useState<PieceColor | undefined>();
  const [legalMoves, updateLegalMoves] = useState<any>({});
  const [myColor, setMyColor] = useState<PieceColor>();
  const [result, setResult] = useState<GameStatus>();
  const [makeMove, setMakeMove] = useState<TMakeMove>(emptyFunc);
  const [resign, setResign] = useState<TResign>(emptyFunc);
  const playSound = useSound();

  useEffect(() => {
    const game = gameservice.getTyped(
      gameId,
      connection.user!,
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

    setMakeMove(
      () => (move: string[], promotion?: string) =>
        game.makeMove(connection.user!, move.join("") + (promotion || "")),
    );

    setResign(() => () => game.resign(connection.user!));

    return () => {
      gameservice.events.removeAllListeners();
    };
  }, []);

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
