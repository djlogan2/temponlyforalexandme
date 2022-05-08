import { createGenericContext } from "../utils";

import { GameSetupContextValue } from "./types";

const [GameSetupContextProvider, useGameSetup] =
  createGenericContext<GameSetupContextValue>();

export { GameSetupContextProvider, useGameSetup };
