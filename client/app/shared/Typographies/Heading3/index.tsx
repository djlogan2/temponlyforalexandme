import React, { FCICC } from "react";
import "./index.scss";
import useTranslate from "/client/app/hooks/useTranslate";

interface Heading3Props {
  name: string;
  className?: string;
}

const Heading3: FCICC<Heading3Props> = ({ name, token, ...rest }) => {
  const translation = useTranslate(token);

  return (
    <div id={name} className="heading3" {...rest}>
      {translation}
    </div>
  );
};

export default Heading3;
