import React, { FC } from "react";

const InputElement: FC = ({ children }) => (
  <button className="chat__inputElement" type="button">
    {children}
  </button>
);

export default InputElement;
