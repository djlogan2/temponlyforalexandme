import React, { FCICC } from "react";
import "./index.scss";
import useTranslate from "/client/app/hooks/useTranslate";

interface TitleProps {
  name: string;
  className?: string;
}

const Title: FCICC<TitleProps> = ({ name, token, ...rest }) => {
  const translation = useTranslate(token);

  return (
    <div id={name} className="title" {...rest}>
      {translation}
    </div>
  );
};

export default Title;
