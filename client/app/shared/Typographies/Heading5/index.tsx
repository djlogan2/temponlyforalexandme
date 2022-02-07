import React, { FCICC } from "react";
import useTranslate from "/client/app/hooks/useTranslate";
import "./index.scss";

interface Heading5Props {
  name: string;
  className?: string;
}

const Heading5: FCICC<Heading5Props> = ({ name, token, ...rest }) => {
  const translation = useTranslate(token);

  return (
    <div id={name} className="heading5" {...rest}>
      {translation}
    </div>
  );
};

export default Heading5;
