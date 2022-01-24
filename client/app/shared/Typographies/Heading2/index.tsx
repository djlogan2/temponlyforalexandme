import React, { FC, FCICC } from "react";
import useStyles from "./styles";

interface Heading2Props {
  name: string;
  className?: string;
}

const Heading2: FCICC<Heading2Props> = ({ name, token, ...rest }) => {
  const classes = useStyles();

  return (
    <div id={name} className={classes.heading2} {...rest}>
      {window.i18n.translate(token.token, ...token.args)}
    </div>
  );
};

export default Heading2;
