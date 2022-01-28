import React, { FCICC } from "react";
import { useAppSelector } from "/client/app/store/hooks";

interface Heading5Props {
  name: string;
  className?: string;
}

const Heading5: FCICC<Heading5Props> = ({ name, token, ...rest }) => {
  const classes = useAppSelector((state) => state.theming.classes);

  return (
    <div id={name} className={classes.heading5} {...rest}>
      {window.i18n.translate(token.token, ...token.args)}
    </div>
  );
};

export default Heading5;
