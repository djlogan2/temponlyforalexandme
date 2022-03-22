export const ETabs = {
  MOVELIST: 0,
  CHAT: 1,
} as const;

type TTabsKeys = keyof typeof ETabs;
export type TTabs = typeof ETabs[TTabsKeys];
