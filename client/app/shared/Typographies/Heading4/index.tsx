import React, { FC, FCICC } from "react";
import useStyles from "./styles";

interface Heading4Props {
  name: string;
  className?: string;
}

const Heading4: FCICC<Heading4Props> = ({ name, token, ...rest }) => {
  const classes = useStyles();

  return (
    <div id={name} className={classes.heading4} {...rest}>
      {window.i18n.translate(token.token, ...token.args)}
    </div>
  );
};

export default Heading4;
