import { createContext, useContext } from "react";

export const createGenericContext = <T>() => {
  const genericContext = createContext<T | undefined>(undefined);

  const useGenericContext = () => {
    const contextIsDefined = useContext(genericContext);

    if (!contextIsDefined) {
      throw new Error("Context is undefined");
    }

    return contextIsDefined;
  };

  return [genericContext.Provider, useGenericContext] as const;
};
