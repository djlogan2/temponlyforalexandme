export interface UCIInfo {
  depth?: number;
  seldepth?: number;
  time?: number;
  nodes?: number;
  pv?: string;
  multipv?: number;
  score?: {
    unit: "cp" | "mate" | "lowerbound" | "upperbound";
    value: number;
  };
  currmove?: number;
  currmovenumber?: number;
  hashfull?: number;
  nps?: number;
  tbhits?: number;
  cpuload?: number;
  string?: string;
  refutation?: string;
  currline?: string;
}

export interface EngineResult {
  bestmove?: string;
  ponder?: string;
  info: UCIInfo[];
}
