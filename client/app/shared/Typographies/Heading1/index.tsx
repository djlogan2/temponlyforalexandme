import React, { FCICC } from "react";
import { useAppSelector } from "/client/app/store/hooks";

interface Heading1Props {
  name: string;
  className?: string;
}

const Heading1: FCICC<Heading1Props> = ({ name, token, ...rest }) => {
  const classes = useAppSelector((state) => state.theming.classes);

  return (
    <div id={name} className={classes.heading1} {...rest}>
      {window.i18n.translate(token.token, ...token.args)}
    </div>
  );
};

export default Heading1;
