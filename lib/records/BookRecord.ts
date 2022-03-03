export interface BookEntry {
  weight: number;
  learn: number;
  smith: string;
}

export interface BookRecord {
  name: string;
  key: string;
  entries: BookEntry[];
}
