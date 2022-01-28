import React, { FCICC } from "react";
import { useAppSelector } from "/client/app/store/hooks";

interface Heading4Props {
  name: string;
  className?: string;
}

const Heading4: FCICC<Heading4Props> = ({ name, token, ...rest }) => {
  const classes = useAppSelector((state) => state.theming.classes);

  return (
    <div id={name} className={classes.heading4} {...rest}>
      {window.i18n.translate(token.token, ...token.args)}
    </div>
  );
};

export default Heading4;
