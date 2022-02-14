import {
  RenderOptions,
  RenderResult,
  render as rtlRender,
} from "@testing-library/react";
import React from "react";

const render = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): RenderResult => {
  const Wrapper: React.FC = ({ children }) => <div>{children}</div>;

  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

export * from "@testing-library/react";
export { render };
