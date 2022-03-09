export const sounds = {
  move: "--resource_moveSound",
} as const;

export const ESounds = {
  MOVE: "move",
} as const;

export type TSounds = keyof typeof sounds;
