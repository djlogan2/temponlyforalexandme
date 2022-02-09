export const ALL_USER_ROLES = [
  "login",
  "play_computer_games",
  "user_set",
  "user_set_locale",
  "user_set_theme",
];

export const DEFAULT_ANONYMOUS_USER_ROLES = [
  "login",
  "chat",
  "play_computer_games",
  "play_rated_games",
  "play_unrated_games",
  "user_set",
  "user_set_locale",
  "user_set_theme",
];

export type UserRoles = typeof ALL_USER_ROLES[number];
