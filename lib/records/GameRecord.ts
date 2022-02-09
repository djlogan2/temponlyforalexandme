import { PingMessage } from "/lib/records/PingMessage";
import { ClockSettings, PieceColor } from "/lib/records/ChallengeRecord";

type ChessJSFlags = "n" | "b" | "e" | "c" | "p" | "k" | "q" | "pc" | null;
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
  white: OneColorPending;
  black: OneColorPending;
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
  white: Clock;
  black: Clock;
}

interface OneLagObject {
  active: PingMessage[];
  pings: number[];
}

interface LagObject {
  white: OneLagObject;
  black: OneLagObject;
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

interface BasicMoveListNode {
  prev: number;
  move: string;
  smith: ChessJSMove;
  eco: ECOObject;
  variations?: number[];
}

interface PlayedGameMoveListNode extends BasicMoveListNode {
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

export interface BasicGameRecord {
  _id: string;
  isolation_group: string;
  startTime: Date;
  fen: string;
  startingFen?: string;
  observers: Observerinterface[];
  variations: VariationsInterface;
}

export interface BasicPlayedGameRecord extends BasicGameRecord {
  tomove: PieceColor;
  fen: string;
  premove?: ChessJSMove;
  clocks: Clocks;
  pending: Pending;
}

export type GameTypes = "playing" | "analyzing" | "computer";

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
  white: Partial<PlayerInfo>;
  black: Partial<PlayerInfo>;
  ratinginterface?: string;
  rated?: boolean;
  result: GameStatus;
  result2?: number;
  examiners: Observerinterface[];
}
