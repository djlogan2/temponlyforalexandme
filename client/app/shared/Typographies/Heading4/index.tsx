import React, { FCICC } from "react";
import useTranslate from "/client/app/hooks/useTranslate";
import "./index.scss";

interface Heading4Props {
  name: string;
  className?: string;
}

const Heading4: FCICC<Heading4Props> = ({ name, token, ...rest }) => {
  const translation = useTranslate(token);

  return (
    <div id={name} className="heading4" {...rest}>
      {translation}
    </div>
  );
};

export default Heading4;
