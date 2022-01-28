import React, { FCICC } from "react";
import { useAppSelector } from "/client/app/store/hooks";

interface Heading6Props {
  name: string;
  className?: string;
}

const Heading6: FCICC<Heading6Props> = ({ name, token, ...rest }) => {
  const classes = useAppSelector((state) => state.theming.classes);

  return (
    <div id={name} className={classes.heading6} {...rest}>
      {window.i18n.translate(token.token, ...token.args)}
    </div>
  );
};

export default Heading6;
