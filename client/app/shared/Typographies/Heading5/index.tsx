import React, { FC, FCICC } from "react";
import useStyles from "./styles";

interface Heading5Props {
  name: string;
  className?: string;
}

const Heading5: FCICC<Heading5Props> = ({ name, token, ...rest }) => {
  const classes = useStyles();

  return (
    <div id={name} className={classes.heading5} {...rest}>
      {window.i18n.translate(token.token, ...token.args)}
    </div>
  );
};

export default Heading5;
