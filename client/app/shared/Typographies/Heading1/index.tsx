import React, { FCICC } from "react";
import useTranslate from "/client/app/hooks/useTranslate";
import "./index.scss";

interface Heading1Props {
  name: string;
  className?: string;
}

const Heading1: FCICC<Heading1Props> = ({ name, token, ...rest }) => {
  const translation = useTranslate(token);

  return (
    <div id={name} className="heading1" {...rest}>
      {translation}
    </div>
  );
};

export default Heading1;
