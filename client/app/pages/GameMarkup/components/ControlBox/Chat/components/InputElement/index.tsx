import React from "react";

const InputElement = ({ children }: { children: React.ReactNode }) => (
  <button className="chat__inputElement" type="button">
    {children}
  </button>
);

export default InputElement;
