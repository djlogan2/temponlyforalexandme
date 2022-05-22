export const sounds = {
  move: "--resource_moveSound",
} as const;

export const SoundVariants = {
  MOVE: "move",
} as const;

export type Sound = keyof typeof sounds;
