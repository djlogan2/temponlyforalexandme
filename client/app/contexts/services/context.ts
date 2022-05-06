import GameService from "/imports/client/service/GameService";
import ChallengeService from "/imports/client/service/ChallengeService";
import { createGenericContext } from "../utils";

export type ServicesContextValue = {
  gameService: GameService;
  challengeService: ChallengeService;
  isServicesReady: boolean;
};

const [ServicesContextProvider, useServices] =
  createGenericContext<ServicesContextValue>();

export { ServicesContextProvider, useServices };
