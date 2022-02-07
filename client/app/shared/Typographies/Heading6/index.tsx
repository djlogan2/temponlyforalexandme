import React, { FCICC } from "react";
import useTranslate from "/client/app/hooks/useTranslate";
import "./index.scss";

interface Heading6Props {
  name: string;
  className?: string;
}

const Heading6: FCICC<Heading6Props> = ({ name, token, ...rest }) => {
  const translation = useTranslate(token);

  return (
    <div id={name} className="heading6" {...rest}>
      {translation}
    </div>
  );
};

export default Heading6;
