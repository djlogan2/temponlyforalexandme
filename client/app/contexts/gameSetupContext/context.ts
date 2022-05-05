import { createContext, useContext } from "react";
import { TChallengeButton } from "../../types";

interface IGameSetupContextValue {
  challengeButtons: TChallengeButton[];
}

export const GameSetupContext = createContext<IGameSetupContextValue>({
  challengeButtons: [],
});

export const useGameSetup = () => useContext(GameSetupContext);
