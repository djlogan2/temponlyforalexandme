import ClientTheme from "/lib/client/ClientTheme";
import GameService from "/imports/client/service/GameService";
import ChallengeService from "/imports/client/service/ChallengeService";

export type ServicesContextValue = {
  themeService: ClientTheme;
  gameService: GameService;
  challengeService: ChallengeService;
};
