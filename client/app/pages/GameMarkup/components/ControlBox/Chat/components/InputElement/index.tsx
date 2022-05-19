import React from "react";

export const InputElement = ({ children }: { children: React.ReactNode }) => (
  <button className="chat__inputElement" type="button">
    {children}
  </button>
);
