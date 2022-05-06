import { TChallengeButton } from "../../types";
import { createGenericContext } from "../utils";

interface IGameSetupContextValue {
  challengeButtons: TChallengeButton[];
}

const [GameSetupContextProvider, useGameSetup] =
  createGenericContext<IGameSetupContextValue>();

export { GameSetupContextProvider, useGameSetup };
