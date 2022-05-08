import { createGenericContext } from "../utils";

import { ServicesContextValue } from "./types";

const [ServicesContextProvider, useServices] =
  createGenericContext<ServicesContextValue>();

export { ServicesContextProvider, useServices };
