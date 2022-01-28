import React, { FCICC } from "react";
import { useAppSelector } from "/client/app/store/hooks";

interface TitleProps {
  name: string;
  className?: string;
}

const Title: FCICC<TitleProps> = ({ name, token, ...rest }) => {
  const classes = useAppSelector((state) => state.theming.classes);

  return (
    <div id={name} className={classes.title} {...rest}>
      {window.i18n.translate(token.token, ...token.args)}
    </div>
  );
};

export default Title;
