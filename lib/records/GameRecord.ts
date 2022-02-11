import { PingMessage } from "/lib/records/PingMessage";
import { ClockSettings, PieceColor } from "/lib/records/ChallengeRecord";

export type ChessJSFlags =
  | "n"
  | "b"
  | "e"
  | "c"
  | "p"
  | "k"
  | "q"
  | "pc"
  | null;
type ChessJSPiece = "p" | "r" | "n" | "b" | "q" | "k";
type ChessJSPromotablePeice = "r" | "n" | "b" | "q";
export type GameStatus = "1-0" | "0-1" | "1/2-1/2" | "*";

interface OneColorPending {
  draw: boolean;
  abort: boolean;
  adjourn: boolean;
  takeback: number;
}

interface Pending {
  w: OneColorPending;
  b: OneColorPending;
}

interface ChessJSMove {
  color: PieceColor;
  from: string;
  to: string;
  flags: ChessJSFlags;
  piece: ChessJSPiece;
  san: string;
  promotion?: ChessJSPromotablePeice;
}

export interface Clock {
  initial: ClockSettings;
  current: number;
  starttime: number;
}

export interface Clocks {
  w: Clock;
  b: Clock;
}

interface OneLagObject {
  active: PingMessage[];
  pings: number[];
}

interface LagObject {
  w: OneLagObject;
  b: OneLagObject;
}

interface PlayerInfo {
  username?: string;
  userid: string;
  rating: number;
  titles: string[];
}

interface Observerinterface {
  userid: string;
  username: string;
}

interface ECOObject {
  name: string;
  code: string;
}

export interface BasicMoveListNode {
  prev: number;
  move: string;
  smith: ChessJSMove;
  eco: ECOObject;
  variations?: number[];
}

export interface PlayedGameMoveListNode extends BasicMoveListNode {
  wcurrent: number;
  bcurrent: number;
}

interface ExaminedGameMoveListNode extends BasicMoveListNode {
  wcurrent?: number;
  bcurrent?: number;
}

interface VariationsInterface {
  halfmovetakeback: number;
  currentmoveindex: number;
  movelist: BasicMoveListNode[];
}

export type GameTypes = "playing" | "analyzing" | "computer";

export interface BasicGameRecord {
  _id: string;
  status: GameTypes;
  isolation_group: string;
  startTime: Date;
  tomove: PieceColor;
  fen: string;
  startingFen?: string;
  observers: Observerinterface[];
  variations: VariationsInterface;
}

export interface BasicPlayedGameRecord extends BasicGameRecord {
  premove?: ChessJSMove;
  clocks: Clocks;
  pending: Pending;
}

export interface TwoPlayerPlayedGameRecord extends BasicPlayedGameRecord {
  status: "playing";
  ratinginterface: string;
  rated: boolean;
  lag: LagObject;
}

export interface ComputerPlayGameRecord extends BasicPlayedGameRecord {
  status: "computer";
  opponent: PlayerInfo;
  opponentcolor: PieceColor;
  skill_level: number;
}

export interface AnalysisGameRecord extends BasicGameRecord {
  status: "analyzing";
  w: Partial<PlayerInfo>;
  b: Partial<PlayerInfo>;
  ratinginterface?: string;
  rated?: boolean;
  result: GameStatus;
  result2?: number;
  examiners: Observerinterface[];
}
