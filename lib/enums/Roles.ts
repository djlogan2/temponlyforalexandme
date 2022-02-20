export const ALL_USER_ROLES = [
  "login",
  "play_computer_games",
  "play_rated_games",
  "play_unrated_games",
  "user_set_isdeveloper",
  "user_set_isolation_group",
  "user_set_locale",
  "user_set_theme",
  "user_set_titles",
  "user_set_username",
] as const;

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
