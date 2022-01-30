import React, { FCICC } from "react";
import useTranslate from "/client/app/hooks/useTranslate";
import { useAppSelector } from "/client/app/store/hooks";

interface TitleProps {
  name: string;
  className?: string;
}

const Title: FCICC<TitleProps> = ({ name, token, ...rest }) => {
  const classes = useAppSelector((state) => state.theming.classes);
  const translation = useTranslate(token);

  return (
    <div id={name} className={classes.title} {...rest}>
      {translation}
    </div>
  );
};

export default Title;
