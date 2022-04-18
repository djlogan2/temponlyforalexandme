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

type GameAuditTypes =
  | "convert"
  | "drawaccept"
  | "drawdecline"
  | "drawrequest"
  | "drawrevoke"
  | "move"
  | "resign"
  | "setfen";

export interface GameAuditRecord {
  who: string;
  when: Date;
  type: GameAuditTypes;
}

export interface GameConvertRecord extends GameAuditRecord {
  type: "convert";
  result: GameStatus;
  result2: number;
}

export interface GameAuditMoveRecord extends GameAuditRecord {
  type: "move";
  move: string;
}

export interface GameAuditSetFenRecord extends GameAuditRecord {
  type: "setfen";
  fen: string;
}

export interface GameAuditDrawRecord extends GameAuditRecord {
  type: "drawrequest" | "drawaccept" | "drawdecline" | "drawrevoke";
}

export interface GameAuditResignRecord extends GameAuditRecord {
  type: "resign";
}

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

export interface PlayerInfo {
  username?: string;
  userid: string;
  rating: number;
  titles: string[];
}

interface Observerinterface {
  userid: string;
  username: string;
}

export interface ECOObject {
  name: string;
  code: string;
}

export interface MoveZero {
  variations?: number[];
}

export interface BasicMoveListNode extends MoveZero {
  prev: number;
  move: string;
  smith: ChessJSMove;
  eco?: ECOObject;
}

export interface PlayedGameMoveListNode extends BasicMoveListNode {
  wcurrent: number;
  bcurrent: number;
}

export interface VariationsInterface {
  halfmovetakeback: number;
  currentmoveindex: number;
  movelist: (BasicMoveListNode | MoveZero)[];
}

export type GameTypes = "playing" | "analyzing" | "computer";

export interface BasicGameRecord {
  _id: string;
  instance_id: string;
  connection_id: string;
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
  white: PlayerInfo;
  black: PlayerInfo;
  status: "playing";
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
  rated?: boolean;
  result: GameStatus;
  result2?: number;
  examiners: Observerinterface[];
}
