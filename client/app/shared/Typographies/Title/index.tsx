import React, { FC, FCICC } from "react";
import useStyles from "./styles";

interface TitleProps {
  name: string;
  className?: string;
}

const Title: FCICC<TitleProps> = ({ name, token, ...rest }) => {
  const classes = useStyles();

  return (
    <div id={name} className={classes.title} {...rest}>
      {window.i18n.translate(token.token, ...token.args)}
    </div>
  );
};

export default Title;
