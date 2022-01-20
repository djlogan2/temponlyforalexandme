import { PingMessage } from "/lib/records/PingMessage";

type ChessJSFlags = "n" | "b" | "e" | "c" | "p" | "k" | "q" | "pc" | null;
type ChessJSPiece = "p" | "r" | "n" | "b" | "q" | "k";
type ChessJSPromotablePeice = "r" | "n" | "b" | "q";
type PieceColor = "b" | "w";

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

interface Clock {
  initial: number;
  inc_or_delay: number;
  delayinterface: "none" | "inc" | "us" | "bronstein";
  current: number;
  starttime: number;
}

interface Clocks {
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
  username: string;
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
  movelist: BasicMoveListNode;
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

export interface BasicPlayedGameRecord {
  premove?: ChessJSMove;
  clocks: Clocks;
  pending: Pending;
}

export interface PlayedGameRecord extends BasicPlayedGameRecord {
  status: "playing";
  ratinginterface: string;
  rated: boolean;
  white: PlayerInfo;
  black: PlayerInfo;
  lag: LagObject;
}

export interface ComputerPlayGameRecord extends BasicPlayedGameRecord {
  status: "computer";
  opponent: PlayerInfo;
  opponentcolor: PieceColor;
  skill_level: number;
}

export interface ExaminedGameRecord {
  status: "examining";
  white: Partial<PlayerInfo>;
  black: Partial<PlayerInfo>;
  ratinginterface?: string;
  rated?: boolean;
}
